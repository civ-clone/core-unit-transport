import {
  RuleRegistry,
  instance as ruleRegistryInstance,
} from '@civ-clone/core-rule/RuleRegistry';
import {
  TransportRegistry,
  instance as transportRegistryInstance,
} from './TransportRegistry';
import { IConstructor } from '@civ-clone/core-registry/Registry';
import Stowed from './Rules/Stowed';
import TransportManifest from './TransportManifest';
import Unit, { IUnit } from '@civ-clone/core-unit/Unit';
import Unloaded from './Rules/Unloaded';
import Tile from '@civ-clone/core-world/Tile';

export interface ITransport extends IUnit {
  canStow(unit: Unit): boolean;
  capacity(): number;
  cargo(): Unit[];
  hasCapacity(): boolean;
  hasCargo(): boolean;
  stow(unit: Unit, sourceTile: Tile): boolean;
  unload(unit: Unit): boolean;
}

export const Transport = (Base: typeof Unit) =>
  class Transport extends Base implements ITransport {
    #ruleRegistry: RuleRegistry = ruleRegistryInstance;
    #transportRegistry: TransportRegistry = transportRegistryInstance;

    canStow(unit: Unit): boolean {
      return !this.cargo().includes(unit) && this.hasCapacity();
    }

    capacity(): number {
      return 0;
    }

    cargo(): Unit[] {
      return this.#transportRegistry
        .getByTransport(this as ITransport)
        .map((manifest: TransportManifest): Unit => manifest.unit());
    }

    hasCapacity(): boolean {
      return (
        this.#transportRegistry.getByTransport(this as ITransport).length <
        this.capacity()
      );
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
