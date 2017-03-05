'use strict';
module.exports = class BFS {
  constructor(verts) {
    this.graph = new (require('./GraphClass'))(verts);
  }
  toString() {
    return this.graph.toString();
  }

  shortestPath(start, finish){
    let level = {}
    level[start] = 1;
    let parent = {}
    parent[start] = null;

    let levelCounter      = 0;
    let adjList           = this.graph.getAdjList();
    let currentLevelNodes = [adjList[start]];
    let match             = false;

    while (currentLevelNodes.length) {
      let next = [];
      match = false;
      for(let curr = currentLevelNodes.length - 1 ; curr >=0; curr--) {
        let node = currentLevelNodes[curr]
        //Base case
        match = node.id == finish
        if(match) {
          break;
        }

        node.neighbors.forEach((neighbor) => {
          if (!(level[neighbor.id] > -1)) {
            level[neighbor.id] = levelCounter;
            parent[neighbor.id] = node.id;
            next.push(adjList[neighbor.id]);
          }
        });
      }

      if(!match) {
        levelCounter+=1;
        currentLevelNodes = next;
      } else {
        currentLevelNodes = [];
      }
    }
    if (match) {

      let currentParent = parent[finish];
      let str = `${finish} `
       while(currentParent > -1 && currentParent) {
        str += `<- ${currentParent} `
        currentParent = parent[currentParent];
      }
      console.log(`Shortest Path from ${start} to finish is ${levelCounter}`);
      console.log(str)
    } else {
      console.log(`No path from ${start} to ${finish}`);
    }

  }
}
