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
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 90) + 10, // Random value between 10-99
        state: "default"
      });
    }
    setArray(newArray);
    resetAnimation();
  };

  // Initialize array on component mount or when size changes
  useEffect(() => {
    randomizeArray();
  }, []);
  
  // Re-randomize array when array size changes
  useEffect(() => {
    randomizeArray();
  }, [arraySize]);

  // Handle start sorting button click
  const handleSortClick = async () => {
    if (isAnimating && !isPaused) {
      pauseAnimation();
      return;
    }
    
    if (isAnimating && isPaused) {
      resumeAnimation();
      return;
    }
    
    try {
      // Reset array states
      const initialArray = array.map(el => ({ ...el, state: "default" }));
      setArray(initialArray);
      
      // Record start time for metrics
      const startTime = performance.now();
      
      // Import the sorting algorithm dynamically
      const algorithm = await import(`@/lib/algorithms/sorting/${selectedAlgorithm}`);
      
      // Get the animation frames from the algorithm
      const frames = algorithm.default([...initialArray.map(el => el.value)]);
      
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
    }
  };
  
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
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Sorting;
