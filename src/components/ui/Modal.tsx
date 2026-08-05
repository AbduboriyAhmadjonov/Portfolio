import { useEffect, useRef, useState, type ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 10);
    document.body.style.overflow = 'hidden';
    scrollRef.current?.scrollTo(0, 0);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-colors duration-300 ${
        show ? 'bg-[#0f172a]/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
      role="presentation"
      onMouseDown={handleBackdropClick}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        className={`transform transition-all duration-300 w-full max-w-2xl rounded-2xl shadow-2xl relative
          bg-[#0d1117] text-gray-100 border border-white/10
          max-h-[90vh] flex flex-col modal-scrollable
          ${show ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}`}
      >
        <div ref={scrollRef} className="overflow-y-auto overscroll-contain p-5 sm:p-6 modal-scrollable">
          {children}
        </div>
      </div>
    </div>
  );
}
