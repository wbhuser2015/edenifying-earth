import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {ActionCard} from '../ActionCard';
import {digit} from '../Options';

export class DirectedHeatUsage extends ActionCard {
  constructor() {
    super({
      name: CardName.DIRECTED_HEAT_USAGE,
      type: CardType.ACTIVE,
      cost: 1,

      action: {
        or: {
          behaviors: [
            {
              title: 'Spend 3 missions to gain 4 M€',
              spend: {missions: 3},
              stock: {provision: 4},
            },
            {
              title: 'Spend 3 missions to gain 2 outreach',
              spend: {missions: 3},
              stock: {outreach: 2},
            },
          ],
        },
      },

      metadata: {
        cardNumber: 'X48',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 3 missions to gain either 4 M€ or 2 outreach.', (eb) =>
            eb.empty().missions(3, {digit}).startAction.provision(4).or().outreach(2));
        }),
      },
    });
  }
}
