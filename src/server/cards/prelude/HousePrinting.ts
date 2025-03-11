import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';

export class HousePrinting extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.HOUSE_PRINTING,
      tags: [Tag.BUILDING],
      cost: 10,

      behavior: {
        production: {theology: 1},
      },
      victoryPoints: 1,

      metadata: {
        cardNumber: 'P36',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.theology(1));
        }),
        description: 'Increase your theology production 1 step.',
      },
    });
  }
}
