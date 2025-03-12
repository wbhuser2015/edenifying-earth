import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class RaiseoftheFalseProphet extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.RAISE_OF_THE_FALSE_PROPHET,
      cost: 10, // Adjust as needed
      victoryPoints: -2, // Lose 2 Victory Points

      behavior: {
        global: { prophecies_fulfilled: 1 }, // Raise Prophecy Fulfilled by 1
        production: { discipleship: -1 }, // Decrease Discipleship production by 1
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(1).br;
          b.production((pb) => pb.minus().discipleship(1)).br;
        }),
        description: 'Raise Prophecies Fulfilled by 1. Decrease your Discipleship production by 1.',
      },
    });
  }
}
