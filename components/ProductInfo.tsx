import React, { useState, useEffect } from 'react';

interface ProductInfoProps {
  title: string;
  tagline: string;
  tags: string[];
  highlights: [
    { label: string; value: string; icon: string },
    { label: string; value: string; icon: string }
  ];
  prices: { "50ML": number; "100ML": number };
  defaultVolume?: string;
  onAddToCart: (volume: string, price: number) => void;
  onShowNotes?: () => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ 
  title, 
  tagline,
  tags, 
  highlights,
  prices,
  defaultVolume = '50ML',
  onAddToCart,
  onShowNotes 
}) => {
  const [selectedVolume, setSelectedVolume] = useState(defaultVolume);

  // Reset volume selection when title/product changes to that product's default
  useEffect(() => {
    setSelectedVolume(defaultVolume);
  }, [title, defaultVolume]);

  const currentPrice = prices[selectedVolume as keyof typeof prices];

  return (
    <div className="w-full px-6 z-20 -mt-2">
      <div className="text-center relative">
          <h3 className="text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_8px_rgba(242,208,13,0.3)]">Extrait De Parfum</h3>
          <h1 className="text-white text-5xl font-bold tracking-tight mb-4 font-display drop-shadow-lg">{title}</h1>
          <p className="text-primary/90 text-sm italic font-medium tracking-wide mb-2 max-w-xs mx-auto">"{tagline}"</p>
          <button 
            onClick={onShowNotes}
            className="mb-8 px-6 py-2 rounded-full bg-primary text-black font-bold uppercase text-xs tracking-widest shadow hover:bg-primary/80 transition-colors"
          >
            Show Notes
          </button>
          
          {/* Tags Row */}
          <div className="relative mb-10 w-full">
             <div className="flex justify-between px-6 max-w-[300px] mx-auto relative z-10">
                {tags.slice(0, 4).map(tag => (
                    <div key={tag} className="flex flex-col items-center gap-3 group">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,208,13,0.8)] group-hover:scale-150 transition-transform duration-300"></div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-white/80 group-hover:text-primary transition-colors">{tag}</span>
                    </div>
                ))}
             </div>
             
             {/* Wave SVG */}
             <div className="w-full h-8 mt-6 opacity-80 flex items-center justify-center overflow-hidden">
                <svg width="200" height="20" viewBox="0 0 200 20" fill="none" className="animate-pulse-slow">
                    <path d="M0 10 Q 25 0 50 10 T 100 10 T 150 10 T 200 10" stroke="#f2d00d" strokeWidth="1" fill="none" />
                    <path d="M0 10 Q 25 20 50 10 T 100 10 T 150 10 T 200 10" stroke="#f2d00d" strokeWidth="0.5" strokeOpacity="0.5" fill="none" />
                </svg>
             </div>
          </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
          {highlights.map((highlight, index) => (
             <div key={index} className="bg-[#12110a] border border-primary/20 rounded-3xl p-5 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                <span className="material-symbols-outlined text-primary text-xl mb-auto">{highlight.icon}</span>
                <div>
                    <h4 className="text-white text-sm font-bold tracking-wide mb-1">{highlight.label}</h4>
                    <p className="text-primary text-[10px] font-bold tracking-wider uppercase drop-shadow-sm">{highlight.value}</p>
                </div>
                
                {/* Add decorations only to the second card to mimic the previous design style */}
                {index === 1 && (
                    <div className="absolute top-4 right-3 flex flex-col gap-3">
                       <button className="text-white/20 hover:text-primary hover:scale-110 transition-all rounded-full p-1 hover:bg-primary/5">
                          <span className="material-symbols-outlined text-lg">favorite</span>
                       </button>
                       <button className="text-white/20 hover:text-primary hover:scale-110 transition-all rounded-full p-1 hover:bg-primary/5">
                          <span className="material-symbols-outlined text-lg">share</span>
                       </button>
                    </div>
                )}
             </div>
          ))}
      </div>

      {/* Only 30ML available */}
      <div className="flex justify-center gap-2 mb-6">
        <span className="px-4 py-2 rounded-lg border border-primary bg-primary/10 text-primary font-bold uppercase tracking-widest text-xs">Only 30ML available</span>
      </div>

      {/* Bottom Action Bar */}
      <div className="w-full bg-[#12110a] border border-primary/20 rounded-[2.5rem] p-2 pl-8 flex justify-between items-center shadow-deep-black group hover:border-primary/40 transition-all duration-300">
          <div className="flex flex-col">
              <span className="text-primary text-[9px] font-bold tracking-widest uppercase mb-0.5 opacity-80">Price</span>
              <span className="text-white text-2xl font-display font-bold tracking-wide">₹{currentPrice.toLocaleString('en-IN')}</span>
          </div>
          <button 
            onClick={() => onAddToCart(selectedVolume, currentPrice)}
            className="bg-primary text-black px-8 py-4 rounded-[2rem] flex items-center gap-2 font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#fff04d] transition-colors active:scale-95 shadow-[0_0_20px_rgba(242,208,13,0.4)] hover:shadow-[0_0_30px_rgba(242,208,13,0.6)]"
          >
              Acquire <span className="material-symbols-outlined text-sm font-bold transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">arrow_forward</span>
          </button>
      </div>
    </div>
  );
};