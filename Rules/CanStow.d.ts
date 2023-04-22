import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';
import { ITransport } from '../Transport';
export declare class CanStow extends Rule<[ITransport, Unit], boolean> {}
export default CanStow;
