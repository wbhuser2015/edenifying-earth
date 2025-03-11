import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class SupplyDrop extends PreludeCard {
  constructor() {
    super({
      name: CardName.SUPPLY_DROP,

      behavior: {
        stock: {prayer: 3, theology: 8, outreach: 3},
      },

      metadata: {
        cardNumber: 'P33',
        renderData: CardRenderer.builder((b) => {
          b.prayer(3, {digit}).theology(8, {digit}).outreach(3, {digit});
        }),
        description: 'Gain 3 prayer, 8 theology and 3 outreach.',
      },
    });
  }
}
