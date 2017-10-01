<script>
 const SVG = require('svg.js');
 require('svg.draggy.js');
 require('svg.connectable.js');
 const IterateObject = require("iterate-object");

 const Vue = require('vue');

 const models = require('./models');
 const store = require('./store');


 // My Own computeLineCoordinates
 // which connects box 'tail' and box head,
 // not 'centors'.
 // https://github.com/jillix/svg.connectable.js/blob/4c6827021e1ff9c492e93ced74fadc315b70cbc0/lib/index.js#L116
 var myLineCoordinates = function (cons) {

   var output = []
     , l = cons.length
   ;

   IterateObject(cons, function (con, i) {

     var sT = con.source.transform()
       , tT = con.target.transform()
       , sB = con.source.bbox()
       , tB = con.target.bbox()
       , x1 = sT.x + sB.width
       , y1 = sT.y + sB.height / 2
       , x2 = tT.x - 2  // minus 3px for showing arrow heads
       , y2 = tT.y + tB.height / 2
       , cx = (x1 + x2) / 2
       , cy = (y1 + y2) / 2
       , dx = Math.abs((x1 - x2) / 2)
       , dy = Math.abs((y1 - y2) / 2)
       , dd = null
       , out = {
         x1: x1
         , y1: y1
         , x2: x2
         , y2: y2
         , ex: x1
         , ey: y1
       }
     ;

     if (i !== (l - 1) / 2) {
       dd = Math.sqrt(dx * dx + dy * dy);
       out.ex = cx + dy / dd * options.k * (i - (l - 1) / 2);
       out.ey = cy - dx / dd * options.k * (i - (l - 1) / 2);
     }
     output.push(out);
   });
   return output;
 }


 const LAYER_WIDTH = 500;
 const LAYER_HEIGHT = 800;
 const LAYER_VERT_PADDING = 40;
 const LAYER_HORI_PADDING = 100;

 module.exports = {
   data() {
     return {
       draw: null
     }
   },
   methods: {
     renderRequirement(requirement) {
       var draw = this.draw;
       if (!requirement.svg) {
         requirement.svgGroup = draw.group();
         requirement.svgRect = requirement.svgGroup.rect();
         requirement.svgText = requirement.svgGroup.text(requirement.body);
       }
       requirement.svgGroup.move(120, 80);
       requirement.svgGroup.draggy();
       requirement.svgText.text(requirement.body).attr({x: 10, y: 0}).font({
         'dominant-baseline': 'central'
       });
       var bbox = requirement.svgText.bbox();
       requirement.svgRect.attr({
         fill: requirement.colorLighter,
         stroke: requirement.color,
         width: bbox.width + 20,
         height: bbox.height + 30
       });
     },
     initialSVG() {
       var draw = SVG('requirements').size(LAYER_HORI_PADDING * 2 + LAYER_WIDTH * 3,
                                           LAYER_VERT_PADDING * 2 + LAYER_HEIGHT);
       this.draw = draw;

       var links = draw.group();
       var markers = draw.group();

       var strategy = draw.group();
       var business = draw.group();
       var it = draw.group();

       // 戦略、業務、IT要求を作成
       strategy.move(LAYER_HORI_PADDING, LAYER_VERT_PADDING);
       strategy.rect(LAYER_WIDTH, LAYER_HEIGHT)
               .attr({fill: 'none', stroke: '#555'});
       strategy.text("戦略要求").attr({x: LAYER_WIDTH / 2}).font({anchor: 'middle'});
       business.move(100 + LAYER_WIDTH, LAYER_VERT_PADDING);
       business.rect(LAYER_WIDTH, LAYER_HEIGHT)
               .attr({fill: 'none', stroke: '#555'});
       business.text("業務要求").attr({x: LAYER_WIDTH / 2}).font({anchor: 'middle'});
       it.move(100 + LAYER_WIDTH * 2, LAYER_VERT_PADDING);
       it.rect(LAYER_WIDTH, LAYER_HEIGHT)
         .attr({fill: 'none', stroke: '#555'});
       it.text("IT要求").attr({x: LAYER_WIDTH / 2}).font({anchor: 'middle'});

       // 各要求を作成
       for (var req of this.allRequirements) {
         this.renderRequirement(req);
       }

       // 各要求のコネクションを作成
       var req0 = this.allRequirements[0].svgGroup;
       req0.move(120, 340);
       i = 100;
       for (var req of this.allRequirements.slice(1)) {
         var reqGroup = req.svgGroup;
         reqGroup.move(300, i);
         var con = req0.connectable({
           container: links,
           markers: markers
         }, reqGroup);
         con.setLineColor("#5D4037");
         con.computeLineCoordinates = myLineCoordinates;
         con.update();
         i += 80;
       }
     },
     addRequirement() {
       var req = new models.Requirement("");
       store.commit('addRequirement', req);
       this.renderRequirement(req);
     }
   },
   computed: {
     requirements() {return store.state.requirements;},
     allRequirements() {return store.getters.allRequirements;}
   },
   mounted() {
     this.initialSVG();
   }
 }
</script>

<template>
  <div>
    <div>
      <button @click="addRequirement">要求を追加</button>
    </div>
    <div id="requirements">
    </div>
  </div>
</template>
