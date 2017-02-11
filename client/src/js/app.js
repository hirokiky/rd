const Vue = require('vue');

Vue.component('node', require('./node.vue'));

require('./store');  // Just Initializing


new Vue(require('./app.vue')).$mount('#app');
