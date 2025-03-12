<template>
        <div id="create-game" class="create-game">
            <h1><span v-i18n>{{ constants.APP_NAME }}</span> — <span v-i18n>Create New Game</span></h1>
            <div class="create-game-form create-game-panel create-game--block">

                <div class="create-game-options">
                    <div class="create-game-page-container">
                        <div class="create-game-page-column">
                            <h4 v-i18n>№ of Players</h4>
                            <div v-for="pCount in [1,2,3,4,5,6]" v-bind:key="pCount">
                              <input type="radio" :value="pCount" name="playersCount" v-model="playersCount" :id="pCount+'-radio'">
                              <label :for="pCount+'-radio'">
                                  {{ getPlayersCountText(pCount) }}
                              </label>
                            </div>
                        </div> 

                        <div class="create-game-players-cont">
                            <div class="container">
                                <div class="columns">
                                  <template v-for="(newPlayer, index) in getPlayers()">
                                    <div v-bind:key="index">
                                      <div :class="'form-group col6 create-game-player '+getPlayerContainerColorClass(newPlayer.color)">
                                          <div>
                                              <input class="form-input form-inline create-game-player-name" :placeholder="getPlayerNamePlaceholder(index)" v-model="newPlayer.name" />
                                          </div>
                                          <div class="create-game-page-color-row">
                                              <template v-for="color in PLAYER_COLORS">
                                                <div v-bind:key="color">
                                                  <input type="radio" :value="color" :name="'playerColor' + (index + 1)" v-model="newPlayer.color" :id="'radioBox' + color + (index + 1)">
                                                  <label :for="'radioBox' + color + (index + 1)">
                                                      <div :class="'create-game-colorbox '+getPlayerCubeColorClass(color)"></div>
                                                  </label>
                                                </div>
                                              </template>
                                          </div>
                                          <div>
                                              <!-- <template v-if="beginnerOption"> -->
                                              <!-- </template> -->

                                              <label class="form-radio form-inline" v-if="!randomFirstPlayer">
                                                  <input type="radio" name="firstIndex" :value="index + 1" v-model="firstIndex">
                                                  <i class="form-icon"></i> <span v-i18n>Goes First?</span>
                                              </label>
                                          </div>
                                      </div>
                                    </div>
                                  </template>
                                </div>
                            </div>
                        </div>

                        <div class="create-game-action">
                            <AppButton title="Create game" size="big" @click="createGame"/>

                            <label>
                                <div class="btn btn-primary btn-action btn-lg"><i class="icon icon-upload"></i></div>
                                <input style="display: none" type="file" accept=".json" id="settings-file" ref="file" v-on:change="uploadSettings()"/>
                            </label>

                            <label>
                                <div v-on:click="downloadSettings()" class="btn btn-primary btn-action btn-lg"><i class="icon icon-download"></i></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            <div class="create-game--block" v-if="showCorporationList">
              <CorporationsFilter
                  ref="corporationsFilter"
                  v-on:corporation-list-changed="updatecustomCorporations"
                  v-bind:expansions="expansions"
              ></CorporationsFilter>
            </div>

            <div class="create-game--block" v-if="showColoniesList">
              <ColoniesFilter
                  ref="coloniesFilter"
                  v-on:colonies-list-changed="updatecustomColonies"
                  v-bind:expansions="expansions"
              ></ColoniesFilter>
            </div>

            <div class="create-game--block" v-if="showPreludesList">
              <PreludesFilter
                  ref="preludesFilter"
                  v-on:prelude-list-changed="updateCustomPreludes"
                  v-bind:expansions="expansions"
              ></PreludesFilter>
            </div>

            <div class="create-game--block" v-if="showBannedCards">
              <CardsFilter
                  ref="cardsFilter"
                  v-on:cards-list-changed="updateBannedCards"
                  :title="'Cards to exclude from the game'"
                  :hint="'Start typing the card name to exclude'"
              ></CardsFilter>
            </div>

            <div class="create-game--block" v-if="showIncludedCards">
              <CardsFilter
                  ref="cardsFilter2"
                  v-on:cards-list-changed="updateIncludedCards"
                  :title="'Cards to include in the game'"
                  :hint="'Start typing the card name to include'"
              ></CardsFilter>
            </div>
          <preferences-icon></preferences-icon>
        </div>
