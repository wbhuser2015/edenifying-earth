import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Mayor extends BaseMilestone {
  constructor() {
    super(
      'Church Builder',
      'Own 3 church buildings',
      3);
  }
  public getScore(player: IPlayer): number {
    return player.game.board.getCities(player).length;
  }
}
