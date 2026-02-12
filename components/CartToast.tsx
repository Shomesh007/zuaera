import React, { useEffect, useState } from 'react';

interface CartToastProps {
  productName: string;
  isVisible: boolean;
  onClose: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({ productName, isVisible, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !isAnimating) return null;

  return (
    <div 
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150"></div>
        
        {/* Main toast container */}
        <div className="relative flex items-center gap-3 px-5 py-3 bg-[#0a0905]/95 backdrop-blur-xl border border-primary/40 rounded-full shadow-[0_0_30px_rgba(242,208,13,0.15),0_10px_40px_rgba(0,0,0,0.5)]">
          {/* Animated checkmark */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <svg 
                className="w-3 h-3 text-black" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={3}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M5 13l4 4L19 7"
                  className="animate-[draw_0.3s_ease-out_0.2s_forwards]"
                  style={{ 
                    strokeDasharray: 20, 
                    strokeDashoffset: 20,
                    animation: 'draw 0.3s ease-out 0.2s forwards'
                  }}
                />
              </svg>
            </div>
          </div>
          
          {/* Text content */}
          <div className="flex flex-col">
            <span className="text-white text-xs font-bold tracking-wide">{productName}</span>
            <span className="text-primary/80 text-[10px] tracking-widest uppercase">Added to cart</span>
          </div>
          
          {/* Decorative line */}
          <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-primary/40 to-transparent ml-1"></div>
          
          {/* Cart icon with count animation */}
          <div className="relative">
            <span className="material-symbols-outlined text-primary text-lg">shopping_bag</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Bottom accent line */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>
      
      {/* Custom animation keyframes */}
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};
