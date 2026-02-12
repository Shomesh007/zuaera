import React, { useState } from 'react';
import { Product, CartItem } from '../App';

interface CollectionsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
  cartItems: CartItem[];
}

export const Collections: React.FC<CollectionsProps> = ({
  products,
  onProductSelect,
  cartItems,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const displayProducts = products.slice(0, 3);

  return (
    <div className="relative w-full min-h-screen bg-background-dark">
      {/* Gold Divider Line */}
      <div className="fixed top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent z-10"></div>

      {/* Main Content */}
      <section className="w-full pt-12 pb-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-light tracking-widest text-white mb-4">
              COLLECTIONS
            </h1>
            <div className="h-px w-16 bg-gradient-to-r from-gold to-transparent mx-auto"></div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {displayProducts.map((product, idx) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  isHovered={hoveredId === product.id}
                  onHoverStart={() => setHoveredId(product.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onProductClick={() => onProductSelect(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onProductClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onProductClick,
}) => {
  return (
    <div
      className="group relative bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        boxShadow: isHovered ? '0 0 30px rgba(242, 208, 13, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Image Container */}
      <div
        className="relative w-full aspect-square overflow-hidden bg-black cursor-pointer"
        onClick={onProductClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Gold Glow Overlay on Hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(242, 208, 13, 0.1), transparent)',
              animation: 'pulse 2s infinite',
            }}
          ></div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 md:p-6 flex flex-col gap-3">
        {/* Product Name */}
        <h3
          className="text-lg md:text-xl font-light tracking-wider text-gold cursor-pointer transition-colors hover:text-yellow-300"
          onClick={onProductClick}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-gray-300 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-sm md:text-base font-bold text-gold pt-2">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Add to Cart Button - Navigate to Product Detail */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onProductClick();
          }}
          className={`w-full py-3 mt-2 font-semibold text-sm tracking-widest transition-all duration-300 rounded-sm relative overflow-hidden group/btn ${
            isHovered
              ? 'bg-gold text-black shadow-lg shadow-gold/50'
              : 'bg-gradient-to-r from-gold/80 to-yellow-500/80 text-black hover:from-gold hover:to-yellow-500'
          }`}
          style={{
            background: isHovered
              ? 'linear-gradient(90deg, #f2d00d, #ffd700, #f2d00d)'
              : undefined,
            backgroundSize: isHovered ? '200% 100%' : undefined,
            animation: isHovered ? 'shimmer-gold 3s infinite' : undefined,
          }}
        >
          {/* Shimmer Effect */}
          <span className="relative flex items-center justify-center">
            ADD TO CART
            {isHovered && (
              <span
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  animation: 'shimmer 2s infinite',
                }}
              ></span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};
