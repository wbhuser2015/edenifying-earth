import {BaseMilestone} from '../IMilestone';
import {IPlayer} from '../../IPlayer';
import {GlobalParameter} from '../../../common/GlobalParameter';

export class Hydrologist extends BaseMilestone {
  constructor() {
    super(
      'All Nations',
      'Have placed 3 Unreached.',
      3);
  }

  public getScore(player: IPlayer): number {
    return player.globalParameterSteps[GlobalParameter.OCEANS];
  }
}
