<script>
  const store = require('./store');

  module.exports = {
    computed: {
      vision() {return store.state.vision},
      concept1() {return store.state.concept1},
      concept2() {return store.state.concept2},
      concept3() {return store.state.concept3},
    }
  }
</script>

<template>
  <div>
    <h2>ビジョン</h2>
    <p>
      <bodyedit :obj="vision"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="vision"></modal-button>
    </p>
    <h3>コンセプト1</h3>
    <p>
      <bodyedit :obj="concept1"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="concept1"></modal-button>
    </p>
    <h3>コンセプト2</h3>
    <p>
      <bodyedit :obj="concept2"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="concept2"></modal-button>
    </p>
    <h3>コンセプト3</h3>
    <p>
      <bodyedit :obj="concept3"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="concept3"></modal-button>
    </p>
  </div>
</template>
