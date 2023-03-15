import {CardName} from '../../../common/cards/CardName';
import {MoonExpansion} from '../../moon/MoonExpansion';
import {Player} from '../../Player';
import {Resources} from '../../../common/Resources';
import {TileType} from '../../../common/TileType';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {IActionCard} from '../ICard';
import {all} from '../Options';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class LunaHyperloopCorporation extends Card implements IActionCard, ICorporationCard {
  constructor() {
    super({
      type: CardType.CORPORATION,
      name: CardName.LUNA_HYPERLOOP_CORPORATION,
      tags: [Tag.MOON, Tag.BUILDING],
      startingMegaCredits: 38,

      behavior: {
        stock: {steel: 4},
      },

      victoryPoints: 'special',

      metadata: {
        description: 'You start with 38 M€ and 4 steel.',
        cardNumber: '',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(38).steel(4).br;
          b.action('Gain 1 M€ for each road tile on The Moon.', (eb) => {
            eb.empty().startAction.megacredits(1).slash().moonRoad({all});
          }).br,
          b.vpText('1 VP for each road tile on The Moon.').br;
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.moonRoadTile(1, true),
      },
    });
  }

  public canAct() {
    return true;
  }

  public action(player: Player) {
    const roadTileCount = MoonExpansion.spaces(player.game, TileType.MOON_ROAD, {surfaceOnly: true}).length;
    player.addResource(Resources.MEGACREDITS, roadTileCount, {log: true});

    return undefined;
  }

  public override getVictoryPoints(player: Player) {
    return MoonExpansion.spaces(player.game, TileType.MOON_ROAD, {surfaceOnly: true}).length;
  }
}
