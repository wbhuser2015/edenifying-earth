import {BaseMilestone} from '../IMilestone';
import {IPlayer} from '../../IPlayer';

export class Engineer extends BaseMilestone {
  constructor() {
    super(
      'Engineer',
      'Have a total of 10 discipleship and missions production',
      10);
  }

  public getScore(player: IPlayer): number {
    return player.production.discipleship + player.production.missions;
  }
}
