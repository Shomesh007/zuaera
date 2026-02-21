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
import { CartToast } from './components/CartToast';
import { DesktopApp } from './components/DesktopApp';
import { Collections } from './components/Collections';
import { ProductDetail } from './components/ProductDetail';
import { CheckoutForm, OrderDetails } from './components/CheckoutForm';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminAuth } from './components/AdminAuth';
import { loadProducts } from './components/productStore';

// Desktop detection hook
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      // Check screen width (768px is typical tablet/desktop breakpoint)
      const isWideScreen = window.innerWidth >= 768;

      // Check if it's a touch device (most mobile devices have touch)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      // Check user agent for mobile indicators
      const mobileKeywords = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileKeywords.test(navigator.userAgent);

      // Consider desktop if: wide screen AND (not a touch-only device OR not mobile UA)
      // This allows tablets in landscape to still access mobile, but blocks true desktops
      setIsDesktop(isWideScreen && !isMobileUA);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return isDesktop;
};

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



type View = 'home' | 'collections' | 'product-detail' | 'about' | 'popular' | 'cart' | 'scent-dna' | 'checkout' | 'checkout-form' | 'admin-auth' | 'admin-dashboard';

const App: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [products, setProducts] = useState<Product[]>(() => loadProducts());
  const [currentView, setCurrentView] = useState<View>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zuaera-view');
      return (saved as View) || 'home';
    }
    return 'home';
  });
  const [activeCategory, setActiveCategory] = useState('04 Vibe');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastProduct, setToastProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zuaera-selected-product');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zuaera-orders');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check for /admin path
  useEffect(() => {
    const pathname = window.location.pathname;
    // Don't interfere with static file paths
    const staticPaths = ['/robots.txt', '/sitemap.xml'];
    if (staticPaths.includes(pathname)) return;

    if (pathname === '/admin' || pathname === '/admin/') {
      setCurrentView('admin-auth');
    } else if (currentView === 'admin-auth' && !isAdminAuthenticated && pathname !== '/admin') {
      // If on admin-auth but not authenticated and path changed, redirect
      window.history.replaceState(null, '', '/');
    }
  }, []);

  // Update URL when view changes
  useEffect(() => {
    // Don't rewrite URL for static file paths — let the server handle them
    const staticPaths = ['/robots.txt', '/sitemap.xml'];
    if (staticPaths.includes(window.location.pathname)) return;

    if (isAdminAuthenticated && currentView === 'admin-dashboard') {
      window.history.pushState(null, '', '/admin');
    } else if (!isAdminAuthenticated && currentView !== 'admin-auth') {
      window.history.replaceState(null, '', '/');
    }
  }, [currentView, isAdminAuthenticated]);

  // Persist current view to localStorage
  useEffect(() => {
    localStorage.setItem('zuaera-view', currentView);
  }, [currentView]);

  // Persist selected product to localStorage
  useEffect(() => {
    if (selectedProduct) {
      localStorage.setItem('zuaera-selected-product', JSON.stringify(selectedProduct));
    } else {
      localStorage.removeItem('zuaera-selected-product');
    }
  }, [selectedProduct]);

  // Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem('zuaera-orders', JSON.stringify(orders));
  }, [orders]);

  // Listen for bundle add event
  useEffect(() => {
    if (isDesktop) return; // Skip on desktop
    const handler = () => {
      const crisp = products.find(p => p.id === "01");
      const vibe = products.find(p => p.id === "04");
      if (crisp && vibe) {
        // Add both only if not already in cart
        setCartItems(prev => {
          let updated = [...prev];
          const crispKey = `${crisp.id}-30ML`;
          const vibeKey = `${vibe.id}-30ML`;
          if (!updated.find(i => i.cartItemId === crispKey)) {
            updated.push({ ...crisp, volume: "30ML", price: crisp.price, quantity: 1, cartItemId: crispKey });
          }
          if (!updated.find(i => i.cartItemId === vibeKey)) {
            updated.push({ ...vibe, volume: "30ML", price: vibe.price, quantity: 1, cartItemId: vibeKey });
          }
          return updated;
        });
      }
    };
    window.addEventListener('add-bundle-to-cart', handler);
    return () => window.removeEventListener('add-bundle-to-cart', handler);
  }, [isDesktop, products]);

  // Scroll to top instantly when view changes to prevent "extra scroll" issues
  useEffect(() => {
    if (isDesktop) return; // Skip on desktop
    window.scrollTo(0, 0);
  }, [currentView, isDesktop]);

  // If the SPA somehow loaded on a static file path, render nothing.
  // The server should serve these files directly; this is a safety fallback.
  const staticFilePaths = ['/robots.txt', '/sitemap.xml'];
  if (staticFilePaths.includes(window.location.pathname)) {
    return null;
  }

  // Admin bypass - allow desktop users to access the admin panel normally
  const isAdminView = window.location.pathname.startsWith('/admin') || currentView === 'admin-auth' || currentView === 'admin-dashboard';

  // Cart Handlers
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

    // Show toast notification
    setToastProduct(product.name);
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

  const handleCheckoutComplete = (order: OrderDetails) => {
    // Save order
    setOrders(prev => [...prev, order]);
    // Clear checkout items
    setCheckoutItems([]);
    // Clear cart items
    setCartItems([]);

    // Send to WhatsApp with order details
    const itemsList = order.items
      .map(item => `${item.name} (${item.volume}) x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`)
      .join("%0A");

    const deliveryInfo = `%0A%0A📦 Delivery Details:%0A${order.delivery.firstName} ${order.delivery.lastName}%0A${order.delivery.address}${order.delivery.apartment ? '%0A' + order.delivery.apartment : ''}%0A${order.delivery.city}, ${order.delivery.state} ${order.delivery.pinCode}`;

    const msg = `🛍️ New Order #${order.id}%0A%0A${itemsList}%0A%0ASubtotal: ₹${(order.total / 1.08).toLocaleString('en-IN')}%0ATax: ₹${(order.total - order.total / 1.08).toLocaleString('en-IN')}%0A💰 Total: ₹${order.total.toLocaleString('en-IN')}${deliveryInfo}%0A%0n📧 Email: ${order.contact.email}`;

    window.open(`https://wa.me/917092009114?text=${msg}`);

    // Show success and redirect to home
    setCurrentView('home');
    setToastProduct('Order placed successfully!');
  };

  // If on desktop and not in admin, show the immersive futuristic desktop app
  if (isDesktop && !isAdminView) {
    return (
      <DesktopApp
        products={products}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onCheckoutComplete={handleCheckoutComplete}
      />
    );
  }

  // Derive current product from active category or default to last product
  const currentProduct = products.find(p => p.navLabel === activeCategory) || products[products.length - 1] || products[0];

  // Get all category labels for header
  const categories = products.map(p => p.navLabel);

  // Pricing Logic Helper
  const getPricing = (product: Product) => {
    const is50 = product.volume === '50ML';
    // Logic: If default is 50ml, 100ml is ~1.8x. If default is 100ml, 50ml is ~0.6x
    const price50 = is50 ? product.price : Math.ceil((product.price * 0.6) / 100) * 100 - 1;
    const price100 = !is50 ? product.price : Math.ceil((product.price * 1.8) / 100) * 100 - 1;
    return { "50ML": price50, "100ML": price100 };
  };

  const currentPrices = getPricing(currentProduct);

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-background-dark pb-24">
      {/* Cart Toast Notification */}
      <CartToast
        productName={toastProduct || ''}
        isVisible={!!toastProduct}
        onClose={() => setToastProduct(null)}
      />

      {/* Global Header - Hidden on Popular and Product Detail views as they have their own custom header */}
      {currentView !== 'popular' && currentView !== 'product-detail' && (
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
          <Collections
            products={products}
            onProductSelect={(product) => {
              setSelectedProduct(product);
              setCurrentView('product-detail');
            }}
            cartItems={cartItems}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={(quantity) => {
              handleAddToCart(selectedProduct, '30ML', selectedProduct.price);
              setToastProduct(selectedProduct.name);
            }}
            onBuyNow={(quantity) => {
              const checkoutItem: CartItem = {
                ...selectedProduct,
                volume: '30ML',
                price: selectedProduct.price,
                quantity: quantity,
                cartItemId: `${selectedProduct.id}-30ML`
              };
              setCheckoutItems([checkoutItem]);
              setCurrentView('checkout-form');
            }}
            onBack={() => setCurrentView('collections')}
          />
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
            onCheckout={() => {
              if (cartItems.length > 0) {
                setCheckoutItems(cartItems);
                setCurrentView('checkout-form');
              }
            }}
          />
        )}

        {currentView === 'checkout-form' && (
          <CheckoutForm
            items={checkoutItems}
            onCheckoutComplete={handleCheckoutComplete}
            onBack={() => setCurrentView('cart')}
          />
        )}

        {currentView === 'admin-auth' && !isAdminAuthenticated && (
          <AdminAuth
            onAuthenticate={() => {
              setIsAdminAuthenticated(true);
              setCurrentView('admin-dashboard');
              window.history.pushState(null, '', '/admin');
            }}
            onBack={() => {
              setCurrentView('home');
              window.history.replaceState(null, '', '/');
            }}
          />
        )}

        {currentView === 'admin-dashboard' && isAdminAuthenticated && (
          <AdminDashboard
            orders={orders}
            onLogout={() => {
              setIsAdminAuthenticated(false);
              setCurrentView('home');
              window.history.replaceState(null, '', '/');
            }}
            onProductsChange={(updated) => setProducts(updated)}
          />
        )}



        {currentView === 'scent-dna' && currentProduct && (
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

      {/* Global Bottom Navigation - Hidden on scent-dna, product-detail, checkout-form, admin-auth, and admin-dashboard views */}
      {currentView !== 'scent-dna' && currentView !== 'product-detail' && currentView !== 'checkout-form' && currentView !== 'admin-auth' && currentView !== 'admin-dashboard' && (
        <BottomNav activeTab={currentView} onTabChange={setCurrentView} />
      )}
    </div>
  );
};

export default App;