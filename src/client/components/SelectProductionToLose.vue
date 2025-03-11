<template>
  <!-- TODO(chosta): consolidate repetition into a reusable component. -->
  <div class="wf-component wf-component--select-production-to-lose">
    <div v-if="showtitle === true" class="nofloat wf-component-title">{{ $t(playerinput.title) }}</div>

    <h3 class="payments_title" v-i18n>Which resource production would you prefer to decrease?</h3>

    <div class="payments_type input-group" v-if="canDeductMegaCredits()">
      <div class="production-box"><div class="production resource_icon--provision" style="background-size:contain;"></div></div>
      <button class="btn btn-primary" v-on:click="delta('provision', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.provision" />
      <button class="btn btn-primary" v-on:click="delta('provision', 1)"><i class="icon icon-plus" /></button>
    </div>
    <div class="payments_type input-group" v-if="canDeductSteel()">
      <div class="production-box"><div class="production theology"></div></div>
      <button class="btn btn-primary" v-on:click="delta('theology', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.theology" />
      <button class="btn btn-primary" v-on:click="delta('theology', 1)"><i class="icon icon-plus" /></button>
    </div >
    <div class="payments_type input-group" v-if="canDeductTitanium()" >
      <div class="production-box"><div class="production prayer"></div></div>
      <button class="btn btn-primary" v-on:click="delta('prayer', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.prayer" />
      <button class="btn btn-primary" v-on:click="delta('prayer', 1)"><i class="icon icon-plus" /></button>
    </div >
    <div class="payments_type input-group" v-if="canDeductPlants()" >
      <div class="production-box"><div class="production outreach"></div></div>
      <button class="btn btn-primary" v-on:click="delta('outreach', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.outreach" />
      <button class="btn btn-primary" v-on:click="delta('outreach', 1)"><i class="icon icon-plus" /></button>
    </div >
    <div class="payments_type input-group" v-if="canDeductEnergy()" >
      <div class="production-box"><div class="production discipleship"></div></div>
      <button class="btn btn-primary" v-on:click="delta('discipleship', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.discipleship" />
      <button class="btn btn-primary" v-on:click="delta('discipleship', 1)"><i class="icon icon-plus" /></button>
    </div >
    <div class="payments_type input-group" v-if="canDeductHeat()" >
      <div class="production-box"><div class="production missions"></div></div>
      <button class="btn btn-primary" v-on:click="delta('missions', -1)"><i class="icon icon-minus" /></button>
      <input class="form-input form-inline payments_input" v-model.number="units.missions" />
      <button class="btn btn-primary" v-on:click="delta('missions', 1)"><i class="icon icon-plus" /></button>
    </div >

    <div v-if="hasWarning()" class="tm-warning">
      <label class="label label-error">{{ $t(warning) }}</label>
    </div>

    <div v-if="showsave === true" class="nofloat">
        <button class="btn btn-primary btn-submit" v-on:click="saveData">{{ $t(playerinput.buttonLabel) }}</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import {SelectProductionToLoseModel} from '@/common/models/PlayerInputModel';
import {PayProductionModel} from '@/common/models/PayProductionUnitsModel';
import {Units} from '@/common/Units';
import {SelectProductionToLoseResponse} from '@/common/inputs/InputResponse';
import {sum} from '@/common/utils/utils';

type DataModel = {
  units: Units,
  warning: string | undefined;
}

export default Vue.extend({
  name: 'SelectProductionToLose',
  props: {
    playerinput: {
      type: Object as () => SelectProductionToLoseModel,
    },
    onsave: {
      type: Function as unknown as () => (out: SelectProductionToLoseResponse) => void,
    },
    showsave: {
      type: Boolean,
    },
    showtitle: {
      type: Boolean,
    },
  },
  data(): DataModel {
    return {
      units: {...Units.EMPTY},
      warning: undefined,
    };
  },
  methods: {
    canDeductMegaCredits() {
      return this.playerinput.payProduction.units.provision > -5;
    },
    canDeductSteel() {
      return this.playerinput.payProduction.units.theology > 0;
    },
    canDeductTitanium() {
      return this.playerinput.payProduction.units.prayer > 0;
    },
    canDeductPlants() {
      return this.playerinput.payProduction.units.outreach > 0;
    },
    canDeductEnergy() {
      return this.playerinput.payProduction.units.discipleship > 0;
    },
    canDeductHeat() {
      return this.playerinput.payProduction.units.missions > 0;
    },
    hasWarning() {
      return this.warning !== undefined;
    },
    delta(type: keyof Units, direction: number) {
      const expendableProductionQuantity = function(type: keyof Units, model: PayProductionModel): number {
        switch (type) {
        case 'provision':
          return model.units.provision + 5;
        case 'theology':
          return model.units.theology;
        case 'prayer':
          return model.units.prayer;
        case 'outreach':
          return model.units.outreach;
        case 'discipleship':
          return model.units.discipleship;
        case 'missions':
          return model.units.missions;
        default:
          return -1;
        }
      };
      const current = this.units[type];
      let newValue = current + direction;
      const expendableQuantity = expendableProductionQuantity(type, this.playerinput.payProduction);
      newValue = Math.min(Math.max(newValue, 0), expendableQuantity);
      this.units[type] = newValue;
    },
    saveData() {
      const total = sum(Units.values(this.units));

      if (total !== this.playerinput.payProduction.cost) {
        this.warning = `Pay a total of ${this.playerinput.payProduction.cost} production units`;
        return;
      }

      this.onsave({type: 'productionToLose', units: this.units});
    },
  },
});
</script>
