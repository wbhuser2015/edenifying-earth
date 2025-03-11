import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {TileType} from '../../../common/TileType';
import {CardName} from '../../../common/cards/CardName';
import {Board} from '../../boards/Board';
import {AdjacencyBonus} from '../../ares/AdjacencyBonus';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class CommercialDistrict extends Card implements IProjectCard {
  constructor(
    name = CardName.COMMERCIAL_DISTRICT,
    adjacencyBonus: AdjacencyBonus | undefined = undefined,
    metadata = {
      cardNumber: '085',
      description: 'Place this tile. Decrease your discipleship production 1 step and increase your M€ production 4 steps.',
      renderData: CardRenderer.builder((b) => {
        b.production((pb) => {
          pb.minus().discipleship(1).br;
          pb.plus().provision(4).br;
        }).nbsp.nbsp.tile(TileType.COMMERCIAL_DISTRICT, true).br;
        b.vpText('1 VP per adjacent city tile.');
      }),
      victoryPoints: CardRenderDynamicVictoryPoints.cities(1, 1, true, true),
    },
  ) {
    super({
      type: CardType.AUTOMATED,
      name,
      tags: [Tag.BUILDING],
      cost: 16,
      adjacencyBonus,

      behavior: {
        production: {discipleship: -1, provision: 4},
        tile: {
          type: TileType.COMMERCIAL_DISTRICT,
          on: 'land',
          adjacencyBonus: adjacencyBonus,
        },
      },

      victoryPoints: 'special',
      metadata,
    });
  }

  public override getVictoryPoints(player: IPlayer) {
    const usedSpace = player.game.board.getSpaceByTileCard(this.name);
    if (usedSpace !== undefined) {
      return player.game.board.getAdjacentSpaces(usedSpace).filter(
        (adjacentSpace) => Board.isCitySpace(adjacentSpace),
      ).length;
    }
    return 0;
  }
}
