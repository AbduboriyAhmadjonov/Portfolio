import {
  FaTelegramPlane,
  FaLinkedinIn,
  FaFileDownload,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';
import Icon from './Icon';

export default function Icons() {
  return (
    <section className="my-6 flex flex-wrap items-center justify-center gap-4">
      <a target="_blank" href="/resume.pdf">
        <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
          <span className="font-semibold">Resume</span>
          <FaFileDownload size={20} />
        </button>
      </a>
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
          link="https://mailto:ahmadjonovabduboriy3@gmail.com"
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
