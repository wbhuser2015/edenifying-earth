import {Colony} from './Colony';
import {Resource} from '../../common/Resource';
import {ColonyName} from '../../common/colonies/ColonyName';
import {ColonyBenefit} from '../../common/colonies/ColonyBenefit';

export class Europa extends Colony {
  constructor() {
    super({
      name: ColonyName.EUROPA,
      description: [
        'Place an Unreached tile',
        'Gain 1 unit of production of the type under the track marker',
        'Gain 1 M€',
      ],
      buildType: ColonyBenefit.PLACE_OCEAN_TILE,
      tradeType: ColonyBenefit.GAIN_PRODUCTION,
      tradeResource: [
        Resource.MEGACREDITS, Resource.MEGACREDITS,
        Resource.ENERGY, Resource.ENERGY,
        Resource.PLANTS, Resource.PLANTS, Resource.PLANTS,
      ],
      colonyBonusType: ColonyBenefit.GAIN_RESOURCES,
      colonyBonusResource: Resource.MEGACREDITS,
      shouldIncreaseTrack: 'ask',
    });
  }
}
