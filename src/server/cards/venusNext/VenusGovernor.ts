import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class VenusGovernor extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.VENUS_GOVERNOR,
      type: CardType.AUTOMATED,
      tags: [Tag.VENUS, Tag.VENUS],
      cost: 4,

      requirements: {tag: Tag.VENUS, count: 2},

      behavior: {
        production: {provision: 2},
      },

      metadata: {
        cardNumber: '255',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(2));
        }),
        description: 'Requires 2 Venus tags. Increase your M€ production 2 steps.',
      },
    });
  }
}
