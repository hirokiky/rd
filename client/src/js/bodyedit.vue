<script>
  const Vue = require('vue');

  const store = require('./store');

  module.exports = {
    props: {
      obj: Object,
      bodyAttr: String,
      widget: String  // 'input' or 'textarea'
    },
    methods: {
      edit() {
        store.commit('editOnModal', this.obj);
      }
    }
  }
</script>

<template>
  <span class="body-text"
        v-text="obj[bodyAttr]"
        @click="edit"></span>
</template>

<style scoped>
  span.body-text {
      white-space: pre-line;
  }

  span.body-text:hover {
    cursor: pointer;
  }
</style>
