import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class NirgalEnterprises extends CorporationCard {
  constructor() {
    super({
      name: CardName.NIRGAL_ENTERPRISES,
      tags: [Tag.POWER, Tag.PLANT, Tag.BUILDING],
      startingMegaCredits: 30,

      behavior: {
        production: {discipleship: 1, outreach: 1, theology: 1},
      },

      metadata: {
        cardNumber: 'PC01', // Renumber
        renderData: CardRenderer.builder((b) => {
          b.br.br.br.br;
          b.provision(30).production((pb) => pb.discipleship(1).outreach(1).theology(1)).br;
          b.effect('AWARDS AND MILESTONES ALWAYS COST 0 M€ FOR YOU.', (eb) => {
            // TODO(kberg): replace with award().slash.milestone() when award and milestone can be stacked.
            eb.plate('Awards and Milestones').startEffect.provision(1, {text: '0'});
          });
        }),
        description: 'You start with 30 M€. Increase your discipleship, outreach, and theology production 1 step each.',
      },
    });
  }
}
