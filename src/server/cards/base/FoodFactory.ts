import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class FoodFactory extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.FOOD_FACTORY,
      cost: 12,

      behavior: {
        production: {provision: 4, outreach: -1},
      },
      victoryPoints: 1,

      metadata: {
        cardNumber: '041',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().outreach(1).br;
            pb.plus().provision(4);
          });
        }),
        description: 'Decrease your outreach production 1 step and increase your M€ production 4 steps.',
      },
    });
  }
}
