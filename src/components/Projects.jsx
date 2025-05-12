const projects = [
  { name: 'FinBot AI', subdomain: 'finbot' },
  { name: 'Cyber Sentinel', subdomain: 'cyber' },
  { name: 'SkillForge LMS', subdomain: 'skillforge' },
];

export default function Projects() {
  return (
    <section id="projects" className="my-16">
      <h3 className="text-3xl font-semibold mb-6 text-center">Projects</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.name}
            className="bg-gray-100 dark:bg-gray-800 p-5 rounded shadow hover:shadow-lg transition"
          >
            <h4 className="text-xl font-bold mb-2">{project.name}</h4>
            <a
              href={`https://${project.subdomain}.abduboriy.tech`}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.subdomain}.abduboriy.tech
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
