import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { Tag } from '../../../common/cards/Tag';

export class RumorsofWar extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.RUMORS_OF_WAR,
      tags: [Tag.THEOLOGY, Tag.PRAYER],
      cost: 15, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 8},

       behavior: {
        global: { prophecies_fulfilled: 1 }, // Raise Prophecy Fulfilled by 1
      },
 
      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(1);
        }),
        description: 'Raise Prophecies Fulfilled by 1.',
      },
    });
  }
}