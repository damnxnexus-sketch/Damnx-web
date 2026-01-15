'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Calendar, Phone, Sparkles, MessageSquare } from 'lucide-react';
import { useChat } from '@/app/context/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

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
      text: "Welcome to DAMNX nexus! \n\nI'm here to help you build something extraordinary. Would you like to schedule a strategy call or speak with us directly?",
      isUser: false,
      timestamp: new Date(),
      hasCalendlyButton: true,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Load Calendly Widget
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Cleanup if needed
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
      text: "Excellent choice. I've opened our calendar. Select a slot that suits your schedule. 📅",
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
      text: "Connecting you now. You can reach us at +91 6388 037 374. 📞",
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

    // Simple keyword matching logic
    if (
      lowerMessage.includes('schedule') ||
      lowerMessage.includes('meeting') ||
      lowerMessage.includes('book') ||
      lowerMessage.includes('time')
    ) {
      botResponseText = "I can arrange that immediately. Click below to secure your time slot.";
      hasButton = true;
    } else if (
      lowerMessage.includes('call') ||
      lowerMessage.includes('phone') ||
      lowerMessage.includes('talk')
    ) {
      botResponseText = "Let's speak directly. Click 'Call Us Now' to connect.";
      hasButton = true;
    } else if (
      lowerMessage.includes('hi') ||
      lowerMessage.includes('hello') ||
      lowerMessage.includes('hey')
    ) {
      botResponseText = "Greetings. How can DAMNX elevate your business today?";
      hasButton = true;
    } else if (
      lowerMessage.includes('help') ||
      lowerMessage.includes('what') ||
      lowerMessage.includes('services')
    ) {
      botResponseText = "We specialize in turning vision into reality.\n\n• Custom Software\n• Web & Mobile Apps\n• AI Solutions\n\nHow would you like to proceed?";
      hasButton = true;
    } else {
      botResponseText = "I'm here to facilitate your success. Would you prefer to schedule a briefing or call us directly?";
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
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="absolute bottom-20 right-0 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-black/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)"
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-gradient-to-r from-red-950/30 to-black/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-black p-[2px]">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <span className="font-bold text-white text-xs">DX</span>
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm tracking-wide">DAMN<span className="text-red-500">X</span> ASSISTANT</h3>
                  <p className="text-[10px] text-zinc-400">Always online</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar scroll-smooth">
              {messages.map((message) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-6 shadow-sm ${message.isUser
                        ? 'bg-gradient-to-br from-red-700 to-red-900 text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/5 text-zinc-200 rounded-bl-sm backdrop-blur-md'
                      }`}
                  >
                    {formatMessage(message.text)}

                    {/* Action Buttons for Bot */}
                    {!message.isUser && message.hasCalendlyButton && (
                      <div className="mt-4 flex flex-col gap-2">
                        <button
                          onClick={openCalendly}
                          className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-xl text-xs font-semibold text-white transition-all group"
                        >
                          <Calendar size={14} className="text-red-500 group-hover:text-red-400" />
                          <span>Schedule Meeting</span>
                        </button>
                        <button
                          onClick={makePhoneCall}
                          className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-xl text-xs font-semibold text-white transition-all group"
                        >
                          <Phone size={14} className="text-red-500 group-hover:text-red-400" />
                          <span>Emergency Call</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-black/40">
              <div className="relative flex items-center bg-zinc-900/50 border border-white/10 rounded-full px-4 py-2 focus-within:border-red-500/50 transition-colors">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none py-1"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="ml-2 p-1.5 rounded-full bg-red-600 text-white disabled:opacity-50 disabled:bg-zinc-800 hover:scale-105 transition-all shadow-lg shadow-red-900/20"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[10px] text-zinc-600 flex items-center justify-center gap-1">
                  Powered by <span className="font-bold text-zinc-500">DAMNX AI</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group bg-black rounded-full p-0 shadow-2xl shadow-red-900/40"
      >
        <div className="absolute inset-0 bg-red-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
        <div className="relative w-16 h-16 bg-gradient-to-b from-zinc-800 to-black border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
          {isChatOpen ? (
            <X className="text-white" />
          ) : (
            <>
              <MessageSquare className="text-red-500 w-6 h-6" />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black"></span>
            </>
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default CalendlyChatbot;