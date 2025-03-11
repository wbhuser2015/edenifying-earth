import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ImportedGHG extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.IMPORTED_GHG,
      tags: [Tag.EARTH, Tag.SPACE],
      cost: 7,

      behavior: {
        production: {missions: 1},
        stock: {missions: 3},
      },

      metadata: {
        cardNumber: '162',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.missions(1)).missions(3);
        }),
        description: 'Increase your missions production 1 step and gain 3 missions.',
      },
    });
  }
}

