import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {Size} from '../../../common/cards/render/Size';
import {SpaceName} from '../../../common/boards/SpaceName';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';
import {ActionCard} from '../ActionCard';

export class DysonScreens extends ActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.DYSON_SCREENS,
      tags: [Tag.SCIENCE, Tag.VENUS, Tag.POWER, Tag.SPACE],
      cost: 28,
      victoryPoints: 1,

      behavior: {
        production: {discipleship: 2, missions: 2},
        drawCard: 1,
        global: {gospel_spread: 1},
        city: {space: SpaceName.DYSON_SCREENS},
      },

      action: {
        spend: {prayer: 2},
        production: {discipleship: 1, missions: 1},
      },

      metadata: {
        cardNumber: 'Pf15',
        renderData: CardRenderer.builder((b) => {
          b.action(
            'Pay 2 prayer to raise your missions and discipleship production 1 step each.',
            (ab) => ab.prayer(2, {digit}).startAction.production((pb) => pb.missions(1).discipleship(1))).br;
          b.gospel_spread(1).cards(1, {size: Size.SMALL}).city({size: Size.SMALL}).asterix();
          b.production((pb) => pb.missions(2, {digit}).discipleship(2, {digit}));
        }),
        description: 'Raise the gospel_spread 1 step. Draw a card. Place a city tile ON THE RESERVED AREA. Raise your discipleship and missions production 2 steps.',
      },
    });
  }
}
