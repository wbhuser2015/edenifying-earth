import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {ActionCard} from '../ActionCard';

export class CaretakerContract extends ActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.CARETAKER_CONTRACT,
      cost: 3,
      requirements: {gospel_spread: 0},

      action: {
        spend: {missions: 8},
        tr: 1,
      },

      metadata: {
        cardNumber: '154',
        description: 'Requires 0° C or warmer.',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 8 missions to increase your terraform rating 1 step.', (eb) => {
            eb.missions(8).startAction.tr(1);
          });
        }),
      },
    });
  }
}
