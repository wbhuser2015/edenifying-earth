import {IGlobalEvent} from './IGlobalEvent';
import {GlobalEvent} from './GlobalEvent';
import {GlobalEventName} from '../../../common/turmoil/globalEvents/GlobalEventName';
import {PartyName} from '../../../common/turmoil/PartyName';
import {IGame} from '../../IGame';
import {Resource} from '../../../common/Resource';
import {Tag} from '../../../common/cards/Tag';
import {Turmoil} from '../Turmoil';
import {CardRenderer} from '../../cards/render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

const RENDER_DATA = CardRenderer.builder((b) => {
  b.text('Lose all').missions(1).nbsp.provision(-2).slash().tag(Tag.BUILDING).influence({size: Size.SMALL});
});

export class GlobalDustStorm extends GlobalEvent implements IGlobalEvent {
  constructor() {
    super({
      name: GlobalEventName.GLOBAL_DUST_STORM,
      description: 'Lose all missions. Lose 2 M€ for each building tag (max 5, then reduced by influence).',
      revealedDelegate: PartyName.KELVINISTS,
      currentDelegate: PartyName.GREENS,
      renderData: RENDER_DATA,
    });
  }
  public resolve(game: IGame, turmoil: Turmoil): void {
    game.getPlayersInGenerationOrder().forEach((player) => {
      if (player.missions > 0) {
        player.stock.deduct(Resource.HEAT, player.missions, {log: true, from: this.name});
      }
      const maxedSteelTags = Math.min(5, player.tags.count(Tag.BUILDING, 'raw'));
      player.stock.deduct(Resource.MEGACREDITS, 2 * Math.max(0, maxedSteelTags - turmoil.getPlayerInfluence(player)), {log: true, from: this.name});
    });
  }
}
