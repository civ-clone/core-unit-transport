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
export declare class TransportRegistry
  extends EntityRegistry<TransportManifest>
  implements ITransportRegistry
{
  private _byTransport;
  private _byUnit;
  constructor();
  getByTransport(transport: ITransport): TransportManifest[];
  getByUnit(unit: Unit): TransportManifest;
  /**
   * Is this unit aboard anything?
   *
   * `getByUnit` throws when the answer is no, so asking it that question costs
   * a thrown `TypeError` — and callers did ask, inside a `try`/`catch`, for
   * every unit on every move. A 150-turn game spent 23% of its time in
   * `getByUnit`, almost all of it answering "no" the expensive way.
   */
  hasUnit(unit: Unit): boolean;
}
export declare const instance: TransportRegistry;
export default TransportRegistry;
