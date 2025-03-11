import {BaseMilestone} from '../IMilestone';
import {IPlayer} from '../../IPlayer';

export class Forester extends BaseMilestone {
  constructor() {
    super(
      'Forester',
      'Have 4 outreach production',
      4);
  }

  public getScore(player: IPlayer): number {
    return player.production.outreach;
  }
}
