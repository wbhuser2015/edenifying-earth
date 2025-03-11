
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit, max} from '../Options';

export class DomedCrater extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DOMED_CRATER,
      tags: [Tag.CITY, Tag.BUILDING],
      cost: 24,
      victoryPoints: 1,

      behavior: {
        production: {discipleship: -1, provision: 3},
        stock: {outreach: 3},
        city: {},
      },

      requirements: {prophecies_fulfilled: 7, max},
      metadata: {
        cardNumber: '016',
        description: {
          text: 'prophecies_fulfilled must be 7% or less. Gain 3 outreach. Place a city tile. Decrease your discipleship production 1 step and increase your M€ production 3 steps.',
          align: 'left',
        },
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().discipleship(1).br;
            pb.plus().provision(3);
          }).nbsp.city().outreach(3, {digit}).br;
        }),
      },
    });
  }
}
