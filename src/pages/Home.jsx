
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, Zap, Play, Hexagon, Star } from 'lucide-react';

// // Components
// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import ScrollingTestimonials from '../components/home/ScrollingTestimonials';
// import FeaturedProducts from '../components/home/ProductCard'; 
// import CTASection from '../components/home/CTASection';
// import CommunityFeedback from '../components/home/CommunityFeedback';
// /**
//  * COMPONENT: Nebula Separator
//  * A localized, bright animated divider that sits BETWEEN sections.
//  * It does NOT dim the page; it adds energy.
//  */
// const NebulaSeparator = () => {
//   return (
//     <div className="relative w-full h-32 overflow-hidden pointer-events-none">
//        {/* Glowing Line */}
//        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-glow/50 to-transparent" />
       
//        {/* Moving 'Mist' only inside this divider */}
//        <motion.div 
//          animate={{ x: ["-25%", "0%"] }}
//          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
//          className="absolute inset-0 w-[200%] opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-glow/20 via-transparent to-transparent"
//        />
//        <motion.div 
//          animate={{ x: ["0%", "-25%"] }}
//          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//          className="absolute inset-0 w-[200%] opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent"
//        />
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <div className="relative min-h-screen bg-dark-950 overflow-x-hidden selection:bg-brand-glow selection:text-dark-900">
      
//       {/* 1. Subtle Ambient Background (Behind everything, but very faint) */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-glow/5 rounded-full blur-[120px]" />
//          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[100px]" />
//          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150" />
//       </div>

//       <div className="relative z-10 flex flex-col">
        
//         {/* --- HERO SECTION --- */}
//         <section className="pt-8 pb-12 relative">
//            <Hero />
//         </section>

//         {/* --- INFINITE BANNER --- */}
//         <div className="bg-dark-900 border-y border-white/10 relative z-20 shadow-2xl">
//            <InfiniteBanner />
//         </div>

//         <NebulaSeparator />

//         {/* --- FEATURED PRODUCTS (Sales Focus) --- */}
//         <section className="relative py-16 bg-gradient-to-b from-dark-950 to-dark-900">
//            <FeaturedProducts />
//         </section>

//         <NebulaSeparator />
//          <CTASection />

//         <NebulaSeparator />

//         {/* --- SCIENCE SECTION --- */}
//         <section className="relative py-12">
//            <Essence />
//         </section>

//         {/* --- PROCESS SECTION --- */}
//         <section className="bg-dark-900 py-12 border-t border-white/5">
//            <Process />
//         </section>

//         {/* --- TESTIMONIALS --- */}
//         <section className="py-20">
//            {/* <ScrollingTestimonials /> */}
//            <CommunityFeedback />

//         </section>

//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// --- COMPONENTS ---
import Hero from '../components/home/Hero';
import InfiniteBanner from '../components/home/InfiniteBanner'; 
import Essence from '../components/home/Essence';
import Process from '../components/home/Process';
import FeaturedProducts from '../components/home/ProductCard'; 
import CTASection from '../components/home/CTASection';
import CommunityFeedback from '../components/home/CommunityFeedback';

// --- ASSETS / ICONS ---
// (Assuming you have these installed via lucide-react)
import { Atom, Hexagon, Zap } from 'lucide-react';

