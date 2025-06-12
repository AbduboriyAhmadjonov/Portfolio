import { RevealOnScroll } from '../RevealOnScroll';

export const Projects = () => {
  const projects = [
    {
      title: 'FinBot AI',
      description:
        'Telegram-based AI personal finance manager with voice input, smart categorization, and budget tracking. Built with PostgreSQL and Google Speech API.',
      tech: ['Node.js', 'Telegram Bot API', 'PostgreSQL', 'Google Cloud STT'],
      link: 'https://github.com/yourusername/finbot-ai',
    },
    {
      title: 'Cyber Threat Intelligence Platform',
      description:
        'A Cyber Threat Intelligence Platform collecting data from OSINT sources and analyzing threats using AI with a GraphQL API backend.',
      tech: [
        'GraphQL',
        'Express.js',
        'MongoDB',
        'VirusTotal API',
        'PhishTank API',
      ],
      link: 'https://github.com/yourusername/cyber-sentinel',
    },
    // {
    //   title: 'SkillForge LMS',
    //   description:
    //     'Learning Management System with progress tracking, AI-generated quizzes, and real-time notifications. Focused on developer upskilling.',
    //   tech: ['React', 'Node.js', 'Firebase', 'Tailwind CSS'],
    //   link: 'https://github.com/yourusername/skillforge',
    // },
    // {
    //   title: 'AI Book Reader',
    //   description:
    //     'Book platform that converts text to speech using AI voices, simplifies vocabulary, and offers discussion forums with reading progress sync.',
    //   tech: ['Next.js', 'OpenAI API', 'Supabase', 'TTS API'],
    //   link: 'https://github.com/yourusername/ai-book-reader',
    // },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
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
                <div className="flex justify-between items-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
