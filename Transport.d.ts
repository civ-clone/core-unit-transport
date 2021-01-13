import { Unit, IUnit } from '@civ-clone/core-unit/Unit';
export interface ITransport extends IUnit {
  canStow(unit: Unit): boolean;
  capacity(): number;
  cargo(): Unit[];
  hasCapacity(): boolean;
  hasCargo(): boolean;
  stow(unit: Unit): boolean;
  unload(unit: Unit): boolean;
}
