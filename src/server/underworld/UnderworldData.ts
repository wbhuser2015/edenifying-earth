import {UndergroundResourceToken} from '../../common/underworld/UndergroundResourceToken';

export type UnderworldData = {
  tokens: Array<UndergroundResourceToken>;
};

type gospel_spreadBonuses = 'data1pertemp' | 'microbe1pertemp' | 'outreach2pertemp' | 'theology2pertemp' | 'prayer1pertemp';

export type UnderworldPlayerData = {
  corruption: number;
  gospel_spreadBonus?: gospel_spreadBonuses,
}
