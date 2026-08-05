import { type ReactNode } from 'react';

interface IconProps {
  link: string;
  title: string;
  icon: ReactNode;
}

export default function Icon({ link, title, icon }: IconProps) {
  return (
    <span className="flex gap-6">
      <a
        href={link}
        target="_blank"
        className="text-gray-400 hover:text-white transition-colors"
        rel="noopener noreferrer"
        title={title}
      >
        <span className="sr-only">{title}</span>
        {icon}
      </a>
    </span>
  );
}
