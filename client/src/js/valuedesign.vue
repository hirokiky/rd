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
  <div class="container">
    <h2 :style="{'border-color': vision.color}">ビジョン</h2>
    <p>
      <bodyedit :obj="vision"
                bodyAttr="body"
                widget="textarea"></bodyedit>
      <modal-button :model="vision"></modal-button>
    </p>
    <div class="row">
      <div class="col-4">
        <div class="concept" :style="{'border-color': concept1.color}" >
          <h3 :style="{'border-color': concept1.color}">コンセプト1</h3>
          <p>
            <bodyedit :obj="concept1"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="concept1"></modal-button>
          </p>
        </div>
      </div>

      <div class="col-4">
        <div class="concept" :style="{'border-color': concept1.color}">
          <h3 :style="{'border-color': concept2.color}">コンセプト2</h3>
          <p>
            <bodyedit :obj="concept2"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="concept2"></modal-button>
          </p>
        </div>
      </div>

      <div class="col-4">
        <div class="concept" :style="{'border-color': concept1.color}">
          <h3 :style="{'border-color': concept3.color}">コンセプト3</h3>
          <p>
            <bodyedit :obj="concept3"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="concept3"></modal-button>
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="catchcopy">
          <h3>キャッチコピー</h3>
          <p>
            <bodyedit :obj="catchcopy"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="catchcopy"></modal-button>
          </p>
        </div>
      </div>

      <div class="col-6">
        <div class="design">
          <h3>デザイン</h3>
          <p>
            <img :src="design.imageUrl" />
            <modal-button :model="design"></modal-button>
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <div class="meaning">
          <h3>意味</h3>
          <p>
            <bodyedit :obj="meaning"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="meaning"></modal-button>
          </p>
        </div>
      </div>

      <div class="col-6">
        <div class="story">
          <h3>ストーリー</h3>
          <p>
            <bodyedit :obj="story"
                      bodyAttr="body"
                      widget="textarea"></bodyedit>
            <modal-button :model="story"></modal-button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    border-bottom: solid 2px;
    padding-bottom: 8px;
  }

  h3 {
    border-bottom: solid 1px #bbb;
    padding-bottom: 8px;
  }

  .row {
    margin-top: 40px;
  }

  .vision,
  .concept,
  .catchcopy,
  .design,
  .meaning,
  .story {
    border: solid 4px #ccc;
    border-radius: 8px;
    padding: 12px;
  }
</style>
