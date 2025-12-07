import { ArrayElement } from "@/lib/types";

// Quick Sort Implementation with Animation Frames
const quickSort = (originalArray: number[]) => {
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
  
  // Main quicksort function
  const sort = (elements: ArrayElement[], low: number, high: number) => {
    if (low < high) {
      // Partition the array and get the pivot index
      const pivotIndex = partition(elements, low, high);
      
      // Recursively sort the sub-arrays
      sort(elements, low, pivotIndex - 1);
      sort(elements, pivotIndex + 1, high);
    }
  };
  
  // Partition function that selects a pivot and places elements
  // less than the pivot to the left and greater to the right
  const partition = (elements: ArrayElement[], low: number, high: number): number => {
    // Choose the rightmost element as pivot
    const pivotValue = elements[high].value;
    
    // Mark pivot as comparing
    elements[high].state = "comparing";
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [high] });
    
    // Index of smaller element
    let i = low - 1;
    
    // Compare each element with pivot
    for (let j = low; j < high; j++) {
      // Mark current element as comparing
      elements[j].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, high] });
      comparisons++;
      
      // If current element is smaller than the pivot
      if (elements[j].value < pivotValue) {
        i++;
        
        // Mark elements being swapped as out of place
        elements[i].state = "outOfPlace";
        elements[j].state = "outOfPlace";
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i, j] });
        
        // Swap elements
        [elements[i], elements[j]] = [elements[j], elements[i]];
        swaps++;
        
        // Show the swapped state
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i, j] });
        
        // Reset the states
        elements[i].state = "default";
        elements[j].state = "default";
      }
      
      // Reset current element state
      elements[j].state = "default";
    }
    
    // Mark i+1 as out of place (to be swapped with pivot)
    elements[i + 1].state = "outOfPlace";
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i + 1, high] });
    
    // Swap the pivot element with the element at i+1
    [elements[i + 1], elements[high]] = [elements[high], elements[i + 1]];
    swaps++;
    
    // Show the swapped state
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i + 1, high] });
    
    // Reset the states
    elements[i + 1].state = "sorted";
    elements[high].state = "default";
    
    // Show the final state for this partition
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
    
    // Return the pivot index
    return i + 1;
  };
  
  // Start the sorting algorithm
  sort(elements, 0, array.length - 1);
  
  // Mark all elements as sorted in the final frame
  elements.forEach(el => el.state = "sorted");
  frames.push({ array: [...elements] });
  
  return {
    states: frames,
    comparisons,
    swaps
  };
};

export default quickSort;
