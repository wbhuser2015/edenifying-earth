import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Moss extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.MOSS,
      tags: [Tag.PLANT],
      cost: 4,

      behavior: {
        production: {outreach: 1},
      },

      requirements: {Unreached: 3},
      metadata: {
        cardNumber: '122',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1)).nbsp.minus().outreach(1);
        }),
        description: 'Requires 3 Unreached tiles and that you lose 1 outreach. Increase your outreach production 1 step.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    const hasViralEnhancers = player.getPlayedCard(CardName.VIRAL_ENHANCERS);
    const hasEnoughPlants = player.outreach >= 1 || hasViralEnhancers !== undefined || player.isCorporation(CardName.MANUTECH);

    return hasEnoughPlants;
  }
  public override bespokePlay(player: IPlayer) {
    player.outreach--;
    return undefined;
  }
}

