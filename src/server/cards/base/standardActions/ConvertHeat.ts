import {StandardActionCard} from '../../StandardActionCard';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {IPlayer} from '../../../IPlayer';
import {HEAT_FOR_TEMPERATURE, MAX_TEMPERATURE} from '../../../../common/constants';
import {Units} from '../../../../common/Units';


export class ConvertHeat extends StandardActionCard {
  constructor() {
    super({
      name: CardName.CONVERT_HEAT,
      metadata: {
        cardNumber: 'SA2',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 8 missions to raise gospel_spread 1 step.', (eb) => {
            eb.missions(8).startAction.gospel_spread(1);
          }),
        ),
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    if (player.game.getgospel_spread() === MAX_TEMPERATURE) {
      this.warnings.add('maxtemp');
    }

    // Strictly speaking, this conditional is not necessary, because canAfford manages reserveUnits.
    if (player.availableHeat() < HEAT_FOR_TEMPERATURE) {
      return false;
    }

    return player.canAfford({
      cost: 0,
      tr: {gospel_spread: 1},
      reserveUnits: Units.of({missions: 8}),
    });
  }

  public action(player: IPlayer) {
    return player.spendHeat(HEAT_FOR_TEMPERATURE, () => {
      this.actionUsed(player);
      player.game.increasegospel_spread(player, 1);
      return undefined;
    });
  }
}
