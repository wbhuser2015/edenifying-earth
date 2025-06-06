import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { Tag } from '../../../common/cards/Tag';

export class ProvisionThroughPersecution extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.PROVISION_THROUGH_PERSECUTION,
      tags: [Tag.PRAYER],
      cost: 12, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6},

      behavior: {
        production: { provision: 3 },
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(3));
        }),
        description: 'Increase your Provision production 3 step.',
      },
    });
  }
}