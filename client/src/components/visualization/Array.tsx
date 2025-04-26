import { useState, useEffect } from "react";
import { ArrayElement } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type ArrayProps = {
  array: ArrayElement[];
  isAnimating: boolean;
};

const Array = ({ array, isAnimating }: ArrayProps) => {
  // State for showing values and array table
  const [showValues, setShowValues] = useState(array.length <= 35);
  const [showArrayTable, setShowArrayTable] = useState(false);
  
  // Update the animation consistency when toggling display options
  useEffect(() => {
    // This helps ensure DOM updates don't interfere with animation state
    // by forcing a small delay before any visual changes
    const timer = setTimeout(() => {}, 10);
    return () => clearTimeout(timer);
  }, [showArrayTable, showValues]);

  // Determine bar color based on element state
  const getBarColor = (state: ArrayElement["state"]) => {
    switch (state) {
      case "comparing":
        return "bg-amber-500";
      case "sorted":
        return "bg-green-500";
      case "outOfPlace":
        return "bg-red-500";
      default:
        return "bg-blue-500 dark:bg-blue-600";
    }
  };

  // Calculate max value for height normalization
  const maxValue = Math.max(...array.map(el => el.value), 1);
  
  // Calculate optimal bar width and spacing based on array size
  const getBarWidth = () => {
    if (array.length > 100) return '2px';
    if (array.length > 50) return '4px';
    if (array.length > 25) return '8px';
    return '16px';
  };
  
  const getBarSpacing = () => {
    if (array.length > 100) return 'mx-[1px]';
    if (array.length > 50) return 'mx-px';
    if (array.length > 25) return 'mx-[2px]';
    return 'mx-1';
  };
  
  return (
    <div className="space-y-3">
      {/* Controls for visualization */}
      <div className="flex flex-wrap gap-4 justify-end items-center pb-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="show-values" 
            checked={showValues}
            onCheckedChange={setShowValues}
          />
          <Label htmlFor="show-values">Show Values</Label>
        </div>
        
        <div className="flex items-center space-x-2">
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
          <Label htmlFor="show-array-table">Show Array Table</Label>
        </div>
      </div>
      
      {/* Array Visualization */}
      <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 h-80 flex items-end justify-center p-4">
        {array.length === 0 ? (
          <div className="text-gray-400 dark:text-gray-600 flex items-center justify-center h-full w-full">
            No array to visualize
          </div>
        ) : (
          array.map((element, index) => (
            <div
              key={index}
              className={cn(
                "array-bar relative",
                getBarSpacing(),
                getBarColor(element.state),
                isAnimating ? "transition-all duration-200" : ""
              )}
              style={{
                height: `${(element.value / maxValue) * 90}%`, // 90% to leave some space at the top
                width: getBarWidth()
              }}
              title={`Value: ${element.value}`}
            >
              {showValues && (
                <div className="text-xs text-white font-bold absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  {element.value}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Array as a table for better visualization */}
      {showArrayTable && array.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded mt-2">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 text-xs">
                <th className="px-2 py-1 text-left">Index</th>
                {array.map((_, index) => (
                  <th key={index} className="px-2 py-1 text-center">{index}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-900 text-xs">
                <td className="px-2 py-1 text-left font-medium">Value</td>
                {array.map((element, index) => (
                  <td 
                    key={index} 
                    className={cn(
                      "px-2 py-1 text-center",
                      element.state === "comparing" && "bg-amber-100 dark:bg-amber-900",
                      element.state === "sorted" && "bg-green-100 dark:bg-green-900",
                      element.state === "outOfPlace" && "bg-red-100 dark:bg-red-900"
                    )}
                  >
                    {element.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Array;
