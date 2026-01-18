
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  ArrowRight, Zap, ShoppingBag, Activity, ShieldCheck, 
  Microscope, Timer, TrendingUp, AlertCircle 
} from 'lucide-react';
import { supabase } from '../../client/supabaseClient';

const DUMMY_IMAGE = "https://via.placeholder.com/600x600/transparent/ffffff?text=Protocol+Alpha";

/**
 * ------------------------------------------------------------------
 * MAIN COMPONENT: Featured Protocols
 * ------------------------------------------------------------------
 */
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      // Fetch products marked as 'is_featured'
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*), category:categories(*)')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(3); // Fetch a few, but we optimize for 1

      if (!error && data) setProducts(data);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  // Decide Layout: If 1 product, use Spotlight. If more, use Grid.
  const isSingleFeature = products.length === 1;

  return (
    <section className="relative py-10 bg-dark-900 overflow-hidden">
      
      {/* Background Decor (Grid & Glow) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          {/* <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-glow/20 bg-brand-glow/5 mb-6"
          >
             <Zap size={12} className="text-brand-glow animate-pulse" />
             <span className="text-[10px] font-bold tracking-[0.3em] text-brand-glow uppercase">
               Featured Protocol
             </span>
          </motion.div> */}
          
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase"
          >
            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">Performance</span>
          </motion.h2>
        </div>

        {/* --- DYNAMIC RENDER --- */}
        {isSingleFeature ? (
          <SpotlightStage product={products[0]} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {products.map(p => <StandardCard key={p.id} product={p} />)}
          </div>
        )}

      </div>
    </section>
  );
};

/**
 * ------------------------------------------------------------------
 * SUB-COMPONENT: Spotlight Stage (The "Futuristic" Single View)
 * ------------------------------------------------------------------
 */
const SpotlightStage = ({ product }) => {
  // Logic to get price
  const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
  const prices = activeVariants.map(v => Number(v.price));
  const minPrice = prices.length > 0 ? Math.min(...prices).toFixed(2) : "0.00";
  
  // Mouse tracking for "Holographic" tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT: The Visual Stage */}
        <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center p-12 overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
           
           {/* Animated Background Rings */}
           <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
              <div className="w-[300px] h-[300px] border border-brand-glow rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-[450px] h-[450px] border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
           </div>

           {/* Floating Product Image */}
           <motion.div 
             className="relative z-20 w-full max-w-sm"
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
              {/* Glow Behind */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-glow/20 blur-[80px] rounded-full" />
              
              <img 
                src={product.cover_image_url || DUMMY_IMAGE} 
                alt={product.name} 
                className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110" 
              />
           </motion.div>

           {/* Scanning Line Effect (On Hover) */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-glow/10 to-transparent h-[10%] w-full -translate-y-full group-hover:animate-scan pointer-events-none z-30 opacity-0 group-hover:opacity-100" />
        </div>

        {/* RIGHT: Data & Specs */}
        <div className="p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 relative">
           
           {/* Header Info */}
           <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase rounded">
                    In Stock
                 </span>
                 <span className="px-3 py-1 bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase rounded flex items-center gap-1">
                    <ShieldCheck size={12} /> Lab Verified
                 </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4 leading-[0.9]">
                 {product.name}
              </h1>
              <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-white/10 pl-4">
                 {product.tagline || product.description?.substring(0, 100) + '...'}
              </p>
           </div>

           {/* Tech Specs Grid (Seller Perspective: Show why it's good) */}
           <div className="grid grid-cols-2 gap-4 mb-8">
              <SpecBox icon={Activity} label="Potency" value={product.potency || "High"} />
              <SpecBox icon={Timer} label="Onset" value="15-20 Min" />
              <SpecBox icon={Microscope} label="Purity" value="99.8%" />
              <SpecBox icon={TrendingUp} label="Effect" value="Focus" />
           </div>

           {/* Price & Action */}
           <div className="mt-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Starting At</p>
                 <div className="text-4xl font-mono font-bold text-white">${minPrice}</div>
              </div>
              
              <Link to={`/shop/${product.slug}`} className="w-full sm:w-auto">
                 <button className="w-full relative px-8 py-4 bg-brand-glow text-dark-900 font-bold text-sm tracking-widest uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] overflow-hidden group/btn">
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                    <span className="relative flex items-center justify-center gap-3">
                       View Product <ArrowRight size={18} />
                    </span>
                 </button>
              </Link>
           </div>

        </div>
      </div>
    </motion.div>
  );
};

/**
 * ------------------------------------------------------------------
 * SUB-COMPONENT: Spec Box (For the Grid)
 * ------------------------------------------------------------------
 */
const SpecBox = ({ icon: Icon, label, value }) => (
   <div className="bg-dark-950/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-brand-glow/30 transition-colors group">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-glow group-hover:bg-brand-glow/10 transition-colors">
         <Icon size={20} />
      </div>
      <div>
         <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</div>
         <div className="text-white font-bold font-mono">{value}</div>
      </div>
   </div>
);


/**
 * ------------------------------------------------------------------
 * SUB-COMPONENT: Standard Card (Fallback for multiple products)
 * ------------------------------------------------------------------
 */
const StandardCard = ({ product }) => {
   const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
   const minPrice = activeVariants.length > 0 ? Math.min(...activeVariants.map(v => Number(v.price))).toFixed(2) : "0.00";

   return (
      <Link to={`/product/${product.slug}`} className="group relative block h-full">
         <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-brand-glow/50 transition-colors flex flex-col">
            <div className="relative aspect-[4/5] bg-dark-950/50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <img 
                  src={product.cover_image_url || DUMMY_IMAGE} 
                  alt={product.name} 
                  className="relative z-10 w-3/4 h-auto object-contain transition-transform duration-500 group-hover:scale-110" 
               />
            </div>
            <div className="mt-auto">
               <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-glow transition-colors">{product.name}</h3>
               <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-brand-glow font-mono text-lg font-bold">${minPrice}</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-glow group-hover:text-dark-900 transition-colors">
                     <ArrowRight size={14} />
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default FeaturedProducts;