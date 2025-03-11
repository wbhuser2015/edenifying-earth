import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';

export class Nightclubs extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.NIGHTCLUBS,
      cost: 11,
      tags: [Tag.BUILDING],

      requirements: {cities: 1},

      behavior: {
        production: {provision: 2},
        underworld: {corruption: 1},
      },

      metadata: {
        cardNumber: 'U08',
        renderData: CardRenderer.builder((b) => {
          b.corruption(1).production((pb) => pb.provision(2));
        }),
        description: 'Requires that you own a city in play. Gain 1 corruption and increase your M€ production 2 steps.',
      },
    });
  }
}
