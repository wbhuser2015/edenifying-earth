import {IAward} from './IAward';
import {IPlayer} from '../IPlayer';

export class Naturalist implements IAward {
  public readonly name = 'Naturalist';
  public readonly description = 'Have the most outreach and missions production';

  public getScore(player: IPlayer): number {
    return player.production.missions + player.production.outreach;
  }
}
