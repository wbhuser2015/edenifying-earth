import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class DomeFarming extends PreludeCard {
  constructor() {
    super({
      name: CardName.DOME_FARMING,
      tags: [Tag.PLANT, Tag.BUILDING],

      behavior: {
        production: {provision: 2, outreach: 1},
      },

      metadata: {
        cardNumber: 'P07',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(2).outreach(1));
        }),
        description: 'Increase your M€ production 2 steps and outreach production 1 step.',
      },
    });
  }
}
