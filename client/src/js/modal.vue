<script>
  // Requires vue-form-generator loaded
  const store = require('./store');

  module.exports = {
    computed: {
      modalEditing() {return store.state.modalEditing}
    }
  }
</script>

<template>
  <div v-if="modalEditing">
    <vue-form-generator :schema="modalEditing.schema"
                        :model="modalEditing">
  </div>
</template>
