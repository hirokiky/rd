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
        store.commit('editOnModal', s);
      },
      addDemand() {
        let d = new models.Demand('');
        this.stakeholder.addDemand(d);
        store.commit('editOnModal', d);
      }
    }
  }
</script>

<template>
  <li>
    <div class="stakeholder inline">
      <i class="material-icons">person</i>
      <bodyedit :obj="stakeholder"
                bodyAttr="name"
                widget="input"></bodyedit>
      <div class="action-buttons">
        <button class="btn" @click="addChild">
          <i class="material-icons">add</i>
          <i class="material-icons">person</i>
        </button>
        <!-- Root stakeholder should not be deleted -->
        <template v-if="stakeholder.hasParent()">
          <button class="btn" @click="addDemand">
            <i class="material-icons">add</i>
            要望・痛み
          </button>
          <modal-button :model="stakeholder"></modal-button>
          <button class="btn" @click="stakeholder.removeFromParent()">
            <i class="material-icons">delete</i>
          </button>
        </template>
      </div>
    </div>

    <ul class="tree">
      <li v-for="demand in stakeholder.demands">
        <div class="inline">
          <div class="box"
               :class="{'positive': demand.isPositive,
                      'negative': demand.isNegative}">
            <bodyedit :obj="demand"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
          </div>
          <div class="action-buttons">
            <modal-button :model="demand"></modal-button>
            <button class="btn" @click="stakeholder.removeDemand(demand)">
              <i class="material-icons">delete</i>
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul class="tree">
      <stakeholder v-for="child in stakeholder.children"
                   :stakeholder="child"></stakeholder>
    </ul>
  </li>
</template>
