<script>
  const Vue = require('vue');

  const store = require('./store');

  module.exports = {
    directives: {
      focus: function (el, value) {
        Vue.nextTick(() => {
          if (value) {
            el.focus();
          } else {
            el.blur();
          }
        });
      }
    },
    props: {
      obj: Object,
      bodyAttr: String,
      widget: String  // 'input' or 'textarea'
    },
    computed: {
      isEditing() {
        return this.obj == store.state.bodyEditing;
      }
    },
    methods: {
      edit() {
        store.commit('editBody', this.obj);
      },
      end() {
        store.commit('endBodyEditing');
      }
    }
  }
</script>

<template>
  <span>
    <input v-if="isEditing && widget == 'input'"
           v-model="obj[bodyAttr]"
           v-focus="isEditing"
           @blur="end"
           @keydown.ctrl.enter="end" />
    <textarea v-if="isEditing && widget == 'textarea'"
              v-model="obj[bodyAttr]"
              v-focus="isEditing"
              @blur="end"
              @keydown.ctrl.enter="end">
    </textarea>
    <span v-if="!isEditing"
          v-text="obj[bodyAttr]"
          @dblclick="edit"></span>
  </span>
</template>
