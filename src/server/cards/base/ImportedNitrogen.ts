import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class ImportedNitrogen extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.IMPORTED_NITROGEN,
      tags: [Tag.EARTH, Tag.SPACE],
      cost: 23,

      behavior: {
        stock: {outreach: 4},
        tr: 1,
        addResourcesToAnyCard: [
          {type: CardResource.MICROBE, count: 3},
          {type: CardResource.ANIMAL, count: 2},
        ],
      },

      metadata: {
        cardNumber: '163',
        renderData: CardRenderer.builder((b) => {
          b.tr(1).br;
          b.outreach(4, {digit});
          b.resource(CardResource.MICROBE, {amount: 3, digit}).asterix().nbsp;
          b.resource(CardResource.ANIMAL, {amount: 2, digit}).asterix();
        }),
        description: 'Raise your TR 1 step and gain 4 outreach. Add 3 microbes to ANOTHER card and 2 animals to ANOTHER card.',
      },
    });
  }
}
