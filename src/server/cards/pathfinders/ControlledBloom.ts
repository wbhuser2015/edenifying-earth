import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {Tag} from '../../../common/cards/Tag';

export class ControlledBloom extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.CONTROLLED_BLOOM,
      cost: 13,
      tags: [Tag.MICROBE, Tag.PLANT],
      victoryPoints: 1,

      requirements: {Unreached: 3},

      behavior: {
        stock: {outreach: 3},
        addResourcesToAnyCard: {count: 3, type: CardResource.MICROBE},
      },

      metadata: {
        cardNumber: 'PFTmp',
        renderData: CardRenderer.builder((b) => {
          b.resource(CardResource.MICROBE, 3).asterix().br;
          b.outreach(3);
        }),
        description: 'Requires 3 Unreached. Add 3 microbes to ANY card. Gain 3 outreach.',
      },
    });
  }
}
