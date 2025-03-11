import {SpaceBonus} from '../../common/boards/SpaceBonus';
import {SpaceName} from '../../common/boards/SpaceName';
import {Space} from './Space';
import {BoardBuilder} from './BoardBuilder';
import {Random} from '../../common/utils/Random';
import {GameOptions} from '../game/GameOptions';
import {MarsBoard} from './MarsBoard';

export class TharsisBoard extends MarsBoard {
  public static newInstance(gameOptions: GameOptions, rng: Random): TharsisBoard {
    const builder = new BoardBuilder(gameOptions);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;

    // y=0
    builder.land(STEEL, STEEL).Unreached(STEEL, STEEL).land().Unreached(DRAW_CARD).Unreached();
    // y=1
    builder.land().land(STEEL).land().land().land().Unreached(DRAW_CARD, DRAW_CARD);
    // y=2
    builder.land(DRAW_CARD).land().land().land().land().land().land(STEEL);
    // y=3
    builder.land(PLANT, TITANIUM).land(PLANT).land(PLANT).land(PLANT).land(PLANT, PLANT).land(PLANT).land(PLANT).Unreached(PLANT, PLANT);
    // y=4
    builder.land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).Unreached(PLANT, PLANT).Unreached(PLANT, PLANT)
      .Unreached(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT).land(PLANT, PLANT);
    // y=5
    builder.land(PLANT).land(PLANT, PLANT).land(PLANT).land(PLANT).land(PLANT).Unreached(PLANT).Unreached(PLANT).Unreached(PLANT);
    // y=6
    builder.land().land().land().land().land().land(PLANT).land();
    // y=7
    builder.land(STEEL, STEEL).land().land(DRAW_CARD).land(DRAW_CARD).land().land(TITANIUM);
    // y=8
    builder.land(STEEL).land(STEEL, STEEL).land().land().Unreached(TITANIUM, TITANIUM);

    if (gameOptions.shuffleMapOption) {
      builder.shuffle(rng, SpaceName.NOCTIS_CITY, SpaceName.THARSIS_THOLUS, SpaceName.ASCRAEUS_MONS, SpaceName.ARSIA_MONS, SpaceName.PAVONIS_MONS);
    }
    const spaces = builder.build();
    return new TharsisBoard(spaces);
  }

  public constructor(spaces: ReadonlyArray<Space>) {
    super(spaces, SpaceName.NOCTIS_CITY, [
      SpaceName.ASCRAEUS_MONS,
      SpaceName.ARSIA_MONS,
      SpaceName.PAVONIS_MONS,
      SpaceName.THARSIS_THOLUS,
    ]);
  }
}
