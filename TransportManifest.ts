import Unit from '@civ-clone/core-unit/Unit';
import { ITransport } from './Transport';

export interface ITransportManifest {
  transport(): ITransport;
  unit(): Unit;
}

export class TransportManifest implements ITransportManifest {
  #transport: ITransport;
  #unit: Unit;

  constructor(transport: ITransport, unit: Unit) {
    this.#transport = transport;
    this.#unit = unit;
  }

  transport(): ITransport {
    return this.#transport;
  }

  unit(): Unit {
    return this.#unit;
  }
}

export default TransportManifest;
