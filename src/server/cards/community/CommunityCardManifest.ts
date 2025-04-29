import { RumorsofWar } from './RumorsofWar';
import { ChurchinEphesus } from './ChurchinEphesus';
import { ChurchinCorinth } from './ChurchinCorinth';
import { ChurchatAntioch } from './ChurchatAntioch';
import { ChurchinJerusalem } from './ChurchinJerusalem';
import { Synagogue } from './Synagogue';
import { CityofRefuge } from './CityofRefuge';
import { Bethel } from './Bethel';
import { TabernacleSetup } from './TabernacleSetup';
import { TentofMeeting } from './TentofMeeting';
import { OaksofMamre } from './OaksofMamre';
import { StewardshipofResources } from './StewardshipofResources';
import { ProvisionThroughPersecution } from './ProvisionThroughPersecution';
import { HospitalitytoStrangers } from './HospitalitytoStrangers';
import { TithesandOfferings } from './TithesandOfferings';
import { MissionarySupport } from './MissionarySupport';
import { FellowshipofBelievers } from './FellowshipofBelievers';
import { LoavesandFishes } from './LoavesandFishes';
import { HarvestFestival } from './HarvestFestival';
import { TheWidowsOil } from './TheWidowsOil';
import { BlessingsofObedience } from './BlessingsofObedience';
import { BuildingtheTabernacle } from './BuildingtheTabernacle';
import { RuthsRedemption } from './RuthsRedemption';
import { StorehousesofJoseph } from './StorehousesofJoseph';
import { MannafromHeaven } from './MannafromHeaven';
import { NewJerusalem } from './NewJerusalem';
import { AVoiceintheWilderness } from './AVoiceintheWilderness';
import { WeepinginRamah } from './WeepinginRamah';
import { WiththeRichinHisDeath } from './WiththeRichinHisDeath';
import { PiercedforOurTransgressions } from './PiercedforOurTransgressions';
import { SilentBeforeHisAccusers } from './SilentBeforeHisAccusers';
import { BetrayedforThirtyPiecesofSilver } from './BetrayedforThirtyPiecesofSilver';
import { TheKingonaColt } from './TheKingonaColt';
import { LighttotheGentiles } from './LighttotheGentiles';
import { ShootfromtheStumpofJesse } from './ShootfromtheStumpofJesse';
import { ASufferingServant } from './ASufferingServant';
import { MessiahBorninBethlehem } from './MessiahBorninBethlehem';
import { VirginBirthForetold } from './VirginBirthForetold';
import { BabylonianExile } from './BabylonianExile';
import { AssyrianConquest } from './AssyrianConquest';
import { SolomoicTemple } from './SolomoicTemple';
import { AKinginIsrael } from './AKinginIsrael';
import { ConquestofCanaan } from './ConquestofCanaan';
import { LiberationfromEgypt } from './LiberationfromEgypt';
import { JacobsfamilygoestoEgypt } from './JacobsfamilygoestoEgypt';
import { ChurchSplit } from './ChurchSplit';
import {TheRapture} from './TheRapture'
import { RaiseoftheFalseProphet } from './RaiseoftheFalseProphet';
import { DrMichaelSvigel } from './DrMichaelSvigel';
import { JoelOsteensunday } from './JoelOsteensunday';
import { AbominationOfDesolation } from './AbominationOfDesolation';
import { TwoWitnesses } from './TwoWitnesses';
import { CommunityNights } from './CommunityNights';
import { MissionsSunday } from './MissionsSunday';
import {DiscipleshipGroups} from './DiscipleshipGroups';
import { PrayerMeeting } from './PrayerMeeting';
import {GivingCampaign} from './GivingCampaign';
import {DTS} from './DTS';
import {AerospaceMission} from './AerospaceMission';
import {Athena} from './Athena';
import {ByElection} from './ByElection';
import {CardName} from '../../../common/cards/CardName';
import {Eris} from './Eris';
import {ExecutiveOrder} from './ExecutiveOrder';
import {GlobalEventName} from '../../../common/turmoil/globalEvents/GlobalEventName';
import {LeadershipSummit} from './LeadershipSummit';
import {ModuleManifest} from '../ModuleManifest';
import {PoliticalUprising} from './PoliticalUprising';
import {ResearchGrant} from './ResearchGrant';
import {SpecialDesignProxy} from './SpecialDesignProxy';
import {TradeAdvance} from './TradeAdvance';
import {ValuableGases} from './ValuableGases';

