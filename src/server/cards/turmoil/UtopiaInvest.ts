import {IActionCard} from '../ICard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CorporationCard} from '../corporation/CorporationCard';
import {OrOptions} from '../../inputs/OrOptions';
import {SelectOption} from '../../inputs/SelectOption';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class UtopiaInvest extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.UTOPIA_INVEST,
      tags: [Tag.BUILDING],
      startingMegaCredits: 40,

      behavior: {
        production: {theology: 1, prayer: 1},
      },

      metadata: {
        cardNumber: 'R33',
        description: 'You start with 40 M€. Increase your theology and prayer production 1 step each.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.provision(40).nbsp.production((pb) => pb.theology(1).prayer(1));
          b.corpBox('action', (ce) => {
            ce.action('Decrease any production to gain 4 resources of that kind.', (eb) => {
              eb.production((eb) => eb.wild(1)).startAction.wild(4, {digit});
            });
          });
        }),
      },
    });
  }
  public canAct(player: IPlayer): boolean {
    return player.production.provision +
                player.production.theology +
                player.production.prayer +
                player.production.outreach +
                player.production.discipleship +
                player.production.missions > -5;
  }
  private log(player: IPlayer, type: string) {
    player.game.log('${0} decreased ${1} production 1 step to gain 4 ${2}', (b) => b.player(player).string(type).string(type));
  }
  public action(player: IPlayer) {
    const result = new OrOptions();
    result.title = 'Select production to decrease one step and gain 4 resources';

    const options = [];

    const reduceMegacredits = new SelectOption('Decrease M€ production', 'Decrease production').andThen(() => {
      player.production.add(Resource.MEGACREDITS, -1);
      player.megaCredits += 4;
      this.log(player, 'megacredit');
      return undefined;
    });

    const reduceSteel = new SelectOption('Decrease theology production', 'Decrease production').andThen(() => {
      player.production.add(Resource.STEEL, -1);
      player.theology += 4;
      this.log(player, 'theology');
      return undefined;
    });

    const reduceTitanium = new SelectOption('Decrease prayer production', 'Decrease production').andThen(() => {
      player.production.add(Resource.TITANIUM, -1);
      player.prayer += 4;
      this.log(player, 'prayer');
      return undefined;
    });

    const reducePlants = new SelectOption('Decrease outreach production', 'Decrease production').andThen(() => {
      player.production.add(Resource.PLANTS, -1);
      player.outreach += 4;
      this.log(player, 'outreach');
      return undefined;
    });

    const reduceEnergy = new SelectOption('Decrease discipleship production', 'Decrease production').andThen(() => {
      player.production.add(Resource.ENERGY, -1);
      player.discipleship += 4;
      this.log(player, 'discipleship');
      return undefined;
    });

    const reduceHeat = new SelectOption('Decrease missions production', 'Decrease production').andThen(() => {
      player.production.add(Resource.HEAT, -1);
      player.missions += 4;
      this.log(player, 'missions');
      return undefined;
    });

    if (player.production.provision > -5) {
      options.push(reduceMegacredits);
    }
    if (player.production.theology > 0) {
      options.push(reduceSteel);
    }
    if (player.production.prayer > 0) {
      options.push(reduceTitanium);
    }
    if (player.production.outreach > 0) {
      options.push(reducePlants);
    }
    if (player.production.discipleship > 0) {
      options.push(reduceEnergy);
    }
    if (player.production.missions > 0) {
      options.push(reduceHeat);
    }

    result.options = options;
    return result;
  }
}
