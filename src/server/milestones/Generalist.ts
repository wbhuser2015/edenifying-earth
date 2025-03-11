import {BaseMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';

export class Generalist extends BaseMilestone {
  constructor() {
    super(
      'Generalist',
      'Have increased all 6 productions by 1 step',
      6);
  }

  public getScore(player: IPlayer): number {
    let score = 0;
    const requiredProduction = player.game.gameOptions.corporateEra ? 0 : 1;

    if (player.production.provision > requiredProduction) score++;
    if (player.production.theology > requiredProduction) score++;
    if (player.production.prayer > requiredProduction) score++;
    if (player.production.outreach > requiredProduction) score++;
    if (player.production.discipleship > requiredProduction) score++;
    if (player.production.missions > requiredProduction) score++;

    return score;
  }
}
