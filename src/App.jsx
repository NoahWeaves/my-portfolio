import React, { useState } from 'react';
import { Github, Linkedin, Mail, Menu, X, ExternalLink, FileText } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
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
              <button onClick={() => scrollToSection('about')} className="font-mono text-sm hover:text-gray-400 transition-colors">ABOUT</button>
              <button onClick={() => scrollToSection('experience')} className="font-mono text-sm hover:text-gray-400 transition-colors">EXPERIENCE</button>
              <button onClick={() => scrollToSection('technical')} className="font-mono text-sm hover:text-gray-400 transition-colors">TECHNICAL</button>
              <button onClick={() => scrollToSection('publications')} className="font-mono text-sm hover:text-gray-400 transition-colors">PUBLICATIONS</button>
              <button onClick={() => scrollToSection('projects')} className="font-mono text-sm hover:text-gray-400 transition-colors">PROJECTS</button>
              <button onClick={() => scrollToSection('contact')} className="font-mono text-sm hover:text-gray-400 transition-colors">CONTACT</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('about')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">ABOUT</button>
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">EXPERIENCE</button>
              <button onClick={() => scrollToSection('technical')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">TECHNICAL</button>
              <button onClick={() => scrollToSection('publications')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">PUBLICATIONS</button>
              <button onClick={() => scrollToSection('projects')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">PROJECTS</button>
              <button onClick={() => scrollToSection('contact')} className="block w-full text-left font-mono text-sm py-2 hover:text-gray-400">CONTACT</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-16 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-mono text-4xl md:text-6xl mb-4 tracking-tight">
            Noah Weaver
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-6">
            Computer Science • Research • Development
          </p>
          <div className="flex justify-center gap-6">
            <a href="#contact" className="font-mono text-sm border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors">
              CONTACT
            </a>
            <a href="/resume.pdf" className="font-mono text-sm border border-gray-700 px-6 py-3 hover:border-white transition-colors">
              RESUME
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-mono text-2xl mb-8 tracking-wider">ABOUT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 mb-4">
                I am currently pursuing my PhD in Computer Science at Mohamed bin Zayed University of Artificial Intelligence with a focus on increasing the capabilities of Graphics Processing Units (GPUs).
              </p>
              <p className="text-gray-400 mb-4">
                Currently, I am developing my brief paper that was recently published at RTSS 2025: "Work-in-Progress: Enabling Transparent Priority
Scheduling for NVIDIA GPUs".
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-4">EDUCATION</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-white font-mono text-sm">PhD COMPUTER SCIENCE</p>
                  <p className="text-gray-400 text-sm">MBZUAI</p>
                  <p className="text-gray-400 text-xs">2025 - 2029 (expected)</p>
                </div>
                <div>
                  <p className="text-white font-mono text-sm">BS COMPUTER SCIENCE</p>
                  <p className="text-gray-400 text-sm">UNC Chapel Hill</p>
                  <p className="text-gray-400 text-xs">2021 - 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Technical Skills Section */}
<section id="technical" className="border-b border-gray-800">
  <div className="max-w-6xl mx-auto px-4 py-12">
    <h2 className="font-mono text-2xl mb-8 tracking-wider">TECHNICAL SKILLS</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="font-mono text-sm mb-4">PROGRAMMING LANGUAGES</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">C</span>
            <div className="w-24 bg-gray-800 h-1">
              <div className="bg-white h-1 w-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Python</span>
            <div className="w-24 bg-gray-800 h-1">
              <div className="bg-white h-1 w-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">JavaScript</span>
            <div className="w-24 bg-gray-800 h-1">
              <div className="bg-white h-1 w-20"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">CUDA</span>
            <div className="w-24 bg-gray-800 h-1">
              <div className="bg-white h-1 w-14"></div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Verilog</span>
            <div className="w-24 bg-gray-800 h-1">
              <div className="bg-white h-1 w-14"></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-mono text-sm mb-4">TECHNOLOGIES & FRAMEWORKS</h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">REACT</span>
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">NODE.JS</span>
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">PYTORCH</span>
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">CUDA</span>
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">GIT</span>
          <span className="px-2 py-1 border border-gray-700 text-xs font-mono">LINUX</span>
        </div>
      </div>

      <div>
        <h3 className="font-mono text-sm mb-4">AREAS OF INTEREST</h3>
        <div className="grid grid-cols-2 gap-2">
          <span className="text-gray-400 text-sm">Operating Systems</span>
          <span className="text-gray-400 text-sm">Web Development</span>
          <span className="text-gray-400 text-sm">GPU Scheduling</span>
          <span className="text-gray-400 text-sm">Algorithm Design</span>
          <span className="text-gray-400 text-sm">NLP Architecture</span>
          <span className="text-gray-400 text-sm">System Design</span>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Experience Section */}
      <section id="experience" className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-mono text-2xl mb-8 tracking-wider">EXPERIENCE</h2>
          
          <div className="space-y-8">
            {/* Experience Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="font-mono text-sm text-gray-400">[2021]</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-mono text-lg mb-2">Software Engineering Intern</h3>
                <p className="text-gray-400 text-sm mb-4">Symbolic Frameworks</p>
                <ul className="space-y-2">
                  <li className="text-gray-400 text-sm">• Key responsibility or achievement</li>
                  <li className="text-gray-400 text-sm">• Technical contribution or project</li>
                  <li className="text-gray-400 text-sm">• Measurable impact or result</li>
                </ul>
              </div>
            </div>

            {/* Add more as needed */}
          </div>
        </div>
      </section>

     

      {/* Publications Section */}
      <section id="publications" className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-mono text-2xl mb-8 tracking-wider">PUBLICATIONS</h2>
          
          <div className="space-y-6">
            {/* Publication Item */}
            <div className="border border-gray-800 p-6 hover:border-gray-700 transition-colors">
              <h3 className="font-mono text-lg mb-3">
                Work-in-Progress: Enabling Transparent Priority
Scheduling for NVIDIA GPUs
              </h3>
              <p className="text-gray-400 text-sm mb-2">
                Noah Weaver, Joshua Bakita
              </p>
              <p className="text-gray-400 text-sm mb-4">
                IEEE Real-Time Systems Symposium • December 2025
              </p>
              <p className="text-gray-400 mb-4">
                Abstract—Modern embedded systems increasingly rely on
GPUs for safety-critical tasks such as object detection in au-
tonomous vehicles and data visualization in medical diagnos-
tics. These applications require running high-priority workloads
alongside lower-priority tasks on shared GPU hardware due
to cost, power, or space constraints. However, NVIDIA GPUs
employ round-robin scheduling that treats all tasks equally,
causing unpredictable delays for critical workloads. Existing GPU
priority scheduling solutions require application modifications,
introduce high overhead, or depend on specialized embedded
hardware. We present a GPU-level static priority scheduler built
on the nvsched framework that requires no application changes
and runs on commodity GPUs. Our scheduler maintains tasks in
a priority-ordered queue and uses a parameter communication
system to enable dynamic priority updates from userspace.
Experiments with MobileNetV3 inference under GPU contention
demonstrate 32–41% lower maximum latency for high-priority
tasks when using our scheduler compared to NVIDIA's default
scheduler. Our approach provides practical priority control for
GPU workloads while maintaining low scheduling overhead.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="font-mono text-sm border border-gray-700 px-4 py-2 hover:border-white transition-colors inline-flex items-center gap-2"
                >
                  <FileText size={16} />
                  READ PAPER
                </a>
              </div>
            </div>

            {/* Add more publications as needed */}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="font-mono text-2xl mb-8 tracking-wider">CONTACT</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-400 mb-6">
                I'm always interested in discussing new opportunities, research collaborations, 
                or interesting technical challenges.
              </p>
              <a 
                href="mailto:noahgweaver@gmail.com" 
                className="font-mono text-sm border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors inline-block"
              >
                GET IN TOUCH
              </a>
            </div>
            
            <div>
              <h3 className="font-mono text-sm mb-4">LINKS</h3>
              <div className="space-y-4">
                <a 
                  href="https://github.com/NoahWeaves" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={20} />
                  <span className="font-mono text-sm">GITHUB</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/noah-weaver-45b698155" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                  <span className="font-mono text-sm">LINKEDIN</span>
                </a>
                <a 
                  href="mailto:noahgweaver@gmail.com" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  <span className="font-mono text-sm">EMAIL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm font-mono">© 2025 Noah Weaver</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;