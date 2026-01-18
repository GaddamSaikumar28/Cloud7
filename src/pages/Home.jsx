

// // import React, { useRef } from 'react';
// // import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// // // --- COMPONENTS ---
// // import Hero from '../components/home/Hero';
// // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // import Essence from '../components/home/Essence';
// // import Process from '../components/home/Process';
// // import FeaturedProducts from '../components/home/ProductCard'; 
// // import CTASection from '../components/home/CTASection';
// // import CommunityFeedback from '../components/home/CommunityFeedback';

// // // --- ASSETS / ICONS ---
// // // (Assuming you have these installed via lucide-react)
// // import { Atom, Hexagon, Zap } from 'lucide-react';

// // const Home = () => {
// //   // Global Scroll Hooks for Parallax
// //   const { scrollYProgress } = useScroll();
// //   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
// //   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

// //   return (
// //     <div className="relative min-h-screen bg-dark-950 overflow-x-hidden selection:bg-brand-glow selection:text-dark-900">
      
// //       {/* 1. SCROLL PROGRESS BAR (Fixed Top) */}
// //       <motion.div
// //         className="fixed top-0 left-0 right-0 h-1 bg-brand-glow origin-left z-[1000] shadow-[0_0_20px_#0ea5e9]"
// //         style={{ scaleX }}
// //       />

// //       {/* 2. CINEMATIC BACKGROUND SYSTEM */}
// //       <div className="fixed inset-0 pointer-events-none z-0">
// //          {/* Noise Texture */}
// //          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
         
// //          {/* Deep Space Gradients (Parallax) */}
// //          <motion.div style={{ y: backgroundY }} className="absolute inset-0">
// //              <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-brand-glow/10 rounded-full blur-[150px] mix-blend-screen" />
// //              <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
// //              <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
// //          </motion.div>

// //          {/* Floating Geometry (Decorative) */}
// //          <FloatingGeometry />
// //       </div>

// //       {/* --- MAIN CONTENT --- */}
// //       <div className="relative z-10 flex flex-col">
        
// //         {/* SECTION 1: HERO */}
// //         <section className="relative pt-0 pb-0">
// //            <Hero />
// //            {/* Fade to Black at bottom of Hero for smooth transition */}
// //            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
// //         </section>

// //         {/* SECTION 2: SOCIAL PROOF BANNER */}
// //         <div className="relative z-20 -mt-10 mb-20">
// //            <div className="transform -rotate-1 origin-left border-y border-white/10 bg-dark-900/80 backdrop-blur-md shadow-2xl">
// //               <InfiniteBanner />
// //            </div>
// //         </div>

// //         {/* SECTION 3: FEATURED PRODUCTS (The "Shop" Spotlight) */}
// //         <RevealSection className="relative py-24">
// //            {/* Spotlight Glow behind products */}
// //            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />
// //             */}
// //            {/* <div className="relative z-10">
// //               <div className="text-center mb-16">
// //                  <span className="inline-block py-1 px-3 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-4">
// //                     The Collection
// //                  </span>
// //                  <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
// //                     Potency <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-white">Redefined</span>
// //                  </h2>
// //               </div> */}
// //               <FeaturedProducts />
// //            {/* </div> */}
// //         </RevealSection>

// //         {/* <NebulaSeparator /> */}

// //         {/* SECTION 4: THE LAB (Science & Process Combined) */}
// //         <section className="relative py-32 overflow-hidden">
// //            {/* Tech Grid Background specifically for this section */}
// //            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
           
// //            <RevealSection>
// //               <Essence />
// //            </RevealSection>

// //            <div className="h-24" /> {/* Spacer */}

// //            <RevealSection>
// //               <Process />
// //            </RevealSection>
// //         </section>

// //         {/* <NebulaSeparator direction="left" /> */}

// //         {/* SECTION 5: CTA (High Energy) */}
// //         <RevealSection className="py-20 relative">
// //              <CTASection />
// //         </RevealSection>

// //         {/* SECTION 6: COMMUNITY (Reviews) */}
// //         <section className="relative py-24 bg-dark-900 border-t border-white/5">
// //            <CommunityFeedback />
// //         </section>

// //       </div>
// //     </div>
// //   );
// // };

// // // --- SUB-COMPONENT: ANIMATED SEPARATOR ---
// // const NebulaSeparator = ({ direction = "right" }) => {
// //   return (
// //     <div className="relative w-full h-px my-12 md:my-24 pointer-events-none overflow-visible">
// //        {/* The glowing line */}
// //        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-glow/30 to-transparent" />
       
