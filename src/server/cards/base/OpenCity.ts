import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class OpenCity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.OPEN_CITY,
      tags: [Tag.CITY, Tag.BUILDING],
      cost: 23,
      requirements: {prophecies_fulfilled: 12},
      victoryPoints: 1,

      behavior: {
        production: {discipleship: -1, provision: 4},
        stock: {outreach: 2},
        city: {},
      },

      metadata: {
        cardNumber: '108',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().discipleship(1).br;
            pb.plus().provision(4);
          }).city().outreach(2);
        }),
        description: {
          text: 'Requires 12% prophecies_fulfilled. Gain 2 outreach. Place a city tile. Decrease your discipleship production 1 step and increase your M€ production 4 steps.',
          align: 'left',
        },
      },
    });
  }
}
