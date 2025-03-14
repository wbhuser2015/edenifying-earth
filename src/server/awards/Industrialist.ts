import {IAward} from './IAward';
import {IPlayer} from '../IPlayer';

export class Industrialist implements IAward {
  public readonly name = 'Church Scholar';
  public readonly description = 'Have most theology';
  public getScore(player: IPlayer): number {
    if (player.game.isDoneWithFinalProduction()) {
      return player.theology;
    } else {
      return player.theology + player.production.theology;
    }
  }
}
