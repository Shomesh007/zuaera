import React from 'react';

type NavItem = 'home' | 'collections' | 'lab' | 'profile' | 'cart';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: NavItem) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { id: NavItem; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'collections', label: 'Collections', icon: 'category' },
    { id: 'lab', label: 'The Lab', icon: 'science' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'cart', label: 'Cart', icon: 'shopping_cart' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0905]/95 backdrop-blur-xl border-t border-white/5 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-between px-4 pt-3 pb-6">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="flex-1 flex flex-col items-center gap-1.5 group outline-none"
            >
              <div 
                className={`size-9 rounded-full flex items-center justify-center transition-all duration-300 border
                  ${isActive 
                    ? 'bg-primary/10 border-primary/40 shadow-[0_0_12px_rgba(242,208,13,0.2)]' 
                    : 'border-transparent group-hover:bg-white/5'
                  }`}
              >
                <span 
                  className={`material-symbols-outlined text-[22px] transition-colors duration-300
                    ${isActive ? 'text-primary' : 'text-white/40 group-hover:text-primary'}
                  `}
                >
                  {item.icon}
                </span>
              </div>
              <span 
                className={`text-[9px] font-medium tracking-[0.15em] uppercase transition-colors duration-300
                  ${isActive ? 'text-primary' : 'text-white/40 group-hover:text-primary'}
                `}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};