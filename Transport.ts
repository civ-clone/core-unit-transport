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
    #ruleRegistry: RuleRegistry = ruleRegistryInstance;
    #transportRegistry: TransportRegistry = transportRegistryInstance;

    canStow(unit: Unit): boolean {
      return !this.cargo().includes(unit) && this.hasCapacity();
    }

    capacity(): Capacity {
      const [unitYield] = this.yield(new Capacity());

      return unitYield;
    }

    cargo(): Unit[] {
      return this.#transportRegistry
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
        this.#transportRegistry.getByTransport(this as ITransport).length > 0
      );
    }

    // Ideally, these would be `protected`: https://github.com/microsoft/TypeScript/issues/30355
    setRuleRegistry(ruleRegistry: RuleRegistry): void {
      this.#ruleRegistry = ruleRegistry;
    }

    setTransportRegistry(transportRegistry: TransportRegistry): void {
      this.#transportRegistry = transportRegistry;
    }

    stow(unit: Unit, sourceTile: Tile = unit.tile()): boolean {
      if (!this.hasCapacity() || !this.canStow(unit)) {
        return false;
      }

      this.#transportRegistry.register(
        new TransportManifest(this as ITransport, unit, sourceTile)
      );

      this.#ruleRegistry.process(Stowed, unit, this as ITransport);

      return true;
    }

    unload(unit: Unit) {
      try {
        const manifest = this.#transportRegistry.getByUnit(unit);

        this.#transportRegistry.unregister(manifest);

        this.#ruleRegistry.process(Unloaded, unit, this as ITransport);

        return true;
      } catch (e) {
        return false;
      }
    }
  };

export default Transport;
