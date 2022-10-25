import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import { ITransport } from './Transport';
import TransportManifest from './TransportManifest';
import Unit from '@civ-clone/core-unit/Unit';
export interface ITransportRegistry extends IEntityRegistry<TransportManifest> {
  getByTransport(transport: ITransport): TransportManifest[];
  getByUnit(unit: Unit): TransportManifest;
}
export declare class TransportRegistry
  extends EntityRegistry<TransportManifest>
  implements ITransportRegistry
{
  constructor();
  getByTransport(transport: ITransport): TransportManifest[];
  getByUnit(unit: Unit): TransportManifest;
}
export declare const instance: TransportRegistry;
export default TransportRegistry;
