import React from 'react';
export function Logo() {
  // Generate dots for the circle border
  const dots = Array.from({
    length: 30
  });
  return <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 mx-auto mb-8">
      {/* Outer glow effect */}
      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Main circle container */}
      <div className="relative w-full h-full bg-[#0f2545] rounded-full border-4 border-[#1e3a66] shadow-2xl flex items-center justify-center overflow-hidden">
        {/* Dots ring */}
        <div className="absolute inset-2 rounded-full border border-blue-900/50">
          {dots.map((_, i) => {
          const angle = i * 360 / dots.length;
          const radius = 48; // percentage
          const x = 50 + radius * Math.cos(angle * Math.PI / 180);
          const y = 50 + radius * Math.sin(angle * Math.PI / 180);
          return <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)] animate-pulse" style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
            animationDelay: `${i * 0.1}s`
          }} />;
        })}
        </div>

        {/* Inner content */}
        <div className="relative z-10 text-center transform -rotate-6">
          <h1 className="flex flex-col items-center justify-center">
            <span className="text-5xl md:text-6xl font-black text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] tracking-tighter leading-none" style={{
            textShadow: '4px 4px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}>
              SHOW
            </span>
            <span className="text-xl md:text-2xl font-bold text-yellow-400 -mt-1 mb-1 drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]" style={{
            textShadow: '2px 2px 0 #000'
          }}>
              DA
            </span>
            <span className="text-3xl md:text-4xl font-black text-yellow-400 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] tracking-tight leading-none" style={{
            textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}>
              PROGRAMAÇÃO
            </span>
          </h1>
        </div>
      </div>
    </div>;
}