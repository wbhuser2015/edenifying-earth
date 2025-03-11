import { IProjectCard } from '../IProjectCard';
import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';

export class AbominationOfDesolation extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.ABOMINATION_OF_DESOLATION,
      cost: 20, // Adjust as needed
      victoryPoints: -2, // Correct placement

      behavior: {
        global: { prophecies_fulfilled: 2 }, // Raise prophecy fulfilled by 2
        production: { prayer: 1 }, // Increase prayer production by 1
        stock: { missions: 1 }, // Gain 1 missions resource
      },

      metadata: {
        cardNumber: 'X02', // Adjust if needed
        renderData: CardRenderer.builder((b) => {
          b.prophecies_fulfilled(2).br;
          b.production((pb) => pb.prayer(1)).br;
          b.missions(1).br;
        }),
        description: 'Raise Prophecies Fulfilled by 2, gain 1 missions, increase your prayer production by 1, but lose 2 Victory Points.',
      },
    });
  }
}
