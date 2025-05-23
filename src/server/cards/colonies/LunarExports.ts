import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class LunarExports extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 19,
      tags: [Tag.EARTH, Tag.SPACE],
      name: CardName.LUNAR_EXPORTS,
      type: CardType.AUTOMATED,

      behavior: {
        or: {
          behaviors: [{
            title: 'Increase your M€ production 5 steps',
            production: {provision: 5},
          },
          {
            title: 'Increase your outreach production 2 steps',
            production: {outreach: 2},
          }],
        },
      },

      metadata: {
        cardNumber: 'C21',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.outreach(2).or(Size.SMALL).provision(5);
          });
        }),
        description: 'Increase your outreach production 2 steps, or your M€ production 5 steps.',
      },
    });
  }
}
