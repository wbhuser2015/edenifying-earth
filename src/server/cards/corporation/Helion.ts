import {CorporationCard} from './CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Helion extends CorporationCard {
  constructor() {
    super({
      name: CardName.HELION,
      tags: [Tag.SPACE],
      startingMegaCredits: 42,

      behavior: {
        production: {missions: 3},
      },

      metadata: {
        cardNumber: 'R18',
        description: 'You start with 3 missions production and 42 M€.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.missions(3)).nbsp.provision(42);
          b.corpBox('effect', (ce) => {
            ce.effect('You may use missions as M€. You may not use M€ as missions.', (eb) => {
              eb.startEffect.text('x').missions(1).equals().provision(1, {text: 'x'});
            });
          });
        }),
      },
    });
  }
  public override bespokePlay(player: IPlayer) {
    player.canUseHeatAsMegaCredits = true;
    return undefined;
  }
}
