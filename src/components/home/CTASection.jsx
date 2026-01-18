import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Hexagon, Zap, Star, ShieldCheck, 
  Activity, Leaf, Loader2 
} from 'lucide-react';
import { ctaApi } from '../../api/ctaApi';

const CTASection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ctaData = await ctaApi.getActiveCTA();
        if (ctaData) setData(ctaData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return null; // Or a skeleton loader if preferred

  // Fallback defaults
  const content = data || {
    heading_line_1: "Level Up",
    heading_line_2: "Your Biology",
    body_text: "Stop guessing with your supplements.",
    cta_text: "Shop Full Catalog",
    cta_link: "/shop",
    features: ["Lab Tested", "Fast Acting"],
    review_stars: 5,
    review_title: "5-Star Potency",
    review_quote: "The most effective cognitive stack I've ever used.",
    review_author_label: "VERIFIED BUYER"
  };

  return (
    <section className="py-10 px-4 md:px-6 bg-dark-900 relative overflow-hidden">
       
       {/* Background Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="max-w-7xl mx-auto">
         <motion.div 
           initial={{ opacity: 0, y: 40, scale: 0.95 }}
           whileInView={{ opacity: 1, y: 0, scale: 1 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8 }}
           className="relative overflow-hidden rounded-[2.5rem] bg-dark-800 border border-white/10 shadow-2xl group"
         >
            {/* --- BACKGROUND ART --- */}
            {/* Deep gradient base */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-dark-900 to-black z-0" />
            
            {/* Animated Mesh Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-0 mask-image-gradient" />
            
            {/* Dynamic Glow Orb */}
            <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-brand-glow/10 to-transparent opacity-50 z-0 mix-blend-screen pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-20 items-center">
               
               {/* --- LEFT COLUMN: COPY & ACTION --- */}
               <div className="space-y-8">
                  <motion.h2 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]"
                  >
                     {content.heading_line_1} <br/>
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-400">
                        {content.heading_line_2}
                     </span>
                  </motion.h2>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-300 text-lg leading-relaxed max-w-md border-l-2 border-white/10 pl-6"
                  >
                     {content.body_text}
                  </motion.p>
                  
                  {/* Dynamic Feature Tags */}
                  <div className="flex flex-wrap gap-4">
                     {content.features?.map((feature, idx) => (
                        <FeatureTag key={idx} text={feature} delay={0.4 + (idx * 0.1)} />
                     ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                      <Link 
                        to={content.cta_link} 
                        className="relative inline-flex items-center gap-4 bg-white text-dark-950 px-10 py-5 rounded-xl font-black uppercase tracking-widest overflow-hidden hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] group/btn"
                      >
                         {/* Button Hover Shine Effect */}
                         <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 z-10" />
                         
                         <span className="relative z-20 flex items-center gap-3">
                            {content.cta_text} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                         </span>
                      </Link>
                  </motion.div>
               </div>
               
               {/* --- RIGHT COLUMN: VISUAL TESTIMONIAL --- */}
               <div className="relative h-64 lg:h-full min-h-[350px] flex items-center justify-center">
                  
                  {/* Rotating Glow Behind Card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-glow/30 to-purple-500/20 blur-[80px] rounded-full animate-pulse-slow" />
                  
                  {/* The Levitating Card */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [3, 0, 3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative bg-dark-900/60 backdrop-blur-2xl p-10 rounded-3xl border border-white/20 shadow-2xl max-w-sm mx-auto text-center"
                  >
                      {/* Decoration Badge */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-dark-800 border border-white/10 p-3 rounded-full shadow-lg">
                         <ShieldCheck className="text-brand-glow w-8 h-8" />
                      </div>

                      <div className="mt-4 flex justify-center gap-1 mb-6">
                        {[...Array(content.review_stars)].map((_, i) => (
                          <Star key={i} size={24} className="text-yellow-400 fill-yellow-400 drop-shadow-lg" />
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                        "{content.review_title}"
                      </h3>
                      
                      <p className="text-slate-300 text-sm italic leading-relaxed">
                        {content.review_quote}
                      </p>
                      
                      <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-brand-glow font-bold tracking-[0.2em] uppercase">
                           {content.review_author_label}
                        </span>
                      </div>
                  </motion.div>
               </div>
            </div>
         </motion.div>
       </div>
    </section>
  );
};

// Helper: Maps text string to a relevant icon randomly (or loosely matched) for visual flair
const FeatureTag = ({ text, delay }) => {
  // Simple logic to pick an icon based on keywords
  let Icon = Hexagon;
  if (text.toLowerCase().includes('lab')) Icon = Activity;
  if (text.toLowerCase().includes('fast')) Icon = Zap;
  if (text.toLowerCase().includes('pure') || text.toLowerCase().includes('bio')) Icon = Leaf;

  return (
    <motion.div 
       initial={{ opacity: 0, scale: 0.8 }}
       whileInView={{ opacity: 1, scale: 1 }}
       transition={{ delay }}
       className="flex items-center gap-2 bg-white/5 px-4 py-2.5 rounded-lg border border-white/10 hover:border-brand-glow/50 hover:bg-white/10 transition-colors cursor-default"
    >
       <Icon size={14} className="text-brand-glow" /> 
       <span className="text-xs font-bold text-white uppercase tracking-wider">{text}</span>
    </motion.div>
  );
};

export default CTASection;