<script>
  const Vue = require('vue');

  const models = require('./models');
  const store = require('./store');

  Vue.component('stakeholder', require('./stakeholder.vue'));

  module.exports = {
    computed: {
      stakeholders() {return store.state.stakeholders}
    }
  }
</script>

<template>
  <ul>
    <stakeholder v-for="stakeholder in stakeholders" :stakeholder="stakeholder"></stakeholder>
  </ul>
</template>
