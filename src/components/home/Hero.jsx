
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroApi } from '../../api/heroApi';

// --- CONFIGURATION ---
const AUTO_ROTATE_MS = 6000;

const Hero = () => {
  const [data, setData] = useState(null);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [areImagesCached, setAreImagesCached] = useState(false);

  // 1. Load Data
  useEffect(() => {
    const loadHero = async () => {
      try {
        const result = await heroApi.getActiveHero();
        if (result) {
          setData(result);
          preloadImages(result.hero_images || [result.hero_image_url]);
        }
      } catch (err) {
        console.error("Hero Error:", err);
      }
    };
    loadHero();
  }, []);

  // 2. System Cache Preloader
  const preloadImages = async (urls) => {
    const promises = urls.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; 
      });
    });

    await Promise.all(promises);
    setAreImagesCached(true);
  };

  // 3. Auto-Rotate Logic
  useEffect(() => {
    if (!data?.hero_images || data.hero_images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImgIndex((prev) => 
        (prev + 1) % (data.hero_images || [data.hero_image_url]).length
      );
    }, AUTO_ROTATE_MS);

    return () => clearInterval(timer);
  }, [data, activeImgIndex]);

  // Initial Loading State
  if (!data) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="animate-pulse text-neutral-500 font-mono text-sm tracking-widest uppercase">
        Loading...
      </div>
    </div>
  );

  const gallery = (data.hero_images && data.hero_images.length > 0) 
    ? data.hero_images 
    : [data.hero_image_url];
  
  const activeImage = gallery[activeImgIndex];
  const glowColor = data.glow_color || '#ffffff';

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      
      {/* 1. AMBIENT BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Gradient Spot */}
        <motion.div 
          animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px]"
          style={{ backgroundColor: glowColor }}
        />
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

        {/* --- LEFT: TEXT CONTENT --- */}
        <div className="flex flex-col justify-center items-start space-y-8 pl-4 lg:pl-12 order-2 lg:order-1">
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-white"
            >
              {data.headline}
            </motion.h1>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg text-neutral-400 font-light max-w-md leading-relaxed"
          >
            {data.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              to={data.cta_link || "/shop"} 
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full overflow-hidden transition-all hover:pr-14"
            >
              <span className="relative z-10 font-bold tracking-wide uppercase text-sm">
                Shop Now
              </span>
              <span className="absolute right-5 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-neutral-300 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            </Link>
          </motion.div>
        </div>

        {/* --- RIGHT: PRODUCT IMAGE --- */}
        <div className="relative h-[50vh] lg:h-[70vh] flex flex-col items-center justify-center order-1 lg:order-2">
           <div className="relative w-full h-full flex items-center justify-center">
             
             {!areImagesCached ? (
                <div className="animate-pulse text-neutral-600 text-sm tracking-widest uppercase font-mono">
                  Loading Experience...
                </div>
             ) : (
               <AnimatePresence mode="wait">
                 <motion.img
                   key={activeImgIndex}
                   src={activeImage}
                   alt="Hero Product"
                   initial={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                   transition={{ duration: 0.8, ease: "easeInOut" }}
                   className="max-h-full max-w-full object-contain drop-shadow-[0_25px_50px_rgba(255,255,255,0.05)]"
                 />
               </AnimatePresence>
             )}

           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;