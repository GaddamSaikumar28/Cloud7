
// // import React, { useEffect, useState } from 'react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import { Loader2 } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { heroApi } from '../../api/heroApi';

// // const Hero = () => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // --- PARALLAX SCROLL HOOKS ---
// //   const { scrollY } = useScroll();
// //   // Parallax: Content moves slower than scroll to create depth
// //   const yParallax = useTransform(scrollY, [0, 500], [0, 200]);
// //   const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

// //   useEffect(() => {
// //     const loadHero = async () => {
// //       try {
// //         const heroData = await heroApi.getActiveHero();
// //         if (heroData) setData(heroData);
// //       } catch (e) {
// //         console.error("Hero load failed", e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadHero();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="h-[80vh] w-full flex items-center justify-center">
// //         <Loader2 className="animate-spin text-slate-500" size={32} />
// //       </div>
// //     );
// //   }

// //   // --- DATA DEFAULTS ---
// //   const content = data || {
// //     headline: "Elevate Your Experience.",
// //     subheadline: "Pure. Precise. Cloud7.",
// //     cta_text: "EXPLORE COLLECTION",
// //     cta_link: "/shop",
// //     glow_color: "#ffffff",
// //     hero_images: [] // Fallback
// //   };

// //   const images = content.hero_images || [];

// //   console.log(data,'hero data');
// //   return (
// //     <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden text-white perspective-[1000px]">
      
// //       {/* 1. CINEMATIC BACKGROUND (Overrides Home BG for this section) */}
// //       <div className="absolute inset-0 w-full h-full z-0 bg-[#050505] overflow-hidden">
// //         {/* Procedural Smoke Engine */}
// //         <AtmosphericFog color={content.glow_color} />
// //       </div>

// //       {/* 2. MAIN CONTENT STACK */}
// //       <motion.div 
// //         style={{ opacity: opacityParallax, y: yParallax }}
// //         className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center -mt-10"
// //       >
        
// //         {/* TEXT LAYER */}
// //         <div className="space-y-6 max-w-4xl mx-auto mb-8 z-20">
// //           <motion.h1 
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1, ease: "easeOut" }}
// //             className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-slate-200 drop-shadow-2xl"
// //           >
// //             {content.headline}
// //             <span className="block mt-2 text-slate-400 opacity-90 text-2xl md:text-4xl font-light tracking-normal">
// //               {content.subheadline}
// //             </span>
// //           </motion.h1>

// //           <motion.p 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.5, duration: 1 }}
// //             className="hidden md:block text-sm text-slate-500 max-w-lg mx-auto leading-relaxed tracking-wide uppercase"
// //           >
// //             Our premium product is engineered with our signature spectrum purity and dominant extreme ecommerce solution.
// //           </motion.p>
// //         </div>

// //         {/* VISUAL LAYER: PRODUCT CLUSTER & SMOKE */}
// //         <div className="relative w-full max-w-4xl h-[450px] md:h-[550px] flex items-center justify-center">
          
// //           {/* Back Glow Halo */}
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-slate-800/30 rounded-full blur-[80px] animate-pulse" />

// //           {/* The Products */}
// //           <ProductStage images={images} />

// //           {/* Foreground Mist (Wraps around the product for depth) */}
// //           <div className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-40">
// //              <MistLayer direction="left" duration={20} />
// //           </div>
// //         </div>

// //         {/* CTA LAYER: GLOWING PILL */}
// //         <motion.div 
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ delay: 1.2, duration: 0.8 }}
// //           className="relative z-30 mt-[-40px] md:mt-[-60px]"
// //         >
// //           <Link to={content.cta_link} className="group relative inline-block">
// //             {/* Outer blur glow */}
// //             <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-400 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
            
// //             {/* The Button */}
// //             <div className="relative flex items-center px-12 py-5 bg-black/20 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300">
// //               <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-white uppercase shadow-black drop-shadow-md">
// //                 {content.cta_text}
// //               </span>
// //             </div>
            
