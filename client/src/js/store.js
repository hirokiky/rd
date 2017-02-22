const Vue = require('vue');
const Vuex = require('vuex');

const models = require('./models');


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    stakeholders: [
      new models.Stakeholder("BeProud")
        .addChild(
          new models.Stakeholder("BPメンバー")
            .addDemand(new models.Demand(
              'オフィスに活気が溢れてほしい'
            ))
        )
        .addChild(new models.Stakeholder("経営者")),
      new models.Stakeholder("お客さん")
        .addValue(new models.Value(null, null, "楽しいので嬉しい"))
    ],
    bodyEditing: null,

    purposes: [
      new models.Purpose('地域の活性化'),
      new models.Purpose('個人学習の促進')
    ],

    vision: new models.Vision("ビジョン"),
    concept1: new models.Concept("コンセプト1"),
    concept2: new models.Concept("コンセプト2"),
    concept3: new models.Concept("コンセプト3"),
    catchcopy: new models.CatchCopy("キャッチコピー"),
    meaning: new models.Meaning("意味"),
    story: new models.Story("ストーリー"),
    design: new models.Design(),

    // Just empty requirement to bundle top level requiremnts.
    rootRequirement: new models.Requirement(),

    showModal: false,
    modalEditing: null
  },
  getters: {
    noParents(state) {
      let l = [];
      function add(r) {
        if (!r.hasParent() && r !== state.rootRequirement) {
          l.push(r);
        }
      }
      state.purposes.forEach((p) => {
        add(p);
      });
      add(state.vision);
      add(state.concept1);
      add(state.concept2);
      add(state.concept3);

      state.rootRequirement.flatten().forEach((req) => { add(req); });
      return l
    }
  },
  mutations: {
    addStakeholder(state, stakeholder) {
      state.stakeholders.push(stakeholder);
      state.bodyEditing = stakeholder;
    },
    addPurpose(state, purpose) {
      state.purposes.push(purpose);
      state.bodyEditing = purpose;
    },
    editBody(state, obj) {
      state.bodyEditing = obj;
    },
    endBodyEditing(state) {
      state.bodyEditing = null;
    },
    editOnModal(state, obj) {
      state.modalEditing = obj;
    }
  }
});

store.state.rootRequirement.addChild(
  store.state.vision
    .addChild(
      store.state.concept1
        .addChild(store.state.purposes[0])
        .addChild(store.state.purposes[1])
    )
    // .addChild(store.state.concept2)
    // .addChild(store.state.concept3)
);

module.exports = store;
