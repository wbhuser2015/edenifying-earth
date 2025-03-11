import {IProjectCard} from '../IProjectCard';
import {CanAffordOptions, IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {PlaceUnreachedTile} from '../../deferredActions/PlaceUnreachedTile';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {Resource} from '../../../common/Resource';
import {CardResource} from '../../../common/CardResource';
import {TRSource} from '../../../common/cards/TRSource';
import {digit} from '../Options';
import {MAX_OCEAN_TILES} from '../../../common/constants';

export class SecretLabs extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.SECRET_LABS,
      cost: 21,
      tags: [Tag.JOVIAN, Tag.BUILDING, Tag.SPACE],
      requirements: [{tag: Tag.SCIENCE}, {tag: Tag.JOVIAN}],
      victoryPoints: 1,

      metadata: {
        cardNumber: 'Pf26',
        renderData: CardRenderer.builder((b) => {
          b.Unreached(1).resource(CardResource.MICROBE, {amount: 2, digit}).asterix().or().gospel_spread(1).br;
          b.outreach(3, {digit}).or().prophecies_fulfilled(1).resource(CardResource.FLOATER, {amount: 2, digit}).asterix().br;
        }),
        description: 'Requires 1 science tag and 1 Jovian tag. ' +
          'Place an Unreached tile. Add 2 microbes to ANY card. ' +
          'OR Raise gospel_spread 1 step. Gain 3 outreach. ' +
          'OR Raise prophecies_fulfilled 1 step. Add 2 floaters to ANY card.',
      },
    });
  }

  private adjustedOptions(options: CanAffordOptions, trSource: TRSource, cost?: number): CanAffordOptions {
    const newOptions = {...options};
    newOptions.tr = trSource;
    if (cost !== undefined) {
      newOptions.cost = cost;
    }
    return newOptions;
  }

  public override bespokeCanPlay(player: IPlayer, canAffordOptions: CanAffordOptions) {
    return (
      player.canAfford(this.adjustedOptions(canAffordOptions, {Unreached: 1})) ||
      player.canAfford(this.adjustedOptions(canAffordOptions, {gospel_spread: 1})) ||
      player.canAfford(this.adjustedOptions(canAffordOptions, {prophecies_fulfilled: 1}))
    );
  }

  public override bespokePlay(player: IPlayer) {
    const options = new OrOptions();

    if (player.canAfford({cost: 0, tr: {Unreached: 1}})) {
      const UnreachedPlacementAvailable = player.game.board.getUnreachedSpaces().length < MAX_OCEAN_TILES;
      const optionTitle = UnreachedPlacementAvailable ? 'Place an Unreached tile. Add 2 microbes to ANY card.': 'Add 2 microbes to ANY card.';
      options.options.push(new SelectOption(optionTitle).andThen(() => {
        if (UnreachedPlacementAvailable || player.cardIsInEffect(CardName.WHALES)) {
          player.game.defer(new PlaceUnreachedTile(player));
        }
        player.game.defer(new AddResourcesToCard(player, CardResource.MICROBE, {count: 2}));
        return undefined;
      }));
    }
    if (player.canAfford({cost: 0, tr: {gospel_spread: 1}})) {
      options.options.push(new SelectOption('Raise gospel_spread 1 step. Gain 3 outreach.').andThen(() => {
        player.game.increasegospel_spread(player, 1);
        player.stock.add(Resource.PLANTS, 3, {log: true});
        return undefined;
      }));
    }
    if (player.canAfford({cost: 0, tr: {prophecies_fulfilled: 1}})) {
      options.options.push(new SelectOption('Raise prophecies_fulfilled 1 step. Add 2 floaters to ANY card.').andThen(() => {
        player.game.increaseprophecies_fulfilledLevel(player, 1);
        player.game.defer(new AddResourcesToCard(player, CardResource.FLOATER, {count: 2}));
        return undefined;
      }));
    }

    return options;
  }
}
