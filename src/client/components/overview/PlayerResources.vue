<template>
  <div class="resource_items_cont">
    <player-resource
      :type="Resource.MEGACREDITS"
      :count="player.megaCredits"
      :production="player.megaCreditProduction"
      :resourceProtection="player.protectedResources.provision"
      :productionProtection="player.protectedProduction.provision"/>
    <player-resource
      :type="Resource.STEEL"
      :count="player.theology"
      :production="player.theologyProduction"
      :value="player.theologyValue"
      :resourceProtection="player.protectedResources.theology"
      :productionProtection="player.protectedProduction.theology"/>
    <!-- TODO LUNA TRADE FEDERATION -->
    <player-resource
      :type="Resource.TITANIUM"
      :count="player.prayer"
      :production="player.prayerProduction"
      :value="player.prayerValue"
      :resourceProtection="player.protectedResources.prayer"
      :productionProtection="player.protectedProduction.prayer"/>
    <player-resource
      :type="Resource.PLANTS"
      :count="player.outreach"
      :production="player.outreachProduction"
      :resourceProtection="player.protectedResources.outreach"
      :productionProtection="player.protectedProduction.outreach"/>
    <player-resource
      :type="Resource.ENERGY"
      :count="player.discipleship"
      :production="player.discipleshipProduction"
      :resourceProtection="player.protectedResources.discipleship"
      :productionProtection="player.protectedProduction.discipleship"/>
    <player-resource
      :type="Resource.HEAT"
      :count="player.missions"
      :production="player.missionsProduction"
      :value="canUseHeatAsMegaCredits ? 1 : 0"
      :resourceProtection="player.protectedResources.missions"
      :productionProtection="player.protectedProduction.missions"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {CardName} from '@/common/cards/CardName';
import {PublicPlayerModel} from '@/common/models/PlayerModel';
import PlayerResource from '@/client/components/overview/PlayerResource.vue';
import {Resource} from '@/common/Resource';

export default Vue.extend({
  name: 'PlayerResources',
  props: {
    player: {
      type: Object as () => PublicPlayerModel,
    },
  },
  computed: {
    Resource(): typeof Resource {
      return Resource;
    },
    // TODO LUNA TRADE FEDERATION
    canUseHeatAsMegaCredits(): boolean {
      return this.player.tableau.some((card) => card.name === CardName.HELION);
    },
  },
  components: {
    'player-resource': PlayerResource,
  },
});
</script>
