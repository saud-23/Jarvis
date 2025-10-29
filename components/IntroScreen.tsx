import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HudCoreIcon } from './icons/HudCoreIcon';

interface IntroScreenProps {
  isVisible: boolean;
  onIntroComplete: () => void;
  username: string;
}

type AnimationStage = 'initial' | 'scan' | 'glitch' | 'credit1' | 'credit2' | 'credit3' | 'assemble' | 'flash';

const CreditText: React.FC<{ text: string, show: boolean, subtext?: string }> = ({ text, show, subtext }) => (
    <div className={`transition-all duration-700 ease-in-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-cyan-300" style={{fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 12px rgba(0, 255, 255, 0.6)'}}>
            {text}
        </h1>
        {subtext && <p className="text-sm tracking-widest text-gray-400 mt-1">{subtext}</p>}
    </div>
);

export const IntroScreen: React.FC<IntroScreenProps> = ({ isVisible, onIntroComplete }) => {
  const [stage, setStage] = useState<AnimationStage>('initial');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const handleSkip = useCallback(() => {
    clearAllTimeouts();
    setStage('flash');
    setTimeout(onIntroComplete, 300);
  }, [onIntroComplete, clearAllTimeouts]);

  useEffect(() => {
    if (isVisible) {
      clearAllTimeouts(); 
      
      const timers: NodeJS.Timeout[] = [];
      timers.push(setTimeout(() => setStage('scan'), 100));
      timers.push(setTimeout(() => setStage('glitch'), 500));
      timers.push(setTimeout(() => setStage('credit1'), 1500));
      timers.push(setTimeout(() => setStage('credit2'), 3000));
      timers.push(setTimeout(() => setStage('credit3'), 4500));
      timers.push(setTimeout(() => setStage('assemble'), 6000));
      timers.push(setTimeout(handleSkip, 7500));
      timersRef.current = timers;

      return clearAllTimeouts;
    }
  }, [isVisible, handleSkip, clearAllTimeouts]);

  if (!isVisible) return null;
  
  const getCoreState = (): 'initial' | 'assembling' | 'finished' => {
      if (stage === 'assemble' || stage === 'flash') return 'assembling';
      if (stage === 'credit1' || stage === 'credit2' || stage === 'credit3') return 'initial';
      return 'initial';
  }

  const showSkipButton = stage !== 'initial' && stage !== 'flash';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 overflow-hidden ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Glitch and Scan effects */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_2px_rgba(0,190,255,0.7)] transition-transform duration-1000 ${stage === 'scan' || stage === 'glitch' ? 'translate-y-1/2' : '-translate-y-full'}`} style={{animation: stage === 'scan' ? 'scan-anim 1s ease-out' : 'none', top: '30%'}}></div>
      <style>{`
          @keyframes scan-anim {
              0% { transform: translateY(-30vh); }
              100% { transform: translateY(40vh); }
          }
      `}</style>
      
      {/* Core Icon */}
       <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 transition-all duration-1000 ease-in-out ${stage === 'assemble' || stage === 'flash' ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`}>
          <HudCoreIcon animationState={getCoreState()} />
      </div>

      {/* Credits */}
      <div className="absolute w-full h-full flex items-center justify-center text-center">
          <CreditText text="JARVIS" show={stage === 'credit1'} />
          <CreditText text="SAUD KHAN" subtext="PRESENTED BY" show={stage === 'credit2'} />
          <CreditText text="GEMINI" subtext="POWERED BY" show={stage === 'credit3'} />
      </div>

      {/* Skip button */}
      {showSkipButton && (
        <button 
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-gray-500 font-mono tracking-widest text-sm uppercase transition-all hover:text-cyan-300 hover:shadow-[0_0_8px_rgba(0,190,255,0.5)] px-3 py-1 animate-pulse"
        >
          Skip Intro
        </button>
      )}

      {/* White flash effect */}
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-300 ease-out ${
          stage === 'flash' ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
    </div>
  );
};