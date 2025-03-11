import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class AntidesertificationTechniques extends PreludeCard {
  constructor() {
    super({
      name: CardName.ANTI_DESERTIFICATION_TECHNIQUES,
      tags: [Tag.MICROBE, Tag.PLANT],

      behavior: {
        production: {outreach: 1, theology: 1},
        stock: {provision: 3},
      },

      metadata: {
        cardNumber: 'X49',
        renderData: CardRenderer.builder((b) => {
          b.provision(3).br;
          b.production((pb) => pb.outreach(1).theology(1));
        }),
        description: 'Gain 3 M€. Increase your outreach production 1 step and your theology production 1 step.',
      },
    });
  }
}

