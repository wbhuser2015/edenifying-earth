import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class ChurchSplit extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CHURCH_SPLIT,
      cost: 16, // Adjust as needed

      behavior: {
        production: { theology: -1 }, // Decrease Theology production by 2
        greenery: {}, // Allows placing a Greenery tile
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.minus().theology(1)).br;
          b.greenery();
        }),
        description: 'Plant a church. Decrease your theology production by 1',
      },
    });
  }
}
