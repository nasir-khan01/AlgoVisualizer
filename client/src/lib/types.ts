export type NodeType = 'empty' | 'wall' | 'weight' | 'start' | 'end' | 'visited' | 'path';
export type Tool = 'start' | 'end' | 'wall' | 'weight' | 'erase';

export type GridNode = {
  row: number;
  col: number;
  type: NodeType;
  weight: number;
  isVisited: boolean;
  distance: number;
  fScore: number;
  gScore: number;
  hScore: number;
  previousNode: GridNode | null;
};

export type SortingAlgorithm = 'quicksort' | 'mergesort' | 'bubblesort' | 'heapsort' | 'insertionsort';
export type PathfindingAlgorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs';

export type ArrayElement = {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'outOfPlace';
};

export type AlgorithmMetrics = {
  nodesVisited?: number;
  pathLength?: number;
  comparisons?: number;
  swaps?: number;
  timeElapsed: number;
  timeComplexity: string;
};

export type PathfindingParams = {
  gridSize: { rows: number; cols: number };
  startNode: { row: number; col: number };
  endNode: { row: number; col: number };
  algorithm: PathfindingAlgorithm;
  walls: Array<{ row: number; col: number }>;
  weights: Array<{ row: number; col: number; weight: number }>;
};

export type SortingParams = {
  arraySize: number;
  algorithm: SortingAlgorithm;
  initialArray: number[];
};

export type AlgorithmResult = {
  id?: number;
  algorithm_type: string;
  algorithm_name: string;
  params: any;
  metrics: any;
  created_at: string;
};
