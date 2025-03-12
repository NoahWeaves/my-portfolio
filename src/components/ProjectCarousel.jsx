import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';

const ProjectCarousel = ({ projects = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No projects to display</p>
      </div>
    );
  }

  const nextSlide = (e) => {
    e.stopPropagation(); // Prevent click from triggering project expansion
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = (e) => {
    e.stopPropagation(); // Prevent click from triggering project expansion
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index, e) => {
    e.stopPropagation(); // Prevent click from triggering project expansion
    setCurrentIndex(index);
  };

  const handleProjectClick = () => {
    setSelectedProject(projects[currentIndex]);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const currentProject = projects[currentIndex];

  return (
    <>
      <div 
        className="relative w-full cursor-pointer"
        onClick={handleProjectClick}
      >
        {/* Main Project Display */}
        <div className="relative h-96 overflow-hidden bg-gray-100 rounded-lg transition-transform duration-300 hover:scale-[1.01]">
          <img 
            src={currentProject.image} 
            alt={currentProject.title}
            className="w-full h-full object-cover"
          />
          
          {/* Project Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              {currentProject.title}
            </h3>
            <p className="text-white/90 mb-4">
              {currentProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {currentProject.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Only show navigation if there's more than one project */}
          {projects.length > 1 && (
            <>
              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center space-x-2 mt-4">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => goToSlide(index, e)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expanded Project View */}
      {selectedProject && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto transition-all duration-500 ease-in-out">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <button 
              onClick={handleClose}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </button>
            
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />
            
            <h2 className="text-4xl font-bold mb-4">{selectedProject.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <p className="text-gray-600 text-lg mb-8">{selectedProject.description}</p>
            
            <div className="prose max-w-none">
              {selectedProject.longDescription && (
                <>
                  <h3 className="text-2xl font-semibold mb-4">Project Details</h3>
                  <p className="mb-4">{selectedProject.longDescription}</p>
                </>
              )}
              
              <h3 className="text-2xl font-semibold mb-4">Technologies Used</h3>
              <ul className="list-disc pl-6 mb-4">
                {selectedProject.tags.map((tech, index) => (
                  <li key={index} className="mb-2">{tech}</li>
                ))}
              </ul>
              
              <div className="flex gap-4 mt-8">
                {selectedProject.demoLink && (
                  <a 
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    View Demo
                  </a>
                )}
                
                {selectedProject.githubLink && (
                  <a 
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCarousel;