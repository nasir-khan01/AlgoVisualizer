import { useState, useCallback, useEffect } from "react";
import { GridNode, Tool } from "@shared/schema";

export const useAlgorithm = (initialGridSize: { rows: number; cols: number }) => {
  const [grid, setGrid] = useState<GridNode[][]>([]);
  const [startNode, setStartNode] = useState<GridNode | null>(null);
  const [endNode, setEndNode] = useState<GridNode | null>(null);
  const [isMousePressed, setIsMousePressed] = useState(false);
  
  // Create an empty grid with the given size
  const createEmptyGrid = useCallback((rows: number, cols: number): GridNode[][] => {
    const newGrid: GridNode[][] = [];
    
    for (let row = 0; row < rows; row++) {
      const currentRow: GridNode[] = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push({
          row,
          col,
          type: "empty",
          weight: 1,
          isVisited: false,
          distance: Infinity,
          fScore: Infinity,
          gScore: Infinity,
          hScore: 0,
          previousNode: null
        });
      }
      newGrid.push(currentRow);
    }
    
    return newGrid;
  }, []);
  
  // Initialize grid with start and end nodes
  const initializeGrid = useCallback(() => {
    const newGrid = createEmptyGrid(initialGridSize.rows, initialGridSize.cols);
    
    // Set default start and end nodes
    const startRow = Math.floor(initialGridSize.rows / 4);
    const startCol = Math.floor(initialGridSize.cols / 4);
    const endRow = Math.floor(initialGridSize.rows * 3 / 4);
    const endCol = Math.floor(initialGridSize.cols * 3 / 4);
    
    newGrid[startRow][startCol].type = "start";
    newGrid[endRow][endCol].type = "end";
    
    setGrid(newGrid);
    setStartNode(newGrid[startRow][startCol]);
    setEndNode(newGrid[endRow][endCol]);
  }, [initialGridSize, createEmptyGrid]);
  
  // Initialize grid on mount or when grid size changes
  useEffect(() => {
    initializeGrid();
  }, [initialGridSize, initializeGrid]);
  
  // Handle node type change based on selected tool
  const changeNodeType = useCallback((row: number, col: number, tool: Tool) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    
    // Don't allow changing start or end nodes when using other tools
    if (tool !== "start" && node.type === "start") return;
    if (tool !== "end" && node.type === "end") return;
    
    // Remove previous start/end node when placing a new one
    if (tool === "start" && startNode) {
      newGrid[startNode.row][startNode.col].type = "empty";
    }
    if (tool === "end" && endNode) {
      newGrid[endNode.row][endNode.col].type = "empty";
    }
    
    // Update node type based on tool
    switch (tool) {
      case "start":
        node.type = "start";
        setStartNode(node);
        break;
      case "end":
        node.type = "end";
        setEndNode(node);
        break;
      case "wall":
        node.type = "wall";
        node.weight = Infinity;
        break;
      case "weight":
        node.type = "weight";
        node.weight = 5;
        break;
      case "erase":
        node.type = "empty";
        node.weight = 1;
        break;
      default:
        break;
    }
    
    setGrid(newGrid);
  }, [grid, startNode, endNode]);
  
  // Mouse event handlers
  const handleMouseDown = useCallback((row: number, col: number) => {
    setIsMousePressed(true);
  }, []);
  
  const handleMouseEnter = useCallback((row: number, col: number) => {
    if (!isMousePressed) return;
    
    // Get the selected tool from the UI
    const selectedTool = document.querySelector('[data-selected-tool]')?.getAttribute('data-selected-tool') as Tool || 'wall';
    
    changeNodeType(row, col, selectedTool);
  }, [isMousePressed, changeNodeType]);
  
  const handleMouseUp = useCallback(() => {
    setIsMousePressed(false);
  }, []);
  
  // Get all wall nodes
  const getWalls = useCallback(() => {
    const walls: { row: number; col: number }[] = [];
    
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].type === "wall") {
          walls.push({ row, col });
        }
      }
    }
    
    return walls;
  }, [grid]);
  
  // Get all weighted nodes
  const getWeights = useCallback(() => {
    const weights: { row: number; col: number; weight: number }[] = [];
    
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (grid[row][col].type === "weight") {
          weights.push({ row, col, weight: grid[row][col].weight });
        }
      }
    }
    
    return weights;
  }, [grid]);
  
  // Clear all walls, weights, and visited nodes but keep start and end
  const clearGrid = useCallback(() => {
    const newGrid = createEmptyGrid(initialGridSize.rows, initialGridSize.cols);
    
    // Preserve start and end nodes
    if (startNode) {
      newGrid[startNode.row][startNode.col].type = "start";
    }
    
    if (endNode) {
      newGrid[endNode.row][endNode.col].type = "end";
    }
    
    setGrid(newGrid);
  }, [initialGridSize, createEmptyGrid, startNode, endNode]);
  
  // Clear visited and path nodes but keep walls and weights
  const clearPath = useCallback(() => {
    const newGrid = [...grid];
    
    for (let row = 0; row < newGrid.length; row++) {
      for (let col = 0; col < newGrid[0].length; col++) {
        const node = newGrid[row][col];
        
        if (node.type === "visited" || node.type === "path") {
          node.type = "empty";
        }
        
        node.isVisited = false;
        node.distance = Infinity;
        node.fScore = Infinity;
        node.gScore = Infinity;
        node.hScore = 0;
        node.previousNode = null;
      }
    }
    
    setGrid(newGrid);
  }, [grid]);
  
  // Generate a random maze
  const generateMaze = useCallback(() => {
    // First clear the grid
    clearGrid();
    
    const newGrid = [...grid];
    const rows = newGrid.length;
    const cols = newGrid[0].length;
    
    // Add random walls (about 30% of the grid)
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const node = newGrid[row][col];
        
        // Skip start and end nodes
        if (node.type === "start" || node.type === "end") continue;
        
        // 30% chance to add a wall
        if (Math.random() < 0.3) {
          node.type = "wall";
          node.weight = Infinity;
        }
      }
    }
    
    setGrid(newGrid);
  }, [grid, clearGrid]);
  
  return {
    grid,
    initializeGrid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    isMousePressed,
    startNode,
    endNode,
    setStartNode,
    setEndNode,
    getWalls,
    getWeights,
    clearGrid,
    clearPath,
    generateMaze,
    changeNodeType
  };
};
