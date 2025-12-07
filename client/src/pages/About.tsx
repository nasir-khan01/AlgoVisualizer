import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-8">
      <section className="mb-16">
        <Card>
          <CardHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <CardTitle>About Algorithm Visualization Tool</CardTitle>
            <CardDescription>
              Learn about algorithms and how this tool helps visualize them
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is AlgoViz?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  AlgoViz is an interactive tool designed to help users understand how different algorithms work through step-by-step visualization. By seeing algorithms in action, users can gain intuition about their behavior, efficiency, and application.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Pathfinding Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">A* Algorithm</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      A* (pronounced "A-star") is a graph traversal and path search algorithm that combines the strengths of Dijkstra's algorithm and greedy best-first search. It uses a heuristic that estimates the cost from the current node to the goal. This allows A* to find the shortest path while typically exploring fewer nodes than Dijkstra's algorithm.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(E log V)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(V)</div>
                      <div><span className="font-medium">Completeness:</span> Yes (if the heuristic is admissible)</div>
                      <div><span className="font-medium">Optimality:</span> Yes (if the heuristic is admissible)</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Dijkstra's Algorithm</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Dijkstra's algorithm is a graph search algorithm that finds the shortest path from a starting node to all other nodes in a weighted graph. It works by greedily selecting the node with the smallest tentative distance, updating the distances to adjacent nodes, and repeating until all nodes have been visited.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(E + V log V) with a priority queue</div>
                      <div><span className="font-medium">Space Complexity:</span> O(V)</div>
                      <div><span className="font-medium">Completeness:</span> Yes</div>
                      <div><span className="font-medium">Optimality:</span> Yes (for non-negative weights)</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Breadth-First Search (BFS)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      BFS is an algorithm for traversing graph data structures. It starts at a source node and explores all neighbor nodes at the present depth before moving on to nodes at the next depth level. This makes it suitable for finding the shortest path in unweighted graphs.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(V + E)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(V)</div>
                      <div><span className="font-medium">Completeness:</span> Yes</div>
                      <div><span className="font-medium">Optimality:</span> Yes (for unweighted graphs)</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">Depth-First Search (DFS)</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      DFS is an algorithm for traversing graph data structures. It starts at a source node and explores as far as possible along each branch before backtracking. This makes it memory-efficient for exploring graphs, but it does not guarantee the shortest path.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(V + E)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(V)</div>
                      <div><span className="font-medium">Completeness:</span> Yes (for finite graphs)</div>
                      <div><span className="font-medium">Optimality:</span> No</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Sorting Algorithms</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Quick Sort</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Quick sort is a divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around the pivot. It recursively sorts the sub-arrays. Quick sort is efficient for large datasets and is widely used in practice.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(n log n) average, O(n²) worst case</div>
                      <div><span className="font-medium">Space Complexity:</span> O(log n)</div>
                      <div><span className="font-medium">Stable:</span> No</div>
                      <div><span className="font-medium">In-place:</span> Yes</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Merge Sort</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves. It has a consistent O(n log n) performance but requires additional space for the merge step.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(n log n)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(n)</div>
                      <div><span className="font-medium">Stable:</span> Yes</div>
                      <div><span className="font-medium">In-place:</span> No</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Bubble Sort</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Bubble sort is a simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. While inefficient for large lists, it's easy to understand and implement.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(n²)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(1)</div>
                      <div><span className="font-medium">Stable:</span> Yes</div>
                      <div><span className="font-medium">In-place:</span> Yes</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Heap Sort</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element and adding it to the sorted region.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(n log n)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(1)</div>
                      <div><span className="font-medium">Stable:</span> No</div>
                      <div><span className="font-medium">In-place:</span> Yes</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h4 className="font-medium text-amber-600 dark:text-amber-400 mb-2">Insertion Sort</h4>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is efficient for small data sets and is often used as part of more sophisticated algorithms.
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <div><span className="font-medium">Time Complexity:</span> O(n²)</div>
                      <div><span className="font-medium">Space Complexity:</span> O(1)</div>
                      <div><span className="font-medium">Stable:</span> Yes</div>
                      <div><span className="font-medium">In-place:</span> Yes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;
