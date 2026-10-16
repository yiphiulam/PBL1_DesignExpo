import React from 'react';
import { ExhibitItem, Language } from '../types/expo';
import { Play, Pause, X, Headphones, Volume2 } from 'lucide-react';

interface AudioPlayerFloatingProps {
  exhibit: ExhibitItem | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  language: Language;
  onOpenModal: () => void;
}

export const AudioPlayerFloating: React.FC<AudioPlayerFloatingProps> = ({
  exhibit,
  isPlaying,
  onTogglePlay,
  onClose,
  language,
  onOpenModal,
}) => {
  if (!exhibit) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-20 left-4 right-4 max-w-md mx-auto z-40 animate-in slide-in-from-bottom-3 duration-200">
      <div className="bg-stone-900/95 backdrop-blur-md text-white rounded-2xl p-3 shadow-2xl border border-stone-800 flex items-center justify-between gap-3">
        <button
          onClick={onOpenModal}
          className="flex items-center gap-3 min-w-0 flex-1 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-stone-800 flex items-center justify-center text-[#D9532F] shrink-0 overflow-hidden relative">
            <img 
              src={exhibit.image} 
              alt={exhibit.title[language]}
              className="w-full h-full object-cover opacity-60" 
            />
            <Headphones className="w-4 h-4 absolute text-white" />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">
              Stop {exhibit.pavilionNumber} · Audio Guide
            </span>
            <p className="text-xs font-semibold text-white truncate group-hover:text-[#D9532F] transition-colors">
              {exhibit.title[language]}
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onTogglePlay}
            className="min-h-[44px] min-w-[44px] rounded-full bg-[#D9532F] hover:bg-[#b84224] text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] rounded-full text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Stop audio"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
