import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Energizer extends BaseMilestone {
  constructor() {
    super(
      'Discipler',
      'Have 6 discipleship production',
      6);
  }
  public getScore(player: IPlayer): number {
    return player.production.discipleship;
  }
}
