
// import React from 'react';
// import { Leaf, FlaskConical, Pill, ShieldCheck } from 'lucide-react';
// import { motion } from 'framer-motion';

// const steps = [
//   { icon: Leaf, label: 'Harvest', description: "Sourced from mature trees." },
//   { icon: FlaskConical, label: 'Extraction', description: "Cold-press technology." },
//   { icon: Pill, label: 'Formulation', description: "Precise alkaloid blend." },
//   { icon: ShieldCheck, label: 'Quality Check', description: "Triple lab tested." },
// ];

// const Process = () => {
//   return (
//     <section className="py-32 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Title */}
//         <div className="text-center mb-24">
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Process</h2>
//             <p className="text-slate-400">From earth to experience.</p>
//         </div>

//         {/* The Wave Container */}
//         <div className="relative">
//             {/* Glowing Connecting Line (SVG Curve) */}
//             <svg className="absolute top-10 left-0 w-full h-40 hidden md:block pointer-events-none opacity-50" preserveAspectRatio="none">
//                 <path d="M0,20 C300,20 300,100 600,100 C900,100 900,20 1200,20" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
//                 <defs>
//                     <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                         <stop offset="0%" stopColor="transparent" />
//                         <stop offset="50%" stopColor="#a8c7fa" />
//                         <stop offset="100%" stopColor="transparent" />
//                     </linearGradient>
//                 </defs>
//             </svg>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//                 {steps.map((step, index) => (
//                 <motion.div 
//                     key={index}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.2 }}
//                     className={`flex flex-col items-center text-center ${index % 2 === 1 ? 'md:mt-20' : 'md:mt-0'}`} 
//                 >
//                     {/* Icon Circle */}
//                     <div className="w-24 h-24 rounded-full bg-dark-800 border border-white/10 flex items-center justify-center mb-6 relative group cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,199,250,0.3)] hover:border-brand-glow/50">
//                         <div className="absolute inset-0 rounded-full bg-brand-glow/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <step.icon className="w-10 h-10 text-slate-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
//                     </div>
                    
//                     <h3 className="text-white text-lg font-medium mb-2">{step.label}</h3>
//                     <p className="text-slate-500 text-sm max-w-[200px]">{step.description}</p>
//                 </motion.div>
//                 ))}
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Process;

import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react'; // Dynamic Icons
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { processApi } from '../../api/processApi';

const Process = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await processApi.getProcessData();
        if (result) setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return null; // Or a skeleton

  // Fallback if DB is empty
  const content = data || {
    heading: "The Process",
    subheading: "From earth to experience.",
    steps: []
  };

  const steps = content.steps;

  return (
    <section className="py-10 md:py-10 relative overflow-hidden bg-dark-900">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-24 relative">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 italic tracking-tighter uppercase">
                   {content.heading}
                </h2>
                <p className="text-slate-400 text-lg font-light tracking-wide">
                   {content.subheading}
                </p>
            </motion.div>
        </div>

        {/* --- DYNAMIC WAVE CONTAINER --- */}
        <div className="relative">
            
            {/* 1. CONNECTING LINE (Desktop Only) */}
            <div className="hidden md:block absolute top-[60px] left-0 w-full h-1 bg-white/5 rounded-full overflow-hidden">
               {/* Animated Beam travelling through the line */}
               <motion.div 
                 animate={{ x: ["-100%", "100%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 className="w-1/2 h-full bg-gradient-to-r from-transparent via-brand-glow to-transparent opacity-50 blur-sm"
               />
            </div>

            {/* 2. STEPS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                {steps.map((step, index) => {
                   // Dynamic Icon Resolution
                   const IconComponent = LucideIcons[step.icon_name] || LucideIcons.CircleDot;
                   
                   // Color Logic (Default to brand blue if missing)
                   const glowColor = step.accent_color || '#0ea5e9';

                   // "Wave" Offset Logic: Even items sit lower on desktop
                   const isEven = index % 2 !== 0;

                   return (
                    <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className={`relative flex flex-col items-center text-center group ${isEven ? 'md:mt-24' : 'md:mt-0'}`} 
                    >
                        {/* Vertical Connector Line (Mobile Only) */}
                        {index !== steps.length - 1 && (
                           <div className="md:hidden absolute top-20 bottom-[-48px] w-[2px] bg-gradient-to-b from-white/10 to-transparent left-1/2 -translate-x-1/2" />
                        )}

                        {/* ICON CONTAINER */}
                        <div className="relative mb-8">
                            {/* Outer Spinning Ring */}
                            <div 
                              className="absolute inset-[-8px] rounded-full border border-dashed border-white/20 animate-[spin_10s_linear_infinite]" 
                              style={{ borderColor: `${glowColor}30` }} // 30 = low opacity hex
                            />
                            
                            {/* Glow Orb */}
                            <div 
                              className="absolute inset-0 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{ backgroundColor: `${glowColor}40` }}
                            />

                            {/* The Circle */}
                            <div 
                              className="relative w-24 h-24 rounded-full bg-dark-800 border flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110"
                              style={{ borderColor: `${glowColor}50` }}
                            >
                                <IconComponent 
                                  size={36} 
                                  style={{ color: glowColor }}
                                  strokeWidth={1.5}
                                  className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                                />
                            </div>

                            {/* Step Number Badge */}
                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-900 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400 z-20">
                                {index + 1}
                            </div>
                        </div>
                        
                        {/* TEXT CONTENT */}
                        <div className="relative z-10 max-w-[240px]">
                            <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider group-hover:text-brand-glow transition-colors">
                                {step.label}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                {step.description}
                            </p>
                        </div>

                    </motion.div>
                   );
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;