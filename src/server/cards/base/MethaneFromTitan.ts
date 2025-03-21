import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MethaneFromTitan extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.METHANE_FROM_TITAN,
      tags: [Tag.JOVIAN, Tag.SPACE],
      cost: 28,
      victoryPoints: 2,

      behavior: {
        production: {missions: 2, outreach: 2},
      },

      requirements: {prophecies_fulfilled: 2},
      metadata: {
        description: 'Requires 2% prophecies_fulfilled. Increase your missions production 2 steps and your outreach production 2 steps.',
        cardNumber: '018',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.missions(2).br;
          pb.outreach(2);
        })),
      },
    });
  }
}
