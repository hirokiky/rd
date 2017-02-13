<script>
  const Vue = require('vue');

  const models = require('./models');
  const store = require('./store');

  Vue.component('stakeholder', require('./stakeholder.vue'));

  module.exports = {
    computed: {
      stakeholders() {return store.state.stakeholders}
    },
    methods: {
      addStakeholder() {
        let s = new models.Stakeholder('');
        store.commit('addStakeholder', s);
      }
    }
  }
</script>

<template>
  <ul>
    <stakeholder v-for="stakeholder in stakeholders"
                 :stakeholder="stakeholder"></stakeholder>
    <button @click="addStakeholder">Add Stakeholder</button>
  </ul>
</template>
