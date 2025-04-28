import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class SolomoicTemple extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SOLOMOIC_TEMPLE,
      cost: 24, // Adjust as needed
      victoryPoints: 2,

      requirements: {prophecies_fulfilled: 6, max}, // Max 6% fulfilled to play

      behavior: {
        production: { discipleship: 2 },
        global: { prophecies_fulfilled: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(2)).prophecies_fulfilled(1);
        }),
        description: 'Prophecies Fulfilled must be 6% or less. Increase your Discipleship production 2 step. Raise Prophecies Fulfilled 1 step.',
      },
    });
  }
}