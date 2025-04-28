import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class RuthsRedemption extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.RUTHS_REDEMPTION,
      cost: 5, // Adjust as needed
      victoryPoints: 1,

	  requirements: { prophecies_fulfilled: 6, max},

    behavior: {
      stock: { provision: 10 },
    },

    metadata: {
      cardNumber: 'X01', // Update manually
      renderData: CardRenderer.builder((b) => {
        b.provision(10);
      }),
        description: 'Gain 10 provision.',
      },
    });
  }
}