// //             {/* Inner Ring Highlight */}
// //             <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-white/30 pointer-events-none" />
// //           </Link>
// //         </motion.div>

// //       </motion.div>

// //       {/* 3. BOTTOM FADE (Seamless Transition to next section) */}
// //       <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-dark-950 via-dark-950/80 to-transparent z-20 pointer-events-none" />
      
// //       {/* SVG FILTERS (Hidden, used by CSS for Smoke) */}
// //       <svg className="hidden">
// //         <filter id="smoke-filter">
// //           <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="3" result="warp" />
// //           <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="40" in="SourceGraphic" in2="warp" />
// //         </filter>
// //       </svg>
// //     </section>
// //   );
// // };

// // // --- COMPONENT: PRODUCT STAGE (The Cluster) ---
// // const ProductStage = ({ images }) => {
// //   if (!images || images.length === 0) return null;

// //   const isSingle = images.length === 1;

// //   return (
// //     <div className="relative z-10 w-full h-full flex items-center justify-center preserve-3d">
// //       {images.map((src, index) => {
// //         if (!src) return null;
        
// //         // CSS Positioning logic to match the reference image cluster
// //         let posStyles = "z-10 scale-100";
// //         let floatDelay = 0;
// //         let floatDuration = 6;
        
// //         if (!isSingle) {
// //              if (index === 0) { 
// //                 // IMAGE 1: Main Center (Front, Sharp)
// //                 posStyles = "z-30 w-[160px] md:w-[240px] lg:w-[280px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)]";
// //                 floatDelay = 0;
// //              } else if (index === 1) { 
// //                 // IMAGE 2: Back Left (Tablet, Tilted, Blurred)
// //                 posStyles = "z-10 w-[200px] md:w-[320px] -translate-x-[40%] -translate-y-[10%] -rotate-6 opacity-60 blur-[1px] brightness-75";
// //                 floatDelay = 1;
// //                 floatDuration = 7;
// //              } else if (index === 2) { 
// //                 // IMAGE 3: Back Right (Bottle, Small, Tilted)
// //                 posStyles = "z-20 w-[100px] md:w-[150px] translate-x-[90%] translate-y-[20%] rotate-12 opacity-90 drop-shadow-xl";
// //                 floatDelay = 2;
// //                 floatDuration = 5;
// //              } else { 
// //                 // IMAGE 4: Background floater
// //                 posStyles = "z-0 w-[120px] translate-x-[-80%] translate-y-[-40%] blur-[2px] opacity-40";
// //              }
// //         } else {
// //              // Single Image Center
// //              posStyles = "z-20 w-[250px] md:w-[350px] drop-shadow-2xl";
// //         }

// //         return (
// //           <motion.img
// //             key={index}
// //             src={src}
// //             alt="Hero Product"
// //             className={`absolute object-contain ${posStyles}`}
// //             initial={{ opacity: 0, scale: 0.9, y: 50 }}
// //             animate={{ 
// //                 opacity: posStyles.includes('opacity') ? undefined : 1, // Don't override utility class opacity if set
// //                 scale: 1,
// //                 y: [0, -20, 0] // Gentle bobbing
// //             }}
// //             transition={{
// //                 opacity: { duration: 1.5, delay: 0.2 },
// //                 scale: { duration: 1.5, delay: 0.2 },
// //                 y: { 
// //                     duration: floatDuration, 
// //                     repeat: Infinity, 
// //                     ease: "easeInOut", 
// //                     delay: floatDelay 
// //                 }
// //             }}
// //           />
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // // --- COMPONENT: ATMOSPHERIC FOG ENGINE (Procedural Smoke) ---
// // const AtmosphericFog = ({ color }) => {
// //   return (
// //     <>
// //        {/* Base Radial Gradient for depth */}
// //        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,30,40,0.4),_rgba(5,5,5,1)_70%)]" />
       
