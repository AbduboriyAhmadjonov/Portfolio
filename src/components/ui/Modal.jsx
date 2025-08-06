import { useEffect, useRef, useState } from 'react';

export default function Modal({ onClose, children }) {
  const [show, setShow] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setTimeout(() => setShow(true), 10);

    document.body.style.overflow = 'hidden';

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
        show ? 'bg-black/60 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div
        ref={modalRef}
        className={`transform transition-all duration-300 max-w-2xl w-full mx-4 rounded-xl shadow-2xl p-6 relative bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