</template>

<script lang="ts">
import * as constants from '@/common/constants';
import * as json_constants from '@/client/components/create/json';

import Vue from 'vue';
import {WithRefs} from 'vue-typed-refs';
import {Color, PLAYER_COLORS} from '@/common/Color';
import {BoardName} from '@/common/boards/BoardName';
import {RandomBoardOption} from '@/common/boards/RandomBoardOption';
import {CardName} from '@/common/cards/CardName';
import CorporationsFilter from '@/client/components/create/CorporationsFilter.vue';
import PreludesFilter from '@/client/components/create/PreludesFilter.vue';
import {translateText, translateTextWithParams} from '@/client/directives/i18n';
import ColoniesFilter from '@/client/components/create/ColoniesFilter.vue';
import {ColonyName} from '@/common/colonies/ColonyName';
import CardsFilter from '@/client/components/create/CardsFilter.vue';
import AppButton from '@/client/components/common/AppButton.vue';
import {playerColorClass} from '@/common/utils/utils';
import {RandomMAOptionType} from '@/common/ma/RandomMAOptionType';
import {GameId} from '@/common/Types';
import {AgendaStyle} from '@/common/turmoil/Types';
import PreferencesIcon from '@/client/components/PreferencesIcon.vue';
import {getCard} from '@/client/cards/ClientCardManifest';
import {DEFAULT_EXPANSIONS, Expansion} from '@/common/cards/GameModule';
import {BoardNameType, NewGameConfig, NewPlayerModel} from '@/common/game/NewGameConfig';
import {vueRoot} from '@/client/components/vueRoot';
import {CreateGameModel} from './CreateGameModel';
import {paths} from '@/common/app/paths';

const REVISED_COUNT_ALGORITHM = false;

type Refs = {
  coloniesFilter: InstanceType<typeof ColoniesFilter>,
  corporationsFilter: InstanceType<typeof CorporationsFilter>,
  preludesFilter: InstanceType<typeof PreludesFilter>,
  cardsFilter: InstanceType<typeof CardsFilter>,
  cardsFilter2: InstanceType<typeof CardsFilter>,
  file: HTMLInputElement,
}

type FormModel = {
  preludeToggled: boolean;
  uploading: boolean;
};

