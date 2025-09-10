import {
  FaTelegramPlane,
  FaLinkedinIn,
  FaFileDownload,
  FaGithub,
  FaEnvelope,
  FaEye,
} from 'react-icons/fa';
import Icon from './Icon';

export default function Icons() {
  return (
    <section className="my-6 flex flex-wrap items-center justify-center gap-4">
      <div className="relative group/resume">
        <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
          <span className="font-semibold">Resume</span>
          <FaFileDownload size={18} />
        </button>

        <div className="absolute z-10 flex-col gap-2 bg-zinc-900 text-white rounded shadow-lg p-2 opacity-0 group-hover/resume:opacity-100 group-hover/resume:translate-y-0 translate-y-2 pointer-events-none group-hover/resume:pointer-events-auto transition-all duration-200 w-max min-w-[150px]">
          <a
            href="/2025_CV_compressed.pdf"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1 hover:bg-zinc-800 rounded text-sm"
          >
            <FaEye size={16} />
            View Resume
          </a>
          <a
            href="/2025_CV_compressed.pdf"
            download
            className="flex items-center gap-2 px-3 py-1 hover:bg-zinc-800 rounded text-sm"
          >
            <FaFileDownload size={16} />
            Download PDF
          </a>
        </div>
      </div>

      <section className="flex gap-6">
        <Icon
          link="https://www.linkedin.com/in/abduboriy-ahmadjonov-2b18a0266"
          title="LinkedIn"
          icon={<FaLinkedinIn size={20} />}
        />
        <Icon
          link="https://github.com/AbduboriyAhmadjonov"
          title="GitHub"
          icon={<FaGithub size={20} />}
        />
        <Icon
          link="mailto:ahmadjonovabduboriy3@gmail.com"
          title="Email"
          icon={<FaEnvelope size={20} />}
        />
        <Icon
          link="https://t.me/abduboriy05"
          title="Telegram"
          icon={<FaTelegramPlane size={20} />}
        />
      </section>
    </section>
  );
}
