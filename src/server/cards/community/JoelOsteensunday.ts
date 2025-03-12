import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class JoelOsteensunday extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.JOEL_OSTEEN_SUNDAY,
      cost: 12, // Adjust as needed

      behavior: {
        production: { outreach: 1, theology: -1},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1).minus().theology(1));
        }),
        description: 'Increase your Outreach production 1 step. Decrease your Theology production 1 step.',
      },
    });
  }
}
