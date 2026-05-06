import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { Modal } from '@/components/Modal';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const suggestedPrompts = [
  'Search documents',
  'Explain DAO governance',
  'What are the 10 binders?',
  'Show SubDAO structure',
  'How do I get access?',
];

const aiResponses: Record<string, string> = {
  binder: 'I can help you locate documents across all 10 binders. Each binder corresponds to a phase in the USA governance framework. Which binder or document type are you looking for?',
  document: 'I can help you locate documents across all 10 binders. Each binder corresponds to a phase in the USA governance framework. Which binder or document type are you looking for?',
  governance: 'The USA platform operates under RMI DAO governance, with Ad9x Holdings as the parent entity. The governance structure includes proposal submissions, voting mechanisms, and compliance tracking. Would you like to see the governance flowchart?',
  dao: 'The USA platform operates under RMI DAO governance, with Ad9x Holdings as the parent entity. The governance structure includes proposal submissions, voting mechanisms, and compliance tracking. Would you like to see the governance flowchart?',
  access: "Access to USA(tm) is managed through the Admin Panel. You'll need authorization from your SubDAO administrator. I can guide you to the right contact.",
  login: "Access to USA(tm) is managed through the Admin Panel. You'll need authorization from your SubDAO administrator. I can guide you to the right contact.",
  account: "Access to USA(tm) is managed through the Admin Panel. You'll need authorization from your SubDAO administrator. I can guide you to the right contact.",
  sorme: 'SORME(tm) — Search, Offer, Request, Match, Engine — searches across 131+ documents using 9x AI. Try switching between AskLight, AskHeavy, AskDeep, and AskMAX modes for different search depths.',
  search: 'SORME(tm) — Search, Offer, Request, Match, Engine — searches across 131+ documents using 9x AI. Try switching between AskLight, AskHeavy, AskDeep, and AskMAX modes for different search depths.',
  phase: 'There are 8 phases in the USA deployment pipeline: Discovery, Design, Development, Testing, Compliance, Deployment, Monitoring, and Optimization. Each phase has associated gate checklists.',
  launch: 'There are 8 phases in the USA deployment pipeline: Discovery, Design, Development, Testing, Compliance, Deployment, Monitoring, and Optimization. Each phase has associated gate checklists.',
  default: "That's an interesting question about USA(tm). I can search across 131+ documents and 10 binders to find the most relevant information. Would you like me to search SORME for this?",
};

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

function getAIResponse(userText: string): string {
  const lower = userText.toLowerCase();
  for (const keyword of Object.keys(aiResponses)) {
    if (lower.includes(keyword)) {
      return aiResponses[keyword];
    }
  }
  return aiResponses.default;
}

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConciergeModal({ isOpen, onClose }: ConciergeModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      text: "Welcome to USA(tm). I'm your AI Concierge powered by 9x intelligence. I can help you search documents, navigate binders, explain governance structures, or answer questions about the platform. What would you like to know?",
      time: 'Just now',
    },
    {
      id: 1,
      role: 'user',
      text: 'What documents are in Binder 3?',
      time: 'Just now',
    },
    {
      id: 2,
      role: 'ai',
      text: 'Binder 3 contains Phase Gate Documentation including: Launch Readiness Reviews, Compliance Checklists, Security Audit Reports, and Deployment Sign-offs. There are 14 documents total, with 3 pending approval.',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text: text.trim(),
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: getAIResponse(text),
        time: 'Just now',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputText);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="480px">
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-usa-border flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-usa-blue" strokeWidth={2} />
            <h2 className="text-white text-lg font-bold tracking-tight">Ask Concierge</h2>
            <span className="bg-usa-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded">9x AI</span>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-usa-elevated transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-usa-silver hover:text-white" strokeWidth={2} />
          </button>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-4 py-2 flex-shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-usa-silver text-xs">AI Concierge online</span>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 bg-black flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease }}
                className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                {msg.role === 'ai' ? (
                  <div className="w-8 h-8 rounded-full bg-usa-blue flex items-center justify-center flex-shrink-0">
                    <Sparkles size={16} className="text-white" strokeWidth={2} />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-usa-border flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">U</span>
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-3 py-2.5 ${
                      msg.role === 'user'
                        ? 'bg-usa-blue rounded-t-xl rounded-bl-xl rounded-br-sm'
                        : 'bg-usa-elevated border border-usa-border rounded-t-xl rounded-br-xl rounded-bl-sm'
                    }`}
                  >
                    <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <span className="text-usa-muted text-[10px] mt-1 block">{msg.time}</span>

                  {/* Follow-up actions for AI messages about Binder 3 */}
                  {msg.role === 'ai' && msg.text.includes('Binder 3') && (
                    <div className="flex gap-3 mt-2">
                      <button className="text-usa-blue text-xs font-medium hover:underline">
                        View Binder 3
                      </button>
                      <button className="text-usa-blue text-xs font-medium hover:underline">
                        See pending approvals
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-usa-blue flex items-center justify-center flex-shrink-0">
                  <Sparkles size={16} className="text-white" strokeWidth={2} />
                </div>
                <div className="bg-usa-elevated border border-usa-border rounded-t-xl rounded-br-xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1.5 h-4">
                    <span className="w-2 h-2 bg-usa-silver rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-usa-silver rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-usa-silver rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 3 && (
          <div className="flex gap-2 px-4 py-2 overflow-x-auto flex-shrink-0">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="h-8 px-3 bg-usa-blue/10 border border-usa-blue rounded-full text-usa-blue text-xs font-medium whitespace-nowrap hover:bg-usa-blue/20 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 h-16 px-4 bg-usa-card border-t border-usa-border flex-shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask anything about USA..."
            className="flex-1 h-10 bg-usa-elevated border border-usa-border rounded-full px-4 text-white text-sm placeholder:text-usa-muted outline-none focus:border-usa-blue transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              inputText.trim()
                ? 'bg-usa-blue text-white'
                : 'bg-usa-border text-usa-muted'
            }`}
            aria-label="Send message"
          >
            <Send size={16} strokeWidth={2} />
          </button>
        </form>
      </div>
    </Modal>
  );
}
