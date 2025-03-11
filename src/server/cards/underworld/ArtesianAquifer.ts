import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {UnderworldExpansion} from '../../underworld/UnderworldExpansion';
import {PlaceUnreachedTile} from '../../deferredActions/PlaceUnreachedTile';

export class ArtesianAquifer extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ARTESIAN_AQUIFER,
      tags: [Tag.BUILDING],
      cost: 16,

      metadata: {
        cardNumber: 'U59',
        renderData: CardRenderer.builder((b) => {
          b.Unreached(1).excavate().asterix();
        }),
        description: 'Place an Unreached, then excavate the underground resource in its space, if possible.',
      },
    });
  }

  private availableSpaces(player: IPlayer) {
    return player.game.board.getAvailableSpacesForUnreached(player).filter((space) => space.excavator === undefined);
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    return player.game.canAddUnreached() && this.availableSpaces(player).length > 0;
  }

  public override bespokePlay(player: IPlayer) {
    const action = new PlaceUnreachedTile(player, {spaces: this.availableSpaces(player)})
      .andThen((space) => {
        UnderworldExpansion.excavate(player, space);
      });
    player.game.defer(action);
    return undefined;
  }
}
