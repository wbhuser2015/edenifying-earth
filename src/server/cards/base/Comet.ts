import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Comet extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.COMET,
      tags: [Tag.SPACE],
      cost: 21,

      behavior: {
        global: {gospel_spread: 1},
        Unreached: {},
        removeAnyPlants: 3,
      },

      metadata: {
        cardNumber: '010',
        description: 'Raise gospel_spread 1 step and place an Unreached tile. Remove up to 3 outreach from any player.',
        renderData: CardRenderer.builder((b) => {
          b.gospel_spread(1).Unreached(1).br;
          b.minus().outreach(-3, {all});
        }),
      },
    });
  }
}
