import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class DiscipleshipGroups extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DISCIPLESHIP_GROUPS,
      cost: 12,

      behavior: {
        production: { discipleship: 1 },
      },

      metadata: {
        cardNumber: '506', // Update manually if needed
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1));
        }),
        description: 'Increase your Discipleship production by 1 step.',
      },
    });
  }
}