// //        {/* Layer 1: Slow moving, large details */}
// //        <div className="absolute inset-0 opacity-40 mix-blend-screen">
// //           <MistLayer direction="right" duration={35} scale={1.2} />
// //        </div>

// //        {/* Layer 2: Faster moving, fine details */}
// //        <div className="absolute inset-0 opacity-20 mix-blend-screen">
// //           <MistLayer direction="left" duration={25} scale={1} />
// //        </div>
// //     </>
// //   );
// // };

// // const MistLayer = ({ direction, duration, scale }) => {
// //   // Movement logic
// //   const xValues = direction === 'left' ? [0, -50, 0] : [0, 50, 0];
  
// //   return (
// //     <motion.div
// //       animate={{ x: xValues, scale: [scale, scale * 1.1, scale] }}
// //       transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
// //       className="w-[120%] h-[120%] -top-[10%] -left-[10%] absolute"
// //       style={{
// //         // This gradient + the SVG filter in the parent component creates the smoke texture
// //         background: `
// //             radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%),
// //             radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
// //             radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)
// //         `,
// //         filter: 'url(#smoke-filter) blur(20px)', 
// //       }}
// //     />
// //   );
// // };

// // export default Hero;

// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { heroApi } from '../../api/heroApi';

// const Hero = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // --- PARALLAX & SCROLL EFFECTS ---
//   const { scrollY } = useScroll();
//   const textY = useTransform(scrollY, [0, 500], [0, 100]); 
//   const logoY = useTransform(scrollY, [0, 500], [0, -50]);

//   useEffect(() => {
//     const loadHero = async () => {
//       try {
//         const heroData = await heroApi.getActiveHero();
//         if (heroData) setData(heroData);
//       } catch (e) {
//         console.error("Hero load failed", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadHero();
//   }, []);

//   // --- LOADING STATE ---
//   if (loading) {
//     return (
//       <div className="h-screen w-full bg-dark-900 flex items-center justify-center">
//          <Loader2 className="animate-spin text-brand-glow" size={32} />
//       </div>
//     );
//   }

//   // --- DATA PREPARATION ---
//   // Fallback defaults if DB is empty
//   const content = data || {
//     headline: "Elevate Your Experience",
//     subheadline: "Pure. Precise. Cloud7.",
//     cta_text: "EXPLORE COLLECTION",
//     cta_link: "/shop",
//     glow_color: "#0ea5e9",
//     hero_images: [] 
//   };

//   // Handle Image Logic: Support both array (new) and string (old) formats
//   let images = [];
//   if (content.hero_images && content.hero_images.length > 0) {
//       images = content.hero_images;
//   } else if (content.hero_image_url) {
//       images = [content.hero_image_url];
//   }

//   // Determine Layout Mode: Single Image vs Cluster
//   const isCluster = images.length > 1;

//   return (
//     <section className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-dark-900 selection:bg-brand-glow selection:text-dark-900">
      
//       {/* 1. BACKGROUND: SMOKE & ATMOSPHERE */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//          <SmokeEngine color={content.glow_color} />
//          {/* Vignette to focus eyes on center */}
//          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
//       </div>

//       {/* 2. MAIN CONTENT GRID */}
//       <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center pt-20 pb-10">
        
//         {/* --- LEFT: TYPOGRAPHY --- */}
//         <motion.div 
//           style={{ y: textY }}
//           className="text-center lg:text-left space-y-8 order-2 lg:order-1"
//         >
//           <motion.div 
//              initial={{ opacity: 0, x: -30 }}
//              animate={{ opacity: 1, x: 0 }}
//              transition={{ duration: 1, ease: "easeOut" }}
//           >
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-glow/20 bg-brand-glow/5 backdrop-blur-md mb-8 shadow-[0_0_15px_-3px_rgba(14,165,233,0.3)] mx-auto lg:mx-0">
//                 <Sparkles size={14} className="text-brand-glow animate-pulse" />
//                 <span className="text-[11px] font-bold tracking-[0.25em] text-brand-glow uppercase">Next Gen Alkaloids</span>
//             </div>

