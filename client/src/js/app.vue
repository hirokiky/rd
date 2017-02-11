<script>
  const Vue = require('vue');
  const VueRouter = require('vue-router');

  const models = require('./models');


  Vue.use(VueRouter);

  const router = new VueRouter({
    routes: [
      {path: '/stakeholders', component: require('./stakeholders.vue')}
    ]
  });

  module.exports = {router};
</script>

<template>
  <div>
    <router-link to="/stakeholders">Stakeholders</router-link>
    <router-view></router-view>
  </div>
</template>
