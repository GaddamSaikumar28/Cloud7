// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Microscope, Activity, ShieldCheck, FileText, CheckCircle, Search } from 'lucide-react';

// const labBatches = [
//   { id: 'B-101', product: 'Cloud 7-OH Precision Tablets', date: 'Oct 24, 2023', purity: '99.8%', status: 'PASS' },
//   { id: 'B-102', product: 'Max Potency Cloud 7-OH', date: 'Oct 28, 2023', purity: '99.9%', status: 'PASS' },
//   { id: 'B-103', product: 'Nano-Shot Liquid', date: 'Nov 02, 2023', purity: '98.5%', status: 'PASS' },
// ];

// const Science = () => {
//   const [selectedBatch, setSelectedBatch] = useState(labBatches[0]);
//   const [isScanning, setIsScanning] = useState(false);

//   const handleBatchSelect = (batch) => {
//     setIsScanning(true);
//     setSelectedBatch(batch);
//     setTimeout(() => setIsScanning(false), 800); // Simulate scan delay
//   };

//   return (
//     <div className="min-h-screen pt-32 pb-20 bg-dark-900 text-white relative overflow-hidden">
      
//       {/* Background Tech Mesh */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Header */}
//         <div className="text-center mb-20">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-6"
//           >
//             <Microscope size={14} /> Clinical Grade Purity
//           </motion.div>
//           <h1 className="text-5xl md:text-7xl font-bold mb-6">The Science</h1>
//           <p className="text-slate-400 max-w-2xl mx-auto text-lg">
//             We don't guess. We verify. Every batch is subjected to rigorous HPLC analysis 
//             to ensure exact alkaloid content and zero contaminants.
//           </p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
//            <StatCard icon={Activity} value="99.8%" label="Average Purity" />
//            <StatCard icon={ShieldCheck} value="0.00%" label="Solvents Detected" />
//            <StatCard icon={Search} value="3x" label="Lab Tested" />
//         </div>

//         {/* Interactive Lab Viewer */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
//             {/* Batch List */}
//             <div className="lg:col-span-1 space-y-4">
//                 <h3 className="text-xl font-bold mb-4">Latest Lab Reports</h3>
//                 {labBatches.map((batch) => (
//                     <button
//                         key={batch.id}
//                         onClick={() => handleBatchSelect(batch)}
//                         className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center group ${
//                             selectedBatch.id === batch.id
//                             ? 'bg-brand-glow/10 border-brand-glow/50 shadow-[0_0_20px_rgba(168,199,250,0.1)]'
//                             : 'bg-white/5 border-white/5 hover:bg-white/10'
//                         }`}
//                     >
//                         <div>
//                             <div className="text-sm font-bold text-white group-hover:text-brand-glow transition-colors">{batch.product}</div>
//                             <div className="text-xs text-slate-500">Batch #{batch.id}</div>
//                         </div>
//                         <FileText size={18} className={selectedBatch.id === batch.id ? 'text-brand-glow' : 'text-slate-600'} />
//                     </button>
//                 ))}
//             </div>

//             {/* The Digital Certificate */}
//             <div className="lg:col-span-2 relative">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-brand-glow to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
//                 <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[400px] flex flex-col">
                    
//                     <AnimatePresence mode="wait">
//                         {isScanning ? (
//                             <motion.div 
//                                 key="scanning"
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 exit={{ opacity: 0 }}
//                                 className="absolute inset-0 flex flex-col items-center justify-center gap-4"
//                             >
//                                 <div className="w-16 h-16 border-4 border-brand-glow border-t-transparent rounded-full animate-spin"></div>
//                                 <span className="text-brand-glow font-mono text-sm animate-pulse">FETCHING HPLC DATA...</span>
//                             </motion.div>
//                         ) : (
//                             <motion.div 
//                                 key="result"
//                                 initial={{ opacity: 0, scale: 0.95 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 className="h-full flex flex-col"
//                             >
//                                 <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
//                                     <div>
//                                         <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Certificate of Analysis</div>
//                                         <h2 className="text-2xl font-bold text-white">{selectedBatch.product}</h2>
//                                     </div>
//                                     <div className="text-right">
//                                         <div className="text-3xl font-mono font-bold text-green-400">{selectedBatch.status}</div>
//                                         <div className="text-xs text-slate-500">Batch: {selectedBatch.id}</div>
//                                     </div>
//                                 </div>

//                                 <div className="grid grid-cols-2 gap-8 mb-8">
//                                     <ResultRow label="7-Hydroxymitragynine" value={selectedBatch.purity} isHigh />
//                                     <ResultRow label="Mitragynine" value="< 1.2%" />
//                                     <ResultRow label="Heavy Metals" value="Not Detected" />
//                                     <ResultRow label="Residual Solvents" value="Not Detected" />
//                                 </div>

