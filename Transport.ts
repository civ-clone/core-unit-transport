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

export const Transport = (Base: typeof Unit) =>
  class Transport extends Base implements ITransport {
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
  };

export default Transport;
