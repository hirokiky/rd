<script>
  const models = require('./models');

  module.exports = {
    props: {
      node: models.BaseRequirementModel
    },
    methods: {
      addChild(node) {
        let child = new models.Requirement(node.layer, node.priority, '');
        child.editing = true;
        node.addChild(child);
      }
    }
  }
</script>

<template>
  <ul class="node">
    <li class="node-body" :style="{'border-color': node.colorCode}">
      <div v-if="!node.editing" v-text="node.body"
           @click="addChild(node)"></div>
      <textarea v-if="node.editing"
                v-model="node.body"
                @blur="node.editing=false"></textarea>
    </li>
    <li class="node-children" v-if="node.hasChild()">
      <node v-for="child in node.children" :node="child"></node>
    </li>
  </ul>
</template>

<style>
  ul.node {
    margin-left: 30px;
  }

  ul.node > li {
    list-style: none;
  }

  ul.node > li.node-body {
    border: solid 2px #888;
    border-radius: 4px;
    margin: 10px;
    padding: 10px;

    width: 200px;
    min-height: 40px;
  }
</style>
