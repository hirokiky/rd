<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    props: {
      stakeholder: models.Stakeholder
    },

    methods: {
      addChild() {
        let s = new models.Stakeholder('');
        this.stakeholder.addChild(s);
        store.commit('editBody', s);
      },
      addDemand() {
        let d = new models.Demand('');
        this.stakeholder.addDemand(d);
        store.commit('editBody', d);
      }
    }
  }
</script>

<template>
  <li>
    <div>
      <i class="material-icons">person</i>
      <bodyedit :obj="stakeholder"
                bodyAttr="name"
                widget="input"></bodyedit>
    </div>

    <button @click="addChild">Add Child</button>
    <button @click="addDemand">Add Demand</button>
    <modal-button :model="stakeholder"></modal-button>

    <ul>
      <li v-for="demand in stakeholder.demands">
        <bodyedit :obj="demand"
                  bodyAttr="body"
                  widget="textarea"></bodyedit>
        <modal-button :model="demand"></modal-button>
      </li>
    </ul>
    <ul>
      <stakeholder v-for="child in stakeholder.children"
                   :stakeholder="child"></stakeholder>
    </ul>
  </li>
</template>
