import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class Polyphemos extends CorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS,
      startingMegaCredits: 50,
      cardCost: 5,

      behavior: {
        production: {provision: 5},
        stock: {prayer: 5},
      },

      metadata: {
        cardNumber: 'R11',
        description: 'You start with 50 M€. Increase your M€ production 5 steps. Gain 5 prayer.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.provision(50).nbsp.production((pb) => pb.provision(5)).nbsp.prayer(5, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand.', (eb) => {
              eb.cards(1).asterix().startEffect.provision(5);
            });
          });
        }),
      },
    });
  }
}
