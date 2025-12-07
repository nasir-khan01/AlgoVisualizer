import { NodeType, Tool, PathfindingAlgorithm, SortingAlgorithm, GridNode, ArrayElement, AlgorithmMetrics } from "@/lib/types";

// Re-export types from schema for direct import in client code
export type {
  NodeType,
  Tool,
  PathfindingAlgorithm,
  SortingAlgorithm,
  GridNode,
  ArrayElement,
  AlgorithmMetrics
};

// Animation frame type for sorting algorithms
export type SortingAnimationFrame = {
  array: ArrayElement[];
  indices?: number[];
};

// Animation frame type for pathfinding algorithms
export type PathfindingAnimationFrame = GridNode;

// Result type returned by sorting algorithm implementations
export type SortingAlgorithmResult = {
  states: SortingAnimationFrame[];
  comparisons: number;
  swaps: number;
};

// Result type returned by pathfinding algorithm implementations
export type PathfindingAlgorithmResult = {
  visitedNodesInOrder: GridNode[];
  path: GridNode[];
};

// Theme type for the app
export type Theme = "light" | "dark";

// Theme context type
export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// Controls component props type extension for reuse
export type ControlBaseProps = {
  speed: number;
  onSpeedChange: (speed: number) => void;
  onVisualize: () => void;
  onReset: () => void;
  isAnimating: boolean;
  isPaused: boolean;
};

// Grid props type for pathfinding
export type GridProps = {
  grid: GridNode[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  selectedTool: Tool;
  isAnimating: boolean;
};

// Array props type for sorting
export type ArrayProps = {
  array: ArrayElement[];
  isAnimating: boolean;
};

// Category card props for home page
export type CategoryCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  buttonText: string;
  buttonLink: string;
  buttonColorClass: string;
};
