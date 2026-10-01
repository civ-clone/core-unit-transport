import { Capacity, CargoWeight } from './Yields';
import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { TransportRegistry } from './TransportRegistry';
import { Unit, IUnit } from '@civ-clone/core-unit/Unit';
import Tile from '@civ-clone/core-world/Tile';
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
export declare const isTransport: (object: unknown) => boolean;
export interface ITransportUnit extends ITransport {
  _transportRuleRegistry: RuleRegistry;
  _transportRegistry: TransportRegistry;
  setRuleRegistry(ruleRegistry: RuleRegistry): void;
  setTransportRegistry(transportRegistry: TransportRegistry): void;
  stow(unit: Unit, sourceTile?: Tile): boolean;
}
export type TransportMixin = new (...args: any[]) => ITransportUnit;
export type TransportClass = typeof Unit & TransportMixin;
export declare const Transport: (Base: typeof Unit) => TransportClass;
export default Transport;