//             {/* Headline */}
//             <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black italic tracking-tighter leading-[0.9] text-white mb-6 drop-shadow-xl">
//               {content.headline}
//             </h1>
            
//             {/* Subheadline */}
//             <p className="text-lg md:text-xl text-slate-400 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed border-l-0 lg:border-l-2 border-brand-glow/50 lg:pl-6">
//               {content.subheadline}
//             </p>
//           </motion.div>

//           {/* CTA Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.8 }}
//             className="pt-4"
//           >
//              <Link 
//                 to={content.cta_link} 
//                 className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-brand-glow font-pj rounded-xl hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)]"
//              >
//                 <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm">
//                    {content.cta_text} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </span>
//              </Link>
//           </motion.div>
//         </motion.div>

//         {/* --- RIGHT: VISUALS (Adaptive) --- */}
//         <motion.div 
//            style={{ y: logoY }}
//            className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 perspective-[1000px]"
//         >
//            {/* Glow Halo behind products */}
//            <div 
//              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] animate-pulse" 
//              style={{ backgroundColor: `${content.glow_color}40` }} // 40 = 25% opacity
//            />

//            {isCluster ? (
//               // >>> LAYOUT A: CLUSTER (If > 1 image)
//               <>
//                 {/* Main Center Image */}
//                 <FloatingImage src={images[0]} className="z-30 w-64 md:w-80 lg:w-96 drop-shadow-2xl" duration={6} delay={0} />
//                 {/* Background Elements */}
//                 <FloatingImage src={images[1]} className="absolute top-0 right-0 lg:-right-10 z-10 w-32 md:w-40 opacity-70 blur-[2px] rotate-12" duration={7} delay={1} />
//                 <FloatingImage src={images[2]} className="absolute bottom-10 left-0 lg:-left-12 z-40 w-24 md:w-32 rotate-[-15deg]" duration={5} delay={2} />
//                 <FloatingImage src={images[3]} className="absolute top-10 left-4 z-0 w-20 md:w-28 opacity-40 blur-[4px]" duration={8} delay={0.5} />
//               </>
//            ) : (
//               // >>> LAYOUT B: SINGLE HERO (If 1 image or empty)
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 1 }}
//                 className="relative z-20"
//               >
//                   {images[0] ? (
//                      <motion.img 
//                         src={images[0]} 
//                         alt="Hero Product" 
//                         animate={{ y: [0, -20, 0] }}
//                         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                         className="w-full max-w-sm md:max-w-md lg:max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//                      />
//                   ) : (
//                      // Fallback Box if absolutely no images exist
//                      <div className="w-64 h-80 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-white/20 font-bold rotate-6">
//                         No Image
//                      </div>
//                   )}
//               </motion.div>
//            )}
//         </motion.div>
//       </div>

//       {/* FOG OVERLAY BOTTOM (Merges smoothly into next section) */}
//       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-900 to-transparent z-20 pointer-events-none" />
//     </section>
//   );
// };

// // --- HELPER: FLOATING IMAGE COMPONENT ---
// const FloatingImage = ({ src, className, duration, delay }) => {
//   if (!src) return null;
//   return (
//     <motion.div
//       className={className}
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1, y: [0, -20, 0] }}
//       transition={{ 
//          opacity: { duration: 1 }, 
//          scale: { duration: 1 },
//          y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }
//       }}
//     >
//        <img src={src} alt="Visual Element" className="w-full h-auto object-contain" />
//     </motion.div>
//   );
// };

// // --- HELPER: SMOKE BACKGROUND ---
// const SmokeEngine = ({ color }) => {
//    const smokeColor = color || '#0ea5e9'; // Default to Sky Blue if missing
   
