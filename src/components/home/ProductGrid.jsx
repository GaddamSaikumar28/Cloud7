import React from 'react';

const ProductCard = () => (
  <div className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-glow-sm">
    <div className="aspect-[3/4] p-8 flex flex-col items-center justify-center relative">
        {/* Glow behind product */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-400/30 transition-colors"></div>
        
        {/* Product Representation */}
        <div className="w-24 h-32 bg-gradient-to-b from-slate-700 to-black rounded-lg border border-white/10 relative z-10 shadow-xl flex items-center justify-center">
            <span className="text-xs text-white/50">Cloud7</span>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="text-center text-slate-300 text-sm font-light">Cloud7 Gen 1</h3>
        </div>
    </div>
  </div>
);

const ProductGrid = () => {
  return (
    <section className="py-24 bg-dark-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCard key={i} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;