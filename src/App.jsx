import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Noah Weaver</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
              <a href="#projects" className="text-gray-700 hover:text-gray-900">Projects</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
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
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Welcome to My Portfolio
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              I'm a developer passionate about building amazing web experiences.
            </p>
          </div>
        </div>
      </div>

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
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
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
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

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;