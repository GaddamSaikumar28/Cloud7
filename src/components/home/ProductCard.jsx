import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../../client/supabaseClient';

const DUMMY_IMAGE = "https://placehold.co/400x600/png";

const CARD_EFFECTS = [
  '#00C853', // Green
  '#800080', // Purple
  '#E31E24', // Red
  '#009DDC', // Blue
  '#00C853',
  '#FF6D00'  // Orange
];

const FeaturedProducts = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVariants = async () => {
      const { data: variantData, error: variantError } = await supabase
        .from('product_variants')
        .select(`
          *,
          product:products (id, name, slug, description),
          variant_selection_map (
            option:variant_options (
              name,
              type:variant_types (name)
            )
          )
        `)
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (!variantError && variantData) {
        const processed = variantData.map(v => {
          const flavorOption = v.variant_selection_map?.find(
            map => map.option?.type?.name === 'Flavor'
          ) || v.variant_selection_map?.[0];

          return {
            ...v,
            displayName: flavorOption ? flavorOption.option.name : (v.sku ? v.sku.split('--')[1]?.replace(/_/g, ' ') : "Pure Extract")
          };
        });
        setVariants(processed);
      }
      setLoading(false);
    };
    fetchVariants();
  }, []);

  if (loading) return null;

  return (
    <section className="bg-black py-12 px-3 md:py-16 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tighter">
            PURE. PRECISE. <span className="text-[#009DDC]">POTENT.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Cloud7 purifies and packages Kratom's most powerful ingredients into delicious tablets and shots.
          </p>
        </div>

        {/* UPDATED CONTAINER: 
            1. 'grid grid-cols-2 gap-3' for Mobile (2 items per row, vertical scroll)
            2. 'md:flex md:overflow-x-auto' for Desktop (Horizontal scroll)
        */}
        <div className="grid grid-cols-2 gap-3 md:flex md:overflow-x-auto md:pb-8 md:gap-6 md:snap-x md:no-scrollbar">
          {variants.map((variant, index) => (
            /* UPDATED WRAPPER:
               Removed min-w for mobile so it fits the grid. 
               Kept min-w-[300px] for desktop scroller.
            */
            <div key={variant.id} className="w-full md:min-w-[300px] md:flex-1 md:snap-start">
              <VariantCard variant={variant} idx={index} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

const VariantCard = ({ variant, idx }) => {
  const activeColor = CARD_EFFECTS[idx % CARD_EFFECTS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      style={{
        background: `linear-gradient(160deg, #ffffff 60%, ${activeColor}15 100%)`,
        borderColor: `${activeColor}40`
      }}
      className="rounded-xl overflow-hidden flex flex-col h-full shadow-lg border hover:shadow-2xl transition-all duration-300 group"
    >
      {/* UPDATED CONTENT BODY:
          Reduced padding to 'p-3' on mobile to save space, 'md:p-6' on desktop 
      */}
      <div className="p-3 md:p-6 flex flex-col items-center flex-grow text-center relative">
        
        <div 
            className="absolute top-0 left-0 w-full h-1" 
            style={{ backgroundColor: activeColor }}
        />

        {/* Product Image */}
        <div className="relative w-full aspect-square mb-3 md:mb-6 group cursor-pointer">
          <img 
            src={variant.image_url || DUMMY_IMAGE} 
            alt={variant.displayName}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
          />
        </div>

        {/* Title Area */}
        <h3 className="text-sm md:text-xl font-black text-gray-900 mb-1 md:mb-2 leading-none uppercase break-words w-full">
          {variant.product?.name}
        </h3>
        {/* Hidden description on mobile to save space, visible on desktop */}
        <p className="hidden md:block text-gray-500 text-xs mb-6 line-clamp-2 px-2 font-medium">
          {variant.product?.description || "Precisely formulated high-purity extract tablets."}
        </p>

        {/* Action Button */}
        <div className="w-full mt-auto pt-2 md:pt-0">
          <Link to={`/product/${variant.product?.id}?variant=${variant.id}`} className="block w-full">
            <button 
                style={{ 
                    color: activeColor, 
                    borderColor: activeColor 
                }}
                className={`w-full py-2 md:py-4 rounded-lg border-2 font-black uppercase text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 hover:bg-gray-50 transition-colors group-hover:tracking-wider duration-300`}
            >
              <span className="truncate">Shop {variant.displayName}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;