import {IPlayer} from '../../IPlayer';
import {IAward} from '../IAward';
export class Manufacturer implements IAward {
  public readonly name = 'Manufacturer';
  public readonly description = 'Have the highest production of theology and missions combined.';

  public getScore(player: IPlayer): number {
    return player.production.theology + player.production.missions;
  }
}
