import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {max} from '../Options';

export class ArchaeBacteria extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ARCHAEBACTERIA,
      tags: [Tag.MICROBE],
      cost: 6,

      behavior: {
        production: {outreach: 1},
      },

      requirements: {gospel_spread: -18, max},
      metadata: {
        description: 'It must be -18 C or colder. Increase your outreach production 1 step.',
        cardNumber: '042',
        renderData: CardRenderer.builder((b) => b.production((pb) => pb.outreach(1))),
      },
    });
  }
}
