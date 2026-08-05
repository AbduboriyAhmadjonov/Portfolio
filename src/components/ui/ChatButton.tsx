import { useState, useRef, useEffect, useCallback, type KeyboardEvent, type RefObject } from 'react';
import {
  LuBot,
  LuSendHorizontal,
  LuTrash2,
  LuX,
  LuUser,
  LuMinus,
  LuZap,
} from 'react-icons/lu';
import type { ChatMessage, ChatResponse } from '../../types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TOOLTIP_SHOW_DELAY_MS = 2000;
const TOOLTIP_HIDE_DELAY_MS = 8000;
const HEALTH_CHECK_INTERVAL_MS = 30000;
const INPUT_FOCUS_DELAY_MS = 300;
const FAB_LIFT_ABOVE_FOOTER_PX = 16;
const ZAP_FLASH_MIN_MS = 4000;
const ZAP_FLASH_MAX_MS = 6000;

interface QuickChip {
  label: string;
  message: string;
}

const QUICK_CHIPS: QuickChip[] = [
  { label: 'Node/NestJS Skills', message: 'What are Abduboriy\'s Node.js and NestJS skills?' },
  { label: 'Python Projects', message: 'Tell me about Abduboriy\'s Python projects' },
  { label: 'Summarize Resume', message: 'Give me a brief summary of Abduboriy\'s resume and experience' },
];

const TOOLTIP_TEXT = 'Ask me about my full-stack skills!';

interface ChatButtonProps {
  menuOpen?: boolean;
}

