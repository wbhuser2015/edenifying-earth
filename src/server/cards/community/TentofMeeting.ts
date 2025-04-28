import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';
import { Tag } from '../../../common/cards/Tag';

export class TentofMeeting extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.TENT_OF_MEETING,
      tags: [Tag.PRAYER],
      cost: 20, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6, max},

      behavior: {
        production: { provision: 1 },
		city: {},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1)).nbsp.city().br;;
        }),
        description: 'Increase your Provision production 1 step, and place a church tile.',
      },
    });
  }
}