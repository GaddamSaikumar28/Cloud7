
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Atom, Dna, Activity, Zap, Hexagon, Loader2 } from 'lucide-react';
import { essenceApi } from '../../api/essenceApi';

const Essence = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- PHYSICS ENGINE ---
  const { scrollYProgress } = useScroll();
  
  // The Reactor spins based on scroll position
  const rotateCore = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const essenceData = await essenceApi.getActiveEssence();
        if (essenceData) setData(essenceData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="h-96 w-full flex items-center justify-center"><Loader2 className="animate-spin text-white/20" /></div>;

  // Fallback Data
  const content = data || {
    heading: "The Cloud7 Essence",
    subheading: "Bio-Available Engineering",
    paragraph_1: "The Cloud7 Essence is an aggregate bio-engineered nutritional complex designed for maximum absorption.",
    paragraph_2: "We utilize cold-extraction technology to preserve the alkaloid profile, ensuring a clean, potent experience.",
    footer_text: "Lab Verified Potency"
  };

  return (
    <section className="relative py-24 md:py-40 bg-dark-950 overflow-hidden">
      
      {/* 1. BACKGROUND GRID (Technical Feel) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT COLUMN: THE BIO-REACTOR (Visual) --- */}
        <div className="relative flex items-center justify-center h-[400px] md:h-[600px] perspective-1000">
           
           {/* The Core Glow */}
           <div className="absolute w-[200px] h-[200px] bg-brand-glow/20 rounded-full blur-[80px] animate-pulse" />

           {/* Ring 1: Large Outer Shell */}
           <motion.div 
             style={{ rotate: rotateCore }}
             className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full flex items-center justify-center border-dashed"
           >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white/20 rounded-full" />
           </motion.div>

           {/* Ring 2: Middle Counter-Rotating */}
           <motion.div 
             style={{ rotate: rotateReverse }}
             className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] border border-white/10 rounded-full flex items-center justify-center"
           >
              <span className="absolute -top-3 bg-dark-950 px-2 text-[10px] text-brand-glow font-mono uppercase tracking-widest"></span>
           </motion.div>

           {/* Ring 3: Inner Nucleus (Icon) */}
           <motion.div 
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10 w-32 h-32 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.05)]"
           >
              <Atom size={48} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" strokeWidth={1} />
           </motion.div>

           {/* Floating Particles */}
           <Particle orbitDuration={10} distance={120} size={4} color="bg-brand-glow" />
           <Particle orbitDuration={15} distance={180} size={6} color="bg-white" />
           <Particle orbitDuration={20} distance={240} size={3} color="bg-slate-500" />
        </div>


        {/* --- RIGHT COLUMN: THE INTEL (Data) --- */}
        <motion.div 
          style={{ y: yContent }}
          className="relative"
        >
            {/* Header Block */}
            <div className="mb-10 pl-6 border-l-2 border-brand-glow/50 relative">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.5 }}
               >
                   <h4 className="text-brand-glow font-mono text-sm tracking-[0.3em] uppercase mb-2 flex items-center gap-2">
                      <Activity size={14} /> {content.subheading}
                   </h4>
                   <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                      {content.heading}
                   </h2>
               </motion.div>
            </div>

            {/* Glass Panels for Content */}
            <div className="space-y-6">
                
                {/* Panel 1 */}
                <GlassPanel delay={0.2} icon={Dna} label="Molecular Structure">
                   {content.paragraph_1}
                </GlassPanel>

                {/* Panel 2 */}
                <GlassPanel delay={0.4} icon={Zap} label="Bio-Availability">
                   {content.paragraph_2}
                </GlassPanel>

            </div>

            {/* Footer Stat */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="mt-10 flex items-center gap-4 text-slate-400"
            >
               <Hexagon size={18} className="text-brand-glow" />
               <span className="text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-1">
                  {content.footer_text}
               </span>
            </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

// --- SUB-COMPONENTS ---

// 1. Reusable Glass Panel with "Tech Corners"
const GlassPanel = ({ children, delay, icon: Icon, label }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="relative group"
  >
     {/* Background & Blur */}
     <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-lg -skew-x-6 transform transition-transform group-hover:skew-x-0 duration-500" />
     
     {/* Border Lines */}
     <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-brand-glow/50 rounded-tl-lg" />
     <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-brand-glow/50 rounded-br-lg" />

     <div className="relative p-6 pl-8">
        <div className="flex items-center gap-3 mb-3 text-white/50 group-hover:text-white transition-colors">
           <Icon size={18} />
           <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
        </div>
        <p className="text-slate-300 text-lg font-light leading-relaxed">
           {children}
        </p>
     </div>
  </motion.div>
);

// 2. Physics Particle (Orbiting)
const Particle = ({ orbitDuration, distance, size, color }) => (
    <motion.div
       animate={{ rotate: 360 }}
       transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
       className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-0"
    >
        <div 
           className={`rounded-full shadow-[0_0_10px_currentColor] ${color}`}
           style={{ 
               width: size, 
               height: size, 
               transform: `translate(${distance}px, 0)` // Push out to orbit radius
           }}
        />
    </motion.div>
);

export default Essence;