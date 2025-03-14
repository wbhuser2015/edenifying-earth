import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Trees extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.TREES,
      tags: [Tag.PLANT],
      cost: 13,
      victoryPoints: 1,

      behavior: {
        production: {outreach: 3},
        stock: {outreach: 1},
      },

      requirements: {prophecies_fulfilled: 4},
      metadata: {
        cardNumber: '060',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(3)).outreach(1);
        }),
        description: 'Requires -4 C or warmer. Increase your outreach production 3 steps. Gain 1 outreach.',
      },
    });
  }
}