//                                 <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
//                                     <div className="flex items-center gap-2">
//                                         <CheckCircle className="text-brand-glow" size={20} />
//                                         <span className="text-sm text-slate-300">Verified by Cloud7 Labs</span>
//                                     </div>
//                                     <button className="px-4 py-2 text-xs font-bold border border-white/20 rounded hover:bg-white hover:text-black transition-colors">
//                                         DOWNLOAD PDF
//                                     </button>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// const StatCard = ({ icon: Icon, value, label }) => (
//     <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-brand-glow/30 transition-colors">
//         <Icon className="text-brand-glow mb-4" size={32} strokeWidth={1.5} />
//         <div className="text-4xl font-bold text-white mb-1">{value}</div>
//         <div className="text-sm text-slate-400 uppercase tracking-wider">{label}</div>
//     </div>
// );

// const ResultRow = ({ label, value, isHigh }) => (
//     <div>
//         <div className="text-sm text-slate-500 mb-1">{label}</div>
//         <div className={`text-lg font-mono font-bold ${isHigh ? 'text-brand-glow' : 'text-white'}`}>{value}</div>
//     </div>
// );

// export default Science;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Search, ShieldCheck, Microscope, 
  FlaskConical, Download, ExternalLink, AlertCircle, Loader2
} from 'lucide-react';
import { getLabReportData } from '../api/labApi';

const LabReports = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getLabReportData();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load lab reports:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- FILTER LOGIC ---
  const filteredProducts = products.map(product => {
    // If searching, check Product Name OR specific Batch IDs inside variants
    const query = search.toLowerCase();
    const matchesProduct = product.name.toLowerCase().includes(query);
    
    // Filter the reports inside the product
    const matchingReports = product.reports.filter(r => 
      matchesProduct || 
      r.batch.toLowerCase().includes(query) ||
      r.name.toLowerCase().includes(query)
    );

    return { ...product, reports: matchingReports };
  }).filter(p => p.reports.length > 0); // Only show products that have matching reports

  return (
    <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-brand-glow/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-16 px-4 md:px-12 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-6"
        >
          <Microscope size={14} /> Transparency & Purity
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
          Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Analytics</span>
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
          Every batch is rigorously tested by ISO-certified third-party laboratories. 
          Search below to verify the potency and purity of your specific product.
        </p>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-glow to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
          <div className="relative bg-dark-950 border border-white/10 rounded-xl flex items-center p-2">
            <Search className="ml-3 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by Product Name, Flavor, or Batch ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent border-none text-white px-4 py-2 focus:outline-none placeholder:text-slate-600 font-medium"
            />
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 pb-24 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Loader2 size={40} className="animate-spin text-brand-glow mb-4"/>
            <p>Retrieving Batch Data...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
             <FlaskConical size={48} className="mx-auto text-slate-600 mb-4" />
             <h3 className="text-xl font-bold text-white">No Results Found</h3>
             <p className="text-slate-500">Try searching for a different batch ID or product name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {filteredProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    
                    {/* PRODUCT INFO COLUMN */}
                    <div className="lg:col-span-1 bg-black/20 p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="w-32 h-32 mb-6 rounded-2xl bg-white/5 p-2 border border-white/10">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600"><FileText/></div>
                            )}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                            <ShieldCheck size={12} /> Third-Party Verified
                        </div>
                    </div>

                    {/* REPORT LIST COLUMN */}
                    <div className="lg:col-span-3 p-0">
                        {/* Table Header (Hidden on Mobile) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5">
                            <div className="col-span-5">Variant Configuration</div>
                            <div className="col-span-3">Batch ID</div>
                            <div className="col-span-2">Date Tested</div>
                            <div className="col-span-2 text-right">Certificate</div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {product.reports.map((report) => (
                                <div key={report.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors group">
                                    
                                    {/* Variant Name */}
                                    <div className="col-span-1 md:col-span-5 flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-brand-glow shrink-0" />
                                        <span className="font-bold text-sm text-white">{report.name}</span>
                                    </div>

                                    {/* Batch */}
                                    <div className="col-span-1 md:col-span-3 flex items-center gap-2">
                                        <span className="md:hidden text-xs text-slate-500 uppercase font-bold">Batch:</span>
                                        <span className="font-mono text-xs text-brand-glow bg-brand-glow/10 px-2 py-1 rounded border border-brand-glow/20">
                                            {report.batch}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm text-slate-400">
                                        <span className="md:hidden text-xs text-slate-500 uppercase font-bold">Date:</span>
                                        {report.date ? new Date(report.date).toLocaleDateString() : 'N/A'}
                                    </div>

                                    {/* Action */}
                                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end">
                                        {report.url ? (
                                            <a 
                                                href={report.url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white text-dark-900 text-xs font-bold rounded-lg hover:bg-brand-glow transition-all active:scale-95 shadow-lg shadow-white/5 hover:shadow-brand-glow/20"
                                            >
                                                <Download size={14} /> 
                                                <span className="hidden lg:inline">COA</span>
                                                <span className="lg:hidden">Download</span>
                                            </a>
                                        ) : (
                                            <span className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-500 text-xs font-bold rounded-lg border border-white/5 cursor-not-allowed">
                                                <AlertCircle size={14} /> Pending
                                            </span>
                                        )}
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default LabReports;