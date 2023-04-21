import { ITransport } from './Transport';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';
export interface ITransportManifest {
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}
export declare class TransportManifest implements ITransportManifest {
  #private;
  constructor(transport: ITransport, unit: Unit, sourceTile: Tile);
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}
export default TransportManifest;
