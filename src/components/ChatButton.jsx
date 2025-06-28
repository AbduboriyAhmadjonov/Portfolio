import { useState } from 'react';
import {
  Bot,
  SendHorizontal,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

export default function ChatButtonss() {
  const [open, setOpen] = useState(false);
  const [isWorking, setIsWorking] = useState(true);

  return (
    <div className="fixed bottom-20 right-20 z-40 w-[320px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[50px] flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 transition-all duration-300 hover:cursor-pointer rounded-t-lg"
        aria-expanded={open}
        aria-controls="chatbox"
      >
        <span
          className={`size-2 animate-pulse rounded-full ${
            isWorking ? 'bg-emerald-500' : 'bg-red-500'
          } `}
        ></span>
        <span>
          <Bot />
        </span>
        <span className="font-semibold  mr-28">AI Chat</span>
        <span
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-180'
          }`}
        >
          {open ? <ChevronDown /> : <ChevronUp />}
        </span>
      </button>

      <div
        id="chatbox"
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#030711] border border-white/10 shadow-2xl backdrop-blur-md rounded-b-2xl ${
          open ? 'h-[400px]' : 'h-0'
        }`}
      >
        <div
          className={`h-full transition-opacity transform duration-300 ease-in-out ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="flex flex-col justify-between h-full">
            {/* Center Area */}
            <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="text-white text-lg font-bold mb-2">
                Send a message to start the chat!
              </h2>
              <p className="text-gray-400 text-sm">
                You can ask the bot anything about me and it will help to find
                the relevant information!
              </p>
            </div>

            {/* Bottom Input Bar */}
            <div className="shrink-0 p-3 border-t border-white/10 flex items-center gap-2">
              {/* Trash button */}
              <button className="text-red-500 hover:text-red-700 hover:cursor-pointer transition">
                <Trash2 />
              </button>

              {/* Input */}
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 px-3 py-2 rounded-md bg-[#0f172a] text-white text-sm border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {/* Send button */}
              <button className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white p-2 rounded-md transition">
                <SendHorizontal />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
