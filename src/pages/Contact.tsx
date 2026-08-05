import { useState, useRef, type FormEvent } from 'react';
import { RevealOnScroll } from '../hooks/RevealOnScroll';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { FaEnvelope, FaTelegramPlane, FaLinkedinIn, FaGithub } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const CONTACT_LINKS = [
  { href: 'mailto:ahmadjonovabduboriy3@gmail.com', icon: FaEnvelope, label: 'Email' },
  { href: 'https://t.me/abduboriy05', icon: FaTelegramPlane, label: 'Telegram' },
  { href: 'https://www.linkedin.com/in/abduboriy-ahmadjonov-2b18a0266', icon: FaLinkedinIn, label: 'LinkedIn' },
  { href: 'https://github.com/AbduboriyAhmadjonov', icon: FaGithub, label: 'GitHub' },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    emailjs.init({ publicKey: PUBLIC_KEY });

    const sendPromise = emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.currentTarget, PUBLIC_KEY);

    toast.promise(
      sendPromise,
      {
        loading: 'Sending…',
        success: 'Message Sent!',
        error: 'Oops! Something went wrong. Please try again.',
      },
      {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
      }
    );

    sendPromise
      .then(() => setFormData({ name: '', email: '', message: '' }))
      .finally(() => setIsSending(false));
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-blue-500 focus:bg-blue-500/5 placeholder:text-gray-500 text-sm sm:text-base';

  return (
    <section id="contact" className="py-20 pb-12">
      <Toaster position="top-center" reverseOrder={false} />
      <RevealOnScroll>
        <div className="px-4 w-full max-w-md mx-auto">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-sm sm:text-base text-center mb-6 max-w-sm mx-auto leading-relaxed">
            Have a project idea or just want to connect? Drop me a message.
          </p>

          {/* Direct contact icons */}
          <div className="flex justify-center flex-wrap gap-4 mb-8">
            {CONTACT_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 group"
                title={label}
              >
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <span className="text-[10px] text-gray-500 group-hover:text-gray-300 transition-colors">{label}</span>
              </a>
            ))}
          </div>

          <form ref={formRef} className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="sr-only">Your name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  className={inputClass}
                  placeholder="Name…"
                  autoComplete="name"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  className={inputClass}
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="sr-only">Your message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                className={inputClass}
                placeholder="Your Message…"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              aria-busy={isSending}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSending ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-5">
            I typically respond within 24 hours.
          </p>
        </div>
      </RevealOnScroll>
    </section>
  );
}
