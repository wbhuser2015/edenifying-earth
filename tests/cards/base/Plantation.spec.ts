import {SelectSpace} from '../../../src/server/inputs/SelectSpace';
import {expect} from 'chai';
import {cast, runAllActions, setOxygenLevel, testRedsCosts} from '../../TestingUtils';
import {InventorsGuild} from '../../../src/server/cards/base/InventorsGuild';
import {Plantation} from '../../../src/server/cards/base/Plantation';
import {IGame} from '../../../src/server/IGame';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('Plantation', () => {
  let card: Plantation;
  let player: TestPlayer;
  let game: IGame;

  beforeEach(() => {
    card = new Plantation();
    [game, player] = testGame(2);
  });

  it('Can not play', () => {
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', () => {
    player.playedCards.push(new InventorsGuild(), new InventorsGuild());
    expect(card.canPlay(player)).is.true;

    cast(card.play(player), undefined);
    runAllActions(game);
    const action = cast(player.popWaitingFor(), SelectSpace);
    action.cb(action.spaces[0]);
    expect(game.getOxygenLevel()).to.eq(1);
  });

  const redsRuns = [
    {oxygen: 12, expected: 3},
    {oxygen: 13, expected: 3},
    {oxygen: 14, expected: 0},
  ] as const;

  for (const run of redsRuns) {
    it('Works with reds ' + JSON.stringify(run), () => {
      const [game, player/* , player2 */] = testGame(2, {turmoilExtension: true});

      // Card requirement
      player.tagsForTest = {science: 2};

      setOxygenLevel(game, run.oxygen);
      testRedsCosts(() => player.canPlay(card), player, card.cost, run.expected);
    });
  }
});
