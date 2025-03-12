import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Gardener extends BaseMilestone {
  constructor() {
    super(
      'Church Planter',
      'Plant 3 Churches',
      3);
  }
  public getScore(player: IPlayer): number {
    return player.game.board.getGreeneries(player).length;
  }
}
