import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {SelectAmount} from '../../inputs/SelectAmount';
import {CardName} from '../../../common/cards/CardName';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';

export class ToscheStation extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.TOSCHE_STATION,
      tags: [Tag.POWER, Tag.PLANT],
      cost: 5,

      metadata: {
        cardNumber: 'SW04',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend X Energy and gain X-1 outreach (max 4.)', (ab) => {
            ab.text('x').discipleship(1).startAction.text('x-1').outreach(1).text('max 4');
          });
        }),
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.discipleship > 0;
  }

  public action(player: Player) {
    return new SelectAmount('Select amount of discipleship to spend', 'Spend discipleship', 1, Math.min(player.discipleship, 4))
      .andThen((amount) => {
        player.stock.deduct(Resource.ENERGY, amount);
        player.stock.add(Resource.PLANTS, amount - 1, {log: true});
        return undefined;
      });
  }
}
