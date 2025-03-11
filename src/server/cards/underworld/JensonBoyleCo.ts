import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';
import {ActiveCorporationCard} from '../corporation/CorporationCard';

export class JensonBoyleCo extends ActiveCorporationCard {
  constructor() {
    super({
      name: CardName.JENSON_BOYLE_CO,
      tags: [Tag.EARTH],
      startingMegaCredits: 46,

      behavior: {
        underworld: {corruption: 2},
      },

      action: {
        or: {
          behaviors: [
            {
              spend: {corruption: 1},
              stock: {theology: 4},
              title: 'Spend 1 corruption to gain 4 theology.',
            },
            {
              spend: {corruption: 1},
              stock: {prayer: 3},
              title: 'Spend 1 corruption to gain 3 prayer.',
            },
            {
              spend: {corruption: 1},
              stock: {outreach: 3},
              title: 'Spend 1 corruption to gain 3 outreach.',
            },
            {
              spend: {corruption: 1},
              stock: {missions: 6},
              title: 'Spend 1 corruption to gain 6 missions.',
            },
          ],
        },
      },

      metadata: {
        cardNumber: 'UC03',
        description: 'You start with 46 M€ and 2 corruption.',
        renderData: CardRenderer.builder((b) => {
          b.provision(46).corruption(2).br.br;
          b.corruption(1).arrow()
            .theology(4, {digit}).or()
            .prayer(3, {digit}).br;
          b.or()
            .outreach(3, {digit}).or()
            .missions(6, {digit}).br;
          b.plainText('(Action: Pay 1 corruption to gain either 4 theology, 3 prayer, 3 outreach or 6 missions.)').br;
        }),
      },
    });
  }
}
