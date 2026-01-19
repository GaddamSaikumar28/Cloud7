// // src/components/home/LabPreview.jsx
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ShieldCheck, Microscope, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { homeContentApi } from '../../api/homeContentApi';

// const LabPreview = () => {
//   const [batches, setBatches] = useState([]);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await homeContentApi.getLatestLabResults();
//         setBatches(data);
//       } catch (e) {
//         console.error(e);
//       }
//     };
//     load();
//   }, []);

//   return (
//     <div className="relative w-full bg-dark-900 border-y border-white/5 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center">
        
//         {/* LEFT: Text Content */}
//         <div className="space-y-8 relative z-10">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest"
//           >
//             <ShieldCheck size={14} /> 100% Verified Potency
//           </motion.div>
          
//           <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
//             Total Transparency. <br />
//             <span className="text-slate-500">Down to the molecule.</span>
//           </h2>
          
//           <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
//             We don't guess. Every single batch sent to your door has been third-party tested for purity, heavy metals, and potency. Scan your bottle to see the proof.
//           </p>

//           <Link 
//             to="/science" 
//             className="group inline-flex items-center gap-3 text-white font-bold text-lg border-b border-brand-glow pb-1 hover:text-brand-glow transition-colors"
//           >
//             View Full Lab Database <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
//           </Link>
//         </div>

//         {/* RIGHT: Live Feed Visualization */}
//         <div className="relative">
//             {/* Decorative Glow */}
//             <div className="absolute -inset-10 bg-brand-glow/20 blur-[100px] rounded-full opacity-50" />
            
//             <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8">
//                 <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
//                     <div className="flex items-center gap-3">
//                         <Microscope className="text-brand-glow" size={24} />
//                         <span className="font-bold text-white uppercase tracking-wider">Recent Analysis</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <span className="relative flex h-3 w-3">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                         </span>
//                         <span className="text-xs font-mono text-green-400">LIVE FEED</span>
//                     </div>
//                 </div>

//                 <div className="space-y-4">
//                     {batches.length > 0 ? batches.map((batch, i) => (
//                         <motion.div 
//                             key={batch.id}
//                             initial={{ opacity: 0, y: 10 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ delay: i * 0.1 }}
//                             className="flex items-center justify-between p-3 rounded-lg bg-dark-950/50 border border-white/5 hover:border-white/20 transition-colors group"
//                         >
//                             <div className="flex items-center gap-4">
//                                 <div className="h-10 w-10 bg-white/10 rounded-md flex items-center justify-center">
//                                     <FileText size={16} className="text-slate-400 group-hover:text-white transition-colors" />
//                                 </div>
//                                 <div>
//                                     <h4 className="font-bold text-sm text-white">{batch.productName}</h4>
//                                     <p className="text-xs text-slate-500 font-mono">BATCH: {batch.batch}</p>
//                                 </div>
//                             </div>
//                             <div className="text-right">
//                                 <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
//                                     <CheckCircle2 size={10} /> PASS
//                                 </div>
//                                 <p className="text-[10px] text-slate-600 mt-1">{new Date(batch.date).toLocaleDateString()}</p>
//                             </div>
//                         </motion.div>
//                     )) : (
//                         <p className="text-slate-500 text-sm text-center py-4">Loading verification data...</p>
//                     )}
//                 </div>

//                 {/* Card Footer */}
//                 <div className="mt-6 pt-4 border-t border-white/10 text-center">
//                     <p className="text-xs text-slate-500 uppercase tracking-widest">
//                         Certified by ISO 17025 Accredited Labs
//                     </p>
//                 </div>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LabPreview;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Check, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeContentApi } from '../../api/homeContentApi';

const LabPreview = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await homeContentApi.getLatestLabResults();
        setBatches(data);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <div className="relative w-full bg-dark-900 border-y border-white/5 overflow-hidden py-24">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
               <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
               <span className="text-xs font-bold uppercase tracking-widest text-green-500">
                 Third-Party Verified
               </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Purity You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-purple-500">Trace.</span>
            </h2>
            <p className="text-slate-400">
              Every batch is tested for potency and safety. We believe in radical transparency.
            </p>
          </div>

          <Link 
            to="/science" 
            className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-brand-glow transition-all font-bold text-sm uppercase tracking-widest text-white group"
          >
            Database <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* VERIFICATION GRID */}
        {/* Shows product images in a clean, high-end card style */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
           {batches.map((batch, i) => (
             <motion.div
               key={batch.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="group relative bg-white/5 border border-white/5 hover:border-brand-glow/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-glow/10"
             >
               {/* "Verified" Badge */}
               <div className="absolute top-3 right-3 z-10">
                  <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-1.5 rounded-full backdrop-blur-md">
                     <Check size={12} strokeWidth={3} />
                  </div>
               </div>

               {/* Product Image */}
               <div className="relative aspect-square mb-4 flex items-center justify-center bg-dark-950/30 rounded-xl overflow-hidden">
                  <img 
                    src={batch.image || "https://placehold.co/400x400/png"} 
                    alt={batch.productName}
                    className="w-3/4 h-3/4 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
                  />
               </div>

               {/* Info */}
               <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm truncate leading-tight group-hover:text-brand-glow transition-colors">
                    {batch.productName}
                  </h4>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                       Batch: <span className="text-slate-300">{batch.batch}</span>
                    </span>
                    <span className="text-[10px] text-slate-600">
                       {new Date(batch.date).toLocaleDateString()}
                    </span>
                  </div>
               </div>
             </motion.div>
           ))}

           {/* View All Card (Last item) */}
           <Link to="/science" className="group flex flex-col items-center justify-center bg-transparent border border-dashed border-white/10 rounded-2xl hover:border-brand-glow hover:bg-brand-glow/5 transition-all p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-brand-glow">
                 <FileText size={20} />
              </div>
              <span className="text-xs font-bold text-white uppercase tracking-widest">View All Reports</span>
           </Link>
        </div>

        {/* Mobile Button */}
        <div className="mt-8 md:hidden text-center">
           <Link to="/science" className="text-brand-glow font-bold uppercase text-sm border-b border-brand-glow/30 pb-1">
             View Full Database
           </Link>
        </div>

      </div>
    </div>
  );
};

export default LabPreview;