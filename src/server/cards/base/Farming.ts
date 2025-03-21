
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Farming extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.FARMING,
      tags: [Tag.PLANT],
      cost: 16,
      victoryPoints: 2,

      behavior: {
        production: {provision: 2, outreach: 2},
        stock: {outreach: 2},
      },

      requirements: {gospel_spread: 4},
      metadata: {
        cardNumber: '118',
        description: 'Requires +4° C or warmer. Increase your M€ production 2 steps and your outreach production 2 steps. Gain 2 outreach.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.provision(2).br;
            pb.outreach(2);
          }).nbsp.outreach(2);
        }),
      },
    });
  }
}
