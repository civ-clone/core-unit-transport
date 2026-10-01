import { Capacity, CargoWeight } from './Yields';
import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  TransportRegistry,
  instance as transportRegistryInstance,
} from './TransportRegistry';
import { Unit, IUnit } from '@civ-clone/core-unit/Unit';
import Stowed from './Rules/Stowed';
import Tile from '@civ-clone/core-world/Tile';
import TransportManifest from './TransportManifest';
import Unloaded from './Rules/Unloaded';
import CanStow from './Rules/CanStow';

export interface ITransport extends IUnit {
  canStow(unit: Unit): boolean;
  capacity(): Capacity;
  cargo(): Unit[];
  cargoWeight(): CargoWeight;
  hasCapacity(): boolean;
  hasCargo(): boolean;
  stow(unit: Unit, sourceTile: Tile): boolean;
  unload(unit: Unit): boolean;
}

export const isTransport = (object: unknown): boolean => {
  if (object instanceof Unit) {
    return [
      'canStow',
      'capacity',
      'cargo',
      'cargoWeight',
      'hasCapacity',
      'hasCargo',
      'stow',
      'unload',
    ].every((method) => typeof object?.[method as keyof Unit] === 'function');
  }

  if (object instanceof Function) {
    return [
      'canStow',
      'capacity',
      'cargo',
      'cargoWeight',
      'hasCapacity',
      'hasCargo',
      'stow',
      'unload',
    ].every((method) => typeof object.prototype[method] === 'function');
  }

  return false;
};

// What the mixin adds to a unit: `ITransport`, and the two collaborators it holds with their setters.
export interface ITransportUnit extends ITransport {
  _transportRuleRegistry: RuleRegistry;
  _transportRegistry: TransportRegistry;
  setRuleRegistry(ruleRegistry: RuleRegistry): void;
  setTransportRegistry(transportRegistry: TransportRegistry): void;
  stow(unit: Unit, sourceTile?: Tile): boolean;
}

// A constructor TypeScript treats as a mixin, so that `typeof Unit & TransportMixin` constructs with `Unit`'s own
//  arguments and returns a `Unit & ITransportUnit`.
export type TransportMixin = new (...args: any[]) => ITransportUnit;

// What `Transport(Base)` returns. Named rather than inferred: an inferred class type can't be written into the
//  `.d.ts` (TS4094 for `Unit`'s `private` members, TS2742 for the types it reaches through other packages), so the
//  package didn't compile (civ-clone/web-renderer#20).
export type TransportClass = typeof Unit & TransportMixin;

export const Transport = (Base: typeof Unit): TransportClass => {
  class Transport extends Base implements ITransportUnit {
    // Collaborators, which the loading game supplies (`Game.inject`), not saved state. Saved, each ship carried a dump
    //  of every rule, and came back from a load holding arrays where the registries should be
    //  (civ-clone/web-renderer#228).
    static readonly transient = [
      '_transportRegistry',
      '_transportRuleRegistry',
    ];

    // Named apart from `Unit`'s `_ruleRegistry`, which this shadowed as
    // `#ruleRegistry`. `Unit`'s is `private` and this one cannot be (TS4094 on
    // an exported class expression), and a public member cannot shadow a
    // private one of the same name. Renaming keeps the two slots separate, as
    // they were: `Unit` takes an injected registry, this always used the
    // singleton.
    _transportRuleRegistry: RuleRegistry = ruleRegistryInstance;
    _transportRegistry: TransportRegistry = transportRegistryInstance;

    canStow(unit: Unit): boolean {
      return this._transportRuleRegistry
        .process(CanStow, this as ITransport, unit)
        .every((result) => result);
    }

    capacity(): Capacity {
      const [unitYield] = this.yield(new Capacity());

      return unitYield;
    }

    cargo(): Unit[] {
      return this._transportRegistry
        .getByTransport(this as ITransport)
        .map((manifest: TransportManifest): Unit => manifest.unit());
    }

    cargoWeight(): CargoWeight {
      const [unitYield] = this.yield(new CargoWeight());

      return unitYield;
    }

    hasCapacity(): boolean {
      return this.cargoWeight().value() < this.capacity().value();
    }

    hasCargo(): boolean {
      return (
        this._transportRegistry.getByTransport(this as ITransport).length > 0
      );
    }

    // Ideally, these would be `protected`: https://github.com/microsoft/TypeScript/issues/30355
    setRuleRegistry(ruleRegistry: RuleRegistry): void {
      this._transportRuleRegistry = ruleRegistry;
    }

    setTransportRegistry(transportRegistry: TransportRegistry): void {
      this._transportRegistry = transportRegistry;
    }

    stow(unit: Unit, sourceTile: Tile = unit.tile()): boolean {
      if (!this.hasCapacity() || !this.canStow(unit)) {
        return false;
      }

      this._transportRegistry.register(
        new TransportManifest(this as ITransport, unit, sourceTile)
      );

      this._transportRuleRegistry.process(Stowed, unit, this as ITransport);

      return true;
    }

    unload(unit: Unit) {
      try {
        const manifest = this._transportRegistry.getByUnit(unit);

        this._transportRegistry.unregister(manifest);

        this._transportRuleRegistry.process(Unloaded, unit, this as ITransport);

        return true;
      } catch (e) {
        return false;
      }
    }
  }

  // Through `unknown` because `DataObject#_keys` is `(keyof this)[]`, which makes any subclass that adds a member
  //  unassignable to its base, though every `Transport` is a `Unit` at runtime.
  return Transport as unknown as TransportClass;
};

export default Transport;
