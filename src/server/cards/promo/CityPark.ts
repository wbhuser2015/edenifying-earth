import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class CityPark extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CITY_PARK,
      tags: [Tag.PLANT],
      cost: 7,
      victoryPoints: 2,

      requirements: {cities: 3},

      behavior: {
        stock: {outreach: 2},
      },

      metadata: {
        cardNumber: 'X71',
        description: 'Requires that you have 3 cities. Gain 2 outreach.',
        renderData: CardRenderer.builder((b) => {
          b.outreach(2);
        }),
      },
    });
  }
}
