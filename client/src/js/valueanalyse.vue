<script>
  const store = require('./store');

  module.exports = {
    computed: {
      purposes() {return store.state.purposes},
      stakeholders() {
        let ret = [];
        store.state.stakeholders.forEach((s) => {
          ret = ret.concat(s.flatten());
        });
        return ret
      },
    }
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="purpose in purposes" v-text="purpose.body"></li>
    </ul>
    <ul>
      <li v-for="stakeholder in stakeholders">
        <div><i class="material-icons">person</i><span v-text="stakeholder.name"></span></div>
        <ul>
          <li v-for="value in stakeholder.values" v-text="value.body"></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
