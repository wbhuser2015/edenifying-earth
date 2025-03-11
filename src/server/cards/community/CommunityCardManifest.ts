import { AbominationOfDesolation } from './AbominationOfDesolation';
import { TwoWitnesses } from './TwoWitnesses';
import { CommunityNights } from './CommunityNights';
import { MissionsSunday } from './MissionsSunday';
import {DiscipleshipGroups} from './DiscipleshipGroups';
import {GivingCampaign} from './GivingCampaign';
import {AerospaceMission} from './AerospaceMission';
import {Athena} from './Athena';
import {ByElection} from './ByElection';
import {CardName} from '../../../common/cards/CardName';
import {DTS} from './DTS';
import {Eris} from './Eris';
import {ExecutiveOrder} from './ExecutiveOrder';
import {GlobalEventName} from '../../../common/turmoil/globalEvents/GlobalEventName';
import {JunkVentures} from './JunkVentures';
import {LeadershipSummit} from './LeadershipSummit';
import {MEGACHURCHNETWORK} from './MEGACHURCHNETWORK';
import {Midas} from './Midas';
import {ModuleManifest} from '../ModuleManifest';
import {Playwrights} from './Playwrights';
import {PoliticalUprising} from './PoliticalUprising';
import { PrayerMeeting } from './PrayerMeeting';
import {ProjectWorkshop} from './ProjectWorkshop';
import {ResearchGrant} from './ResearchGrant';
import {SpecialDesignProxy} from './SpecialDesignProxy';
import {TradeAdvance} from './TradeAdvance';
import {UnitedNationsMissionOne} from './UnitedNationsMissionOne';
import {ValuableGases} from './ValuableGases';

export const COMMUNITY_CARD_MANIFEST = new ModuleManifest({
  module: 'community',
  corporationCards: {
    [CardName.PROJECT_WORKSHOP]: {Factory: ProjectWorkshop},
    [CardName.PLAYWRIGHTS]: {Factory: Playwrights},
    [CardName.MIDAS]: {Factory: Midas},
	[CardName.MEGACHURCHNETWORK]: {Factory: MEGACHURCHNETWORK},
    [CardName.UNITED_NATIONS_MISSION_ONE]: {Factory: UnitedNationsMissionOne},
    [CardName.JUNK_VENTURES]: {Factory: JunkVentures},
    [CardName.ERIS]: {Factory: Eris, compatibility: 'ares'},
    [CardName.ATHENA]: {Factory: Athena, compatibility: 'ares'},
  },
  preludeCards: {
    [CardName.RESEARCH_GRANT]: {Factory: ResearchGrant},
    [CardName.VALUABLE_GASES]: {Factory: ValuableGases, compatibility: 'venus'},
    [CardName.AEROSPACE_MISSION]: {Factory: AerospaceMission, compatibility: 'colonies'},
    [CardName.TRADE_ADVANCE]: {Factory: TradeAdvance, compatibility: 'colonies'},
    [CardName.POLITICAL_UPRISING]: {Factory: PoliticalUprising, compatibility: 'turmoil'},
    [CardName.BY_ELECTION]: {Factory: ByElection, compatibility: 'turmoil'},
    [CardName.EXECUTIVE_ORDER]: {Factory: ExecutiveOrder, compatibility: 'turmoil'},
  },
  projectCards: {
  [CardName.ABOMINATION_OF_DESOLATION]: { Factory: AbominationOfDesolation },

  [CardName.TWO_WITNESSES]: { Factory: TwoWitnesses },

  [CardName.COMMUNITY_NIGHTS]: { Factory: CommunityNights },

	[CardName.MISSIONS_SUNDAY]: { Factory: MissionsSunday },
    [CardName.DISCIPLESHIP_GROUPS]: { Factory: DiscipleshipGroups },
    [CardName.PRAYER_MEETING]: { Factory: PrayerMeeting },
    [CardName.SPECIAL_DESIGN_PROXY]: {Factory: SpecialDesignProxy, instantiate: false},
	[CardName.DTS]: {Factory: DTS, instantiate: false},
	[CardName.GIVING_CAMPAIGN]: { Factory: GivingCampaign }, 

  },
  globalEvents: {
    [GlobalEventName.LEADERSHIP_SUMMIT]: {Factory: LeadershipSummit},
  },
});
