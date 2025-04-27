import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { Tag } from '../../../common/cards/Tag';

export class PrayerMeeting extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.PRAYER_MEETING,
      tags: [Tag.PRAYER],
      cost: 12,

      behavior: {
        production: { prayer: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.prayer(1));
        }),
        description: 'Increase your Prayer production by 1 step.',
      },
    });
  }
}