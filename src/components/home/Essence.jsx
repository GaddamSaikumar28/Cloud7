
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Atom, Sparkles, Dna, Activity, Loader2 } from 'lucide-react';
import { essenceApi } from '../../api/essenceApi';

const Essence = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Parallax Scroll Hooks
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const rotateSlow = useTransform(scrollYProgress, [0, 1], [0, 360]);

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

  if (loading) {
    return (
        <div className="h-96 w-full flex items-center justify-center bg-dark-900">
             <Loader2 className="animate-spin text-brand-glow" />
        </div>
    );
  }

  // Defaults
  const content = data || {
    heading: "The Cloud7 Essence",
    subheading: "Bio-Available Engineering",
    paragraph_1: "The Cloud7 Essence is an aggregate bio-engineered nutritional complex.",
    paragraph_2: "Our unique formula combines particular co-enzymes.",
    footer_text: "Since inception, a high-resolving line has been our standard.",
    glow_color: "#0ea5e9"
  };

  return (
    <section className="relative py-12 overflow-hidden bg-dark-950">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* --- LEFT: VISUAL (Holographic Molecule) --- */}
        <div className="relative flex justify-center perspective-[1000px]">
            {/* Core Glow */}
            <div className="absolute inset-0 bg-brand-glow/10 blur-[60px] rounded-full animate-pulse-slow"></div>
            
            {/* The Molecule Engine */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                
                {/* Ring 1 (Horizontal) */}
                <motion.div 
                   style={{ border: `1px solid ${content.glow_color}40` }}
                   animate={{ rotateX: [70, 70], rotateZ: [0, 360] }}
                   transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                   className="absolute w-full h-full rounded-full border-t border-brand-glow shadow-[0_0_15px_rgba(14,165,233,0.2)]"
                >
                   <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full shadow-glow -translate-x-1/2 -translate-y-1/2" />
                </motion.div>

                {/* Ring 2 (Vertical Tilted) */}
                <motion.div 
                   style={{ border: `1px solid ${content.glow_color}40` }}
                   animate={{ rotateX: [0, 360], rotateY: [60, 60] }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[80%] h-[80%] rounded-full border-l border-brand-glow/80"
                >
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-brand-glow rounded-full -translate-x-1/2 translate-y-1/2" />
                </motion.div>

                {/* Ring 3 (Inner Chaotic) */}
                <motion.div 
                   animate={{ rotate: [360, 0], scale: [0.9, 1.1, 0.9] }}
                   transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                   className="absolute w-[50%] h-[50%] rounded-full border border-dashed border-white/20"
                />

                {/* Central Nucleus */}
                <div className="relative z-10 bg-gradient-to-br from-white to-slate-400 text-dark-900 p-6 rounded-full shadow-[0_0_50px_rgba(14,165,233,0.5)]">
                    <Atom size={48} className="animate-spin-slow" />
                </div>

                {/* Floating Particles */}
                <Particle orbitDuration={4} distance={140} size={4} />
                <Particle orbitDuration={7} distance={180} size={2} />
                <Particle orbitDuration={5} distance={100} size={3} />
            </div>
        </div>

        {/* --- RIGHT: TEXT CONTENT --- */}
        <motion.div 
           style={{ y: yParallax }}
           className="relative"
        >
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group"
            >
                {/* Card Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-3 mb-6">
                    <Dna className="text-brand-glow" size={20} />
                    <span className="text-xs font-bold text-brand-glow uppercase tracking-[0.25em]">
                        {content.subheading}
                    </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-white mb-8 leading-tight">
                    {content.heading.split(' ').map((word, i) => (
                        <span key={i} className={i % 2 !== 0 ? "font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400" : ""}>
                            {word} 
                        </span>
                    ))}{" "}
                </h2>
                
                <div className="space-y-6 text-slate-300 font-light leading-relaxed text-lg">
                    <p>{content.paragraph_1}</p>
                    <p className="flex gap-4">
                        <span className="w-1 h-auto bg-gradient-to-b from-brand-glow to-transparent rounded-full" />
                        <span>{content.paragraph_2}</span>
                    </p>
                </div>

                <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between">
                   <p className="text-[10px] uppercase tracking-widest text-slate-500 max-w-xs">
                       {content.footer_text}
                   </p>
                   <Activity className="text-brand-glow/50" size={24} />
                </div>
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

// Helper: Orbiting Particle
const Particle = ({ orbitDuration, distance, size }) => {
    return (
        <motion.div
           animate={{ rotate: 360 }}
           transition={{ duration: orbitDuration, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0"
        >
            <div 
               className="bg-white rounded-full shadow-[0_0_10px_white]"
               style={{ 
                   width: size, 
                   height: size, 
                   transform: `translate(${distance}px, 0)` 
               }} 
            />
        </motion.div>
    )
}

export default Essence;