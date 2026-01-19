import React, { useRef, useEffect } from 'react';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black z-10">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain z-0 scale-90 md:scale-100 -translate-x-2 md:-translate-x-4 -translate-y-8 md:-translate-y-16"
        src="/zuaera-hero.mp4"
        autoPlay
        muted
        playsInline
        loop={false}
      />
    </section>
  );
};
