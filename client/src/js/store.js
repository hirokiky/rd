const Vue = require('vue');
const Vuex = require('vuex');

const models = require('./models');


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    stakeholders: [
      new models.Stakeholder("BeProud")
        .addDemand('売上が立たない', models.DEMAND_TYPE.negative)
        .addChild(new models.Stakeholder("BPメンバー"))
        .addChild(new models.Stakeholder("経営者")),
      new models.Stakeholder("お客さん")
    ]
  },
  mutations: {}
});

module.exports = store;
