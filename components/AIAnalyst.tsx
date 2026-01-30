
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, Info, Search, BrainCircuit } from 'lucide-react';
import { ChatMessage } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIAnalystProps {
  history: ChatMessage[];
  setHistory: (history: ChatMessage[]) => void;
}

const AIAnalyst: React.FC<AIAnalystProps> = ({ history, setHistory }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newHistory = [...history, userMessage];
    setHistory(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      // Always initialize the client with the environment API key before a call
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Construct the conversation history for the model, mapping roles correctly to 'user' and 'model'
      const contents = history.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      })).concat([{ role: 'user', parts: [{ text: input }] }]);

      // Using gemini-3-pro-preview for complex reasoning tasks like product research and competition analysis
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: contents,
        config: {
          systemInstruction: "Anda adalah AI Riset Produk dari TokPee. Tugas Anda adalah membantu penjual melakukan riset produk populer di marketplace Indonesia (seperti Tokopedia, Shopee, TikTok Shop), memberikan ide deskripsi produk SEO-friendly, menganalisis kompetisi, dan memberikan saran optimasi toko. Gunakan bahasa Indonesia yang santai tapi profesional (ala startup tech)."
        }
      });

      const aiResponse: ChatMessage = { 
        role: 'assistant', 
        content: response.text || "Maaf, saya sedang mengalami kendala teknis." 
      };
      
      setHistory([...newHistory, aiResponse]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMsg: ChatMessage = { 
        role: 'assistant', 
        content: "Maaf, koneksi ke otak AI terputus. Coba lagi dalam beberapa saat ya!" 
      };
      setHistory([...newHistory, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center space-x-4 mb-2">
        <div className="p-3 tokpee-gradient rounded-2xl shadow-lg shadow-green-100">
          <BrainCircuit size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">AI Product Assistant</h2>
          <p className="text-xs font-medium text-slate-400">Riset produk 'Winning' dan optimasi copywriting dalam hitungan detik.</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm flex flex-col min-h-0">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar"
        >
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start group`}>
                <div className={`
                  flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110
                  ${msg.role === 'user' ? 'bg-slate-900 text-white ml-4' : 'tokpee-gradient text-white mr-4'}
                `}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`
                  p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-sm
                  ${msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100'}
                `}>
                  <div className="whitespace-pre-wrap font-medium">{msg.content}</div>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start">
                 <div className="tokpee-gradient text-white p-2.5 rounded-2xl mr-4 animate-pulse">
                  <Loader2 size={20} className="animate-spin" />
                </div>
                <div className="bg-slate-50 p-5 rounded-[1.5rem] rounded-tl-none border border-slate-100">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-50 bg-white">
          <div className="flex items-center space-x-3 mb-4">
             {['Riset Produk Viral', 'Buat Deskripsi SEO', 'Ide Nama Toko', 'Cek Kompetisi'].map((tag) => (
               <button 
                 key={tag}
                 onClick={() => setInput(tag)}
                 className="px-4 py-2 bg-slate-50 hover:bg-green-50 hover:text-green-600 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest border border-slate-100 transition-all"
               >
                 {tag}
               </button>
             ))}
          </div>
          <div className="relative flex items-center bg-slate-100 rounded-[1.5rem] p-1.5 focus-within:ring-4 focus-within:ring-green-50 focus-within:bg-white border border-transparent focus-within:border-green-200 transition-all">
            <textarea 
              rows={1}
              placeholder="Tanya AI tentang tren produk..."
              className="w-full px-5 py-3.5 bg-transparent border-none focus:outline-none text-sm text-slate-700 resize-none font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`
                p-3.5 rounded-2xl transition-all shadow-lg
                ${!input.trim() || isTyping 
                  ? 'bg-slate-300 text-white shadow-none cursor-not-allowed' 
                  : 'tokpee-gradient text-white hover:scale-105 active:scale-95 shadow-green-200'}
              `}
            >
              <Send size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalyst;
