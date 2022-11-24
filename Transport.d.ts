import { RuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import { TransportRegistry } from './TransportRegistry';
import Unit, { IUnit } from '@civ-clone/core-unit/Unit';
export interface ITransport extends IUnit {
  canStow(unit: Unit): boolean;
  capacity(): number;
  cargo(): Unit[];
  hasCapacity(): boolean;
  hasCargo(): boolean;
  stow(unit: Unit): boolean;
  unload(unit: Unit): boolean;
}
export declare const Transport: (Base: typeof Unit) => {
  new (
    city: import('@civ-clone/core-city/City').City | null,
    player: import('@civ-clone/core-player/Player').Player,
    tile: import('@civ-clone/core-world/Tile').Tile,
    ruleRegistry?: RuleRegistry
  ): {
    '__#27@#ruleRegistry': RuleRegistry;
    '__#27@#transportRegistry': TransportRegistry;
    canStow(unit: Unit): boolean;
    capacity(): number;
    cargo(): Unit[];
    hasCapacity(): boolean;
    hasCargo(): boolean;
    setRuleRegistry(ruleRegistry: RuleRegistry): void;
    setTransportRegistry(transportRegistry: TransportRegistry): void;
    stow(unit: Unit): boolean;
    unload(unit: Unit): boolean;
    '__#25@#active': boolean;
    '__#25@#busy': import('@civ-clone/core-unit/Rules/Busy').Busy | null;
    '__#25@#city': import('@civ-clone/core-city/City').City | null;
    '__#25@#destroyed': boolean;
    '__#25@#moves': import('@civ-clone/core-unit/Yields').Moves;
    '__#25@#player': import('@civ-clone/core-player/Player').Player;
    '__#25@#ruleRegistry': RuleRegistry;
    '__#25@#status': import('@civ-clone/core-unit/Action').Action | null;
    '__#25@#tile': import('@civ-clone/core-world/Tile').Tile;
    '__#25@#waiting': boolean;
    action(
      action: import('@civ-clone/core-unit/Action').Action,
      ...args: any[]
    ): void;
    actions(
      to?:
        | import('@civ-clone/core-world/Tile').Tile
        | import('@civ-clone/core-world/Tile').INeighbouringTiles,
      from?: import('@civ-clone/core-world/Tile').Tile
    ): import('@civ-clone/core-unit/Action').Action[];
    actionsForNeighbours(
      from?: import('@civ-clone/core-world/Tile').Tile
    ): import('@civ-clone/core-unit/Unit').IActionsForNeighbours;
    activate(): void;
    active(): boolean;
    setActive(active?: boolean): void;
    applyVisibility(): void;
    attack(): import('@civ-clone/core-unit/Yields').Attack;
    busy(): import('@civ-clone/core-unit/Rules/Busy').Busy | null;
    setBusy(rule?: import('@civ-clone/core-unit/Rules/Busy').Busy | null): void;
    city(): import('@civ-clone/core-city/City').City | null;
    defence(): import('@civ-clone/core-unit/Yields').Defence;
    destroy(
      player?: import('@civ-clone/core-player/Player').Player | null
    ): void;
    destroyed(): boolean;
    setDestroyed(): void;
    movement(): import('@civ-clone/core-unit/Yields').Movement;
    moves(): import('@civ-clone/core-unit/Yields').Moves;
    player(): import('@civ-clone/core-player/Player').Player;
    status(): import('@civ-clone/core-unit/Action').Action | null;
    setStatus(
      status: import('@civ-clone/core-unit/Action').Action | null
    ): void;
    tile(): import('@civ-clone/core-world/Tile').Tile;
    setTile(tile: import('@civ-clone/core-world/Tile').Tile): void;
    visibility(): import('@civ-clone/core-unit/Yields').Visibility;
    waiting(): boolean;
    setWaiting(waiting?: boolean): void;
    yield(
      ...yields: import('@civ-clone/core-yield/Yield').Yield[]
    ): import('@civ-clone/core-yield/Yield').Yield[];
    '__#9@#id': string;
    '__#9@#keys': (keyof any)[];
    addKey(...keys: (keyof any)[]): void;
    id(): string;
    keys(): (keyof any)[];
    sourceClass<T extends NewableFunction>(): T;
    toPlainObject(
      dataObjectFilter?: import('@civ-clone/core-data-object/DataObject').DataObjectFilter,
      additionalDataRegistry?: import('@civ-clone/core-data-object/AdditionalDataRegistry').AdditionalDataRegistry
    ): import('@civ-clone/core-data-object/DataObject').ObjectMap;
  };
  build(
    city: import('@civ-clone/core-city/City').City,
    ruleRegistry?: RuleRegistry
  ): Unit;
};
export default Transport;
