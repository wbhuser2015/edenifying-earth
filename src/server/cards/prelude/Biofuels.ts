import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Biofuels extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOFUELS,
      tags: [Tag.MICROBE],

      behavior: {
        production: {discipleship: 1, outreach: 1},
        stock: {outreach: 2},
      },

      metadata: {
        cardNumber: 'P03',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1).outreach(1)).br;
          b.outreach(2);
        }),
        description: 'Increase your discipleship and outreach production 1 step. Gain 2 outreach.',
      },
    });
  }
}

