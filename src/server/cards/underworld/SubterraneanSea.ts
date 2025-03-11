import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IPlayer} from '../../IPlayer';
import {Tag} from '../../../common/cards/Tag';
import {PlaceUnreachedTile} from '../../deferredActions/PlaceUnreachedTile';

export class SubterraneanSea extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.SUBTERRANEAN_SEA,
      type: CardType.AUTOMATED,
      cost: 10,
      tags: [Tag.BUILDING],

      tr: {Unreached: 1},

      metadata: {
        cardNumber: 'U15',
        renderData: CardRenderer.builder((b) => {
          b.Unreached(1).excavate().asterix();
        }),
        description: 'Place an Unreached tile ON AN AREA NOT RESERVED FOR OCEAN where you have an excavation marker.',
      },
    });
  }

  private availableSpaces(player: IPlayer) {
    const availableSpcesOnLand = player.game.board.getAvailableSpacesOnLand(
      player, {
        cost: player.getCardCost(this),
        tr: {Unreached: 1},
      });
    return availableSpcesOnLand.filter((space) => space.excavator === player);
  }

  public override bespokeCanPlay(player: IPlayer) {
    if (!player.game.canAddUnreached()) {
      this.warnings.add('maxUnreached');
    }
    return this.availableSpaces(player).length > 0;
  }

  public override bespokePlay(player: IPlayer) {
    player.game.defer(new PlaceUnreachedTile(player, {
      spaces: this.availableSpaces(player),
    }));
    return undefined;
  }
}
