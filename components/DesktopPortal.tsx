import React from 'react';

export const DesktopPortal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] text-white font-sans overflow-hidden" style={{ cursor: 'crosshair' }}>
      {/* Custom styles */}
      <style>{`
        .glass-sphere {
          background: radial-gradient(circle at 30% 30%, rgba(234, 179, 8, 0.05), transparent 70%);
          box-shadow: inset 0 0 50px rgba(234, 179, 8, 0.1), 0 0 30px rgba(234, 179, 8, 0.05);
          backdrop-filter: blur(2px);
        }
        .hologram-grid {
          background-image: linear-gradient(rgba(234, 179, 8, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(234, 179, 8, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .golden-glow {
          text-shadow: 0 0 15px rgba(234, 179, 8, 0.6);
        }
        .border-glow {
          box-shadow: 0 0 15px rgba(234, 179, 8, 0.2);
        }
        .scan-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, #EAB308, transparent);
          position: absolute;
          width: 100%;
          z-index: 20;
          opacity: 0.5;
        }
        .beam-gradient {
          background: linear-gradient(to top, rgba(234, 179, 8, 0.4), transparent);
        }
        @keyframes float-desktop {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes beam {
          0% { opacity: 0.1; height: 0%; }
          50% { opacity: 0.6; height: 100%; }
          100% { opacity: 0.1; height: 0%; }
        }
        .animate-float-desktop {
          animation: float-desktop 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        .animate-beam {
          animation: beam 2s infinite;
        }
        .font-syncopate {
          font-family: 'Syncopate', sans-serif;
        }
      `}</style>

      {/* Background grid and particles */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="hologram-grid absolute inset-0"></div>
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Warning banner */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
        <div className="border border-primary/40 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.15)] animate-pulse">
          <span className="material-symbols-outlined text-primary text-sm">warning</span>
          <span className="font-mono text-xs text-primary tracking-widest uppercase">DESKTOP ACCESS: LIMITED PREVIEW ONLY</span>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-50">
        <h1 className="font-syncopate text-2xl tracking-[0.4em] text-primary golden-glow">ZUAERA</h1>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 border border-primary/30 px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-primary/80 animate-pulse">
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
            System: Optimal
          </div>
          <button className="flex items-center gap-3 group">
            <span className="text-[10px] uppercase tracking-[0.3em] font-mono group-hover:text-primary transition-colors">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className="w-6 h-[1px] bg-white group-hover:bg-primary transition-all"></span>
              <span className="w-4 h-[1px] bg-white group-hover:bg-primary transition-all ml-auto"></span>
            </div>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative h-screen flex flex-col items-center justify-center p-6 md:p-20">
        {/* Left panel */}
        <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 max-w-sm z-30 space-y-8">
          <div className="space-y-4">
            <h2 className="font-syncopate text-3xl md:text-4xl leading-tight text-white tracking-tight">
              DESIGNED FOR <span className="text-primary italic">HANDHELD</span> SENSORY INTERACTION.
            </h2>
            <p className="text-white/80 font-mono text-sm tracking-wide border-l-2 border-primary/50 pl-3">
              Our digital architecture is precision-engineered for mobile devices.
            </p>
          </div>
          
          {/* QR Code section */}
          <div className="pt-8 flex flex-col gap-4">
            <div className="relative w-48 h-48 p-2 border border-primary/20 bg-black/40 backdrop-blur-md group">
              <div className="scan-line animate-scan"></div>
              <img 
                alt="QR Code to mobile experience" 
                className="w-full h-full object-contain grayscale brightness-125 contrast-125 group-hover:brightness-150 transition-all duration-500" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ4sL_tGFResv302wc1RJScy8bRJQ3PpexI0Rd4fEMUd6cbEJ1IiP6ZunXxBP943goksm17y_eXH8Dihz9MOMLM-G3zZDaJVFsU1zLgG6YEoxOdcOEQSWFwO4IjzNnFHK04xjsnp-3CCfEEO_cFTjcbD93M90xBevauvf_rwG57_pNecAPCUHn93X7iHxCJ8a7h9tO1AAgBGe4iVsy1Z58d3QZ5Mx9gyGlCQnJGfwhWW7KVzd93C3j-pCuGy5hB4fj1PjkFTWTxyvM"
              />
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary"></div>
            </div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
              MOBILE LINK REQUIRED FOR FULL IMMERSIVE ACCESS.
            </p>
          </div>
        </div>

        {/* Center visual */}
        <div className="relative flex items-center justify-center w-full h-full max-w-4xl">
          {/* Orbital rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] border border-primary/10 rounded-full animate-spin-slow"></div>
            <div className="absolute w-[550px] h-[550px] border border-primary/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}></div>
            <div className="absolute w-[450px] h-[450px] border-dashed border border-primary/20 rounded-full animate-spin-slow" style={{ animationDuration: '15s' }}></div>
          </div>
          
          {/* Crosshairs */}
          <div className="absolute w-full h-[1px] bg-primary/10 scale-x-125"></div>
          <div className="absolute h-full w-[1px] bg-primary/10 scale-y-125"></div>
          
          {/* Main floating element */}
          <div className="relative group animate-float-desktop flex flex-col items-center">
            {/* Beam effects */}
            <div className="absolute bottom-20 w-32 h-64 z-0 pointer-events-none overflow-hidden flex justify-center">
              <div className="w-full h-full beam-gradient opacity-30 animate-pulse"></div>
              <div className="absolute bottom-0 w-[1px] h-full bg-primary/40 animate-beam"></div>
              <div className="absolute bottom-0 left-1/4 w-[1px] h-3/4 bg-primary/20 animate-beam" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-0 right-1/4 w-[1px] h-3/4 bg-primary/20 animate-beam" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-10 left-1/2 w-0.5 h-0.5 bg-primary rounded-full animate-float-desktop" style={{ animationDuration: '2s' }}></div>
              <div className="absolute bottom-20 right-1/3 w-0.5 h-0.5 bg-primary rounded-full animate-float-desktop" style={{ animationDuration: '3s' }}></div>
            </div>
            
            {/* Glass sphere with product */}
            <div className="glass-sphere w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center overflow-hidden border border-primary/20 relative z-10 mb-8 translate-y-[-20px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan"></div>
              <img 
                alt="VIBE Fragrance Render" 
                className="w-full h-auto scale-150 -translate-x-6 z-10 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] filter brightness-110 contrast-110 opacity-90" 
                src="/vibe.jpeg"
              />
            </div>
            
            {/* Platform */}
            <div className="relative z-20 mt-[-40px]">
              <div className="w-32 h-4 bg-black border border-primary/50 rounded-lg shadow-[0_0_15px_rgba(234,179,8,0.4)] relative">
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-primary/60 tracking-widest whitespace-nowrap">SOURCE DEVICE: DETECTED</span>
              </div>
            </div>
            
            {/* Info badges */}
            <div className="absolute -top-16 -right-16 bg-black/80 border border-primary/40 px-3 py-1.5 backdrop-blur-md z-30">
              <p className="font-mono text-[9px] text-primary tracking-widest uppercase">TRANSMISSION: ACTIVE</p>
              <p className="font-mono text-[11px] text-white tracking-widest">DATA STREAM: 5GB/S</p>
            </div>
            
            <div className="absolute -bottom-4 -left-16 bg-black/80 border border-primary/40 px-3 py-1.5 backdrop-blur-md z-30">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
                <p className="font-mono text-[10px] text-white tracking-widest uppercase">Syncing to Handheld</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-12 text-right">
          <div>
            <p className="font-mono text-[10px] text-primary mb-1 uppercase tracking-widest">Composition</p>
            <p className="font-syncopate text-sm tracking-widest">01: SAFFRON / ROSE</p>
            <p className="font-syncopate text-sm tracking-widest">02: OUD / AMBER</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-primary mb-1 uppercase tracking-widest">Atmosphere</p>
            <p className="font-syncopate text-sm tracking-widest text-white/70 italic uppercase">"The molecular architecture of liquid sun."</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-end gap-3 opacity-50">
              <span className="text-[10px] font-mono tracking-widest">SENSORY LOAD</span>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-primary"></div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 opacity-50">
              <span className="text-[10px] font-mono tracking-widest">DIFFUSION RATE</span>
              <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-10 flex justify-between items-end z-50 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-white/30 tracking-[0.4em] uppercase">Status: Awaiting Mobile Link</span>
          <span className="text-[10px] font-mono text-white/30 tracking-[0.4em] uppercase">Location: 34.0522° N, 118.2437° W</span>
        </div>
        <div className="pointer-events-auto">
          <a 
            href="https://zuaera.netlify.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-black px-6 py-2 rounded-full font-mono text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-3 border-glow transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-sm">phonelink_ring</span>
            Continue on Mobile
          </a>
        </div>
      </footer>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t border-l border-primary/20 pointer-events-none"></div>
      <div className="fixed top-4 right-4 w-12 h-12 border-t border-r border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b border-l border-primary/20 pointer-events-none"></div>
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b border-r border-primary/20 pointer-events-none"></div>
    </div>
  );
};
