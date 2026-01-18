
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, Sparkles, Zap, Loader2, ShoppingBag, ArrowUpRight, Star } from 'lucide-react';
// import { getAllProducts, getCategories } from '../api/productApi';

// const DUMMY_IMAGE = "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Protocol+Image";

// /**
//  * ------------------------------------------------------------------
//  * INTERNAL CUSTOM CARD COMPONENT
//  * Exclusive design for the Shop page with high-end animations.
//  * ------------------------------------------------------------------
//  */
// const ShopCard = ({ product }) => {
//   // Extract aesthetics or set defaults
//   const glowColor = product.image_color || 'from-cyan-500 to-blue-600';
//   const shadowColor = product.image_color?.includes('red') ? 'shadow-red-500/20' 
//     : product.image_color?.includes('purple') ? 'shadow-purple-500/20' 
//     : 'shadow-cyan-500/20';
    
//   return (
//     <Link to={`/product/${product.slug}`} className="group relative block h-full">
      
//       {/* 1. Dynamic Backlight (Glows on Hover) */}
//       <div className={`absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`} />

//       {/* 2. Main Card Container */}
//       <motion.div 
//         whileHover={{ y: -8 }}
//         className={`
//           relative h-full flex flex-col overflow-hidden rounded-[1.8rem] bg-dark-900 
//           border border-white/10 transition-all duration-300
//           group-hover:border-white/30 group-hover:shadow-2xl ${shadowColor}
//         `}
//       >
//         {/* --- IMAGE SECTION --- */}
//         <div className="relative h-64 overflow-hidden bg-dark-800">
//            {/* Image */}
//            <motion.img 
//              src={product.cover_image_url || product.coverImage || DUMMY_IMAGE} 
//              alt={product.name}
//              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
//            />
           
//            {/* Gradient Overlay for Text Contrast */}
//            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

//            {/* Top Badges */}
//            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
//               <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white">
//                 {product.categoryName}
//               </span>
//               {product.rating && (
//                 <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
//                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
//                    <span className="text-[10px] font-bold text-white">{product.rating}</span>
//                 </div>
//               )}
//            </div>

//            {/* "Quick View" Interaction */}
//            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//               <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-full">
//                  <ArrowUpRight className="text-white" size={24} />
//               </div>
//            </div>
//         </div>

//         {/* --- DETAILS SECTION --- */}
//         <div className="flex flex-col flex-1 p-6 relative">
//            {/* Decorative Top Line */}
//            <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${glowColor} opacity-20`} />

//            <div className="mb-4">
//              <h3 className="text-xl font-bold text-white mb-1 leading-tight group-hover:text-brand-glow transition-colors">
//                {product.name}
//              </h3>
//              <p className="text-slate-500 text-xs line-clamp-2 h-8 leading-relaxed">
//                {product.tagline || product.description?.substring(0, 60)}
//              </p>
//            </div>

//            <div className="mt-auto flex items-end justify-between pt-4 border-t border-white/5">
//               <div className="flex flex-col">
//                  <span className="text-[10px] font-mono text-slate-500 uppercase">Starting At</span>
//                  <span className="text-lg font-bold text-white tracking-tight">${product.displayPrice}</span>
//               </div>
              
//               <motion.button 
//                 whileTap={{ scale: 0.95 }}
//                 className="px-4 py-2 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl text-xs font-black uppercase tracking-wider transition-all border border-white/5 hover:border-white"
//               >
//                 View
//               </motion.button>
//            </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };


