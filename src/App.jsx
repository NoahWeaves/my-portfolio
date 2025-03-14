import React, { useState, useRef } from 'react';
import { Github, Linkedin, Mail, Menu, X, Music, Gamepad2, Book } from 'lucide-react';
import InteractiveGrid from './components/InteractiveGrid';
import GridVisualization from './components/GridVisualization'; 
import AnimationShowcase from './components/AnimationShowcase'
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAudio, setActiveAudio] = useState(null);
  const audioRefs = useRef({});
  
  // Define a consistent grid size to use across components
  const gridSize = { cols: 30, rows: 20 };
  
  const [layers, setLayers] = useState([
    { id: 0, cells: [] },  // Hero grid
    { id: 1, cells: [] },  // Technical grid
    { id: 2, cells: [] }   // Creative grid
  ]);

  // Function to handle cell updates in grids
  const handleLayerUpdate = ({ layerId, cells }) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId 
          ? { ...layer, cells } 
          : layer
      )
    );
  };

  // Audio player functionality
  const toggleAudio = (trackId) => {
    if (activeAudio && activeAudio !== trackId) {
      const prevAudio = audioRefs.current[activeAudio];
      if (prevAudio && !prevAudio.paused) {
        prevAudio.pause();
      }
    }

    const audio = audioRefs.current[trackId];
    if (audio) {
      if (audio.paused) {
        audio.play();
        setActiveAudio(trackId);
      } else {
        audio.pause();
        setActiveAudio(null);
      }
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Minimal Navigation */}
      <nav className="fixed top-0 w-full bg-black z-50 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="font-mono text-lg tracking-tight">NW</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="font-mono text-sm hover:text-gray-400 transition-colors">ABOUT</a>
              <a href="#technical" className="font-mono text-sm hover:text-gray-400 transition-colors">TECHNICAL</a>
              <a href="#creative" className="font-mono text-sm hover:text-gray-400 transition-colors">CREATIVE</a>
              <a href="#contact" className="font-mono text-sm hover:text-gray-400 transition-colors">CONTACT</a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-4 py-2 space-y-2">
              <a href="#about" className="block font-mono text-sm py-2 hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
              <a href="#technical" className="block font-mono text-sm py-2 hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>TECHNICAL</a>
              <a href="#creative" className="block font-mono text-sm py-2 hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>CREATIVE</a>
              <a href="#contact" className="block font-mono text-sm py-2 hover:text-gray-400 transition-colors" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Grid Section - Taller */}
      <section className="pt-16 border-b border-gray-800">
        <div className="h-64 relative overflow-hidden">
          <InteractiveGrid 
            gridSize={gridSize}
            layerId={0}
            onCellUpdate={handleLayerUpdate}
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-mono text-2xl tracking-wider bg-black bg-opacity-50 px-6 py-2">
              NOAH WEAVER
            </h1>
          </div>
        </div>
      </section>

      {/* About Section - Info Block */}
      <section id="about" className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:border-r border-gray-800">
            <h2 className="font-mono text-xl mb-6">ABOUT</h2>
            <p className="text-gray-400 mb-4">
              I'm a computer science student with a passion for creating across multiple disciplines. My approach combines technical precision with creative vision.
            </p>
            <p className="text-gray-400">
              Currently pursuing advanced studies in computer science. My technical background is complemented by my creative endeavors.
            </p>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-800 p-4">
              <h3 className="font-mono text-sm mb-2">TECHNICAL</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Computer Science</li>
                <li>Web Devlopment</li>
                <li>Python</li>
              </ul>
            </div>
            <div className="border border-gray-800 p-4">
              <h3 className="font-mono text-sm mb-2">CREATIVE</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>Music</li>
                <li>Games</li>
                <li>Ashrakaa</li>
                <li>Wizardry</li>
              </ul>
            </div>
            <div className="border border-gray-800 p-4 col-span-1 md:col-span-2">
              <h3 className="font-mono text-sm mb-2">APPROACH</h3>
              <p className="text-gray-400 text-sm">
                I pursue the intersection of logic and imagination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Section - Grid Block */}
      <section id="technical" className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:border-r border-gray-800">
            <h2 className="font-mono text-xl mb-6">TECHNICAL SKILLS</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-mono text-sm mb-3">LANGUAGES</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Python</span>
                    <div className="w-24 bg-gray-800 h-1">
                      <div className="bg-white h-1 w-15"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Webstacks(react, js, node, npm, sql...)</span>
                    <div className="w-24 bg-gray-800 h-1">
                      <div className="bg-white h-1 w-20"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">C/Java/C#/Assembly</span>
                    <div className="w-24 bg-gray-800 h-1">
                      <div className="bg-white h-1 w-12"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Verilog</span>
                    <div className="w-24 bg-gray-800 h-1">
                      <div className="bg-white h-1 w-10"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">01000010 01101001 01101110 01100001 01110010 01111001</span>
                    <div className="w-24 bg-gray-800 h-1">
                      <div className="bg-white h-1 w-0"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-mono text-sm mb-3">AREAS STUDIED</h3>
                <div className="grid grid-cols-2 gap-2">
                  <span className="text-gray-400 text-sm">NLP Archetecture</span>
                  <span className="text-gray-400 text-sm">Web Development</span>
                  <span className="text-gray-400 text-sm">Robotics</span>
                  <span className="text-gray-400 text-sm">Machine Learning</span>
                  <span className="text-gray-400 text-sm">CPU Design</span>
                  <span className="text-gray-400 text-sm">Git :D</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-mono text-sm mb-3">EDUCATION</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-white font-mono text-sm">BS COMPUTER SCIENCE --- UNC Chapel Hill</p>
                    <p className="text-gray-400 text-xs">2021 - 2025 (Expected)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-120 relative overflow-hidden">
            <InteractiveGrid 
              gridSize={gridSize}
              layerId={1}
              onCellUpdate={handleLayerUpdate}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
        
      {/* Projects Title Band */}
      <section className="border-b border-gray-800 bg-black py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-mono text-2xl tracking-wider text-center">PERSONAL PROJECTS</h2>
        </div>
      </section>
      
      {/* Project 1: Game Dev (Left) + Interactive Grid (Right) */}
      <section className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-120 relative overflow-hidden">
            <InteractiveGrid 
              gridSize={gridSize}
              layerId={3}
              onCellUpdate={handleLayerUpdate}
              className="w-full h-full"
            />
          </div>
          <div className="p-8 flex flex-col justify-between md:border-r border-gray-800">
            <div>
              <h2 className="font-mono text-xl mb-6">GAME DEVELOPMENT</h2>
              <p className="text-gray-400 mb-4">
                A work-in-progress game featuring custom animations and visuals. This project demonstrates my ability to combine creative design with technical implementation.
              </p>
              <p className="text-gray-400 mb-4">
                The game explores concepts of time and space, with mechanics that challenge conventional movement and interaction patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">UNITY</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">C#</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">SHADER PROGRAMMING</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">ANIMATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project 2: Interactive Grid (Left) + Blank Showcase (Right) */}
      <section className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="md:border-l border-gray-800">
            <AnimationShowcase />
          </div>
          <div className="h-120 relative overflow-hidden">
            <InteractiveGrid 
              gridSize={gridSize}
              layerId={4}
              onCellUpdate={handleLayerUpdate}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

          
      {/* Game Dev Section - Info Block */}
      <section id="game-dev" className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="aspect-square overflow-hidden md:order-1">
            <img 
              src="/api/placeholder/800/800" 
              alt="Game Development" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="p-8 flex flex-col justify-between md:border-r border-gray-800">
            <div>
              <h2 className="font-mono text-xl mb-6">GAME DEVELOPMENT</h2>
              <p className="text-gray-400 mb-4">
                A work-in-progress game featuring custom animations and visuals. This project demonstrates my ability to combine creative design with technical implementation.
              </p>
              <p className="text-gray-400 mb-4">
                The game explores concepts of time and space, with mechanics that challenge conventional movement and interaction patterns.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">UNITY</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">C#</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">SHADER PROGRAMMING</span>
              <span className="px-2 py-1 border border-gray-700 text-xs font-mono">ANIMATION</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Creative Section - Grid Block */}
      <section id="creative" className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-120 relative overflow-hidden">
            <InteractiveGrid 
              gridSize={gridSize}
              layerId={2}
              onCellUpdate={handleLayerUpdate}
              className="w-full h-full"
            />
          </div>
          <div className="p-8 md:border-l border-gray-800">
            <h2 className="font-mono text-xl mb-6">CREATIVE PROJECTS</h2>
            
            <div className="mb-8">
              <h3 className="font-mono text-sm mb-3">MUSIC</h3>
              <p className="text-gray-400 mb-4">
                Original compositions across different genres, showcasing my approach to music creation and production.
              </p>
              <div className="space-y-3 mt-4">
                {[1, 2, 3].map((track) => (
                  <div key={track} className="border border-gray-800 p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <button 
                        onClick={() => toggleAudio(`track-${track}`)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-700 mr-4 hover:bg-gray-900"
                      >
                        <span className="text-xs font-mono">
                          {activeAudio === `track-${track}` ? '■' : '▶'}
                        </span>
                      </button>
                      <span className="font-mono text-sm">TRACK_{track}</span>
                      <audio
                        ref={el => audioRefs.current[`track-${track}`] = el}
                        src={`/placeholder-audio-${track}.mp3`}
                        onEnded={() => setActiveAudio(null)}
                      />
                    </div>
                    <span className="text-gray-500 text-xs font-mono">2:3{track}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-3">
                <h3 className="font-mono text-sm">ASHRAKAA WORLDBUILDING</h3>
                <span className="ml-3 text-xs font-mono px-2 py-1 border border-gray-700">COMING SOON</span>
              </div>
              <p className="text-gray-400 mb-4">
                A progressive worldbuilding project set on a tidally locked planet of ice and fire, exploring unique environmental conditions and resulting societal adaptations.
              </p>
              <div className="border-l-2 border-gray-800 pl-4 my-4">
                <p className="text-gray-400 italic text-sm">
                  "On Ashrakaa, civilization exists in the twilight ring between eternal day and endless night..."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Visualization Section */}
      <section className="border-b border-gray-800">
        <div className="p-8 text-center border-b border-gray-800">
          <h2 className="font-mono text-xl">INTERACTIVE VISUALIZATION</h2>
          <p className="text-gray-400 text-sm mt-2">
            Interact with the grids above to see your creation visualized in 3D space
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Red = X-axis, Green = Y-axis, Blue = Z-axis (height)
          </p>
        </div>
        <div className="h-120 w-full">
          <GridVisualization 
            layers={layers} 
            className="w-full h-full" 
            gridSize={gridSize}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-b border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <a href="mailto:your.email@example.com" className="flex flex-col items-center justify-center py-16 md:border-r border-gray-800 hover:bg-gray-900 transition-colors">
            <Mail size={24} className="mb-3" />
            <span className="font-mono text-sm">EMAIL</span>
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-16 md:border-r border-gray-800 hover:bg-gray-900 transition-colors">
            <Github size={24} className="mb-3" />
            <span className="font-mono text-sm">GITHUB</span>
          </a>
          <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center py-16 hover:bg-gray-900 transition-colors">
            <Linkedin size={24} className="mb-3" />
            <span className="font-mono text-sm">LINKEDIN</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm font-mono">
        <p>© {new Date().getFullYear()} NOAH WEAVER // ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
};

export default Portfolio;