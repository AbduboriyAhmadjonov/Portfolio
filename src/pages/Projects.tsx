import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { RevealOnScroll } from '../hooks/RevealOnScroll';
import Modal from '../components/ui/Modal';
import projects from '../locales/projects.json';
import { FiTerminal, FiBarChart2, FiBookOpen, FiCheckSquare } from 'react-icons/fi';
import type { Project } from '../types';
import type { IconType } from 'react-icons';

const CATEGORIES = ['Software Projects'];

const typedProjects = projects as Project[];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const grouped = CATEGORIES.map((cat) => ({
    label: cat,
    items: typedProjects.filter((p) => p.category === cat),
  })).filter((g) => g.items.length > 0);

  const uncategorized = typedProjects.filter(
    (p) => !CATEGORIES.includes(p.category)
  );

  return (
    <section id="projects" className="flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4 w-full">
          <h2 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text [-webkit-background-clip:text] text-transparent text-center">
            Featured Projects
          </h2>

          {grouped.map(({ label, items }) => (
            <div key={label} className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/5 pb-2">
                {label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {items.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          ))}

          {uncategorized.length > 0 && (
            <div className="mb-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4 border-b border-white/5 pb-2">
                Other Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {uncategorized.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </RevealOnScroll>

      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)}>
            <h3 className="text-xl font-bold mb-1 pr-8">{selectedProject.title}</h3>
            {selectedProject.category && (
              <span className="inline-block text-xs text-cyan-400/70 bg-cyan-500/10 rounded-full px-2 py-0.5 mb-4">
                {selectedProject.category}
              </span>
            )}

            {selectedProject.image1 && (
              <img
                src={selectedProject.image1}
                alt={`${selectedProject.title} screenshot`}
                loading="lazy"
                className="rounded-lg mb-4 w-full object-cover max-h-64"
              />
            )}

            {selectedProject.problem && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">The Problem</p>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.problem}</p>
              </div>
            )}
            {selectedProject.architecture && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Architecture & Decisions</p>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.architecture}</p>
              </div>
            )}
            {selectedProject.outcome && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-1">Outcome</p>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedProject.outcome}</p>
              </div>
            )}

            {selectedProject.lessons && selectedProject.lessons.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">Engineering Takeaways</p>
                <ul className="space-y-1.5">
                  {selectedProject.lessons.map((lesson, i) => (
                    <li key={i} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                      <span className="text-blue-400 flex-shrink-0 mt-0.5">›</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedProject.tech.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-500/10 text-blue-400 py-0.5 px-3 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-white/10">
              {selectedProject.link_code && (
                <a
                  href={selectedProject.link_code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  GitHub →
                </a>
              )}
              {selectedProject.link_demo && (
                <a
                  href={selectedProject.link_demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-white/20 hover:border-white/40 text-gray-200 hover:text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                >
                  Live Demo
                </a>
              )}
            </div>
        </Modal>
      )}
    </section>
  );
}

const PLACEHOLDER_ICONS: Record<string, IconType> = {
  'TaskFlow': FiCheckSquare,
  'Simple Analytics': FiBarChart2,
  'Vocab Bot': FiBookOpen,
};

function getPlaceholderIcon(title: string): IconType {
  for (const [key, Icon] of Object.entries(PLACEHOLDER_ICONS)) {
    if (title.includes(key)) return Icon;
  }
  return FiTerminal;
}

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index?: number;
}

function ProjectCard({ project, onSelect, index = 0 }: ProjectCardProps) {
  const PlaceholderIcon = getPlaceholderIcon(project.title);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!(e.target as HTMLElement).closest('a')) onSelect(project);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !(e.target as HTMLElement).closest('a')) {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ animationDelay: `${index * 100}ms` }}
      className="rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition cursor-pointer animate-[fade-in_0.5s_ease-out_both] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      <div className="bg-slate-800 rounded-t-xl overflow-hidden aspect-video relative flex items-center justify-center">
        <PlaceholderIcon className="w-12 h-12 text-slate-600" />
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-2 leading-snug">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-3">{project.description ?? project.problem}</p>

        {project.keyEngineering && (
          <p className="text-sm mb-4 leading-relaxed">
            <span className="font-bold text-blue-400">Key Engineering: </span>
            <span className="text-gray-300">{project.keyEngineering}</span>
          </p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="bg-blue-500/10 text-blue-400 py-0.5 px-3 rounded-full text-xs hover:bg-blue-500/20 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <a
            href={project.link_code}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm py-2 min-h-[44px] flex items-center cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            View Code →
          </a>
          {project.link_demo ? (
            <a
              href={project.link_demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm py-2 min-h-[44px] flex items-center cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo →
            </a>
          ) : (
            <span className="text-gray-600 text-sm cursor-default">No demo</span>
          )}
        </div>
      </div>
    </div>
  );
}
