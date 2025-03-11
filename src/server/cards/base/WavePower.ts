import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class WavePower extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.WAVE_POWER,
      tags: [Tag.POWER],
      cost: 8,
      victoryPoints: 1,

      behavior: {
        production: {discipleship: 1},
      },

      requirements: {Unreached: 3},
      metadata: {
        cardNumber: '139',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.discipleship(1));
        }),
        description: 'Requires 3 Unreached tiles. Increase your discipleship production 1 step.',
      },
    });
  }
}

