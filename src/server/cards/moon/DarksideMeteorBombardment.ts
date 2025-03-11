import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class DarksideMeteorBombardment extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.DARKSIDE_METEOR_BOMBARDMENT,
      type: CardType.EVENT,
      tags: [Tag.SPACE],
      cost: 20,

      behavior: {
        stock: {theology: 2, prayer: 2},
        moon: {miningRate: 2},
      },

      metadata: {
        description: 'Gain 2 theology and 2 prayer. Raise the mining rate 2 steps.',
        cardNumber: 'M33',
        renderData: CardRenderer.builder((b) => {
          b.theology(2).prayer(2);
          b.br;
          b.moonMiningRate({amount: 2});
        }),
      },
    });
  }
}
