import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class TerraformingControlStation extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.TERRAFORMING_CONTROL_STATION,
      cost: 18,
      tags: [Tag.VENUS, Tag.MARS, Tag.SPACE],

      behavior: {
        tr: 2,
      },

      cardDiscount: [{tag: Tag.VENUS, amount: 2}, {tag: Tag.MARS, amount: 2}],
      metadata: {
        cardNumber: 'Pf12',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a Venus or Mars tag, pay 2 M€ less.', (eb) => {
            eb.tag(Tag.VENUS).slash().tag(Tag.MARS).startEffect.provision(-2);
          });
          b.br.tr(2);
        }),
        description: 'Raise your TR 2 steps.',
      },
    });
  }
}

