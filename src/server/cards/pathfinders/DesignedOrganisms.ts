import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardResource} from '../../../common/CardResource';

export class DesignedOrganisms extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.DESIGNED_ORGANISMS,
      cost: 13,
      tags: [Tag.SCIENCE, Tag.PLANT, Tag.MARS],
      requirements: {tag: Tag.SCIENCE, count: 5},

      behavior: {
        production: {outreach: 2},
        stock: {outreach: 3},
        addResourcesToAnyCard: [
          {count: 3, type: CardResource.MICROBE},
          {count: 1, type: CardResource.ANIMAL},
        ],
      },

      metadata: {
        cardNumber: 'Pf23',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(2)).outreach(3).br;
          b.resource(CardResource.MICROBE, 3).asterix().resource(CardResource.ANIMAL).asterix();
        }),
        description: 'Requires 5 science tags. Increase your outreach production 2 steps. Gain 3 outreach. ' +
          'Add 3 microbes to ANY card. Add 1 animal to ANY card.',
      },
    });
  }
}
