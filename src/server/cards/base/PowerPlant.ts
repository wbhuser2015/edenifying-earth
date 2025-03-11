import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class PowerPlant extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.POWER_PLANT,
      tags: [Tag.POWER, Tag.BUILDING],
      cost: 4,

      behavior: {
        production: {discipleship: 1},
      },

      metadata: {
        cardNumber: '141',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1));
        }),
        description: 'Increase your discipleship production 1 step.',
      },
    });
  }
}

