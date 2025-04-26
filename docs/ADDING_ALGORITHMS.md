# Adding New Algorithms to AlgorithmViz

This guide provides step-by-step instructions for implementing and integrating new algorithms into the AlgorithmViz platform.

## Table of Contents

- [Overview](#overview)
- [Adding a New Sorting Algorithm](#adding-a-new-sorting-algorithm)
  - [1. Create the Algorithm Implementation](#1-create-the-algorithm-implementation)
  - [2. Update Type Definitions](#2-update-type-definitions)
  - [3. Import and Register the Algorithm](#3-import-and-register-the-algorithm)
  - [4. Add Algorithm Information](#4-add-algorithm-information)
  - [5. Testing the Algorithm](#5-testing-the-algorithm)
- [Adding a New Pathfinding Algorithm](#adding-a-new-pathfinding-algorithm)
  - [1. Create the Algorithm Implementation](#1-create-the-algorithm-implementation-1)
  - [2. Update Type Definitions](#2-update-type-definitions-1)
  - [3. Import and Register the Algorithm](#3-import-and-register-the-algorithm-1)
  - [4. Add Algorithm Information](#4-add-algorithm-information-1)
  - [5. Testing the Algorithm](#5-testing-the-algorithm-1)
- [Advanced Customization](#advanced-customization)
  - [Custom Visualization States](#custom-visualization-states)
  - [Algorithm-Specific Controls](#algorithm-specific-controls)
- [Best Practices](#best-practices)

## Overview

AlgorithmViz is designed to be extensible, allowing you to add new algorithms with minimal changes to the existing codebase. There are two main categories of algorithms:

1. **Sorting Algorithms**: Operate on arrays and visualize element comparisons and swaps
2. **Pathfinding Algorithms**: Operate on a grid and visualize node exploration

Each algorithm needs to:
- Implement the algorithm logic
- Generate visualization states for animation
- Track performance metrics (comparisons, swaps, etc.)
- Provide information about time/space complexity

## Adding a New Sorting Algorithm

### 1. Create the Algorithm Implementation

Create a new file in `client/src/lib/algorithms/sorting/` for your algorithm (e.g., `radixsort.ts`):

```typescript
import { ArrayElement, SortingAlgorithmResult } from "@shared/schema";

// Implementation of Radix Sort
const radixSort = (array: number[]): SortingAlgorithmResult => {
  // Initialize states, comparisons, and swaps counters
  const states: { array: ArrayElement[], indices?: number[] }[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  // Create a copy of the array with default state
  const arr = [...array].map(value => ({ value, state: 'default' as const }));
  
  // Record initial state
  states.push({ array: [...arr] });
  
  // Find the maximum number to know number of digits
  let max = Math.max(...array);
  
  // Implementation of Radix Sort algorithm
  // For each digit position (ones, tens, hundreds, etc.)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Count sort for this digit position
    countSort(arr, exp);
  }
  
  function countSort(arr: ArrayElement[], exp: number) {
    const n = arr.length;
    const output: ArrayElement[] = Array(n).fill(null);
    const count: number[] = Array(10).fill(0);
    
    // Store count of occurrences in count[]
    for (let i = 0; i < n; i++) {
      // Mark elements as being compared
      arr[i].state = 'comparing';
      states.push({ array: [...arr], indices: [i] });
      
      // Reset state
      arr[i].state = 'default';
      
      // Increment count for this digit
      const digit = Math.floor(arr[i].value / exp) % 10;
      count[digit]++;
      comparisons++; // Counting a comparison
    }
    
    // Change count[i] so that it contains actual position of this digit in output[]
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    // Build the output array
    for (let i = n - 1; i >= 0; i--) {
      // Mark element as being processed
      arr[i].state = 'comparing';
      states.push({ array: [...arr], indices: [i] });
      
      // Get the digit for this position
      const digit = Math.floor(arr[i].value / exp) % 10;
      
      // Place the element in its sorted position
      output[count[digit] - 1] = { ...arr[i] };
      count[digit]--;
      swaps++; // Counting as a swap since we're moving elements
      
      // Reset state
      arr[i].state = 'default';
    }
    
    // Copy the output array to arr[] for the next iteration
    for (let i = 0; i < n; i++) {
      arr[i] = { ...output[i] };
      
      // Mark element as placed in sorted position
      arr[i].state = 'sorted';
      states.push({ array: [...arr], indices: [i] });
      
      // Reset for next phase
      if (exp * 10 <= max) {
        arr[i].state = 'default';
      }
    }
  }
  
  // Mark all elements as sorted in the final state
  for (let i = 0; i < arr.length; i++) {
    arr[i].state = 'sorted';
  }
  states.push({ array: [...arr] });
  
  return { states, comparisons, swaps };
};

export default radixSort;
```

### 2. Update Type Definitions

Add your new algorithm to the `SortingAlgorithm` type in `shared/schema.ts`:

```typescript
// Before
export type SortingAlgorithm = 'quicksort' | 'mergesort' | 'bubblesort' | 'heapsort' | 'insertionsort';

// After
export type SortingAlgorithm = 'quicksort' | 'mergesort' | 'bubblesort' | 'heapsort' | 'insertionsort' | 'radixsort';
```

### 3. Import and Register the Algorithm

Update the Sorting page in `client/src/pages/Sorting.tsx` to:

1. Import your new algorithm:
```typescript
import radixSort from "@/lib/algorithms/sorting/radixsort";
```

2. Add it to the algorithm execution logic:
```typescript
const executeAlgorithm = () => {
  // ...existing code...
  
  // Get the selected algorithm and execute it
  let result: SortingAlgorithmResult;
  const startTime = performance.now();
  
  switch (algorithm) {
    // ...existing cases...
    case 'radixsort':
      result = radixSort(initialArray);
      break;
    default:
      result = bubbleSort(initialArray);
  }
  
  // ...rest of the function...
};
```

3. Add complexity information:
```typescript
const getTimeComplexity = (algorithm: SortingAlgorithm): string => {
  switch (algorithm) {
    // ...existing cases...
    case 'radixsort':
      return 'O(n*k)'; // where k is the number of digits in the largest number
    default:
      return 'Unknown';
  }
};

const getComplexityDetails = (algorithm: SortingAlgorithm): { best: string, average: string, worst: string, space: string } => {
  switch (algorithm) {
    // ...existing cases...
    case 'radixsort':
      return {
        best: 'O(n*k)',
        average: 'O(n*k)',
        worst: 'O(n*k)',
        space: 'O(n+k)'
      };
    default:
      return { best: '-', average: '-', worst: '-', space: '-' };
  }
};
```

### 4. Add Algorithm Information

Add information about the new algorithm to the Controls component in `client/src/components/visualization/Controls.tsx`:

```typescript
{type === 'sorting' && (
  <Select value={algorithm} onValueChange={onAlgorithmChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select Algorithm" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="quicksort">Quick Sort</SelectItem>
      <SelectItem value="mergesort">Merge Sort</SelectItem>
      <SelectItem value="bubblesort">Bubble Sort</SelectItem>
      <SelectItem value="heapsort">Heap Sort</SelectItem>
      <SelectItem value="insertionsort">Insertion Sort</SelectItem>
      <SelectItem value="radixsort">Radix Sort</SelectItem>
    </SelectContent>
  </Select>
)}
```

### 5. Testing the Algorithm

To test your new algorithm:

1. Start the application and navigate to the Sorting page
2. Select your algorithm from the dropdown
3. Adjust the array size as needed
4. Click "Visualize" to run the animation
5. Verify that:
   - The animation correctly shows the sorting process
   - Performance metrics are accurate
   - The array is correctly sorted at the end
   - The algorithm info displays the correct complexity

## Adding a New Pathfinding Algorithm

### 1. Create the Algorithm Implementation

Create a new file in `client/src/lib/algorithms/pathfinding/` for your algorithm (e.g., `bestfirst.ts`):

```typescript
import { GridNode, PathfindingAlgorithmResult } from "@shared/schema";

// Implementation of Best-First Search algorithm
const bestFirstSearch = (grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingAlgorithmResult => {
  const visitedNodesInOrder: GridNode[] = [];
  const unvisitedNodes: GridNode[] = []; // Priority queue
  
  // Initialize start node
  startNode.distance = 0;
  startNode.hScore = heuristic(startNode, endNode);
  unvisitedNodes.push(startNode);
  
  while (unvisitedNodes.length > 0) {
    // Sort nodes by heuristic score (lowest first)
    unvisitedNodes.sort((a, b) => a.hScore - b.hScore);
    
    // Get the node with the lowest heuristic score
    const currentNode = unvisitedNodes.shift()!;
    
    // If we've already visited this node, skip it
    if (currentNode.isVisited) continue;
    
    // Mark as visited
    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);
    
    // If we found the end node, we're done
    if (currentNode === endNode) {
      return {
        visitedNodesInOrder,
        path: getNodesInShortestPathOrder(endNode)
      };
    }
    
    // Update all unvisited neighbors
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.previousNode = currentNode;
      neighbor.hScore = heuristic(neighbor, endNode);
      unvisitedNodes.push(neighbor);
    }
  }
  
  // If we get here, there's no path
  return {
    visitedNodesInOrder,
    path: []
  };
};

// Helper function to get unvisited neighbors
const getUnvisitedNeighbors = (node: GridNode, grid: GridNode[][]): GridNode[] => {
  const neighbors: GridNode[] = [];
  const { row, col } = node;
  
  // Check all four directions
  if (row > 0) neighbors.push(grid[row - 1][col]); // up
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // down
  if (col > 0) neighbors.push(grid[row][col - 1]); // left
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // right
  
  // Filter out walls and already visited nodes
  return neighbors.filter(
    neighbor => !neighbor.isVisited && neighbor.type !== 'wall'
  );
};

// Heuristic function (Manhattan distance)
const heuristic = (node: GridNode, endNode: GridNode): number => {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
};

// Backtrack from end node to start node to get the path
const getNodesInShortestPathOrder = (endNode: GridNode): GridNode[] => {
  const nodesInShortestPathOrder: GridNode[] = [];
  let currentNode: GridNode | null = endNode;
  
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  
  return nodesInShortestPathOrder;
};

export default bestFirstSearch;
```

### 2. Update Type Definitions

Add your new algorithm to the `PathfindingAlgorithm` type in `shared/schema.ts`:

```typescript
// Before
export type PathfindingAlgorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs';

// After
export type PathfindingAlgorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs' | 'bestfirst';
```

### 3. Import and Register the Algorithm

Update the Pathfinding page in `client/src/pages/Pathfinding.tsx` to:

1. Import your new algorithm:
```typescript
import bestFirstSearch from "@/lib/algorithms/pathfinding/bestfirst";
```

2. Add it to the algorithm execution logic:
```typescript
const visualizeAlgorithm = () => {
  // ...existing code...
  
  // Execute the selected algorithm
  let visitedNodesInOrder: GridNode[] = [];
  let path: GridNode[] = [];
  
  const startTime = performance.now();
  
  switch (algorithm) {
    // ...existing cases...
    case 'bestfirst':
      const bestFirstResult = bestFirstSearch(gridCopy, startNode, endNode);
      visitedNodesInOrder = bestFirstResult.visitedNodesInOrder;
      path = bestFirstResult.path;
      break;
    default:
      // Default algorithm
  }
  
  // ...rest of the function...
};
```

3. Add complexity information:
```typescript
const getTimeComplexity = (algorithm: PathfindingAlgorithm): string => {
  switch (algorithm) {
    // ...existing cases...
    case 'bestfirst':
      return 'O(V^2)'; // where V is the number of vertices (nodes)
    default:
      return 'Unknown';
  }
};
```

### 4. Add Algorithm Information

Add information about the new algorithm to the Controls component in `client/src/components/visualization/Controls.tsx`:

```typescript
{type === 'pathfinding' && (
  <Select value={algorithm} onValueChange={onAlgorithmChange}>
    <SelectTrigger>
      <SelectValue placeholder="Select Algorithm" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="astar">A* Search</SelectItem>
      <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
      <SelectItem value="bfs">Breadth-First Search</SelectItem>
      <SelectItem value="dfs">Depth-First Search</SelectItem>
      <SelectItem value="bestfirst">Best-First Search</SelectItem>
    </SelectContent>
  </Select>
)}
```

### 5. Testing the Algorithm

To test your new pathfinding algorithm:

1. Start the application and navigate to the Pathfinding page
2. Select your algorithm from the dropdown
3. Configure the grid with start/end points and obstacles
4. Click "Visualize" to run the animation
5. Verify that:
   - The animation correctly shows the node exploration process
   - A path is found from start to end (if one exists)
   - Performance metrics are accurate
   - The algorithm behaves as expected with different grid configurations

## Advanced Customization

### Custom Visualization States

If your algorithm needs custom visualization states beyond the defaults:

1. Add new state types to the appropriate type definition in `shared/schema.ts`

For sorting:
```typescript
export type ArrayElement = {
  value: number;
  state: 'default' | 'comparing' | 'sorted' | 'outOfPlace' | 'yourCustomState';
};
```

2. Update the visualization component to handle the new state:

For Array.tsx:
```typescript
const getBarColor = (state: ArrayElement['state']) => {
  switch (state) {
    // ...existing cases...
    case 'yourCustomState':
      return 'bg-purple-500 dark:bg-purple-700';
    default:
      return 'bg-blue-500 dark:bg-blue-700';
  }
};
```

### Algorithm-Specific Controls

If your algorithm requires unique controls:

1. Modify the Controls component to conditionally render algorithm-specific UI:

```typescript
{algorithm === 'yourAlgorithm' && (
  <div className="flex items-center space-x-2">
    <Label htmlFor="your-parameter">Your Parameter</Label>
    <Input
      id="your-parameter"
      type="number"
      value={yourParameter}
      onChange={(e) => setYourParameter(parseInt(e.target.value))}
      min={1}
      max={100}
      className="w-20"
    />
  </div>
)}
```

2. Pass the custom parameters to your algorithm function.

## Best Practices

When implementing new algorithms, follow these best practices:

1. **Preserve Input Data**: Never modify the input data directly; always work with copies
2. **Track States Incrementally**: Record the state after each significant change to the data structure
3. **Count Operations**: Keep accurate counts of operations (comparisons, swaps, etc.)
4. **Add Detailed Comments**: Explain complex parts of the algorithm, especially visualization state changes
5. **Handle Edge Cases**: Ensure your algorithm works with empty inputs, single elements, etc.
6. **Provide Complexity Information**: Include accurate time and space complexity details
7. **Test Thoroughly**: Test with various inputs, sizes, and special cases
8. **Optimize for Animation**: Balance algorithm efficiency with clear visualization steps