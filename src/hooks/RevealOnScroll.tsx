import { useEffect, useRef, useCallback, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
}

export const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const reveal = useCallback(() => {
    if (ref.current) {
      ref.current.style.opacity = '1';
      ref.current.style.transform = 'translateY(0)';
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0, rootMargin: '50px' }
    );

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [reveal]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      {children}
    </div>
  );
};
