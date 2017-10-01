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
  <div class="container">
    <ul class="tree root">
      <stakeholder :stakeholder="stakeholder"></stakeholder>
    </ul>
  </div>
</template>
