import {BaseMilestone} from '../IMilestone';
import {IPlayer} from '../../IPlayer';
import {GlobalParameter} from '../../../common/GlobalParameter';

export class Hydrologist extends BaseMilestone {
  constructor() {
    super(
      'Hydrologist',
      'Have placed 4 Unreached.',
      4);
  }

  public getScore(player: IPlayer): number {
    return player.globalParameterSteps[GlobalParameter.OCEANS];
  }
}
