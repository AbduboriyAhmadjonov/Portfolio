import { useState } from 'react';
import { RevealOnScroll } from '../hooks/RevealOnScroll';
import Modal from '../components/ui/Modal';
import projects from '../locales/projects.json';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                onClick={(e) => {
                  const isLink = e.target.closest('a');
                  if (!isLink) setSelectedProject(project);
                }}
                key={index}
                className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition hover:cursor-pointer"
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mx-2">
                  <a
                    href={project.link_code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                  >
                    View Code →
                  </a>
                  {project.link_demo ? (
                    <a
                      href={project.link_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                    >
                      🌐 Live Demo →
                    </a>
                  ) : (
                    <span className="text-gray-500">Demo not available</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProject && (
          <Modal onClose={() => setSelectedProject(null)}>
            <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
            <img
              src={selectedProject.image1}
              alt="project screenshot"
              className="rounded-lg mb-4"
            />
            <p className="text-gray-300 mb-4">{selectedProject.longDescription}</p>
            <p className="text-sm text-gray-400 mb-2">
              <strong>What I learned:</strong> {selectedProject.lessons}
            </p>
            <div className="flex gap-4">
              <a href={selectedProject.link} target="_blank" className="text-blue-400 underline">
                GitHub
              </a>
              {selectedProject.liveDemo && (
                <a
                  href={selectedProject.liveDemo}
                  target="_blank"
                  className="text-green-400 underline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </Modal>
        )}
      </RevealOnScroll>
    </section>
  );
}
