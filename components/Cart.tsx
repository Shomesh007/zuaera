import React, { useState, useEffect, useRef } from 'react';
import { CartItem } from '../App';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemove: (cartItemId: string) => void;
  onBrowseCollection: () => void;
}

// Internal component for animating price changes
const AnimatedPrice: React.FC<{ value: number; className?: string }> = ({ value, className = "" }) => {
  const [animClass, setAnimClass] = useState("");
  const prevValue = useRef(value);

  useEffect(() => {
    if (value !== prevValue.current) {
      if (value > prevValue.current) {
         setAnimClass("scale-110 text-primary brightness-125");
      } else {
         setAnimClass("scale-95 opacity-80");
      }
      
      const timer = setTimeout(() => {
        setAnimClass("");
      }, 300);

      prevValue.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <span className={`inline-block transition-all duration-300 transform ${animClass} ${className}`}>
      ₹{value.toLocaleString('en-IN')}
    </span>
  );
};

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove, onBrowseCollection }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Auto-focus the scroll container on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.focus();
    }
  }, []);

  const handleRemove = (cartItemId: string) => {
    setDeletingId(cartItemId);
    setTimeout(() => {
      onRemove(cartItemId);
      setDeletingId(null);
    }, 500);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="relative min-h-[100dvh] w-full pt-24 flex flex-col bg-background-dark overflow-y-auto">
      {/* Page Header - Fixed at top of content flow */}
      <div className="flex justify-between items-start px-6 mb-4 shrink-0 z-10">
        <div>
          <h1 className="text-4xl font-bold font-display text-white tracking-wider mb-1">CART</h1>
          <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Your Selection</p>
        </div>
        <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(242,208,13,0.1)]">
          {items.reduce((acc, i) => acc + i.quantity, 0).toString().padStart(2, '0')} Items
        </div>
      </div>

      {/* Product Scroll Area */}
      <div 
        ref={scrollContainerRef}
        tabIndex={0}
        className="flex-1 w-full overflow-x-auto overflow-y-auto flex items-start gap-5 px-6 pb-60 snap-x snap-mandatory scrollbar-hide focus:outline-none pt-4 touch-pan-x"
      >
        {items.length === 0 ? (
          <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-6 text-white/30 text-xs tracking-widest uppercase animate-fade-in mx-auto">
            <span className="material-symbols-outlined text-4xl opacity-50">shopping_bag</span>
            <span>Your cart is empty</span>
            <button 
              onClick={onBrowseCollection}
              className="px-6 py-3 border border-primary/30 rounded-full text-primary hover:bg-primary/10 transition-colors"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.cartItemId}
              className={`snap-center shrink-0 w-[85%] max-w-[320px] h-[55vh] min-h-[400px] max-h-[480px] bg-[#12110a] rounded-3xl border border-white/5 overflow-hidden group transition-all duration-500 ease-out flex flex-col
                ${deletingId === item.cartItemId ? 'opacity-0 scale-90 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}
              `}
            >
              {/* Image Section */}
              <div className="relative flex-1 bg-gradient-to-b from-[#1a1810] to-[#0a0905] flex items-center justify-center overflow-hidden shrink-0 min-h-[45%]">
                <div 
                  className="absolute inset-0 animate-pulse-slow"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${item.glowColor}, transparent 70%)` }}
                ></div>
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md z-20">
                  <span className="text-[9px] text-white/80 tracking-widest uppercase font-bold">Series {item.series}</span>
                </div>

                <img 
                  src={
                    item.series === "04" ? "/vibe.jpeg" :
                    item.series === "01" ? "/CRISP.jpg" :
                    item.series === "03" ? "/EYES.jpg" :
                    item.series === "05" ? "/vibe_variant.jpg" :
                    item.image
                  }
                  alt={item.name}
                  className={`relative z-10 h-full w-full object-cover scale-125 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700 mix-blend-screen opacity-90
                    ${item.series === "04" ? "-translate-x-8" : ""}${item.series === "05" ? " translate-x-4" : ""}`}
                />
              </div>
              
              {/* Info Section */}
              <div className="p-5 relative flex flex-col shrink-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-xl font-bold text-white font-display tracking-wide">{item.name}</h3>
                </div>
                <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-bold mb-4">
                  {item.volume} • {item.liveText}
                </p>

                <div className="space-y-4">
                   {/* Quantity Controls */}
                   <div className="flex items-center justify-between bg-white/5 rounded-lg p-2 border border-white/5">
                      <span className="text-white/60 text-[10px] uppercase tracking-wider pl-2">Quantity</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                          className="size-8 rounded-md bg-black/40 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="text-white font-display w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                          className="size-8 rounded-md bg-black/40 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                   </div>

                   <div className="flex justify-between items-end">
                      <button 
                        onClick={() => handleRemove(item.cartItemId)}
                        className="text-red-400/60 hover:text-red-400 text-[10px] uppercase tracking-widest transition-colors py-1"
                        disabled={deletingId === item.cartItemId}
                      >
                        Remove
                      </button>
                      <p className="text-white font-medium text-lg">
                        <AnimatedPrice value={item.price * item.quantity} />
                      </p>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Spacer */}
        {items.length > 0 && <div className="snap-center w-2 shrink-0"></div>}
      </div>

      {/* Checkout Section */}
      {items.length > 0 && (
        <div className="fixed bottom-[90px] left-0 right-0 px-6 z-40 flex justify-center pointer-events-none animate-fade-in">
          <div className="w-full max-w-md bg-[#12110a]/95 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-deep-black pointer-events-auto">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-light tracking-wide">Subtotal</span>
                <span className="text-white font-medium tracking-wider">
                  <AnimatedPrice value={subtotal} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60 font-light tracking-wide">Tax</span>
                <span className="text-white font-medium tracking-wider">
                  <AnimatedPrice value={tax} />
                </span>
              </div>
              <div className="h-px w-full bg-white/5 my-2"></div>
              <div className="flex justify-between text-xl font-bold">
                <span className="text-white tracking-wide">Total</span>
                <span className="text-primary tracking-wider drop-shadow-[0_0_10px_rgba(242,208,13,0.3)]">
                   <AnimatedPrice value={total} />
                </span>
              </div>
            </div>

            <button
              className="w-full bg-primary text-black h-12 rounded-full flex items-center justify-center gap-3 hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(242,208,13,0.5)] hover:shadow-[0_0_30px_rgba(242,208,13,0.7)] group cursor-pointer active:scale-95"
              onClick={() => {
                const details = items.map(item =>
                  `${item.name} (${item.volume}) x${item.quantity} - ₹${item.price * item.quantity}`
                ).join("%0A");
                const totalLine = `Total: ₹${total}`;
                const msg = `Order Details:%0A${details}%0A${totalLine}`;
                window.open(`https://wa.me/917092009114?text=${msg}`);
              }}
            >
              <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">fingerprint</span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase">Checkout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};