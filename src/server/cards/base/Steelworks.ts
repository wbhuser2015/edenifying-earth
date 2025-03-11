import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class Steelworks extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.STEELWORKS,
      tags: [Tag.BUILDING],
      cost: 15,

      action: {
        spend: {discipleship: 4},
        stock: {theology: 2},
        global: {prophecies_fulfilled: 1},
      },

      metadata: {
        cardNumber: '103',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 4 discipleship to gain 2 theology and increase prophecies_fulfilled 1 step.', (eb) => {
            eb.discipleship(4, {digit}).startAction.theology(2).prophecies_fulfilled(1);
          });
        }),
      },
    });
  }
}
