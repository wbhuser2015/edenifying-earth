import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SocietySupport extends PreludeCard {
  constructor() {
    super({
      name: CardName.SOCIETY_SUPPORT,

      behavior: {
        production: {outreach: 1, discipleship: 1, missions: 1, provision: -1},
      },

      metadata: {
        cardNumber: 'P31',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.provision(-1).outreach(1).br;
            pb.discipleship(1).missions(1);
          });
        }),
        description: 'Increase your outreach, discipleship and missions production 1 step. Decrease M€ production 1 step.',
      },
    });
  }
}
