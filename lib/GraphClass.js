'use strict';
const FLIP_PROBABILITY = 10;

module.exports = class Graph {
  constructor(verts) {
    //Generates a random graph
    this.adjList = Array.apply(null, Array(verts)).map((v, index) => {
      let neighbors = [];
      for (let count = verts -1; count >= 0; count--) {
        //Flip a FLIP_PROBABILITY weighted coin to determine neighbors.
        let isNeighbor = (Math.random() * 100) < FLIP_PROBABILITY;

        //Did we match the coin flip and are we not trying to reach the same node we're on
        if (isNeighbor && index !== count) {
          neighbors.push(count.toString());
        }
      }
      return {
        id : index,
        neighbors
      }
    });
  }
  getAdjList() {
    return this.adjList;
  }
  getVerts() {
    return Object.keys(this.adjList);
  }
  toString() {
    let str = "";
    this.adjList.forEach((vert) => {
      str += `Vert: ${vert.id}: `
      str += 'Neighbors: [ '
      vert.neighbors.forEach((neighbor, index) => {
        str += ` ${neighbor} `  + (index != vert.neighbors.length -1 ? ',' : '');
      });
      str += ']\n';
    });
    return str;
  }
}
