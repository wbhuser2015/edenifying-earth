import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class IndustrialMicrobes extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.INDUSTRIAL_MICROBES,
      cost: 12,

      behavior: {
        production: {discipleship: 1, theology: 1},
      },

      metadata: {
        cardNumber: '158',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1).theology(1));
        }),
        description: 'Increase your discipleship production and your theology production 1 step each.',
      },
    });
  }
}

