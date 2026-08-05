import Icons from '../components/ui/Icons';
import { RevealOnScroll } from '../hooks/RevealOnScroll';
import { FaAngleRight, FaDownload } from 'react-icons/fa';

export default function Home() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text [-webkit-background-clip:text] text-transparent leading-tight">
            I build full-stack applications and AI-powered automations that teams depend on.
          </h1>

          <p className="text-gray-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
            Full-Stack Developer & AI Automation Engineer — building production-ready APIs,
            modern React frontends, and intelligent automations with Node.js, NestJS, and PostgreSQL.
          </p>

          <Icons />

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 flex-wrap">
            <a
              href="#projects"
              className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>View Projects</span>
              <FaAngleRight />
            </a>

            <a
              href="/2025_CV_compressed.pdf"
              download
              className="bg-white/5 border border-blue-500/50 text-blue-400 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:bg-blue-500/10 flex items-center justify-center gap-2 w-full sm:w-auto"
              aria-label="Download CV"
            >
              <FaDownload size={14} />
              <span>Download CV</span>
            </a>

            <a
              href="#contact"
              className="border border-white/20 text-gray-300 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-500/40 hover:text-white hover:bg-white/5 text-center w-full sm:w-auto"
            >
              Contact Me
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
