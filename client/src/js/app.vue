<script>
  const Vue = require('vue');
  const models = require('./models');

  Vue.component('stakeholders', require('./stakeholders.vue'));

  module.exports = {
    el: 'body',
    data: {}
  }
</script>

<template>
  <stakeholders></stakeholders>
</template>
