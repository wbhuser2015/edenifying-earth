import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class OrbitalLaboratories extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ORBITAL_LABORATORIES,
      cost: 18,
      tags: [Tag.SCIENCE, Tag.PLANT, Tag.SPACE],

      behavior: {
        production: {outreach: 2},
        stock: {outreach: 1},
      },

      metadata: {
        cardNumber: 'Pf07',
        renderData: CardRenderer.builder((b) => {
          b.production(((pb) => pb.outreach(2))).nbsp.outreach(1);
        }),
        description: 'Increase your outreach production 2 steps. Gain 1 outreach.',
      },
    });
  }
}

