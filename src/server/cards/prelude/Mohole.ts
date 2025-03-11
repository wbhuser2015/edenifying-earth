import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Mohole extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE,
      tags: [Tag.BUILDING],

      behavior: {
        production: {missions: 3},
        stock: {missions: 3},
      },

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.missions(3)).br;
          b.missions(3);
        }),
        description: 'Increase your missions production 3 steps. Gain 3 missions.',
      },
    });
  }
}
