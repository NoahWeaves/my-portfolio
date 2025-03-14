import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Heart } from 'lucide-react';

const AudioPlayer = ({ tracks = [], onLike }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const progressIntervalRef = useRef(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Update duration when a new track is loaded
  useEffect(() => {
    if (audioRef.current && currentTrackIndex !== null) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
      };
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, [currentTrackIndex]);

  // Handle track ending
  useEffect(() => {
    if (audioRef.current) {
      const handleEnded = () => {
        if (currentTrackIndex < tracks.length - 1) {
          playTrack(currentTrackIndex + 1);
        } else {
          setIsPlaying(false);
          setProgress(0);
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        }
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [currentTrackIndex, tracks.length]);

  // Format time in mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = (index) => {
    if (currentTrackIndex === index && isPlaying) {
      // Pause current track
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    } else {
      // Stop current track if playing
      if (isPlaying && audioRef.current) {
        audioRef.current.pause();
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      }
      
      // Set up new track
      setCurrentTrackIndex(index);
      audioRef.current.src = tracks[index].src;
      audioRef.current.load();
      
      // Start playing
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            progressIntervalRef.current = setInterval(() => {
              setProgress(audioRef.current.currentTime);
            }, 100);
          })
          .catch(error => {
            console.error('Playback failed:', error);
            setIsPlaying(false);
          });
      }
    }
  };

  const handlePlayPause = () => {
    if (currentTrackIndex === null && tracks.length > 0) {
      playTrack(0);
    } else if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      progressIntervalRef.current = setInterval(() => {
        setProgress(audioRef.current.currentTime);
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex > 0) {
      playTrack(currentTrackIndex - 1);
    } else if (tracks.length > 0) {
      // Cycle to the last track
      playTrack(tracks.length - 1);
    }
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      playTrack(currentTrackIndex + 1);
    } else if (tracks.length > 0) {
      // Cycle to the first track
      playTrack(0);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleLikeTrack = (index) => {
    if (onLike && tracks[index]) {
      onLike(tracks[index].id);
    }
  };

  // Placeholder background colors for track items
  const getTrackColor = (index) => {
    const colors = ['bg-gray-900', 'bg-gray-950', 'bg-gray-900'];
    return colors[index % colors.length];
  };

  return (
    <div className="flex flex-col bg-black border border-gray-800 rounded-lg overflow-hidden">
      {/* Audio element */}
      <audio ref={audioRef} />
      
      {/* Now playing section */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-mono text-sm text-gray-400">
            {currentTrackIndex !== null ? 'NOW PLAYING' : 'SELECT A TRACK'}
          </h3>
          {currentTrackIndex !== null && (
            <button 
              onClick={() => handleLikeTrack(currentTrackIndex)} 
              className="text-gray-400 hover:text-white"
              aria-label="Like this track"
            >
              <Heart 
                size={16} 
                className={tracks[currentTrackIndex]?.liked ? "fill-red-500 text-red-500" : ""} 
              />
            </button>
          )}
        </div>
        
        <div className="font-mono text-base mb-4">
          {currentTrackIndex !== null ? tracks[currentTrackIndex]?.title : "—"}
        </div>
        
        {/* Progress bar */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs text-gray-400 font-mono w-10">
            {formatTime(progress)}
          </span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="flex-grow h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            disabled={currentTrackIndex === null}
          />
          <span className="text-xs text-gray-400 font-mono w-10">
            {formatTime(duration)}
          </span>
        </div>
        
        {/* Playback controls */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handlePrevious}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={tracks.length === 0}
            aria-label="Previous track"
          >
            <SkipBack size={20} />
          </button>
          <button 
            onClick={handlePlayPause}
            className="p-2 bg-white text-black rounded-full hover:bg-gray-200 disabled:opacity-50"
            disabled={tracks.length === 0}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button 
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={tracks.length === 0}
            aria-label="Next track"
          >
            <SkipForward size={20} />
          </button>
          <button 
            onClick={handleMute}
            className="p-2 text-gray-400 hover:text-white disabled:opacity-50"
            disabled={tracks.length === 0 || currentTrackIndex === null}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
      
      {/* Tracklist */}
      <div className="max-h-96 overflow-y-auto">
        {tracks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No audio tracks available
          </div>
        ) : (
          <ul className="divide-y divide-gray-800">
            {tracks.map((track, index) => (
              <li 
                key={track.id || index}
                className={`${getTrackColor(index)} hover:bg-gray-800 transition-colors cursor-pointer`}
              >
                <div 
                  className="p-4 flex items-center justify-between"
                  onClick={() => playTrack(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-gray-700 rounded-full">
                      {currentTrackIndex === index && isPlaying ? (
                        <Pause size={14} className="text-white" />
                      ) : (
                        <Play size={14} className="text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-mono text-sm text-white">{track.title}</h4>
                      {track.description && (
                        <p className="text-xs text-gray-400 mt-1">{track.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-xs text-gray-400 font-mono">{track.duration || '--:--'}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleLikeTrack(index);
                      }} 
                      className="text-gray-400 hover:text-white"
                      aria-label="Like this track"
                    >
                      <Heart 
                        size={14} 
                        className={track.liked ? "fill-red-500 text-red-500" : ""} 
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;