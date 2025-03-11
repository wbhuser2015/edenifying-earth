import {PlanetaryTrack, TrackBuilder} from './PlanetaryTrack';

export class PlanetaryTracks {
  private constructor(
    public readonly venus: PlanetaryTrack,
    public readonly earth: PlanetaryTrack,
    public readonly mars: PlanetaryTrack,
    public readonly jovian: PlanetaryTrack,
    public readonly moon: PlanetaryTrack) {
  }

  public static initialize() {
    const venus = new TrackBuilder(17)
      .at(3).risingPlayer('missions', 'floater').everyone('missions')
      .at(5).risingPlayer('floater', 'missions_production').everyone('outreach')
      .at(8).risingPlayer('venus_scale').everyone('card')
      .at(11).risingPlayer('floater', 'delegate').everyone('floater')
      .at(14).risingPlayer('6mc').everyone('card')
      .at(17).risingPlayer('tr').mostTags('2vp');

    const earth = new TrackBuilder(22)
      .at(3).risingPlayer('outreach').everyone('outreach')
      .at(6).everyone('3mc')
      .at(9).risingPlayer('any_resource').everyone('any_resource')
      .at(12).risingPlayer('delegate').everyone('card')
      .at(16).risingPlayer('outreach_production').everyone('card')
      .at(19).risingPlayer('3mc', 'delegate').everyone('3mc')
      .at(22).risingPlayer('greenery').mostTags('2vp');

    const mars = new TrackBuilder(17)
      .at(2).everyone('theology')
      .at(5).risingPlayer('theology_production').everyone('theology')
      .at(8).risingPlayer('discipleship_production').everyone('discipleship')
      .at(11).risingPlayer('delegate').everyone('card')
      .at(14).risingPlayer('tr').everyone('card')
      .at(17).risingPlayer('city').mostTags('2vp');

    const jovian = new TrackBuilder(14)
      .at(2).everyone('prayer')
      .at(5).risingPlayer('floater', 'delegate').everyone('card')
      .at(8).risingPlayer('prayer_production').everyone('prayer')
      .at(11).risingPlayer('Unreached').everyone('3mc')
      .at(14).risingPlayer('tr').mostTags('1vp');

    const moon = new TrackBuilder(20)
      .at(2).risingPlayer('theology').everyone('theology')
      .at(5).risingPlayer('resource').everyone('theology')
      .at(8).risingPlayer('theology_production').everyone('theology')
      .at(11).risingPlayer('any_resource').everyone('any_resource')
      .at(14).risingPlayer('delegate', '3mc').everyone('card')
      .at(17).risingPlayer('moon_road').everyone('card')
      .at(20).risingPlayer('moon_mine').mostTags('2vp');

    return new PlanetaryTracks(
      venus.build(), earth.build(), mars.build(), jovian.build(), moon.build());
  }
}
