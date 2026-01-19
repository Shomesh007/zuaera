import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Header } from './components/Header';
import { OrbitVisual } from './components/OrbitVisual';
import { ProductInfo } from './components/ProductInfo';
import { LiveProfile } from './components/LiveProfile';
import { BottomNav } from './components/BottomNav';
import { Cart } from './components/Cart';

const PRODUCTS = [
  {
    id: "01",
    series: "01",
    name: "CRISP",
    navLabel: "01 Crisp",
    tags: ["Fresh", "Green", "Clean", "Uplifting"],
    description: "CRISP is sharp and refreshing, opening with bright citrus and herbs, then settling into a clean, green calm. It feels modern, clear-headed, and effortlessly fresh.",
    liveText: "REFRESHING ENERGY",
    ingredients: [
      { name: "Mint", url: "https://images.unsplash.com/photo-1626469854832-7c38555e09f5?auto=format&fit=crop&w=300&q=80" },
      { name: "Lavender", url: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=300&q=80" },
      { name: "Musk", url: "https://images.unsplash.com/photo-1596527582536-1e0e8568e2f8?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: "02",
    series: "02",
    name: "CRISP II",
    navLabel: "02 Crisp+",
    tags: ["Fresh", "Fruity", "Aromatic", "Modern"],
    description: "This variant of CRISP leans more aromatic and woody, balancing freshness with subtle depth. It feels crisp yet grounded, with a refined, everyday elegance.",
    liveText: "REFINED ELEGANCE",
    ingredients: [
      { name: "Apple", url: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=300&q=80" },
      { name: "Sage", url: "https://images.unsplash.com/photo-1621379199326-7243c3d52684?auto=format&fit=crop&w=300&q=80" },
      { name: "Cedar", url: "https://images.unsplash.com/photo-1615195627275-4869291d17d6?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: "03",
    series: "03",
    name: "EYES",
    navLabel: "03 Eyes",
    tags: ["Warm", "Sweet", "Intimate", "Sensual"],
    description: "EYES is soft and inviting, built around warmth and sweetness. It sits close to the skin, comforting yet seductive, designed for quiet confidence rather than attention.",
    liveText: "QUIET CONFIDENCE",
    ingredients: [
      { name: "Vanilla", url: "https://images.unsplash.com/photo-1629327896349-433c2a933394?auto=format&fit=crop&w=300&q=80" },
      { name: "Jasmine", url: "https://images.unsplash.com/photo-1599307767316-77f999cc8f2f?auto=format&fit=crop&w=300&q=80" },
      { name: "Amber", url: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: "04",
    series: "04",
    name: "VIBE",
    navLabel: "04 Vibe",
    tags: ["Deep", "Woody", "Luxurious", "Atmospheric"],
    description: "VIBE is rich and immersive, opening with spice and citrus before revealing a dark floral heart and a powerful, long-lasting base. It feels bold, grounded, and memorable.",
    liveText: "BOLD CHARACTER",
    ingredients: [
      { name: "Saffron", url: "https://images.unsplash.com/photo-1623157879673-81e5b5c900e5?auto=format&fit=crop&w=300&q=80" },
      { name: "Rose", url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=300&q=80" },
      { name: "Oud", url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: "05",
    series: "05",
    name: "VIBE II",
    navLabel: "05 Vibe+",
    tags: ["Warm", "Spiced", "Woody", "Sweet"],
    description: "This variant of VIBE adds subtle sweetness and spice, making it more expressive and layered. It retains the depth of the original while introducing a smoother, more playful warmth.",
    liveText: "PLAYFUL WARMTH",
    ingredients: [
      { name: "Pepper", url: "https://images.unsplash.com/photo-1600336599723-64e52565451a?auto=format&fit=crop&w=300&q=80" },
      { name: "Agarwood", url: "https://images.unsplash.com/photo-1615255959074-b788006e886c?auto=format&fit=crop&w=300&q=80" },
      { name: "Cane", url: "https://images.unsplash.com/photo-1627820751275-f551c91b5c40?auto=format&fit=crop&w=300&q=80" }
    ]
  }
];

type View = 'home' | 'collections' | 'lab' | 'profile' | 'cart';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState('04 Vibe');

  // Scroll to top instantly when view changes to prevent "extra scroll" issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Derive current product from active category or default to Vibe
  const currentProduct = PRODUCTS.find(p => p.navLabel === activeCategory) || PRODUCTS[3];
  
  // Get all category labels for header
  const categories = PRODUCTS.map(p => p.navLabel);

  const getPageTitle = (view: View) => {
    switch(view) {
      case 'home': return 'ZUAERA';
      case 'collections': return 'COLLECTION';
      case 'lab': return 'THE LAB';
      case 'profile': return 'PROFILE';
      case 'cart': return 'CART';
      default: return 'ZUAERA';
    }
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-background-dark pb-24">
      {/* Global Header */}
      <Header 
        title={getPageTitle(currentView)}
        showCategories={currentView === 'collections'}
        categories={categories}
        activeCategory={activeCategory} 
        onCategorySelect={setActiveCategory} 
        onCartClick={() => setCurrentView('cart')}
      />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <div className="animate-float">
            <Hero />
            <About />
          </div>
        )}

        {currentView === 'collections' && (
          <section id="collection" className="relative w-full flex flex-col pt-32 animate-fade-in">
            <div className="flex-1 flex flex-col items-center w-full max-w-lg mx-auto">
              <OrbitVisual 
                seriesNumber={currentProduct.series}
                ingredients={currentProduct.ingredients}
              />
              <ProductInfo 
                title={currentProduct.name}
                category={`Category ${currentProduct.series}`}
                tags={currentProduct.tags}
                description={currentProduct.description}
              />
              <LiveProfile 
                vibeText={currentProduct.liveText}
              />
            </div>
          </section>
        )}

        {currentView === 'cart' && <Cart />}

        {(currentView === 'lab' || currentView === 'profile') && (
           <div className="flex items-center justify-center min-h-[60vh] pt-32 text-white/30 text-xs tracking-widest uppercase animate-fade-in">
              Coming Soon
           </div>
        )}
      </main>

      {/* Global Bottom Navigation */}
      <BottomNav activeTab={currentView} onTabChange={setCurrentView} />
    </div>
  );
};

export default App;