import { ITransport } from './Transport';
import Tile from '@civ-clone/core-world/Tile';
import Unit from '@civ-clone/core-unit/Unit';

export interface ITransportManifest {
  sourceTile(): Tile;
  transport(): ITransport;
  unit(): Unit;
}

export class TransportManifest implements ITransportManifest {
  #sourceTile: Tile;
  #transport: ITransport;
  #unit: Unit;

  constructor(transport: ITransport, unit: Unit, sourceTile: Tile) {
    this.#transport = transport;
    this.#unit = unit;
    this.#sourceTile = sourceTile;
  }

  sourceTile(): Tile {
    return this.#sourceTile;
  }

  transport(): ITransport {
    return this.#transport;
  }

  unit(): Unit {
    return this.#unit;
  }
}

export default TransportManifest;
