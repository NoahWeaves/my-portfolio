import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import ProjectCarousel from './components/ProjectCarousel';
import ProjectsSection from './components/ProjectsSection';
import TiltingGridHero from './components/TiltingGridHero';
import InteractiveGrid from './components/InteractiveGrid';
import GridVisualization from './components/GridVisualization';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [layers, setLayers] = useState([
    { id: 0, cells: [] },
    { id: 1, cells: [] }
  ]);

  const handleLayerUpdate = ({ layerId, cells }) => {
    setLayers(prevLayers => 
      prevLayers.map(layer => 
        layer.id === layerId 
          ? { ...layer, cells } 
          : layer
      )
    );
  };

  // Sample project data - replace with your own
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of your first project and what technologies you used.",
      image: "/api/placeholder/400/300",
      tags: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Project 2",
      description: "Description of your second project highlighting your key achievements.",
      image: "/api/placeholder/400/300",
      tags: ["Python", "Machine Learning", "AWS"]
    },
    {
      title: "Project 3",
      description: "Overview of your third project showcasing your problem-solving skills.",
      image: "/api/placeholder/400/300",
      tags: ["JavaScript", "Firebase", "REST API"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Noah Weaver</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-slate-200 hover:text-white">About</a>
              <a href="#projects" className="text-slate-200 hover:text-white">Projects</a>
              <a href="#contact" className="text-slate-200 hover:text-white">Contact</a>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-gray-900">About</a>
              <a href="#projects" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Projects</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-gray-900">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <InteractiveGrid 
        layerId={0}
        onCellUpdate={handleLayerUpdate}
      />

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600 leading-relaxed">
              Hello! I'm a software developer with expertise in web development, 
              machine learning, and cloud technologies. I love solving complex 
              problems and building user-friendly applications.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* Interactive Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Interactive Grid</h2>
          <InteractiveGrid 
            layerId={1}
            onCellUpdate={handleLayerUpdate}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Github size={24} />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* 3D Visualization */}
      <div className="fixed bottom-8 right-8 w-96 h-96 bg-black rounded-lg shadow-lg overflow-hidden">
        <GridVisualization layers={layers} />
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Noah Weaver. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;