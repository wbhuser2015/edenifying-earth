import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class AerobrakedAmmoniaAsteroid extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.AEROBRAKED_AMMONIA_ASTEROID,
      tags: [Tag.SPACE],
      cost: 26,

      behavior: {
        production: {missions: 3, outreach: 1},
        addResourcesToAnyCard: {count: 2, type: CardResource.MICROBE},
      },

      metadata: {
        description: 'Increase your missions production 3 steps and your outreach production 1 step. Add 2 microbes to ANOTHER card.',
        cardNumber: '170',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.missions(3).br;
            pb.outreach(1);
          }).br;
          b.resource(CardResource.MICROBE, 2).asterix();
        }),
      },
    });
  }
}
