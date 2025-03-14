import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import { Music } from 'lucide-react';

// Sample audio tracks - in a real implementation, this could be imported from a data file
const defaultAudioTracks = [
  {
    id: 'track1',
    title: 'Forest Dream',
    description: 'love song, guitar, reminiscent',
    src: '/audio/forest_drea.mp3',
    duration: '1:22',
    liked: false
  },
  {
    id: 'track2',
    title: 'false_prophets',
    description: 'philisophical, guitar, grunge',
    src: '/audio/Download-193.mp3',
    duration: '0:37',
    liked: false
  },
  {
    id: 'track3',
    title: 'Take Wachu Want',
    description: 'warm, love song, guitar',
    src: '/audio/Download-194.mp3',
    duration: '0:44',
    liked: false
  },
  {
    id: 'track4',
    title: 'Broken and Strong',
    description: 'inspiring, narrative, guitar',
    src: '/audio/Download-198.mp3',
    duration: '0:35',
    liked: false
  },
  {
    id: 'track5',
    title: 'Angel',
    description: 'tragedy, guitar, forlorn',
    src: '/audio/Download-200.mp3',
    duration: '0:58',
    liked: false
  },
  {
    id: 'track6',
    title: 'existential_1',
    description: 'hopeless, grungy, guitar',
    src: '/audio/Download-201.mp3',
    duration: '0:53',
    liked: false
  },
  {
    id: 'track7',
    title: 'Hurricane',
    description: 'sparkly, dreamlike, guitar',
    src: '/audio/Download-203.mp3',
    duration: '0:31',
    liked: false
  },
  {
    id: 'track8',
    title: 'all_or_nothing',
    description: 'inspiring, piano, explicit',
    src: '/audio/Download-206.mp3',
    duration: '0.59',
    liked: false
  },
  {
    id: 'track9',
    title: 'goin_or_stayin',
    description: 'sweet, country, guitar',
    src: '/audio/Download-207.mp3',
    duration: '0:59',
    liked: false
  },
  {
    id: 'track10',
    title: 'river_song',
    description: 'philisophical, ethereal, guitar',
    src: '/audio/Download-208.mp3',
    duration: '0:26',
    liked: false
  },
  {
    id: 'track11',
    title: 'high_school_drama',
    description: 'melodrama, punky, guitar',
    src: '/audio/Download-211.mp3',
    duration: '0:58',
    liked: false
  },
  {
    id: 'track12',
    title: 'had_it_coming',
    description: 'rocky, sassy, guitar',
    src: '/audio/Download-212.mp3',
    duration: '0:27',
    liked: false
  },
  {
    id: 'track13',
    title: 'otherwise_nevermind',
    description: 'soulful, breakup, guitar',
    src: '/audio/Download-213.mp3',
    duration: '0:35',
    liked: false
  },
  {
    id: 'track14',
    title: 'untitled',
    description: 'short, piano',
    src: '/audio/Download.mp3',
    duration: '0:15',
    liked: false
  }
];

const AudioSection = ({ initialTracks = defaultAudioTracks }) => {
  const [tracks, setTracks] = useState(initialTracks);
  
  // Handle track likes - client-side only for now
  const handleLikeTrack = (trackId) => {
    setTracks(prevTracks => 
      prevTracks.map(track => 
        track.id === trackId 
          ? { ...track, liked: !track.liked }
          : track
      )
    );
    
    // For a future backend implementation:
    // This is where you would make an API call to store the like
    console.log(`Track ${trackId} like toggled`);
  };

  return (
    <section className="border-b border-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h2 className="font-mono text-2xl tracking-wider mb-4">SONGWRITING AND COMPOSITION</h2>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px bg-gray-700 w-16"></span>
            <Music size={18} />
            <span className="h-px bg-gray-700 w-16"></span>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-mono text-xl mb-4">SONG FRAGMENTS</h3>
            <p className="text-gray-300 mb-4">
              These tracks represent a small sample of my songwriting explorations. Rough recordings of musical ideas, largely improvise. My creative process often involves spontaniously creating multiple elements of a song at once, lyrics, melody, guitar, etc.
            </p>
            <p className="text-gray-300 mb-6">
              PSA: Many of these were recorded on my iphone, so the quality is not professional.
            </p>
            <p className="text-gray-300 mb-6">
              COMING SOON: Feel free to listen and "like" your favorites. Your feedback helps guide which ideas I'll develop into 
              complete songs in the future.
            </p>
            
            
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">FOLK</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">ROCK</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">RnB</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">PIANO</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">ACOUSTIC</span>
            </div>
          </div>
          
          <div>
            <AudioPlayer 
              tracks={tracks} 
              onLike={handleLikeTrack}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioSection;