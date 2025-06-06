import {expect} from 'chai';
import {NuclearPower} from '../../../src/server/cards/base/NuclearPower';
import {Resource} from '../../../src/common/Resource';
import {TestPlayer} from '../../TestPlayer';
import {testGame} from '../../TestGame';

describe('NuclearPower', () => {
  let card: NuclearPower;
  let player: TestPlayer;

  beforeEach(() => {
    card = new NuclearPower();
    [/* game */, player] = testGame(2);
  });

  it('Can not play', () => {
    player.production.add(Resource.MEGACREDITS, -4);
    expect(card.canPlay(player)).is.not.true;
  });

  it('Should play', () => {
    expect(card.canPlay(player)).is.true;
    card.play(player);
    expect(player.production.megacredits).to.eq(-2);
    expect(player.production.energy).to.eq(3);
  });
});
