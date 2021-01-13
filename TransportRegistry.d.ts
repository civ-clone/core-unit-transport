import {
  EntityRegistry,
  IEntityRegistry,
} from '@civ-clone/core-registry/EntityRegistry';
import TransportManifest from './TransportManifest';
import Unit from '@civ-clone/core-unit/Unit';
export interface ITransportRegistry extends IEntityRegistry<TransportManifest> {
  getByTransport(transport: Unit): TransportManifest[];
  getByUnit(unit: Unit): TransportManifest;
}
export declare class TransportRegistry
  extends EntityRegistry<TransportManifest>
  implements ITransportRegistry {
  constructor();
  getByTransport(transport: Unit): TransportManifest[];
  getByUnit(unit: Unit): TransportManifest;
}
export declare const instance: TransportRegistry;
export default TransportRegistry;
