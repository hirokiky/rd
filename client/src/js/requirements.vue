<script>
  const Vue = require('vue');

  const store = require('./store');

  Vue.component('requirement', require('./requirement.vue'));

  module.exports = {
    computed: {
      requirements() {
        return store.state.requirements
      }
    }
  }
</script>

<template>
  <div>
    <ul>
      <requirement v-for="req in requirements"
                   :requirement="req"></requirement>
    </ul>
  </div>
</template>
