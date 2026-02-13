import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';

const Comparison = () => {
  // Data matching your screenshot
  const features = [
    { name: "Pure, clean ingredients", us: true, them: false },
    { name: "Consistent effects", us: true, them: false },
    { name: "Rapid onset", us: true, them: false },
    { name: "Variety of flavors", us: true, them: false },
    { name: "Excellent value per dose", us: true, them: false },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      
      {/* 1. Ambient Background Effects (Matches previous component) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* 2. Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            The <span className="text-cyan-400">Cloud 7</span> Difference
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg font-light max-w-2xl mx-auto"
          >
            Pure and potent Kratom products. Precision-formulated with 7-OH to maximize your experience.
          </motion.p>
        </div>

        {/* 3. The Comparison Grid */}
        <div className="relative">
          {/* Glass Container */}
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-white/10 bg-white/5">
              <div className="col-span-6 md:col-span-5 p-6 md:p-8 flex items-end">
                <span className="text-sm font-mono text-slate-500 uppercase tracking-widest">Comparison</span>
              </div>
              
              {/* Our Brand Header */}
              <div className="col-span-3 md:col-span-3 p-6 md:p-8 flex flex-col items-center justify-end border-l border-white/10 relative bg-cyan-500/5">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                {/* Logo Placeholder */}
                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter drop-shadow-lg">
                  Cloud 7
                </h3>
              </div>

              {/* Competitor Header */}
              <div className="col-span-3 md:col-span-4 p-6 md:p-8 flex flex-col items-center justify-end border-l border-white/10">
                <h3 className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest text-center">
                  Other Kratom<br className="hidden md:block" /> Products
                </h3>
              </div>
            </div>

            {/* Table Body (Rows) */}
            <div>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="grid grid-cols-12 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Feature Name */}
                  <div className="col-span-6 md:col-span-5 p-6 md:p-8 flex items-center">
                    <span className="text-slate-300 font-medium md:text-lg group-hover:text-white transition-colors">
                      {feature.name}
                    </span>
                  </div>

                  {/* Our Checkmark */}
                  <div className="col-span-3 md:col-span-3 p-6 md:p-8 flex items-center justify-center border-l border-white/10 bg-cyan-500/[0.02]">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                       <Check size={20} className="text-black stroke-[3px]" />
                    </div>
                  </div>

                  {/* Competitor X */}
                  <div className="col-span-3 md:col-span-4 p-6 md:p-8 flex items-center justify-center border-l border-white/10">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 border border-white/10">
                      <X size={20} className="text-slate-500" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Security Badge (Optional Professional Touch) */}
          <div className="mt-8 flex justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-slate-500">
                <ShieldCheck size={14} className="text-green-500" />
                <span>Lab Verified Purity Standards</span>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;