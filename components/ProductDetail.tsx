import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../App';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (quantity: number) => void;
  onBuyNow: (quantity: number) => void;
  onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onBuyNow,
  onBack,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock 4 images - replace with actual images when provided
  // Assign images based on product name (Crisp, Vibe, Eyes)
  let images: string[] = [];
  if (product.name.toLowerCase().includes('crisp')) {
    images = [
      '/Crispy (Male).jpeg',
      '/crispy2.jpeg',
      '/crispy3.png',
    ];
  } else if (product.name.toLowerCase().includes('vibe')) {
    images = [
      '/vibe (unisex).jpeg',
      '/vibe2.jpeg',
      '/vibe3.jpg',
    ];
  } else if (product.name.toLowerCase().includes('eyes')) {
    images = [
      '/Eyes (female).jpeg',
    ];
  } else {
    images = [product.image];
  }

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    if (!autoScrollEnabled) return;

    autoScrollTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [currentImageIndex, autoScrollEnabled, images.length]);

  // Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setAutoScrollEnabled(false); // Disable auto-scroll on user interaction
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
    if (touchEnd - touchStart > 50) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const handleThumbnailClick = (idx: number) => {
    setCurrentImageIndex(idx);
    setAutoScrollEnabled(false); // Disable auto-scroll when user clicks thumbnail
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <div className="relative w-full bg-background-dark pb-24 md:pb-12">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0905]/95 backdrop-blur-md pt-4 pb-3 border-b border-white/5 shadow-2xl">
        <div className="flex items-center justify-between px-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="size-10 flex items-center justify-center rounded-full border border-gold/20 bg-background-dark/40 backdrop-blur-md text-gold hover:bg-gold/10 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Product Name - Center */}
          <h2 className="text-gold text-lg font-light tracking-widest uppercase drop-shadow-[0_0_8px_rgba(242,208,13,0.4)]">
            {product.name}
          </h2>

          {/* Share/Favorite Button */}
          <button className="size-10 flex items-center justify-center rounded-full border border-gold/20 bg-background-dark/40 backdrop-blur-md text-gold hover:bg-gold/10 transition-colors">
            <span className="material-symbols-outlined text-[20px]">favorite_border</span>
          </button>
        </div>
      </header>

      <div className="w-full">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Image Carousel */}
          <div
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full aspect-square bg-black overflow-hidden z-10 mt-[64px]"
          >
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover animate-fade-in"
            />

            {/* Image Indicator Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleThumbnailClick(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-gold w-6' : 'bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="px-4 py-4 flex gap-2 overflow-x-auto scrollbar-hide bg-black">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
                  idx === currentImageIndex
                    ? 'border-gold'
                    : 'border-gray-700 hover:border-gold/50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Product Info */}
          <div className="px-4 pt-20 pb-32">
            {/* Product Name */}
            <h1 className="text-4xl font-light tracking-wider text-gold mb-4">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-gold fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-400">(125 reviews)</span>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-gold mb-6">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Short Description */}
            <p className="text-sm text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-8"></div>

            {/* Fragrance Notes */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-widest text-gold mb-4">
                FRAGRANCE NOTES
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-gray-900 text-gray-300 rounded-full border border-gold/30"
                  >
                    {ingredient.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-widest text-gold mb-3">
                DESCRIPTION
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {product.description}. Expertly crafted with premium ingredients, this
                fragrance offers exceptional longevity and projection. Perfect for any
                occasion, it captures the essence of luxury with every spritz.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-8"></div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-semibold text-white tracking-widest">
                QUANTITY
              </span>
              <div className="flex items-center border border-gold/40 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gold hover:bg-gold/10 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-white font-semibold min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gold hover:bg-gold/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background-dark via-background-dark to-transparent pt-4 px-4 pb-6 border-t border-gold/20">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold tracking-widest rounded-sm hover:shadow-lg hover:shadow-gold/50 transition-all duration-300 hover:from-yellow-300 hover:to-gold"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => onBuyNow(quantity)}
                className="flex-1 py-4 bg-transparent border-2 border-gold text-gold font-bold tracking-widest rounded-sm hover:bg-gold/10 transition-colors"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-2 gap-12 p-12 max-w-7xl mx-auto mt-20">
          {/* Left Column - Image */}
          <div>
            <div className="sticky top-20 flex flex-col gap-4">
              <div className="relative w-full aspect-square bg-black rounded-lg overflow-hidden group z-10 mt-[64px]">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 animate-fade-in"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleThumbnailClick(idx)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex
                        ? 'border-gold'
                        : 'border-gray-700 hover:border-gold/50'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="flex flex-col">
            {/* Product Name */}
            <h1 className="text-5xl font-light tracking-wider text-gold mb-4">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gold fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-400">(125 reviews)</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-gold mb-8">
              ₹{product.price.toLocaleString()}
            </p>

            {/* Short Description */}
            <p className="text-base text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-8"></div>

            {/* Fragrance Notes */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-widest text-gold mb-4">
                FRAGRANCE NOTES
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs bg-gray-900 text-gray-300 rounded-full border border-gold/30"
                  >
                    {ingredient.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-widest text-gold mb-3">
                DESCRIPTION
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {product.description}. Expertly crafted with premium ingredients, this
                fragrance offers exceptional longevity and projection. Perfect for any
                occasion, it captures the essence of luxury with every spritz.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-gold/50 to-transparent mb-8"></div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-sm font-semibold text-white tracking-widest">
                QUANTITY
              </span>
              <div className="flex items-center border border-gold/40 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gold hover:bg-gold/10 transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 text-white font-semibold min-w-16 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gold hover:bg-gold/10 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 bg-gradient-to-r from-gold to-yellow-500 text-black font-bold tracking-widest rounded-sm hover:shadow-lg hover:shadow-gold/50 transition-all duration-300 hover:from-yellow-300 hover:to-gold"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => onBuyNow(quantity)}
                className="w-full py-4 bg-transparent border-2 border-gold text-gold font-bold tracking-widest rounded-sm hover:bg-gold/10 transition-colors"
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes shimmer-gold {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};
