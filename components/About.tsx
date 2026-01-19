import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative min-h-[80vh] w-full flex flex-col items-center justify-center py-24 px-6 bg-[#0c0b07] z-40">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="mb-8 flex justify-center">
           <div className="w-1 h-16 bg-gradient-to-b from-transparent via-primary/50 to-transparent"></div>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 leading-tight">
          CRAFTING LIQUID <span className="text-primary drop-shadow-[0_0_15px_rgba(242,208,13,0.4)]">EMOTIONS</span>
        </h2>
        
        <p className="text-white/60 text-sm md:text-lg leading-relaxed tracking-wide font-light mb-12">
          ZUAERA sits at the intersection of botanical heritage and modern alchemy. 
          We believe fragrance is not just a scent—it is a vibration, a memory, a shift in reality. 
          Sourcing rare ingredients from the physical world and refining them through 
          conceptual design, we create atmospheres you can wear.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="p-6 border border-white/5 bg-white/2 rounded-lg backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-500">
            <span className="material-symbols-outlined text-primary mb-4 text-3xl">science</span>
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Synthesis</h3>
            <p className="text-white/40 text-xs leading-relaxed">Precision blending of natural absolutes and molecular innovations.</p>
          </div>
          <div className="p-6 border border-white/5 bg-white/2 rounded-lg backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-500 delay-100">
             <span className="material-symbols-outlined text-primary mb-4 text-3xl">psychology</span>
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Memory</h3>
            <p className="text-white/40 text-xs leading-relaxed">Scents designed to trigger deep emotional resonance.</p>
          </div>
          <div className="p-6 border border-white/5 bg-white/2 rounded-lg backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-500 delay-200">
             <span className="material-symbols-outlined text-primary mb-4 text-3xl">public</span>
            <h3 className="text-white text-sm font-bold tracking-widest uppercase mb-2">Origin</h3>
            <p className="text-white/40 text-xs leading-relaxed">Ethically sourced ingredients from across the globe.</p>
          </div>
        </div>
      </div>
      
      {/* Decorative background numbers */}
      <span className="absolute top-20 left-10 text-[200px] font-bold text-white/[0.02] pointer-events-none font-display leading-none select-none">00</span>
      <span className="absolute bottom-20 right-10 text-[200px] font-bold text-white/[0.02] pointer-events-none font-display leading-none select-none">XY</span>
    </section>
  );
};