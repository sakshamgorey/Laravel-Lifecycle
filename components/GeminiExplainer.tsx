import React, { useState, useEffect } from 'react';
import { X, Cpu, Send, Loader2, Database } from 'lucide-react';
import { getGeminiExplanation } from '../services/geminiService';

interface GeminiExplainerProps {
  stageTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

const GeminiExplainer: React.FC<GeminiExplainerProps> = ({ stageTitle, isOpen, onClose }) => {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (isOpen) {
      setContent('');
      setQuestion('');
      fetchInitialExplanation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, stageTitle]);

  const fetchInitialExplanation = async () => {
    setLoading(true);
    const text = await getGeminiExplanation(stageTitle);
    setContent(text);
    setLoading(false);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setLoading(true);
    const text = await getGeminiExplanation(stageTitle, question);
    setContent(text);
    setLoading(false);
    setQuestion('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>

      {/* Main Modal Container */}
      <div className="relative w-full max-w-2xl bg-cyber-black border border-cyber-red shadow-[0_0_50px_rgba(255,0,60,0.2)] flex flex-col max-h-[85vh] clip-tech-card-border overflow-hidden animate-[float_4s_ease-in-out_infinite]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-cyber-dimRed/10 border-b border-cyber-red/30">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-cyber-red/20 border border-cyber-red rounded-sm">
               <Database className="w-4 h-4 text-cyber-red" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-sm text-white tracking-wider">AI_CORE_LINK</h3>
              <p className="text-[10px] text-cyber-red uppercase">Secure Channel Established</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-cyber-red transition-colors p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm leading-relaxed text-gray-300 scrollbar-hide bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-dimRed/10 via-cyber-black to-cyber-black">
          <div className="mb-6 flex items-baseline gap-2 border-b border-cyber-dimRed/30 pb-2">
            <span className="text-cyber-red font-bold text-lg">Subject:</span>
            <span className="text-white text-xl font-bold uppercase tracking-wide">{stageTitle}</span>
          </div>
          
          {loading && !content ? (
            <div className="flex flex-col items-center justify-center py-12 text-cyber-red">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <span className="animate-pulse tracking-[0.2em] text-xs">DECRYPTING DATA STREAMS...</span>
            </div>
          ) : (
            <div className="prose prose-invert prose-p:text-gray-300 prose-strong:text-cyber-red max-w-none">
              <p className="whitespace-pre-wrap">{content}</p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-cyber-black border-t border-cyber-red/30">
           <form onSubmit={handleAsk} className="flex gap-0 relative">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-red font-bold">{`>`}</div>
             <input 
               type="text" 
               value={question}
               onChange={(e) => setQuestion(e.target.value)}
               placeholder="INPUT QUERY PARAMETERS..."
               className="flex-1 bg-cyber-gray/50 border border-cyber-dimRed text-white pl-8 pr-4 py-3 font-mono text-xs focus:outline-none focus:border-cyber-red focus:bg-cyber-dimRed/10 transition-all placeholder-gray-600"
             />
             <button 
               type="submit" 
               disabled={loading}
               className="bg-cyber-red text-black font-bold px-6 border-l border-black hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs tracking-wider"
             >
               {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Execute'}
             </button>
           </form>
        </div>

      </div>
    </div>
  );
};

export default GeminiExplainer;