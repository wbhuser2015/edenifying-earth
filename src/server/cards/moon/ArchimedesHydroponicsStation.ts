import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class ArchimedesHydroponicsStation extends Card {
  constructor() {
    super({
      name: CardName.ARCHIMEDES_HYDROPONICS_STATION,
      type: CardType.AUTOMATED,
      tags: [Tag.PLANT],
      cost: 12,

      behavior: {
        production: {discipleship: -1, provision: -1, outreach: 2},
      },

      metadata: {
        description: 'Decrease your discipleship production 1 step and your M€ production 1 step. Increase your outreach production 2 steps.',
        cardNumber: 'M27',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.minus().discipleship(1).provision(1).nbsp.plus().outreach(2));
        }),
      },
    });
  }
}
