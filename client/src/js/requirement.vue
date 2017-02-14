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
  <li>
    <bodyedit :obj="requirement"
              bodyAttr="body"
              widget="textarea"></bodyedit>
    <ul>
      <requirement v-for="child in requirement.children"
                   :requirement="child"></requirement>
      <li>
        <button @click="addChildRequirement(requirement)">New Child</button>
        <select>
          <option v-for="req in noParents"
                  v-text="req.body"
                  @click="requirement.addChild(req)"></option>
        </select>
      </li>
    </ul>
  </li>
</template>
