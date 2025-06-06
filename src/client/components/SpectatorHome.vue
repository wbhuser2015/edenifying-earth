<template>
  <div id="spectator-home">
    <sidebar v-trim-whitespace
      :acting_player="false"
      :player_color="spectator.color"
      :generation="game.generation"
      :coloniesCount="game.colonies.length"
      :gospel_spread = "game.gospel_spread"
      :prophecies_fulfilled = "game.prophecies_fulfilledLevel"
      :Unreached = "game.Unreached"
      :venus = "game.venusScaleLevel"
      :turmoil = "game.turmoil"
      :moonData="game.moon"
      :gameOptions = "game.gameOptions"
      :playerNumber = "spectator.players.length"
      :lastSoloGeneration = "game.lastSoloGeneration">
        <div class="deck-size">{{ game.deckSize }}</div>
    </sidebar>

    <div class="player_home_block nofloat">
        <log-panel v-if="spectator.id !== undefined" :id="spectator.id" :players="spectator.players" :generation="game.generation" :lastSoloGeneration="game.lastSoloGeneration" :color="spectator.color"></log-panel>
    </div>

    <players-overview class="player_home_block player_home_block--players nofloat" :playerView="spectator" v-trim-whitespace id="shortkey-playersoverview"/>

    <a name="board" class="player_home_anchor"></a>
    <board
      :spaces="game.spaces"
      :expansions="game.gameOptions.expansions"
      :venusScaleLevel="game.venusScaleLevel"
      :boardName ="game.gameOptions.boardName"
      :Unreached_count="game.Unreached"
      :prophecies_fulfilled="game.prophecies_fulfilledLevel"
      :gospel_spread="game.gospel_spread"
      :altVenusBoard="game.gameOptions.altVenusBoard"
      :aresData="game.aresData"
      :tileView="tileView"
      @toggleTileView="cycleTileView()"
      id="shortkey-board"
    />

    <turmoil v-if="game.turmoil" :turmoil="game.turmoil"/>

    <MoonBoard v-if="game.gameOptions.expansions.moon" :model="game.moon" :tileView="tileView"/>

    <PlanetaryTracks v-if="game.gameOptions.expansions.pathfinders" :tracks="game.pathfinders" :gameOptions="game.gameOptions"/>

    <div v-if="spectator.players.length > 1" class="player_home_block--milestones-and-awards">
        <Milestone :milestones="game.milestones" />
        <Awards :awards="game.awards" show-scores />
    </div>

    <!-- TODO(kberg): add the spectator tab. -->
    <div v-if="spectator.game.colonies.length > 0 /* && getCurrentSpectatorTab() === 'colonies' */" class="player_home_block" ref="colonies" id="shortkey-colonies">
      <a name="colonies" class="player_home_anchor"></a>
      <dynamic-title title="Colonies" :color="spectator.color"/>
      <div class="colonies-fleets-cont">
        <div class="colonies-player-fleets" v-for="player in spectator.players" v-bind:key="player.color">
            <div :class="'colonies-fleet colonies-fleet-'+ player.color" v-for="idx in range(player.fleetSize - player.tradesThisGeneration)" v-bind:key="idx"></div>
        </div>
      </div>
      <div class="player_home_colony_cont">
        <div class="player_home_colony" v-for="colony in spectator.game.colonies" :key="colony.name">
            <colony :colony="colony" :active="colony.isActive"></colony>
        </div>
      </div>
        <div v-if="game.gameOptions.expansions.pathfinders">
          <PlanetaryTracks :tracks="game.pathfinders" :gameOptions="game.gameOptions"/>
        </div>
    </div>
    <waiting-for v-show="false" v-if="game.phase !== 'end'" :players="spectator.players" :playerView="spectator" :settings="settings" :waitingfor="undefined"></waiting-for>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import {GameModel} from '@/common/models/GameModel';
import {vueRoot} from '@/client/components/vueRoot';

import * as raw_settings from '@/genfiles/settings.json';
import {SpectatorModel} from '@/common/models/SpectatorModel';
import Awards from '@/client/components/Awards.vue';
import Board from '@/client/components/Board.vue';
import Colony from '@/client/components/colonies/Colony.vue';
import PlanetaryTracks from '@/client/components/pathfinders/PlanetaryTracks.vue';
import DynamicTitle from '@/client/components/common/DynamicTitle.vue';
import LogPanel from '@/client/components/logpanel/LogPanel.vue';
import MoonBoard from '@/client/components/moon/MoonBoard.vue';
import Milestone from '@/client/components/Milestones.vue';
import Sidebar from '@/client/components/Sidebar.vue';
import Turmoil from '@/client/components/turmoil/Turmoil.vue';
import WaitingFor from '@/client/components/WaitingFor.vue';
import PlayersOverview from '@/client/components/overview/PlayersOverview.vue';
import {range} from '@/common/utils/utils';
import {nextTileView, TileView} from './board/TileView';

export interface SpectatorHomeModel {
  tileView: TileView;
  waitingForTimeout: number;
}

export default Vue.extend({
  name: 'SpectatorHome',
  data(): SpectatorHomeModel {
    return {
      tileView: 'show',
      waitingForTimeout: this.settings.waitingForTimeout as typeof raw_settings.waitingForTimeout,
    };
  },
  props: {
    spectator: {
      type: Object as () => SpectatorModel,
    },
    settings: {
      type: Object as () => typeof raw_settings,
    },
  },
  computed: {
    game(): GameModel {
      return this.spectator.game;
    },
  },
  components: {
    Awards,
    Board,
    Colony,
    DynamicTitle,
    LogPanel,
    Milestone,
    MoonBoard,
    PlanetaryTracks,
    PlayersOverview,
    Sidebar,
    Turmoil,
    WaitingFor,
  },
  methods: {
    forceRerender() {
      // TODO(kberg): this is very inefficient. It pulls down the entire state, ignoring the value of 'waitingFor' which only fetches a short state.
      vueRoot(this).updateSpectator();
    },
    range(n: number): Array<number> {
      return range(n);
    },
    cycleTileView(): void {
      this.tileView = nextTileView(this.tileView);
    },
  },
});
</script>
