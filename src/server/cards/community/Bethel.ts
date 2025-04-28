import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class Bethel extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.BETHEL,
      cost: 20, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6, max},

      behavior: {
        production: { outreach: 1 },
		city: {},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1)).nbsp.city().br;;
        }),
        description: 'Increase your outreach production 1 step, and place a church tile.',
      },
    });
  }
}