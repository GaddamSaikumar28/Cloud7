
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Download, AlertCircle, Loader2 } from 'lucide-react';
import { getLabReportData } from '../api/labApi';

const LabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getLabReportData();
        setReports(data);
      } catch (err) {
        console.error("Failed to load lab reports:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // --- FILTER LOGIC ---
  const filteredReports = reports.filter(item => {
    const query = search.toLowerCase();
    return (
      item.productName.toLowerCase().includes(query) ||
      item.variantName.toLowerCase().includes(query) ||
      item.batch.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-dark-950 text-white font-sans selection:bg-brand-glow selection:text-dark-900">
      
      {/* HEADER SECTION */}
      <div className="pt-24 pb-8 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">
          Lab <span className="text-brand-glow">Results</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8">
          Transparency is our priority. Verify the potency and purity of your specific batch below.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-md mx-auto relative mb-12">
          <div className="absolute inset-0 bg-brand-glow/20 blur-xl rounded-full opacity-20" />
          <div className="relative bg-dark-900 border border-white/10 rounded-full flex items-center px-4 py-2.5 shadow-xl focus-within:border-brand-glow/50 transition-colors">
            <Search className="text-slate-500 mr-3" size={18} />
            <input 
              type="text" 
              placeholder="Search Product, Flavor or Batch ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 size={30} className="animate-spin text-brand-glow mb-3"/>
            <p className="text-xs font-bold uppercase tracking-widest">Loading Database...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="text-center py-20 opacity-50">
             <FileText size={40} className="mx-auto mb-3" />
             <p className="text-sm font-bold">No results found.</p>
          </div>
        ) : (
          /* GRID: 2 Cols Mobile, 4 Cols Desktop */
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {filteredReports.map((item, idx) => (
              <LabCard key={item.id} item={item} idx={idx} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

// --- SUB-COMPONENT: LAB CARD (Tiny Mobile Style) ---
const LabCard = ({ item, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05, duration: 0.3 }}
      className="group relative flex flex-col h-full"
    >
      <div className="flex-1 bg-dark-900 border border-white/5 rounded-xl p-2 md:p-5 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-glow/30 hover:bg-white/5 hover:-translate-y-1 hover:shadow-xl">
        
        {/* 1. PRODUCT NAME (Tiny Gray) */}
        <h5 className="text-[9px] md:text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5 truncate w-full">
          {item.productName}
        </h5>

        {/* 2. VARIANT NAME (Bold White) */}
        <h4 className="text-[11px] md:text-sm font-black text-white uppercase tracking-tight mb-2 truncate w-full">
          {item.variantName}
        </h4>

        {/* 3. BATCH BADGE */}
        <div className="mb-2">
           <span className="inline-block px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] md:text-[10px] font-mono text-slate-400">
             Batch: <span className="text-white">{item.batch}</span>
           </span>
        </div>

        {/* 4. IMAGE (Optimized aspect ratio) */}
        <div className="relative w-full aspect-[3/4] mb-3 md:mb-6 flex items-center justify-center p-1">
           <img 
            src={item.image} 
            alt={item.variantName}
            className="w-full h-full object-contain drop-shadow-md transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
           />
        </div>

        {/* 5. ACTION BUTTON */}
        {/* <div className="w-full mt-auto">
          {item.url ? (
             <a 
               href={item.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center justify-center gap-1 md:gap-2 w-full py-2 md:py-3 bg-white text-dark-950 font-bold text-[9px] md:text-xs uppercase tracking-widest rounded-lg hover:bg-brand-glow transition-colors"
             >
               <Download size={12} className="md:w-4 md:h-4" />
               <span className="truncate">View Report</span>
             </a>
          ) : (
             <button disabled className="w-full py-2 md:py-3 bg-white/5 text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-widest rounded-lg border border-white/5 cursor-not-allowed flex items-center justify-center gap-1">
               <AlertCircle size={12} /> Pending
             </button>
          )}
        </div> */}
        <div className="w-full mt-auto">
          {item.url ? (
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                /* CHANGED: text-dark-950 -> text-black */
                className="flex items-center justify-center gap-1 md:gap-2 w-full py-2 md:py-3 bg-white text-black font-bold text-[9px] md:text-xs uppercase tracking-widest rounded-lg hover:bg-brand-glow hover:text-black transition-colors shadow-lg"
              >
                <Download size={12} className="md:w-4 md:h-4" />
                <span className="truncate">View Report</span>
              </a>
          ) : (
              <button disabled className="w-full py-2 md:py-3 bg-white/5 text-slate-500 font-bold text-[9px] md:text-xs uppercase tracking-widest rounded-lg border border-white/5 cursor-not-allowed flex items-center justify-center gap-1">
                <AlertCircle size={12} /> Pending
              </button>
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default LabReports;