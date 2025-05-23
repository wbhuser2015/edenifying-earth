import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {IPlayer} from '../../IPlayer';
import {PreludeCard} from './PreludeCard';
import {PlayProjectCard} from '../../deferredActions/PlayProjectCard';
import {CardRenderer} from '../render/CardRenderer';

export class EcologyExperts extends PreludeCard {
  constructor() {
    super({
      name: CardName.ECOLOGY_EXPERTS,
      tags: [Tag.PLANT, Tag.MICROBE],

      behavior: {
        production: {outreach: 1},
      },

      metadata: {
        cardNumber: 'P10',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.outreach(1)).br.br;
          b.projectRequirements();
        }),
        description: 'Increase your outreach production 1 step. PLAY A CARD FROM HAND, IGNORING GLOBAL REQUIREMENTS.',
      },
    });
  }
  public override getGlobalParameterRequirementBonus(player: IPlayer): number {
    if (player.lastCardPlayed === this.name) {
      // Magic number high enough to always ignore requirements.
      return 50;
    }
    return 0;
  }
  public override bespokePlay(player: IPlayer) {
    player.game.defer(new PlayProjectCard(player));
    return undefined;
  }
}
