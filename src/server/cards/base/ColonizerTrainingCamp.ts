import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ColonizerTrainingCamp extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.COLONIZER_TRAINING_CAMP,
      tags: [Tag.PRAYER],
      cost: 25,
      victoryPoints: 2,

      requirements: {prophecies_fulfilled: 5},

      behavior: {
        global: {prophecies_fulfilled: 2},
      },

      metadata: {
        description: 'prophecies_fulfilled must be 6% or less. Raise Prophecies Fulfilled 2 step. Gain 2 VP.',
        cardNumber: '001',
        renderData: CardRenderer.builder((b) => {
                  b.prophecies_fulfilled(2);
        }),
      },
    });
  }
}
