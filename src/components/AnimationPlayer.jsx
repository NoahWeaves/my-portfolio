import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimationPlayer = ({ animations }) => {
  // State for current animation and frame
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const imageRef = useRef(null);
  const frameTimeRef = useRef(0);

  // Get current animation data
  const currentAnimation = animations[currentAnimationIndex];
  
  // Initialize the player
  useEffect(() => {
    if (!currentAnimation) return;
    
    // Reset state
    setIsLoaded(false);
    setHasError(false);
    setCurrentFrame(0);
    
    // Cleanup previous animation timer
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Load the sprite sheet
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = currentAnimation.imageSrc;
    
    image.onload = () => {
      imageRef.current = image;
      setIsLoaded(true);
    };
    
    image.onerror = () => {
      setHasError(true);
      setIsLoaded(true); // Still mark as loaded to show error state
    };
    
    return () => {
      // Cleanup animation timer when component unmounts or animation changes
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [currentAnimation, currentAnimationIndex]);

  // Manual animation loop that doesn't rely on React state for frame changes
  const startAnimation = () => {
    if (!isLoaded || !currentAnimation || !currentAnimation.data.frames || hasError) return;
    
    // Clear any existing animation frame
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Set initial values
    let currentFrameIndex = 0;
    const frames = currentAnimation.data.frames;
    let lastTimestamp = 0;
    
    // Immediately render the first frame
    renderFrame(currentFrameIndex);
    
    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;
      
      const frameDuration = frames[currentFrameIndex].duration;
      
      frameTimeRef.current += elapsed;
      
      // Check if it's time to advance to the next frame
      if (frameTimeRef.current >= frameDuration) {
        // Move to next frame and reset timer
        currentFrameIndex = (currentFrameIndex + 1) % frames.length;
        frameTimeRef.current = 0;
        
        // Update React state for UI purposes (not for animation timing)
        setCurrentFrame(currentFrameIndex);
        
        // Render the next frame
        renderFrame(currentFrameIndex);
      }
      
      lastTimestamp = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Separate useEffect to handle animation start/stop when isLoaded changes
  useEffect(() => {
    if (isLoaded && !hasError && !animationRef.current) {
      frameTimeRef.current = 0; // Reset frame timer
      startAnimation();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isLoaded, hasError]);

  // Draw the current frame on the canvas
  const renderFrame = (frameIndex) => {
    if (!canvasRef.current || !isLoaded || !imageRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    const frameData = currentAnimation.data.frames[frameIndex];
    
    if (!frameData) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    try {
      // Draw the current frame from the sprite sheet
      ctx.drawImage(
        imageRef.current,
        frameData.frame.x,
        frameData.frame.y,
        frameData.frame.w,
        frameData.frame.h,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    } catch (error) {
      setHasError(true);
    }
  };

  // Go to next/previous animations with proper cleanup
  const goToNextAnimation = () => {
    if (animations.length <= 1) return;
    
    // Clean up current animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const nextAnimIndex = (currentAnimationIndex + 1) % animations.length;
    setCurrentAnimationIndex(nextAnimIndex);
  };

  const goToPrevAnimation = () => {
    if (animations.length <= 1) return;
    
    // Clean up current animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const prevAnimIndex = currentAnimationIndex === 0 
      ? animations.length - 1 
      : currentAnimationIndex - 1;
    setCurrentAnimationIndex(prevAnimIndex);
  };

  if (!currentAnimation) {
    return <div className="text-white">No animations available</div>;
  }

  // Calculate canvas dimensions
  const frameWidth = currentAnimation.data.meta?.size?.w / 
                    (currentAnimation.data.frames.length || 1);
  const frameHeight = currentAnimation.data.meta?.size?.h;

  return (
    <div className="flex flex-col h-full">
      {/* Animation title */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={goToPrevAnimation}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Previous animation"
          disabled={animations.length <= 1}
        >
          <ChevronLeft size={20} className={animations.length <= 1 ? "opacity-50" : ""} />
        </button>
        <h3 className="font-mono text-lg text-center">{currentAnimation.title}</h3>
        <button 
          onClick={goToNextAnimation}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Next animation"
          disabled={animations.length <= 1}
        >
          <ChevronRight size={20} className={animations.length <= 1 ? "opacity-50" : ""} />
        </button>
      </div>
      
      {/* Animation display */}
      <div className="flex-grow bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
        {!isLoaded ? (
          <div className="text-white text-center p-4">Loading animation...</div>
        ) : hasError ? (
          <div className="text-red-500 text-center p-4">
            Error loading animation
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            width={frameWidth || 100}
            height={frameHeight || 100}
            className="max-w-full max-h-full pixel-art"
          />
        )}
      </div>
    </div>
  );
};

export default AnimationPlayer;