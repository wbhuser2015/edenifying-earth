import {IAward} from './IAward';
import {IPlayer} from '../IPlayer';

export class Miner implements IAward {
  public readonly name = 'Prayer Warrior';
  public readonly description = 'Have the most prayer';
  public getScore(player: IPlayer): number {
    if (player.game.isDoneWithFinalProduction()) {
      return player.prayer;
    } else {
      return player.prayer + player.production.prayer;
    }
  }
}
