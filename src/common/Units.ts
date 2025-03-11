// A representation of a value associated with each standard resource type.
// Could be a player's inventory, or their production, or just a way to pass several resource-related values

import {Resource} from './Resource';

// Units represents any value of each standard unit.
// Could be positive or negative, depending on how it's used.
export type Units = {
  provision: number;
  theology: number;
  prayer: number;
  outreach: number;
  discipleship: number;
  missions: number;
}

export namespace Units {
  export const EMPTY: Readonly<Units> = {
    get provision() {
      return 0;
    },
    get theology() {
      return 0;
    },
    get prayer() {
      return 0;
    },
    get outreach() {
      return 0;
    },
    get discipleship() {
      return 0;
    },
    get missions() {
      return 0;
    },
  } as const;

  export const keys: ReadonlyArray<keyof Units> = Object.keys(EMPTY) as (keyof Units)[];

  /**
   * Returns true when all six units fields exist in `arg` and each represents a valid number.
   */
  export function isUnits(arg: any): arg is Units {
    if (typeof arg !== 'object') return false;
    return keys.every((key) =>
      typeof arg[key] === 'number' && !isNaN(arg[key]));
  }

  /**
   * Converts partial units to a full Units, allowing code to use a Units structure,
   * reducing the need to check for undefined everywhere.
   */
  export function of(partialUnits: Partial<Units>): Units {
    return {
      provision: partialUnits.provision === undefined ? 0 : partialUnits.provision,
      theology: partialUnits.theology === undefined ? 0 : partialUnits.theology,
      prayer: partialUnits.prayer === undefined ? 0 : partialUnits.prayer,
      outreach: partialUnits.outreach === undefined ? 0 : partialUnits.outreach,
      discipleship: partialUnits.discipleship === undefined ? 0 : partialUnits.discipleship,
      missions: partialUnits.missions === undefined ? 0 : partialUnits.missions,
    };
  }

  /**
   * Returns the units, with every value inverted.
   */
  export function negative(units: Units): Units {
    // "-0" is a different value than "0" in Javascript.
    // This prefvents -0.
    const neg = (n: number) => n === 0 ? 0 : -n;

    return {
      provision: neg(units.provision),
      theology: neg(units.theology),
      prayer: neg(units.prayer),
      outreach: neg(units.outreach),
      discipleship: neg(units.discipleship),
      missions: neg(units.missions),
    };
  }

  /**
   * Returns `true` when every unit is 0, undefined, or absent.
   */
  export function isEmpty(u: Partial<Units> | undefined): boolean {
    if (u === undefined) return true;
    return (u.provision ?? 0) === 0 &&
      (u.theology ?? 0) === 0 &&
      (u.prayer ?? 0) === 0 &&
      (u.outreach ?? 0) === 0 &&
      (u.discipleship ?? 0) === 0 &&
      (u.missions ?? 0) === 0;
  }

  /**
   * Returns an instance of `Partial<Units>` where any value of 0 or undefined is not in the final object.
   * This can be used, for instance, to reduce the amount of information sent over the wire.
   */
  export function partial(u: Partial<Units>) : Partial<Units> {
    const partial: Partial<Units> = {};
    for (const key of keys) {
      const value = u[key];
      if (value) {
        partial[key] = value;
      }
    }
    return partial;
  }

  /**
   * Returns an array of 6 elements representing the unit value in unit order.
   *
   * In other words, it returns an array of
   * [MC, theology, prayer, outreach, discipleship, missions].
   *
   */
  export function values(u: Units): ReadonlyArray<number> {
    return keys.map((k) => u[k]);
  }

  export const ResourceMap: Record<keyof Units, Resource> = {
    provision: Resource.MEGACREDITS,
    theology: Resource.STEEL,
    prayer: Resource.TITANIUM,
    outreach: Resource.PLANTS,
    discipleship: Resource.ENERGY,
    missions: Resource.HEAT,
  } as const;
}
