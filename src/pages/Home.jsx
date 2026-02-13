
import React from 'react';
import { motion } from 'framer-motion';

// --- CORE COMPONENTS ---
import PromoCarousel from '../components/home/PromoCarousel';
import Hero from '../components/home/Hero';
import InfiniteBanner from '../components/home/InfiniteBanner'; 
import FeaturedProducts from '../components/home/ProductCard'; 
import Essence from '../components/home/Essence';
import Process from '../components/home/Process';
import CTASection from '../components/home/CTASection';
import CommunityFeedback from '../components/home/CommunityFeedback';

// --- NEW COMPONENTS ---
import LabPreview from '../components/home/LabPreview';     // <--- NEW: Lab/Science
import JournalSection from '../components/home/JournalSection'; // <--- NEW: Blog/Articles
import Comparison from '../components/home/Comparision';
import PhotoMarquee from '../components/home/PhotoMarquee';
const Home = () => {
  return (
    // Base layout: Simple dark background
    <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-dark-900">
      
      {/* 1. HERO & PROMO */}
      <section className="relative z-0">
         <PromoCarousel />
      </section>

      <section className="relative">
         <Hero />
      </section>

      {/* 2. SOCIAL PROOF (Marquee) */}
      <div className="relative z-10 border-y border-white/5 bg-dark-900">
          <InfiniteBanner />
      </div>

      {/* 3. FEATURED PRODUCTS */}
      <section className="py-20 md:py-32 max-w-7xl mx-auto px-4">
         <FadeIn>
            <FeaturedProducts />
         </FadeIn>
      </section>

      <section className=" max-w-7xl mx-auto px-4">
         <FadeIn>
            <PhotoMarquee />
         </FadeIn>
      </section>

      {/* 4. SCIENCE & PROCESS (Combined) */}
      <section className="pt-24 bg-dark-900/50 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 space-y-24 mb-24">
            {/* <FadeIn>
              <Essence />
            </FadeIn> */}
            
            <FadeIn>
              <Process />
            </FadeIn>
         </div>

         {/* COMPARISON GRID (Full width) */}
         <FadeIn>
            <Comparison />
         </FadeIn>

         {/* NEW: LAB PREVIEW (Full width band) */}
         <FadeIn>
            <LabPreview />
         </FadeIn>
      </section>

      {/* 5. ARTICLES (Journal) */}
      <section className="bg-dark-950 border-t border-white/5">
         <FadeIn>
            <JournalSection />
         </FadeIn>
      </section>

      {/* 6. CTA & COMMUNITY */}
      <section className="py-20 bg-gradient-to-b from-dark-950 to-dark-900">
         <FadeIn>
             <CTASection />
         </FadeIn>
      </section>

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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Home;