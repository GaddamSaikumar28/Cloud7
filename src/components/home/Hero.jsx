
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
  
  // Parallax Values
  const yText = useSpring(useTransform(scrollY, [0, 500], [0, 150]), springConfig);
  const yMain = useSpring(useTransform(scrollY, [0, 500], [0, 50]), springConfig);
  const yFront = useSpring(useTransform(scrollY, [0, 500], [0, -80]), springConfig); // Moves Up fast
  const yBack = useSpring(useTransform(scrollY, [0, 500], [0, 30]), springConfig);   // Moves Down slow
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

  if (loading) {
    return (
      <div className="h-screen w-full bg-dark-950 flex items-center justify-center">
         <Loader2 className="animate-spin text-brand-glow" size={32} />
      </div>
    );
  }
  console.log(data);
  // --- DATA ---
  const content = data || {
    headline: "Elevate Your Experience",
    subheadline: "Pure. Precise. Cloud7.",
    cta_text: "EXPLORE COLLECTION",
    cta_link: "/shop",
    glow_color: "#0ea5e9",
    hero_images: []
  };

  // Safe Image Handling (Ensures 4 slots)
  const rawImages = content.hero_images?.length > 0 
    ? content.hero_images 
    : (content.hero_image_url ? [content.hero_image_url] : []);
  const images = [...rawImages, null, null, null, null].slice(0, 4); 
  const hasMultipleImages = rawImages.length > 1;

  return (
    <div className="relative bg-dark-950 overflow-hidden min-h-screen">
      
      {/* 1. TOP TICKER */}
      {/* <TopTicker /> */}

      {/* 2. BACKGROUND: AURORA SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AuroraBackground baseColor={content.glow_color} />
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        {/* Bottom Fade to blend with next section */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-dark-950 to-transparent" />
      </div>

      {/* 3. MAIN CONTENT */}
      <section className="relative z-10 w-full min-h-[110vh] flex flex-col items-center pt-32 pb-20">
        
        {/* A. TEXT LAYER */}
        <motion.div 
          style={{ y: yText, opacity: opacityFade }}
          className="container mx-auto px-5 text-center max-w-5xl relative z-20 mb-4"
        >
          {/* Badge */}
          <motion.div 
            // initial={{ opacity: 0, y: -20 }}
            // animate={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] mb-8"
          >
            <Sparkles size={12} className="text-brand-glow animate-pulse" />
            <span className="text-[5px] font-bold tracking-[0.25em] text-white uppercase">
              Next Generation Potency
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            // initial={{ opacity: 0, scale: 0.9 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 1, ease: "easeOut" }}
            className="text-6l md:text-7xl lg:text-9l font-black italic tracking-tighter leading-[0.85] text-white mb-6 drop-shadow-2xl"
          >
            {content.headline}
          </motion.h1>

          {/* Subheadline */}
          {/* <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            {content.subheadline}
          </motion.p> */}
        </motion.div>

        {/* B. 3D PRODUCT STAGE */}
        <div className="relative w-full h-[600px] md:h-[800px] perspective-[2000px] my-5  flex items-center justify-center -mt-12 md:-mt-24 pointer-events-none">
            
            {hasMultipleImages ? (
              <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                  
                  {/* --- IMAGE 3: BACK LEFT (Blurry, Distant) --- */}
                  <ProductLayer 
                    src={images[3]}
                    y={yBack}
                    className="absolute top-[10%] left-[5%] md:left-[15%] w-[180px] md:w-[250px] z-0 blur-[4px] opacity-60 grayscale-[20%] rotate-[-12deg]"
                    floatConfig={{ duration: 7, y: [-15, 15, -15], rotate: [-12, -15, -12] }}
                  />

                  {/* --- IMAGE 1: BACK RIGHT (Semi-Blurry) --- */}
                  <ProductLayer 
                    src={images[1]}
                    y={yBack}
                    className="absolute top-[20%] right-[5%] md:right-[15%] w-[200px] md:w-[300px] z-10 blur-[2px] opacity-80 rotate-[12deg]"
                    floatConfig={{ duration: 8, delay: 1, y: [-20, 20, -20], rotate: [12, 10, 12] }}
                  />

                  {/* --- IMAGE 0: MAIN HERO (Center, Sharp, Glowing) --- */}
                  {/* Note: This is the anchor */}
                  <ProductLayer 
                    src={images[0]}
                    y={yMain}
                    className="relative z-20 w-[300px] md:w-[500px] lg:w-[550px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] filter brightness-110"
                    floatConfig={{ duration: 6, y: [-10, 10, -10] }} // Gentle bob
                  />

                  {/* --- IMAGE 2: FRONT LEFT (Very Sharp, Close Up, Fast Move) --- */}
                  <ProductLayer 
                    src={images[2]}
                    y={yFront}
                    className="absolute bottom-[15%] left-[10%] md:left-[20%] w-[150px] md:w-[280px] z-30 drop-shadow-2xl rotate-[-6deg]"
                    floatConfig={{ duration: 5, delay: 0.5, y: [0, -30, 0], rotate: [-6, -3, -6] }}
                  />

              </div>
            ) : (
              // Fallback for single image
              <ProductLayer 
                src={images[0]}
                y={yMain}
                className="z-20 w-full max-w-md md:max-w-xl object-contain drop-shadow-[0_35px_60px_rgba(14,165,233,0.3)]"
                floatConfig={{ duration: 6, y: [-15, 15, -15] }}
              />
            )}
        </div>

        {/* C. CTA BUTTON */}
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative z-50 -mt-32 md:-mt-48"
        >
            <Link 
              to={content.cta_link} 
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-brand-glow/90 rounded-2xl hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.8)] backdrop-blur-md"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm md:text-base text-dark-950 font-black">
                  {content.cta_text} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
        </motion.div>

      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                              */
