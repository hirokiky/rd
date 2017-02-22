<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    computed: {
      purposes() {return store.state.purposes},
      stakeholders() {
        let ret = [];
        store.state.stakeholders.forEach((s) => {
          ret = ret.concat(s.flatten());
        });
        return ret
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
    <ul>
      <li v-for="purpose in purposes">
        <bodyedit :obj="purpose"
                  bodyAttr="body"
                  widget="textarea"></bodyedit>
        <modal-button :model="purpose"></modal-button>
        <button @click="removePurpose(purpose)">Remove</button>
      </li>
      <li><button @click="addPurpose">Add Purpose</button></li>
    </ul>
    <ul>
      <li v-for="stakeholder in stakeholders">
        <div>
          <i class="material-icons">person</i><span v-text="stakeholder.name"></span>
          <modal-button :model="stakeholder"></modal-button>
        </div>
        <ul>
          <li v-for="value in stakeholder.values">
            <bodyedit :obj="value"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="value"></modal-button>
            <button @click="stakeholder.removeValue(value)">Remove</button>
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
          <li><button @click="addValue(stakeholder)">Add Value</button></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
