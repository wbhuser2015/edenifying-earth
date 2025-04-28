import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';
import { Tag } from '../../../common/cards/Tag';

export class Synagogue extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SYNAGOGUE,
      tags: [Tag.THEOLOGY],
      cost: 20, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6, max},

      behavior: {
        production: { theology: 1 },
		city: {},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.theology(1)).nbsp.city().br;;
        }),
        description: 'Increase your theology production 1 step, and place a church tile.',
      },
    });
  }
}