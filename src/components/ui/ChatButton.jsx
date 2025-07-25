import { useState, useRef, useEffect, useMemo } from 'react';

import {
  LuBot,
  LuSendHorizontal,
  LuTrash2,
  LuChevronUp,
  LuChevronDown,
  LuUser,
} from 'react-icons/lu';

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  const [isWorking, setIsWorking] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Health check once on mount
  useEffect(() => {
    fetch('https://llm.abduboriy.tech/api/health', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'ping' }),
    })
      .then((r) => {
        console.log('Health check response:', r.ok);
        setIsWorking(r.ok);
      })
      .catch(() => setIsWorking(false));
  }, []);

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to send message to backend
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://llm.abduboriy.tech/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
        }),
      });

      if (!response.ok) {
        setIsWorking(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || "Sorry, I couldn't process that request.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      setIsWorking(false);

      // Error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear all messages
  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-27 right-17 z-40 w-full max-w-xs sm:w-80 px-4 sm:px-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-12 flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-3 sm:px-6 transition-all duration-300 hover:cursor-pointer rounded-t-lg"
        aria-expanded={open}
        aria-controls="chatbox"
      >
        <span
          className={`w-2 h-2 animate-pulse rounded-full ${
            isWorking ? 'bg-emerald-500' : 'bg-red-500'
          } `}
        ></span>
        <span>
          <LuBot className="w-5 h-5 sm:w-6 sm:h-6" />
        </span>
        <span className="font-semibold text-sm sm:text-base flex-1 text-left">
          AI Chat
        </span>
        {messages.length > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {Math.floor(messages.length / 2)}
          </span>
        )}
        <span
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : 'rotate-180'
          }`}
        >
          {open ? (
            <LuChevronDown className="w-5 h-5" />
          ) : (
            <LuChevronUp className="w-5 h-5" />
          )}
        </span>
      </button>

      <div
        id="chatbox"
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-slate-900 border border-white/10 shadow-2xl backdrop-blur-md rounded-b-2xl ${
          open ? 'h-80 sm:h-96' : 'h-0'
        }`}
      >
        <div
          className={`h-full transition-opacity transform duration-300 ease-in-out ${
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🤖</div>
                  <h2 className="text-white text-base sm:text-lg font-bold mb-2">
                    Send a message to start the chat!
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    You can ask the bot anything about me and it will help to
                    find the relevant information!
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${
                      message.sender === 'user'
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <LuBot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700 text-white'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <LuUser className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start gap-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <LuBot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-slate-700 text-white px-3 py-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Input Bar */}
            <div className="shrink-0 p-2 sm:p-3 border-t border-white/10 flex items-center gap-2">
              {/* Trash button */}
              <button
                onClick={clearMessages}
                className="text-red-500 hover:text-red-700 hover:cursor-pointer transition p-1"
                title="Clear messages"
              >
                <LuTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Input */}
              <input
                type="text"
                placeholder="Ask something..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-2 sm:px-3 py-2 rounded-md bg-slate-800 text-white text-xs sm:text-sm border border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-500 disabled:opacity-50"
              />

              {/* Send button */}
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white p-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LuSendHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