// /**
//  * ------------------------------------------------------------------
//  * MAIN SHOP COMPONENT
//  * ------------------------------------------------------------------
//  */
// const Shop = () => {
//   // --- STATE ---
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     const initShop = async () => {
//       try {
//         const [productsData, categoriesData] = await Promise.all([
//           getAllProducts(),
//           getCategories()
//         ]);
//         setProducts(productsData);
//         setFilteredProducts(productsData);
//         setCategories(categoriesData);
//       } catch (err) {
//         console.error("Failed to load shop data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     initShop();
//   }, []);

//   // --- FILTERING LOGIC ---
//   useEffect(() => {
//     let result = products;

//     // 1. Filter by Category
//     if (activeCategory !== 'All') {
//       result = result.filter(p => p.categoryName === activeCategory);
//     }

//     // 2. Filter by Search
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(p => 
//         p.name.toLowerCase().includes(query) || 
//         p.description?.toLowerCase().includes(query)
//       );
//     }

//     setFilteredProducts(result);
//   }, [activeCategory, searchQuery, products]);

//   // --- LOADING SKELETON ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin text-brand-glow mb-4" size={48} />
//         <p className="text-slate-500 animate-pulse font-mono uppercase tracking-widest text-xs">Loading Protocols...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-dark-950 pb-20 relative overflow-x-hidden selection:bg-brand-glow selection:text-black">
      
//       {/* 1. DYNAMIC BACKGROUND (Clean & Dark) */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-glow/5 rounded-full blur-[150px]" />
//         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
//         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150" />
//       </div>

//       {/* 2. HEADER SECTION */}
//       <div className="relative pt-32 pb-12 px-6 z-10">
//         <div className="max-w-7xl mx-auto text-center">
//            <motion.div
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.6 }}
//            >
//              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-glow text-[11px] font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
//                <Sparkles size={12} /> Authorized Dealer
//              </div>
//            </motion.div>
//         </div>
//       </div>

//       {/* 3. STICKY FILTER BAR */}
//       <div className="sticky top-24 z-40 px-4 mb-16">
//         <div className="max-w-7xl mx-auto">
//           <motion.div 
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="bg-dark-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-4 justify-between items-center"
//           >
//             {/* Category Pills */}
//             <div className="flex gap-1 overflow-x-auto p-2 w-full md:w-auto custom-scrollbar">
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`
//                     px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap border
//                     ${activeCategory === cat 
//                       ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
//                       : 'bg-transparent text-slate-500 border-transparent hover:bg-white/5 hover:text-white'}
//                   `}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Search Input */}
//             <div className="relative w-full md:w-80 p-2">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//               <input 
//                 type="text" 
//                 placeholder="Search catalog..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-dark-950/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all placeholder:text-slate-600"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* 4. PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Results Metadata */}
//         <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
//           <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
//             Displaying <span className="text-white font-bold">{filteredProducts.length}</span> Protocols
//           </p>
//           {activeCategory !== 'All' && (
//             <div className="text-xs text-brand-glow font-bold uppercase tracking-widest flex items-center gap-2">
//               <Filter size={12} /> {activeCategory}
//             </div>
//           )}
//         </div>

//         {/* The Grid */}
//         {filteredProducts.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }}
//             className="flex flex-col items-center justify-center py-32 bg-white/[0.02] rounded-[3rem] border border-white/5 border-dashed"
//           >
//             <ShoppingBag className="text-slate-700 mb-6" size={64} />
//             <h3 className="text-3xl font-bold text-white mb-2 italic tracking-tight">System Empty</h3>
//             <p className="text-slate-500 mb-8">No protocols match your search criteria.</p>
//             <button 
//               onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
//               className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
//             >
//               Reset Filters
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div 
//             layout 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//           >
//             <AnimatePresence mode="popLayout">
//               {filteredProducts.map((product) => (
//                 <motion.div
//                   layout
//                   key={product.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ShopCard product={product} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>

//       <style>{`
//          @keyframes shine {
//             to { background-position: 200% center; }
//          }
//          .animate-shine {
//             animation: shine 6s linear infinite;
//          }
//       `}</style>
//     </div>
//   );
// };

// export default Shop;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Sparkles, Zap, Loader2, ShoppingBag, ArrowUpRight, Star } from 'lucide-react';
import { getAllProducts, getCategories } from '../api/productApi';

const DUMMY_IMAGE = "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Protocol+Image";

/**
 * ------------------------------------------------------------------
 * INTERNAL CUSTOM CARD COMPONENT
 * ------------------------------------------------------------------
 */
