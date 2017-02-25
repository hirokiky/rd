<script>
  const models = require('./models');
  const store = require('./store');

  module.exports = {
    props: {
      requirement: models.BaseRequirementModel
    },
    data() {
      return {
        selectedChild: null
      }
    },
    methods: {
      addChildRequirement(requirement) {
        if (this.selectedChild === null) {
          let req = new models.Requirement();
          requirement.addChild(req);
          store.commit('editBody', req);
        } else {
          requirement.addChild(this.selectedChild);
          this.selectedChild = null;
        }
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
  <li v-if="requirement.hasParent()"
      :style="{'border-color': requirement.layerColor}">
    <div class="inline">
      <!-- Not to show editing forms for root requirement -->
      <div class="box" :style="{'border-color': requirement.color,
                                'background-color': requirement.colorLighter}">
        <div class="box-stars">
          <i class="material-icons box-star"
             v-for="isFilled in requirement.priorityLevel"
             v-if="isFilled">star</i>
        </div>
        <bodyedit :obj="requirement"
                  bodyAttr="body"
                  widget="textarea"></bodyedit>
      </div>
      <div class="action-buttons">
        <modal-button :model="requirement"></modal-button>

        <select v-model="selectedChild">
          <option :value="null">新しい要求</option>
          <option v-for="req in noParents"
                  v-text="req.body"
                  :value="req"></option>
        </select>
        <button class="btn" @click="addChildRequirement(requirement)">
          追加する
        </button>

        <button class="btn" @click="requirement.purgeAllDescendants()">
          <i class="material-icons">delete</i>
        </button>
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

    <!-- Little bit copy pasted code -->
    <select v-model="selectedChild">
      <option :value="null">新しい要求</option>
      <option v-for="req in noParents"
              v-text="req.body"
              :value="req"></option>
    </select>
    <button class="btn" @click="addChildRequirement(requirement)">
      追加する
    </button>

  </ul>
</template>

<style scoped>
  li {
    border-left: solid 4px;
    border-color: transparent;
    padding-left: 12px;
  }
</style>
