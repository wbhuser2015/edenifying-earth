import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class InheritedFortune extends PreludeCard {
  constructor() {
    super({
      name: CardName.INHERITED_FORTUNE,
      tags: [Tag.EARTH],

      behavior: {
        production: {provision: 1},
        stock: {provision: 10},
        underworld: {corruption: 1},
      },

      metadata: {
        cardNumber: 'UP03',
        renderData: CardRenderer.builder((b) => {
          b.corruption().provision(10).production((pb) => pb.provision(1));
        }),
        description: 'Gain 1 corruption and 10 M€. Increase your M€ production 1 step.',
      },
    });
  }
}

