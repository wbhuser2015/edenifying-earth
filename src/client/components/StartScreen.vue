<template>
<div class="start-screen">
  <div v-i18n class="start-screen-links">
    <div class="start-screen-header start-screen-link--title">
      <div class="start-screen-title-top">Eden-ifying</div>
      <div class="start-screen-title-bottom">Earth</div>
    </div>
    <a class="start-screen-link start-screen-link--new-game" href="new-game" v-i18n>New game</a>
    <a class="start-screen-link start-screen-link--rules" href="https://docs.google.com/document/d/1RsPZkko9qVzEgsraHGs-LImGaq1Wyvor9kcFlqe9iQ4/edit?usp=sharing" v-i18n>Rules and Intro</a>
    <a class="start-screen-link start-screen-link--cards-list" href="cards" target="_blank" v-i18n>Cards list</a>
    
    </div>
  </div>
  <div class="free-floating-preferences-icon">
    <preferences-icon></preferences-icon>
  </div>
</div>
</template>

<script lang="ts">

import Vue from 'vue';
import LanguageSwitcher from '@/client/components/LanguageSwitcher.vue';
import PreferencesIcon from '@/client/components/PreferencesIcon.vue';

import * as raw_settings from '@/genfiles/settings.json';
import * as constants from '@/common/constants';

export default Vue.extend({
  name: 'start-screen',
  components: {
    LanguageSwitcher,
    PreferencesIcon,
  },
  computed: {
    raw_settings(): typeof raw_settings {
      return raw_settings;
    },
    DISCORD_INVITE(): string {
      return constants.DISCORD_INVITE;
    },
  },
});

</script>
