<script>
  const store = require('./store');

  module.exports = {
    computed: {
      vision() {return store.state.vision},
      concept1() {return store.state.concept1},
      concept2() {return store.state.concept2},
      concept3() {return store.state.concept3},
      catchcopy() {return store.state.catchcopy},
      meaning() {return store.state.meaning},
      story() {return store.state.story},
      design() {return store.state.design},
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
    <h3>キャッチコピー</h3>
    <p>
      <bodyedit :obj="catchcopy"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="catchcopy"></modal-button>
    <h3>意味</h3>
    <p>
      <bodyedit :obj="meaning"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="meaning"></modal-button>
    <h3>ストーリー</h3>
    <p>
      <bodyedit :obj="story"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="story"></modal-button>
    <h3>デザイン</h3>
    <p>
      <img :src="design.imageUrl" />
      <modal-button :model="design"></modal-button>
    </p>
  </div>
</template>
