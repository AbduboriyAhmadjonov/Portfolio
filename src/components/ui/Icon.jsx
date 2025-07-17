export default function Icon({ link, title, icon }) {
  return (
    <section className="flex gap-6">
      <a
        href={link}
        target="_blank"
        className="text-muted-foreground hover:text-foreground"
        rel="noopener noreferrer"
        title={title}
      >
        <span className="sr-only">{title}</span>
        {icon}
      </a>
    </section>
  );
}
