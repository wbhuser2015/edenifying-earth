import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class DeepWellHeating extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DEEP_WELL_HEATING,
      tags: [Tag.POWER, Tag.BUILDING],
      cost: 13,

      behavior: {
        production: {discipleship: 1},
        global: {gospel_spread: 1},
      },

      metadata: {
        cardNumber: '003',
        description: 'Increase your discipleship production 1 step. Increase gospel_spread 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1)).gospel_spread(1);
        }),
      },
    });
  }
}
