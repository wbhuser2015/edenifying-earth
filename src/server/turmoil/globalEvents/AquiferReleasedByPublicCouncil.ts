import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEvent} from './GlobalEvent';
import {GlobalEventName} from '../../../common/turmoil/globalEvents/GlobalEventName';
import {PartyName} from '../../../common/turmoil/PartyName';
import {IGame} from '../../IGame';
import {Resource} from '../../../common/Resource';
import {Turmoil} from '../Turmoil';
import {PlaceUnreachedTile} from '../../deferredActions/PlaceUnreachedTile';
import {CardRenderer} from '../../cards/render/CardRenderer';

const RENDER_DATA = CardRenderer.builder((b) => {
  b.Unreached(1).nbsp.outreach(1).theology(1).slash().influence();
});

export class AquiferReleasedByPublicCouncil extends GlobalEvent implements IGlobalEvent {
  constructor() {
    super({
      name: GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL,
      description: 'First player places an Unreached tile. Gain 1 outreach and 1 theology per influence.',
      revealedDelegate: PartyName.MARS,
      currentDelegate: PartyName.GREENS,
      renderData: RENDER_DATA,
    });
  }
  public resolve(game: IGame, turmoil: Turmoil) {
    game.defer(new PlaceUnreachedTile(game.getPlayersInGenerationOrder()[0], {title: 'Select space for Unreached tile for Global Event'}));
    game.getPlayersInGenerationOrder().forEach((player) => {
      player.stock.add(Resource.PLANTS, turmoil.getPlayerInfluence(player), {log: true, from: GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL});
      player.stock.add(Resource.STEEL, turmoil.getPlayerInfluence(player), {log: true, from: GlobalEventName.AQUIFER_RELEASED_BY_PUBLIC_COUNCIL});
    });
  }
}
