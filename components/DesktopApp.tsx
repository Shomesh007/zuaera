import React, { useState, useEffect } from 'react';
import { Product, CartItem } from '../App';
import { CheckoutForm, OrderDetails } from './CheckoutForm';
import { About } from './About';

interface DesktopAppProps {
    products: Product[];
    cartItems: CartItem[];
    onAddToCart: (product: Product, volume: string, price: number) => void;
    onUpdateQuantity: (cartItemId: string, delta: number) => void;
    onRemoveFromCart: (cartItemId: string) => void;
    onCheckoutComplete: (order: OrderDetails) => void;
}

type ModalView = 'none' | 'about' | 'cart' | 'checkout';

export const DesktopApp: React.FC<DesktopAppProps> = ({
    products,
    cartItems,
    onAddToCart,
    onUpdateQuantity,
    onRemoveFromCart,
    onCheckoutComplete,
}) => {
    const [modalView, setModalView] = useState<ModalView>('none');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const cartTotalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Hardcode to the first product (CRISP)
    const activeProduct = products[0];

    const handleAddToCartClick = (product: Product) => {
        onAddToCart(product, '30ML', product.price);
        setToastMessage(`Added ${product.name} to cart`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const getMainImage = (imgOrJson: string) => {
        try {
            const arr = JSON.parse(imgOrJson);
            if (Array.isArray(arr) && arr.length > 0) return arr[0];
        } catch { }
        return imgOrJson;
    };

    if (!activeProduct) return null;

    return (
        <div className="relative min-h-screen bg-[#0a0905] text-white overflow-y-auto overflow-x-hidden font-display flex flex-col selection:bg-[#f2d00d] selection:text-black scroll-smooth">


            {/* Background radial spotlight using the active product's glow color */}
            <div
                className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-60 mix-blend-screen"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeProduct.glowColor || '#f2d00d'}50 0%, transparent 60%)`
                }}
            />
            {/* Texture overlay (optional, slightly darkens edges) */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>

            {/* Main UI Container */}
            <div className={`flex flex-col h-full z-10 transition-all duration-700 ${modalView !== 'none' ? 'opacity-30 scale-95 blur-sm pointer-events-none' : 'opacity-100'}`}>

                {/* Header */}
                <header className="w-full px-12 py-6 flex justify-between items-center z-20 shrink-0 border-b border-[#f2d00d]/15 bg-transparent">
                    <div className="flex gap-10 text-[13px] tracking-[0.15em] uppercase font-semibold text-[#f2d00d]/60 w-1/3">
                        <button className="hover:text-[#f2d00d] transition-colors">Shop</button>
                        <button className="hover:text-[#f2d00d] transition-colors">Category</button>
                        <button className="hover:text-[#f2d00d] transition-colors">New Release</button>
                    </div>

                    <div className="w-1/3 flex justify-center">
                        <span className="font-syncopate text-2xl font-bold tracking-[0.3em] text-[#f2d00d] cursor-pointer drop-shadow-[0_0_12px_rgba(242,208,13,0.3)] hover:drop-shadow-[0_0_20px_rgba(242,208,13,0.5)] transition-all">
                            ZUAERA
                        </span>
                    </div>

                    <div className="flex gap-10 text-[13px] tracking-[0.15em] uppercase font-semibold text-[#f2d00d]/60 w-1/3 justify-end items-center">
                        <button onClick={() => setModalView('about')} className="hover:text-[#f2d00d] transition-colors">About</button>
                        <button className="hover:text-[#f2d00d] transition-colors">Best Seller</button>
                        <button onClick={() => setModalView('cart')} className="hover:text-[#f2d00d] transition-colors flex items-center gap-2">
                            Cart <span className={`flex items-center justify-center min-w-[22px] h-[22px] rounded-full text-[10px] font-bold ${cartTotalItems > 0 ? 'bg-[#f2d00d] text-black' : 'bg-[#f2d00d]/15 text-[#f2d00d]'}`}>{cartTotalItems}</span>
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="h-screen shrink-0 flex px-12 relative items-center justify-between snap-start">


                    {/* Left Text */}
                    <div className="w-1/3 flex flex-col justify-center h-full z-20 pb-16">
                        <h1 className="text-5xl lg:text-6xl xl:text-[80px] font-bold leading-[1.05] tracking-tight mb-auto mt-20 text-white drop-shadow-md">
                            Evoke Every<br />Emotion with<br />Zuaera
                        </h1>

                        <div className="flex gap-3 mt-auto mb-10">
                            {[
                                { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg', label: 'Facebook' },
                                { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg', label: 'Twitter' },
                                { icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg', label: 'Instagram' },
                            ].map(social => (
                                <button key={social.label} title={social.label} className="w-10 h-10 flex items-center justify-center border border-[#f2d00d]/30 rounded-lg text-[#f2d00d]/60 hover:bg-[#f2d00d] hover:border-[#f2d00d] transition-all group">
                                    <img src={social.icon} alt={social.label} className="w-4 h-4 invert opacity-60 group-hover:opacity-100 group-hover:invert-0 transition-all" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Center Imagery */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 overflow-visible mt-10">
                        <div className="relative w-[800px] h-[800px] flex items-center justify-center">
                            <img
                                src="/crispy3.png"
                                alt="Zuaera Luxury Perfume"
                                className="h-[700px] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.9)] z-20 animate-float-slow transition-transform duration-1000"
                            />
                        </div>
                    </div>

                    {/* Right Info */}
                    <div className="w-[38%] flex flex-col justify-center items-end h-full z-20 pb-16 text-right">
                        <div className="mt-16 flex flex-col items-start text-left ml-auto mr-8 w-[400px]">
                            <h2 className="text-[36px] font-bold text-[#f2d00d] mb-1 tracking-wide drop-shadow-[0_0_10px_rgba(242,208,13,0.2)]">
                                ₹{activeProduct.price.toLocaleString('en-IN')}
                            </h2>
                            <div className="flex justify-between items-center w-full mb-8 border-b border-[#f2d00d]/20 pb-4">
                                <div className="flex flex-col">
                                    <p className="text-xl text-white/90 tracking-[0.15em] font-semibold uppercase">{activeProduct.name}</p>
                                    {activeProduct.targetAudience && (
                                        <p className="text-[11px] text-[#f2d00d]/60 uppercase tracking-[0.2em] font-medium mt-1">({activeProduct.targetAudience})</p>
                                    )}
                                </div>
                            </div>

                            <p className="text-[15px] text-white/75 leading-[1.8] mb-10 font-light">
                                {activeProduct.description}
                            </p>

                            <div className="flex items-center gap-6 w-full">
                                <button
                                    onClick={() => handleAddToCartClick(activeProduct)}
                                    className="bg-[#f2d00d] text-black px-10 py-3.5 font-bold text-[13px] tracking-widest hover:bg-[#e6c600] hover:shadow-[0_0_25px_rgba(242,208,13,0.4)] transition-all"
                                >
                                    Shop Now
                                </button>
                                <button className="flex items-center gap-2 text-[13px] tracking-wide text-[#f2d00d]/60 hover:text-[#f2d00d] transition-colors group">
                                    Best of Zuaera
                                    <span className="material-symbols-outlined text-[16px] text-[#f2d00d]/40 group-hover:text-[#f2d00d] transition-colors">play_arrow</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                <section id="products" className="min-h-screen shrink-0 relative z-20 bg-[#0a0905] py-32 flex flex-col items-center justify-center snap-start">
                    <div className="relative text-center w-full flex justify-center items-center mb-40">
                        <span className="absolute text-[140px] md:text-[220px] font-bold tracking-[0.1em] uppercase opacity-[0.03] pointer-events-none select-none z-0 text-white translate-y-[-10%]">
                            Essence
                        </span>
                        <h2 className="text-white text-5xl md:text-7xl font-bold relative z-10 tracking-[0.05em] drop-shadow-2xl">
                            Find your <span className="text-[#f2d00d]">Signature</span>
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-12 xl:gap-16 justify-center items-center w-full max-w-[1500px] mx-auto px-8 relative z-10">
                        {products.map((product) => (
                            <div key={product.id} className="w-[360px] h-[640px] bg-gradient-to-b from-[#181711] to-[#12110a] rounded-[180px] flex flex-col items-center p-12 hover:-translate-y-6 transition-all duration-700 hover:shadow-[0_45px_90px_rgba(0,0,0,0.7),0_0_30px_rgba(242,208,13,0.05)] border border-white/5 hover:border-[#f2d00d]/20 group relative overflow-hidden backdrop-blur-sm">
                                {/* Dynamic Background Glow on Hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none blur-[60px]"
                                    style={{
                                        background: `radial-gradient(circle at 50% 40%, ${product.glowColor || 'rgba(242,208,13,0.3)'} 0%, transparent 70%)`
                                    }}
                                />

                                <div className="h-[420px] w-full flex items-center justify-center mb-6 relative overflow-hidden rounded-t-[160px]">
                                    {/* Transparent container, no frame */}
                                    <img
                                        src={product.name === 'CRISP' ? '/crispy_display.png' : product.name === 'EYES' ? '/eyes_display.png' : '/vibe_display.png'}
                                        alt={`${product.name} Display`}
                                        className={`w-full h-full object-cover object-top drop-shadow-[0_40px_40px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:scale-115 relative z-10 ${product.name === 'CRISP' ? '-translate-y-10 scale-110' :
                                                product.name === 'VIBE' ? '-translate-y-6 scale-110' :
                                                    'translate-y-4'
                                            }`}
                                    />
                                </div>

                                <div className="flex flex-col items-center mb-6 relative z-20">
                                    <h3 className="text-3xl font-bold text-white tracking-widest uppercase transition-colors duration-500 group-hover:text-[#f2d00d]">
                                        {product.name}
                                    </h3>
                                    {product.targetAudience && (
                                        <span className="text-[12px] uppercase tracking-[0.3em] text-[#f2d00d]/60 mt-2 font-bold group-hover:text-[#f2d00d] transition-colors duration-500">
                                            {product.targetAudience}
                                        </span>
                                    )}
                                </div>

                                <p className="text-[14px] text-white/40 text-center leading-[1.8] h-[75px] overflow-hidden line-clamp-3 px-4 relative z-20 font-light group-hover:text-white/70 transition-colors duration-500">
                                    {product.description}
                                </p>

                                <button
                                    onClick={() => handleAddToCartClick(product)}
                                    className="mt-auto mb-4 bg-transparent border border-[#f2d00d]/30 rounded-full px-12 py-4 text-[12px] uppercase tracking-[0.2em] text-[#f2d00d] hover:bg-[#f2d00d] hover:text-black hover:border-[#f2d00d] transition-all duration-500 font-bold relative z-20 hover:shadow-[0_0_20px_rgba(242,208,13,0.3)]"
                                >
                                    Explore More
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ZUAERA IS Section */}
                <section id="zuaera-is" className="min-h-screen shrink-0 py-32 px-12 relative z-20 border-t border-[#f2d00d]/10 bg-[#0a0905] flex items-center justify-center snap-start">
                    {/* Background accent */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f2d00d]/5 rounded-full blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center w-full">
                        <h2 className="text-[#f2d00d] text-4xl font-bold tracking-[0.25em] uppercase mb-24 drop-shadow-[0_0_15px_rgba(242,208,13,0.3)]">ZUAERA IS</h2>

                        <div className="relative w-full flex justify-between items-stretch mb-16">
                            {/* Left Column */}
                            <div className="w-[30%] flex flex-col justify-around gap-20 relative z-20 text-left">
                                {/* Feature 1 */}
                                <div className="relative">
                                    <span className="absolute -top-16 -left-10 text-[140px] font-bold text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none">1</span>
                                    <h3 className="text-[#f2d00d] text-2xl font-bold mb-4 tracking-wide">Premium Artistry</h3>
                                    <p className="text-white/70 text-[15px] leading-relaxed">
                                        We source rare natural extractions and conscious synthetics globally to ensure your fragrance is vibrant, luxurious, and completely unique to you.
                                    </p>
                                </div>
                                {/* Feature 2 */}
                                <div className="relative">
                                    <span className="absolute -top-16 -left-10 text-[140px] font-bold text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none">2</span>
                                    <h3 className="text-[#f2d00d] text-2xl font-bold mb-4 tracking-wide">Long-Lasting Aura</h3>
                                    <p className="text-white/70 text-[15px] leading-relaxed">
                                        Formulated explicitly for Indian weather conditions. Each scent maintains its strength through heat and humidity for up to 12 hours.
                                    </p>
                                </div>
                            </div>

                            {/* Center Image */}
                            <div className="w-[40%] flex justify-center relative z-10 group items-center">
                                <img
                                    src="/zuaera-gold-bottle.png"
                                    alt="ZUAERA Luxury Perfume"
                                    className="h-[600px] object-cover drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:scale-[1.03] transition-transform duration-700 relative z-20 mix-blend-lighten [mask-image:radial-gradient(circle_at_center,black_40%,transparent_65%)] [-webkit-mask-image:radial-gradient(circle_at_center,black_40%,transparent_65%)]"
                                />
                            </div>

                            {/* Right Column */}
                            <div className="w-[30%] flex flex-col justify-around gap-20 relative z-20 text-left">
                                {/* Feature 3 */}
                                <div className="relative">
                                    <span className="absolute -top-16 -left-10 text-[140px] font-bold text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none">3</span>
                                    <h3 className="text-[#f2d00d] text-2xl font-bold mb-4 tracking-wide">Accessible Elegance</h3>
                                    <p className="text-white/70 text-[15px] leading-relaxed">
                                        We bypass traditional retail markups to bring you pure, elite fragrances starting at exactly ₹999. True luxury should never be a privilege.
                                    </p>
                                </div>
                                {/* Feature 4 */}
                                <div className="relative">
                                    <span className="absolute -top-16 -left-10 text-[140px] font-bold text-white/[0.04] select-none pointer-events-none tracking-tighter leading-none">4</span>
                                    <h3 className="text-[#f2d00d] text-2xl font-bold mb-4 tracking-wide">Molecular Stability</h3>
                                    <p className="text-white/70 text-[15px] leading-relaxed">
                                        Our laboratory analyzes every batch for chemical stability and diffusion rate, ensuring your signature scent evolves gracefully on the skin.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => handleAddToCartClick(activeProduct)}
                            className="mt-8 px-16 py-4 bg-gradient-to-r from-[#ccad00] md:via-[#f2d00d] to-[#ccad00] text-black font-bold uppercase tracking-[0.25em] text-sm hover:shadow-[0_0_30px_rgba(242,208,13,0.5)] transition-all z-20"
                        >
                            Order Now
                        </button>
                    </div>
                </section>

                {/* Couple's Bundle Section */}
                <section id="couples-bundle" className="min-h-[80vh] shrink-0 py-32 px-12 relative z-20 border-t border-[#f2d00d]/10 bg-[#0a0905] overflow-hidden flex items-center justify-center snap-start">
                    <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

                        {/* Left Side: Overlapping Images */}
                        <div className="w-1/2 relative h-[600px] flex items-center">
                            {/* Blue/Gold square accent border (from reference, adapted to gold) */}
                            <div className="absolute left-[15%] top-[10%] w-[350px] h-[350px] border-2 border-[#f2d00d]/40 z-0"></div>

                            {/* Top Left Image (Men's focus) */}
                            <div className="absolute left-[-10%] top-0 w-[340px] h-[340px] bg-[#0c0b07] border border-[#f2d00d]/20 z-10 shadow-2xl p-4 overflow-hidden group">
                                <img
                                    src="/crispy_bundle.png"
                                    alt="Zuaera Crispy Bundle"
                                    className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Subtle overlay for depth */}
                                <div className="absolute inset-0 bg-black/20 pointer-events-none mix-blend-multiply"></div>
                            </div>

                            {/* Bottom Right Image (Women's focus) */}
                            <div className="absolute left-[22%] top-[38%] w-[400px] h-[400px] bg-[#0c0b07] border border-[#f2d00d]/30 z-20 shadow-[0_30px_60px_rgba(0,0,0,0.9)] p-4 overflow-hidden group">
                                <img
                                    src="/eyes_bundle.png"
                                    alt="Zuaera Eyes Bundle"
                                    className="w-full h-full object-cover rounded-sm group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Wet/Rain effect overlay mimic */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </div>

                        {/* Right Side: Text Description */}
                        <div className="w-[45%] pl-12 flex flex-col items-start z-30">
                            <div className="w-12 h-0.5 bg-[#f2d00d] mb-8"></div>
                            <h2 className="font-serif text-5xl md:text-6xl text-white mb-8 italic tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                                The Perfect Pair
                            </h2>
                            <p className="text-white/60 text-sm leading-[1.8] font-light mb-12 text-justify">
                                Discover the ultimate harmony with the Zuaera Couple's Bundle. Combining the bold, crisp energy designed for him with the warm, sensual aura crafted for her. Save when you purchase our signature CRISP and EYES collections together. A testament to luxury, perfect for gifting or sharing a sensory journey.
                            </p>

                            <button
                                onClick={() => {
                                    handleAddToCartClick(products[0]); // CRISP
                                    handleAddToCartClick(products[1]); // EYES (assuming it's second)
                                }}
                                className="px-10 py-3 bg-[#f2d00d] text-black text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white transition-colors duration-300"
                            >
                                Bundle & Save
                            </button>

                            <div className="mt-16 self-end mr-8 opacity-70">
                                <p className="text-[#f2d00d] text-4xl transform -rotate-6" style={{ fontFamily: '"Great Vibes", cursive' }}>Zuaera</p>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="shrink-0 py-10 border-t border-white/5 bg-[#0a0905] text-center z-20 relative snap-start">
                    <p className="text-[11px] tracking-[0.2em] text-white/30 uppercase font-semibold">
                        © 2026 ZUAERA LUXURY EXPLORATION
                    </p>
                </footer>

            </div>


            {/* ─── MODALS & OVERLAYS ─── */}

            {/* Cart Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[450px] bg-[#0a0905]/95 backdrop-blur-3xl border-l border-white/10 z-[100] transform transition-transform duration-500 ease-out flex flex-col shadow-2xl ${modalView === 'cart' ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-8 border-b border-white/10 flex justify-between items-center">
                    <h2 className="font-syncopate text-xl tracking-[0.2em] text-white">CART</h2>
                    <button onClick={() => setModalView('none')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-white/70">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                            <span className="material-symbols-outlined text-6xl opacity-20">shopping_bag</span>
                            <p className="tracking-widest uppercase text-xs">Your cart is empty</p>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.cartItemId} className="flex gap-5 bg-white/5 p-4 rounded-xl border border-white/5 relative group">
                                <button
                                    onClick={() => onRemoveFromCart(item.cartItemId)}
                                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-black border border-white/10 text-white/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:text-[#f2d00d] hover:border-[#f2d00d]"
                                >
                                    <span className="material-symbols-outlined text-[14px]">close</span>
                                </button>
                                <div className="w-20 h-24 rounded-lg bg-black/50 border border-white/5 overflow-hidden shrink-0 flex items-center justify-center py-2">
                                    <img src={getMainImage(item.image)} alt={item.name} className="h-full object-contain" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-bold text-sm tracking-widest text-white mb-1">{item.name}</h3>
                                        <p className="text-[10px] text-[#f2d00d] uppercase tracking-widest">{item.volume}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <p className="text-white font-semibold text-sm">₹{item.price.toLocaleString()}</p>
                                        <div className="flex items-center gap-3 bg-black/80 rounded-full px-3 py-1 border border-white/10">
                                            <button onClick={() => onUpdateQuantity(item.cartItemId, -1)} className="text-white/50 hover:text-white pb-0.5 text-lg leading-none">−</button>
                                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.cartItemId, 1)} className="text-white/50 hover:text-white pb-0.5 text-lg leading-none">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="p-8 border-t border-white/10 bg-black/60">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-white/50 tracking-widest uppercase text-[11px] font-semibold">Subtotal</span>
                            <span className="text-xl font-bold text-white tracking-wide">₹{cartTotalPrice.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={() => setModalView('checkout')}
                            className="w-full bg-white text-black py-4 font-bold tracking-[0.2em] uppercase text-xs hover:bg-[#f2d00d] transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>

            {/* About Panel (Fullscreen overlay) */}
            <div
                className={`fixed inset-0 z-[90] bg-[#0c0b07] transition-all duration-700 ease-in-out ${modalView === 'about' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <div className="absolute top-8 right-8 z-50">
                    <button onClick={() => setModalView('none')} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/50 backdrop-blur-md">
                        <span className="material-symbols-outlined text-white">close</span>
                    </button>
                </div>
                <div className="h-full overflow-y-auto">
                    <About />
                </div>
            </div>

            {/* Checkout Modal */}
            {
                modalView === 'checkout' && (
                    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8 overflow-y-auto">
                        <div className="w-full max-w-5xl bg-[#0a0905] rounded-xl border border-white/20 shadow-2xl overflow-hidden relative min-h-[600px] flex">
                            <div className="w-full h-full relative z-10">
                                <CheckoutForm
                                    items={cartItems}
                                    onCheckoutComplete={(order) => {
                                        onCheckoutComplete(order);
                                        setModalView('none');
                                        setToastMessage('Order secured successfully.');
                                        setTimeout(() => setToastMessage(null), 5000);
                                    }}
                                    onBack={() => setModalView('cart')}
                                />
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Toast Notification */}
            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-white text-black rounded-sm flex items-center gap-3 tracking-widest text-xs font-bold font-mono transition-all duration-500 shadow-2xl ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                <span className="material-symbols-outlined text-[#f2d00d]">check_circle</span>
                {toastMessage}
            </div>

        </div >
    );
};
