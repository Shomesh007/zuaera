import React, { useState } from 'react';
import { Product } from '../App';

interface BundleDetailPCProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onClose: () => void;
}

export const BundleDetailPC: React.FC<BundleDetailPCProps> = ({
    products,
    onAddToCart,
    onClose,
}) => {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const bundlePrice = 1799;
    const mrp = 1998;
    const discount = Math.round(((mrp - bundlePrice) / mrp) * 100);

    const handleAddBundleToCart = () => {
        // Add all products in bundle to cart
        products.forEach(p => onAddToCart(p));
        setToastMessage("Added Perfect Pair Bundle to cart");
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="w-full min-h-screen bg-[#0a0905] text-white flex flex-col font-display selection:bg-gold selection:text-black">
            {/* Header */}
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

                {/* Left Side - Bundle Showcase */}
                <div className="w-full md:w-1/2 bg-[#0c0b07] p-8 md:p-20 flex flex-col items-center justify-center relative border-r border-gold/5 overflow-hidden">
                    {/* Floating Particles/Elements */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                        <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-gold rounded-full shadow-[0_0_8px_gold] animate-pulse"></div>
                        <div className="absolute bottom-[30%] right-[15%] w-2 h-2 bg-gold/50 rounded-full shadow-[0_0_8px_gold] animate-pulse"></div>
                    </div>

                    {/* Bundle Label */}
                    <div className="absolute top-12 left-12 flex flex-col gap-2 z-10">
                        <span className="bg-gold text-black px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm shadow-lg">LIMITED EDITION DUO</span>
                    </div>

                    {/* Main Bundle Image Container */}
                    <div className="relative w-full h-[500px] flex items-center justify-center gap-8 translate-y-[-20px]">
                        {/* Product 1 */}
                        <div className="relative group/p1">
                            <img
                                src="/crispy3.png"
                                alt="CRISP"
                                className="h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(242,208,13,0.2)] transition-all duration-700 group-hover/p1:scale-105 z-20"
                            />
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover/p1:opacity-100 transition-opacity">
                                <p className="text-[10px] font-bold tracking-widest text-gold uppercase">Focus: HIM</p>
                            </div>
                        </div>

                        {/* Connection Polish */}
                        <div className="h-0.5 w-12 bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 hidden md:block"></div>

                        {/* Product 2 */}
                        <div className="relative group/p2">
                            <img
                                src="/Eyes%20(female).jpeg"
                                alt="EYES"
                                className="h-[400px] object-contain drop-shadow-[0_20px_60px_rgba(242,208,13,0.2)] transition-all duration-700 group-hover/p2:scale-105 z-20"
                            />
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center opacity-0 group-hover/p2:opacity-100 transition-opacity">
                                <p className="text-[10px] font-bold tracking-widest text-gold uppercase">Focus: HER</p>
                            </div>
                        </div>

                        {/* Shared Aura */}
                        <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full z-0"></div>
                    </div>

                    {/* Bundle Tags */}
                    <div className="mt-8 flex gap-4">
                        <div className="px-6 py-2 border border-gold/10 bg-gold/5 flex flex-col items-center gap-1 rounded-sm">
                            <p className="text-[9px] text-gold font-bold tracking-widest uppercase opacity-60">Volume</p>
                            <p className="text-[11px] text-white font-bold tracking-[0.2em]">30ml + 30ml</p>
                        </div>
                        <div className="px-6 py-2 border border-gold/10 bg-gold/5 flex flex-col items-center gap-1 rounded-sm">
                            <p className="text-[9px] text-gold font-bold tracking-widest uppercase opacity-60">Bundle Benefit</p>
                            <p className="text-[11px] text-white font-bold tracking-[0.2em]">SAVE {discount}%</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Bundle Content */}
                <div className="w-full md:w-1/2 bg-[#0a0905] p-8 md:p-20 overflow-y-auto">
                    <div className="max-w-xl mx-auto space-y-12">
                        {/* Intro */}
                        <div>
                            <span className="text-gold text-xs tracking-[0.4em] uppercase mb-4 block animate-in fade-in slide-in-from-bottom duration-700">Chemistry Series</span>
                            <h1 className="text-5xl font-light tracking-wider text-gold mb-6 leading-tight uppercase font-display italic">
                                The Perfect <span className="font-bold">Pair</span>
                            </h1>
                            <div className="flex items-center gap-4 text-xs text-white/50">
                                <div className="flex items-center gap-1">
                                    <span className="text-gold material-symbols-outlined text-[18px] fill-current">star</span>
                                    <span className="font-bold text-gold opacity-90">4.9</span>
                                    <span className="mx-1 opacity-20">|</span>
                                    <span className="material-symbols-outlined text-gold/60 text-[18px] fill-current">auto_fix</span>
                                    <span className="ml-1 tracking-widest uppercase">Pheromone Optimized</span>
                                </div>
                            </div>
                        </div>

                        {/* Bundle Components */}
                        <div className="space-y-6">
                            <p className="text-[11px] font-bold text-gold/40 uppercase tracking-[0.3em]">INCLUDES IN THIS DUO</p>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="group flex items-center gap-6 p-4 bg-white/5 border border-gold/10 rounded-sm hover:border-gold/30 transition-all">
                                    <div className="w-16 h-20 flex-shrink-0 bg-black/40 p-2 rounded-sm flex items-center justify-center">
                                        <img src="/crispy3.png" alt="Crisp" className="max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-gold font-bold tracking-widest text-[13px]">CRISP (MALE)</h3>
                                        <p className="text-white/50 text-[11px] mt-1 leading-relaxed italic">Sharp, Modern & Energetic presence.</p>
                                    </div>
                                </div>
                                <div className="group flex items-center gap-6 p-4 bg-white/5 border border-gold/10 rounded-sm hover:border-gold/30 transition-all">
                                    <div className="w-16 h-20 flex-shrink-0 bg-black/40 p-2 rounded-sm flex items-center justify-center">
                                        <img src="/Eyes%20(female).jpeg" alt="Eyes" className="max-h-full object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-gold font-bold tracking-widest text-[13px]">EYES (FEMALE)</h3>
                                        <p className="text-white/50 text-[11px] mt-1 leading-relaxed italic">Sensual, Delicate & Elegantly feminine.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The Science */}
                        <div className="p-8 border border-gold/10 bg-gradient-to-br from-gold/5 via-transparent to-transparent rounded-sm italic">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="material-symbols-outlined text-gold text-2xl">science</span>
                                <h4 className="text-gold font-bold tracking-[0.2em] text-[11px] uppercase">Pheromone Synergy</h4>
                            </div>
                            <p className="text-[14px] text-white/70 leading-[1.8] font-light">
                                Infused with high-grade <span className="text-gold font-bold">Iso E Super</span> molecules, our Perfect Pair bundle is designed to amplify the natural chemistry between him and her. While CRISP leads with electric projection, EYES grounds the experience with sensual delicacy—creating an invisible thread of attraction that evolves over 12 hours.
                            </p>
                        </div>

                        {/* Pricing */}
                        <div className="space-y-4 py-8 border-y border-gold/10">
                            <div className="flex items-end gap-3 justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gold font-bold tracking-widest uppercase opacity-40 mb-2">Bundle Value</span>
                                    <div className="flex items-end gap-3">
                                        <span className="text-5xl font-bold text-gold drop-shadow-[0_0_15px_rgba(242,208,13,0.3)]">₹{bundlePrice.toLocaleString('en-IN')}.00</span>
                                        <span className="text-lg text-white/20 line-through mb-1">₹{mrp.toLocaleString('en-IN')}.00</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[11px] text-[#ccad00] font-bold tracking-[0.2em]">FREE PREMIUM GIFT BOX</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="pt-2">
                            <button
                                onClick={handleAddBundleToCart}
                                className="w-full h-16 bg-gold text-black font-bold tracking-[0.3em] uppercase text-sm hover:bg-[#fff04d] transition-all transform active:scale-95 rounded-sm shadow-[0_0_30px_rgba(242,208,13,0.2)]"
                            >
                                ACQUIRE BUNDLE
                            </button>
                            <p className="text-center text-[10px] text-gold/40 tracking-widest uppercase mt-6">Express shipping — arrives in 48-72 hours</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast */}
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
        </div>
    );
};
