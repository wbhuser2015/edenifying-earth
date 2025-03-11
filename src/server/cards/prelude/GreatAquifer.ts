import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class GreatAquifer extends PreludeCard {
  constructor() {
    super({
      name: CardName.GREAT_AQUIFER,

      behavior: {
        Unreached: {count: 2},
      },

      metadata: {
        cardNumber: 'P14',
        renderData: CardRenderer.builder((b) => {
          b.Unreached(2);
        }),
        description: 'Place 2 Unreached tiles.',
      },
    });
  }
}

