import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { Tag } from '../../../common/cards/Tag';

export class ChurchatAntioch extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CHURCH_AT_ANTIOCH,
      tags: [Tag.PRAYER],
      cost: 20, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6},

      behavior: {
        production: { discipleship: 3 },
		city: {},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(3)).nbsp.city().br;;
        }),
        description: 'Increase your discipleship production 3 steps and place a church tile.',
      },
    });
  }
}