// //        {/* The Energy Pulse */}
// //        <motion.div 
// //          animate={{ x: direction === "right" ? ["-100%", "100%"] : ["100%", "-100%"] }}
// //          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
// //          className="absolute top-[-1px] left-0 w-[40%] h-[3px] bg-gradient-to-r from-transparent via-brand-glow to-transparent blur-[2px]"
// //        />
       
// //        {/* Center Starburst */}
// //        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-glow/10 rounded-full blur-[40px]" />
// //     </div>
// //   );
// // };

// // // --- SUB-COMPONENT: REVEAL WRAPPER ---
// // // Wraps sections to fade/slide them in as you scroll
// // const RevealSection = ({ children, className }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 60 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, margin: "-100px" }}
// //       transition={{ duration: 0.8, ease: "easeOut" }}
// //       className={className}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // };

// // // --- SUB-COMPONENT: FLOATING GEOMETRY ---
// // // Purely decorative background elements
// // const FloatingGeometry = () => {
// //     return (
// //         <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
// //             {/* Element 1: Hexagon */}
// //             <motion.div 
// //                 animate={{ y: [0, -40, 0], rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
// //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //                 className="absolute top-[10%] left-[5%] text-brand-glow"
// //             >
// //                 <Hexagon size={120} strokeWidth={0.5} />
// //             </motion.div>

// //             {/* Element 2: Atom */}
// //             <motion.div 
// //                 animate={{ y: [0, 60, 0], rotate: [0, -180, 0], opacity: [0.1, 0.3, 0.1] }}
// //                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
// //                 className="absolute top-[40%] right-[5%] text-purple-500"
// //             >
// //                 <Atom size={200} strokeWidth={0.5} />
// //             </motion.div>

// //             {/* Element 3: Spark */}
// //             <motion.div 
// //                 animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }}
// //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// //                 className="absolute bottom-[20%] left-[20%] text-white"
// //             >
// //                 <Zap size={40} className="blur-sm" />
// //             </motion.div>
// //         </div>
// //     )
// // }

// // export default Home;

// // import React from 'react';
// // import { motion } from 'framer-motion';

// // // --- COMPONENTS ---
// // import Hero from '../components/home/Hero';
// // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // import Essence from '../components/home/Essence';
// // import Process from '../components/home/Process';
// // import FeaturedProducts from '../components/home/ProductCard'; 
// // import CTASection from '../components/home/CTASection';
// // import CommunityFeedback from '../components/home/CommunityFeedback';

// // const Home = () => {
// //   return (
// //     // Removed overflow-x-hidden from main div to prevent scroll-jacking issues
// //     <div className="relative min-h-screen bg-dark-950 selection:bg-brand-glow selection:text-dark-900">
      
// //       {/* 1. SIMPLE BACKGROUND SYSTEM (Static for Performance) */}
// //       <div className="fixed inset-0 pointer-events-none z-0">
// //          {/* Subtle Noise Texture - Reduced opacity */}
// //          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
         
// //          {/* Static Glows (No parallax/transforms) */}
// //          <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px]" />
// //          <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px]" />
// //       </div>

// //       {/* --- MAIN CONTENT --- */}
// //       <div className="relative z-10">
        
// //         {/* SECTION 1: HERO (Eagerly loaded) */}
// //         <section className="relative">
// //            <Hero />
// //         </section>

// //         {/* SECTION 2: SOCIAL PROOF BANNER (Simplified) */}
// //         <div className="relative z-20 mb-12">
// //            <div className="border-y border-white/5 bg-dark-900/50 backdrop-blur-sm">
// //               <InfiniteBanner />
// //            </div>
// //         </div>

// //         {/* SECTION 3: FEATURED PRODUCTS */}
// //         <StaticReveal className="relative py-16">
// //            <FeaturedProducts />
// //         </StaticReveal>

// //         {/* SECTION 4: THE LAB (Reduced complexity) */}
// //         <section className="relative py-20">
// //            <StaticReveal>
// //               <Essence />
// //            </StaticReveal>

// //            <div className="h-16" />

// //            <StaticReveal>
// //               <Process />
// //            </StaticReveal>
// //         </section>

// //         {/* SECTION 5: CTA */}
// //         <StaticReveal className="py-16">
// //              <CTASection />
// //         </StaticReveal>

// //         {/* SECTION 6: COMMUNITY */}
// //         <section className="relative py-20 bg-dark-900/30 border-t border-white/5">
// //            <CommunityFeedback />
// //         </section>

// //       </div>
// //     </div>
// //   );
// // };

