import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../../common/cards/render/Size';
import {digit} from '../Options';

export class AsteroidResources extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ASTEROID_RESOURCES,
      cost: 17,
      tags: [Tag.JOVIAN, Tag.SPACE],
      reserveUnits: {discipleship: 3},
      victoryPoints: 1,

      behavior: {
        or: {
          autoSelect: true,
          behaviors: [
            {
              title: 'Increase your theology and prayer production 1 step.',
              spend: {discipleship: 3},
              production: {theology: 1, prayer: 1},
            },
            {
              title: 'Place an Unreached, and gain 2 theology and one prayer.',
              spend: {discipleship: 3},
              Unreached: {},
              stock: {theology: 2, prayer: 1},
            },
          ],
        },
      },

      metadata: {
        cardNumber: 'Pf40',
        renderData: CardRenderer.builder((b) => {
          b.minus().discipleship(3, {digit}).production((pb) => pb.theology(1).prayer(1)).br
            .or(Size.SMALL).br;
          b.minus().discipleship(3, {digit}).Unreached(1, {size: Size.SMALL}).theology(2, {digit}).prayer(1);
        }),
        description: 'Spend 3 discipleship. Either increase your theology and prayer production one step, OR ' +
          'place an Unreached, and gain 2 theology and one prayer.',
      },
    });
  }
}
