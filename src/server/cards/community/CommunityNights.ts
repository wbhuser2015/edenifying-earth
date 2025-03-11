import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class CommunityNights extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.COMMUNITY_NIGHTS,
      cost: 12, // Adjust as needed

      behavior: {
        production: {outreach: 1},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1));
        }),
        description: 'Increase your outreach production 1 step.',
      },
    });
  }
}