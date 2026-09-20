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
  hasUnit(unit: Unit): boolean;
}

export class TransportRegistry
  extends EntityRegistry<TransportManifest>
  implements ITransportRegistry
{
  // A manifest's unit and transport are fixed for its lifetime — stowing
  // registers one and unloading unregisters it — so neither key can go stale
  // under a live registration and neither needs a `reindex`.
  private _byTransport = this.index(
    (manifest: TransportManifest): ITransport => manifest.transport()
  );
  private _byUnit = this.index(
    (manifest: TransportManifest): Unit => manifest.unit()
  );

  constructor() {
    super(TransportManifest);
  }

  getByTransport(transport: ITransport): TransportManifest[] {
    return this._byTransport.get(transport);
  }

  getByUnit(unit: Unit): TransportManifest {
    const manifests = this._byUnit.get(unit);

    if (manifests.length !== 1) {
      throw new TypeError(`Wrong number of results. (${manifests.length})`);
    }

    return manifests[0];
  }

  /**
   * Is this unit aboard anything?
   *
   * `getByUnit` throws when the answer is no, so asking it that question costs
   * a thrown `TypeError` — and callers did ask, inside a `try`/`catch`, for
   * every unit on every move. A 150-turn game spent 23% of its time in
   * `getByUnit`, almost all of it answering "no" the expensive way.
   */
  hasUnit(unit: Unit): boolean {
    return this._byUnit.has(unit);
  }
}

export const instance: TransportRegistry = new TransportRegistry();

export default TransportRegistry;
