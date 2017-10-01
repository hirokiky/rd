<script>
 const SVG = require('svg.js');
 require('svg.draggy.js');
 require('svg.connectable.js');

 const Vue = require('vue');

 const store = require('./store');

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
         reqs[0].connectable({
           container: links,
           markers: markers,
         }, reqGroup).setLineColor("#5D4037");
       }
     }
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
