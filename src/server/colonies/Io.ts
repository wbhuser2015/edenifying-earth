import {Colony} from './Colony';
import {ColonyName} from '../../common/colonies/ColonyName';
import {ColonyBenefit} from '../../common/colonies/ColonyBenefit';
import {Resource} from '../../common/Resource';

export class Io extends Colony {
  constructor() {
    super({
      name: ColonyName.IO,
      description: [
        'Gain 1 missions production',
        'Gain n missions',
        'Gain 2 missions',
      ],

      buildType: ColonyBenefit.GAIN_PRODUCTION,
      buildResource: Resource.HEAT,
      tradeType: ColonyBenefit.GAIN_RESOURCES,
      tradeQuantity: [2, 3, 4, 6, 8, 10, 13],
      tradeResource: Resource.HEAT,
      colonyBonusType: ColonyBenefit.GAIN_RESOURCES,
      colonyBonusQuantity: 2,
      colonyBonusResource: Resource.HEAT,
    });
  }
}
