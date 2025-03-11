import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Smith extends BaseMilestone {
  constructor() {
    super(
      'Smith',
      'Have a total of 7 theology and prayer production',
      7);
  }

  public getScore(player: IPlayer): number {
    return player.production.theology + player.production.prayer;
  }
}
