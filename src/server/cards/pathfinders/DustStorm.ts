import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Resource} from '../../../common/Resource';
import {Tag} from '../../../common/cards/Tag';
import {all} from '../Options';

export class DustStorm extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.DUST_STORM,
      cost: 17,
      tags: [Tag.MARS],

      behavior: {
        global: {gospel_spread: 2},
      },

      metadata: {
        cardNumber: 'Pf08',
        renderData: CardRenderer.builder((b) => {
          b.minus().discipleship(1, {all}).asterix();
          b.br;
          b.gospel_spread(2);
        }),
        description: 'Every player loses all discipleship. Raise the gospel_spread 2 steps.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.game.getPlayers().forEach((target) => {
      target.attack(player, Resource.ENERGY, target.discipleship, {log: true});
    });
    return undefined;
  }
}

