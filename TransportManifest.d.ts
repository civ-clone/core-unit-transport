import { DataObject } from '@civ-clone/core-data-object/DataObject';
import { ITransport } from './Transport';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
export interface ITransportManifest {
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}
/**
 * One unit aboard one transport, and now an entity.
 *
 * It was a plain class, which `EntityRegistry` accepts happily, but
 * `core-save-game` discovers entities by walking `DataObject`s, so a manifest
 * was invisible to a save. A loaded game had every unit aboard a ship or a
 * Carrier back on the map with its `Stowed` busy rule and nothing carrying it:
 * the ship sailed without it, and an aircraft was lost at the next fuel check
 * (civ-clone/web-renderer#81). `StrategyNote` went through the same change.
 *
 * All three fields are entities, so each is saved as a `$ref` and comes back as
 * the restored instance.
 */
export declare class TransportManifest
  extends DataObject
  implements ITransportManifest
{
  private _sourceTile;
  private _transport;
  private _unit;
  constructor(transport: ITransport, unit: Unit, sourceTile: Tile);
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}
export default TransportManifest;
