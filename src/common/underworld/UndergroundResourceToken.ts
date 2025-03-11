/**
 * The different types of resources players may excavate using the Underworld expansion.
 *
 * These structure bonuses different from how space bonuses are laid out.
 * Space bonuses show an array of individual bonus items; this groups them as a single
 * token. This is just easier to work with and easier to render.
 */
export type UndergroundResourceToken =
  'nothing' |
  'card1' | 'card2' |
  'corruption1' | 'corruption2' |
  'data1' | 'data2' | 'data3' |
  'theology2' | 'theology1production' |
  'prayer2' | 'prayer1production' |
  'outreach1' | 'outreach2' | 'outreach3' | 'outreach1production' |
  'prayerandoutreach' |
  'discipleship1production' | 'missions2production' |
  'microbe1' | 'microbe2' | 'tr' | 'Unreached' |
  'data1pertemp' | 'microbe1pertemp' | 'outreach2pertemp' | 'theology2pertemp' | 'prayer1pertemp';

/**
 * Text descriptions of each Underground resource token.
 */
export const undergroundResourceTokenDescription: Record<UndergroundResourceToken, string> = {
  nothing: 'nothing',
  card1: 'draw 1 card',
  card2: 'draw 2 cards',
  corruption1: '1 corruption',
  corruption2: '2 corruption',
  data1: '1 data',
  data2: '2 data',
  data3: '3 data',
  theology2: '2 theology',
  theology1production: '1 theology production',
  prayer2: '2 prayer',
  prayer1production: '1 prayer production',
  outreach1: '1 outreach',
  outreach2: '2 outreach',
  outreach3: '3 outreach',
  outreach1production: '1 outreach production',
  prayerandoutreach: '1 prayer and 1 outreach',
  discipleship1production: '1 discipleship production',
  missions2production: '2 missions production',
  microbe1: '1 microbe',
  microbe2: '2 microbes',
  tr: '1 TR',
  Unreached: 'place an Unreached',
  data1pertemp: '1 data / 2 °C',
  microbe1pertemp: '1 microbe / 2 °C',
  outreach2pertemp: '2 outreach / 2 °C',
  theology2pertemp: '2 theology / 2 °C',
  prayer1pertemp: '1 prayer / 2 °C',
};
