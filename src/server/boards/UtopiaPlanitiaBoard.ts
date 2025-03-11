import {SpaceBonus} from '../../common/boards/SpaceBonus';
import {BoardBuilder} from './BoardBuilder';
import {Random} from '../../common/utils/Random';
import {GameOptions} from '../game/GameOptions';
import {MarsBoard} from './MarsBoard';
import {Space} from './Space';

export class UtopiaPlanitiaBoard extends MarsBoard {
  public static newInstance(gameOptions: GameOptions, rng: Random): UtopiaPlanitiaBoard {
    const builder = new BoardBuilder(gameOptions);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const ENERGY = SpaceBonus.ENERGY;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;

    // y=0
    builder.land().land().land(ENERGY, ENERGY).land().land();
    // y=1
    builder.land().land(STEEL, STEEL).land(ENERGY, ENERGY).land(ENERGY, ENERGY, DRAW_CARD).land().land();
    // y=2
    builder.Unreached(PLANT, PLANT, PLANT).land().land(STEEL).land().land().land(DRAW_CARD, DRAW_CARD, TITANIUM).land(TITANIUM, TITANIUM);
    // y=3
    builder.Unreached(PLANT, DRAW_CARD).land(PLANT).land(PLANT).land(PLANT, PLANT).Unreached(PLANT, PLANT).Unreached(PLANT).Unreached(PLANT).land(PLANT);
    // y=4
    builder.land().land().land().land(PLANT).land(PLANT).land(PLANT, PLANT).land().Unreached().land(PLANT, TITANIUM);
    // y=5
    builder.land(STEEL).land(STEEL, STEEL).Unreached(PLANT, PLANT).land(PLANT, PLANT).land().land().land(STEEL, STEEL).land();
    // y=6
    builder.land(STEEL).land().Unreached().Unreached(PLANT, PLANT).land().land().land();
    // y=7
    builder.land().land(DRAW_CARD, DRAW_CARD).Unreached().Unreached(PLANT, PLANT).land(STEEL, TITANIUM).land(PLANT, PLANT);
    // y=8
    builder.land().land().land(STEEL, STEEL).Unreached(PLANT).land(PLANT);

    if (gameOptions.shuffleMapOption) {
      builder.shuffle(rng);
    }
    const spaces = builder.build();
    return new UtopiaPlanitiaBoard(spaces);
  }

  public constructor(spaces: ReadonlyArray<Space>) {
    super(spaces, undefined, []);
  }
}
