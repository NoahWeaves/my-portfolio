import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import ProjectCarousel from './ProjectCarousel';

const ProjectCard = ({ project, index, onClick }) => (
  <div 
    onClick={() => onClick(index)}
    className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
  >
    <img 
      src={project.image} 
      alt={project.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, tagIndex) => (
          <span 
            key={tagIndex}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ExpandedProject = ({ project, onClose }) => (
  <div className="fixed inset-0 bg-white z-50 overflow-y-auto transition-all duration-500 ease-in-out">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button 
        onClick={onClose}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Projects</span>
      </button>
      
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      
      <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span 
            key={index}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <p className="text-gray-600 text-lg mb-8">{project.description}</p>
      
      <div className="prose max-w-none">
        {project.longDescription && (
          <>
            <h3 className="text-2xl font-semibold mb-4">Project Details</h3>
            <p className="mb-4">{project.longDescription}</p>
          </>
        )}
        
        <h3 className="text-2xl font-semibold mb-4">Technologies Used</h3>
        <ul className="list-disc pl-6 mb-4">
          {project.tags.map((tech, index) => (
            <li key={index} className="mb-2">{tech}</li>
          ))}
        </ul>
        
        <div className="flex gap-4 mt-8">
          {project.demoLink && (
            <a 
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              View Demo
            </a>
          )}
          
          {project.githubLink && (
            <a 
              href={project.githubLink}
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
);

const ProjectsSection = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (index) => {
    setSelectedProject(projects[index]);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
        
        {/* Carousel at the top */}
        <div className="mb-16">
          <ProjectCarousel projects={projects} />
        </div>
        
        {/* Grid of project cards below */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              project={project}
              index={index}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <ExpandedProject 
          project={selectedProject}
          onClose={handleClose}
        />
      )}
    </section>
  );
};

export default ProjectsSection;