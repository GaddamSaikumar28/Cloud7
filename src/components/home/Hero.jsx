
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroApi } from '../../api/heroApi';

const Hero = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- PARALLAX PHYSICS ---
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Create smooth parallax values
  const yText = useSpring(useTransform(scrollY, [0, 500], [0, 100]), springConfig);
  const yMainImage = useSpring(useTransform(scrollY, [0, 500], [0, 50]), springConfig);
  const yBackImages = useSpring(useTransform(scrollY, [0, 500], [0, -100]), springConfig); // Move Up faster
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const heroData = await heroApi.getActiveHero();
        if (heroData) setData(heroData);
      } catch (e) {
        console.error("Hero load failed", e);
      } finally {
        setLoading(false);
      }
    };
    loadHero();
  }, []);

  // --- LOADING ---
  if (loading) {
    return (
      <div className="h-screen w-full bg-dark-900 flex items-center justify-center">
         <Loader2 className="animate-spin text-brand-glow" size={32} />
      </div>
    );
  }

  // --- DATA PREPARATION ---
  const content = data || {
    headline: "Elevate Your Experience",
    subheadline: "Pure. Precise. Cloud7.",
    cta_text: "EXPLORE COLLECTION",
    cta_link: "/shop",
    glow_color: "#0ea5e9",
    hero_images: []
  };

  // Ensure 4 slots for the cluster logic
  const rawImages = content.hero_images && content.hero_images.length > 0 
    ? content.hero_images 
    : (content.hero_image_url ? [content.hero_image_url] : []);
    
  // Fill rest with null to avoid index errors
  const images = [...rawImages, null, null, null, null]; 
  const isCluster = rawImages.length > 1;

  return (
    <div className="relative bg-dark-900 overflow-hidden">
      
      {/* 1. TOP SALE MARQUEE (Sticky Top) */}
      <TopTicker />

      {/* 2. MAIN HERO SECTION */}
      <section className="relative min-h-[110vh] w-full flex flex-col items-center justify-start pt-32 pb-20">
        
        {/* --- DYNAMIC BACKGROUND --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <SmokeEngine color={content.glow_color} />
           {/* Vignette */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] opacity-80" />
           {/* Noise Texture (Optional for premium feel) */}
           <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
          
          {/* A. TEXT LAYER */}
          <motion.div 
            style={{ y: yText, opacity: opacityFade }}
            className="text-center max-w-5xl mx-auto mb-12 relative z-20"
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg mb-8"
            >
              <Sparkles size={12} className="text-brand-glow animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-slate-300 uppercase">
                Next Generation Products
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] text-white mb-6 drop-shadow-2xl"
            >
              {content.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
            >
              {content.subheadline}
            </motion.p>
          </motion.div>

          {/* B. 3D PRODUCT STAGE */}
          <div className="relative w-full h-[500px] md:h-[600px] perspective-[1200px] flex items-center justify-center -mt-8">
             
             {/* Center Spotlight (Dynamic Color) */}
             <div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] opacity-40 animate-pulse-slow"
               style={{ backgroundColor: content.glow_color }}
             />

             {/* IMAGE COMPOSITION */}
             {isCluster ? (
                <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                   
                   {/* 1. MAIN HERO (Center, Crisp, Highest Priority) */}
                   <ProductLayer 
                      src={images[0]} 
                      y={yMainImage}
                      className="z-30 w-[280px] md:w-[380px] lg:w-[450px] drop-shadow-[0_35px_60px_rgba(0,0,0,0.9)]"
                      animation={{ y: [0, -20, 0], duration: 6 }}
                   />

                   {/* 2. BACK RIGHT (Blurred, Moving Fast) */}
                   <ProductLayer 
                      src={images[1]} 
                      y={yBackImages}
                      className="absolute top-10 right-[5%] md:right-[15%] z-10 w-[140px] md:w-[200px] opacity-60 blur-[2px] grayscale-[30%] rotate-12"
                      animation={{ y: [0, -30, 0], duration: 8, delay: 1 }}
                   />

                   {/* 3. FRONT LEFT (Small, Sharp, Moving Slow) */}
                   <ProductLayer 
                      src={images[2]} 
                      y={yMainImage} // Moves with main
                      className="absolute bottom-20 left-[5%] md:left-[18%] z-40 w-[100px] md:w-[150px] rotate-[-15deg] drop-shadow-xl"
                      animation={{ y: [0, -15, 0], duration: 5, delay: 2 }}
                   />

                   {/* 4. DEEP BACKGROUND LEFT (Very Blurred) */}
                   <ProductLayer 
                      src={images[3]} 
                      y={yBackImages}
                      className="absolute -top-10 left-[0%] md:left-[10%] z-0 w-[120px] md:w-[160px] opacity-30 blur-[4px] rotate-[-6deg]"
                      animation={{ y: [0, -25, 0], duration: 9, delay: 0.5 }}
                   />
                </div>
             ) : (
                // SINGLE IMAGE FALLBACK
                <ProductLayer 
                   src={images[0]} 
                   y={yMainImage}
                   className="z-30 w-full max-w-sm md:max-w-lg object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.7)]"
                   animation={{ y: [0, -25, 0], duration: 6 }}
                />
             )}
          </div>

          {/* C. CTA BUTTON (Floating above bottom fog) */}
          <motion.div
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="relative z-50 -mt-12"
          >
             <Link 
                to={content.cta_link} 
                className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-brand-glow/90 font-pj rounded-2xl hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.7)] backdrop-blur-sm"
             >
                {/* Button Inner Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm md:text-base text-dark-900">
                   {content.cta_text} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
             </Link>
          </motion.div>

        </div>

        {/* 3. FOREGROUND FOG (Seamless Transition) */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent z-40 pointer-events-none" />
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// 1. TOP TICKER (Auto Scroller)
const TopTicker = () => {
   return (
      <div className="fixed top-0 left-0 w-full z-50 bg-brand-glow/10 backdrop-blur-md border-b border-white/5 h-10 flex items-center overflow-hidden">
         <motion.div 
            className="flex items-center gap-12 whitespace-nowrap min-w-full"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         >
            {[...Array(10)].map((_, i) => (
               <React.Fragment key={i}>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-glow flex items-center gap-2">
                     <Zap size={12} className="fill-brand-glow" /> 
                     New Formula Dropping Soon
                  </span>
                  <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
                     <Star size={12} /> 
                     Free Shipping on Orders $50+
                  </span>
               </React.Fragment>
            ))}
         </motion.div>
      </div>
   );
};

// 2. PRODUCT LAYER (Handles specific image animation and parallax)
const ProductLayer = ({ src, className, animation, y }) => {
  if (!src) return null; // Logic to hide layer if no image in that slot

  return (
    <motion.div
      style={{ y }} // Parallax from scroll
      className={`absolute ${className}`} // Positioning classes
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
       <motion.img 
         src={src} 
         alt="Cloud7 Product" 
         className="w-full h-auto object-contain"
         // Gentle idle floating animation
         animate={animation.y ? { y: animation.y } : {}}
         transition={{ 
            y: { duration: animation.duration, repeat: Infinity, ease: "easeInOut", delay: animation.delay || 0 } 
         }}
       />
    </motion.div>
  );
};

// 3. SMOKE ENGINE (Procedural Background)
const SmokeEngine = ({ color }) => {
   const smokeColor = color || '#0ea5e9';
   return (
      <>
         {/* Deep Layer */}
         <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] rounded-[40%] blur-[120px] opacity-20"
            style={{ background: `radial-gradient(circle at center, ${smokeColor} 0%, transparent 70%)` }}
         />
         {/* Detail Layer */}
         <motion.div 
            animate={{ rotate: -360, x: [-50, 50, -50] }}
            transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] rounded-[45%] blur-[100px] opacity-10 mix-blend-screen"
            style={{ background: `radial-gradient(circle at center, #ffffff 0%, transparent 60%)` }}
         />
      </>
   );
};

export default Hero;