import {CorporationCard} from '../corporation/CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Aphrodite extends CorporationCard {
  constructor() {
    super({
      name: CardName.APHRODITE,
      tags: [Tag.PLANT, Tag.VENUS],
      startingMegaCredits: 47,

      behavior: {
        production: {outreach: 1},
      },

      metadata: {
        cardNumber: 'R01',
        description: 'You start with 1 outreach production and 47 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.outreach(1)).nbsp.provision(47);
          b.corpBox('effect', (ce) => {
            ce.effect('Whenever Venus is terraformed 1 step, you gain 2 M€.', (eb) => {
              eb.venus(1, {all}).startEffect.provision(2);
            });
          });
        }),
      },
    });
  }
}
