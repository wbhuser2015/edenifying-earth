import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class TheRapture extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.THE_RAPTURE,
      cost: 25, // Adjust as needed
      victoryPoints: 2, // Correct placement

      behavior: {
        global: { prophecies_fulfilled: 2 }, // Raise Prophecy Fulfilled meter by 2
        production: {discipleship: -1 }, // Increase Provision, Decrease Discipleship

      },

      requirements: {prophecies_fulfilled: 10},
      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(2).br;
          b.production((pb) => pb.minus().discipleship(1)).br;
    
        }),
        description: 'Raise Prophecies Fulfilled by 2. Decrease your Discipleship production by 1.',
      },
    });
  }
}
