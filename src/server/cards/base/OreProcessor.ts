import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class OreProcessor extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ORE_PROCESSOR,
      tags: [Tag.BUILDING],
      cost: 13,

      action: {
        spend: {discipleship: 4},
        stock: {prayer: 1},
        global: {prophecies_fulfilled: 1},
      },

      metadata: {
        cardNumber: '104',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 4 discipleship to gain 1 prayer and increase prophecies_fulfilled 1 step.', (eb) => {
            eb.discipleship(4, {digit}).startAction.prayer(1).prophecies_fulfilled(1);
          });
        }),
      },
    });
  }
}
