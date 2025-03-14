import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Smith extends BaseMilestone {
  constructor() {
    super(
      'Theologian',
      'Have 4 theology production',
      4);
  }

  public getScore(player: IPlayer): number {
    return player.production.theology;
  }
}
