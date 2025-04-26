# AlgorithmViz Technical Documentation

This document provides detailed technical information about the architecture, components, and implementation details of the AlgorithmViz application. It's intended for developers who want to understand the codebase in-depth or contribute to the project.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Frontend Architecture](#frontend-architecture)
  - [Component Structure](#component-structure)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Theming](#theming)
- [Core Visualization System](#core-visualization-system)
  - [Animation Engine](#animation-engine)
  - [Performance Metrics](#performance-metrics)
- [Algorithm Implementations](#algorithm-implementations)
  - [Sorting Algorithms](#sorting-algorithms)
  - [Pathfinding Algorithms](#pathfinding-algorithms)
- [API and Data Flow](#api-and-data-flow)
- [Type System](#type-system)
- [Performance Considerations](#performance-considerations)
- [Debugging Tools](#debugging-tools)
- [Known Issues and Workarounds](#known-issues-and-workarounds)

## Architecture Overview

AlgorithmViz is built using a modern React frontend with TypeScript and a lightweight Express backend. The application uses:

- **React + TypeScript**: For building the UI and ensuring type safety
- **Express.js**: For the backend API
- **Wouter**: For client-side routing
- **TanStack Query (React Query)**: For API data fetching
- **Shadcn UI + TailwindCSS**: For styling and UI components
- **In-memory Storage**: For data persistence during development

The application is structured to separate concerns:

1. **UI Components**: Reusable, presentational components
2. **Algorithm Logic**: Pure functions for algorithm implementation
3. **Animation System**: Manages the visualization of algorithm execution
4. **API Layer**: Handles data persistence and retrieval

## Frontend Architecture

### Component Structure

The React component hierarchy follows a logical structure:

```
App
├── Navbar
├── Router
│   ├── Home
│   ├── Sorting
│   │   ├── Controls
│   │   ├── Array (Visualization)
│   │   └── Metrics Display
│   ├── Pathfinding
│   │   ├── Controls
│   │   ├── Grid (Visualization)
│   │   └── Metrics Display
│   └── About
└── Footer
```

Key components include:

- **Visualization Components** (`client/src/components/visualization/`):
  - `Array.tsx`: Renders the array elements for sorting visualizations
  - `Grid.tsx`: Renders the grid for pathfinding visualizations
  - `Controls.tsx`: Unified controls component for both visualization types

- **UI Components** (`client/src/components/ui/`):
  - Shadcn UI components for consistent styling
  - Custom UI elements specific to the application

- **Page Components** (`client/src/pages/`):
  - Container components that integrate various UI components
  - Handle page-specific logic and state

### State Management

The application uses React hooks for state management. Key custom hooks include:

- **`useAnimation`** (`client/src/hooks/useAnimation.ts`):
  - Manages animation state and playback controls
  - Handles animation timing and frame-by-frame rendering
  - Tracks performance metrics during animation

- **`useAlgorithm`** (`client/src/hooks/useAlgorithm.ts`):
  - Implements algorithm selection and execution
  - Manages input data (array or grid)
  - Generates visualization states

- **`useTheme`** (`client/src/hooks/useTheme.ts`):
  - Manages dark/light theme switching
  - Persists theme preference to localStorage

### Routing

Client-side routing is implemented using Wouter:

```typescript
// Excerpt from App.tsx
const Router = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sorting" component={Sorting} />
        <Route path="/pathfinding" component={Pathfinding} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
```

### Theming

The application supports light and dark themes using the Tailwind CSS dark mode:

```typescript
// Excerpt from useTheme.ts
function setTheme(newTheme: Theme) {
  const root = window.document.documentElement;
  
  if (newTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  
  localStorage.setItem("theme", newTheme);
  setCurrentTheme(newTheme);
}
```

## Core Visualization System

### Animation Engine

The animation engine is the heart of the visualization system. It's implemented in `useAnimation.ts` and provides:

```typescript
// Key features of useAnimation hook
interface AnimationHook<T> {
  isAnimating: boolean;
  isPaused: boolean;
  metrics: AlgorithmMetrics | null;
  startAnimation: (steps: T[], callback: (step: T, index: number) => void, 
                  algorithmMetrics: AlgorithmMetrics, speed?: number, 
                  onComplete?: () => void) => void;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  resetAnimation: () => void;
  setSpeed: (speed: number) => void;
}
```

Implementation details:

1. **Animation Steps**: Each algorithm generates a series of steps (frames) that represent the algorithm's execution
2. **RequestAnimationFrame**: Used for smooth animations with controlled timing
3. **Refs for Callbacks**: Uses React refs to store callback functions and animation state
4. **Dynamic Speed Adjustment**: Logarithmic scaling for more intuitive speed controls
5. **State Tracking**: Keeps track of current animation state (running, paused, completed)

### Performance Metrics

The application tracks various metrics during algorithm execution:

- **Time Complexity**: Theoretical complexity displayed to users
- **Actual Performance**: Real-time tracking of:
  - Comparisons and swaps (sorting)
  - Nodes visited and path length (pathfinding)
  - Execution time

```typescript
// Metrics interface from shared/schema.ts
export type AlgorithmMetrics = {
  nodesVisited?: number;
  pathLength?: number;
  comparisons?: number;
  swaps?: number;
  timeElapsed: number;
  timeComplexity: string;
};
```

## Algorithm Implementations

### Sorting Algorithms

Each sorting algorithm is implemented as a pure function that takes an array of numbers and returns an object containing:

1. The steps (states) of the algorithm's execution
2. Performance metrics (comparisons, swaps)

Example implementation pattern:

```typescript
// Simplified QuickSort implementation pattern
const quickSort = (array: number[]): SortingAlgorithmResult => {
  const states: SortingAnimationFrame[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  // Clone the input array to avoid mutations
  const arr = [...array].map(value => ({ value, state: 'default' as const }));
  
  // Record initial state
  states.push({ array: [...arr] });
  
  // Recursive implementation
  const sort = (low: number, high: number) => {
    if (low < high) {
      // Partition and get pivot index
      const pivotIndex = partition(arr, low, high);
      
      // Recursively sort sub-arrays
      sort(low, pivotIndex - 1);
      sort(pivotIndex + 1, high);
    }
  };
  
  const partition = (arr: ArrayElement[], low: number, high: number) => {
    // Implementation details...
    // Each comparison increments the comparisons counter
    // Each swap increments the swap counter and adds a new state to states array
    
    return pivotIndex;
  };
  
  // Start the sort
  sort(0, arr.length - 1);
  
  return { states, comparisons, swaps };
};
```

### Pathfinding Algorithms

Pathfinding algorithms operate on a grid data structure and return:

1. Nodes visited in the order they were explored
2. The final path from start to end (if found)

Example implementation pattern:

```typescript
// Simplified A* algorithm implementation pattern
const astar = (grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingAlgorithmResult => {
  const visitedNodesInOrder: GridNode[] = [];
  const openSet: GridNode[] = [startNode];
  const closedSet: Set<string> = new Set();
  
  // Set initial properties
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, endNode);
  
  while (openSet.length > 0) {
    // Get node with lowest fScore
    const currentNode = openSet.reduce((min, node) => 
      node.fScore < min.fScore ? node : min, openSet[0]);
      
    // Record visit
    visitedNodesInOrder.push(currentNode);
    
    // Check if reached the end
    if (currentNode === endNode) {
      return {
        visitedNodesInOrder,
        path: reconstructPath(endNode)
      };
    }
    
    // Process neighbors
    // Implementation details...
  }
  
  // No path found
  return {
    visitedNodesInOrder,
    path: []
  };
};
```

## API and Data Flow

The application uses a simple Express backend for data persistence:

```typescript
// Routes defined in server/routes.ts
export async function registerRoutes(app: Express): Promise<Server> {
  // Get all algorithm results
  app.get('/api/algorithm-results', async (_req, res) => {
    const results = await storage.getAlgorithmResults();
    res.json(results);
  });

  // Get algorithm results by type
  app.get('/api/algorithm-results/:type', async (req, res) => {
    const results = await storage.getAlgorithmResultsByType(req.params.type);
    res.json(results);
  });

  // Save algorithm result
  app.post('/api/algorithm-results', async (req, res) => {
    try {
      const resultData = insertAlgorithmResultSchema.parse(req.body);
      const savedResult = await storage.saveAlgorithmResult(resultData);
      res.status(201).json(savedResult);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid data' });
    }
  });

  // Start HTTP server
  const server = app.listen(5000, () => {
    log(`serving on port 5000`);
  });

  return server;
}
```

Data flow for algorithm execution:

1. User selects algorithm and input parameters
2. Frontend executes algorithm and generates visualization frames
3. Animation system controls the display of these frames
4. Results can be saved to backend for reference

## Type System

The application uses TypeScript for type safety. Key types are defined in `shared/schema.ts`:

```typescript
// Core types for the application
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
```

## Performance Considerations

Performance is critical for smooth animations and responsive UI:

1. **Memoization**: React's `useMemo` and `useCallback` hooks are used to prevent unnecessary re-renders
2. **Optimized Animation Loop**: Uses `requestAnimationFrame` and controlled timeouts for smooth animations
3. **Batch Updates**: State updates are batched where possible to minimize re-renders
4. **Debounced Controls**: Input controls use debouncing to prevent excessive updates

Example of optimization in animation:

```typescript
// Logarithmic scaling for animation speed (excerpt from useAnimation.ts)
const getTimeout = useCallback((speed: number) => {
  // Convert speed (1-100) to timeout with a more gradual decrease
  // Speed 1 = 1000ms (slowest), Speed 100 = 10ms (fastest)
  const maxDelay = 1000; // 1 second for slowest
  const minDelay = 10; // 10ms for fastest
  
  // Use a logarithmic function to map speed to delay for a more gradual change
  const normalizedSpeed = speed / 100; // 0.01 to 1
  const logFactor = 20; // Controls the curve of the logarithmic function
  
  // Calculate delay with a logarithmic curve
  const delay = maxDelay - (maxDelay - minDelay) * 
    (Math.log(1 + normalizedSpeed * logFactor) / Math.log(1 + logFactor));
  
  return Math.round(delay);
}, []);
```

## Debugging Tools

The application includes several debugging tools:

1. **Console Logging**: Strategic console logs for tracking animation and algorithm execution
2. **Visualization Options**: Toggles for different visualization modes
3. **State Inspection**: The UI displays current algorithm state and metrics

## Known Issues and Workarounds

### Animation Stability

**Issue**: Animation may become unstable when rapidly toggling display options during execution.

**Workaround**: Added a small delay when toggling the array table visualization:

```typescript
<Switch 
  id="show-array-table" 
  checked={showArrayTable}
  onCheckedChange={(checked) => {
    // Small delay to avoid state issues during animation
    setTimeout(() => {
      setShowArrayTable(checked);
    }, 5);
  }}
/>
```

### Sorting Animation Edge Cases

**Issue**: Sorting animation can get stuck when reaching the end of the animation and trying to resume.

**Workaround**: Added special handling in the resumeAnimation function:

```typescript
// If we're at the end of the animation, restart from the beginning
if (currentStepRef.current >= stepsRef.current.length) {
  console.log("Restarting animation from the beginning");
  currentStepRef.current = 0;
}
```

### Nested Link Issue

**Issue**: Warning about nested <a> tags in the navigation using Wouter's Link component.

**Status**: This is a known issue with Wouter when using the Link component in certain ways. It doesn't affect functionality but does show warnings in the console.