const ShopCard = ({ product }) => {
  // Extract aesthetics or set defaults
  const glowColor = product.image_color || 'from-cyan-500 to-blue-600';
  const shadowColor = product.image_color?.includes('red') ? 'shadow-red-500/20' 
    : product.image_color?.includes('purple') ? 'shadow-purple-500/20' 
    : 'shadow-cyan-500/20';
    
  // Formatting
  const hasRating = product.calculatedRating > 0;

  return (
    <Link to={`/product/${product.slug}`} className="group relative block h-full">
      
      {/* 1. Dynamic Backlight (Glows on Hover) */}
      <div className={`absolute -inset-0.5 rounded-[2rem] bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500`} />

      {/* 2. Main Card Container */}
      <div className="relative h-full bg-dark-900/90 border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:border-white/20 flex flex-col">
        
        {/* Image Area */}
        <div className="relative h-64 overflow-hidden bg-dark-950 p-6 flex items-center justify-center">
            {/* Ambient Background Blob */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br ${glowColor} opacity-20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`} />
            
            <img 
              src={product.coverImage || DUMMY_IMAGE} 
              alt={product.name} 
              className="relative w-full h-full object-contain drop-shadow-2xl z-10 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />

            {/* Price Badge */}
            <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="text-brand-glow font-mono font-bold text-sm">$</span>
              <span className="text-white font-bold text-sm tracking-wide">{product.displayPrice}</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex-1 flex flex-col">
          
          <div className="flex justify-between items-start mb-2">
            <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
               {product.categoryName}
            </span>
            
            {/* Rating Badge */}
            <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
               {hasRating ? (
                 <>
                   <Star size={12} className="text-yellow-400 fill-yellow-400" />
                   <span className="text-xs font-bold text-white">{product.calculatedRating}</span>
                   <span className="text-[10px] text-slate-500">({product.calculatedReviewsCount})</span>
                 </>
               ) : (
                 <span className="text-[10px] font-bold text-brand-glow uppercase tracking-wide">New</span>
               )}
            </div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-brand-glow transition-colors">
            {product.name}
          </h3>
          
          <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-1">
            {product.tagline || product.description}
          </p>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                <ShoppingBag size={14} className="mb-0.5" /> View Options
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-glow group-hover:text-dark-900 transition-all duration-300">
                <ArrowUpRight size={16} />
             </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

/**
 * ------------------------------------------------------------------
 * MAIN SHOP PAGE
 * ------------------------------------------------------------------
 */
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [allProducts, allCategories] = await Promise.all([
        getAllProducts(),
        getCategories()
      ]);
      setProducts(allProducts);
      setCategories([{ id: 'all', name: 'All' }, ...allCategories]);
    } catch (error) {
      console.error("Shop Load Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter Logic
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.categoryName === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-brand-glow selection:text-dark-900">
      
      {/* 1. Header / Hero Section */}
      <div className="relative pt-32 pb-12 px-4 md:px-12 overflow-hidden">
        {/* Background Ambient Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-glow/10 to-transparent blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-brand-glow mb-6"
           >
              <Sparkles size={12} /> Premium Collection
           </motion.div>
           
           {/* <motion.h1 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6"
           >
             Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500 animate-shine">Protocols</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
           >
             Engineered for peak performance. Explore our collection of high-purity alkaloids and advanced formulations.
           </motion.p> */}
        </div>
      </div>

      {/* 2. Controls Section (Search & Filter) */}
      <div className="sticky top-20 z-40 bg-dark-900/80 backdrop-blur-xl border-y border-white/5 py-4 px-4 md:px-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0">
               {categories.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.name)}
                   className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap border ${
                     activeCategory === cat.name 
                     ? 'bg-white text-dark-900 border-white' 
                     : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10 hover:text-white'
                   }`}
                 >
                   {cat.name}
                 </button>
               ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
               <input 
                 type="text" 
                 placeholder="Search protocols..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-dark-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:border-brand-glow outline-none transition-colors"
               />
            </div>
         </div>
      </div>

      {/* 3. Product Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
             <Loader2 size={48} className="text-brand-glow animate-spin mb-4" />
             <p className="text-slate-500 font-mono text-sm">Initializing Shop Data...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5"
          >
            <Zap size={48} className="text-slate-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2 italic tracking-tight">System Empty</h3>
            <p className="text-slate-500 mb-8">No protocols match your search criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShopCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <style>{`
         @keyframes shine {
            to { background-position: 200% center; }
         }
         .animate-shine {
            animation: shine 6s linear infinite;
         }
      `}</style>
    </div>
  );
};

export default Shop;