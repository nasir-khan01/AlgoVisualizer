import { useState } from "react";
import { Tool, PathfindingAlgorithm, SortingAlgorithm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  FaPlay, 
  FaPause, 
  FaRedo, 
  FaRandom, 
  FaMapMarkerAlt, 
  FaFlagCheckered, 
  FaDrawPolygon, 
  FaWeightHanging, 
  FaEraser 
} from "react-icons/fa";

type ControlsProps = {
  type: 'pathfinding' | 'sorting';
  algorithm: PathfindingAlgorithm | SortingAlgorithm;
  onAlgorithmChange: (algo: string) => void;
  gridSize?: { rows: number; cols: number };
  onGridSizeChange?: (size: { rows: number; cols: number }) => void;
  arraySize?: number;
  onArraySizeChange?: (size: number) => void;
  selectedTool?: Tool;
  onToolChange?: (tool: Tool) => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onVisualize: () => void;
  onReset: () => void;
  onClearPath?: () => void;
  onGenerateMaze?: () => void;
  isAnimating: boolean;
  isPaused: boolean;
};

const Controls = ({
  type,
  algorithm,
  onAlgorithmChange,
  gridSize,
  onGridSizeChange,
  arraySize,
  onArraySizeChange,
  selectedTool,
  onToolChange,
  speed,
  onSpeedChange,
  onVisualize,
  onReset,
  onClearPath,
  onGenerateMaze,
  isAnimating,
  isPaused
}: ControlsProps) => {
  // For pathfinding grid size inputs
  const [rows, setRows] = useState(gridSize?.rows || 20);
  const [cols, setCols] = useState(gridSize?.cols || 20);
  
  // Handle grid size change with input validation
  const handleGridSizeChange = () => {
    if (!onGridSizeChange) return;
    
    const validRows = Math.min(Math.max(rows, 5), 50);
    const validCols = Math.min(Math.max(cols, 5), 50);
    
    if (validRows !== rows) setRows(validRows);
    if (validCols !== cols) setCols(validCols);
    
    onGridSizeChange({ rows: validRows, cols: validCols });
  };

  return (
    <div className="w-full md:w-80 bg-gray-50 dark:bg-gray-900 p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Algorithm Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm</label>
          <Select 
            value={algorithm} 
            onValueChange={onAlgorithmChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              {type === 'pathfinding' ? (
                <>
                  <SelectItem value="astar">A* Algorithm</SelectItem>
                  <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
                  <SelectItem value="bfs">Breadth-First Search</SelectItem>
                  <SelectItem value="dfs">Depth-First Search</SelectItem>
                </>
              ) : (
                <>
                  <SelectItem value="quicksort">Quick Sort</SelectItem>
                  <SelectItem value="mergesort">Merge Sort</SelectItem>
                  <SelectItem value="bubblesort">Bubble Sort</SelectItem>
                  <SelectItem value="heapsort">Heap Sort</SelectItem>
                  <SelectItem value="insertionsort">Insertion Sort</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Grid Size (for pathfinding) */}
        {type === 'pathfinding' && onGridSizeChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Grid Size</label>
            <div className="flex space-x-2">
              <Input
                type="number"
                min={5}
                max={50}
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value) || 20)}
                onBlur={handleGridSizeChange}
                className="w-20"
              />
              <span className="inline-flex items-center text-gray-500 dark:text-gray-400">×</span>
              <Input
                type="number"
                min={5}
                max={50}
                value={cols}
                onChange={(e) => setCols(parseInt(e.target.value) || 20)}
                onBlur={handleGridSizeChange}
                className="w-20"
              />
            </div>
          </div>
        )}

        {/* Array Size (for sorting) */}
        {type === 'sorting' && onArraySizeChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Array Size: {arraySize}
            </label>
            <Slider
              value={[arraySize || 6]}
              min={5}
              max={15}
              step={1}
              onValueChange={(value) => onArraySizeChange(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>5</span>
              <span>15</span>
            </div>
          </div>
        )}

        {/* Tools (for pathfinding) */}
        {type === 'pathfinding' && onToolChange && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tools</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTool === 'start' ? 'default' : 'outline'}
                className={selectedTool === 'start' ? 'bg-amber-500 hover:bg-amber-600' : ''}
                onClick={() => onToolChange('start')}
                disabled={isAnimating}
              >
                <FaMapMarkerAlt className="mr-2" />
                Start
              </Button>
              <Button
                variant={selectedTool === 'end' ? 'default' : 'outline'}
                className={selectedTool === 'end' ? 'bg-red-500 hover:bg-red-600' : ''}
                onClick={() => onToolChange('end')}
                disabled={isAnimating}
              >
                <FaFlagCheckered className="mr-2" />
                End
              </Button>
              <Button
                variant={selectedTool === 'wall' ? 'default' : 'outline'}
                className={selectedTool === 'wall' ? 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-800' : ''}
                onClick={() => onToolChange('wall')}
                disabled={isAnimating}
              >
                <FaDrawPolygon className="mr-2" />
                Wall
              </Button>
              <Button
                variant={selectedTool === 'weight' ? 'default' : 'outline'}
                className={selectedTool === 'weight' ? 'bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-800' : ''}
                onClick={() => onToolChange('weight')}
                disabled={isAnimating}
              >
                <FaWeightHanging className="mr-2" />
                Weight
              </Button>
              <Button
                variant={selectedTool === 'erase' ? 'default' : 'outline'}
                onClick={() => onToolChange('erase')}
                disabled={isAnimating}
              >
                <FaEraser className="mr-2" />
                Erase
              </Button>
            </div>
          </div>
        )}

        {/* Animation Speed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Animation Speed
          </label>
          <Slider
            value={[speed]}
            min={1}
            max={100}
            step={1}
            onValueChange={(value) => onSpeedChange(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className={`w-full ${type === 'pathfinding' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'}`}
            onClick={onVisualize}
            disabled={false} // We'll handle disabled state in the click handler
          >
            {isAnimating && !isPaused ? (
              <>
                <FaPause className="mr-2" />
                Pause
              </>
            ) : isAnimating && isPaused ? (
              <>
                <FaPlay className="mr-2" />
                Resume
              </>
            ) : (
              <>
                <FaPlay className="mr-2" />
                {type === 'pathfinding' ? 'Visualize' : 'Sort'}
              </>
            )}
          </Button>
          
          {/* Only show Clear Path for pathfinding */}
          {type === 'pathfinding' && onClearPath && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onClearPath}
              disabled={isAnimating && !isPaused}
            >
              <FaRedo className="mr-2" />
              Clear Path
            </Button>
          )}
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onReset}
            disabled={isAnimating && !isPaused}
          >
            <FaRedo className="mr-2" />
            {type === 'pathfinding' ? 'Reset Grid' : 'Reset Array'}
          </Button>
          
          {/* Only show Generate Maze for pathfinding */}
          {type === 'pathfinding' && onGenerateMaze && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onGenerateMaze}
              disabled={isAnimating}
            >
              <FaRandom className="mr-2" />
              Generate Maze
            </Button>
          )}
          
          {/* Only show Randomize for sorting */}
          {type === 'sorting' && (
            <Button
              variant="outline"
              className="w-full"
              onClick={onReset}
              disabled={isAnimating && !isPaused}
            >
              <FaRandom className="mr-2" />
              Randomize
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
