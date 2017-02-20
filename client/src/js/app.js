const Vue = require('vue');

require('./store');  // Just Initializing


new Vue(require('./app.vue')).$mount('#app');
