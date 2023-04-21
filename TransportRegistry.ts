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

export class TransportRegistry
  extends EntityRegistry<TransportManifest>
  implements ITransportRegistry
{
  constructor() {
    super(TransportManifest);
  }

  getByTransport(transport: ITransport): TransportManifest[] {
    return this.getBy('transport', transport);
  }

  getByUnit(unit: Unit): TransportManifest {
    const manifests = this.getBy('unit', unit);

    if (manifests.length !== 1) {
      throw new TypeError(`Wrong number of results. (${manifests.length})`);
    }

    return manifests[0];
  }
}

export const instance: TransportRegistry = new TransportRegistry();

export default TransportRegistry;
