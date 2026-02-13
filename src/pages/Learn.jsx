
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { 
  ArrowRight, Clock, Loader2, Atom, Binary 
} from 'lucide-react';
import { learnApi } from '../api/learnApi';

const Learn = () => {
  const [articles, setArticles] = useState([]);
  const [values, setValues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  // Parallax Scroll Effect for Hero
  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch both Articles and Company Values in parallel
        const [articlesData, valuesData] = await Promise.all([
          learnApi.getArticles(),
          learnApi.getCompanyValues()
        ]);
        setArticles(articlesData || []);
        setValues(valuesData || []);
      } catch (err) {
        console.error("Failed to load content:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter Logic: Extract unique categories from data
  const categories = ['All', ...new Set(articles.map(a => a.category))];
  
  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(a => a.category === filter);

  if (loading) return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center">
      <Loader2 className="animate-spin text-brand-glow" size={32} />
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-black font-sans">
      
      {/* --- 1. HERO SECTION (Parallax) --- */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden flex items-center justify-center">
         <motion.div style={{ y: yHero }} className="absolute inset-0 z-0">
             {/* Abstract Digital Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-screen" />
             <div className="absolute inset-0 bg-gradient-to-b from-dark-950/80 via-dark-950/50 to-dark-950" />
         </motion.div>

         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6"
            >
               <Binary size={14} className="text-brand-glow" />
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-white">The Knowledge Base</span>
            </motion.div>
            
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6"
            >
               Research <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">&</span><br/>
               <span className="text-white">Development</span>
            </motion.h1>

            <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed"
            >
               Decoding the science behind 7-Hydroxymitragynine. 
               Explore our lab notes, extraction methodologies, and dosing protocols.
            </motion.p>
         </div>
      </div>

      {/* --- 2. ABOUT / MISSION SECTION --- */}
      <section className="py-24 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Visual Side (Image + Badge) */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative order-2 lg:order-1"
            >
               <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 relative group shadow-2xl">
                  <div className="absolute inset-0 bg-brand-glow/10 mix-blend-overlay z-10 pointer-events-none" />
                  <img 
                    src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2080&auto=format&fit=crop" 
                    alt="Lab" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0" 
                    loading="lazy"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-8 left-8 z-20 bg-dark-900/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 max-w-xs shadow-lg">
                     <Atom className="text-brand-glow mb-2" size={32} />
                     <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">Molecular Precision</p>
                     <p className="text-[10px] text-slate-400 leading-relaxed">Our iso-lateral extraction process ensures 99.8% purity in every single batch we produce.</p>
                  </div>
               </div>
            </motion.div>

            {/* Text Side (Dynamic Values) */}
            <div className="order-1 lg:order-2">
               <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
               >
                  We are <span className="text-brand-glow">Cloud7</span>. <br/>
                  <span className="font-light text-slate-400">Architects of Biology.</span>
               </motion.h2>

               <div className="space-y-8">
                  {values.length === 0 && (
                     <p className="text-slate-500">No company values found. Add them in the Admin Panel.</p>
                  )}
                  {values.map((val, idx) => {
                     // Dynamic Icon Mapping
                     const Icon = LucideIcons[val.icon_name] || LucideIcons.Zap;
                     return (
                        <motion.div 
                           key={val.id}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: idx * 0.1 }}
                           className="flex gap-6 group"
                        >
                           <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-glow group-hover:text-dark-900 transition-colors duration-300">
                              <Icon size={20} />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
                              <p className="text-slate-400 leading-relaxed text-sm">{val.description}</p>
                           </div>
                        </motion.div>
                     )
                  })}
               </div>
            </div>

         </div>
      </section>

      {/* --- 3. DYNAMIC ARTICLES GRID --- */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Latest Intelligence</h2>
                  <p className="text-slate-400 text-sm">Curated scientific literature and guides.</p>
               </div>
               
               {/* Filter Buttons */}
               <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                           filter === cat 
                           ? 'bg-brand-glow text-dark-900 border-brand-glow shadow-[0_0_15px_rgba(14,165,233,0.3)]' 
                           : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            {/* Grid */}
            {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredArticles.map((article, idx) => (
                    <ArticleCard key={article.id} article={article} index={idx} />
                ))}
                </div>
            ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                    <p className="text-slate-500">No articles found in this category.</p>
                </div>
            )}

         </div>
      </section>

    </div>
  );
};

/**
 * ------------------------------------------------------------------
 * ARTICLE CARD COMPONENT
 * Redesigned immersive card without "Read Article" button
 * ------------------------------------------------------------------
 */
const ArticleCard = ({ article, index }) => {
   const imageUrl = article.image_url || "https://via.placeholder.com/800x600/1a1a1a/ffffff?text=No+Image";

   return (
      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true }}
         transition={{ delay: index * 0.1 }}
         className="group relative h-[450px] w-full bg-dark-950 rounded-[2rem] overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
      >
         {/* Background Image with Zoom Effect */}
         <div className="absolute inset-0 overflow-hidden">
            <img 
               src={imageUrl} 
               alt={article.title} 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-50" 
               loading="lazy"
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
         </div>

         {/* Content Overlay */}
         <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
            
            {/* Top Badges */}
            <div className="absolute top-8 left-8 flex items-center gap-3">
               <span className="px-3 py-1 bg-brand-glow/10 backdrop-blur-md border border-brand-glow/20 text-brand-glow text-[10px] font-bold uppercase rounded-lg shadow-lg">
                  {article.category}
               </span>
               <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-black/40 px-3 py-1 rounded-lg backdrop-blur-md border border-white/5">
                  <Clock size={12} className="text-slate-400" /> {article.read_time}
               </div>
            </div>

            {/* Main Text Content */}
            <div className="relative z-10 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
               <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-[0.95] group-hover:text-brand-glow transition-colors">
                  {article.title}
               </h3>
               
               <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-2 opacity-80 group-hover:opacity-100 group-hover:line-clamp-none transition-all duration-500">
                  {article.excerpt}
               </p>

               {/* Interaction Indicator */}
               <div className="flex items-center gap-3 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <div className="h-[2px] w-12 bg-brand-glow" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">Read Analysis</span>
                  <ArrowRight size={14} className="text-brand-glow animate-pulse" />
               </div>
            </div>

         </div>
      </motion.div>
   );
};

export default Learn;