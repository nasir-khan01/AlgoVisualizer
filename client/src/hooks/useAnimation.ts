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
  const callbackRef = useRef<((step: T, index: number) => void) | null>(null); // Store callback for resume
  const onCompleteRef = useRef<(() => void) | undefined>(undefined); // Store onComplete callback
  const animationTimeoutRef = useRef<number | null>(null); // Track timeout ID for cancellation
  
  // Function to calculate timeout based on speed
  const getTimeout = useCallback((speed: number) => {
    // Convert speed (1-100) to timeout with a more gradual decrease
    // Speed 1 = 1000ms (slowest), Speed 100 = 10ms (fastest)
    const maxDelay = 1000; // 1 second for slowest
    const minDelay = 10; // 10ms for fastest
    
    // Use a logarithmic function to map speed to delay for a more gradual change
    // This creates a more even perception of speed changes
    const normalizedSpeed = speed / 100; // 0.01 to 1
    const logFactor = 20; // Controls the curve of the logarithmic function
    
    // Calculate delay with a logarithmic curve
    // This gives more granular control in the middle speed range
    const delay = maxDelay - (maxDelay - minDelay) * (Math.log(1 + normalizedSpeed * logFactor) / Math.log(1 + logFactor));
    
    console.log(`Animation speed ${speed} maps to delay of ${Math.round(delay)}ms`);
    return Math.round(delay);
  }, []);
  
  // Start animation with the given steps
  const startAnimation = useCallback((
    steps: T[],
    callback: (step: T, index: number) => void,
    algorithmMetrics: AlgorithmMetrics,
    speed: number = 50,
    onComplete?: () => void
  ) => {
    setIsAnimating(true);
    setIsPaused(false);
    setMetrics(algorithmMetrics);
    
    stepsRef.current = steps;
    currentStepRef.current = 0;
    speedRef.current = speed;
    callbackRef.current = callback; // Store callback for use in resumeAnimation
    
    // Store onComplete callback for later use
    onCompleteRef.current = onComplete;
    
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
        
        // Update metrics with current progress for real-time display
        if (algorithmMetrics) {
          // Calculate progress percentage
          const progress = Math.min((currentStepRef.current / stepsRef.current.length) * 100, 100);
          
          // Update metrics object with current progress
          setMetrics(prevMetrics => ({
            ...algorithmMetrics,
            progress: progress
          }));
        }
        
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
        
        // Call onComplete callback if provided
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [getTimeout, isPaused]);
  
  // Pause animation
  const pauseAnimation = useCallback(() => {
    console.log("Pausing animation - explicit call");
    setIsPaused(true);
    
    // Cancel the current animation frame
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Clear all pending timeouts to ensure no delayed callbacks fire
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }
  }, []);
  
  // Resume animation
  const resumeAnimation = useCallback(() => {
    if (!isAnimating || !callbackRef.current) return;
    
    // If we're at the end of the animation, restart from the beginning
    if (currentStepRef.current >= stepsRef.current.length) {
      console.log("Restarting animation from the beginning");
      currentStepRef.current = 0;
    }
    
    setIsPaused(false);
    
    // Restart the animation loop from where it left off
    const animate = () => {
      if (currentStepRef.current < stepsRef.current.length) {
        // Call the stored callback with the current step
        callbackRef.current!(stepsRef.current[currentStepRef.current], currentStepRef.current);
        
        // Move to the next step
        currentStepRef.current++;
        
        // Update metrics with current progress
        const progress = Math.min((currentStepRef.current / stepsRef.current.length) * 100, 100);
        setMetrics(prevMetrics => prevMetrics ? {
          ...prevMetrics,
          progress: progress
        } : null);
        
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
        
        // Call onComplete again if it exists
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }
    };
    
    // Start the animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [getTimeout, isAnimating, isPaused]);
  
  // Reset animation
  const resetAnimation = useCallback(() => {
    // First cancel any ongoing animation
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Clear all timeouts
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }
    
    // Reset the state
    setIsAnimating(false);
    setIsPaused(false);
    setMetrics(null);
    
    // Clear the animation data
    stepsRef.current = [];
    currentStepRef.current = 0;
    callbackRef.current = null;
    
    console.log("Animation fully reset");
  }, []);
  
  // Allow changing speed during animation
  const setSpeed = useCallback((newSpeed: number) => {
    console.log(`Updating animation speed to ${newSpeed}`);
    speedRef.current = newSpeed;
  }, []);
  
  return {
    isAnimating,
    isPaused,
    metrics,
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
    setSpeed
  };
};
