export function ChatButton() {
  const [opens, setOpens] = useState(false);

  return (
    <div className="fixed bottom-20 right-20 border-1 border-white text-white font-bold py-2 px-4 shadow-lg z-10 hover:cursor-pointer">
      {/* {opens ? <div></div> : <div></div>} */}
      <button
        className="hover:cursor-pointer"
        onClick={() => {
          /* Handle chat button click */
          alert('Hello');
        }}
      >
        Chat with my
      </button>
      <div className="text-xl">AI assistant</div>
    </div>
  );
}

/**
 * Unused code
 *
 * bg-blue-500 hover:bg-blue-700
 *
 *
 * rounded-full shadow-lg
 *
 * rounded-2xl shadow-2xl
 */

import { useState } from 'react';

export default function ChatButtonss() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-15 right-15 z-40">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className=" w-[350px] h-[50px] flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 transition-all duration-300  hover:cursor-pointer"
        >
          <span className="size-2 animate-pulse rounded-full bg-emerald-500"></span>
          <span>Chat with my</span>
          <span className="font-semibold">AI assistant</span>
        </button>
      ) : (
        <div className="w-[350px] h-[500px] bg-#030711 flex flex-col items-center justify-center transition-all duration-300 border-1 border-white">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl  hover:cursor-pointer"
            aria-label="Close chatbot"
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-4">
              <span className="size-3 animate-pulse rounded-full bg-emerald-500 inline-block mr-2"></span>
              <span className="text-lg font-bold">Abduboriy's Chatbot</span>
            </div>
            <div className="text-gray-500 text-center">
              {/* You can add your chatbot UI here */}
              This is Abduboriy's chatbot
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
