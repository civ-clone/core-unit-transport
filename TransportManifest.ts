import { ITransport } from './Transport';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

export interface ITransportManifest {
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}

export class TransportManifest implements ITransportManifest {
  private _sourceTile: Tile;
  private _transport: ITransport;
  private _unit: Unit;

  constructor(transport: ITransport, unit: Unit, sourceTile: Tile) {
    this._transport = transport;
    this._unit = unit;
    this._sourceTile = sourceTile;
  }

  sourceTile(): Tile {
    return this._sourceTile;
  }

  transport(): ITransport {
    return this._transport;
  }

  unit(): Unit {
    return this._unit;
  }
}

export default TransportManifest;
