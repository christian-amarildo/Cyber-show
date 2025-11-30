import React from 'react';
import { SkipForward, CreditCard, StopCircle } from 'lucide-react';
interface GameControlsProps {
  onSkip: () => void;
  onCards: () => void;
  onStop: () => void;
}
export function GameControls({
  onSkip,
  onCards,
  onStop
}: GameControlsProps) {
  const buttonClass = 'flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-b from-blue-700 to-blue-800 hover:from-blue-600 hover:to-blue-700 border-2 border-blue-900 rounded-lg shadow-[0_4px_0_rgba(30,58,138,1)] active:translate-y-1 active:shadow-none transition-all text-white font-bold uppercase tracking-wide text-sm md:text-base w-full';
  return <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
      <button onClick={onSkip} className={buttonClass}>
        <SkipForward className="w-5 h-5" />
        <span className="hidden md:inline">Pular</span>
        <span className="md:hidden">Pular</span>
      </button>

      <button onClick={onCards} className={buttonClass}>
        <CreditCard className="w-5 h-5" />
        <span className="hidden md:inline">Cartas</span>
        <span className="md:hidden">Cartas</span>
      </button>

      <button onClick={onStop} className={buttonClass}>
        <StopCircle className="w-5 h-5" />
        <span className="hidden md:inline">Parar</span>
        <span className="md:hidden">Parar</span>
      </button>
    </div>;
}