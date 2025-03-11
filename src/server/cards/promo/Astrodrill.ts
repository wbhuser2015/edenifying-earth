import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CorporationCard} from '../corporation/CorporationCard';
import {IActionCard} from '../ICard';
import {CardName} from '../../../common/cards/CardName';
import {CardResource} from '../../../common/CardResource';
import {SelectOption} from '../../inputs/SelectOption';
import {SelectCard} from '../../inputs/SelectCard';
import {OrOptions} from '../../inputs/OrOptions';
import {LogHelper} from '../../LogHelper';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {digit} from '../Options';

export class Astrodrill extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.ASTRODRILL,
      tags: [Tag.SPACE],
      startingMegaCredits: 35,
      resourceType: CardResource.ASTEROID,

      behavior: {
        addResources: 3,
      },

      metadata: {
        cardNumber: 'R21',
        description: 'You start with 35 M€ and 3 asteroid resources.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.provision(35).nbsp.resource(CardResource.ASTEROID, {amount: 3, digit});
          b.corpBox('action', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.action(undefined, (eb) => {
              eb.empty().startAction.resource(CardResource.ASTEROID).asterix().slash().wild(1).or();
            });
            ce.vSpace();
            ce.action('Add an asteroid resource to ANY card OR gain any standard resource, OR remove an asteroid resource from this card to gain 3 prayer.', (eb) => {
              eb.resource(CardResource.ASTEROID).startAction.prayer(3, {digit});
            });
          });
        }),
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: IPlayer) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);
    const opts = [];

    const gainStandardResource = new SelectOption('Gain a standard resource', 'Gain').andThen(() => {
      return new OrOptions(
        new SelectOption('Gain 1 prayer', 'Gain prayer').andThen(() => {
          player.stock.add(Resource.TITANIUM, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 theology', 'Gain theology').andThen(() => {
          player.stock.add(Resource.STEEL, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 outreach', 'Gain outreach').andThen(() => {
          player.stock.add(Resource.PLANTS, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 discipleship', 'Gain discipleship').andThen(() => {
          player.stock.add(Resource.ENERGY, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 missions', 'Gain missions').andThen(() => {
          player.stock.add(Resource.HEAT, 1, {log: true});
          return undefined;
        }),
        new SelectOption('Gain 1 M€', 'Gain M€').andThen(() => {
          player.stock.add(Resource.MEGACREDITS, 1, {log: true});
          return undefined;
        }),
      );
    });

    const addResourceToSelf = new SelectOption('Add 1 asteroid to this card', 'Add asteroid').andThen(() => {
      player.addResourceTo(this, {log: true});

      return undefined;
    });

    const addResource = new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards)
      .andThen(([card]) => {
        player.addResourceTo(card, {log: true});
        return undefined;
      });

    const spendResource = new SelectOption('Remove 1 asteroid on this card to gain 3 prayer', 'Remove asteroid').andThen(() => {
      this.resourceCount--;
      player.prayer += 3;
      LogHelper.logRemoveResource(player, this, 1, 'gain 3 prayer');

      return undefined;
    });

    if (this.resourceCount > 0) opts.push(spendResource);
    asteroidCards.length === 1 ? opts.push(addResourceToSelf) : opts.push(addResource);
    opts.push(gainStandardResource);

    return new OrOptions(...opts);
  }
}