// // // --- OPTIMIZED REVEAL WRAPPER ---
// // // Uses a simpler "Fade In" without heavy Y-axis travel or springs
// // const StaticReveal = ({ children, className }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       whileInView={{ opacity: 1 }}
// //       viewport={{ once: true, margin: "-50px" }}
// //       transition={{ duration: 0.5, ease: "easeOut" }}
// //       className={className}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // };

// // export default Home;

// import React from 'react';
// import { motion } from 'framer-motion';

// import PromoCarousel from '../components/home/PromoCarousel';
// // --- COMPONENTS ---
// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import FeaturedProducts from '../components/home/ProductCard'; 
// import CTASection from '../components/home/CTASection';
// import CommunityFeedback from '../components/home/CommunityFeedback';

// const Home = () => {
//   return (
//     // Base layout: Simple dark background, no heavy noise/overlays
//     <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-dark-900">
      
//       <section className="relative z-0">
//          <PromoCarousel />
//       </section>

//       {/* SECTION 1: HERO */}
//       {/* Kept separate for z-index layering if Hero has its own image */}
//       <section className="relative">
//          <Hero />
//       </section>

//       {/* SECTION 2: SOCIAL PROOF */}
//       {/* Simple border-y for separation, removed the rotation/tilt for better rendering */}
//       <div className="relative z-10 border-y border-white/5 bg-dark-900">
//           <InfiniteBanner />
//       </div>

//       {/* SECTION 3: FEATURED PRODUCTS */}
//       <section className="py-20 md:py-32 max-w-7xl mx-auto px-4">
//          <FadeIn>
//             <FeaturedProducts />
//          </FadeIn>
//       </section>

//       {/* SECTION 4: SCIENCE & PROCESS */}
//       {/* A subtle change in background color to separate this section visually */}
//       <section className="py-24 bg-dark-900/50 border-t border-white/5">
//          <div className="max-w-7xl mx-auto px-4 space-y-24">
//             <FadeIn>
//               <Essence />
//             </FadeIn>
            
//             <FadeIn>
//               <Process />
//             </FadeIn>
//          </div>
//       </section>

//       {/* SECTION 5: CTA */}
//       <section className="py-20">
//          <FadeIn>
//              <CTASection />
//          </FadeIn>
//       </section>

//       {/* SECTION 6: COMMUNITY */}
//       <section className="py-24 bg-dark-900 border-t border-white/5">
//          <CommunityFeedback />
//       </section>

//     </div>
//   );
// };

// // --- UTILITY: LIGHTWEIGHT FADE ---
// // A very simple wrapper that triggers once. 
// // Much lighter than complex scroll hooks.
// const FadeIn = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }} // Triggers slightly before element is in full view
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default Home;
import React from 'react';
import { motion } from 'framer-motion';

// --- COMPONENTS ---
// import Hero from '../components/home/Hero'; // <-- Replaced by PromoCarousel
import PromoCarousel from '../components/home/PromoCarousel';
import InfiniteBanner from '../components/home/InfiniteBanner'; 
import Essence from '../components/home/Essence';
import Process from '../components/home/Process';
import FeaturedProducts from '../components/home/ProductCard'; 
import CTASection from '../components/home/CTASection';
import CommunityFeedback from '../components/home/CommunityFeedback';
import Hero from '../components/home/Hero';

const Home = () => {
  return (
    // Base layout: Simple dark background
    <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-dark-900">
      
      {/* SECTION 1: DYNAMIC PROMO BANNER (HERO) */}
      <section className="relative z-0">
         <PromoCarousel />
      </section>

      <section className="relative ">
         <Hero />
      </section>

      {/* SECTION 2: SOCIAL PROOF */}
      {/* Added border-t-0 to merge seamlessly with the banner if needed, or keep border */}
      <div className="relative z-10 border-y border-white/5 bg-dark-900">
          <InfiniteBanner />
      </div>

      {/* SECTION 3: FEATURED PRODUCTS */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4">
         <FadeIn>
            <FeaturedProducts />
         </FadeIn>
      </section>

      {/* SECTION 4: SCIENCE & PROCESS */}
      <section className="py-24 bg-dark-900/50 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 space-y-24">
            <FadeIn>
              <Essence />
            </FadeIn>
            
            <FadeIn>
              <Process />
            </FadeIn>
         </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-20">
         <FadeIn>
             <CTASection />
         </FadeIn>
      </section>

      {/* SECTION 6: COMMUNITY */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
         <CommunityFeedback />
      </section>

    </div>
  );
};

// --- UTILITY: LIGHTWEIGHT FADE ---
const FadeIn = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Home;