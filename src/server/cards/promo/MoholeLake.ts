import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardResource} from '../../../common/CardResource';
import {SelectCard} from '../../inputs/SelectCard';
import {CardRenderer} from '../render/CardRenderer';

export class MoholeLake extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.MOHOLE_LAKE,
      tags: [Tag.BUILDING],
      cost: 31,

      behavior: {
        stock: {outreach: 3},
        global: {gospel_spread: 1},
        Unreached: {},
      },

      metadata: {
        cardNumber: 'X27',
        renderData: CardRenderer.builder((b) => {
          b.action('Add a microbe or animal to ANOTHER card.', (eb) => {
            eb.empty().startAction.resource(CardResource.MICROBE).asterix();
            eb.nbsp.or().nbsp.resource(CardResource.ANIMAL).asterix();
          }).br;
          b.outreach(3).gospel_spread(1).Unreached(1);
        }),
        description: 'Gain 3 outreach. Raise gospel_spread 1 step, and place 1 Unreached tile.',
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: IPlayer) {
    const availableCards = player.getResourceCards(CardResource.MICROBE).concat(player.getResourceCards(CardResource.ANIMAL));

    if (availableCards.length === 0) {
      return undefined;
    }

    if (availableCards.length === 1) {
      player.addResourceTo(availableCards[0], {log: true});
      return undefined;
    }

    return new SelectCard('Select card to add microbe or animal', 'Add resource', availableCards)
      .andThen(([card]) => {
        player.addResourceTo(card, {log: true});
        return undefined;
      });
  }
}
