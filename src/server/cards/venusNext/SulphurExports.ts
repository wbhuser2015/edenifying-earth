import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class SulphurExports extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.SULPHUR_EXPORTS,
      type: CardType.AUTOMATED,
      tags: [Tag.VENUS, Tag.SPACE],
      cost: 21,

      behavior: {
        global: {venus: 1},
        production: {provision: {tag: Tag.VENUS}},
      },

      metadata: {
        cardNumber: '250',
        renderData: CardRenderer.builder((b) => {
          b.venus(1).br;
          b.production((pb) => pb.provision(1).slash().tag(Tag.VENUS));
        }),
        description: 'Increase Venus 1 step. Increase your M€ production 1 step for each Venus tag you have, including this.',
      },
    });
  }
}
