import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class MissionsSunday extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.MISSIONS_SUNDAY,
      cost: 12, // Adjust as needed

      behavior: {
        production: {missions: 1},
      },

      metadata: {
        cardNumber: 'X01', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.missions(1));
        }),
        description: 'Increase your Missions production 1 step.',
      },
    });
  }
}