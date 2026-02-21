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
  targetAudience?: string;
}

export interface CartItem extends Product {
  quantity: number;
  cartItemId: string; // Composite key: id + volume
}



type View = 'home' | 'collections' | 'product-detail' | 'about' | 'popular' | 'cart' | 'scent-dna' | 'checkout' | 'checkout-form' | 'admin-auth' | 'admin-dashboard';

import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>(() => loadProducts());

  // State management
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastProduct, setToastProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  // Sync state from URL for better deep linking experience
  useEffect(() => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);

    if (path === '/collections') {
      const cat = searchParams.get('filter') || 'All';
      setActiveCategory(cat);
    }
    else if (path.startsWith('/product/')) {
      const productName = path.replace('/product/', '').replace(/-/g, ' ');
      const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [location.pathname, products, location.search]);

  // Handle Tab Change with Navigation
  const handleTabChange = (view: View) => {
    if (view === 'home') navigate('/');
    else if (view === 'collections') navigate('/collections?filter=' + activeCategory);
    else if (view === 'popular') navigate('/popular');
    else if (view === 'cart') navigate('/cart');
    else if (view === 'about') navigate('/about');
  };

  const handleCategorySelect = (cat: string) => {
    setActiveCategory(cat);
    navigate(`/collections?filter=${cat}`);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigate(`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, volume: string, price: number) => {
    const newItemKey = `${product.id}-${volume}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.cartItemId === newItemKey);
      if (existing) {
        return prev.map(item =>
          item.cartItemId === newItemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, volume, price, quantity: 1, cartItemId: newItemKey }];
    });
    setToastProduct(product.name);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleCheckoutComplete = (order: OrderDetails) => {
    setOrders(prev => [...prev, order]);
    setCheckoutItems([]);
    setCartItems([]);
    const itemsList = order.items
      .map(item => `${item.name} (${item.volume}) x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`)
      .join("%0A");
    const deliveryInfo = `%0A%0A📦 Delivery Details:%0A${order.delivery.firstName} ${order.delivery.lastName}%0A${order.delivery.address}${order.delivery.apartment ? '%0A' + order.delivery.apartment : ''}%0A${order.delivery.city}, ${order.delivery.state} ${order.delivery.pinCode}`;
    const msg = `🛍️ New Order #${order.id}%0A%0A${itemsList}%0A%0ASubtotal: ₹${(order.total / 1.08).toLocaleString('en-IN')}%0ATax: ₹${(order.total - order.total / 1.08).toLocaleString('en-IN')}%0A💰 Total: ₹${order.total.toLocaleString('en-IN')}${deliveryInfo}%0A%0n📧 Email: ${order.contact.email}`;
    window.open(`https://wa.me/917092009114?text=${msg}`);
    navigate('/');
    setToastProduct('Order placed successfully!');
  };

  const categories = ['All', ...new Set(products.map(p => p.navLabel))];

  // Immersive PC detection
  if (isDesktop && !location.pathname.startsWith('/admin')) {
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

  const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const currentView = location.pathname === '/' ? 'home' : location.pathname.split('/')[1] as View;

  const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-background-dark pb-24 selection:bg-primary selection:text-black">
      <CartToast
        productName={toastProduct || ''}
        isVisible={!!toastProduct}
        onClose={() => setToastProduct(null)}
      />

      {/* Persistent Header */}
      {!['product', 'checkout', 'admin'].some(p => location.pathname.startsWith('/' + p)) && location.pathname !== '/popular' && (
        <Header
          title="ZUAERA"
          showCategories={location.pathname === '/collections'}
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
          onCartClick={() => navigate('/cart')}
          onTitleClick={() => navigate('/')}
          cartCount={cartTotalItems}
        />
      )}

      <main className="flex-1 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location}>
            <Route path="/" element={
              <PageTransition>
                <ImagePreloader />
                <Hero onExploreCollections={() => navigate('/collections')} />
                <About />
              </PageTransition>
            } />

            <Route path="/collections" element={
              <PageTransition>
                <Collections
                  products={products}
                  activeCategory={activeCategory}
                  onProductSelect={handleProductSelect}
                  cartItems={cartItems}
                />
              </PageTransition>
            } />

            <Route path="/product/:id" element={
              <PageTransition>
                {selectedProduct ? (
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
                      navigate('/checkout');
                    }}
                    onBack={() => navigate('/collections')}
                  />
                ) : <div className="pt-32 text-center text-white font-display tracking-widest">FINDING FRAGRANCE...</div>}
              </PageTransition>
            } />

            <Route path="/popular" element={
              <PageTransition>
                <Popular
                  onCartClick={() => navigate('/cart')}
                  onTitleClick={() => navigate('/')}
                  cartCount={cartTotalItems}
                />
              </PageTransition>
            } />

            <Route path="/cart" element={
              <PageTransition>
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                  onBrowseCollection={() => navigate('/collections')}
                  onCheckout={() => {
                    if (cartItems.length > 0) {
                      setCheckoutItems(cartItems);
                      navigate('/checkout');
                    }
                  }}
                />
              </PageTransition>
            } />

            <Route path="/checkout" element={
              <PageTransition>
                <CheckoutForm
                  items={checkoutItems}
                  onCheckoutComplete={handleCheckoutComplete}
                  onBack={() => navigate('/cart')}
                />
              </PageTransition>
            } />

            <Route path="/about" element={
              <PageTransition>
                <div className="pt-20">
                  <About />
                </div>
              </PageTransition>
            } />

            <Route path="/admin" element={
              <PageTransition>
                {isAdminAuthenticated ? (
                  <AdminDashboard
                    orders={orders}
                    onLogout={() => { setIsAdminAuthenticated(false); navigate('/'); }}
                    onProductsChange={(updated) => setProducts(updated)}
                  />
                ) : (
                  <AdminAuth
                    onAuthenticate={() => { setIsAdminAuthenticated(true); navigate('/admin'); }}
                    onBack={() => navigate('/')}
                  />
                )}
              </PageTransition>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Scroll-to-top on route change */}
      <ScrollToTop />

      {/* Global Bottom Navigation */}
      {!['product', 'checkout', 'admin'].some(p => location.pathname.startsWith('/' + p)) && (
        <BottomNav activeTab={currentView} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

// Helper component for restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

export default App;