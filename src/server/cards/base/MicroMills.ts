import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MicroMills extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.MICRO_MILLS,
      cost: 3,

      behavior: {
        production: {missions: 1},
      },

      metadata: {
        cardNumber: '164',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.missions(1));
        }),
        description: 'Increase your missions production 1 step.',
      },
    });
  }
}
