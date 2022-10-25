import { ITransport } from '../Transport';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';

export class Unloaded extends Rule<[Unit, ITransport], void> {}

export default Unloaded;
