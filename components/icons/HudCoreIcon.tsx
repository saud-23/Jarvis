import React from 'react';

interface HudCoreIconProps {
  animationState: 'initial' | 'assembling' | 'finished';
}

export const HudCoreIcon: React.FC<HudCoreIconProps> = ({ animationState }) => {
  const isAssembling = animationState === 'assembling' || animationState === 'finished';

  return (
    <div className={`relative w-full h-full`}>
      <style>{`
        .hud-core-piece {
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          transform-origin: center;
          stroke: #67e8f9;
          stroke-width: 4;
          fill: none;
        }
        .hud-core-center {
           transition: all 0.5s ease-in-out 0.5s;
           fill: #a7f3f9;
        }
      `}</style>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <filter id="hud-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <g filter="url(#hud-glow)">
          {/* Outer Hexagon Pieces */}
          <path className="hud-core-piece" d="M 100 20 L 170 60" style={{ transform: isAssembling ? 'none' : 'translateY(-30px) scale(0.8)', opacity: isAssembling ? 1 : 0 }} />
          <path className="hud-core-piece" d="M 170 60 L 170 140" style={{ transform: isAssembling ? 'none' : 'translateX(30px) scale(0.8)', opacity: isAssembling ? 1 : 0, transitionDelay: '0.1s' }} />
          <path className="hud-core-piece" d="M 170 140 L 100 180" style={{ transform: isAssembling ? 'none' : 'translateY(30px) scale(0.8)', opacity: isAssembling ? 1 : 0, transitionDelay: '0.2s' }} />
          <path className="hud-core-piece" d="M 100 180 L 30 140" style={{ transform: isAssembling ? 'none' : 'translateY(30px) scale(0.8)', opacity: isAssembling ? 1 : 0, transitionDelay: '0.3s' }} />
          <path className="hud-core-piece" d="M 30 140 L 30 60" style={{ transform: isAssembling ? 'none' : 'translateX(-30px) scale(0.8)', opacity: isAssembling ? 1 : 0, transitionDelay: '0.4s' }} />
          <path className="hud-core-piece" d="M 30 60 L 100 20" style={{ transform: isAssembling ? 'none' : 'translateY(-30px) scale(0.8)', opacity: isAssembling ? 1 : 0, transitionDelay: '0.5s' }} />
          
          {/* Inner Triangle */}
           <path className="hud-core-piece" d="M 100 50 L 143.3 125 L 56.7 125 Z" style={{ strokeWidth: '2', transform: isAssembling ? 'rotate(0deg)' : 'rotate(-180deg) scale(0.5)', opacity: isAssembling ? 0.8 : 0, transitionDelay: '0.3s' }} />

          {/* Center */}
          <circle 
            className="hud-core-center" 
            cx="100" 
            cy="100" 
            r="15" 
            style={{ 
              transform: isAssembling ? 'scale(1)' : 'scale(0)', 
              opacity: isAssembling ? 1 : 0,
              boxShadow: '0 0 20px #a7f3f9'
            }} 
           />
        </g>
      </svg>
    </div>
  );
};
