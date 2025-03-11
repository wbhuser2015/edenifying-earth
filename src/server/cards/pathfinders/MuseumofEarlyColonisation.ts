import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {all} from '../Options';

export class MuseumofEarlyColonisation extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.MUSEUM_OF_EARLY_COLONISATION,
      cost: 20,
      tags: [Tag.BUILDING, Tag.MARS],
      requirements: [{Unreached: 1}, {cities: 1, all}, {greeneries: 1, all}],

      behavior: {
        production: {discipleship: -1, theology: 1, prayer: 1, outreach: 1},
        tr: 1,
      },

      metadata: {
        cardNumber: 'Pf11',
        renderData: CardRenderer.builder((b) => {
          b.production(((pb) => pb.minus().discipleship(1).nbsp.theology(1).prayer(1).outreach(1)));
          b.br.tr(1);
        }),
        description: 'Requires 1 Unreached, 1 city and one greenery on Mars. ' +
         'Decrease your discipleship production 1 step. Raise your theology, prayer, and outreach production 1 step. ' +
         'Gain 1 TR.',
      },
    });
  }
}
