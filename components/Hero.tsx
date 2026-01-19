import React, { useRef, useEffect, useState } from 'react';

export const Hero: React.FC<{ onExploreCollections?: () => void }> = ({ onExploreCollections }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
    }
  }, []);

  // Pause on last frame when video ends
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => {
      video.currentTime = video.duration;
      video.pause();
    };
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Fade in text after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10">
      <video
        ref={videoRef}
        className="absolute left-0 top-0 w-full h-full z-0"
        style={{ objectFit: 'contain', height: '100vh', width: '100vw', maxHeight: '100vh', maxWidth: '100vw', objectPosition: 'center 15%' }}
        src="/zuaera-hero.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
      />
      <div 
        className="absolute bottom-44 left-0 right-0 flex flex-col items-center gap-4 z-10 transition-opacity duration-[2000ms] ease-in-out"
        style={{ opacity: showText ? 1 : 0 }}
      >
        <p 
          className="text-center text-xl font-bold tracking-[0.3em] uppercase font-display" 
          style={{ 
            color: '#e8b86d', 
            textShadow: '0 0 5px #e8b86d, 0 0 15px rgba(232,184,109,1), 0 0 30px rgba(232,184,109,0.9), 0 0 45px rgba(232,184,109,0.7), 0 0 60px rgba(232,184,109,0.5)'
          }}
        >
          Blend with emotions
        </p>
        <button
          className="bg-primary text-black px-8 py-4 rounded-[2rem] flex items-center gap-2 font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#fff04d] transition-colors active:scale-95 shadow-[0_0_20px_rgba(242,208,13,0.4)] hover:shadow-[0_0_30px_rgba(242,208,13,0.6)]"
          onClick={onExploreCollections}
        >
          Explore Collections <span className="material-symbols-outlined text-sm font-bold transform -rotate-45 hover:rotate-0 transition-transform duration-300">arrow_forward</span>
        </button>
      </div>
    </section>
  );
};
