const Vue = require('vue');
const Vuex = require('vuex');

const models = require('./models');
const utils = require('./utils');

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    rootStakeholder: new models.Stakeholder('要求開発Web')
      .addChild(
        new models.Stakeholder("BeProud")
          .addChild(
            new models.Stakeholder("BPメンバー")
              .addDemand(new models.Demand('プロジェクト内での合意をスムーズにしたい'))
              .addDemand(new models.Demand('価値のある仕事をしたい'))
              .addDemand(new models.Demand('Astaを使いたくない'))
              .addDemand(new models.Demand('誰か1人でなく皆で要求開発を編集したい'))
              .addValue(new models.Value(null, null, '自動で同期されるので、チームメンバー全員で編集できて嬉しい'))
              .addValue(new models.Value(null, null, '自動で表示が整形されるので、Astaを調整する手間がなくて嬉しい'))
          )
          .addChild(
            new models.Stakeholder("BP経営者")
              .addDemand(new models.Demand('要求開発を社内で広めたい'))
              .addValue(new models.Value(null, null, 'プロジェクトごとに気軽に導入できるので、気軽に社内で使いはじめれて嬉しい'))
          )
      )
      .addChild(
        new models.Stakeholder("お客さん")
          .addDemand(new models.Demand('要望や仕様がまとまらない'))
          .addValue(new models.Value(null, null, "単なる開発の依頼でなく、全員が参加して納得する製品ができて嬉しい"))
          .addValue(new models.Value(null, null, "自分たちも編集したりコメントしたりできるので、一体感を感じれて嬉しい"))
      )
      .addChild(
        new models.Stakeholder("匠Lab")
          .addDemand(new models.Demand('要求開発が広がってほしい'))
          .addValue(new models.Value(null, null, 'Astaに慣れてない人も使えるので、幅広い世代や人々に受け入れられて嬉しい'))
      ),
    bodyEditing: null,

    purposes: [
      new models.Purpose('要求開発を広める', '#ff7f7f'),
      new models.Purpose('誰でも編集、参加できる、属人化しない。', '#76fca8'),
      new models.Purpose('作図やモデリングに手間をかけない', '#fff77f')
    ],

    vision: new models.Vision("老練とモダンの融合"),
    concept1: new models.Concept("誰もが要求開発に参加できる"),
    concept2: new models.Concept("すぐに修正でき、ずっと使われ続ける要求開発"),
    concept3: new models.Concept("モダン・要求開発"),
    catchcopy: new models.CatchCopy("価値創造を、日常に"),
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
      return l;
    }
  },
  mutations: {
    addPurpose(state, purpose) {
      state.purposes.push(purpose);
      store.commit("editOnModal", purpose);
    },
    removePurpose(state, purpose) {
      utils.remove(state.purposes, purpose);
      // Removing from requirement tree;
      state.rootRequirement.searchAndPurge(purpose);
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
        // .addChild(new models.Requirement('オンラインで使える'))
        // .addChild(new models.Requirement('ユーザー管理'))
        // .addChild(new models.Requirement('直感的なUI'))
    )
    .addChild(store.state.concept2)
    .addChild(store.state.concept3)
);

module.exports = store;
