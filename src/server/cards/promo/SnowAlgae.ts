import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class SnowAlgae extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SNOW_ALGAE,
      cost: 12,
      tags: [Tag.PLANT],

      behavior: {
        production: {outreach: 1, missions: 1},
      },

      requirements: {Unreached: 2},
      metadata: {
        cardNumber: '211',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.outreach(1).missions(1);
          });
        }),
        description: 'Requires 2 Unreached. Increase your outreach production and your missions production 1 step each.',
      },
    });
  }
}
