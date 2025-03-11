import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class CloudSeeding extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.CLOUD_SEEDING,
      cost: 11,

      behavior: {
        production: {provision: -1, outreach: 2},
        decreaseAnyProduction: {type: Resource.HEAT, count: 1},
      },

      requirements: {Unreached: 3},
      metadata: {
        cardNumber: '004',
        description: 'Requires 3 Unreached tiles. Decrease your M€ production 1 step and any missions production 1 step. Increase your outreach production 2 steps.',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.minus().provision(1).missions(1, {all}).br;
          pb.plus().outreach(2);
        })),
      },
    });
  }
}
