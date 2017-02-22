<script>
  const Vue = require('vue');

  const store = require('./store');

  Vue.component('requirement', require('./requirement.vue'));

  module.exports = {
    computed: {
      requirement() {
        return store.state.rootRequirement
      }
    }
  }
</script>

<template>
  <div>
    <ul>
      <requirement :requirement="requirement"></requirement>
    </ul>
  </div>
</template>
