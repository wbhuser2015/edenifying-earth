import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class DeepLunarMining extends Card {
  constructor() {
    super({
      name: CardName.DEEP_LUNAR_MINING,
      type: CardType.AUTOMATED,
      tags: [Tag.MOON],
      cost: 18,
      reserveUnits: {prayer: 1},

      behavior: {
        production: {prayer: 2},
        moon: {miningRate: 1},
      },

      metadata: {
        description: 'Spend 1 prayer. Increase your prayer production 2 steps. Raise the mining rate 1 step.',
        cardNumber: 'M18',
        renderData: CardRenderer.builder((b) => {
          b.minus().prayer(1).production((pb) => {
            pb.prayer(2);
          }).br;
          b.moonMiningRate();
        }),
      },
    });
  }
}
