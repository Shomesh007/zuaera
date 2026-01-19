import React from 'react';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background-dark z-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(242,208,13,0.05),transparent_60%)]"></div>
      <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      
      {/* Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] border border-primary/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute w-[450px] h-[450px] border border-primary/10 rounded-full animate-float"></div>
      </div>

      <div className="z-10 text-center px-6 flex flex-col items-center">
        <span className="text-primary/60 text-xs tracking-[0.4em] uppercase mb-6 animate-float-delayed">Est. 2024</span>
        <h1 className="text-8xl md:text-9xl font-display font-bold text-white tracking-tighter mb-2 drop-shadow-[0_0_30px_rgba(242,208,13,0.3)]">
          ZUAERA
        </h1>
        <p className="text-white/40 text-sm md:text-base tracking-[0.3em] uppercase mb-12 max-w-md">
          The Art of Digital Alchemy
        </p>

        <button 
          onClick={scrollToAbout}
          className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-full border border-primary/30 hover:border-primary/80 transition-all duration-500 cursor-pointer"
        >
          <div className="absolute inset-0 w-full h-full bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
          <span className="relative text-primary text-xs font-bold tracking-[0.25em] uppercase group-hover:drop-shadow-[0_0_8px_rgba(242,208,13,0.8)] transition-all">
            Enter The Void
          </span>
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce text-white/20">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
};