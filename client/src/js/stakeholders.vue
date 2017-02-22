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
      },
      removeStakeholder(stakeholder) {
        store.commit('removeStakeholder', stakeholder);
      }
    }
  }
</script>

<template>
  <ul>
    <div v-for="stakeholder in stakeholders">
      <button @click="removeStakeholder">Remove</button>
      <stakeholder :stakeholder="stakeholder"></stakeholder>
    </div>
    <button @click="addStakeholder">Add Stakeholder</button>
  </ul>
</template>
