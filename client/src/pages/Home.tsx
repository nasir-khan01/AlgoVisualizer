import { Link } from "wouter";
import CategoryCard from "@/components/ui/CategoryCard";
import { FaRoute, FaSort } from "react-icons/fa";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Algorithm Visualization Tool</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Interactive visualization of common algorithms with step-by-step animation
        </p>
      </div>

      {/* Algorithm Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <CategoryCard
          title="Pathfinding Algorithms"
          description="Visualize how algorithms find optimal paths in a grid with obstacles"
          icon={<FaRoute className="text-blue-600 dark:text-blue-300 text-xl" />}
          iconBgClass="bg-blue-100 dark:bg-blue-900"
          buttonText="Explore Pathfinding"
          buttonLink="/pathfinding"
          buttonColorClass="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        />

        <CategoryCard
          title="Sorting Algorithms"
          description="Watch the step-by-step process of various sorting algorithms in action"
          icon={<FaSort className="text-amber-600 dark:text-amber-300 text-xl" />}
          iconBgClass="bg-amber-100 dark:bg-amber-900"
          buttonText="Explore Sorting"
          buttonLink="/sorting"
          buttonColorClass="bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
        />
      </div>

      {/* Algorithm Info Section */}
      <section className="mb-16">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg leading-6 font-medium">About Algorithms</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Learn about the algorithms implemented in this visualization tool
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-md font-medium mb-2">Pathfinding Algorithms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-1">A* Algorithm</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A* uses a best-first search approach that uses both the cost to reach the node and a heuristic that estimates the cost to reach the goal.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Time Complexity:</span> O(E log V)
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h5 className="font-medium text-blue-600 dark:text-blue-400 mb-1">Dijkstra's Algorithm</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Dijkstra's algorithm finds the shortest path between nodes in a graph, which may represent, for example, road networks.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Time Complexity:</span> O(E + V log V)
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-md font-medium mb-2">Sorting Algorithms</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h5 className="font-medium text-amber-600 dark:text-amber-400 mb-1">Quick Sort</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Quick sort is a divide-and-conquer algorithm that picks an element as a pivot and partitions the array around the pivot.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Time Complexity:</span> O(n log n) average, O(n²) worst case
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <h5 className="font-medium text-amber-600 dark:text-amber-400 mb-1">Merge Sort</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Merge sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges them.
                    </p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Time Complexity:</span> O(n log n)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 mt-auto rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:order-2 space-x-6">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <div className="mt-8 md:mt-0 md:order-1 text-center md:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; 2023 AlgoViz. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
