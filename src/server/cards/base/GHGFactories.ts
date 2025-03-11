import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class GHGFactories extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.GHG_FACTORIES,
      tags: [Tag.BUILDING],
      cost: 11,

      behavior: {
        production: {discipleship: -1, missions: 4},
      },

      metadata: {
        cardNumber: '126',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().discipleship(1).br;
            pb.plus().missions(4, {digit});
          });
        }),
        description: 'Decrease your discipleship production 1 step and increase your missions production 4 steps.',
      },
    });
  }
}
