<script>
  const store = require('./store');

  module.exports = {
    computed: {
      showModal() {return store.state.showModal},
      modalEditing() {return store.state.modalEditing},
    }
  }
</script>

<template>
  <div v-show="showModal"></div>
</template>
