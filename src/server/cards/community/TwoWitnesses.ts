import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class TwoWitnesses extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.TWO_WITNESSES,
      cost: 30,

      behavior: {
        stock: { prayer: 2 }, // Gain 2 prayer
        global: { prophecies_fulfilled: 2 }, // Raise Prophecies Fulfilled by 2
      },

      requirements: {prophecies_fulfilled: 10},
      metadata: {
        cardNumber: 'TW01',
        description: 'Raise Prophecies Fulfilled 2 steps and gain 2 Prayer.',
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(2).br;
          b.prayer(2).br;
        }),
      },
    });
  }
}
