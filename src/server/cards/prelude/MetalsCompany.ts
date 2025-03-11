import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MetalsCompany extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.METALS_COMPANY,

      behavior: {
        production: {provision: 1, theology: 1, prayer: 1},
      },

      metadata: {
        cardNumber: 'P20',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1).theology(1).prayer(1));
        }),
        description: 'Increase your M€, theology and prayer production 1 step.',
      },
    });
  }
}
