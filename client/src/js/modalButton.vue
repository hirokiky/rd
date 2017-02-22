<script>
  const store = require('./store');

  module.exports = {
    props: ["model"],
    methods: {
      open() {
        store.commit('editOnModal', this.model);
      }
    }
  }
</script>

<template>
  <button @click="open"><i class="material-icons">edit</i></button>
</template>
