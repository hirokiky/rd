<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    props: {
      stakeholder: models.Stakeholder
    },

    methods: {
      isEditing(obj) {
        return obj == store.state.bodyEditing;
      },
      addChild() {
        let s = new models.Stakeholder('');
        this.stakeholder.addChild(s);
        store.commit('editBody', s);
      },
      addDemand() {
        let d = new models.Demand('');
        this.stakeholder.addDemand(d);
        store.commit('editBody', d);
      },
      edit(obj) {
        store.commit('editBody', obj);
      },
      end() {
        store.commit('endBodyEditing');
      }
    }
  }
</script>

<template>
  <li>
    <div>
      <i class="material-icons">person</i>
      <input v-if="isEditing(stakeholder)"
             v-model="stakeholder.name"
             v-focus="isEditing(stakeholder)"
             @blur="end"
             @keydown.ctrl.enter="end"/>
      <span v-else
            v-text="stakeholder.name"
            @dblclick.stop="edit(stakeholder)"></span>
    </div>

    <button @click="addChild">Add Child</button>
    <button @click="addDemand">Add Demand</button>

    <ul>
      <li v-for="demand in stakeholder.demands">
        <textarea v-if="isEditing(demand)"
                  v-model="demand.body"
                  v-focus="isEditing(demand)"
                  @blur="end"
                  @keydown.ctrl.enter="end"></textarea>
        <div v-else
             v-text="demand.body"
             @dblclick.stop="edit(demand)"></div>
      </li>
    </ul>
    <ul>
      <stakeholder v-for="child in stakeholder.children"
                   :stakeholder="child"></stakeholder>
    </ul>
  </li>
</template>
