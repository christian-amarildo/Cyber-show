import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { AnswerCard } from './AnswerCard';
import { GameControls } from './GameControls';
import { ImagePlaceholder } from './ImagePlaceholder';
export function GameScreen() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const question = 'Qual operador lógico retorna true apenas se ambos os valores forem true?';
  const answers = [{
    id: 1,
    text: '||'
  }, {
    id: 2,
    text: 'OR'
  }, {
    id: 3,
    text: '!'
  }, {
    id: 4,
    text: '&&'
  }];
  return <div className="w-full max-w-7xl mx-auto p-4 md:p-8 h-full flex flex-col md:flex-row gap-8 animate-in slide-in-from-right duration-500">
      {/* Left Column - Game Interface */}
      <div className="w-full md:w-3/5 flex flex-col">
        <QuestionCard text={question} />

        <div className="flex-1 flex flex-col justify-center space-y-2">
          {answers.map(answer => <AnswerCard key={answer.id} number={answer.id} text={answer.text} selected={selectedAnswer === answer.id} onClick={() => setSelectedAnswer(answer.id)} />)}
        </div>

        {/* Prize Indicator */}
        <div className="mt-8 mb-2 flex flex-col items-center">
          <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 px-12 py-2 rounded-full shadow-[0_4px_0_rgba(180,83,9,1)] transform hover:scale-105 transition-transform cursor-default">
            <span className="text-2xl font-black text-blue-900">1 mil</span>
          </div>
          <span className="text-blue-300 text-sm font-bold mt-2 uppercase tracking-widest">
            Acertar
          </span>
        </div>

        <GameControls onSkip={() => {}} onCards={() => {}} onStop={() => {}} />
      </div>

      {/* Right Column - Image Placeholder */}
      <div className="w-full md:w-2/5 hidden md:block h-[600px]">
        <ImagePlaceholder />
      </div>

      {/* Mobile placeholder (visible only on small screens) */}
      <div className="w-full h-64 md:hidden mt-4">
        <ImagePlaceholder />
      </div>
    </div>;
}