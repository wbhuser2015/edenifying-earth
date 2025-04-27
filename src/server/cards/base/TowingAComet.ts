import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class TowingAComet extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.TOWING_A_COMET,
      cost: 23,

      behavior: {
        stock: {outreach: 2},
        global: {prophecies_fulfilled: 1},
        Unreached: {},
      },

      metadata: {
        cardNumber: '075',
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(1).Unreached(1).br;
          b.outreach(2);
        }),
        description: 'Gain 2 outreach. Raise prophecies_fulfilled 1 step and place an Unreached tile.',
      },
    });
  }
}
