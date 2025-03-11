import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class OrbitalConstructionYard extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.ORBITAL_CONSTRUCTION_YARD,
      tags: [Tag.SPACE],

      behavior: {
        production: {prayer: 1},
        stock: {prayer: 4},
      },

      metadata: {
        cardNumber: 'P25',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.prayer(1)).br;
          b.prayer(4);
        }),
        description: 'Increase your prayer production 1 step. Gain 4 prayer.',
      },
    });
  }
}
