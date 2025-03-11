import {IAward} from '../IAward';
import {IPlayer} from '../../IPlayer';
import {Board} from '../../boards/Board';

export class Highlander implements IAward {
  public readonly name = 'Highlander';
  public readonly description = 'Own the most tiles that are NOT adjacent to Unreached tiles';
  public getScore(player: IPlayer): number {
    const board = player.game.board;

    const playerOwnedSpaces = board.spaces.filter((space) =>
      space.player === player && space.tile !== undefined,
    );

    const countNotAdjacentToUnreached = playerOwnedSpaces.filter((space) => {
      const adjacentSpaces = board.getAdjacentSpaces(space);
      return !adjacentSpaces.some((adjSpace) => Board.isUnreachedSpace(adjSpace));
    }).length;

    return countNotAdjacentToUnreached;
  }
}
