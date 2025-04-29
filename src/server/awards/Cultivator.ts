import {IAward} from './IAward';
import {IPlayer} from '../IPlayer';

export class Cultivator implements IAward {
  public readonly name = 'Church Planter';
  public readonly description = 'Own the most church plant tiles';
  public getScore(player: IPlayer): number {
    return player.game.board.getGreeneries(player).length;
  }
}
