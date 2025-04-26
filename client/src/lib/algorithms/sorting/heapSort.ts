import { ArrayElement } from "@shared/schema";

// Heap Sort Implementation with Animation Frames
const heapSort = (originalArray: number[]) => {
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
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(elements, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Mark the current root and last element
    elements[0].state = "comparing";
    elements[i].state = "comparing";
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [0, i] });
    
    // Move current root to end
    elements[0].state = "outOfPlace";
    elements[i].state = "outOfPlace";
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [0, i] });
    
    // Swap
    [elements[0], elements[i]] = [elements[i], elements[0]];
    swaps++;
    
    // Show the swapped state
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [0, i] });
    
    // Mark the element at position i as sorted
    elements[i].state = "sorted";
    elements[0].state = "default";
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
    
    // Call heapify on the reduced heap
    heapify(elements, i, 0);
  }
  
  // Mark the first element as sorted (last remaining element)
  elements[0].state = "sorted";
  frames.push({ array: [...elements.map(el => ({ ...el }))] });
  
  // Helper function to heapify a subtree rooted at node i
  function heapify(elements: ArrayElement[], size: number, i: number) {
    let largest = i; // Initialize largest as root
    const left = 2 * i + 1; // Left child
    const right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < size) {
      // Mark elements being compared
      elements[left].state = "comparing";
      elements[largest].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [left, largest] });
      
      comparisons++;
      
      if (elements[left].value > elements[largest].value) {
        // Reset state of previous largest
        elements[largest].state = "default";
        largest = left;
      } else {
        // Reset state of left child
        elements[left].state = "default";
      }
      
      // Reset state of current largest
      elements[largest].state = "default";
    }
    
    // If right child is larger than largest so far
    if (right < size) {
      // Mark elements being compared
      elements[right].state = "comparing";
      elements[largest].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [right, largest] });
      
      comparisons++;
      
      if (elements[right].value > elements[largest].value) {
        // Reset state of previous largest
        elements[largest].state = "default";
        largest = right;
      } else {
        // Reset state of right child
        elements[right].state = "default";
      }
      
      // Reset state of current largest
      elements[largest].state = "default";
    }
    
    // If largest is not root
    if (largest !== i) {
      // Mark elements being swapped
      elements[i].state = "outOfPlace";
      elements[largest].state = "outOfPlace";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i, largest] });
      
      // Swap
      [elements[i], elements[largest]] = [elements[largest], elements[i]];
      swaps++;
      
      // Show the swapped state
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i, largest] });
      
      // Reset states
      elements[i].state = "default";
      elements[largest].state = "default";
      frames.push({ array: [...elements.map(el => ({ ...el }))] });
      
      // Recursively heapify the affected sub-tree
      heapify(elements, size, largest);
    }
  }
  
  return {
    states: frames,
    comparisons,
    swaps
  };
};

export default heapSort;
