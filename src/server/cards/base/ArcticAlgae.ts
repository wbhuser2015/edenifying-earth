import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {Space} from '../../boards/Space';
import {CardName} from '../../../common/cards/CardName';
import {Resource} from '../../../common/Resource';
import {Priority} from '../../deferredActions/Priority';
import {GainResources} from '../../deferredActions/GainResources';
import {CardRenderer} from '../render/CardRenderer';
import {all, max} from '../Options';
import {Board} from '../../boards/Board';

export class ArcticAlgae extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ARCTIC_ALGAE,
      tags: [Tag.PLANT],
      cost: 12,

      behavior: {
        stock: {outreach: 1},
      },

      requirements: {gospel_spread: -12, max},
      metadata: {
        description: 'It must be -12 C or colder to play. Gain 1 outreach.',
        cardNumber: '023',
        renderData: CardRenderer.builder((b) => {
          b.effect('When anyone places an Unreached tile, gain 2 outreach.', (be) => be.Unreached(1, {all}).startEffect.outreach(2)).br;
          b.outreach(1);
        }),
      },
    });
  }

  public onTilePlaced(cardOwner: IPlayer, activePlayer: IPlayer, space: Space) {
    if (Board.isUncoveredUnreachedSpace(space)) {
      cardOwner.game.defer(
        new GainResources(cardOwner, Resource.PLANTS, {count: 2}).andThen(() => activePlayer.game.log(
          '${0} gained 2 ${1} from ${2}',
          (b) => b.player(cardOwner).string(Resource.PLANTS).cardName(this.name))),
        cardOwner.id !== activePlayer.id ? Priority.OPPONENT_TRIGGER : undefined);
    }
  }
}
