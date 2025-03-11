<template>
<div class="reward">
  <div :class="outerClass">
    <div :class="getClass" />
  </div>
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import {GameOptionsModel} from '@/common/models/GameOptionsModel';
import {Reward} from '@/common/pathfinders/Reward';

export default Vue.extend({
  name: 'PlanetaryTrackReward',
  props: {
    reward: {
      type: String as () => Reward,
    },
    gameOptions: {
      type: Object as () => GameOptionsModel,
    },
  },
  computed: {
    getClass(): string {
      switch (this.reward) {
      case '3mc':
        return 'reward-3mc';
      case '6mc':
        return 'reward-6mc';
      case 'any_resource':
        return 'std-wild-resource';
      case 'card':
        return 'card';
      case 'city':
        return 'tag-city-count tag-size-big';
      case 'delegate':
        return this.gameOptions.expansions.turmoil ? 'delegate' : 'reward-3mc';
      case 'discipleship':
      case 'discipleship_production':
        return 'resource_icon resource_icon--discipleship';
      case 'floater':
        return 'floater';
      case 'greenery':
        return 'greenery';
      case 'missions':
      case 'missions_production':
        return 'resource_icon resource_icon--missions';
      case 'moon_mine':
        return 'card-play-moon-mine--S';
      case 'moon_road':
        return 'card-play-moon-road--S';
      case 'Unreached':
        return 'Unreached';
      case 'outreach':
      case 'outreach_production':
        return 'resource_icon resource_icon--outreach';
      case 'resource':
        return 'std-wild-resource';
      case 'theology':
      case 'theology_production':
        return 'resource_icon resource_icon--theology';
      case 'prayer':
      case 'prayer_production':
        return 'resource_icon resource_icon--prayer';
      case 'tr':
        return 'tag-tr tag-size-big tag-type-main';
      case 'venus_scale':
        return 'venus-scale';
      }
      return '';
    },
    outerClass(): string {
      switch (this.reward) {
      case '1vp':
        return 'card-points vp1';
      case '2vp':
        return 'card-points vp2';
      case '3mc':
        return 'reward-3mc';
      case '6mc':
        return 'reward-6mc';
      case 'delegate':
        return this.gameOptions.expansions.turmoil ? '' : 'reward-3mc';
      case 'discipleship_production':
      case 'missions_production':
      case 'outreach_production':
      case 'theology_production':
      case 'prayer_production':
        return 'card-production-box';
      default:
        return '';
      }
    },
  },
  components: {
  },
  data() {
    return {
    };
  },
});

</script>

