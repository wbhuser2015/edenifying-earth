import { Card } from '../Card';
import { CardType } from '../../../common/cards/CardType';
import { CardName } from '../../../common/cards/CardName';
import { CardRenderer } from '../render/CardRenderer';
import { IProjectCard } from '../IProjectCard';
import { IPlayer } from '../../IPlayer';
import {SpaceName} from '../../../common/boards/SpaceName'; 


export class NewJerusalem extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.NEW_JERUSALEM,
      cost: 30,
      victoryPoints: 3,

      requirements: { prophecies_fulfilled: 3 },

      metadata: {
      
        description: 'Place a City tile at the site of New Jerusalem.',
        cardNumber: 'X02', // Update manually
        renderData: CardRenderer.builder((b) => {
          b.city();
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    const space = player.game.board.getSpaceOrThrow(SpaceName.NEW_JERUSALEM);
    player.game.addCity(player, space);
    return undefined;
  }
}
