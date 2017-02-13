<script>
  const models = require('./models');
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
      addValue(stakeholder) {
        let value = models.Value(null, null, '');
        stakeholder.addValue(value);
        store.commit('editBody', value);
      }
    }
  }
</script>

<template>
  <div>
    <ul>
      <li v-for="purpose in purposes" v-text="purpose.body"></li>
      <li><button>Add Purpose</button></li>
    </ul>
    <ul>
      <li v-for="stakeholder in stakeholders">
        <div><i class="material-icons">person</i><span v-text="stakeholder.name"></span></div>
        <ul>
          <li v-for="value in stakeholder.values" v-text="value.body"></li>
          <li><button>Add Value</button></li>
        </ul>
      </li>
    </ul>
  </div>
</template>
