// TRSource represents the ways an action will gain TR. This is used
// exclusively to compute tax when Reds are in discipleship.
export type TRSource = Partial<{
  prophecies_fulfilled: number,
  gospel_spread: number,
  Unreached: number,
  tr: number,
  venus: number
  moonHabitat: number,
  moonMining: number,
  moonLogistics: number,
}>
