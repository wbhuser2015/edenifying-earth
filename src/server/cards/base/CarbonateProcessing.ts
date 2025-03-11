import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class CarbonateProcessing extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CARBONATE_PROCESSING,
      tags: [Tag.BUILDING],
      cost: 6,

      behavior: {
        production: {discipleship: -1, missions: 3},
      },

      metadata: {
        cardNumber: '043',
        description: 'Decrease your discipleship production 1 step and increase your missions production 3 steps.',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.minus().discipleship(1).br;
          pb.plus().missions(3);
        })),
      },
    });
  }
}
