# AlgorithmViz User Guide

Welcome to AlgorithmViz! This guide will help you get the most out of this algorithm visualization tool.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Sorting Algorithms](#sorting-algorithms)
  - [Available Sorting Algorithms](#available-sorting-algorithms)
  - [Using the Sorting Visualizer](#using-the-sorting-visualizer)
  - [Understanding the Visualization](#understanding-the-visualization)
  - [Sorting Controls](#sorting-controls)
- [Pathfinding Algorithms](#pathfinding-algorithms)
  - [Available Pathfinding Algorithms](#available-pathfinding-algorithms)
  - [Using the Pathfinding Visualizer](#using-the-pathfinding-visualizer)
  - [Grid Tools](#grid-tools)
  - [Pathfinding Controls](#pathfinding-controls)
- [Performance Metrics](#performance-metrics)
- [Theme Settings](#theme-settings)
- [Tips and Tricks](#tips-and-tricks)
- [Troubleshooting](#troubleshooting)

## Introduction

AlgorithmViz is an interactive tool designed to help you visualize and understand how various algorithms work. By animating the execution of sorting and pathfinding algorithms, you can see step-by-step how these algorithms solve problems.

Key features include:
- Animated visualizations of sorting algorithms
- Interactive grid-based pathfinding visualization
- Performance metrics tracking
- Adjustable animation speed
- Multiple visualization modes
- Dark/light theme support

## Getting Started

When you first open AlgorithmViz, you'll see the home page with two main categories:

1. **Sorting Algorithms** - Visualize how arrays are sorted using different techniques
2. **Pathfinding Algorithms** - Visualize how algorithms find paths through a grid with obstacles

Click on either card to go to the respective visualization page.

## Sorting Algorithms

### Available Sorting Algorithms

AlgorithmViz includes the following sorting algorithms:

1. **Quick Sort** - A divide-and-conquer algorithm that picks a pivot element and partitions the array around it
   - Average Time Complexity: O(n log n)
   - Worst Time Complexity: O(n²)
   - Space Complexity: O(log n)

2. **Merge Sort** - A divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges
   - Average Time Complexity: O(n log n)
   - Worst Time Complexity: O(n log n)
   - Space Complexity: O(n)

3. **Bubble Sort** - A simple algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if needed
   - Average Time Complexity: O(n²)
   - Worst Time Complexity: O(n²)
   - Space Complexity: O(1)

4. **Heap Sort** - Builds a heap from the array and repeatedly extracts the maximum element
   - Average Time Complexity: O(n log n)
   - Worst Time Complexity: O(n log n)
   - Space Complexity: O(1)

5. **Insertion Sort** - Builds the sorted array one item at a time by shifting elements
   - Average Time Complexity: O(n²)
   - Worst Time Complexity: O(n²)
   - Space Complexity: O(1)

### Using the Sorting Visualizer

To use the sorting visualizer:

1. Select a sorting algorithm from the dropdown menu
2. Adjust the array size using the slider (smaller arrays make it easier to see what's happening)
3. Click the "Randomize Array" button to generate a new random array
4. Click "Visualize" to start the animation
5. Use the animation controls (pause/resume, reset, speed) to control the visualization

### Understanding the Visualization

The sorting visualization consists of bars representing array elements:
- Bar height corresponds to the element value
- Bar colors indicate the element's state:
  - Blue: Default state
  - Yellow: Currently being compared
  - Red: Out of place or about to be moved
  - Green: In its final sorted position

You can toggle additional visualization options:
- **Show Values**: Display the numeric value of each array element
- **Show Array Table**: Display the array as a table below the bar visualization

### Sorting Controls

- **Algorithm Selection**: Choose which sorting algorithm to visualize
- **Array Size**: Control how many elements are in the array (6-15)
- **Speed**: Adjust how quickly the animation progresses
- **Visualize/Stop**: Start or stop the animation
- **Reset**: Return to the initial unsorted array
- **Randomize Array**: Generate a new random array

## Pathfinding Algorithms

### Available Pathfinding Algorithms

AlgorithmViz includes the following pathfinding algorithms:

1. **A* (A-Star)** - Uses a heuristic to efficiently find the shortest path
   - Time Complexity: O(E log V)
   - Space Complexity: O(V)
   - Properties: Optimal, complete, uses heuristic

2. **Dijkstra's Algorithm** - Finds the shortest path between nodes in a weighted graph
   - Time Complexity: O(E + V log V)
   - Space Complexity: O(V)
   - Properties: Optimal, complete, does not use heuristic

3. **Breadth-First Search (BFS)** - Explores all neighbor nodes at the present depth before moving to nodes at the next depth
   - Time Complexity: O(V + E)
   - Space Complexity: O(V)
   - Properties: Optimal for unweighted graphs, complete

4. **Depth-First Search (DFS)** - Explores as far as possible along each branch before backtracking
   - Time Complexity: O(V + E)
   - Space Complexity: O(V)
   - Properties: Not optimal, complete, memory-efficient

### Using the Pathfinding Visualizer

To use the pathfinding visualizer:

1. Select a pathfinding algorithm from the dropdown menu
2. Use the grid tools to:
   - Place a start point (default: top-left)
   - Place an end point (default: bottom-right)
   - Draw walls/obstacles
   - Add weights (for weighted algorithms like A* and Dijkstra's)
3. Click "Visualize" to start the animation
4. Use the animation controls to manage the visualization

### Grid Tools

The pathfinding visualizer provides several tools for interacting with the grid:

- **Start Tool**: Place the starting point for the pathfinding algorithm
- **End Tool**: Place the destination point
- **Wall Tool**: Create obstacles that block the path
- **Weight Tool**: Add cells with higher "cost" (affects A* and Dijkstra's algorithms)
- **Erase Tool**: Remove walls, weights, or other elements

To use a tool:
1. Select it from the tools panel
2. Click or drag on the grid to apply the tool

### Pathfinding Controls

- **Algorithm Selection**: Choose which pathfinding algorithm to visualize
- **Grid Size**: Adjust the number of rows and columns in the grid
- **Speed**: Control how quickly the animation progresses
- **Visualize/Stop**: Start or stop the animation
- **Reset**: Clear all visited nodes and found paths, keeping walls and weights
- **Clear Path**: Remove only the visited nodes and found path
- **Clear All**: Reset the entire grid to its initial state
- **Generate Maze**: Create a random maze of walls (optional feature)

## Performance Metrics

As algorithms run, AlgorithmViz shows important performance metrics:

For sorting algorithms:
- Number of comparisons
- Number of swaps/moves
- Time elapsed
- Algorithm's theoretical time complexity

For pathfinding algorithms:
- Number of nodes visited
- Path length (if found)
- Time elapsed
- Algorithm's theoretical time complexity

These metrics help you understand how different algorithms perform under various conditions.

## Theme Settings

AlgorithmViz supports both light and dark themes. You can toggle between them using the theme button in the navigation bar (sun/moon icon).

## Tips and Tricks

1. **Start with small arrays** to better see how sorting algorithms work
2. **Use slower speeds** for complex algorithms to understand each step
3. **Toggle between visualization modes** to get different perspectives
4. **Create different maze patterns** to test pathfinding algorithms
5. **Compare algorithms** by running them on the same input and noting the differences in metrics

## Troubleshooting

Common issues and solutions:

1. **Visualization seems stuck**
   - Try clicking the "Reset" button
   - Adjust the speed to a slower setting
   - Refresh the page if needed

2. **Cannot place start/end nodes**
   - Make sure you have the correct tool selected
   - Check that you're not trying to place it on a wall
   - Try resetting the grid and starting again

3. **Animation is too fast/slow**
   - Use the speed slider to adjust the animation speed
   - For very complex operations, a slower speed helps with understanding

4. **Performance issues on large grids or arrays**
   - Reduce the grid size or array length
   - Close other browser tabs to free up resources
   - Try a different browser if problems persist