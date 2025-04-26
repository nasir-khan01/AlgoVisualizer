import { GridNode } from "@shared/schema";

// A* Pathfinding Algorithm
const astar = (grid: GridNode[][], startNode: GridNode, endNode: GridNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return { visitedNodesInOrder: [], path: [] };
  }

  const openSet: GridNode[] = [];
  const closedSet: GridNode[] = [];
  const visitedNodesInOrder: GridNode[] = [];

  // Clone grid to avoid modifying the original
  const workingGrid = grid.map(row => 
    row.map(node => ({
      ...node,
      distance: Infinity,
      fScore: Infinity,
      gScore: Infinity,
      hScore: 0,
      previousNode: null,
      isVisited: false
    }))
  );

  // Initialize the start node
  const start = workingGrid[startNode.row][startNode.col];
  const end = workingGrid[endNode.row][endNode.col];
  
  start.gScore = 0;
  start.hScore = heuristic(start, end);
  start.fScore = start.hScore;
  
  openSet.push(start);
  
  // Main algorithm loop
  while (openSet.length > 0) {
    // Sort by fScore and take the lowest
    openSet.sort((a, b) => a.fScore - b.fScore);
    const current = openSet.shift()!;
    
    // Mark as visited
    current.isVisited = true;
    visitedNodesInOrder.push(current);
    
    // If we've reached the end, reconstruct and return the path
    if (current.row === end.row && current.col === end.col) {
      return {
        visitedNodesInOrder,
        path: reconstructPath(current)
      };
    }
    
    // Add to closed set
    closedSet.push(current);
    
    // Get neighbors
    const neighbors = getNeighbors(current, workingGrid);
    
    for (const neighbor of neighbors) {
      // Skip if in closed set or is a wall
      if (closedSet.includes(neighbor) || neighbor.type === "wall") {
        continue;
      }
      
      // Calculate tentative gScore
      const tentativeGScore = current.gScore + neighbor.weight;
      
      // If this path to neighbor is better than any previous one, record it
      if (tentativeGScore < neighbor.gScore) {
        neighbor.previousNode = current;
        neighbor.gScore = tentativeGScore;
        neighbor.hScore = heuristic(neighbor, end);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  
  // No path found
  return {
    visitedNodesInOrder,
    path: []
  };
};

// Heuristic function (Manhattan distance)
const heuristic = (node: GridNode, endNode: GridNode): number => {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

// Get valid neighbors
const getNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  const numRows = grid.length;
  const numCols = grid[0].length;
  
  // Check all four directions
  if (row > 0) neighbors.push(grid[row - 1][col]); // top
  if (row < numRows - 1) neighbors.push(grid[row + 1][col]); // bottom
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < numCols - 1) neighbors.push(grid[row][col + 1]); // right
  
  return neighbors;
};

// Reconstruct path from end node to start node
const reconstructPath = (endNode: GridNode): GridNode[] => {
  const path: GridNode[] = [];
  let current: GridNode | null = endNode;
  
  while (current) {
    path.unshift(current);
    current = current.previousNode;
  }
  
  return path;
};

export default astar;
