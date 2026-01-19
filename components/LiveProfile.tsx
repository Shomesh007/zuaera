import React from 'react';

interface LiveProfileProps {
  vibeText: string;
}

export const LiveProfile: React.FC<LiveProfileProps> = ({ vibeText }) => {
  return (
    <div className="w-full px-6 mt-10 mb-8">
      <div className="glass-panel rounded-xl p-6 relative overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700"></div>
        
        {/* Header */}
        <div className="flex justify-between items-end mb-2 relative z-10">
          <div className="flex flex-col">
            <span className="text-primary/60 text-[10px] uppercase tracking-widest mb-0.5">Profile</span>
            <span className="text-white text-sm font-bold tracking-wider uppercase">{vibeText}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-primary text-[10px] font-bold tracking-widest">LIVE</span>
          </div>
        </div>

        {/* Wave Animation */}
        <div className="relative h-14 w-full flex items-center justify-center overflow-hidden frequency-wave">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
            <defs>
              <filter id="glow-wave" height="140%" width="140%" x="-20%" y="-20%">
                <feGaussianBlur result="blur" stdDeviation="3"></feGaussianBlur>
                <feComposite in="SourceGraphic" in2="blur" operator="over"></feComposite>
              </filter>
            </defs>
            <path 
              d="M0,50 L20,30 L40,70 L60,20 L80,80 L100,50 L120,50 L140,10 L160,90 L180,50 L200,50 L220,30 L240,70 L260,50 L400,50" 
              fill="none" 
              filter="url(#glow-wave)" 
              stroke="#f2d00d" 
              strokeWidth="2"
            >
              <animate 
                attributeName="d" 
                dur="6s" 
                repeatCount="indefinite" 
                values="
                  M0,50 L20,30 L40,70 L60,20 L80,80 L100,50 L120,50 L140,10 L160,90 L180,50 L200,50 L220,30 L240,70 L260,50 L400,50;
                  M0,50 L20,60 L40,20 L60,80 L80,30 L100,50 L120,50 L140,80 L160,20 L180,50 L200,50 L220,60 L240,20 L260,50 L400,50;
                  M0,50 L20,30 L40,70 L60,20 L80,80 L100,50 L120,50 L140,10 L160,90 L180,50 L200,50 L220,30 L240,70 L260,50 L400,50"
              />
            </path>
          </svg>
        </div>
      </div>
    </div>
  );
};