import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Donation extends PreludeCard {
  constructor() {
    super({
      name: CardName.DONATION,

      behavior: {
        stock: {provision: 21},
      },

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.provision(21);
        }),
        description: 'Gain 21 M€.',
      },
    });
  }
}