//    return (
//       <>
//          <motion.div 
//             animate={{ rotate: 360 }}
//             transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
//             className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] rounded-[40%] blur-[120px] opacity-30"
//             style={{ background: `radial-gradient(circle at center, ${smokeColor} 0%, transparent 60%)` }}
//          />
//          <motion.div 
//             animate={{ rotate: -360 }}
//             transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-[-30%] right-[-20%] w-[120%] h-[120%] rounded-[45%] blur-[100px] opacity-20 mix-blend-screen"
//             style={{ background: `radial-gradient(circle at center, #ffffff 0%, transparent 60%)` }}
//          />
//       </>
//    );
// };

// export default Hero;
// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { heroApi } from '../../api/heroApi';

// const Hero = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // --- PARALLAX & SCROLL EFFECTS ---
//   const { scrollY } = useScroll();
//   // Text moves slightly down to create separation
//   const textY = useTransform(scrollY, [0, 500], [0, 100]); 
//   // Visuals move up to create counter-movement
//   const visualsY = useTransform(scrollY, [0, 500], [0, -50]);

//   useEffect(() => {
//     const loadHero = async () => {
//       try {
//         const heroData = await heroApi.getActiveHero();
//         if (heroData) setData(heroData);
//       } catch (e) {
//         console.error("Hero load failed", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadHero();
//   }, []);

//   // --- LOADING STATE ---
//   if (loading) {
//     return (
//       <div className="h-screen w-full bg-dark-900 flex items-center justify-center">
//          <Loader2 className="animate-spin text-brand-glow" size={32} />
//       </div>
//     );
//   }

//   // --- DATA PREPARATION ---
//   const content = data || {
//     headline: "Elevate Your Experience",
//     subheadline: "Pure. Precise. Cloud7.",
//     cta_text: "EXPLORE COLLECTION",
//     cta_link: "/shop",
//     glow_color: "#0ea5e9",
//     hero_images: [] 
//   };

//   // Image Logic: Handle Array vs String
//   let images = [];
//   if (content.hero_images && content.hero_images.length > 0) {
//       images = content.hero_images;
//   } else if (content.hero_image_url) {
//       images = [content.hero_image_url];
//   }

//   console.log(data);
//   console.log(images);
//   const isCluster = images.length > 1;
//   console.log(isCluster);

//   return (
//     <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-dark-900 selection:bg-brand-glow selection:text-dark-900 pt-32 pb-20">
      
//       {/* 1. BACKGROUND ATMOSPHERE */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//          <SmokeEngine color={content.glow_color} />
//          {/* Central Vignette to focus attention */}
//          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#000000_120%)] opacity-60" />
//       </div>

//       {/* 2. MAIN CONTENT WRAPPER (Centered Column) */}
//       <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-12">
        
//         {/* --- TOP: TYPOGRAPHY --- */}
//         <motion.div 
//           style={{ y: textY }}
//           className="max-w-4xl mx-auto space-y-8 flex flex-col items-center"
//         >
//           <motion.div 
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             {/* Badge */}
//             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-brand-glow/20 bg-brand-glow/5 backdrop-blur-md mb-8 shadow-[0_0_20px_-5px_rgba(14,165,233,0.3)]">
//                 <Sparkles size={14} className="text-brand-glow animate-pulse" />
//                 <span className="text-[px] font-bold tracking-[0.3em] text-brand-glow uppercase">Next Gen Alkaloids</span>
//             </div>

//             {/* Headline */}
//             <h1 className="text-1xl md:text-3xl lg:text-3xl font-black italic tracking-tighter leading-[0.95] text-white mb-8 drop-shadow-2xl">
//               {content.headline}
//             </h1>
            
//             {/* Subheadline */}
//             {/* <p className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
//               {content.subheadline}
//             </p> */}
//           </motion.div>

//           {/* CTA Button */}
//         </motion.div>

//         {/* --- BOTTOM: VISUALS (Centered) --- */}
//         <motion.div 
//            style={{ y: visualsY }}
//            className="relative w-full max-w-5xl h-[400px] md:h-[500px] flex items-center justify-center mt-4 perspective-[1000px]"
//         >
//            {/* Center Glow Halo */}
//            <div 
//              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[90px] animate-pulse" 
//              style={{ backgroundColor: `${content.glow_color}30` }} 
//            />

