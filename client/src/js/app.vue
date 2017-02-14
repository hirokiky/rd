<script>
  const Vue = require('vue');
  const VueRouter = require('vue-router');

  const models = require('./models');


  Vue.use(VueRouter);
  Vue.component('modal', require('./modal.vue'));
  Vue.component('bodyedit', require('./bodyedit.vue'));


  const router = new VueRouter({
    routes: [
      {path: '/stakeholders', component: require('./stakeholders.vue')},
      {path: '/valueanalyse', component: require('./valueanalyse.vue')},
      {path: '/valuedesign', component: require('./valuedesign.vue')},
      {path: '/requirements', component: require('./requirements.vue')},
    ]
  });

  module.exports = {router};
</script>

<template>
  <div>
    <router-link to="/stakeholders">Stakeholders</router-link>
    <router-link to="/valueanalyse">ValueAnalyse</router-link>
    <router-link to="/valuedesign">ValueDesign</router-link>
    <router-link to="/requirements">Requirements</router-link>
    <router-view></router-view>

    <modal></modal>
  </div>
</template>
