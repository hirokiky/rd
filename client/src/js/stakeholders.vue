<script>
  const Vue = require('vue');

  const models = require('./models');
  const store = require('./store');

  Vue.component('stakeholder', require('./stakeholder.vue'));

  module.exports = {
    computed: {
      stakeholder() {return store.state.rootStakeholder}
    }
  }
</script>

<template>
  <ul>
    <stakeholder :stakeholder="stakeholder"></stakeholder>
  </ul>
</template>
