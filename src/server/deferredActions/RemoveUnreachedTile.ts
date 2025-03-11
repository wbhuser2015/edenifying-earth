import {IPlayer} from '../IPlayer';
import {SelectSpace} from '../inputs/SelectSpace';
import {DeferredAction} from './DeferredAction';
import {Priority} from './Priority';
import {LogHelper} from '../LogHelper';

export class RemoveUnreachedTile extends DeferredAction {
  constructor(
    player: IPlayer,
    public title: string = 'Select an Unreached tile to remove from board',
  ) {
    super(player, Priority.DEFAULT);
  }

  public execute() {
    // false: don't include upgraded Unreached.
    const removableUnreachedTiles = this.player.game.board.getUnreachedSpaces({upgradedUnreached: false});
    if (removableUnreachedTiles.length === 0) {
      return undefined;
    }
    return new SelectSpace(this.title, removableUnreachedTiles)
      .andThen((space) => {
        this.player.game.removeTile(space.id);
        LogHelper.logBoardTileAction(this.player, space, 'Unreached tile', 'removed');
        return undefined;
      });
  }
}
