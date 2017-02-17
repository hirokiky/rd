<script>
  // Requires vue-form-generator loaded
  const store = require('./store');

  module.exports = {
    computed: {
      modalEditing() {return store.state.modalEditing}
    },
    methods: {
      close() {
        store.commit('editOnModal', null);
      }
    }
  }
</script>

<template>
  <div v-if="modalEditing">
    <button @click="close">close</button>
    <vue-form-generator :schema="modalEditing.schema"
                        :model="modalEditing">
  </div>
</template>
