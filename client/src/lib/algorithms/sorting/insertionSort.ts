import { ArrayElement } from "@shared/schema";

// Insertion Sort Implementation with Animation Frames
const insertionSort = (originalArray: number[]) => {
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
  
  // Mark first element as sorted
  elements[0].state = "sorted";
  frames.push({ array: [...elements.map(el => ({ ...el }))] });
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Mark the current element as being inserted
    elements[i].state = "comparing";
    frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [i] });
    
    // Store the current element value
    const key = elements[i].value;
    let j = i - 1;
    
    /* Move elements of elements[0..i-1] that are greater than key 
       to one position ahead of their current position */
    while (j >= 0) {
      // Mark elements being compared
      elements[j].state = "comparing";
      frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, i] });
      
      comparisons++;
      
      if (elements[j].value > key) {
        // Mark element as out of place
        elements[j].state = "outOfPlace";
        elements[j+1].state = "outOfPlace";
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, j+1] });
        
        // Move the element one position ahead
        elements[j + 1].value = elements[j].value;
        swaps++;
        
        // Show the moved state
        frames.push({ array: [...elements.map(el => ({ ...el }))], indices: [j, j+1] });
        
        // Reset state of element j
        elements[j].state = "sorted";
        j--;
      } else {
        // No need to move further, exit the loop
        elements[j].state = "sorted";
        frames.push({ array: [...elements.map(el => ({ ...el }))] });
        break;
      }
    }
    
    // Place the key in its correct position
    elements[j + 1].value = key;
    elements[j + 1].state = "sorted";
    frames.push({ array: [...elements.map(el => ({ ...el }))] });
  }
  
  // Add final state with all elements sorted
  elements.forEach(el => el.state = "sorted");
  frames.push({ array: [...elements] });
  
  return {
    states: frames,
    comparisons,
    swaps
  };
};

export default insertionSort;
