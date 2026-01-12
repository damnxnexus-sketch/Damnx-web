'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Calendar, Phone, Sparkles } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasCalendlyButton?: boolean;
}

const CalendlyChatbot = () => {
  const { isChatOpen, toggleChat, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm here to help you schedule a meeting with our team.\n\nWould you like to book a time slot or give us a call?",
      isUser: false,
      timestamp: new Date(),
      hasCalendlyButton: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  const openCalendly = () => {
    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/damnx-nexus/30min'
      });
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: "I'd like to schedule a meeting",
      isUser: true,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Perfect! I've opened our calendar for you. Please select a time that works best for you. 📅",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const makePhoneCall = () => {
    window.location.href = 'tel:+916388037374';

    const userMessage: Message = {
      id: Date.now().toString(),
      text: "I'd like to call you",
      isUser: true,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Great! I've opened the dialer for you. You can call us at +91 6388 037 374. 📞",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    const lowerMessage = inputValue.toLowerCase();
    let botResponseText = '';
    let hasButton = false;

    if (
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('meeting') ||
      lowerMessage.includes('book') ||
      lowerMessage.includes('appointment') ||
      lowerMessage.includes('time')
    ) {
      botResponseText = "Great! I can help you schedule a meeting. Click the button below to choose your preferred time slot. 🗓️";
      hasButton = true;
    } else if (
      lowerMessage.includes('call') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('talk')
    ) {
      botResponseText = "Perfect! Click the 'Call Us Now' button below to connect with us directly. 📞";
      hasButton = true;
    } else if (
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hey')
    ) {
      botResponseText = "Hello! 👋 How can I assist you today? I can help you schedule a meeting or connect you via phone.";
      hasButton = true;
    } else if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what') ||
      lowerMessage.includes('how')
    ) {
      botResponseText = "I'm here to help you connect with our team!\n\nYou can:\n✅ Schedule a meeting at your convenience\n✅ Call us directly at +91 6388 037 374\n✅ Get instant support\n\nWhat would you prefer?";
      hasButton = true;
    } else if (
      lowerMessage.includes('cancel') ||
      lowerMessage.includes('reschedule')
    ) {
      botResponseText = "To cancel or reschedule an existing meeting, please use the link in your confirmation email. Or you can schedule a new meeting below.";
      hasButton = true;
    } else if (
      lowerMessage.includes('thank') ||
      lowerMessage.includes('thanks')
    ) {
      botResponseText = "You're welcome! 😊 If you need anything else, feel free to ask!";
    } else {
      botResponseText = "I'm here to help! You can schedule a meeting or call us directly. What would you prefer?";
      hasButton = true;
    }

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        isUser: false,
        timestamp: new Date(),
        hasCalendlyButton: hasButton,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return <div key={index} className="h-2"></div>;
      return (
        <div key={index} className="mb-1 leading-relaxed">
          {line}
        </div>
      );
    });
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6 z-50">
      {/* Enhanced Welcome Message with Particles */}
      {!isChatOpen && showWelcome && (
        <div className="absolute bottom-[72px] sm:bottom-20 md:bottom-24 right-0 animate-fadeInBounce">
          <div className="relative bg-gradient-to-br from-red-600/95 via-black/90 to-red-950/95 rounded-2xl sm:rounded-3xl px-6 py-3 sm:px-10 sm:py-4 shadow-2xl border border-red-500/40 backdrop-blur-2xl overflow-hidden group w-64 sm:w-80 md:w-96">
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-32 h-32 bg-red-500/20 rounded-full blur-3xl top-0 -right-10 animate-pulse"></div>
              <div className="absolute w-24 h-24 bg-pink-500/20 rounded-full blur-3xl bottom-0 -left-10 animate-pulse delay-300"></div>
            </div>
            
            {/* Premium Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 rounded-xl backdrop-blur-sm animate-bounce-slow">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide leading-tight">
                  Ready to Connect? 🚀
                </p>
                <p className="text-[10px] sm:text-xs text-white/80 mt-0.5">
                  Schedule or Call Us Now!
                </p>
              </div>
            </div>
            
            {/* Modern Pointer Arrow */}
            <div className="absolute -bottom-2 right-10 sm:right-14 md:right-16">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-950/95"></div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Chat Window */}
      {isChatOpen && (
        <div className="fixed inset-0 sm:static sm:w-[95vw] sm:max-w-[420px] md:w-[440px] lg:w-[480px] h-screen sm:h-[85vh] sm:max-h-[650px] md:max-h-[700px] mb-0 sm:mb-4 flex flex-col backdrop-blur-3xl bg-gradient-to-br from-red-950/40 via-black/60 to-purple-950/30 sm:rounded-3xl shadow-2xl border-0 sm:border border-red-500/30 overflow-hidden">
          
          {/* Enhanced Header with Gradient */}
          <div className="relative flex items-center gap-3 p-4 sm:p-5 md:p-6 border-b border-red-500/30 bg-gradient-to-r from-red-600/30 via-black/50 to-purple-600/30 backdrop-blur-xl">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-40 h-40 bg-red-500/10 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
              <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -top-10 -right-10 animate-pulse delay-500"></div>
            </div>

            {/* Enhanced Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-md animate-pulse"></div>
              <img 
                src="/avatar.png" 
                alt="DAMNX" 
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-white/20 shadow-xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl border-2 border-white/20 shadow-xl';
                  fallback.textContent = 'DX';
                  target.parentElement?.appendChild(fallback);
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
            </div>

            <div className="relative flex-1 min-w-0">
              <h3 className="font-bold text-white text-base sm:text-lg md:text-xl truncate flex items-center gap-2">
                DAMNX Team
                <span className="text-xs bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30 hidden sm:inline">Pro</span>
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-xs sm:text-sm text-gray-300 truncate">
                  Online • Avg. response time: 2 min
                </p>
              </div>
            </div>

            <button
              onClick={closeChat}
              className="relative shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-red-600/20 hover:bg-red-600/40 text-red-400 hover:text-red-300 transition-all duration-300 border border-red-500/30 hover:scale-110 active:scale-95 group"
            >
              <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Enhanced Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 md:p-6 space-y-4 bg-gradient-to-b from-transparent via-red-950/5 to-black/20 custom-scrollbar">
            {messages.map((message) => (
              <div key={message.id} className="animate-slideUpFade">
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] md:max-w-[75%] px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl text-sm sm:text-base leading-relaxed shadow-xl ${
                      message.isUser
                        ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-red-500/40 rounded-br-md border border-red-400/20'
                        : 'bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-bl-md'
                    }`}
                  >
                    {formatMessage(message.text)}
                    <div className={`text-[10px] mt-2 ${message.isUser ? 'text-white/70' : 'text-white/50'}`}>
                      {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                {!message.isUser && message.hasCalendlyButton && (
                  <div className="mt-4 flex flex-col gap-3">
                    {/* Schedule Meeting Button */}
                    <button
                      onClick={openCalendly}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-red-700 via-red-600 to-red-500 hover:from-red-600 hover:via-red-500 hover:to-red-400 text-white text-sm sm:text-base font-bold rounded-2xl shadow-2xl shadow-red-600/60 hover:shadow-red-500/70 transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden border border-red-400/30"
                    >
                      {/* Animated Shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-400/50 to-pink-400/50 blur-xl transition-opacity duration-500"></div>
                      
                      {/* Icon Container */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <Calendar className="w-5 h-5" />
                      </div>
                      
                      {/* Text */}
                      <span className="relative z-10 tracking-wide">Schedule Meeting</span>
                      
                      {/* Arrow */}
                      <div className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>

                    {/* Call Button */}
                    <button
                      onClick={makePhoneCall}
                      className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-500 hover:to-emerald-500 text-white text-sm sm:text-base font-bold rounded-2xl shadow-2xl shadow-green-600/60 hover:shadow-green-500/70 transition-all duration-500 hover:scale-[1.02] active:scale-95 overflow-hidden border border-green-400/30"
                    >
                      {/* Animated Shine */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      {/* Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-400/50 to-emerald-400/50 blur-xl transition-opacity duration-500"></div>
                      
                      {/* Icon Container */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white/20 rounded-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm animate-pulse-slow">
                        <Phone className="w-5 h-5" />
                      </div>
                      
                      {/* Text */}
                      <span className="relative z-10 tracking-wide">Call +91 6388 037 374</span>
                      
                      {/* Arrow */}
                      <div className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-4 sm:p-5 md:p-6 border-t border-red-500/30 backdrop-blur-xl bg-gradient-to-r from-red-900/20 via-black/30 to-purple-900/20">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 bg-black/50 border border-red-500/30 rounded-2xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/60 focus:border-red-500/60 transition-all backdrop-blur-sm shadow-lg"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:hover:scale-100 border border-red-500/40 group"
              >
                <Send size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Floating Button */}
      <button onClick={toggleChat}
        className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden group"
      >
        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-red-500/50 animate-ping-slow"></div>
        
        {isChatOpen ? (
          <div className="relative w-full h-full bg-gradient-to-br from-red-600 via-red-700 to-black flex items-center justify-center">
            <X size={28} className="text-white group-hover:rotate-90 transition-transform duration-300" />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-pink-500 blur-lg animate-pulse"></div>
            <img 
              src="/avatar.png" 
              alt="Chat" 
              className="relative w-full h-full object-cover border-2 border-white/20"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.className = 'relative w-full h-full bg-gradient-to-br from-red-600 via-red-700 to-black flex items-center justify-center text-white font-bold text-xl border-2 border-white/20';
                fallback.textContent = 'DX';
                target.parentElement?.appendChild(fallback);
              }}
            />
            {/* Notification Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold text-white animate-bounce">
              !
            </div>
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes fadeInBounce {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          50% {
            transform: translateY(-5px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-fadeInBounce {
          animation: fadeInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-slideUpFade {
          animation: slideUpFade 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #dc2626, #991b1b);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ef4444, #dc2626);
        }
      `}</style>
    </div>
  );
};

export default CalendlyChatbot;