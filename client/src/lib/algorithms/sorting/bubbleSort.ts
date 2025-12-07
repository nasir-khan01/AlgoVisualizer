import { ArrayElement } from "@/lib/types";

// Bubble Sort Implementation with Animation Frames
const bubbleSort = (originalArray: number[]) => {
  // Clone the array to avoid modifying the original
  const array = [...originalArray];
  
  // Animation frames
  const frames: { array: ArrayElement[], indices?: number[] }[] = [];
  let comparisons = 0;
  let swaps = 0;
  
  // Initialize the array elements with default state
  const elements: ArrayElement[] = array.map(value => ({
    value,
    state: "default"
  }));
  
  // Add initial state
  frames.push({ array: [...elements] });
  
  const n = elements.length;
  let swapped: boolean;
  
  for (let i = 0; i < n; i++) {
    swapped = false;
    
    // Last i elements are already sorted
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      elements[j].state = "comparing";
      elements[j + 1].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, j+1] });
      
      comparisons++;
      
      // Compare adjacent elements
      if (elements[j].value > elements[j + 1].value) {
        // Mark elements being swapped as out of place
        elements[j].state = "outOfPlace";
        elements[j + 1].state = "outOfPlace";
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, j+1] });
        
        // Swap elements
        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
        swaps++;
        
        // Show the swapped state
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, j+1] });
        
        swapped = true;
      }
      
      // Reset states back to default
      elements[j].state = "default";
      elements[j + 1].state = "default";
    }
    
    // Mark the last sorted element
    elements[n - i - 1].state = "sorted";
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
    
    // If no swapping occurred in this pass, array is sorted
    if (!swapped) {
      break;
    }
  }
  
  // Mark all remaining elements as sorted if we exited early
  for (let i = 0; i < n; i++) {
    if (elements[i].state !== "sorted") {
      elements[i].state = "sorted";
    }
  }
  
  // Add final state with all elements sorted
  frames.push({ array: [...elements.map(el => ({ ...el }))] });
  
  return {
    states: frames,
    comparisons,
    swaps
  };
};

export default bubbleSort;