export default (Vue as WithRefs<Refs>).extend({
  name: 'CreateGameForm',
  data(): CreateGameModel & FormModel {
    return {
      firstIndex: 1,
      playersCount: 1,
      players: [
        {name: '', color: 'red', beginner: false, handicap: 0, first: false},
        {name: '', color: 'green', beginner: false, handicap: 0, first: false},
        {name: '', color: 'yellow', beginner: false, handicap: 0, first: false},
        {name: '', color: 'blue', beginner: false, handicap: 0, first: false},
        {name: '', color: 'black', beginner: false, handicap: 0, first: false},
        {name: '', color: 'purple', beginner: false, handicap: 0, first: false},
        {name: '', color: 'orange', beginner: false, handicap: 0, first: false},
        {name: '', color: 'pink', beginner: false, handicap: 0, first: false},
      ],
      expansions: { 
      ...DEFAULT_EXPANSIONS,
      community: true },
      draftVariant: true,
      initialDraft: false,
      randomMA: RandomMAOptionType.NONE,
      modularMA: false,
      randomFirstPlayer: true,
      showOtherPlayersVP: true,
      // beginnerOption: false,
      showColoniesList: false,
      showCorporationList: false,
      showPreludesList: false,
      showBannedCards: false,
      showIncludedCards: false,
      customColonies: [],
      customCorporations: [],
      customPreludes: [],
      bannedCards: [],
      includedCards: [],
      board: BoardName.VASTITAS_BOREALIS,
      boards: [
        BoardName.THARSIS,
        BoardName.HELLAS,
        BoardName.ELYSIUM,
        RandomBoardOption.OFFICIAL,
        BoardName.UTOPIA_PLANITIA,
        BoardName.VASTITAS_BOREALIS_NOVUS,
        BoardName.TERRA_CIMMERIA_NOVUS,
        BoardName.ARABIA_TERRA,
        BoardName.AMAZONIS,
        BoardName.TERRA_CIMMERIA,
        BoardName.VASTITAS_BOREALIS,
        RandomBoardOption.ALL,
      ],
      seed: Math.random(),
      seededGame: false,
      solarPhaseOption: false,
      shuffleMapOption: false,
      aresExtremeVariant: false,
      politicalAgendasExtension: AgendaStyle.STANDARD,
      undoOption: false,
      showTimers: true,
      fastModeOption: false,
      removeNegativeGlobalEventsOption: false,
      includeFanMA: false,
      startingCorporations: 2,
      soloTR: false,
      clonedGameId: undefined,
      allOfficialExpansions: false,
      requiresVenusTrackCompletion: false,
      requiresMoonTrackCompletion: false,
      moonStandardProjectVariant: false,
      moonStandardProjectVariant1: false,
      altVenusBoard: false,
      escapeVelocityMode: false,
      escapeVelocityThreshold: constants.DEFAULT_ESCAPE_VELOCITY_THRESHOLD,
      escapeVelocityBonusSeconds: constants.DEFAULT_ESCAPE_VELOCITY_BONUS_SECONDS,
      escapeVelocityPeriod: constants.DEFAULT_ESCAPE_VELOCITY_PERIOD,
      escapeVelocityPenalty: constants.DEFAULT_ESCAPE_VELOCITY_PENALTY,
      twoCorpsVariant: false,
      customCeos: [],
      startingCeos: 3,
      startingPreludes: 4,
      preludeDraftVariant: undefined,
      preludeToggled: false,
      uploading: false,
    };
  },
  components: {
    AppButton,
    CardsFilter,
    ColoniesFilter,
    CorporationsFilter,
    PreludesFilter,
    PreferencesIcon,
  },
  watch: {
    allOfficialExpansions(value: boolean) {
      this.expansions.corpera = value;
      this.expansions.prelude = value;
      this.expansions.venus = value;
      this.expansions.colonies = value;
      this.expansions.turmoil = value;
      this.expansions.promo = value;
      this.solarPhaseOption = value;
    },
    venusNext(value: boolean) {
      this.solarPhaseOption = value;
    },
    turmoil(value: boolean) {
      if (value === false) {
        this.politicalAgendasExtension = AgendaStyle.STANDARD;
      }
    },
    initialDraft(value: boolean) {
      if (value === true && this.preludeDraftVariant === undefined) {
        this.preludeDraftVariant = true;
      }
    },
    prelude(value: boolean) {
      if (value === true && this.preludeDraftVariant === undefined) {
        this.preludeDraftVariant = true;
      }
    },
    prelude2Expansion(value: boolean) {
      if (value === true && this.preludeToggled === false && this.uploading === false) {
        this.expansions.prelude = true;
        this.preludeToggled = true;
      }
    },
    playersCount(value: number) {
      if (value === 1) {
        this.expansions.corpera = true;
      }
    },
  },
  computed: {
    venusNext() {
      return this.expansions.venus;
    },
    turmoil() {
      return this.expansions.turmoil;
    },
    prelude() {
      return this.expansions.prelude;
    },
    prelude2Expansion() {
      return this.expansions.prelude2;
    },
    RandomBoardOption(): typeof RandomBoardOption {
      return RandomBoardOption;
    },
    RandomMAOptionType(): typeof RandomMAOptionType {
      return RandomMAOptionType;
    },
    constants(): typeof constants {
      return constants;
    },
    PLAYER_COLORS(): typeof PLAYER_COLORS {
      return PLAYER_COLORS;
    },
  },
  methods: {
    async downloadSettings() {
      const serializedData = await this.serializeSettings();

      if (serializedData) {
        const a = document.createElement('a');
        const blob = new Blob([serializedData], {'type': 'application/json'});
        a.href = window.URL.createObjectURL(blob);
        a.download = 'tm_settings.json';
        a.click();
      }
    },
    uploadSettings() {
      const refs: Refs = this.$refs;
      const file = refs.file.files !== null ? refs.file.files[0] : undefined;
      const reader = new FileReader();
      const component: CreateGameModel = this;

      reader.addEventListener('load', () => {
        const warnings = [];
        try {
          const readerResults = reader.result;
          if (typeof(readerResults) === 'string') {
            this.uploading = true;
            const results = JSON.parse(readerResults);

            const players = results['players'];
            const validationErrors = validatePlayers(players);
            if (validationErrors.length > 0) {
              throw new Error(validationErrors.join('\n'));
            }

            if (results.corporationsDraft !== undefined) {
              warnings.push('Corporations draft is no longer available. Future versions might just raise an error, so edit your JSON file.');
            }

            const customCorporations = results[json_constants.CUSTOM_CORPORATIONS] || results[json_constants.OLD_CUSTOM_CORPORATIONS] || [];
            const customColonies = results[json_constants.CUSTOM_COLONIES] || results[json_constants.OLD_CUSTOM_COLONIES] || [];
            const bannedCards = results[json_constants.BANNED_CARDS] || results[json_constants.OLD_BANNED_CARDS] || [];
            const includedCards = results[json_constants.INCLUDED_CARDS] || [];
            const customPreludes = results[json_constants.CUSTOM_PRELUDES] || [];

            component.playersCount = players.length;
            component.showCorporationList = customCorporations.length > 0;
            component.showColoniesList = customColonies.length > 0;
            component.showBannedCards = bannedCards.length > 0;
            component.showIncludedCards = includedCards.length > 0;
            component.showPreludesList = customPreludes.length > 0;

            const oldFields: Record<Expansion, string> = {
              corpera: json_constants.CORPORATEERA,
              promo: json_constants.PROMOCARDSOPTION,
              venus: json_constants.VENUSNEXT,
              colonies: json_constants.COLONIES,
              prelude: json_constants.PRELUDE,
              prelude2: json_constants.PRELUDE2EXPANSION,
              turmoil: json_constants.TURMOIL,
              community: json_constants.COMMUNITYCARDSOPTION,
              ares: json_constants.ARESEXTENSION,
              moon: json_constants.MOONEXPANSION,
              pathfinders: json_constants.PATHFINDERSEXPANSION,
              ceo: json_constants.CEOEXTENSION,
              starwars: json_constants.STARWARSEXPANSION,
              underworld: json_constants.UNDERWORLDEXPANSION,
            } as const;
            for (const expansion of Object.keys(oldFields)) {
              const x = oldFields[expansion as Expansion];
              const val = results[x];
              if (val !== undefined) {
                component.expansions[expansion as Expansion] = val;
              }
            }


            // Capture the solar phase option since several of the other results will change
            // it via the watch mechanism.
            const capturedSolarPhaseOption = results.solarPhaseOption;

            const specialFields = [
              json_constants.CUSTOM_CORPORATIONS,
              json_constants.OLD_CUSTOM_CORPORATIONS,
              json_constants.CUSTOM_COLONIES,
              json_constants.OLD_CUSTOM_COLONIES,
              json_constants.CUSTOM_PRELUDES,
              json_constants.BANNED_CARDS,
              json_constants.INCLUDED_CARDS,
              json_constants.OLD_BANNED_CARDS,
              ...Object.values(oldFields),
              'players',
              'solarPhaseOption',
              'constants'];
            for (const k in results) {
              if (specialFields.includes(k)) continue;
              if (!Object.prototype.hasOwnProperty.call(component, k)) {
                warnings.push('Unknown property: ' + k);
              }
              // This is safe because of the hasOwnProperty check, above. hasOwnProperty doesn't help with type declarations.
              (component as any)[k] = results[k];
            }

            for (let i = 0; i < players.length; i++) {
              component.players[i] = players[i];
            }

            Vue.nextTick(() => {
              try {
                if (component.showColoniesList) refs.coloniesFilter.updateColoniesByNames(customColonies);
                if (component.showCorporationList) refs.corporationsFilter.selectedCorporations = customCorporations;
                if (component.showPreludesList) refs.preludesFilter.updatePreludes(customPreludes);
                if (component.showBannedCards) refs.cardsFilter.selectedCardNames = bannedCards;
                if (component.showIncludedCards) refs.cardsFilter2.selectedCardNames = includedCards;
                if (!component.seededGame) component.seed = Math.random();
                // set to alter after any watched properties
                component.solarPhaseOption = Boolean(capturedSolarPhaseOption);
                this.uploading = false;
              } catch (e) {
                window.alert('Error reading JSON ' + e);
              }
            });
          }
          if (warnings.length > 0) {
            window.alert('Settings loaded, with these warnings: \n' + warnings.join('\n'));
          } else {
            window.alert('Settings loaded.');
          }
        } catch (e) {
          window.alert('Error loading settings ' + e);
        }
      }, false);
      if (file) {
        if (/\.json$/i.test(file.name)) {
          reader.readAsText(file);
        }
      }
    },
    getPlayerNamePlaceholder(index: number): string {
      return translateTextWithParams('Player ${0} name', [String(index + 1)]);
    },
    updatecustomCorporations(customCorporations: Array<CardName>) {
      this.customCorporations = customCorporations;
    },
    updateCustomPreludes(customPreludes: Array<CardName>) {
      this.customPreludes = customPreludes;
    },
    updateBannedCards(bannedCards: Array<CardName>) {
      this.bannedCards = bannedCards;
    },
    updateIncludedCards(includedCards: Array<CardName>) {
      this.includedCards = includedCards;
    },
    updatecustomColonies(customColonies: Array<ColonyName>) {
      this.customColonies = customColonies;
    },
    getPlayers(): Array<NewPlayerModel> {
      return this.players.slice(0, this.playersCount);
    },
    isRandomMAEnabled(): Boolean {
      return this.randomMA !== RandomMAOptionType.NONE;
    },
    randomMAToggle() {
      if (this.randomMA === RandomMAOptionType.NONE) {
        this.randomMA = RandomMAOptionType.LIMITED;
      } else {
        this.randomMA = RandomMAOptionType.NONE;
      }
    },
    getRandomMaOptionType(type: 'limited' | 'full'): RandomMAOptionType {
      if (type === 'limited') {
        return RandomMAOptionType.LIMITED;
      } else if (type === 'full') {
        return RandomMAOptionType.UNLIMITED;
      } else {
        return RandomMAOptionType.NONE;
      }
    },
    isPoliticalAgendasExtensionEnabled(): Boolean {
      return this.politicalAgendasExtension !== AgendaStyle.STANDARD;
    },
    politicalAgendasExtensionToggle() {
      if (this.politicalAgendasExtension === AgendaStyle.STANDARD) {
        this.politicalAgendasExtension = AgendaStyle.RANDOM;
      } else {
        this.politicalAgendasExtension = AgendaStyle.STANDARD;
      }
    },
    getPoliticalAgendasExtensionAgendaStyle(type: 'random' | 'chairman'): AgendaStyle {
      if (type === 'random') {
        return AgendaStyle.RANDOM;
      } else if (type === 'chairman') {
        return AgendaStyle.CHAIRMAN;
      } else {
        console.warn('AgendaStyle not found');
        return AgendaStyle.STANDARD;
      }
    },
    isBeginnerToggleEnabled(): Boolean {
      return !(this.initialDraft || this.expansions.prelude || this.expansions.venus || this.expansions.colonies || this.expansions.turmoil);
    },
    getPlayersCountText(count: number): string {
      if (count === 1) {
        return translateText('Solo');
      }
      return count.toString();
    },
    deselectVenusCompletion() {
      if (this.expansions.venus === false) {
        this.requiresVenusTrackCompletion = false;
      }
    },
    deselectMoonCompletion() {
      if (this.expansions.moon === false) {
        this.requiresMoonTrackCompletion = false;
        this.moonStandardProjectVariant = false;
        this.moonStandardProjectVariant1 = false;
      }
    },
    getBoardColorClass(boardName: BoardName | BoardNameType): string {
      switch (boardName) {
      case BoardName.THARSIS:
        return 'create-game-board-hexagon create-game-tharsis';
      case BoardName.HELLAS:
        return 'create-game-board-hexagon create-game-hellas';
      case BoardName.ELYSIUM:
        return 'create-game-board-hexagon create-game-elysium';
      case BoardName.UTOPIA_PLANITIA:
        return 'create-game-board-hexagon create-game-utopia-planitia';
      case BoardName.VASTITAS_BOREALIS_NOVUS:
        return 'create-game-board-hexagon create-game-vastital-borealis-novus';
      case BoardName.AMAZONIS:
        return 'create-game-board-hexagon create-game-amazonis';
      case BoardName.ARABIA_TERRA:
        return 'create-game-board-hexagon create-game-arabia-terra';
      case BoardName.TERRA_CIMMERIA:
        return 'create-game-board-hexagon create-game-terra-cimmeria';
      case BoardName.VASTITAS_BOREALIS:
        return 'create-game-board-hexagon create-game-vastitas-borealis';
      default:
        return 'create-game-board-hexagon create-game-random';
      }
    },
    getPlayerCubeColorClass(color: Color): string {
      return playerColorClass(color, 'bg');
    },
    getPlayerContainerColorClass(color: Color): string {
      return playerColorClass(color, 'bg_transparent');
    },
    isEnabled(expansion: Expansion): boolean {
      const model: CreateGameModel = this;
      return model.expansions[expansion];
    },
    boardHref(boardName: BoardName | RandomBoardOption) {
      const options: Record<BoardName | RandomBoardOption, string> = {
        [BoardName.THARSIS]: 'tharsis',
        [BoardName.HELLAS]: 'hellas',
        [BoardName.ELYSIUM]: 'elysium',
        [BoardName.ARABIA_TERRA]: 'arabia-terra',
        [BoardName.UTOPIA_PLANITIA]: 'utopia-planitia',
        [BoardName.VASTITAS_BOREALIS_NOVUS]: 'vastitas-borealis-novus',
        [BoardName.VASTITAS_BOREALIS]: 'vastitas-borealis',
        [BoardName.AMAZONIS]: 'amazonis-planatia',
        [BoardName.TERRA_CIMMERIA]: 'terra-cimmeria',
        [BoardName.TERRA_CIMMERIA_NOVUS]: 'terra-cimmeria-novus',
        [RandomBoardOption.OFFICIAL]: '',
        [RandomBoardOption.ALL]: '',
      };
      return 'https://github.com/terraforming-mars/terraforming-mars/wiki/Maps#' + options[boardName];
    },
    async serializeSettings() {
      let players = this.players.slice(0, this.playersCount);

      if (this.randomFirstPlayer) {
        // Shuffle players array to assign each player a random seat around the table
        players = players.map((a) => ({sort: Math.random(), value: a}))
          .sort((a, b) => a.sort - b.sort)
          .map((a) => a.value);
        this.firstIndex = Math.floor(this.seed * this.playersCount) + 1;
      }

      // Auto assign an available color if there are duplicates
      const uniqueColors = new Set(players.map((player) => player.color));
      if (uniqueColors.size !== players.length) {
        const usedColors: Set<Color> = new Set();
        // This filter retains the default player color order.
        const unusedColors = PLAYER_COLORS.filter((c) => !uniqueColors.has(c));
        for (const player of players) {
          const color = player.color;
          if (usedColors.has(color)) {
            // Pulling off the front of the list also helps retain the default player color order.
            player.color = unusedColors.shift() as Color;
            usedColors.add(color);
          } else {
            usedColors.add(color);
          }
        }
      }

      // Set player name automatically if not entered
      const isSoloMode = this.playersCount === 1;

      this.players.forEach((player) => {
        if (player.name === '') {
          if (isSoloMode) {
            player.name = this.$t('You');
          } else {
            const defaultPlayerName = this.$t(player.color.charAt(0).toUpperCase() + player.color.slice(1));
            player.name = defaultPlayerName;
          }
        }
      });

      players.map((player: any) => {
        player.first = (this.firstIndex === player.index);
        return player;
      });

      const draftVariant = this.draftVariant;
      const initialDraft = this.initialDraft;
      const randomMA = this.randomMA;
      const showOtherPlayersVP = this.showOtherPlayersVP;
      const solarPhaseOption = this.solarPhaseOption;
      const shuffleMapOption = this.shuffleMapOption;
      const customColonies = this.customColonies;
      const customCorporations = this.customCorporations;
      const customPreludes = this.customPreludes;
      const bannedCards = this.bannedCards;
      const includedCards = this.includedCards;
      const board = this.board;
      const seed = this.seed;
      const politicalAgendasExtension = this.politicalAgendasExtension;
      const undoOption = this.undoOption;
      const showTimers = this.showTimers;
      const fastModeOption = this.fastModeOption;
      const removeNegativeGlobalEventsOption = this.removeNegativeGlobalEventsOption;
      const includeFanMA = this.includeFanMA;
      const startingCorporations = this.startingCorporations;
      const soloTR = this.soloTR;
      // const beginnerOption = this.beginnerOption;
      const randomFirstPlayer = this.randomFirstPlayer;
      const requiresVenusTrackCompletion = this.requiresVenusTrackCompletion;
      const escapeVelocityMode = this.escapeVelocityMode;
      const escapeVelocityThreshold = this.escapeVelocityMode ? this.escapeVelocityThreshold : undefined;
      const escapeVelocityBonusSeconds = this.escapeVelocityBonusSeconds ? this.escapeVelocityBonusSeconds : undefined;
      const escapeVelocityPeriod = this.escapeVelocityMode ? this.escapeVelocityPeriod : undefined;
      const escapeVelocityPenalty = this.escapeVelocityMode ? this.escapeVelocityPenalty : undefined;
      const twoCorpsVariant = this.twoCorpsVariant;
      const customCeos = this.customCeos;
      const startingCeos = this.startingCeos;
      const startingPreludes = this.startingPreludes;
      let clonedGamedId: undefined | GameId = undefined;

      // Check custom colony count
      if (customColonies.length > 0) {
        const playersCount = players.length;
        let neededColoniesCount = playersCount + 2;
        if (playersCount === 1) {
          neededColoniesCount = 4;
        } else if (playersCount === 2) {
          neededColoniesCount = 5;
        }

        if (customColonies.length < neededColoniesCount) {
          window.alert(translateTextWithParams('Must select at least ${0} colonies', [neededColoniesCount.toString()]));
          return;
        }
      }

      if (players.length === 1 && this.expansions.corpera === false) {
        const confirm = window.confirm(translateText(
          'We do not recommend playing a solo game without the Corporate Era. Press OK if you want to play without it.'));
        if (confirm === false) return;
      }

      // Check custom corp count
      if (this.showCorporationList && customCorporations.length > 0) {
        let neededCorpsCount = players.length * startingCorporations;
        if (REVISED_COUNT_ALGORITHM) {
          if (this.twoCorpsVariant) {
            // Add an additional 4 for the Merger prelude
            // Everyone-Merger needs an additional 4 corps per player
            //  NB: This will not cover the case when no custom corp list is set!
            //  It _can_ come about if  the number of corps included in all expansions is still not enough.
            neededCorpsCount = (players.length * startingCorporations) + (players.length * 4);
          } else {
            neededCorpsCount = players.length * startingCorporations;
            // Merger Prelude alone needs 4 additional preludes
            if (this.expansions.prelude && this.expansions.promo) neededCorpsCount += 4;
          }
        }
        if (customCorporations.length < neededCorpsCount) {
          window.alert(translateTextWithParams('Must select at least ${0} corporations', [neededCorpsCount.toString()]));
          return;
        }
        let valid = true;
        for (const corp of customCorporations) {
          const card = getCard(corp);
          for (const module of card?.compatibility ?? []) {
            if (!this.isEnabled(module)) {
              valid = false;
            }
          }
        }
        if (valid === false) {
          const confirm = window.confirm(translateText(
            'Some of the corps you selected need expansions you have not enabled. Using them might break your game. Press OK to continue or Cancel to change your selections.'));
          if (confirm === false) return;
        }
      } else {
        customCorporations.length = 0;
      }

      // TODO(kberg): this is a direct copy of the code right above.
      // Check custom prelude count
      if (this.showPreludesList && customPreludes.length > 0) {
        const requiredPreludeCount = players.length * startingPreludes;
        if (customPreludes.length < requiredPreludeCount) {
          window.alert(translateTextWithParams('Must select at least ${0} Preludes', [requiredPreludeCount.toString()]));
          return;
        }
        let valid = true;
        for (const prelude of customPreludes) {
          const card = getCard(prelude);
          for (const module of card?.compatibility ?? []) {
            if (!this.isEnabled(module)) {
              valid = false;
            }
          }
        }
        if (valid === false) {
          const confirm = window.confirm(translateText(
            'Some of the Preludes you selected need expansions you have not enabled. Using them might break your game. Press OK to continue or Cancel to change your selections.'));
          if (confirm === false) return;
        }
      } else {
        customPreludes.length = 0;
      }

      // Clone game checks
      if (this.clonedGameId !== undefined && this.seededGame) {
        const gameData = await fetch('api/cloneablegame?id=' + this.clonedGameId)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            if (response.status === 404) {
              return;
            }
            return response.text().then((res) => new Error(res));
          });
        if (gameData === undefined) {
          alert(this.$t('Game id ' + this.clonedGameId + ' not found'));
          return;
        }
        if (gameData instanceof Error) {
          alert(this.$t('Error looking for predefined game ' + gameData.message));
          return;
        }
        clonedGamedId = this.clonedGameId;
        if (gameData.playerCount !== players.length) {
          alert(this.$t('Player count mismatch'));
          this.playersCount = gameData.playerCount;
          return;
        }
      } else if (!this.seededGame) {
        clonedGamedId = undefined;
      }

      const dataToSend: NewGameConfig = {
        players,
        expansions: this.expansions,
        draftVariant,
        showOtherPlayersVP,
        customCorporationsList: customCorporations,
        customColoniesList: customColonies,
        customPreludes,
        bannedCards,
        includedCards,
        board,
        seed,
        solarPhaseOption,
        aresExtremeVariant: this.aresExtremeVariant,
        politicalAgendasExtension: politicalAgendasExtension,
        undoOption,
        showTimers,
        fastModeOption,
        removeNegativeGlobalEventsOption,
        includeFanMA,
        // modularMA: this.modularMA,
        modularMA: false,
        startingCorporations,
        soloTR,
        clonedGamedId,
        initialDraft,
        preludeDraftVariant: this.preludeDraftVariant ?? false,
        randomMA,
        shuffleMapOption,
        // beginnerOption,
        randomFirstPlayer,
        requiresVenusTrackCompletion,
        requiresMoonTrackCompletion: this.requiresMoonTrackCompletion,
        moonStandardProjectVariant: this.moonStandardProjectVariant,
        moonStandardProjectVariant1: this.moonStandardProjectVariant1,
        altVenusBoard: this.altVenusBoard,
        escapeVelocityMode,
        escapeVelocityThreshold,
        escapeVelocityBonusSeconds,
        escapeVelocityPeriod,
        escapeVelocityPenalty,
        twoCorpsVariant,
        customCeos,
        startingCeos,
        startingPreludes,
      };
      return JSON.stringify(dataToSend, undefined, 4);
    },
    async createGame() {
      const dataToSend = await this.serializeSettings();

      if (dataToSend === undefined) return;
      const onSuccess = (json: any) => {
        if (json.players.length === 1) {
          window.location.href = 'player?id=' + json.players[0].id;
          return;
        } else {
          window.history.replaceState(json, `${constants.APP_NAME} - Game`, 'game?id=' + json.id);
          vueRoot(this).game = json;
          vueRoot(this).screen = 'game-home';
        }
      };

      fetch(paths.API_CREATEGAME, {'method': 'PUT', 'body': dataToSend, 'headers': {'Content-Type': 'application/json'}})
        .then((response) => response.text())
        .then((text) => {
          try {
            const json = JSON.parse(text);
            onSuccess(json);
          } catch (err) {
            throw new Error(text);
          }
        })
        .catch((error: Error) => {
          alert(error.message);
        });
    },
  },
});

function validatePlayers(players: Array<NewPlayerModel>): Array<string> {
  const errors = [];

  // Ensure colors are valid and distinct
  const colors = new Set(players.map((p) => p.color));
  for (const color of colors) {
    // `as any` is OK here since this just validates `color`.
    if (PLAYER_COLORS.indexOf(color as any) === -1) {
      errors.push(color + ' is not a color');
    }
  }
  if (colors.size !== players.length) {
    errors.push('Colors are duplicated');
  }
  return errors;
}

</script>
