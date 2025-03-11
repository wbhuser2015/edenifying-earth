import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ConvoyFromEuropa extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.CONVOY_FROM_EUROPA,
      tags: [Tag.SPACE],
      cost: 15,

      behavior: {
        Unreached: {},
        drawCard: 1,
      },

      metadata: {
        cardNumber: '161',
        description: 'Place 1 Unreached tile and draw 1 card.',
        renderData: CardRenderer.builder((b) => b.Unreached(1).cards(1)),
      },
    });
  }
}
