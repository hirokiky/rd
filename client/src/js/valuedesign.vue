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
    <p v-text="vision.body"></p>
    <h3>コンセプト1</h3>
    <p v-text="concept1.body"></p>
    <h3>コンセプト2</h3>
    <p v-text="concept2.body"></p>
    <h3>コンセプト3</h3>
    <p v-text="concept3.body"></p>
  </div>
</template>
