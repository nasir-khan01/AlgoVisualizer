import { ArrayElement } from "@/lib/types";

// Merge Sort Implementation with Animation Frames
const mergeSort = (originalArray: number[]) => {
  // Clone the array to avoid modifying the original
  const array = [...originalArray];
  
  // Animation frames
  const frames: { array: ArrayElement[], indices?: number[] }[] = [];
  let comparisons = 0;
  let swaps = 0; // In merge sort, we don't actually swap, but count array writes
  
  // Initialize the array elements with default state
  const elements: ArrayElement[] = array.map(value => ({
    value,
    state: "default"
  }));
  
  // Add initial state
  frames.push({ array: [...elements] });
  
  // Merge function that merges two sorted subarrays
  const merge = (elements: ArrayElement[], tempArray: ArrayElement[], left: number, mid: number, right: number) => {
    // Copy both parts into the temporary array
    for (let i = left; i <= right; i++) {
      tempArray[i] = { ...elements[i] };
      // Mark elements being merged as comparing
      elements[i].state = "comparing";
    }
    
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
    
    let i = left; // First subarray index
    let j = mid + 1; // Second subarray index
    let k = left; // Merged array index
    
    // Merge the two subarrays back into the original array
    while (i <= mid && j <= right) {
      comparisons++;
      
      // Mark the elements being compared
      elements[i].state = "comparing";
      elements[j].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i, j] });
      
      if (tempArray[i].value <= tempArray[j].value) {
        // If element from first subarray is smaller
        elements[k].value = tempArray[i].value;
        elements[k].state = "outOfPlace";
        frames.push({ array: [...elements.map(el => ({ ...el }))] });
        
        // Reset state of element that's been placed
        elements[k].state = "default";
        i++;
      } else {
        // If element from second subarray is smaller
        elements[k].value = tempArray[j].value;
        elements[k].state = "outOfPlace";
        frames.push({ array: [...elements.map(el => ({ ...el }))] });
        
        // Reset state of element that's been placed
        elements[k].state = "default";
        j++;
      }
      
      swaps++; // Count array writes
      k++;
    }
    
    // Copy any remaining elements from the first subarray
    while (i <= mid) {
      elements[k].value = tempArray[i].value;
      elements[k].state = "outOfPlace";
      frames.push({ array: [...elements.map(el => ({ ...el }))] });
      
      // Reset state
      elements[k].state = "default";
      swaps++;
      i++;
      k++;
    }
    
    // Copy any remaining elements from the second subarray
    while (j <= right) {
      elements[k].value = tempArray[j].value;
      elements[k].state = "outOfPlace";
      frames.push({ array: [...elements.map(el => ({ ...el }))] });
      
      // Reset state
      elements[k].state = "default";
      swaps++;
      j++;
      k++;
    }
    
    // Mark all elements in this range as sorted
    for (let i = left; i <= right; i++) {
      elements[i].state = "sorted";
    }
    
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
  };
  
  // Main merge sort function
  const mergeSort = (elements: ArrayElement[], tempArray: ArrayElement[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      // Recursively sort both halves
      mergeSort(elements, tempArray, left, mid);
      mergeSort(elements, tempArray, mid + 1, right);
      
      // Merge the sorted halves
      merge(elements, tempArray, left, mid, right);
    }
  };
  
  // Start the sorting algorithm
  const tempArray: ArrayElement[] = [...elements];
  mergeSort(elements, tempArray, 0, array.length - 1);
  
  // Mark all elements as sorted in the final frame
  elements.forEach(el => el.state = "sorted");
  frames.push({ array: [...elements] });
  
  return {
    states: frames,
    comparisons,
    swaps
  };
};

export default mergeSort;
