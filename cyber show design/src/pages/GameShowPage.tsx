import React, { useState } from 'react';
import { StartScreen } from '../components/StartScreen';
import { GameScreen } from '../components/GameScreen';
export function GameShowPage() {
  const [gameStarted, setGameStarted] = useState(false);
  return <main className="min-h-screen w-full bg-[#0a1628] overflow-hidden relative font-sans">
      {/* Background Matrix/Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-transparent to-[#0a1628]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {gameStarted ? <GameScreen /> : <StartScreen onStart={() => setGameStarted(true)} />}
      </div>
    </main>;
}