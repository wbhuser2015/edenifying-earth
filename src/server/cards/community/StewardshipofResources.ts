import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class StewardshipofResources extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.STEWARDSHIP_OF_RESOURCES,
      cost: 12, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6},

      behavior: {
        production: { provision: 1 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(1));
        }),
        description: 'Increase your Provision production 1 step.',
      },
    });
  }
}