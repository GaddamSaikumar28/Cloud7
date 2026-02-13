// // src/components/home/JournalSection.jsx
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowUpRight, Clock, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { homeContentApi } from '../../api/homeContentApi';

// const JournalSection = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await homeContentApi.getLatestArticles();
//         setArticles(data);
//       } catch(e) { console.error(e); } 
//       finally { setLoading(false); }
//     };
//     load();
//   }, []);

//   if (!loading && articles.length === 0) return null;

//   return (
//     <div className="py-24 max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
//             <div>
//                 <h3 className="text-brand-glow font-bold uppercase tracking-widest text-sm mb-3">The Journal</h3>
//                 <h2 className="text-4xl font-black text-white">Latest Intelligence</h2>
//             </div>
//             <Link to="/blog" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
//                 Read all articles <ArrowUpRight size={18} />
//             </Link>
//         </div>

//         {/* Grid */}
//         <div className="grid md:grid-cols-3 gap-8">
//             {articles.map((article, i) => (
//                 <motion.div
//                     key={article.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                     className="group flex flex-col h-full"
//                 >
//                     {/* Image */}
//                     <Link to={`/blog/${article.id}`} className="block overflow-hidden rounded-2xl mb-6 aspect-[4/3] relative">
//                         <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10" />
//                         <img 
//                             src={article.image_url || 'https://via.placeholder.com/800x600/101010/333333?text=Cloud7'} 
//                             alt={article.title}
//                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         />
//                     </Link>

//                     {/* Content */}
//                     <div className="flex-1 flex flex-col">
//                         <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
//                             <span className="text-brand-glow">{article.category}</span>
//                             <span className="flex items-center gap-1"><Clock size={12}/> {article.read_time}</span>
//                         </div>
                        
//                         <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-glow transition-colors leading-snug">
//                             <Link to={`/blog/${article.id}`}>{article.title}</Link>
//                         </h3>
                        
//                         <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
//                             {article.excerpt}
//                         </p>

//                         <div className="pt-4 border-t border-white/5 flex items-center gap-2">
//                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
//                                 <User size={12} className="text-white"/>
//                              </div>
//                              <span className="text-xs font-bold text-slate-500 uppercase">{article.author}</span>
//                         </div>
//                     </div>
//                 </motion.div>
//             ))}
//         </div>
        
//         {/* Mobile Link */}
//         <div className="mt-12 text-center md:hidden">
//             <Link to="/blog" className="inline-flex items-center gap-2 text-white font-bold border-b border-white/20 pb-1">
//                 Read all articles <ArrowUpRight size={18} />
//             </Link>
//         </div>
//     </div>
//   );
// };

// export default JournalSection;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeContentApi } from '../../api/homeContentApi';

const JournalSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await homeContentApi.getLatestArticles();
        setArticles(data);
      } catch(e) { console.error(e); } 
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (!loading && articles.length === 0) return null;

  return (
    <div className="relative py-32 bg-dark-950 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
            
            {/* COLORFUL HEADER */}
            <div className="mb-16 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-xs font-black uppercase tracking-widest mb-6">
                    <span className="flex items-center gap-2">
                        <Sparkles size={12} className="text-purple-400" />
                        The Cloud7 Journal
                    </span>
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                    LATEST <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow via-purple-500 to-pink-500">INTEL</span>
                </h2>
            </div>

            {/* VIBRANT GRID */}
            <div className="grid md:grid-cols-3 gap-8">
                {articles.map((article, i) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative flex flex-col h-full"
                    >
                        {/* Image Container with Colorful Glow */}
                        <div className="relative mb-6 rounded-2xl overflow-visible">
                            {/* Hover Glow Effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-70 blur-lg transition-opacity duration-500" />
                            
                            <Link to={`/blog/${article.id}`} className="relative block aspect-[4/3] rounded-2xl overflow-hidden bg-dark-900 border border-white/10 group-hover:border-transparent transition-colors">
                                <img 
                                    src={article.image_url || 'https://via.placeholder.com/800x600/101010/333333?text=Cloud7'} 
                                    alt={article.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                                />
                                {/* Category Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                                        <Tag size={10} className="text-brand-glow" /> {article.category}
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Text Content */}
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:text-brand-glow transition-colors">
                                <Link to={`/blog/${article.id}`}>
                                    {article.title}
                                </Link>
                            </h3>
                            <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                                {article.excerpt}
                            </p>
                            
                            <Link to={`/learn`} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-purple-400 transition-colors">
                                Read Article <ArrowUpRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    </div>
  );
};

export default JournalSection;