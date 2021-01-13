import { IRuleRegistry } from '@civ-clone/core-rule/RuleRegistry';
import Rule from '@civ-clone/core-rule/Rule';
import Unit from '@civ-clone/core-unit/Unit';
export declare class LostAtSea<T extends Unit = Unit> extends Rule<[T], void> {}
export default LostAtSea;
export interface ILostAtSeaRegistry<T extends Unit = Unit>
  extends IRuleRegistry<LostAtSea, [T], void> {}
