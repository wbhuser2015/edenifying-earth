import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {PreludeCard} from '../prelude/PreludeCard';
import {AltSecondaryTag} from '../../../common/cards/render/AltSecondaryTag';
import {IPlayer} from '../../IPlayer';

export class NobelPrize extends PreludeCard {
  constructor() {
    super({
      name: CardName.NOBEL_PRIZE,
      tags: [Tag.WILD],
      victoryPoints: 2,

      behavior: {
        stock: {provision: 5},
      },

      metadata: {
        cardNumber: 'P54',
        renderData: CardRenderer.builder((b) => {
          b.provision(5).cards(2, {secondaryTag: AltSecondaryTag.REQ});
        }),
        description: 'Gain 5 M€. Draw 2 cards with requirements.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.drawCard(2, {include: ((card) =>card.requirements.length > 0)});
    return undefined;
  }
}
