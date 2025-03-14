import React from 'react';
import { Book, Sun, Moon } from 'lucide-react';

const AshrakaaSection = () => {
  return (
    <section id="ashrakaa" className="border-b border-gray-800 py-12 relative overflow-hidden">
      {/* Background gradient representing the twilight between eternal day and night */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-800/20 to-gray-900/30 z-0"></div>
      
      {/* Content container */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <header className="mb-8 text-center">
          <h2 className="font-mono text-2xl tracking-wider mb-3">ASHRAKAA</h2>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="h-px bg-gray-700 w-12"></span>
            <Book size={16} />
            <span className="h-px bg-gray-700 w-12"></span>
          </div>
          <p className="text-purple-300 text-sm font-mono">WORLDBUILDING PROJECT</p>
        </header>
        
        {/* Main content - Simplified */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
          <div className="md:w-1/2">
            <p className="text-gray-300 mb-4 text-center md:text-left">
              Ashrakaa is a tidally locked planet where civilization exists in the narrow twilight ring 
              between eternal day and endless night.
            </p>
            
            <div className="border-l-2 border-purple-500/50 pl-4 my-4">
              <p className="text-gray-300 italic text-sm">
                "On Ashrakaa, civilization exists in the twilight ring between eternal day and endless night..."
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            {/* Simple visual representation */}
            <div className="h-24 w-24 md:h-32 md:w-32 relative rounded-full overflow-hidden border border-purple-500/30">
              {/* Day side */}
              <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-amber-500/50 to-transparent"></div>
              
              {/* Night side */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-indigo-900/70 to-transparent"></div>
              
              {/* Twilight line */}
              <div className="absolute top-0 bottom-0 w-1 left-1/2 -ml-0.5 bg-purple-500/40"></div>
            </div>
          </div>
        </div>
        
        {/* Coming soon banner */}
        <div className="mt-8 text-center">
          <span className="inline-block px-4 py-2 border border-purple-800/50 text-purple-400 rounded-full text-sm font-mono">
            COMING SOON
          </span>
        </div>
      </div>
    </section>
  );
};

export default AshrakaaSection;