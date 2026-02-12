import React from 'react';

interface PopularProps {
  onCartClick: () => void;
  cartCount: number;
  onTitleClick: () => void;
}

export const Popular: React.FC<PopularProps> = ({ onCartClick, cartCount, onTitleClick }) => {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-lato text-white overflow-hidden pb-24">
      <style>{`
        @keyframes float-particle {
            0% { transform: translateY(0px) translateX(0px); opacity: 0; }
            20% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translateY(-40px) translateX(20px); opacity: 0; }
        }
        @keyframes pulse-gold {
            0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
            50% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
        }
        @keyframes slide-shimmer {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
        }
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-lato { font-family: 'Lato', sans-serif; }
        .particle {
            position: absolute;
            background: #D4AF37;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 10px #D4AF37;
        }
        .particle-1 { width: 3px; height: 3px; left: 45%; top: 40%; animation: float-particle 4s infinite ease-in-out; }
        .particle-2 { width: 2px; height: 2px; left: 52%; top: 42%; animation: float-particle 5s infinite ease-in-out 1s; }
        .particle-3 { width: 4px; height: 4px; left: 48%; top: 38%; animation: float-particle 6s infinite ease-in-out 2s; }
        .particle-4 { width: 2px; height: 2px; left: 50%; top: 45%; animation: float-particle 4.5s infinite ease-in-out 0.5s; }
        .particle-5 { width: 3px; height: 3px; left: 42%; top: 43%; animation: float-particle 5.5s infinite ease-in-out 1.5s; }
        .glass-panel-custom {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      {/* Header - Custom for this view */}
      <header className="absolute top-0 w-full z-30 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
        <button className="text-white hover:text-[#D4AF37] transition-colors">
          <span className="material-icons">menu</span>
        </button>
        <div 
          onClick={onTitleClick}
          className="text-[#D4AF37] font-cinzel font-bold text-2xl tracking-widest cursor-pointer hover:text-white transition-colors"
        >
          ZUAERA
        </div>
        <button onClick={onCartClick} className="text-white hover:text-[#D4AF37] transition-colors relative">
          <span className="material-icons">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      <main className="relative h-[65vh] w-full">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Intimate couple profile view in black and white with dramatic lighting" 
            className="w-full h-full object-cover opacity-80" 
            loading="eager"
            decoding="async"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDi4Gsd6chh_JFbztTkrBXwjy4DZqBnQPv0gOwkEPd2AS-qlkW9M16rNoa30WwS5jiLS4HHO_a1xZF9dzZUJWPN2Lv3oAooc7cI6EPZ6AOgbjg02Ix3Be5G8673RYUpqAhqiVH8n4KqKsV2Z-CAM4Gnod-HKQ8pyGNIJtBdAGcd6Panq_oLUsCPfuJKHnWxRGj5ivB0tBeUdmikPbSavQGmo3LQCAg8rbEePj7KT_QZRPKKDQF6HSEU3klJ0F94icPpzh_XGld9flMN"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a] z-10"></div>
        </div>

        {/* Particles */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>

        {/* Hero Text */}
        <div className="absolute bottom-10 left-0 w-full z-20 px-6 text-center">
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3 block">Chemistry Series</span>
          <h1 className="text-4xl md:text-5xl font-cinzel text-white mb-2 leading-tight">
            The Art of<br/>
            <span className="text-[#D4AF37] italic font-serif">Attraction</span>
          </h1>
          <p className="text-gray-300 text-sm font-light leading-relaxed max-w-xs mx-auto mb-6">
            Invisible threads connect souls. Discover the scent that bridges the gap between you and desire.
          </p>
          <button className="group flex items-center justify-center space-x-2 mx-auto text-white hover:text-[#D4AF37] transition-colors">
            <span className="text-xs uppercase tracking-widest border-b border-white group-hover:border-[#D4AF37] pb-0.5">Explore the Science</span>
            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </main>

      {/* Bundle Card Section */}
      <section className="relative z-20 -mt-8 px-4 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="glass-panel-custom rounded-2xl p-5 shadow-2xl">
          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-white font-cinzel text-lg">Duo Bundle</h3>
              <p className="text-gray-400 text-xs mt-1">Perfectly paired essences</p>
            </div>
            <div className="text-right">
              <span className="text-[#D4AF37] font-cinzel text-xl font-bold">₹3,499</span>
              <span className="text-gray-500 text-xs line-through block">₹3,998</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Crisp Bottle */}
            <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center relative group">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]/50 group-hover:bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all"></div>
              <div className="h-24 w-full flex items-center justify-center mb-2 overflow-hidden">
                <img
                  src="/Crispy%20(Male).jpeg"
                  alt="Crisp Bottle"
                  className="w-12 h-20 object-contain rounded shadow-lg border border-gold/30 bg-black"
                />
              </div>
              <h4 className="text-white font-cinzel text-sm tracking-wide">CRISP</h4>
              <p className="text-gray-400 text-[10px] text-center mt-1">Sharp & Modern</p>
            </div>

            {/* Vibe Bottle */}
            <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex flex-col items-center relative group">
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D4AF37]/50 group-hover:bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all"></div>
              <div className="h-24 w-full flex items-center justify-center mb-2">
                <img
                  src="/vibe%20(unisex).jpeg"
                  alt="Vibe Bottle"
                  className="w-12 h-20 object-contain rounded shadow-lg border border-gold/30 bg-black"
                />
              </div>
              <h4 className="text-white font-cinzel text-sm tracking-wide">VIBE</h4>
              <p className="text-gray-400 text-[10px] text-center mt-1">Deep & Magnetic</p>
            </div>
          </div>

          <button
            className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center space-x-3 shadow-[0_4px_20px_rgba(212,175,55,0.3)] animate-[pulse-gold_2s_infinite]"
            onClick={() => {
              const event = new CustomEvent('add-bundle-to-cart');
              window.dispatchEvent(event);
            }}
          >
            <span className="material-icons text-sm">add_shopping_cart</span>
            <span className="tracking-widest text-xs uppercase">Add Bundle to Cart</span>
          </button>

          <div className="mt-4 flex justify-center">
            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-[#D4AF37]/50 animate-[slide-shimmer_3s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-2 flex items-start space-x-4 opacity-80">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-[#D4AF37]/20">
            <span className="material-icons text-[#D4AF37] text-lg">science</span>
          </div>
          <div>
            <h5 className="text-white font-cinzel text-sm mb-1">Pheromone Technology</h5>
            <p className="text-gray-400 text-xs leading-relaxed">Infused with Iso E Super to enhance your natural chemistry and magnify attraction.</p>
          </div>
        </div>
      </section>
    </div>
  );
};