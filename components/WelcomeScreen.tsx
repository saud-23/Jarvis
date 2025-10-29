import React from 'react';
import { Translation } from '../utils/translations';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  isVisible: boolean;
  t: Translation;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, isVisible, t }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-1000 ease-in-out">
       {/* Corner elements for consistency */}
      <div className="hud-corner hud-corner-top-left !border-cyan-300/50"></div>
      <div className="hud-corner hud-corner-top-right !border-cyan-300/50"></div>
      <div className="hud-corner hud-corner-bottom-left !border-cyan-300/50"></div>
      <div className="hud-corner hud-corner-bottom-right !border-cyan-300/50"></div>

      <div className="text-center animate-fade-in-up">
        <h1 className="mb-2 text-6xl md:text-8xl font-bold text-cyan-300 tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 15px rgba(0, 255, 255, 0.7)' }}>
          JARVIS
        </h1>
        <p className="mb-12 text-lg text-gray-400 tracking-[0.2em] uppercase">{t.aiInterface}</p>
        <button
          onClick={onGetStarted}
          className="group relative inline-block rounded-md border-2 border-cyan-400/50 px-10 py-4 text-lg font-bold uppercase tracking-widest text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
        >
          <span className="absolute inset-0 bg-cyan-800/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          <span className="relative">{t.getStarted}</span>
        </button>
      </div>
       <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
             animation: fade-in-up 1.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};
