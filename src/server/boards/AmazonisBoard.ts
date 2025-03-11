import {SpaceBonus} from '../../common/boards/SpaceBonus';
import {BoardBuilder} from './BoardBuilder';
import {SpaceName} from '../../common/boards/SpaceName';
import {Random} from '../../common/utils/Random';
import {GameOptions} from '../game/GameOptions';
import {MarsBoard} from './MarsBoard';
import {Space} from './Space';

export class AmazonisBoard extends MarsBoard {
  public static newInstance(gameOptions: GameOptions, rng: Random): AmazonisBoard {
    const builder = new BoardBuilder(gameOptions);

    const PLANT = SpaceBonus.PLANT;
    const STEEL = SpaceBonus.STEEL;
    const DRAW_CARD = SpaceBonus.DRAW_CARD;
    const TITANIUM = SpaceBonus.TITANIUM;
    const MICROBE = SpaceBonus.MICROBE;
    const ANIMAL = SpaceBonus.ANIMAL;
    const HEAT = SpaceBonus.HEAT;

    // y=0
    builder.land().Unreached(PLANT).land(PLANT, PLANT, PLANT).land(MICROBE).land(ANIMAL);
    // y=1
    builder.Unreached(TITANIUM).land(MICROBE, MICROBE).land().land().Unreached(DRAW_CARD, DRAW_CARD).Unreached();
    // y=2
    builder.land(PLANT, PLANT).land(STEEL, PLANT).land(STEEL, HEAT).land(HEAT, PLANT).land(ANIMAL).land().land(MICROBE);
    // y=3
    builder.land().Unreached(PLANT).land().land(PLANT).land(HEAT, PLANT).land(STEEL).land(PLANT).Unreached(STEEL, PLANT);
    // y=4
    builder.land(PLANT).land(PLANT).land().land(HEAT, HEAT).restricted().doNotShuffleLastSpace()
      .land(HEAT, HEAT).land(PLANT, PLANT).land().land(TITANIUM, TITANIUM);
    // y=5
    builder.Unreached(PLANT, PLANT).land(PLANT).land(STEEL).land(HEAT, PLANT).land(PLANT).land(DRAW_CARD).land().Unreached(PLANT);
    // y=6
    builder.Unreached(PLANT).land().land(MICROBE).land(HEAT, PLANT).land().land(PLANT, PLANT).Unreached(PLANT, PLANT);
    // y=7
    builder.land(TITANIUM).Unreached(PLANT).land(STEEL).land().land(ANIMAL).land(PLANT);
    // y=8
    builder.land().land(DRAW_CARD).land(STEEL).Unreached(PLANT).land(STEEL, STEEL);

    if (gameOptions.shuffleMapOption) {
      builder.shuffle(rng, SpaceName.MEDUSAE_FOSSAE, SpaceName.ALBOR_THOLUS, SpaceName.ANSERIS_MONS, SpaceName.PINDUS_MONS, SpaceName.ULYSSES_THOLUS);
    }

    const spaces = builder.build();
    return new AmazonisBoard(spaces);
  }

  public constructor(spaces: ReadonlyArray<Space>) {
    super(spaces, undefined, [
      SpaceName.ALBOR_THOLUS,
      SpaceName.ANSERIS_MONS,
      SpaceName.PINDUS_MONS,
      SpaceName.ULYSSES_THOLUS,
    ]);
  }
}
