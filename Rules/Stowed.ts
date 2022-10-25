import { ITransport } from '../Transport';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';

export class Stowed extends Rule<[Unit, ITransport], void> {}

export default Stowed;
