'use strict';
const Graph    = require('./GraphClass');
module.exports = class BFS extends Graph{
  constructor(verts) {
    super(verts);
  }
  //Find the shortestPath between two nodes (if it exist)
  shortestPath(start, finish){
    //Sets the levels
    let level = {}
    level[start] = 1;
    //Set the parents
    let parent = {}
    parent[start] = null;
    //Level iterator
    let levelCounter      = 0;
    let adjList           = this.getAdjList();
    //The list of neighbors on this level
    let currentLevelNodes = [adjList[start]];
    //Do we have a match?
    let match             = false;

    //As long as there are node
    while (currentLevelNodes.length) {
      //Build on new nodes based on currentLevelNodes neighbors
      let next = [];
      match = false;
      let iterator = currentLevelNodes.length - 1;
      while(iterator > -1) {
        //Grab the current node
        let node = currentLevelNodes[iterator];
        //We've found our neighbor
        match = node.id == finish
        if(match) {
          break;
        }
        //Go through all of the neighbors
        node.neighbors.forEach((neighbor) => {
          //If we haven't seen them yet, attempt to iterator of neighbors
          if (!(level[neighbor] > -1)) {
            level[neighbor] = levelCounter;
            parent[neighbor] = node.id;
            next.push(adjList[neighbor]);
          }
        });
        iterator--;
      }
      //If we haven't found our neighbor, we need to move to the next level
      if(!match) {
        levelCounter+=1;
        currentLevelNodes = next;
      } else {
        currentLevelNodes = [];
      }
    }
    //Did we find a winner?
    if (match) {
      //Traverse the parents array to find the past
      let currentParent = parent[finish];
      let str = `${finish} `
       while(currentParent > -1 && currentParent != null) {
        str += `<- ${currentParent} `
        currentParent = parent[currentParent];
      }
      console.log(`Shortest Path from ${start} to ${finish} of length ${levelCounter}`);
      console.log(str)
    } else {
      console.log(`No path from ${start} to ${finish}`);
    }
  }
}
