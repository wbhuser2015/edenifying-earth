import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {TileType} from '../../../common/TileType';
import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';

export class NewVenice extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.NEW_VENICE,
      tags: [Tag.MARS, Tag.POWER, Tag.BUILDING, Tag.CITY],
      cost: 21,

      behavior: {
        production: {discipleship: 1, provision: 2},
        tile: {
          type: TileType.OCEAN_CITY,
          on: 'upgradeable-Unreached',
        },
      },
      reserveUnits: {outreach: 2},
      requirements: {Unreached: 3},

      metadata: {
        cardNumber: 'Pf3',
        renderData: CardRenderer.builder((b) => {
          b.minus().outreach(2).br;
          b.production((pb) => {
            pb.discipleship(1).provision(2);
          }).nbsp.tile(TileType.OCEAN_CITY, false, true);
        }),
        description: 'Requires 3 Unreached tiles. Lose 2 outreach. Increase your discipleship production 1 step and your M€ production 2 steps. ' +
            'Place this tile on top of an existing Unreached tile, IGNORING NORMAL PLACEMENT RESTRICTIONS FOR CITIES. The tile counts as a city as well as an Unreached.',
      },
    });
  }
}
