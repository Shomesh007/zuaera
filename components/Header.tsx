import React from 'react';

interface HeaderProps {
  title?: string;
  showCategories?: boolean;
  categories?: string[];
  activeCategory?: string;
  onCategorySelect?: (category: string) => void;
  onCartClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = "ZUAERA", 
  showCategories = false, 
  categories = [], 
  activeCategory, 
  onCategorySelect,
  onCartClick
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col bg-[#0a0905]/95 backdrop-blur-md pt-4 pb-2 border-b border-white/5 shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between px-6 mb-5">
        <h2 className="text-primary text-xl font-bold leading-tight tracking-[0.25em] font-display uppercase drop-shadow-[0_0_8px_rgba(242,208,13,0.4)] cursor-pointer">
          {title}
        </h2>
        <button 
          onClick={onCartClick}
          className="size-10 flex items-center justify-center rounded-full border border-primary/20 bg-background-dark/40 backdrop-blur-md text-primary hover:bg-primary/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
        </button>
      </div>
      
      {/* Scrollable Categories Container - Conditionally Rendered */}
      {showCategories && categories.length > 0 && (
        <div className="flex items-center gap-3 overflow-x-auto px-6 pb-4 scrollbar-hide w-full snap-x snap-mandatory pr-8 animate-float">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategorySelect && onCategorySelect(cat)}
                className={`snap-start shrink-0 px-5 py-2 rounded-full border text-xs font-bold tracking-widest uppercase whitespace-nowrap transition-all duration-300 outline-none
                  ${isActive 
                    ? 'border-primary text-primary bg-primary/10 shadow-[0_0_20px_rgba(242,208,13,0.25)]' 
                    : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};