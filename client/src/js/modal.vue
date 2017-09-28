<script>
  // Requires vue-form-generator loaded
  const store = require('./store');

  module.exports = {
    computed: {
      modalEditing() {return store.state.modalEditing}
    },
    methods: {
      close() {
        store.commit('editOnModal', null);
      }
    },
    watch: {
      'modalEditing': function(value) {
        this.$nextTick(() => {
          if (value) {
            let input = this.$refs.container.querySelector('input');
            if (input) {
              input.focus();
            } else {
              let textarea = this.$refs.container.querySelector('textarea');
              if (textarea) {
                textarea.focus();
              }
            }
          }
        });
      }
    }
  }
</script>

<template>
  <div class="modal" v-if="modalEditing">
    <div class="modal-mask" @click.self="close">
      <div class="modal-inner">
        <div class="modal-container"
             ref="container"
             @keydown.ctrl.enter.stop="close">
          <button class="btn modal-close" @click="close">
            <i class="material-icons">close</i>
          </button>
          <h2 v-text="modalEditing.modelVerboseName"></h2>
          <vue-form-generator :schema="modalEditing.schema"
                              :model="modalEditing">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped src="../css/modal.css"></style>
