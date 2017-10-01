<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    computed: {
      purposes() {return store.state.purposes},
      stakeholders() {
        return store.state.rootStakeholder.flatten({ignoreMe: true});
      }
    },
    methods: {
      addPurpose() {
        let purpose = new models.Purpose();
        store.commit('addPurpose', purpose);
      },
      addValue(stakeholder) {
        let value = new models.Value();
        stakeholder.addValue(value);
        store.commit('editOnModal', value);
      },
      removePurpose(purpose) {
        store.commit('removePurpose', purpose)
      }
    }
  }
</script>

<template>
  <div class="container">
    <ul class="tree root">
      <li v-for="purpose in purposes">
        <div class="inline">
          <div class="box" :style="{'border-color': purpose.color,
                                    'background-color': purpose.colorLighter}">
            <bodyedit :obj="purpose"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
          </div>
          <div class="action-buttons">
            <modal-button :model="purpose"></modal-button>
            <button class="btn" @click="removePurpose(purpose)">
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </li>
      <li><button class="btn" @click="addPurpose">
        <i class="material-icons">add</i>目的
      </button></li>
    </ul>
    <ul class="tree root">
      <li v-for="stakeholder in stakeholders">
        <div class="stakeholder inline">
          <i class="material-icons">person</i>
          <div class="action-buttons">
            <bodyedit :obj="stakeholder"
                      bodyAttr="name"
                      widget="input"></bodyedit>
            <modal-button :model="stakeholder"></modal-button>
            <button class="btn" @click="addValue(stakeholder)">
              <i class="material-icons">add</i>価値
            </button>
          </div>
        </div>
        <ul class="tree">
          <li v-for="value in stakeholder.values">
            <div class="inline">
              <div class="box"
                   :style="{'border-color': value.color,
                            'background-color': value.colorLighter}">
                <bodyedit :obj="value"
                          bodyAttr="body"
                          widget="textarea"></bodyedit>
              </div>
              <div class="action-buttons">
                <modal-button :model="value"></modal-button>
                <button class="btn" @click="stakeholder.removeValue(value)">
                  <i class="material-icons">delete</i>
                </button>
              </div>
              <!-- If use v-model it will run JSON.stringify  -->
              <select v-model="value.purpose">
                <option :value="null">&lt;目的を選択&gt;</option>
                <option v-for="purpose in purposes"
                        :value="purpose"
                        :selected="value.purpose == purpose"
                        v-text="purpose.body" />
              </select>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
