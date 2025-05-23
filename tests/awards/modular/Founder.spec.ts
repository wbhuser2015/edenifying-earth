import {expect} from 'chai';
import {TestPlayer} from '../../TestPlayer';
import {IGame} from '../../../src/server/IGame';
import {testGame} from '../../TestGame';
import {addGreenery, addCity, cast, runAllActions} from '../../TestingUtils';
import {SelectSpace} from '../../../src/server/inputs/SelectSpace';
import {NaturalPreserve} from '../../../src/server/cards/base/NaturalPreserve';
import {EmptyBoard} from '../../testing/EmptyBoard';
import {Founder} from '../../../src/server/awards/modular/Founder';

describe('Founder', () => {
  let founder: Founder;
  let player: TestPlayer;
  let player2: TestPlayer;
  let player3: TestPlayer;
  let game: IGame;

  beforeEach(() => {
    [game, player, player2, player3] = testGame(3);
    game.board = EmptyBoard.newInstance();
    founder = new Founder();
  });

  function scores(): Array<number> {
    return [
      founder.getScore(player),
      founder.getScore(player2),
      founder.getScore(player3)];
  }

  it('Takes action, Founder Milestone does not get a benefit', () => {
    const naturalPreserve = new NaturalPreserve();
    naturalPreserve.play(player2);
    runAllActions(game);
    const action = cast(player2.popWaitingFor(), SelectSpace);
    const naturalPreserveSpace = action.spaces[0];
    action.cb(naturalPreserveSpace);

    expect(scores()).deep.eq([0, 0, 0]);

    const adjacentSpaces = game.board.getAdjacentSpaces(naturalPreserveSpace);

    addGreenery(player2, adjacentSpaces[0].id);

    expect(scores()).deep.eq([0, 1, 0]);

    addCity(player3, adjacentSpaces[1].id);

    expect(scores()).deep.eq([0, 1, 1]);
  });
});
