import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AiAnalystProps {
  insights: string;
  isLoading: boolean;
  onGenerate: () => void;
}

const AiAnalyst: React.FC<AiAnalystProps> = ({ insights, isLoading, onGenerate }) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl shadow-lg overflow-hidden mb-8">
      <div className="p-6 border-b border-slate-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M8.5 15.5v.01"/><path d="M16 8.5v.01"/></svg>
            </div>
            <div>
                <h2 className="text-lg font-semibold">AI Financial Analyst</h2>
                <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
            </div>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            isLoading
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Refresh Analysis'
          )}
        </button>
      </div>
      
      <div className="p-6 bg-slate-800/50 min-h-[200px] text-sm leading-relaxed">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            <div className="space-y-2 mt-4">
                <div className="h-3 bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-slate-700 rounded w-full"></div>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiAnalyst;