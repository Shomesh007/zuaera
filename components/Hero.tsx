import React, { useRef, useEffect } from 'react';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Ensure video plays on mount if policy allows
    if (videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background-dark z-50">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="zuaera-hero.mp4"
        autoPlay
        muted
        playsInline
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>

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
      <div className="absolute bottom-10 animate-bounce text-white/20 z-10">
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </div>
    </section>
  );
};