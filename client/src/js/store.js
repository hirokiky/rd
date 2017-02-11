const Vue = require('vue');
const Vuex = require('vuex');

const models = require('./models');


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    stakeholders: [
      new models.Stakeholder("BeProud")
        .addChild(new models.Stakeholder("BPメンバー")
		    .addDemand('オフィスに活気が溢れてほしい', models.DEMAND_TYPE.positive))
        .addChild(new models.Stakeholder("経営者")),
      new models.Stakeholder("お客さん")
        .addValue("楽しいので嬉しい")
    ],
      
    purposes: [
      new models.Purpose('地域の活性化'),
      new models.Purpose('個人学習の促進')
    ],

    vision: new models.Vision("ビジョン"),
    concept1: new models.Concept("コンセプト1"),
    concept2: new models.Concept("コンセプト2"),
    concept3: new models.Concept("コンセプト3"),

    requirements: []
  },
  mutations: {}
});

store.state.requirements.push(
  store.state.vision
    .addChild(
      store.state.concept1
        .addChild(store.state.purposes[0])
        .addChild(store.state.purposes[1])
    )
    .addChild(store.state.concept2)
    .addChild(store.state.concept3)
);

module.exports = store;
