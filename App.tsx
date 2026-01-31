import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Header } from './components/Header';
import { OrbitVisual } from './components/OrbitVisual';
import { ProductInfo } from './components/ProductInfo';
import { Popular } from './components/Popular';
import { BottomNav } from './components/BottomNav';
import { Cart } from './components/Cart';
import { ScentDNA } from './components/ScentDNA';
import { ImagePreloader } from './components/ImagePreloader';

// Enhanced Data Model
export interface Product {
  id: string;
  series: string;
  name: string;
  navLabel: string;
  tags: string[];
  description: string;
  tagline: string;
  highlights: [
    { label: string; value: string; icon: string },
    { label: string; value: string; icon: string }
  ];
  ingredients: { name: string; url: string }[];
  price: number;
  image: string;
  volume: string;
  glowColor: string;
}

export interface CartItem extends Product {
  quantity: number;
  cartItemId: string; // Composite key: id + volume
}

const PRODUCTS: Product[] = [
  {
    id: "01",
    series: "01",
    name: "CRISP",
    navLabel: "01 Crisp",
    tags: ["Fresh", "Green", "Clean", "Uplifting"],
    description: "CRISP is sharp and refreshing, opening with bright citrus and herbs, then settling into a clean, green calm. It feels modern, clear-headed, and effortlessly fresh.",
    tagline: "The architecture of morning light.",
    highlights: [
      { label: "Family", value: "Citrus Green", icon: "eco" },
      { label: "Sillage", value: "Fresh / Airy", icon: "air" }
    ],
    price: 1999,
    volume: "30ML",
    image: "/CRISP.jpg",
    glowColor: "rgba(100, 255, 218, 0.2)",
    ingredients: [
      { name: "Mint", url: "/mint.png" },
      { name: "Lavender", url: "/lavender.png" },
      { name: "Musk", url: "/musk.png" }
    ]
  },
  {
    id: "03",
    series: "03",
    name: "EYES",
    navLabel: "03 Eyes",
    tags: ["Warm", "Sweet", "Intimate", "Sensual"],
    description: "EYES is soft and inviting, built around warmth and sweetness. It sits close to the skin, comforting yet seductive, designed for quiet confidence rather than attention.",
    tagline: "The silence between heartbeats.",
    highlights: [
      { label: "Character", value: "Skin Scent", icon: "fingerprint" },
      { label: "Texture", value: "Velvet / Warm", icon: "texture" }
    ],
    price: 1999,
    volume: "30ML",
    image: "/EYES.jpg",
    glowColor: "rgba(236, 72, 153, 0.25)",
    ingredients: [
      { name: "Vanilla", url: "/vanilla.png" },
      { name: "Jasmine", url: "/jasmine.png" },
      { name: "Amber", url: "https://images.unsplash.com/photo-1512413914633-b5043f4041ea?auto=format&fit=crop&w=300&q=80" }
    ]
  },
  {
    id: "04",
    series: "04",
    name: "VIBE",
    navLabel: "04 Vibe",
    tags: ["Deep", "Woody", "Luxurious", "Gold"],
    description: "VIBE is rich and immersive, opening with spice and citrus before revealing a dark floral heart. It feels bold, grounded, and memorable.",
    tagline: "The molecular architecture of liquid sun.",
    highlights: [
      { label: "Longevity", value: "12+ Hours", icon: "history" },
      { label: "Molecular", value: "ISO E Super+", icon: "science" }
    ],
    price: 1999,
    volume: "30ML",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    glowColor: "rgba(242,208,13,0.3)",
    ingredients: [
      { name: "Saffron", url: "https://images.unsplash.com/photo-1623157879673-81e5b5c900e5?auto=format&fit=crop&w=300&q=80" },
      { name: "Rose", url: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=300&q=80" },
      { name: "Oud", url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80" }
    ]
  }
];

type View = 'home' | 'collections' | 'about' | 'popular' | 'cart' | 'scent-dna';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeCategory, setActiveCategory] = useState('04 Vibe');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Listen for bundle add event
  useEffect(() => {
    const handler = () => {
      const crisp = PRODUCTS.find(p => p.id === "01");
      const vibe = PRODUCTS.find(p => p.id === "04");
      if (crisp && vibe) {
        // Add both only if not already in cart
        setCartItems(prev => {
          let updated = [...prev];
          const crispKey = `${crisp.id}-30ML`;
          const vibeKey = `${vibe.id}-30ML`;
          if (!updated.find(i => i.cartItemId === crispKey)) {
            updated.push({ ...crisp, volume: "30ML", price: 1999, quantity: 1, cartItemId: crispKey });
          }
          if (!updated.find(i => i.cartItemId === vibeKey)) {
            updated.push({ ...vibe, volume: "30ML", price: 1999, quantity: 1, cartItemId: vibeKey });
          }
          return updated;
        });
      }
    };
    window.addEventListener('add-bundle-to-cart', handler);
    return () => window.removeEventListener('add-bundle-to-cart', handler);
  }, []);

  // Scroll to top instantly when view changes to prevent "extra scroll" issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Derive current product from active category or default to Vibe
  const currentProduct = PRODUCTS.find(p => p.navLabel === activeCategory) || PRODUCTS[3];
  
  // Get all category labels for header
  const categories = PRODUCTS.map(p => p.navLabel);

  // Pricing Logic Helper
  const getPricing = (product: Product) => {
    const is50 = product.volume === '50ML';
    // Logic: If default is 50ml, 100ml is ~1.8x. If default is 100ml, 50ml is ~0.6x
    const price50 = is50 ? product.price : Math.ceil((product.price * 0.6) / 100) * 100 - 1;
    const price100 = !is50 ? product.price : Math.ceil((product.price * 1.8) / 100) * 100 - 1;
    return { "50ML": price50, "100ML": price100 };
  };

  const currentPrices = getPricing(currentProduct);

  // Cart Logic
  const handleAddToCart = (product: Product, volume: string, price: number) => {
    const newItemKey = `${product.id}-${volume}`;

    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === newItemKey);
      if (existing) {
        return prev.map(item => 
          item.cartItemId === newItemKey
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [
        ...prev, 
        { 
          ...product, 
          volume, 
          price, 
          quantity: 1, 
          cartItemId: newItemKey 
        }
      ];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-background-dark pb-24">
      {/* Global Header - Hidden on Popular view as it has its own custom header */}
      {currentView !== 'popular' && (
        <Header 
          title="ZUAERA"
          showCategories={currentView === 'collections'}
          categories={categories}
          activeCategory={activeCategory} 
          onCategorySelect={setActiveCategory} 
          onCartClick={() => setCurrentView('cart')}
          onTitleClick={() => setCurrentView('home')}
          cartCount={cartTotalItems}
        />
      )}
      
      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentView === 'home' && (
          <div>
            <ImagePreloader />
            <Hero onExploreCollections={() => setCurrentView('collections')} />
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
                tagline={currentProduct.tagline}
                tags={currentProduct.tags}
                highlights={currentProduct.highlights}
                prices={currentPrices}
                defaultVolume={currentProduct.volume === '50ML' ? '50ML' : '100ML'}
                onAddToCart={(vol, price) => handleAddToCart(currentProduct, vol, price)}
                onShowNotes={() => setCurrentView('scent-dna')}
              />
            </div>
          </section>
        )}

        {currentView === 'popular' && (
          <div className="animate-fade-in">
            <Popular
              onCartClick={() => setCurrentView('cart')}
              onTitleClick={() => setCurrentView('home')}
              cartCount={cartTotalItems}
            />
          </div>
        )}

        {currentView === 'cart' && (
          <Cart 
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            onBrowseCollection={() => setCurrentView('collections')}
          />
        )}

        {currentView === 'scent-dna' && (
          <ScentDNA
            product={currentProduct}
            price={currentProduct.price}
            onBack={() => setCurrentView('collections')}
            onAddToCollection={() => {
              handleAddToCart(currentProduct, '30ML', currentProduct.price);
              setCurrentView('cart');
            }}
          />
        )}
        
        {currentView === 'about' && (
          <div className="pt-20 animate-fade-in">
             <About />
          </div>
        )}
      </main>

      {/* Global Bottom Navigation - Hidden on scent-dna view as it has its own bottom bar */}
      {currentView !== 'scent-dna' && (
        <BottomNav activeTab={currentView} onTabChange={setCurrentView} />
      )}
    </div>
  );
};

export default App;