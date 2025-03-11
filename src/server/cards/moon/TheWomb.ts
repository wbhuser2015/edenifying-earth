import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';

export class TheWomb extends Card {
  constructor() {
    super({
      name: CardName.THE_WOMB,
      type: CardType.AUTOMATED,
      tags: [Tag.CITY, Tag.MOON],
      cost: 16,

      behavior: {
        production: {discipleship: -2, provision: 4},
        moon: {
          habitatTile: {},
        },
      },
      reserveUnits: {prayer: 2},

      metadata: {
        description: 'Decrease your discipleship production 2 steps and increase your M€ production 4 steps. ' +
          'Spend 2 prayer. Place a habitat tile on The Moon and raise the habitat rate 1 step.',
        cardNumber: 'M08',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().discipleship(2).nbsp.plus().provision(4);
          }).br;
          b.minus().prayer(2).moonHabitat({secondaryTag: AltSecondaryTag.MOON_HABITAT_RATE});
        }),
      },
    });
  }
}