/* -------------------------------------------------------------------------- */

// 1. TOP TICKER
// const TopTicker = () => {
//    return (
//       <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5 h-10 flex items-center overflow-hidden">
//          <motion.div 
//             className="flex items-center gap-12 whitespace-nowrap min-w-full"
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
//          >
//             {[...Array(10)].map((_, i) => (
//                <React.Fragment key={i}>
//                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-glow flex items-center gap-2">
//                      <Zap size={12} className="fill-brand-glow" /> 
//                      Potency Redefined
//                   </span>
//                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
//                      <Star size={12} /> 
//                      Lab Tested & Verified
//                   </span>
//                </React.Fragment>
//             ))}
//          </motion.div>
//       </div>
//    );
// };

// 2. PRODUCT LAYER (Handles Parallax + Idle Float)
const ProductLayer = ({ src, className, floatConfig, y }) => {
  if (!src) return null; 

  return (
    <motion.div
      style={{ y }} // Scroll Parallax
      className={`absolute ${className}`} 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
       {/* Idle Floating Animation nested inside */}
       <motion.img 
         src={src} 
         alt="Cloud7 Product" 
         className="w-full h-auto object-contain"
         animate={{ 
            y: floatConfig?.y || [0, -10, 0],
            rotate: floatConfig?.rotate || [0, 0, 0]
         }}
         transition={{ 
            duration: floatConfig?.duration || 5, 
            delay: floatConfig?.delay || 0,
            repeat: Infinity, 
            ease: "easeInOut" 
         }}
       />
    </motion.div>
  );
};

// 3. AURORA BACKGROUND (Colorful & Beautiful)
const AuroraBackground = ({ baseColor }) => {
  const color1 = baseColor || '#0ea5e9'; // Brand Glow (Cyan)
  const color2 = '#7c3aed'; // Deep Purple
  const color3 = '#1d4ed8'; // Royal Blue

  return (
    <div className="absolute inset-0 overflow-hidden bg-dark-950">
       
       {/* Blob 1: Top Left (Brand Color) */}
       <motion.div 
         className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
         style={{ backgroundColor: color1 }}
         animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            x: [0, 50, 0]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Blob 2: Bottom Right (Purple) */}
       <motion.div 
         className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-25 mix-blend-screen"
         style={{ backgroundColor: color2 }}
         animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 30, 0]
         }}
         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Blob 3: Center/Moving (Blue) */}
       <motion.div 
         className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20 mix-blend-screen"
         style={{ backgroundColor: color3 }}
         animate={{ 
            x: [-40, 40, -40],
            y: [-40, 40, -40],
            scale: [1, 1.1, 1]
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Radial Gradient Overlay (Vignette) */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
    </div>
  );
};

export default Hero;