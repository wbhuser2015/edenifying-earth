import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class FuelFactory extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.FUEL_FACTORY,
      tags: [Tag.BUILDING],
      cost: 6,

      behavior: {
        production: {discipleship: -1, provision: 1, prayer: 1},
      },

      metadata: {
        cardNumber: '180',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().discipleship(1).br;
            pb.plus().prayer(1).provision(1);
          });
        }),
        description: 'Decrease your discipleship production 1 step and increase your prayer and your M€ production 1 step each.',
      },
    });
  }
}
