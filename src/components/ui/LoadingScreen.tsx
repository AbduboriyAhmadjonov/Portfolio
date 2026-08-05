import { useEffect } from 'react';

const LOADING_DURATION_MS = 400;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const t = setTimeout(() => onComplete(), LOADING_DURATION_MS);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 text-gray-100 flex flex-col items-center justify-center"
      style={{ background: '#030612' }}
    >
      <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
    </div>
  );
}
