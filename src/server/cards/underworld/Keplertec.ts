import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {ActiveCorporationCard} from '../corporation/CorporationCard';
import {CardResource} from '../../../common/CardResource';
import {digit} from '../Options';
import {ICard} from '../ICard';
import {UndergroundResourceToken} from '../../../common/underworld/UndergroundResourceToken';
import {UnderworldExpansion} from '../../../server/underworld/UnderworldExpansion';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {SimpleDeferredAction} from '../../deferredActions/DeferredAction';

export class Keplertec extends ActiveCorporationCard {
  constructor() {
    super({
      name: CardName.KEPLERTEC,
      tags: [Tag.JOVIAN, Tag.SPACE],
      startingMegaCredits: 33,
      resourceType: CardResource.FIGHTER,

      behavior: {
        stock: {prayer: 3},
        production: {prayer: 1},
      },

      action: {
        spend: {prayer: 1},
        addResourcesToAnyCard: {
          count: 1,
          autoSelect: true,
          mustHaveCard: true,
          type: CardResource.FIGHTER,
        },
      },

      metadata: {
        cardNumber: 'UC08',
        description: 'You start with 33 M€, 3 prayer, and 1 prayer production.',
        renderData: CardRenderer.builder((b) => {
          b.provision(33).prayer(3, {digit}).production((pb) => pb.prayer(1)).br;
          b.action('Spend 1 prayer to put a fighter resource on ANY card.', (ab) => {
            ab.prayer(1).startAction.resource(CardResource.FIGHTER).asterix();
          }).br;
          b.effect('When you place a fighter resource on this card, draw 4 random underground resource tokens. ' +
            'Pick one of them and claim the reward on it. Then shuffle the tokens back into the pile.', (eb) => {
            eb.resource(CardResource.FIGHTER).startEffect.undergroundResources(1, {text: '?'}).asterix();
          }).br;
        }),
      },
    });
  }

  effect(player: IPlayer, idx: number) {
    const game = player.game;
    if (game.underworldData === undefined) {
      return;
    }
    const tokens: Array<UndergroundResourceToken> = [];
    for (let i = 0; i < 4; i++) {
      const token = UnderworldExpansion.drawExcavationToken(game);
      tokens.push(token);
    }

    const orOptions = new OrOptions();
    for (const token of tokens) {
      orOptions.options.push(new SelectOption(token).andThen(() => {
        UnderworldExpansion.grant(player, token);
        UnderworldExpansion.addTokens(game, tokens);
        if (idx > 1) {
          game.defer(new SimpleDeferredAction(player, () => {
            return this.effect(player, idx - 1);
          }));
        }
        return undefined;
      }));
    }
    return orOptions;
  }

  onResourceAdded(player: IPlayer, card: ICard, count: number) {
    if (card === this) {
      player.defer(this.effect(player, count));
    }
  }
}
