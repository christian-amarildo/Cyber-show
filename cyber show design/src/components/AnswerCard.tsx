import React from 'react';
interface AnswerCardProps {
  number: number;
  text: string;
  onClick?: () => void;
  selected?: boolean;
}
export function AnswerCard({
  number,
  text,
  onClick,
  selected
}: AnswerCardProps) {
  return <button onClick={onClick} className={`w-full group relative flex items-center bg-gradient-to-b from-red-700 to-red-800 
        hover:from-red-600 hover:to-red-700 active:translate-y-1 active:shadow-none
        rounded-lg border-2 ${selected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-red-900'} 
        shadow-[0_6px_0_rgba(127,29,29,1)] transition-all duration-200 mb-4 overflow-hidden`}>
      {/* Number badge */}
      <div className="absolute left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-inner z-10">
        <span className="text-blue-900 font-black text-xl">{number}</span>
      </div>

      {/* Text content */}
      <div className="w-full p-4 pl-16 md:pl-20 text-left">
        <span className="text-lg md:text-xl font-bold text-white drop-shadow-sm group-hover:text-yellow-100 transition-colors">
          {text}
        </span>
      </div>

      {/* Hover shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>;
}