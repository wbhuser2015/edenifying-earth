import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class GivingCampaign extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.GIVING_CAMPAIGN,
      cost: 12, 

      behavior: {
        production: { provision: 1 }, 
        stock: { provision: 2 }, 
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {  
          b.production((pb) => pb.provision(1)).provision(2);
        }),
        description: 'Increase your Provision production by 1 step. Gain 2 Provision.',
      },
    });
  }
}
