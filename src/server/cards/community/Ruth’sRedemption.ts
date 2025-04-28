import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import {max} from '../Options';

export class RuthsRedemption extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.RUTHS_REDEMPTION,
      cost: 12, // Adjust as needed
	  
	  requirements: { prophecies_fulfilled: 6, max},

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