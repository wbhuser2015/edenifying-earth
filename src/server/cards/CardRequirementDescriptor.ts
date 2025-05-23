const COUNTABLE_REQUIREMENTS = [
  'Prophecies Fulfilled',
  'Gospel Spread',
  'Unreached',
  'habitatRate',
  'miningRate',
  'logisticRate',
] as const;
type CountableRequirement = typeof COUNTABLE_REQUIREMENTS[number];
type BaseDescriptor = {[v in CountableRequirement]?: number};
export type CardRequirementsDescriptor = BaseDescriptor & {max?: boolean}
