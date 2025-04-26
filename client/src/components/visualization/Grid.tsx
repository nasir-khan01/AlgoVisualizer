import { useEffect, useState } from "react";
import { GridNode, Tool } from "@shared/schema";
import { cn } from "@/lib/utils";

type GridProps = {
  grid: GridNode[][];
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
  selectedTool: Tool;
  isAnimating: boolean;
};

const Grid = ({ grid, onMouseDown, onMouseEnter, onMouseUp, selectedTool, isAnimating }: GridProps) => {
  // Determine cell color based on node type and status
  const getCellClassName = (node: GridNode) => {
    if (node.type === "start") return "bg-amber-500 hover:bg-amber-600";
    if (node.type === "end") return "bg-red-500 hover:bg-red-600";
    if (node.type === "wall") return "bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-500";
    if (node.type === "weight") return "bg-purple-300 dark:bg-purple-800 hover:bg-purple-400 dark:hover:bg-purple-700";
    if (node.type === "visited" && node.isVisited) return "bg-blue-200 dark:bg-blue-900 hover:bg-blue-300 dark:hover:bg-blue-800";
    if (node.type === "path") return "bg-green-400 dark:bg-green-600 hover:bg-green-500 dark:hover:bg-green-500";
    return "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 overflow-auto">
      <div 
        className={cn(
          "grid gap-0 p-2 w-full", 
          `grid-cols-${grid[0]?.length || 20}`
        )}
        style={{ 
          gridTemplateColumns: `repeat(${grid[0]?.length || 20}, minmax(0, 1fr))`,
          height: "24rem"
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((node, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              id={`node-${rowIdx}-${colIdx}`}
              className={cn(
                "cell w-full pt-[100%] relative border border-gray-200 dark:border-gray-700",
                isAnimating && "transition-colors duration-200"
              )}
              onMouseDown={() => onMouseDown(rowIdx, colIdx)}
              onMouseEnter={() => onMouseEnter(rowIdx, colIdx)}
              onMouseUp={onMouseUp}
            >
              <div className={cn(
                "absolute inset-0",
                getCellClassName(node)
              )}>
                {node.type === "weight" && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-700 dark:text-gray-300">
                    {node.weight}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
