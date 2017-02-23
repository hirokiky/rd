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
    <div class="stakeholder">
      <i class="material-icons">person</i>
      <bodyedit :obj="stakeholder"
                bodyAttr="name"
                widget="input"></bodyedit>
      <button class="btn" @click="addChild">
        <i class="material-icons">add</i>
        <i class="material-icons">person</i>
      </button>
      <!-- Root stakeholder should not be deleted -->
      <span v-if="stakeholder.hasParent()">
        <button class="btn" @click="addDemand">
          <i class="material-icons">add</i>
          要望
        </button>
        <modal-button :model="stakeholder"></modal-button>
        <button class="btn" @click="stakeholder.removeFromParent()">
          <i class="material-icons">delete</i>
        </button>
      </span>
    </div>

    <ul class="tree">
      <li v-for="demand in stakeholder.demands">
        <div class="box"
             :class="{'positive': demand.isPositive,
                      'negative': demand.isNegative}">
          <bodyedit :obj="demand"
                    bodyAttr="body"
                    widget="textarea"></bodyedit>
          <modal-button :model="demand"></modal-button>
          <button class="btn" @click="stakeholder.removeDemand(demand)">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </li>
    </ul>
    <ul class="tree">
      <stakeholder v-for="child in stakeholder.children"
                   :stakeholder="child"></stakeholder>
    </ul>
  </li>
</template>
