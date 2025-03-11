import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class DTS extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DTS,
      cost: 15,

      behavior: {
        production: {theology: 1},
        stock: {theology: 3},
      },

      metadata: {
        cardNumber: '501',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.theology(1)).theology(3);
        }),
        description: 'Increase your theology production 1 step. Gain 3 theology.',
      },
    });
  }
}
