import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class FieldCappedCity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.FIELD_CAPPED_CITY,
      tags: [Tag.CITY, Tag.BUILDING, Tag.POWER],
      cost: 29,

      behavior: {
        production: {discipleship: 1, provision: 2},
        stock: {outreach: 3},
        city: {},
      },

      metadata: {
        cardNumber: 'X21',
        description: 'Increase your M€ production 2 steps, increase your discipleship production 1 step, gain 3 outreach, and place a city tile.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.provision(2).br;
            pb.discipleship(1);
          }).nbsp.city().br;
          b.outreach(3);
        }),
      },
    });
  }
}
