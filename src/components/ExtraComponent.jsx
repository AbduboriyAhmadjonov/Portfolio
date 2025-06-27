import Icons from './icons/Icons';

export default function ExtraComponent() {
  return (
    <section className="my-6 flex flex-wrap items-center justify-center gap-4">
      <a target="_blank" href="/resume.pdf">
        <button className="hover:cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
          <span className="font-semibold">Resume</span>
          <Icons.FileDownload />
        </button>
      </a>
      <section className="flex gap-6">
        <a
          href="https://www.linkedin.com/in/abduboriy-ahmadjonov-2b18a0266"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title="LinkedIn"
        >
          <span className="sr-only">LinkedIn</span>
          <Icons.LinkedinIcon />
        </a>
        <a
          href="https://github.com/AbduboriyAhmadjonov"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <span className="sr-only">GitHub</span>
          <Icons.GithubIcon />
        </a>
        <a
          href="https://mailto:ahmadjonovabduboriy3@gmail.com"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title="Email"
        >
          <span className="sr-only">Email</span>
          <Icons.EmailIcon />
        </a>
        <a
          href="https://t.me/abduboriy05"
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title="Telegram"
        >
          <span className="sr-only">Telegram</span>
          <Icons.TelegramIcon />
        </a>
      </section>
    </section>
  );
}
