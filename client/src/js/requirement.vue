<script>
  const models = require('./models');

  module.exports = {
    props: {
      requirement: models.BaseRequirementModel
    }
  }
</script>

<template>
  <li>
    <span v-text="requirement.body"></span>
    <ul>
      <requirement v-for="child in requirement.children"
                   :requirement="child"></requirement>
    </ul>
  </li>
</template>
