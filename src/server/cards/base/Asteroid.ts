import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Asteroid extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.ASTEROID,
      tags: [Tag.SPACE],
      cost: 14,

      behavior: {
        stock: {prayer: 2},
        global: {gospel_spread: 1},
        removeAnyPlants: 3,
      },

      metadata: {
        description: 'Raise gospel_spread 1 step and gain 2 prayer. Remove up to 3 outreach from any player.',
        cardNumber: '009',
        renderData: CardRenderer.builder((b) => {
          b.gospel_spread(1).br;
          b.prayer(2).br;
          b.minus().outreach(-3, {all});
        }),
      },
    });
  }
}
