import { useState } from 'react';
import { RevealOnScroll } from '../hooks/RevealOnScroll';

const backendSkills = [
  'Node.js', 'NestJS', 'Express', 'Fastify', 'TypeScript', 'Python',
  'REST APIs', 'GraphQL',
  'PostgreSQL', 'MongoDB', 'Prisma', 'Mongoose', 'Supabase',
];
const frontendSkills = ['React', 'TypeScript', 'TanStack Query', 'TailwindCSS', 'HTML5', 'CSS3'];
const practiceSkills = [
  'Docker', 'Linux server administration', 'CI/CD (GitHub Actions)', 'Git & GitHub',
  'JWT auth', 'Unit testing', 'Swagger/OpenAPI', 'Webhooks & idempotent integrations',
  'Hetzner', 'DigitalOcean',
];

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4 w-full">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text [-webkit-background-clip:text] text-transparent text-center">
            About Me
          </h2>

          {/* Bio */}
          <div className="rounded-xl p-5 sm:p-8 border border-white/10 hover:-translate-y-1 transition-all mb-6 cursor-default">
            <p className="text-gray-300 mb-3 text-sm sm:text-base leading-relaxed">
              Backend-focused full-stack developer based in Tashkent, Uzbekistan. I ship services
              end to end — Node.js and TypeScript APIs, PostgreSQL schemas, React front ends — and
              I keep them running afterwards.
            </p>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Currently building and maintaining production systems for five client companies across
              Europe, Canada, and Uzbekistan: REST integrations between systems that disagree with
              each other, self-hosted services on Linux and Docker, and the deployment and support
              that follows. I learn fast by building, and I care about why a product is built, not
              only how.
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="rounded-xl p-4 sm:p-6 border border-white/10 hover:-translate-y-1 transition-all cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Backend & Databases</h3>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4 sm:p-6 border border-white/10 hover:-translate-y-1 transition-all cursor-default">
              <h3 className="text-lg sm:text-xl font-bold mb-3">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {frontendSkills.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-500/10 text-blue-400 py-1 px-3 rounded-full text-xs sm:text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Practices & ops */}
          <div className="rounded-xl p-4 sm:p-6 border border-white/10 hover:-translate-y-1 transition-all mb-6 cursor-default">
            <h3 className="text-lg sm:text-xl font-bold mb-3">Practices & Ops</h3>
            <div className="flex flex-wrap gap-2">
              {practiceSkills.map((tech) => (
                <span
                  key={tech}
                  className="bg-cyan-500/10 text-cyan-400 py-1 px-3 rounded-full text-xs sm:text-sm hover:bg-cyan-500/20 transition"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Experience / Education tabs */}
          <ExperienceEducationTabs />
        </div>
      </RevealOnScroll>
    </section>
  );
}

/* ── Timeline sub-components ── */

type Tab = 'experience' | 'education';

interface TimelineEntry {
  title: string;
  subtitle?: string;
  subtitleHref?: string;
  date: string;
  bullets: string[];
}

const EXPERIENCE: TimelineEntry[] = [
  {
    title: 'Automation Engineer / Full-Stack Developer',
    subtitle: 'HERB Media (Automation Agency)',
    date: '2024 – Present',
    bullets: [
      'Built production n8n automation workflows for 3+ EU-based clients',
      'Developed ClickUp task management automations, Slack integrations, and Google Sheets reporting pipelines',
      'Deployed client-facing web tools on VPS infrastructure',
    ],
  },
  {
    title: 'AI Agentic Developer',
    subtitle: 'UzVIP Agency',
    date: 'Oct 2025 – Present',
    bullets: [
      'Build and deploy n8n automation workflows for client business processes',
      'Integrate LLMs (Claude, OpenAI) into Slack, Airtable, and Google Workspace',
      'Design multi-step agentic pipelines that handle lead routing, notifications, and reporting',
    ],
  },
  {
    title: 'Freelance Full-Stack Developer',
    date: 'Jul 2024 – Present',
    bullets: [
      'Deliver REST and GraphQL APIs using Node.js, Express, and NestJS',
      'Build React frontends and set up PostgreSQL/MongoDB schemas with migrations',
      'Build Telegram bots and integrate third-party APIs for client automation needs',
    ],
  },
  {
    title: 'IT Department — Military University (JXU)',
    date: 'Oct 2022 – Oct 2025',
    bullets: [
      'Maintained internal web systems and IT infrastructure',
      'Built internal tools and automations to streamline departmental workflows',
    ],
  },
];

const EDUCATION: TimelineEntry[] = [
  {
    title: 'B.S. Telecommunication Technologies',
    subtitle: 'TUIT, Uzbekistan',
    subtitleHref: 'https://tuit.uz/',
    date: '2022 – 2027',
    bullets: [
      'Data Structures, Web Development, Cloud Computing',
    ],
  },
];

function ExperienceEducationTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('experience');

  return (
    <div className="rounded-xl border border-white/10 p-5 sm:p-6">
      {/* Tab switcher */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-full border border-white/10 p-1 bg-white/5">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'experience'
                ? 'bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'education'
                ? 'bg-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* Content with fade */}
      <div
        key={activeTab}
        className="animate-[fade-in_0.2s_ease-out]"
      >
        <Timeline entries={activeTab === 'experience' ? EXPERIENCE : EDUCATION} />
      </div>
    </div>
  );
}

function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-blue-500/30" />

      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.title} className="relative">
            {/* Dot */}
            <div className="absolute -left-6 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-blue-500 bg-[#030612]" />

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-1">
              <h4 className="font-semibold text-white text-base leading-tight">{entry.title}</h4>
              <span className="text-gray-400 text-xs whitespace-nowrap">{entry.date}</span>
            </div>

            {/* Company / Institution */}
            {entry.subtitle && (
              entry.subtitleHref ? (
                <a
                  href={entry.subtitleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm underline underline-offset-2 mb-1.5 inline-block"
                >
                  {entry.subtitle}
                </a>
              ) : (
                <p className="text-blue-400 text-sm mb-1.5">{entry.subtitle}</p>
              )
            )}

            {/* Bullets */}
            {entry.bullets.length > 0 && (
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                {entry.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
