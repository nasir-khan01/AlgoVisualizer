import { GridNode } from "@shared/schema";

// Depth-First Search Algorithm
const dfs = (grid: GridNode[][], startNode: GridNode, endNode: GridNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return { visitedNodesInOrder: [], path: [] };
  }

  const visitedNodesInOrder: GridNode[] = [];
  
  // Clone grid to avoid modifying the original
  const workingGrid = grid.map(row => 
    row.map(node => ({
      ...node,
      previousNode: null,
      isVisited: false
    }))
  );
  
  // Initialize start and end nodes
  const start = workingGrid[startNode.row][startNode.col];
  const end = workingGrid[endNode.row][endNode.col];
  
  // DFS uses a stack
  const stack: GridNode[] = [];
  stack.push(start);
  start.isVisited = true;
  
  // Main algorithm loop
  while (stack.length > 0) {
    const currentNode = stack.pop()!;
    visitedNodesInOrder.push(currentNode);
    
    // If we've reached the end, reconstruct and return the path
    if (currentNode.row === end.row && currentNode.col === end.col) {
      return {
        visitedNodesInOrder,
        path: getPathToNode(currentNode)
      };
    }
    
    // Get unvisited neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, workingGrid);
    
    for (const neighbor of neighbors) {
      // Skip walls
      if (neighbor.type === "wall") continue;
      
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      stack.push(neighbor);
    }
  }
  
  // No path found
  return {
    visitedNodesInOrder,
    path: []
  };
};

// Get unvisited neighbors
const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  // Check all four directions (in a specific order for DFS)
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // right
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  
  return neighbors.filter(neighbor => !neighbor.isVisited);
};

// Reconstruct path from end node to start node
const getPathToNode = (endNode: GridNode): GridNode[] => {
  const path: GridNode[] = [];
  let currentNode: GridNode | null = endNode;
  
  while (currentNode) {
    path.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return path;
};

export default dfs;
