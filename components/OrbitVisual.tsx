import React from 'react';

interface Ingredient {
  name: string;
  url: string;
}

interface OrbitVisualProps {
  seriesNumber: string;
  ingredients: Ingredient[];
}

export const OrbitVisual: React.FC<OrbitVisualProps> = ({ seriesNumber, ingredients }) => {
  // Determine perfume image based on seriesNumber
  let perfumeImage = null;
  if (seriesNumber === "04") perfumeImage = "/vibe.jpeg";
  if (seriesNumber === "05") perfumeImage = "/vibe_variant.jpg";
  if (seriesNumber === "03") perfumeImage = "/EYES.jpg";
  if (seriesNumber === "01") perfumeImage = "/CRISP.jpg";
  // Add more mappings as needed for other perfumes

  return (
    <div className="relative w-full h-[45vh] flex items-center justify-center mt-2 mb-4 perspective-[1000px]">
      {/* Central Card */}
      <div className="relative z-20 w-52 h-72 bg-gradient-to-br from-[#12110a] to-black rounded-xl border border-primary/50 flex items-center justify-center deep-glow overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
        {perfumeImage ? (
          <img src={perfumeImage} alt="Perfume"
            loading="eager"
            decoding="async"
            className={`absolute inset-0 w-full h-full object-cover scale-125 z-10
              ${seriesNumber === "04" ? "-translate-x-8" : ""}
              ${seriesNumber === "05" ? " translate-x-4" : ""}
              ${seriesNumber === "01" ? "-translate-x-4 -translate-y-4" : ""}`}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(242,208,13,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            <div className="flex flex-col items-center relative z-10">
              <span className="text-[9px] text-primary/70 tracking-[0.4em] mb-3 uppercase">Series</span>
              <span className="text-7xl font-bold text-white font-display drop-shadow-[0_0_20px_rgba(242,208,13,0.2)]">
                {seriesNumber}
              </span>
              <div className="w-12 h-[2px] bg-primary mt-4 shadow-[0_0_10px_rgba(242,208,13,1)]"></div>
            </div>
          </>
        )}
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-primary/10 to-transparent"></div>
      </div>

      {/* Floating Ingredient 1 (Top Right) */}
      {ingredients[0] && (
        <div className="absolute top-8 right-6 z-30 flex flex-col items-center gap-2 animate-float">
          <div className="w-16 h-16 rounded-full border border-primary bg-black p-0.5 flex items-center justify-center gold-glow-intense cursor-pointer hover:scale-110 transition-transform">
            <div
              className="w-full h-full rounded-full bg-cover bg-center opacity-90"
              style={{ backgroundImage: seriesNumber === "04" && ingredients[0]?.name.toLowerCase() === "saffron" ? `url('/saffron.png')` : `url('${ingredients[0].url}')` }}
            ></div>
          </div>
          <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-2 py-0.5 rounded border border-primary/20 backdrop-blur-sm shadow-lg">
            {ingredients[0].name}
          </p>
        </div>
      )}

      {/* Floating Ingredient 2 (Bottom Left) */}
      {ingredients[1] && (
        <div className="absolute bottom-12 left-6 z-30 flex flex-col items-center gap-2 animate-float-delayed">
          <div className="w-20 h-20 rounded-full border border-primary/80 bg-black p-0.5 flex items-center justify-center shadow-[0_0_30px_rgba(180,50,50,0.3)] cursor-pointer hover:scale-110 transition-transform">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center opacity-80 mix-blend-screen" 
              style={{ backgroundImage: `url('${ingredients[1].url}')` }}
            ></div>
          </div>
          <p className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase bg-black/80 px-2 py-0.5 rounded border border-primary/20 backdrop-blur-sm shadow-lg">
            {ingredients[1].name}
          </p>
        </div>
      )}

      {/* Floating Ingredient 3 (Right Center) - Adjusted position inward for mobile visibility */}
      {ingredients[2] && (
        <div className="absolute top-[55%] right-8 z-30 flex flex-col items-center gap-2 animate-float-slow">
          <div className="w-14 h-14 rounded-full border border-primary/40 bg-black p-0.5 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <div 
              className="w-full h-full rounded-full bg-cover bg-center opacity-60" 
              style={{ backgroundImage: `url('${ingredients[2].url}')` }}
            ></div>
          </div>
          <p className="text-primary/70 text-[10px] font-bold tracking-[0.2em] uppercase bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm shadow-lg">
            {ingredients[2].name}
          </p>
        </div>
      )}

      {/* Background SVG Lines */}
      <svg className="absolute inset-0 w-full h-full -z-10 opacity-40 pointer-events-none" viewBox="0 0 400 600">
        <circle cx="200" cy="300" fill="none" r="160" stroke="#f2d00d" strokeOpacity="0.5" strokeWidth="0.5"></circle>
        <circle cx="200" cy="300" fill="none" r="220" stroke="#f2d00d" strokeDasharray="2 15" strokeOpacity="0.3" strokeWidth="1.5"></circle>
        <line opacity="0.6" stroke="#f2d00d" strokeDasharray="4 4" strokeWidth="0.5" x1="200" x2="280" y1="230" y2="100"></line> 
        <line opacity="0.6" stroke="#f2d00d" strokeDasharray="4 4" strokeWidth="0.5" x1="200" x2="80" y1="370" y2="480"></line> 
      </svg>
    </div>
  );
};