const Home = () => {
  // Global Scroll Hooks for Parallax
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="relative min-h-screen bg-dark-950 overflow-x-hidden selection:bg-brand-glow selection:text-dark-900">
      
      {/* 1. SCROLL PROGRESS BAR (Fixed Top) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-glow origin-left z-[1000] shadow-[0_0_20px_#0ea5e9]"
        style={{ scaleX }}
      />

      {/* 2. CINEMATIC BACKGROUND SYSTEM */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Noise Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
         
         {/* Deep Space Gradients (Parallax) */}
         <motion.div style={{ y: backgroundY }} className="absolute inset-0">
             <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-brand-glow/10 rounded-full blur-[150px] mix-blend-screen" />
             <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
             <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
         </motion.div>

         {/* Floating Geometry (Decorative) */}
         <FloatingGeometry />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col">
        
        {/* SECTION 1: HERO */}
        <section className="relative pt-0 pb-0">
           <Hero />
           {/* Fade to Black at bottom of Hero for smooth transition */}
           <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
        </section>

        {/* SECTION 2: SOCIAL PROOF BANNER */}
        <div className="relative z-20 -mt-10 mb-20">
           <div className="transform -rotate-1 origin-left border-y border-white/10 bg-dark-900/80 backdrop-blur-md shadow-2xl">
              <InfiniteBanner />
           </div>
        </div>

        {/* SECTION 3: FEATURED PRODUCTS (The "Shop" Spotlight) */}
        <RevealSection className="relative py-24">
           {/* Spotlight Glow behind products */}
           {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />
            */}
           {/* <div className="relative z-10">
              <div className="text-center mb-16">
                 <span className="inline-block py-1 px-3 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-4">
                    The Collection
                 </span>
                 <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
                    Potency <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-white">Redefined</span>
                 </h2>
              </div> */}
              <FeaturedProducts />
           {/* </div> */}
        </RevealSection>

        {/* <NebulaSeparator /> */}

        {/* SECTION 4: THE LAB (Science & Process Combined) */}
        <section className="relative py-32 overflow-hidden">
           {/* Tech Grid Background specifically for this section */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
           
           <RevealSection>
              <Essence />
           </RevealSection>

           <div className="h-24" /> {/* Spacer */}

           <RevealSection>
              <Process />
           </RevealSection>
        </section>

        {/* <NebulaSeparator direction="left" /> */}

        {/* SECTION 5: CTA (High Energy) */}
        <RevealSection className="py-20 relative">
             <CTASection />
        </RevealSection>

        {/* SECTION 6: COMMUNITY (Reviews) */}
        <section className="relative py-24 bg-dark-900 border-t border-white/5">
           <CommunityFeedback />
        </section>

      </div>
    </div>
  );
};

// --- SUB-COMPONENT: ANIMATED SEPARATOR ---
const NebulaSeparator = ({ direction = "right" }) => {
  return (
    <div className="relative w-full h-px my-12 md:my-24 pointer-events-none overflow-visible">
       {/* The glowing line */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-glow/30 to-transparent" />
       
       {/* The Energy Pulse */}
       <motion.div 
         animate={{ x: direction === "right" ? ["-100%", "100%"] : ["100%", "-100%"] }}
         transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
         className="absolute top-[-1px] left-0 w-[40%] h-[3px] bg-gradient-to-r from-transparent via-brand-glow to-transparent blur-[2px]"
       />
       
       {/* Center Starburst */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-glow/10 rounded-full blur-[40px]" />
    </div>
  );
};

// --- SUB-COMPONENT: REVEAL WRAPPER ---
// Wraps sections to fade/slide them in as you scroll
const RevealSection = ({ children, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- SUB-COMPONENT: FLOATING GEOMETRY ---
// Purely decorative background elements
const FloatingGeometry = () => {
    return (
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
            {/* Element 1: Hexagon */}
            <motion.div 
                animate={{ y: [0, -40, 0], rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] left-[5%] text-brand-glow"
            >
                <Hexagon size={120} strokeWidth={0.5} />
            </motion.div>

            {/* Element 2: Atom */}
            <motion.div 
                animate={{ y: [0, 60, 0], rotate: [0, -180, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[40%] right-[5%] text-purple-500"
            >
                <Atom size={200} strokeWidth={0.5} />
            </motion.div>

            {/* Element 3: Spark */}
            <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[20%] left-[20%] text-white"
            >
                <Zap size={40} className="blur-sm" />
            </motion.div>
        </div>
    )
}

export default Home;