import { useState } from "react";
import Grid from "@/components/visualization/Grid";
import Controls from "@/components/visualization/Controls";
import { useAlgorithm } from "@/hooks/useAlgorithm";
import { useAnimation } from "@/hooks/useAnimation";
import {
  GridNode,
  Tool,
  PathfindingAlgorithm,
  AlgorithmMetrics,
} from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Pathfinding = () => {
  const [gridSize, setGridSize] = useState({ rows: 20, cols: 20 });
  const [selectedTool, setSelectedTool] = useState<Tool>("wall");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<PathfindingAlgorithm>("astar");
  const [animationSpeed, setAnimationSpeed] = useState(50); // 1-100
  
  const {
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
  } = useAlgorithm(gridSize);

  const { 
    isAnimating, 
    isPaused,
    metrics,
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
    setSpeed
  } = useAnimation<GridNode>();

  const handleVisualizeClick = async () => {
    if (!startNode || !endNode) {
      alert("Please set start and end points");
      return;
    }
    
    // If animation is running, pause it
    if (isAnimating && !isPaused) {
      console.log("Pausing animation");
      pauseAnimation();
      return;
    }
    
    // If animation is paused, resume it
    if (isAnimating && isPaused) {
      console.log("Resuming animation");
      resumeAnimation();
      return;
    }
    
    // Reset animation before starting a new one
    resetAnimation();
    
    // Clear previous path before starting new animation
    clearPath();
    
    const walls = getWalls();
    const weights = getWeights();
    
    const params = {
      gridSize,
      startNode: { row: startNode.row, col: startNode.col },
      endNode: { row: endNode.row, col: endNode.col },
      algorithm: selectedAlgorithm,
      walls,
      weights
    };
    
    try {
      // Record the start of execution for time calculation
      const startTime = performance.now();
      
      // We'll fetch the specific algorithm implementation dynamically
      /* @vite-ignore */
      console.log(`Loading pathfinding algorithm: ${selectedAlgorithm}`);
      const algorithm = await import(`../lib/algorithms/pathfinding/${selectedAlgorithm}.ts`);
      console.log("Pathfinding algorithm loaded:", algorithm);
      const result = algorithm.default(grid, startNode, endNode);
      
      // Calculate execution time
      const endTime = performance.now();
      const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
      
      // Create metrics
      const algorithmMetrics: AlgorithmMetrics = {
        nodesVisited: result.visitedNodesInOrder.length,
        pathLength: result.path ? result.path.length : 0,
        timeElapsed,
        timeComplexity: getTimeComplexity(selectedAlgorithm)
      };
      
      // Start animation with visited nodes first, then path
      startAnimation(
        [...result.visitedNodesInOrder, ...(result.path || [])],
        (node: GridNode, index: number) => {
          // The animation callback - will be called for each node during animation
          if (index < result.visitedNodesInOrder.length) {
            // We're animating visited nodes
            if (node.type !== "start" && node.type !== "end") {
              const cellElement = document.getElementById(`node-${node.row}-${node.col}`);
              if (cellElement) {
                const innerDiv = cellElement.querySelector('div');
                if (innerDiv) {
                  innerDiv.className = "absolute inset-0 bg-blue-300 dark:bg-blue-800";
                }
              }
            }
          } else {
            // We're animating the path
            if (node.type !== "start" && node.type !== "end") {
              const cellElement = document.getElementById(`node-${node.row}-${node.col}`);
              if (cellElement) {
                const innerDiv = cellElement.querySelector('div');
                if (innerDiv) {
                  innerDiv.className = "absolute inset-0 bg-green-400 dark:bg-green-600";
                }
              }
            }
          }
        },
        algorithmMetrics,
        animationSpeed
      );
      
      
      // Log the execution to the backend - REMOVED
      /* 
      await apiRequest("POST", "/api/algorithm-results", {
        algorithm_type: "pathfinding",
        algorithm_name: selectedAlgorithm,
        params,
        metrics: algorithmMetrics,
        created_at: new Date().toISOString()
      });
      */
      
    } catch (error) {
      console.error("Error visualizing algorithm:", error);
    }
  };
  
  // Helper function to get time complexity string based on algorithm
  const getTimeComplexity = (algorithm: PathfindingAlgorithm): string => {
    switch (algorithm) {
      case "astar":
        return "O(E log V)";
      case "dijkstra":
        return "O(E + V log V)";
      case "bfs":
        return "O(V + E)";
      case "dfs":
        return "O(V + E)";
      default:
        return "Unknown";
    }
  };
  
  const handleResetClick = () => {
    resetAnimation();
    clearGrid();
  };
  
  const handleClearPathClick = () => {
    resetAnimation();
    clearPath();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
      <section className="mb-16">
        <Card>
          <CardHeader className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <CardTitle>Pathfinding Visualization</CardTitle>
            <CardDescription>
              Visualize how different pathfinding algorithms work
            </CardDescription>
          </CardHeader>

          <div className="md:flex">
            {/* Controls Panel */}
            <Controls
              type="pathfinding"
              algorithm={selectedAlgorithm}
              onAlgorithmChange={(algo) => setSelectedAlgorithm(algo as PathfindingAlgorithm)}
              gridSize={gridSize}
              onGridSizeChange={setGridSize}
              selectedTool={selectedTool}
              onToolChange={setSelectedTool}
              speed={animationSpeed}
              onSpeedChange={(newSpeed) => {
                setAnimationSpeed(newSpeed);
                if (isAnimating) {
                  // If animation is running, also update the animation speed
                  setSpeed(newSpeed);
                }
              }}
              onVisualize={handleVisualizeClick}
              onReset={handleResetClick}
              onClearPath={handleClearPathClick}
              onGenerateMaze={generateMaze}
              isAnimating={isAnimating}
              isPaused={isPaused}
            />

            {/* Grid Visualization */}
            <div className="p-4 flex-1">
              <Grid
                grid={grid}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
                selectedTool={selectedTool}
                isAnimating={isAnimating}
              />

              {/* Metrics and Stats */}
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm Metrics</h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Nodes Visited</p>
                    <p className="text-lg font-mono">{metrics?.nodesVisited || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Path Length</p>
                    <p className="text-lg font-mono">{metrics?.pathLength || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time Elapsed</p>
                    <p className="text-lg font-mono">{metrics?.timeElapsed?.toFixed(2) || '0.00'}s</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Time Complexity</p>
                    <p className="text-lg font-mono">{metrics?.timeComplexity || getTimeComplexity(selectedAlgorithm)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Pathfinding;