export const COMMUNITY_CARD_MANIFEST = new ModuleManifest({
  module: 'community',
  corporationCards: {
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
  [CardName.RUMORS_OF_WAR]: { Factory: RumorsofWar },

  [CardName.CHURCH_IN_EPHESUS]: { Factory: ChurchinEphesus },
  [CardName.CHURCH_IN_CORINTH]: { Factory: ChurchinCorinth },
  [CardName.CHURCH_AT_ANTIOCH]: { Factory: ChurchatAntioch },
  [CardName.CHURCH_IN_JERUSALEM]: { Factory: ChurchinJerusalem },
  [CardName.SYNAGOGUE]: { Factory: Synagogue },
  [CardName.CITY_OF_REFUGE]: { Factory: CityofRefuge },
  [CardName.BETHEL]: { Factory: Bethel },
  [CardName.TABERNACLE_SETUP]: { Factory: TabernacleSetup },
  [CardName.TENT_OF_MEETING]: { Factory: TentofMeeting },
  [CardName.OAKS_OF_MAMRE]: { Factory: OaksofMamre },
  [CardName.STEWARDSHIP_OF_RESOURCES]: { Factory: StewardshipofResources },
  [CardName.PROVISION_THROUGH_PERSECUTION]: { Factory: ProvisionThroughPersecution },
  [CardName.HOSPITALITY_TO_STRANGERS]: { Factory: HospitalitytoStrangers },
  [CardName.TITHES_AND_OFFERINGS]: { Factory: TithesandOfferings },
  [CardName.MISSIONARY_SUPPORT]: { Factory: MissionarySupport },
  [CardName.FELLOWSHIP_OF_BELIEVERS]: { Factory: FellowshipofBelievers },
  [CardName.LOAVES_AND_FISHES]: { Factory: LoavesandFishes },
  [CardName.HARVEST_FESTIVAL]: { Factory: HarvestFestival },
  [CardName.THE_WIDOWS_OIL]: { Factory: TheWidowsOil },
  [CardName.BLESSINGS_OF_OBEDIENCE]: { Factory: BlessingsofObedience },
  [CardName.BUILDING_THE_TABERNACLE]: { Factory: BuildingtheTabernacle },
  [CardName.RUTHS_REDEMPTION]: { Factory: RuthsRedemption },
  [CardName.STOREHOUSES_OF_JOSEPH]: { Factory: StorehousesofJoseph },
  [CardName.MANNA_FROM_HEAVEN]: { Factory: MannafromHeaven },
  [CardName.NEW_JERUSALEM]: { Factory: NewJerusalem },
  [CardName.A_VOICE_IN_THE_WILDERNESS]: { Factory: AVoiceintheWilderness },
  [CardName.WEEPING_IN_RAMAH]: { Factory: WeepinginRamah },
  [CardName.WITH_THE_RICH_IN_HIS_DEATH]: { Factory: WiththeRichinHisDeath },
  [CardName.PIERCED_FOR_OUR_TRANSGRESSIONS]: { Factory: PiercedforOurTransgressions },
  [CardName.SILENT_BEFORE_HIS_ACCUSERS]: { Factory: SilentBeforeHisAccusers },
  [CardName.BETRAYED_FOR_THIRTY_PIECES_OF_SILVER]: { Factory: BetrayedforThirtyPiecesofSilver },
  [CardName.THE_KING_ON_A_COLT]: { Factory: TheKingonaColt },
  [CardName.LIGHT_TO_THE_GENTILES]: { Factory: LighttotheGentiles },
  [CardName.SHOOT_FROM_THE_STUMP_OF_JESSE]: { Factory: ShootfromtheStumpofJesse },
  [CardName.A_SUFFERING_SERVANT]: { Factory: ASufferingServant },
  [CardName.MESSIAH_BORN_IN_BETHLEHEM]: { Factory: MessiahBorninBethlehem },
  [CardName.VIRGIN_BIRTH_FORETOLD]: { Factory: VirginBirthForetold },
  [CardName.BABYLONIAN_EXILE]: { Factory: BabylonianExile },
  [CardName.ASSYRIAN_CONQUEST]: { Factory: AssyrianConquest },
  [CardName.SOLOMOIC_TEMPLE]: { Factory: SolomoicTemple },
  [CardName.A_KING_IN_ISRAEL]: { Factory: AKinginIsrael },
  [CardName.CONQUEST_OF_CANAAN]: { Factory: ConquestofCanaan },
  [CardName.LIBERATION_FROM_EGYPT]: { Factory: LiberationfromEgypt },
  [CardName.JACOBS_FAMILY_GOES_TO_EGYPT]: { Factory: JacobsfamilygoestoEgypt },
  [CardName.CHURCH_SPLIT]: { Factory: ChurchSplit },
  [CardName.RAISE_OF_THE_FALSE_PROPHET]: { Factory: RaiseoftheFalseProphet },
  [CardName.THE_RAPTURE]: { Factory: TheRapture },
  [CardName.DR_MICHAEL_SVIGEL]: { Factory: DrMichaelSvigel },
  [CardName.JOEL_OSTEEN_SUNDAY]: { Factory: JoelOsteensunday },
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
