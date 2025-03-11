import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class MEGACHURCHNETWORK extends CorporationCard {
  constructor() {
    super({
      name: CardName.MEGACHURCHNETWORK,
      startingMegaCredits: 36,

      behavior: {
        production: {outreach: 2},
        stock: {outreach: 3},
        greeneryDiscount: 1,
      },

      metadata: {
        cardNumber: 'R77',
        description: 'You start with 2 outreach production, 3 outreach, and 36 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.outreach(2)).nbsp.provision(36).outreach(3, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('You may always pay 7 outreach, instead of 8, to place a church plant.', (eb) => {
              eb.outreach(7, {digit}).startAction.greenery();
            });
          });
        }),
      },
    });
  }
}
