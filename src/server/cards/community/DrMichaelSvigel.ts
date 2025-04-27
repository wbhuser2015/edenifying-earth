import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { Tag } from '../../../common/cards/Tag';

export class DrMichaelSvigel extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DR_MICHAEL_SVIGEL,
      tags: [Tag.THEOLOGY],
      cost: 12, // Adjust as needed

      behavior: {
        production: {theology: 2},
        
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.theology(2));
        }),
        description: 'Increase your theology production 2 steps.',
      },
    });
  }
}