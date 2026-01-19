import React from 'react';

interface ProductInfoProps {
  title: string;
  category: string;
  tags: string[];
  description: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ title, category, tags, description }) => {
  return (
    <div className="w-full px-6 text-center z-20 -mt-2">
      <h1 className="text-white text-4xl font-bold tracking-tight mb-3 font-display drop-shadow-lg uppercase">{title}</h1>
      <p className="text-primary/80 text-xs font-medium tracking-[0.25em] uppercase mb-5">{category}</p>
      
      <div className="flex flex-wrap justify-center items-center gap-3 max-w-[300px] mx-auto opacity-90 mb-6">
        {tags.map(tag => (
          <span 
            key={tag}
            className="text-white text-[11px] font-light tracking-wider uppercase border border-primary/30 px-2 py-1 rounded bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-white/60 text-xs leading-relaxed max-w-[320px] mx-auto font-light tracking-wide border-t border-primary/10 pt-4">
        {description}
      </p>
    </div>
  );
};