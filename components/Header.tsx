import React from 'react';

interface HeaderProps {
  title?: string;
  showCategories?: boolean;
  categories?: string[];
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
  onCartClick?: () => void;
  onTitleClick?: () => void;
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "ZUAERA", 
  showCategories = false, 
  categories = [], 
  activeCategory, 
  onCategorySelect,
  onCartClick,
  onTitleClick,
  cartCount = 0
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-[#0a0905]/95 backdrop-blur-md pt-4 pb-3 border-b border-white/5 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between px-6">
        <h2 
          onClick={onTitleClick}
          className="text-primary text-xl font-bold leading-tight tracking-[0.25em] font-display uppercase drop-shadow-[0_0_8px_rgba(242,208,13,0.4)] cursor-pointer hover:text-white transition-colors"
        >
          {title}
        </h2>
        <button 
          onClick={onCartClick}
          className="relative size-10 flex items-center justify-center rounded-full border border-primary/20 bg-background-dark/40 backdrop-blur-md text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          
          {cartCount > 0 && (
            <div className="absolute -top-1 -right-1 size-4 bg-primary text-black text-[9px] font-bold flex items-center justify-center rounded-full animate-fade-in shadow-[0_0_10px_rgba(242,208,13,0.8)]">
              {cartCount}
            </div>
          )}
        </button>
      </div>
      
      {/* Scrollable Categories Container - Conditionally Rendered */}
      {showCategories && categories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto px-6 pt-4 pb-3 scrollbar-hide w-full snap-x snap-mandatory">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            // Parse category: "01 Crisp" -> num: "01", name: "Crisp"
            const parts = cat.split(' ');
            const num = parts[0];
            const name = parts.slice(1).join(' ');
            return (
              <button
                key={cat}
                onClick={() => onCategorySelect && onCategorySelect(cat)}
                className={`snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 outline-none
                  ${isActive 
                    ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(242,208,13,0.25)]' 
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
              >
                <span className={`text-[10px] font-medium ${isActive ? 'text-primary/70' : 'text-white/30'}`}>{num}</span>
                <span className={`text-xs font-bold tracking-wider uppercase ${isActive ? 'text-primary' : 'text-white/60'}`}>{name}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};