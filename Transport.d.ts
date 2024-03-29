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
export declare const Transport: (Base: typeof Unit) => {
  new (
    city: import('@civ-clone/core-city/City').City | null,
    player: import('@civ-clone/core-player/Player').Player,
    tile: Tile,
    ruleRegistry?: RuleRegistry
  ): {
    '__#30@#ruleRegistry': RuleRegistry;
    '__#30@#transportRegistry': TransportRegistry;
    canStow(unit: Unit): boolean;
    capacity(): Capacity;
    cargo(): Unit[];
    cargoWeight(): CargoWeight;
    hasCapacity(): boolean;
    hasCargo(): boolean;
    setRuleRegistry(ruleRegistry: RuleRegistry): void;
    setTransportRegistry(transportRegistry: TransportRegistry): void;
    stow(unit: Unit, sourceTile?: Tile): boolean;
    unload(unit: Unit): boolean;
    '__#28@#active': boolean;
    '__#28@#busy': import('@civ-clone/core-unit/Rules/Busy').Busy | null;
    '__#28@#city': import('@civ-clone/core-city/City').City | null;
    '__#28@#destroyed': boolean;
    '__#28@#moves': import('@civ-clone/core-unit/Yields').Moves;
    '__#28@#player': import('@civ-clone/core-player/Player').Player;
    '__#28@#ruleRegistry': RuleRegistry;
    '__#28@#status': import('@civ-clone/core-unit/Action').Action | null;
    '__#28@#tile': Tile;
    '__#28@#waiting': boolean;
    action(
      action: import('@civ-clone/core-unit/Action').Action,
      ...args: any[]
    ): void;
    actions(
      to?: Tile | import('@civ-clone/core-world/Tile').INeighbouringTiles,
      from?: Tile
    ): import('@civ-clone/core-unit/Action').Action[];
    actionsForNeighbours(
      from?: Tile
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
    tile(): Tile;
    setTile(tile: Tile): void;
    visibility(): import('@civ-clone/core-unit/Yields').Visibility;
    waiting(): boolean;
    setWaiting(waiting?: boolean): void;
    yield(
      ...yields: import('@civ-clone/core-yield/Yield').Yield[]
    ): import('@civ-clone/core-yield/Yield').Yield[];
    '__#3@#id': string;
    '__#3@#keys': (keyof any)[];
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
  ): import('@civ-clone/core-city-build/Buildable').BuildableInstance;
};
export default Transport;
