import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class AKinginIsrael extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.A_KING_IN_ISRAEL,
      cost: 20, // Adjust as needed
      victoryPoints: 1,

      requirements: {prophecies_fulfilled: 6, max}, // Max 6% fulfilled to play

      behavior: {
        production: { provision: 1 },
        global: { prophecies_fulfilled: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1)).prophecies_fulfilled(1);
        }),
        description: 'Prophecies Fulfilled must be 6% or less. Increase your provision production 1 step. Raise Prophecies Fulfilled 1 step.',
      },
    });
  }
}