
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeContentApi } from '../../api/homeContentApi';

const LabPreview = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await homeContentApi.getLatestLabResults();
        setBatches(data || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Minimal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-2">
              Lab Results
            </h2>
            <p className="text-zinc-500">
              Transparency in every batch. Verified by third-party labs.
            </p>
          </div>
          <Link 
            to="/science" 
            className="hidden md:flex items-center gap-2 text-white hover:text-zinc-300 transition-colors text-sm uppercase tracking-widest font-medium"
          >
            View All Reports <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {batches.slice(0, 4).map((batch, i) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/science/batch/${batch.batch}`} className="group block h-full">
                <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  
                  {/* Status Pill */}
                  <div className="absolute top-4 right-4 bg-green-900/30 border border-green-500/20 px-2 py-1 rounded-full flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Pass</span>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-square mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-all" />
                    <img 
                      src={batch.image || "https://placehold.co/400x400/png"} 
                      alt={batch.productName}
                      className="relative w-3/4 h-3/4 object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>

                  {/* Text Info */}
                  <div className="mt-auto">
                    <h3 className="text-white font-medium text-lg mb-1 truncate">
                      {batch.productName}
                    </h3>
                    <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-2">
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wider mb-0.5">Batch ID</p>
                        <p className="text-sm text-zinc-300 font-mono">{batch.batch}</p>
                      </div>
                      <span className="text-xs text-zinc-600">
                        {new Date(batch.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Link */}
        <div className="mt-8 md:hidden text-center">
           <Link to="/science" className="text-white text-sm border-b border-white/30 pb-0.5">
             View All Reports
           </Link>
        </div>

      </div>
    </section>
  );
};

export default LabPreview;