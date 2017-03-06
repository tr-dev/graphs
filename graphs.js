'use strict';
const BFS = require('./lib/BFSClass');

let b = new BFS(10);
console.log(b + '')
let verts = b.getVerts();
(verts || []).forEach((vert) => {
  (verts || []).forEach((childVert) => {
    if(vert !== childVert) {
      b.shortestPath(vert, childVert);
    }
  })
})
b.shortestPath('2', '5');
