<script>
  const Vue = require('vue');
  const VueFormGenerator = require('vue-form-generator');
  const VueRouter = require('vue-router');

  const models = require('./models');


  Vue.use(VueFormGenerator)
  Vue.use(VueRouter);
  Vue.component('modal', require('./modal.vue'));
  Vue.component('modal-button', require('./modalButton.vue'));
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
    <nav>
      <div class="wrapper">
        <router-link to="/stakeholders">ステークホルダー</router-link>
        <router-link to="/valueanalyse">価値分析</router-link>
        <router-link to="/valuedesign">価値デザイン</router-link>
        <router-link to="/requirements">要求分析</router-link>
      </div>
    </nav>
    <div class="wrapper">
      <router-view></router-view>
    </div>

    <modal></modal>
  </div>
</template>

<style src="../css/app.css"></stlye>
