<script>
 const SVG = require('svg.js');
 require('svg.draggy.js');
 require('svg.connectable.js');
 const IterateObject = require("iterate-object");

 const Vue = require('vue');

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


 module.exports = {
   methods: {
     updateSVG() {
       var draw = SVG('requirements').size(1500, 1000);
       var links = draw.group();
       var markers = draw.group();

       var strategy = draw.group();
       var business = draw.group();
       var it = draw.group();

       strategy.move(100, 40);
       strategy.rect(350, 800)
               .attr({fill: 'none', stroke: '#555'});
       strategy.text("戦略要求").attr({x: 175}).font({anchor: 'middle'});
       business.move(450, 40);
       business.rect(350, 800)
               .attr({fill: 'none', stroke: '#555'});
       business.text("業務要求").attr({x: 175}).font({anchor: 'middle'});
       it.move(800, 40);
       it.rect(350, 800)
         .attr({fill: 'none', stroke: '#555'});
       it.text("IT要求").attr({x: 175}).font({anchor: 'middle'});

       var reqs = [];
       for (var req of this.allRequirements) {
         var reqGroup = draw.group();
         reqGroup.move(120, (reqs.length + 1) * 80);
         reqGroup.draggy();
         var rect = reqGroup.rect();
         var text = reqGroup.text(req.body).attr({x: 10, y: 0}).font({
           'dominant-baseline': 'central'
         });
         var bbox = text.bbox();
         rect.attr({
           fill: req.colorLighter,
           stroke: req.color,
           width: bbox.width + 20,
           height: bbox.height + 30
         });
         reqs.push(reqGroup);
       }

       reqs[0].move(120, 340);
       for (var reqGroup of reqs.slice(1)) {
         reqGroup.move(300);
         var con = reqs[0].connectable({
           container: links,
           markers: markers
         }, reqGroup);
         con.setLineColor("#5D4037");
         con.computeLineCoordinates = myLineCoordinates;
         con.update();
       }
     },
   },
   computed: {
     requirements() {return store.state.requirements;},
     allRequirements() {return store.getters.allRequirements;}
   },
   mounted() {
     this.updateSVG();
   }
 }
</script>

<template>
  <div id="requirements">
  </div>
  <!--
  <svg width="1500" height="800" viewBox="0 0 1500 800"
    xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(30, 30)">
      <g>
        <rect width="380" height="200" fill="none" stroke="blue"/>
      </g>
      <g transform="translate(400)">
        <rect width="380" height="200" fill="none" stroke="blue"/>

        <rect x="20" y="10" width="140" height="60" fill="green"/>
        <text>テスト</text>

        <rect x="180" y="10" width="140" height="60" fill="green"/>
        <text>テスト</text>

        <line x1="160" y1="40" x2="180" y2="40"
          stroke-width="2" stroke="black"/>
      </g>
      <g transform="translate(800)">
        <rect width="380" height="200" fill="none" stroke="blue"/>
      </g>
    </g>
  </svg>
  -->
</template>
