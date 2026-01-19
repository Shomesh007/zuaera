import React, { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  volume: string;
  edition: string;
  type: string;
  glowColor: string;
}

export const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'NEBULA MIST',
      price: 400,
      image: 'https://images.unsplash.com/photo-1595867275462-87f5a31ebdf3?auto=format&fit=crop&w=600&q=80',
      volume: '50ML',
      edition: 'Cosmic Edition',
      type: 'Extrait',
      glowColor: 'rgba(147,51,234,0.3)'
    },
    {
      id: '2',
      name: 'VOID GOLD',
      price: 400,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      volume: '100ML',
      edition: 'Signature',
      type: 'Parfum',
      glowColor: 'rgba(242,208,13,0.2)'
    },
     {
      id: '3',
      name: 'LUNAR DUST',
      price: 350,
      image: 'https://images.unsplash.com/photo-1615255959074-b788006e886c?auto=format&fit=crop&w=600&q=80',
      volume: '50ML',
      edition: 'Limited',
      type: 'Eau de Parfum',
      glowColor: 'rgba(255,255,255,0.2)'
    }
  ]);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    setDeletingId(id);
    setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== id));
      setDeletingId(null);
    }, 500);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-full w-full pt-28 px-6 pb-32 flex flex-col animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold font-display text-white tracking-wider mb-1">CART</h1>
          <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Your Selection</p>
        </div>
        <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(242,208,13,0.1)]">
          {items.length.toString().padStart(2, '0')} Items
        </div>
      </div>

      {/* Product Scroll Area */}
      <div className="flex overflow-x-auto gap-5 pb-8 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory min-h-[420px]">
        {items.length === 0 ? (
          <div className="w-full flex items-center justify-center text-white/30 text-xs tracking-widest uppercase">
            Your cart is empty
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id}
              className={`snap-center shrink-0 w-[85%] max-w-[320px] bg-[#12110a] rounded-3xl border border-white/5 overflow-hidden group transition-all duration-500 ease-out
                ${deletingId === item.id ? 'opacity-0 scale-90 translate-y-8' : 'opacity-100 scale-100 translate-y-0'}
              `}
            >
              <div className="relative h-80 w-full bg-gradient-to-b from-[#1a1810] to-[#0a0905] flex items-center justify-center overflow-hidden">
                {/* Dynamic Glow Background */}
                <div 
                  className="absolute inset-0 animate-pulse-slow"
                  style={{ background: `radial-gradient(circle at 50% 50%, ${item.glowColor}, transparent 70%)` }}
                ></div>
                
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                  <span className="text-[9px] text-white/80 tracking-widest uppercase font-bold">{item.type}</span>
                </div>

                <img 
                  src={item.image} 
                  alt={item.name}
                  className="relative z-10 h-64 w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700 mix-blend-screen opacity-90"
                />
              </div>
              
              <div className="p-6 relative">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-white font-display tracking-wide">{item.name}</h3>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="text-white/30 hover:text-red-500 transition-colors p-1"
                    disabled={deletingId === item.id}
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
                <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-bold mb-4">
                  {item.volume} • {item.edition}
                </p>
                <p className="text-white/60 text-sm font-medium">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Checkout Section */}
      <div className="mt-auto w-full bg-[#12110a] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-deep-black">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/60 font-light tracking-wide">Subtotal</span>
            <span className="text-white font-medium tracking-wider">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/60 font-light tracking-wide">Tax</span>
            <span className="text-white font-medium tracking-wider">${tax.toFixed(2)}</span>
          </div>
          <div className="h-px w-full bg-white/5 my-2"></div>
          <div className="flex justify-between text-xl font-bold">
            <span className="text-white tracking-wide">Total</span>
            <span className="text-primary tracking-wider drop-shadow-[0_0_10px_rgba(242,208,13,0.3)]">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="w-full bg-primary text-black h-14 rounded-full flex items-center justify-center gap-3 hover:bg-primary-dark transition-all duration-300 shadow-[0_0_20px_rgba(242,208,13,0.3)] group">
          <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">fingerprint</span>
          <span className="text-sm font-bold tracking-[0.15em] uppercase">Biometric Checkout</span>
        </button>
      </div>
    </div>
  );
};