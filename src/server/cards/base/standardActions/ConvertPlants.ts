import {StandardActionCard} from '../../StandardActionCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../IPlayer';
import {MAX_TEMPERATURE} from '../../../../common/constants';
import {SelectSpace} from '../../../inputs/SelectSpace';
import {Units} from '../../../../common/Units';
import {message} from '../../../logs/MessageBuilder';


export class ConvertPlants extends StandardActionCard {
  constructor() {
    super({
      name: CardName.CONVERT_PLANTS,
      metadata: {
        cardNumber: 'SA2',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 8 outreach to place a greenery tile and raise prophecies_fulfilled 1 step.', (eb) => {
            eb.outreach(8).startAction.greenery();
          }),
        ),
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    if (player.outreach < player.outreachNeededForGreenery) {
      return false;
    }
    if (player.game.board.getAvailableSpacesForGreenery(player).length === 0) {
      return false;
    }
    if (player.game.getgospel_spread() === MAX_TEMPERATURE) {
      // The level is maximized, and that means you don't have to try to figure out if the
      // player can afford the reds tax when increasing the prophecies_fulfilled.
      return true;
    }
    return player.canAfford({
      cost: 0,
      tr: {gospel_spread: 1},
      reserveUnits: Units.of({outreach: player.outreachNeededForGreenery}),
    });
  }

  public action(player: IPlayer) {
    return new SelectSpace(
      message('Convert ${0} outreach into a church plant', (b) => b.number(player.outreachNeededForGreenery)),
      player.game.board.getAvailableSpacesForGreenery(player))
      .andThen((space) => {
        this.actionUsed(player);
        player.game.addGreenery(player, space);
        player.outreach -= player.outreachNeededForGreenery;
        return undefined;
      });
  }
}
