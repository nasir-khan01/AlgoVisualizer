# Algorithm Visualization Tool (AlgorithmViz)

An interactive platform for visualizing sorting and pathfinding algorithms with step-by-step animations and performance metrics.

![AlgorithmViz Logo](generated-icon.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Architecture](#architecture)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Data Flow](#data-flow)
- [Algorithm Implementations](#algorithm-implementations)
  - [Sorting Algorithms](#sorting-algorithms)
  - [Pathfinding Algorithms](#pathfinding-algorithms)
- [Animation System](#animation-system)
- [Contributing](#contributing)
  - [Adding New Algorithms](#adding-new-algorithms)
  - [Improving Visualizations](#improving-visualizations)
  - [Coding Standards](#coding-standards)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Overview

AlgorithmViz is a full-stack web application designed to help users understand complex algorithms through interactive visualizations. The application provides step-by-step animations of various sorting and pathfinding algorithms, along with detailed performance metrics and complexity analysis.

## Features

- **Interactive Visualizations**: Watch algorithms execute in real-time with adjustable speed controls
- **Multiple Algorithm Categories**:
  - Sorting Algorithms (QuickSort, MergeSort, BubbleSort, HeapSort, InsertionSort)
  - Pathfinding Algorithms (A*, Dijkstra, BFS, DFS)
- **Performance Metrics**: Track metrics like comparisons, swaps, nodes visited, and execution time
- **Educational Information**: Learn about each algorithm's time and space complexity
- **Customizable Controls**:
  - Adjust animation speed
  - Toggle between visualization modes
  - Create custom algorithm inputs
- **Dark/Light Theme Support**: Toggle between dark and light modes for comfortable viewing
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Project Structure

```
/
├── client/                  # Frontend code
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/          # UI components (shadcn)
│   │   │   └── visualization/ # Visualization-specific components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and algorithm implementations
│   │   │   └── algorithms/  # Algorithm implementations
│   │   ├── pages/           # Page components
│   │   └── types/           # TypeScript type definitions
│   └── index.html           # HTML entry point
├── server/                  # Backend code
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes
│   ├── storage.ts           # Storage interface and implementations
│   └── vite.ts              # Vite development server configuration
├── shared/                  # Shared code between client and server
│   └── schema.ts            # Database schema and type definitions
└── components.json          # Shadcn UI components configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/algorithm-visualization-tool.git
cd algorithm-visualization-tool
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`.

## Architecture

### Frontend

The frontend is built with React, TypeScript, and Vite. It uses:

- **Wouter**: For lightweight client-side routing
- **Shadcn UI**: For component-based UI design
- **TailwindCSS**: For styling
- **React Query**: For API data fetching and caching
- **Custom Hooks**: For state management and algorithm implementation

### Backend

The backend is built with Express.js and TypeScript. It provides:

- **RESTful API**: Endpoints for storing and retrieving algorithm execution results
- **In-memory Storage**: For storing application data during development
- **Type-safe Routes**: Using TypeScript for type safety

### Data Flow

1. User selects an algorithm and input parameters
2. Frontend executes the algorithm and generates animation frames
3. Animation system visualizes each step of the algorithm
4. Performance metrics are calculated and displayed
5. Results can be saved to the backend (optional)

## Algorithm Implementations

### Sorting Algorithms

Located in `client/src/lib/algorithms/sorting/`:

- **QuickSort**: A divide-and-conquer algorithm that picks a pivot and partitions the array
- **MergeSort**: A divide-and-conquer algorithm that divides and merges sorted subarrays
- **BubbleSort**: A simple algorithm that repeatedly swaps adjacent elements if they're in the wrong order
- **HeapSort**: Uses a binary heap data structure to sort elements
- **InsertionSort**: Builds the sorted array one item at a time

Each sorting algorithm:
1. Takes an input array
2. Returns an object containing all intermediate states and performance metrics
3. Supports visualization by tracking element comparisons and swaps

### Pathfinding Algorithms

Located in `client/src/lib/algorithms/pathfinding/`:

- **A\* (A-Star)**: Uses heuristics to find the shortest path efficiently
- **Dijkstra's Algorithm**: Finds the shortest path for weighted graphs
- **Breadth-First Search (BFS)**: Explores all neighbor nodes at the present depth before moving to nodes at the next depth
- **Depth-First Search (DFS)**: Explores as far as possible along each branch before backtracking

Each pathfinding algorithm:
1. Takes a grid of nodes, start position, and end position
2. Returns visited nodes in order and the final path
3. Supports visualization through node state tracking

## Animation System

The animation system is implemented in `client/src/hooks/useAnimation.ts` and provides:

- **Frame-by-frame Animation**: Visualize each step of the algorithm execution
- **Adjustable Speed**: Control animation speed with logarithmic scaling for smoother transitions
- **Playback Controls**: Start, pause, resume, and reset animations
- **Real-time Metrics**: Track and display algorithm performance metrics during animation

Key animation system features:

```typescript
const {
  isAnimating,   // Whether an animation is currently running
  isPaused,      // Whether the animation is paused
  metrics,       // Current performance metrics
  startAnimation, // Start a new animation
  pauseAnimation, // Pause the current animation
  resumeAnimation, // Resume a paused animation
  resetAnimation, // Reset the animation to initial state
  setSpeed       // Adjust animation speed
} = useAnimation<T>();
```

## Contributing

### Adding New Algorithms

To add a new algorithm:

1. **Create an implementation**:
   - For sorting: Add a new file in `client/src/lib/algorithms/sorting/`
   - For pathfinding: Add a new file in `client/src/lib/algorithms/pathfinding/`

2. **Update the schema**:
   - Add the new algorithm to the appropriate type in `shared/schema.ts`

3. **Add UI controls**:
   - Update the algorithm selection in `client/src/components/visualization/Controls.tsx`

4. **Add algorithm information**:
   - Include performance characteristics in the appropriate page component

### Improving Visualizations

To enhance the visualization components:

1. Modify the relevant component in `client/src/components/visualization/`
2. Ensure animations remain smooth and accurate
3. Consider accessibility when making visual changes

### Coding Standards

- Use TypeScript for type safety
- Follow the existing project structure
- Use React hooks for state management
- Write clean, documented code
- Add tests for new functionality

## Future Enhancements

- Additional algorithm categories (graph algorithms, tree algorithms)
- User accounts and saved algorithm executions
- Algorithm comparison mode
- Custom algorithm editor
- Exporting visualizations as GIFs or videos
- Integration with educational content

## License

This project is licensed under the MIT License - see the LICENSE file for details.