//            {isCluster ? (
//               // >>> CLUSTER LAYOUT (Centered grouping)
//               <>
//                 {/* Main Image (Center) */}
//                 <FloatingImage 
//                    src={images[0]} 
//                    className="z-30 w-64 md:w-80 lg:w-[400px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]" 
//                    duration={6} delay={0} 
//                 />
                
//                 {/* Right Flank (Tucked closer to center) */}
//                 <FloatingImage 
//                    src={images[1]} 
//                    className="absolute top-10 right-[15%] md:right-[25%] z-10 w-32 md:w-48 opacity-80 blur-[1px] rotate-12" 
//                    duration={7} delay={1} 
//                 />
                
//                 {/* Left Flank (Tucked closer to center) */}
//                 <FloatingImage 
//                    src={images[2]} 
//                    className="absolute bottom-10 left-[15%] md:left-[25%] z-20 w-28 md:w-40 opacity-90 rotate-[-12deg]" 
//                    duration={5} delay={1.5} 
//                 />

//                 {/* Far Background (Subtle) */}
//                 <FloatingImage 
//                    src={images[3]} 
//                    className="absolute -top-10 left-[30%] z-0 w-20 md:w-32 opacity-50 blur-[3px]" 
//                    duration={8} delay={0.5} 
//                 />
//               </>
//            ) : (
//               // >>> SINGLE IMAGE LAYOUT (Perfectly Centered)
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 50 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//                 className="relative z-20"
//               >
//                   {images[0] ? (
//                      <motion.img 
//                         src={images[0]} 
//                         alt="Hero Product" 
//                         animate={{ y: [0, -25, 0] }}
//                         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                         className="w-full max-w-xs md:max-w-md lg:max-w-xl object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
//                      />
//                   ) : (
//                      <div className="w-64 h-80 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-white/20 font-bold">
//                         No Image Configured
//                      </div>
//                   )}
//               </motion.div>
//            )}
//         </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//              <Link 
//                 to={content.cta_link} 
//                 className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-brand-glow font-pj rounded-xl hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(14,165,233,0.4)] hover:shadow-[0_0_40px_rgba(14,165,233,0.6)]"
//              >
//                 <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm">
//                    {content.cta_text} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </span>
//              </Link>
//           </motion.div>
//       </div>
        
//       {/* FOG OVERLAY BOTTOM */}
//       <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-900 via-dark-900/90 to-transparent z-20 pointer-events-none" />
//     </section>
//   );
// };

// // --- HELPER: FLOATING IMAGE ---
// const FloatingImage = ({ src, className, duration, delay }) => {
//   if (!src) return null;
//   return (
//     <motion.div
//       className={className}
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1, y: [0, -20, 0] }}
//       transition={{ 
//          opacity: { duration: 1 }, 
//          scale: { duration: 1 },
//          y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }
//       }}
//     >
//        <img src={src} alt="Visual Element" className="w-full h-auto object-contain" />
//     </motion.div>
//   );
// };

// // --- HELPER: SMOKE BACKGROUND ---
// const SmokeEngine = ({ color }) => {
//    const smokeColor = color || '#0ea5e9';
//    return (
//       <>
//          <motion.div 
//             animate={{ rotate: 360 }}
//             transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
//             className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] rounded-[40%] blur-[130px] opacity-30"
//             style={{ background: `radial-gradient(circle at center, ${smokeColor} 0%, transparent 60%)` }}
//          />
//          <motion.div 
//             animate={{ rotate: -360 }}
//             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-[-30%] right-[-20%] w-[120%] h-[120%] rounded-[45%] blur-[100px] opacity-20 mix-blend-screen"
//             style={{ background: `radial-gradient(circle at center, #ffffff 0%, transparent 60%)` }}
//          />
//       </>
//    );
// };

// export default Hero;
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