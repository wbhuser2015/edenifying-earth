import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class LiberationfromEgypt extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.LIBERATION_FROM_EGYPT,
      cost: 20, // Adjust as needed

      requirements: {prophecies_fulfilled: 6, max}, // Max 6% fulfilled to play

      behavior: {
        production: { discipleship: 1 },
        global: { prophecies_fulfilled: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1)).prophecies_fulfilled(1);
        }),
        description: 'Prophecies Fulfilled must be 6% or less. Increase your Discipleship production 1 step. Raise Prophecies Fulfilled 1 step.',
      },
    });
  }
}