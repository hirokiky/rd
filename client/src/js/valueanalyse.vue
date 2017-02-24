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
        store.commit('editBody', value);
      },
      removePurpose(purpose) {
        store.commit('removePurpose', purpose)
      }
    }
  }
</script>

<template>
  <div>
    <ul class="tree root">
      <li v-for="purpose in purposes">
        <bodyedit :obj="purpose"
                  bodyAttr="body"
                  widget="textarea"></bodyedit>
        <modal-button :model="purpose"></modal-button>
        <button class="btn" @click="removePurpose(purpose)">
          <i class="material-icons">delete</i>
        </button>
      </li>
      <li><button class="btn" @click="addPurpose">
        <i class="material-icons">add</i>目的
      </button></li>
    </ul>
    <ul class="tree root">
      <li v-for="stakeholder in stakeholders">
        <div class="stakeholder">
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
            <bodyedit :obj="value"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="value"></modal-button>
            <button class="btn" @click="stakeholder.removeValue(value)">
              <i class="material-icons">delete</i>
            </button>
            <!-- If use v-model it will run JSON.stringify  -->
            <select>
              <option :value="null">unselected</option>
              <option v-for="purpose in purposes"
                      :value="purpose"
                      :selected="value.purpose == purpose"
                      @click="value.purpose = purpose"
                      v-text="purpose.body" />
            </select>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
