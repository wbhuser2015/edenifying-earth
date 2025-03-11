import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class NitrogenShipment extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.NITROGEN_SHIPMENT,

      behavior: {
        production: {outreach: 1},
        tr: 1,
        stock: {provision: 5},
      },

      metadata: {
        cardNumber: 'P24',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1)).tr(1).br;
          b.provision(5);
        }),
        description: 'Increase your outreach production 1 step. Increase your TR 1 step. Gain 5 M€.',
      },
    });
  }
}