export default function ChatButton({ menuOpen = false }: ChatButtonProps) {
  const [open, setOpen] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fabVisible, setFabVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [zapFlash, setZapFlash] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lightning flash animation — random 4-6s interval, only when online
  useEffect(() => {
    if (!isWorking) return;
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleFlash = () => {
      const delay = ZAP_FLASH_MIN_MS + Math.random() * (ZAP_FLASH_MAX_MS - ZAP_FLASH_MIN_MS);
      timeout = setTimeout(() => {
        setZapFlash(true);
        setTimeout(() => setZapFlash(false), 400);
        scheduleFlash();
      }, delay);
    };
    scheduleFlash();
    return () => clearTimeout(timeout);
  }, [isWorking]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), TOOLTIP_SHOW_DELAY_MS);
    const hideTimer = setTimeout(() => setShowTooltip(false), TOOLTIP_HIDE_DELAY_MS);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    const check = () => {
      const modalOpen = document.body.style.overflow === 'hidden';
      setFabVisible(!modalOpen && !menuOpen);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, [menuOpen]);

  const [fabLift, setFabLift] = useState(0);
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const onScroll = () => {
      const footerRect = footer.getBoundingClientRect();
      const fabDefaultBottom = window.innerWidth < 640 ? 48 : 64; // bottom-12 / bottom-16
      const fabBottomEdge = window.innerHeight - fabDefaultBottom;
      const overlap = fabBottomEdge - footerRect.top + FAB_LIFT_ABOVE_FOOTER_PX;
      setFabLift(overlap > 0 ? overlap : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const checkHealth = useCallback(() => {
    fetch(`${BACKEND_URL}/api/health`)
      .then((r) => setIsWorking(r.ok))
      .catch(() => setIsWorking(false));
  }, []);

  useEffect(() => { checkHealth(); }, [checkHealth]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(checkHealth, HEALTH_CHECK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [open, checkHealth]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), INPUT_FOCUS_DELAY_MS);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape' && open) setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const createTimestamp = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const sendMessage = async (text?: string) => {
    const msg = text || inputMessage.trim();
    if (!msg || isLoading) return;
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: msg,
      sender: 'user',
      timestamp: createTimestamp(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });
      if (!response.ok) { setIsWorking(false); throw new Error('Network response was not ok'); }
      const data: ChatResponse = await response.json();
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I couldn't process that request.",
        sender: 'bot',
        timestamp: createTimestamp(),
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsWorking(false);
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: createTimestamp(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearMessages = () => setMessages([]);
  const showFab = fabVisible && !open;

  return (
    <>
      {/* Desktop chat panel */}
      <div
        className={`hidden sm:block fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onClick={() => setOpen(false)}
      >
        <div
          className={`absolute bottom-20 right-6 w-full max-w-md transition-all duration-300 ease-in-out origin-bottom-right ${
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="AI Chat assistant"
          id="chatbox"
        >
          <div className="flex flex-col rounded-2xl border border-white/10 shadow-2xl bg-slate-900/80 backdrop-blur-md overflow-hidden"
            style={{ height: 'min(520px, calc(100dvh - 120px))' }}
          >
            <ChatHeader isWorking={isWorking} clearMessages={clearMessages} onClose={() => setOpen(false)} />
            <ChatMessages messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
            <QuickChips onChipClick={(msg) => sendMessage(msg)} isLoading={isLoading} />
            <ChatInput inputRef={inputRef} inputMessage={inputMessage} setInputMessage={setInputMessage} handleKeyPress={handleKeyPress} sendMessage={() => sendMessage()} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Mobile chat panel */}
      <div
        className={`sm:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="AI Chat assistant"
      >
        <div className="flex flex-col h-full bg-slate-900/95 backdrop-blur-md">
          <ChatHeader isWorking={isWorking} clearMessages={clearMessages} onClose={() => setOpen(false)} />
          <ChatMessages messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
          <QuickChips onChipClick={(msg) => sendMessage(msg)} isLoading={isLoading} />
          <div style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
            <ChatInput inputRef={inputRef} inputMessage={inputMessage} setInputMessage={setInputMessage} handleKeyPress={handleKeyPress} sendMessage={() => sendMessage()} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Tooltip bubble (desktop only) */}
      <div
        className={`hidden sm:flex fixed bottom-[6.5rem] right-6 z-50 items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-500 ease-in-out ${
          showTooltip && showFab ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        <span className="text-sm text-gray-200">{TOOLTIP_TEXT}</span>
        <span className="absolute -bottom-1.5 right-8 w-3 h-3 bg-slate-800/90 border-r border-b border-white/10 rotate-45" />
      </div>

      {/* FAB */}
      <button
        onClick={() => { setOpen(true); setShowTooltip(false); }}
        style={fabLift > 0 ? { transform: `translateY(-${fabLift}px)` } : undefined}
        className={`fixed bottom-12 right-4 sm:bottom-16 sm:right-6 z-50 flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030612]
          ${showFab && !open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-75 pointer-events-none'}
          bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 border border-white/10`}
        title="Ask AI about Abduboriy"
        aria-expanded={open}
        aria-controls="chatbox"
        aria-label="Open AI chat"
      >
        <span className="absolute top-1 right-1.5 flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWorking ? 'bg-emerald-400' : 'bg-red-400'}`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isWorking ? 'bg-emerald-400' : 'bg-red-400'}`} />
        </span>
        <LuBot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1">
          Ask AI <LuZap className={`w-3 h-3 transition-all duration-200 ${zapFlash ? 'text-yellow-200 scale-150 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]' : 'text-yellow-300'}`} />
        </span>
      </button>
    </>
  );
}

/* ── Sub-components ── */

interface ChatHeaderProps {
  isWorking: boolean;
  clearMessages: () => void;
  onClose: () => void;
}

function ChatHeader({ isWorking, clearMessages, onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-slate-800/60 backdrop-blur-sm border-b border-white/10 shrink-0">
      <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWorking ? 'bg-emerald-400' : 'bg-red-400'}`} />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isWorking ? 'bg-emerald-400' : 'bg-red-400'}`} />
      </span>
      <span className="font-mono text-xs text-emerald-400 tracking-wide uppercase flex-shrink-0">
        {isWorking ? 'System Online' : 'System Offline'}
      </span>
      <div className="flex-1" />
      <button onClick={clearMessages} className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" title="Clear messages" aria-label="Clear chat messages">
        <LuTrash2 className="w-4 h-4" />
      </button>
      <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Minimize chat">
        <LuMinus className="w-4 h-4" />
      </button>
      <button onClick={onClose} className="sm:hidden text-gray-400 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Close chat">
        <LuX className="w-4 h-4" />
      </button>
    </div>
  );
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  messagesEndRef: RefObject<HTMLDivElement | null>;
}

function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3 overscroll-contain">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-8 px-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-white/10 flex items-center justify-center mb-4">
            <LuBot className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-white text-base font-bold mb-2">Ask me anything!</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">I know about Abduboriy's experience, skills, and projects. Try a quick question below.</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'bot' && (
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <LuBot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              message.sender === 'user'
                ? 'bg-blue-600/80 text-white rounded-br-sm'
                : 'bg-white/5 border border-white/10 text-gray-100 rounded-bl-sm font-mono'
            }`}>
              <p className={message.sender === 'bot' ? 'text-[13px]' : ''}>{message.text}</p>
              <p className="text-[10px] opacity-40 mt-1 text-right">{message.timestamp}</p>
            </div>
            {message.sender === 'user' && (
              <div className="w-6 h-6 bg-gray-600/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <LuUser className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </div>
        ))
      )}
      {isLoading && (
        <div className="flex justify-start gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <LuBot className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="bg-white/5 border border-white/10 px-3 py-3 rounded-xl rounded-bl-sm">
            <div className="flex space-x-1.5 items-center">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

interface QuickChipsProps {
  onChipClick: (message: string) => void;
  isLoading: boolean;
}

function QuickChips({ onChipClick, isLoading }: QuickChipsProps) {
  return (
    <div className="shrink-0 px-2 py-1.5 border-t border-white/5 overflow-x-auto">
      <div className="flex gap-1.5 min-w-max">
        {QUICK_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onChipClick(chip.message)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ChatInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
  isLoading: boolean;
}

function ChatInput({ inputRef, inputMessage, setInputMessage, handleKeyPress, sendMessage, isLoading }: ChatInputProps) {
  return (
    <div className="shrink-0 p-2 border-t border-white/10 flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Ask something..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={isLoading}
        aria-label="Chat message input"
        className="flex-1 px-3 py-2 rounded-lg bg-white/5 text-white text-sm border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 placeholder:text-gray-500 disabled:opacity-50 transition-colors duration-200"
      />
      <button
        onClick={sendMessage}
        disabled={!inputMessage.trim() || isLoading}
        aria-label="Send message"
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white p-2 rounded-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <LuSendHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
}
