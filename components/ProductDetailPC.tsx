import React, { useState } from 'react';
import { Product } from '../App';

interface ProductDetailPCProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onClose: () => void;
}

export const ProductDetailPC: React.FC<ProductDetailPCProps> = ({
    product,
    onAddToCart,
    onClose,
}) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState('Standard');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Mock images based on the product
    const images = product.name === 'CRISP'
        ? ['/crispy3.png', '/crispy2.jpeg', '/crispy_bundle.png']
        : product.name === 'EYES'
            ? ['/Eyes%20(female).jpeg', '/eyes_bundle.png', '/eyes_display.png']
            : ['/vibe%20(unisex).jpeg', '/vibe2.jpeg', '/vibe3.jpg'];

    const discount = 36;
    const mrp = Math.round(product.price / (1 - discount / 100));

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            onAddToCart(product);
        }
        setToastMessage(`Added ${product.name} to cart`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0905] text-white flex flex-col font-display selection:bg-gold selection:text-black">
            {/* Header / Back Navigation */}
            <header className="w-full px-12 py-8 flex justify-between items-center z-50 border-b border-gold/10 bg-[#0a0905]">
                <button
                    onClick={onClose}
                    className="flex items-center gap-3 text-gold/60 hover:text-gold transition-all group"
                >
                    <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Back to Collection</span>
                </button>

                <div className="flex justify-center">
                    <span
                        onClick={onClose}
                        className="font-syncopate text-2xl font-bold tracking-[0.3em] text-gold cursor-pointer drop-shadow-[0_0_12px_rgba(242,208,13,0.3)] hover:drop-shadow-[0_0_20px_rgba(242,208,13,0.5)] transition-all"
                    >
                        ZUAERA
                    </span>
                </div>

                <div className="flex gap-10 text-[11px] tracking-[0.15em] uppercase font-semibold text-gold/60 w-1/3 justify-end items-center">
                    <button onClick={onClose} className="hover:text-gold transition-colors">About</button>
                    <button onClick={onClose} className="hover:text-gold transition-colors">Cart</button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">

                {/* Left Side - Image Section */}
                <div className="w-full md:w-1/2 bg-[#0c0b07] p-8 md:p-20 flex flex-col items-center justify-center relative border-r border-gold/5">
                    {/* Tags */}
                    <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                        <span className="bg-gold text-black px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-lg">BESTSELLER</span>
                    </div>

                    {/* Main Image Container */}
                    <div className="relative w-full h-[400px] flex items-center justify-center group/img">
                        <img
                            src={images[currentImageIndex]}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain drop-shadow-[0_20px_60px_rgba(242,208,13,0.2)] transition-all duration-700 group-hover/img:scale-110"
                        />

                        {/* Discount Tag */}
                        <div className="absolute bottom-0 left-0">
                            <span className="bg-[#ccad00] text-black px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-lg">-{discount}% OFF</span>
                        </div>
                    </div>

                    {/* Thumbnails Slider Area */}
                    <div className="mt-12 w-full max-w-sm relative px-8">
                        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImageIndex(idx)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden bg-black/40 backdrop-blur-md transition-all snap-center ${currentImageIndex === idx ? 'border-gold shadow-[0_0_15px_rgba(242,208,13,0.3)] scale-105' : 'border-gold/10 opacity-60 hover:opacity-100 hover:border-gold/30'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>

                        {/* Custom Slider Arrows */}
                        <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold/30 hover:text-gold transition-colors">
                            <span className="material-symbols-outlined text-2xl">chevron_left</span>
                        </button>
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-gold/30 hover:text-gold transition-colors">
                            <span className="material-symbols-outlined text-2xl">chevron_right</span>
                        </button>
                    </div>
                </div>

                {/* Right Side - Info Section */}
                <div className="w-full md:w-1/2 bg-[#0a0905] p-8 md:p-20 overflow-y-auto">
                    <div className="max-w-xl mx-auto space-y-10">
                        {/* Title & Reviews */}
                        <div>
                            <h1 className="text-3xl font-light tracking-wider text-gold mb-4 leading-tight uppercase font-display">
                                {product.name} Luxury Perfume - {product.volume}
                            </h1>
                            <div className="flex items-center gap-4 text-xs text-white/50">
                                <div className="flex items-center gap-1">
                                    <span className="text-gold material-symbols-outlined text-[18px] fill-current">star</span>
                                    <span className="font-bold text-gold opacity-90">4.7</span>
                                    <span className="mx-1 opacity-20">|</span>
                                    <span className="material-symbols-outlined text-gold/60 text-[18px] fill-current">verified</span>
                                    <span className="ml-1 tracking-widest uppercase">(1269 Reviews)</span>
                                </div>
                                <button className="ml-auto text-gold/40 hover:text-gold transition-colors">
                                    <span className="material-symbols-outlined">share</span>
                                </button>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="space-y-3">
                            <p className="text-[11px] font-bold text-gold/40 uppercase tracking-[0.3em]">TYPE — {selectedOption}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSelectedOption('Standard')}
                                    className={`px-6 py-2.5 rounded-sm border text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${selectedOption === 'Standard' ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(242,208,13,0.3)]' : 'bg-transparent text-gold/60 border-gold/20 hover:border-gold/40'}`}
                                >
                                    Standard Box
                                </button>
                                <button
                                    onClick={() => setSelectedOption('Gift Set')}
                                    className={`px-6 py-2.5 rounded-sm border text-[10px] font-bold tracking-[0.2em] uppercase transition-all ${selectedOption === 'Gift Set' ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(242,208,13,0.3)]' : 'bg-transparent text-gold/60 border-gold/20 hover:border-gold/40'}`}
                                >
                                    Occasions Gift Box
                                </button>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="space-y-1 py-4 border-y border-gold/10">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-gold drop-shadow-[0_0_10px_rgba(242,208,13,0.3)]">₹{product.price.toLocaleString('en-IN')}.00</span>
                                <span className="text-sm text-white/30 line-through mb-1">₹{mrp.toLocaleString('en-IN')}.00</span>
                            </div>
                            <p className="text-[10px] text-gold/40 tracking-widest uppercase mt-1">Inclusive of all taxes & free shipping</p>
                        </div>

                        {/* CTA Row */}
                        <div className="flex gap-4 pt-4">
                            {/* Quantity */}
                            <div className="flex items-center border border-gold/20 rounded-sm bg-black/40">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center text-gold/60 hover:text-gold transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="w-10 text-center font-bold text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center text-gold/60 hover:text-gold transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-gold text-black font-bold tracking-[0.25em] uppercase text-xs hover:bg-[#fff04d] transition-all transform active:scale-95 rounded-sm shadow-[0_0_20px_rgba(242,208,13,0.2)]"
                            >
                                ACQUIRE NOW
                            </button>
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-4 gap-3 py-6">
                            {[
                                { icon: 'schedule', label1: 'LONG', label2: 'LASTING' },
                                { icon: 'verified', label1: 'IFRA -', label2: 'CERTIFIED' },
                                { icon: 'water_drop', label1: 'IMPORTED', label2: 'OILS' },
                                { icon: 'public', label1: 'MADE IN', label2: 'INDIA' },
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-3 bg-white/5 border border-gold/10 rounded-lg hover:border-gold/30 hover:bg-white/[0.08] transition-all group/feature cursor-default">
                                    <div className="w-12 h-12 mb-3 border border-gold/20 rounded-full flex items-center justify-center group-hover/feature:bg-gold transition-all duration-500">
                                        <span className="material-symbols-outlined text-xl text-gold group-hover/feature:text-black transition-colors">{feature.icon}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-white/60 tracking-[0.15em] text-center leading-tight uppercase group-hover:text-gold transition-colors">
                                        {feature.label1}<br />{feature.label2}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="pt-6 border-t border-gold/10">
                            <p className="text-[15px] text-white/50 leading-[2] text-justify font-light tracking-wide italic">
                                "{product.tagline}"
                            </p>
                            <p className="text-[14px] text-white/70 leading-[1.8] text-justify font-light tracking-wide mt-4">
                                {product.description} Experience the essence of luxury with ZUAERA's masterfully crafted fragrance.
                                Each note is carefully selected to create a sensory journey that lingers and evolves beautifully on the skin.
                                Formulated to last through the day, reflecting the molecular architecture of pure elegance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            <div
                className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-white text-black rounded-sm flex items-center gap-3 tracking-widest text-xs font-bold font-mono transition-all duration-500 shadow-2xl ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}
            >
                <span className="material-symbols-outlined text-gold">check_circle</span>
                {toastMessage}
            </div>

            {/* Footer */}
            <footer className="w-full py-12 border-t border-gold/5 bg-[#0a0905] text-center text-[10px] tracking-[0.2em] text-white/20 uppercase font-semibold">
                © 2026 ZUAERA LUXURY EXPLORATION
            </footer>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};
