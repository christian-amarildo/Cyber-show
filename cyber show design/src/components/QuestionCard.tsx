import React from 'react';
interface QuestionCardProps {
  text: string;
}
export function QuestionCard({
  text
}: QuestionCardProps) {
  return <div className="w-full bg-gradient-to-b from-red-700 to-red-800 rounded-lg border-2 border-red-900 shadow-[0_8px_0_rgba(127,29,29,1)] mb-6 relative overflow-hidden group">
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

      <div className="p-6 md:p-8 flex items-center justify-center min-h-[120px]">
        <h2 className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-md leading-relaxed">
          {text}
        </h2>
      </div>
    </div>;
}