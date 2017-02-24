<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    props: {
      requirement: models.BaseRequirementModel
    },
    methods: {
      addChildRequirement(requirement) {
        let req = new models.Requirement();
        requirement.addChild(req);
        store.commit('editBody', req);
      }
    },
    computed: {
      noParents() {
        return store.getters.noParents;
      }
    }
  }
</script>

<template>
  <li v-if="requirement.hasParent()">
    <div class="inline">
      <!-- Not to show editing forms for root requirement -->
      <bodyedit :obj="requirement"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <div class="action-buttons">
        <modal-button :model="requirement"></modal-button>
        <button class="btn" @click="requirement.purgeAllDescendants()">
          <i class="material-icons">delete</i>
        </button>
        <button class="btn" @click="addChildRequirement(requirement)">New Child</button>
        <select>
          <option>Add Non Parent Node</option>
          <option v-for="req in noParents"
                  v-text="req.body"
                  @click="requirement.addChild(req)"></option>
        </select>
      </div>
    </div>
    <ul class="tree">
      <requirement v-for="child in requirement.children"
                   :requirement="child"></requirement>
    </ul>
  </li>
  <ul v-else class="tree root">
    <requirement v-for="child in requirement.children"
                 :requirement="child"></requirement>
  </ul>
</template>
