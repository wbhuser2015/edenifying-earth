import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {digit} from '../Options';
import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';
import {Resource} from '../../../common/Resource';
import {IActionCard} from '../ICard';
import {Behavior} from '../../behavior/Behavior';
import {getBehaviorExecutor} from '../../behavior/BehaviorExecutor';

export class PalladinShipping extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.PALLADIN_SHIPPING,
      tags: [Tag.SPACE],
      startingMegaCredits: 36,

      behavior: {
        stock: {prayer: 5},
      },

      metadata: {
        cardNumber: 'PC02', // Renumber
        renderData: CardRenderer.builder((b) => {
          b.provision(36).prayer(5, {digit}).br;
          b.effect('When you play a space event, gain 1 prayer.', (eb) => {
            eb.tag(Tag.SPACE).tag(Tag.EVENT).startEffect.prayer(1);
          });
          b.br;
          b.action('Spend 2 prayer to raise the gospel_spread 1 step.', (ab) => {
            ab.prayer(2).startAction.gospel_spread(1);
          });
        }),
        description: 'You start with 36 M€. Gain 5 prayer.',
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (player.isCorporation(this.name)) {
      if (card.type === CardType.EVENT && card.tags.includes(Tag.SPACE)) {
        player.stock.add(Resource.TITANIUM, 1, {log: true});
      }
    }
  }

  public canAct(player: IPlayer) {
    return getBehaviorExecutor().canExecute(PalladinShipping.actionBehavior, player, this);
  }

  private static actionBehavior: Behavior = {
    spend: {prayer: 2},
    global: {gospel_spread: 1},
  };

  public action(player: IPlayer) {
    getBehaviorExecutor().execute(PalladinShipping.actionBehavior, player, this);
    return undefined;
  }
}
