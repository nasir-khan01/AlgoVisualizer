import { useState, useEffect } from "react";
import Array from "@/components/visualization/Array";
import Controls from "@/components/visualization/Controls";
import { useAnimation } from "@/hooks/useAnimation";
import { apiRequest } from "@/lib/queryClient";
import { ArrayElement, SortingAlgorithm, AlgorithmMetrics } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Sorting = () => {
  const [arraySize, setArraySize] = useState(40);
  const [array, setArray] = useState<ArrayElement[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>("quicksort");
  const [animationSpeed, setAnimationSpeed] = useState(50); // 1-100

  const { 
    isAnimating, 
    isPaused,
    metrics,
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    resetAnimation
  } = useAnimation<{ array: ArrayElement[], indices?: number[] }>();

  // Initialize or randomize the array
  const randomizeArray = () => {
    console.log("Randomizing array and resetting animation");
    
    // First reset the animation completely
    resetAnimation();
    
    // Reset preparing state
    setPreparing(false);
    
    // Then generate a new array
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10, // Random value between 10-99
        state: "default" as const
      });
    }
    
    // Set the new array
    setArray(newArray);
  };

  // Initialize array on component mount or when size changes
  useEffect(() => {
    randomizeArray();
  }, []);
  
  // Re-randomize array when array size changes
  useEffect(() => {
    randomizeArray();
  }, [arraySize]);

  // Handle start/stop sorting button click
  const handleSortClick = async () => {
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
    
    // Clear any running animation before starting a new one
    resetAnimation();
    
    try {
      // Set preparing state to true
      setPreparing(true);
      
      // Reset array states
      const initialArray = array.map(el => ({ ...el, state: "default" as const }));
      setArray(initialArray);
      
      // Record start time for metrics
      const startTime = performance.now();
      
      // Log the algorithm we're trying to load
      console.log(`Loading algorithm: ${selectedAlgorithm}`);
      
      // Import the sorting algorithm dynamically
      /* @vite-ignore */
      // Convert algorithm names to match file names (camelCase vs. PascalCase)
      const algorithmFileName = selectedAlgorithm === 'quicksort' ? 'quickSort' :
                               selectedAlgorithm === 'mergesort' ? 'mergeSort' :
                               selectedAlgorithm === 'bubblesort' ? 'bubbleSort' :
                               selectedAlgorithm === 'heapsort' ? 'heapSort' :
                               selectedAlgorithm === 'insertionsort' ? 'insertionSort' :
                               selectedAlgorithm;
      
      console.log(`Mapped algorithm name: ${selectedAlgorithm} -> ${algorithmFileName}`);
      const algorithm = await import(`../lib/algorithms/sorting/${algorithmFileName}.ts`);
      console.log("Algorithm loaded:", algorithm);
      
      // Get the animation frames from the algorithm
      const frames = algorithm.default([...initialArray.map(el => el.value)]);
      console.log("Animation frames generated:", frames);
      
      // Calculate execution time
      const endTime = performance.now();
      const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
      
      // Create metrics
      const algorithmMetrics: AlgorithmMetrics = {
        comparisons: frames.comparisons,
        swaps: frames.swaps,
        timeElapsed,
        timeComplexity: getTimeComplexity(selectedAlgorithm)
      };
      
      // Reset preparing state
      setPreparing(false);
      
      // Start animation with the frames
      startAnimation(
        frames.states,
        (frame) => {
          // Animation callback - update array during animation
          setArray(frame.array);
        },
        algorithmMetrics,
        animationSpeed
      );
      
      // Log the execution to the backend
      await apiRequest("POST", "/api/algorithm-results", {
        algorithm_type: "sorting",
        algorithm_name: selectedAlgorithm,
        params: {
          arraySize,
          algorithm: selectedAlgorithm,
          initialArray: initialArray.map(el => el.value)
        },
        metrics: algorithmMetrics,
        created_at: new Date().toISOString()
      });
      
    } catch (error) {
      console.error("Error during sorting:", error);
      console.error("Error details:", {
        algorithm: selectedAlgorithm,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      });
      
      // Make sure to reset preparing state on error
      setPreparing(false);
    }
  };
  
  // Preparing state for algorithm metrics
  const [preparing, setPreparing] = useState(false);

  // Helper function to get time complexity string based on algorithm
  const getTimeComplexity = (algorithm: SortingAlgorithm): string => {
    switch (algorithm) {
      case "quicksort":
        return "O(n log n)";
      case "mergesort":
        return "O(n log n)";
      case "heapsort":
        return "O(n log n)";
      case "bubblesort":
        return "O(n²)";
      case "insertionsort":
        return "O(n²)";
      default:
        return "Unknown";
    }
  };

  // Helper function to get best/worst case complexity
  const getComplexityDetails = (algorithm: SortingAlgorithm): { best: string, average: string, worst: string, space: string } => {
    switch (algorithm) {
      case "quicksort":
        return {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n²)",
          space: "O(log n)"
        };
      case "mergesort":
        return {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n log n)",
          space: "O(n)"
        };
      case "heapsort":
        return {
          best: "Ω(n log n)",
          average: "Θ(n log n)",
          worst: "O(n log n)",
          space: "O(1)"
        };
      case "bubblesort":
        return {
          best: "Ω(n)",
          average: "Θ(n²)",
          worst: "O(n²)",
          space: "O(1)"
        };
      case "insertionsort":
        return {
          best: "Ω(n)",
          average: "Θ(n²)",
          worst: "O(n²)",
          space: "O(1)"
        };
      default:
        return {
          best: "-",
          average: "-",
          worst: "-",
          space: "-"
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-16">
        <Card>
          <CardHeader className="px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            <CardTitle>Sorting Visualization</CardTitle>
            <CardDescription>
              Visualize how different sorting algorithms organize data
            </CardDescription>
          </CardHeader>

          <div className="md:flex">
            {/* Controls Panel */}
            <Controls
              type="sorting"
              algorithm={selectedAlgorithm}
              onAlgorithmChange={(algo) => setSelectedAlgorithm(algo as SortingAlgorithm)}
              arraySize={arraySize}
              onArraySizeChange={setArraySize}
              speed={animationSpeed}
              onSpeedChange={setAnimationSpeed}
              onVisualize={handleSortClick}
              onReset={randomizeArray}
              isAnimating={isAnimating}
              isPaused={isPaused}
            />

            {/* Array Visualization */}
            <div className="p-4 flex-1">
              <Array
                array={array}
                isAnimating={isAnimating}
              />

              {/* Legend */}
              <div className="mt-4 flex space-x-4 justify-center flex-wrap">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 dark:bg-blue-600 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Unsorted</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Currently Comparing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Out of Place</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sorted</span>
                </div>
              </div>

              {/* Metrics and Stats */}
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm Metrics</h4>
                
                {preparing ? (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Preparing {selectedAlgorithm} algorithm...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Current Execution Metrics */}
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Comparisons</p>
                        <p className="text-lg font-mono">{metrics?.comparisons || 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Swaps</p>
                        <p className="text-lg font-mono">{metrics?.swaps || 0}</p>
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
                    
                    {/* Algorithm Complexity Details */}
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h5 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Algorithm Complexity Analysis</h5>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Best Case</p>
                          <p className="text-sm font-mono">{getComplexityDetails(selectedAlgorithm).best}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Average Case</p>
                          <p className="text-sm font-mono">{getComplexityDetails(selectedAlgorithm).average}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Worst Case</p>
                          <p className="text-sm font-mono">{getComplexityDetails(selectedAlgorithm).worst}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-500">Space Complexity</p>
                          <p className="text-sm font-mono">{getComplexityDetails(selectedAlgorithm).space}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Sorting;
