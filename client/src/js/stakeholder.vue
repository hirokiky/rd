<script>
  const models = require('./models');

  module.exports = {
    props: {
      stakeholder: models.Stakeholder
    }
  }
</script>

<template>
  <li>
    <div><i class="material-icons">person</i><span v-text="stakeholder.name"></span></div>
    <ul>
      <li v-for="demand in stakeholder.demands"
          v-text="demand.body"></li>
    </ul>
    <ul>
      <stakeholder v-for="child in stakeholder.children"
                   :stakeholder="child"></stakeholder>
    </ul>
  </li>
</template>
