import {
  FaTelegramPlane,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';
import Icon from './Icon';

export default function Icons() {
  return (
    <nav aria-label="Social links" className="my-6 flex flex-wrap items-center justify-center gap-5 sm:gap-6">
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
    </nav>
  );
}
