import { ITransport } from './Transport';
import Unit from '@civ-clone/core-unit/Unit';
export interface ITransportManifest {
  transport(): ITransport;
  unit(): Unit;
}
export declare class TransportManifest implements ITransportManifest {
  #private;
  constructor(transport: ITransport, unit: Unit);
  transport(): ITransport;
  unit(): Unit;
}
export default TransportManifest;
