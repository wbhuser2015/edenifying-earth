import {IPlayer} from '../../IPlayer';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';

export class PersonalAgenda extends PreludeCard {
  constructor() {
    super({
      name: CardName.PERSONAL_AGENDA,

      behavior: {
        production: {provision: 3},
      },

      metadata: {
        cardNumber: 'PfP10',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.provision(3)).br;
          // TODO(kberg): allow more than one secondary tag.
          b.cards(3, {secondaryTag: Tag.EVENT}).asterix();
        }),
        description: 'Increase your M€ production 3 steps. Draw 3 event cards that do not have a space tag.',
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    player.drawCard(3, {
      include: (card) => {
        return card.type === CardType.EVENT &&
          (card.tags.includes(Tag.SPACE) === false);
      }});
    return undefined;
  }
}

