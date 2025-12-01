import React from 'react';
import { Logo } from './Logo';
import { Heart } from 'lucide-react';
interface StartScreenProps {
  onStart: () => void;
}
export function StartScreen({
  onStart
}: StartScreenProps) {
  return <div className="flex flex-col items-center justify-center min-h-screen p-4 relative z-10 animate-in fade-in duration-700">
      <Logo />

      <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-12 max-w-lg drop-shadow-lg">
        Você consegue chegar ao 1 milhão sem trapacear?
      </h2>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button onClick={onStart} className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black text-xl uppercase rounded-xl shadow-[0_6px_0_rgba(180,83,9,1)] active:translate-y-1 active:shadow-none transition-all transform hover:scale-105">
          Começar
        </button>

        <button className="w-full py-3 bg-transparent border-2 border-green-600 text-green-500 font-bold uppercase rounded-xl hover:bg-green-900/20 transition-colors">
          Voltar para onde parou
        </button>
      </div>

      <div className="mt-16 flex items-center gap-2 text-sm text-gray-400 font-medium">
        <span>Jogo criado por</span>
        <Heart className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
        <span className="text-yellow-400 font-bold">curso.dev</span>
      </div>
    </div>;
}