'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Calendar, Phone, MessageSquare, ArrowRight } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  hasCalendlyButton?: boolean;
}

const quickReplies = [
  "Book a Call 📅",
  "Our Services 💼",
  "Call Us Direct 📞"
];

const CalendlyChatbot = () => {
  const { isChatOpen, toggleChat, closeChat, openChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to DamnX Nexus! \n\nI'm here to help you build something extraordinary. Would you like to schedule a strategy call or speak with us directly?",
      isUser: false,
      timestamp: new Date(),
      hasCalendlyButton: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showTeaser, setShowTeaser] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load Calendly Widget script and stylesheet
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

  // Prevent background scrolling on mobile view when chat is active
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isChatOpen]);

  // 1. Auto-open chatbot window after 4.5 seconds on initial load (per session)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const hasAutoOpened = sessionStorage.getItem("damnx_chat_auto_opened");
        if (!hasAutoOpened) {
          openChat();
          sessionStorage.setItem("damnx_chat_auto_opened", "true");
        }
      }
    }, 4500);
    return () => clearTimeout(timer);
  }, [openChat]);

  // 2. Show floating founder teaser bubble after 2.5 seconds if chat is closed
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Close teaser bubble when chatbot window opens
  useEffect(() => {
    if (isChatOpen) {
      setShowTeaser(false);
    }
  }, [isChatOpen]);

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
      text: "I'd like to schedule a strategy call",
      isUser: true,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Excellent. I've initiated our booking portal. Please pick a slot that fits your timeline. 📅",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const makePhoneCall = () => {
    window.location.href = 'tel:+916388037374';

    const userMessage: Message = {
      id: Date.now().toString(),
      text: "I'd like to call you directly",
      isUser: true,
      timestamp: new Date(),
    };

    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: "Connecting you now. You can reach our founding team at +91 6388 037 374. 📞",
      isUser: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
  };

  const submitMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    const lowerMessage = text.toLowerCase();
    let botResponseText = '';
    let hasButton = false;

    if (
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('meeting') ||
      lowerMessage.includes('book') ||
      lowerMessage.includes('time') ||
      lowerMessage.includes('calendly')
    ) {
      botResponseText = "I can arrange that immediately. Click below to secure your strategy call slot on our calendar.";
      hasButton = true;
    } else if (
      lowerMessage.includes('call') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('talk') ||
      lowerMessage.includes('speak')
    ) {
      botResponseText = "Let's speak directly. Click the link below to call our founding team.";
      hasButton = true;
    } else if (
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hey')
    ) {
      botResponseText = "Greetings. I'm the DamnX Assistant. How can we elevate your digital product or accelerate your business growth today?";
      hasButton = true;
    } else if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what') ||
      lowerMessage.includes('services')
    ) {
      botResponseText = "We specialize in end-to-end digital engineering and growth:\n\n• Custom Web Apps (Next.js, React)\n• Native Mobile Apps (React Native)\n• AI & Intelligent Chatbots\n• E-Commerce & SaaS Architectures\n• Growth Marketing & Funnels\n\nWould you like to schedule a strategy call or speak to us directly?";
      hasButton = true;
    } else {
      botResponseText = "I'm here to facilitate your success. Would you prefer to schedule a strategy call or call us directly?";
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
    }, 600);

    setInputValue('');
  };

  const handleSendMessage = () => {
    submitMessage(inputValue);
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
    <>
      {/* Mobile view backdrop overlay */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99] md:hidden"
          onClick={closeChat}
        />
      )}

      {/* Main viewport alignment */}
      <div className={`fixed z-[100] font-sans transition-all duration-300 ${
        isChatOpen 
          ? 'inset-0 md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[580px] md:max-h-[82vh]' 
          : 'bottom-6 right-6 w-14 h-14 md:w-16 md:h-16 pointer-events-none'
      }`}>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
              className="w-full h-full flex flex-col bg-zinc-950 border-0 md:border md:border-[#E5231B]/35 md:rounded-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto"
            >
              {/* Header Panel - High visibility solid red background */}
              <div className="flex items-center justify-between p-4 md:p-5 bg-gradient-to-r from-[#E5231B] to-red-700 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-white/20 p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <span className="font-mono font-bold text-[#E5231B] text-[10px]">DX</span>
                      </div>
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#E5231B] rounded-full animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-wide uppercase font-mono">
                      DamnX Assistant
                    </h3>
                    <p className="text-[9px] font-mono text-red-200">ONLINE • RESPONSE IN &lt; 1M</p>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Message viewport */}
              <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-5 bg-[#0A0A0C] custom-scrollbar scroll-smooth">
                {messages.map((message) => (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs md:text-sm shadow-sm ${
                        message.isUser
                          ? 'bg-[#E5231B] text-white rounded-br-sm'
                          : 'bg-white/[0.03] border border-white/[0.06] text-zinc-300 rounded-bl-sm font-light leading-relaxed'
                      }`}
                    >
                      {formatMessage(message.text)}

                      {/* Luxury Action Cards */}
                      {!message.isUser && message.hasCalendlyButton && (
                        <div className="mt-4 flex flex-col gap-2">
                          <button
                            onClick={openCalendly}
                            className="flex items-center justify-between gap-3 w-full p-3 bg-white/[0.02] hover:bg-[#E5231B]/5 active:bg-[#E5231B]/10 border border-white/5 hover:border-[#E5231B]/40 rounded-xl text-xs font-medium text-white transition-all duration-200 group cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Calendar size={13} className="text-[#E5231B] group-hover:scale-105 transition-transform" />
                              <span>Book Strategy Call</span>
                            </div>
                            <ArrowRight size={12} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </button>
                          
                          <button
                            onClick={makePhoneCall}
                            className="flex items-center justify-between gap-3 w-full p-3 bg-white/[0.02] hover:bg-[#E5231B]/5 active:bg-[#E5231B]/10 border border-white/5 hover:border-[#E5231B]/40 rounded-xl text-xs font-medium text-white transition-all duration-200 group cursor-pointer text-left"
                          >
                            <div className="flex items-center gap-2">
                              <Phone size={13} className="text-[#E5231B] group-hover:scale-105 transition-transform" />
                              <span>Call Us Direct</span>
                            </div>
                            <ArrowRight size={12} className="text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Quick replies */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 px-4 md:px-5 pb-3 justify-start z-10 bg-[#0A0A0C]">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => submitMessage(reply.replace(/ 📅| 💼| 📞/, ""))}
                      className="text-[10px] font-mono px-3 py-1.5 rounded-full border border-[#E5231B]/20 bg-[#E5231B]/5 hover:bg-[#E5231B]/15 text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              {/* Input container */}
              <div className="p-3 md:p-4 border-t border-white/[0.06] bg-black safe-area-bottom">
                <div className="relative flex items-center bg-white/[0.02] border border-white/[0.08] rounded-full pl-4 pr-2 py-1.5 focus-within:border-[#E5231B]/50 focus-within:bg-white/[0.04] transition-all">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask us anything..."
                    className="flex-1 bg-transparent text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none py-1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-full bg-white text-black disabled:opacity-30 disabled:bg-zinc-800 disabled:text-zinc-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Send size={12} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="text-center mt-2.5">
                  <span className="text-[9px] font-mono text-zinc-600 flex items-center justify-center gap-1">
                    ENGINEERED BY <span className="font-bold text-zinc-500 uppercase">DamnX AI</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Founder Teaser Speech Bubble */}
        <AnimatePresence>
          {showTeaser && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed bottom-24 right-6 z-50 max-w-[260px] p-3.5 rounded-2xl border border-[#E5231B]/30 bg-zinc-900 text-white shadow-xl cursor-pointer text-xs font-light leading-relaxed flex flex-col gap-1.5 select-none hover:bg-zinc-850 hover:border-[#E5231B]/55 transition-all pointer-events-auto"
              onClick={openChat}
            >
              <div className="flex items-center gap-1.5 font-bold text-[10px] text-[#E5231B] font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5231B] animate-pulse" />
                <span>MESSAGE FROM FOUNDER</span>
              </div>
              <p className="text-zinc-300">
                Hey there! Need a high-performance website or a custom growth engine? Let&apos;s chat. 👋
              </p>
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-900 border-r border-b border-[#E5231B]/30 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Red Launcher Sphere - High contrast design, cannot be ignored */}
        {!isChatOpen && (
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#E5231B] text-white shadow-[0_8px_32px_rgba(229,35,27,0.4)] border border-[#E5231B]/35 hover:bg-red-650 transition-all cursor-pointer group pointer-events-auto"
            aria-label="Open chat"
          >
            <div className="relative">
              <MessageSquare className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:scale-105 transition-all duration-200" />
              <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#E5231B] animate-pulse" />
            </div>
          </motion.button>
        )}
      </div>
    </>
  );
};

export default CalendlyChatbot;