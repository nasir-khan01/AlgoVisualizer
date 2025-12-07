import { GridNode } from "@/lib/types";

// Dijkstra's Algorithm
const dijkstra = (grid: GridNode[][], startNode: GridNode, endNode: GridNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return { visitedNodesInOrder: [], path: [] };
  }

  const visitedNodesInOrder: GridNode[] = [];
  
  // Clone grid to avoid modifying the original
  const workingGrid = grid.map(row => 
    row.map(node => ({
      ...node,
      distance: Infinity,
      previousNode: null,
      isVisited: false
    }))
  );
  
  // Initialize the start node
  const start = workingGrid[startNode.row][startNode.col];
  const end = workingGrid[endNode.row][endNode.col];
  start.distance = 0;
  
  // Create a queue of all nodes
  const unvisitedNodes = getAllNodes(workingGrid);
  
  // Main algorithm loop
  while (unvisitedNodes.length) {
    // Sort by distance and take the closest
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift()!;
    
    // If we encounter a wall, skip it
    if (closestNode.type === "wall") continue;
    
    // If the closest node has distance infinity, we're trapped
    if (closestNode.distance === Infinity) {
      return { visitedNodesInOrder, path: [] };
    }
    
    // Mark as visited
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    
    // If we've reached the end, reconstruct and return the path
    if (closestNode.row === end.row && closestNode.col === end.col) {
      return {
        visitedNodesInOrder,
        path: getNodesInShortestPathOrder(closestNode)
      };
    }
    
    // Update all neighbors
    updateUnvisitedNeighbors(closestNode, workingGrid);
  }
  
  // No path found
  return {
    visitedNodesInOrder,
    path: []
  };
};

// Sort nodes by distance (ascending)
const sortNodesByDistance = (nodes: GridNode[]) => {
  nodes.sort((a, b) => a.distance - b.distance);
};

// Update unvisited neighbors with new distances
const updateUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + neighbor.weight;
    neighbor.previousNode = node;
  }
};

// Get unvisited neighbors
const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  // Check all four directions
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // right
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

// Get all nodes in the grid as a flat array
const getAllNodes = (grid: GridNode[][]): GridNode[] => {
  const nodes: GridNode[] = [];
  
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  
  return nodes;
};

// Reconstruct shortest path from end node to start node
const getNodesInShortestPathOrder = (endNode: GridNode): GridNode[] => {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = endNode;
  
  while (currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
};

export default dijkstra;
