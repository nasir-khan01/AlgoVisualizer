import { useEffect, useRef } from "react";
import { ArrayElement } from "@shared/schema";
import { cn } from "@/lib/utils";

type ArrayProps = {
  array: ArrayElement[];
  isAnimating: boolean;
};

const Array = ({ array, isAnimating }: ArrayProps) => {
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
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 h-96 flex items-end justify-center p-4">
      {array.length === 0 ? (
        <div className="text-gray-400 dark:text-gray-600 flex items-center justify-center h-full w-full">
          No array to visualize
        </div>
      ) : (
        array.map((element, index) => (
          <div
            key={index}
            className={cn(
              "array-bar mx-px relative",
              getBarColor(element.state),
              isAnimating ? "transition-all duration-200" : ""
            )}
            style={{
              height: `${(element.value / maxValue) * 90}%`, // 90% to leave some space at the top
              width: array.length > 50 ? '4px' : array.length > 25 ? '8px' : '16px'
            }}
            title={`Value: ${element.value}`}
          >
            {array.length <= 20 && (
              <div className="text-xs text-white font-bold absolute bottom-1 left-1/2 transform -translate-x-1/2">
                {element.value}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Array;
