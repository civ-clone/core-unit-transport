import { ITransport } from '../Transport';
import Rule from '@civ-clone/core-rule/Rule';

export class LostAtSea extends Rule<[ITransport], void> {}

export default LostAtSea;
