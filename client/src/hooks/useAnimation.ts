import { useState, useCallback, useRef } from "react";
import { AlgorithmMetrics } from "@shared/schema";

export const useAnimation = <T>() => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [metrics, setMetrics] = useState<AlgorithmMetrics | null>(null);
  
  // Refs to preserve values in callbacks
  const animationFrameRef = useRef<number | null>(null);
  const stepsRef = useRef<T[]>([]);
  const currentStepRef = useRef(0);
  const speedRef = useRef(50); // Default speed (1-100)
  
  // Function to calculate timeout based on speed
  const getTimeout = useCallback((speed: number) => {
    // Map speed (1-100) to timeout (500ms-10ms)
    // Higher speed = lower timeout = faster animation
    return 500 - (speed * 4.9); // Maps 1 -> 495ms, 100 -> 10ms
  }, []);
  
  // Start animation with the given steps
  const startAnimation = useCallback((
    steps: T[],
    callback: (step: T, index: number) => void,
    algorithmMetrics: AlgorithmMetrics,
    speed: number = 50
  ) => {
    setIsAnimating(true);
    setIsPaused(false);
    setMetrics(algorithmMetrics);
    
    stepsRef.current = steps;
    currentStepRef.current = 0;
    speedRef.current = speed;
    
    // Clear any existing animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Start the animation loop
    const animate = () => {
      if (currentStepRef.current < stepsRef.current.length) {
        // Call the callback with the current step
        callback(stepsRef.current[currentStepRef.current], currentStepRef.current);
        
        // Move to the next step
        currentStepRef.current++;
        
        // Schedule the next frame with timeout based on speed
        const timeout = getTimeout(speedRef.current);
        setTimeout(() => {
          if (!isPaused) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        }, timeout);
      } else {
        // Animation complete
        setIsAnimating(true); // Keep isAnimating true so user can reset
        setIsPaused(true);
      }
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [getTimeout, isPaused]);
  
  // Pause animation
  const pauseAnimation = useCallback(() => {
    setIsPaused(true);
    
    // Cancel the current animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);
  
  // Resume animation
  const resumeAnimation = useCallback(() => {
    if (!isAnimating) return;
    
    setIsPaused(false);
    
    // Restart the animation loop from where it left off
    const animate = () => {
      if (currentStepRef.current < stepsRef.current.length) {
        // Call the callback with the current step
        const callback = (step: T, index: number) => {};
        callback(stepsRef.current[currentStepRef.current], currentStepRef.current);
        
        // Move to the next step
        currentStepRef.current++;
        
        // Schedule the next frame with timeout based on speed
        const timeout = getTimeout(speedRef.current);
        setTimeout(() => {
          if (!isPaused) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        }, timeout);
      } else {
        // Animation complete
        setIsAnimating(true);
        setIsPaused(true);
      }
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [getTimeout, isAnimating, isPaused]);
  
  // Reset animation
  const resetAnimation = useCallback(() => {
    setIsAnimating(false);
    setIsPaused(false);
    setMetrics(null);
    
    // Clear the animation state
    stepsRef.current = [];
    currentStepRef.current = 0;
    
    // Cancel any running animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);
  
  return {
    isAnimating,
    isPaused,
    metrics,
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    resetAnimation
  };
};
