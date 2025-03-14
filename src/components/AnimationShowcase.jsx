import React, { useState, useEffect } from 'react';
import AnimationPlayer from './AnimationPlayer';

// Animation configuration with proper filenames
const animationsConfig = [
  {
    id: 'hero-death',
    title: 'DEATH ANIMATION',
    jsonFile: 'Hero!-death.json',
    imageFile: 'Hero!-death.png'
  },
  {
    id: 'hero-attack',
    title: 'ATTACK ANIMATION',
    jsonFile: 'Hero!-zap.json',  // Update these filenames to match your actual files
    imageFile: 'Hero!-zap.png'
  },
  {
    id: 'hero-idle',
    title: 'IDLE ANIMATION',
    jsonFile: 'Hero!-idle.json',    // Update these filenames to match your actual files
    imageFile: 'Hero!-idle.png'
  }
];

const AnimationShowcase = () => {
  const [animations, setAnimations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAnimations();
  }, []);

  const loadAnimations = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Process all animations in the config
      const loadedAnimations = [];
      
      // Start with the death animation which we know exists
      const deathConfig = animationsConfig[0];
      try {
        const response = await fetch(`/animations/${deathConfig.jsonFile}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${deathConfig.jsonFile}`);
        }
        
        const data = await response.json();
        loadedAnimations.push({
          ...deathConfig,
          data,
          imageSrc: `/animations/${deathConfig.imageFile}`
        });
      } catch (err) {
        console.error(`Error loading animation ${deathConfig.id}:`, err);
        // If we can't load the death animation, show an error
        setError(`Error loading animation: ${err.message}`);
        setIsLoading(false);
        return;
      }
      
      // Try to load the other animations
      // If they don't exist, we'll just use the death animation with different titles
      for (let i = 1; i < animationsConfig.length; i++) {
        const config = animationsConfig[i];
        try {
          const response = await fetch(`/animations/${config.jsonFile}`);
          if (!response.ok) {
            // If this animation doesn't exist, create a placeholder using the death animation data
            loadedAnimations.push({
              ...config,
              data: loadedAnimations[0].data, // Use the death animation data
              imageSrc: loadedAnimations[0].imageSrc // Use the death animation image
            });
            continue;
          }
          
          const data = await response.json();
          loadedAnimations.push({
            ...config,
            data,
            imageSrc: `/animations/${config.imageFile}`
          });
        } catch (err) {
          // If we can't load this animation, create a placeholder
          loadedAnimations.push({
            ...config,
            data: loadedAnimations[0].data, // Use the death animation data
            imageSrc: loadedAnimations[0].imageSrc // Use the death animation image
          });
        }
      }
      
      setAnimations(loadedAnimations);
    } catch (err) {
      setError("Failed to load animations");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400 font-mono">Loading animations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="text-red-500 font-mono mb-4">{error}</div>
        <button 
          onClick={loadAnimations}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-mono"
        >
          Retry
        </button>
      </div>
    );
  }

  if (animations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400 font-mono">No animations available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-6">
      <AnimationPlayer animations={animations} />
    </div>
  );
};

export default AnimationShowcase;