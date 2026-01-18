import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ShieldCheck, User, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { reviewsApi } from '../../api/reviewsApi';

const CommunityFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate timer
  const timerRef = useRef(null);

  useEffect(() => {
    loadReviews();
    return () => stopAutoRotate();
  }, []);

  useEffect(() => {
    // Only auto-rotate if we have enough reviews
    if (reviews.length > 4) {
        startAutoRotate();
    }
  }, [reviews, activeIndex]);

  const loadReviews = async () => {
    try {
      const data = await reviewsApi.getFeaturedReviews();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startAutoRotate = () => {
    stopAutoRotate();
    timerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // 6 seconds per review
  };

  const stopAutoRotate = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleManualSelect = (index) => {
    setActiveIndex(index);
    stopAutoRotate();
  };

  // --- RENDER LOGIC ---

  if (loading) return (
    <div className="py-24 flex justify-center bg-dark-900 border-t border-white/5">
        <Loader2 className="animate-spin text-brand-glow" />
    </div>
  );

  if (reviews.length === 0) return null; // Hide section if no reviews

  return (
    <section className="py-8 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      
      {/* Ambient Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
                {/* <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-brand-glow font-bold uppercase tracking-widest text-xs mb-2"
                >
                    <MessageSquare size={14} /> Community Intelligence
                </motion.div> */}
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-light text-white"
                >
                    Voices of <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Customers</span>
                </motion.h2>
            </div>
            
            {/* Stats Summary */}
            <div className="flex items-center gap-6 text-right">
               <div>
                  <div className="text-3xl font-bold text-white">4.9<span className="text-lg text-slate-500">/5</span></div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Average Rating</div>
               </div>
               <div className="h-10 w-[1px] bg-white/10" />
               <div>
                  <div className="text-3xl font-bold text-white">10k+</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Happy Users</div>
               </div>
            </div>
        </div>

        {/* --- DYNAMIC LAYOUT SWITCHER --- */}
        {reviews.length < 5 ? (
            /* CASE 1: LOW DATA (Grid Layout) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, idx) => (
                    <StaticReviewCard key={review.id} review={review} index={idx} />
                ))}
            </div>
        ) : (
            /* CASE 2: HIGH DATA (Cinematic Spotlight Layout) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start h-auto lg:h-[500px]">
                
                {/* Left: The Spotlight (Active Review) */}
                <div className="lg:col-span-7 h-full flex flex-col justify-center">
                   <AnimatePresence mode='wait'>
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="relative"
                      >
                         <Quote size={80} className="absolute -top-12 -left-8 text-white/5" />
                         
                         <div className="relative z-10">
                             <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={24} 
                                        className={`${i < reviews[activeIndex].rating ? "fill-yellow-400 text-yellow-400" : "text-slate-700"} drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]`} 
                                    />
                                ))}
                             </div>

                             <h3 className="text-3xl md:text-5xl font-medium text-white leading-tight mb-8">
                                "{reviews[activeIndex].text}"
                             </h3>

                             <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 p-[1px]">
                                    <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center text-xl font-bold text-white">
                                        {reviews[activeIndex].user.charAt(0)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{reviews[activeIndex].user}</div>
                                    <div className="flex items-center gap-2 text-brand-glow text-sm font-bold uppercase tracking-wider">
                                       <ShieldCheck size={14} /> {reviews[activeIndex].role}
                                    </div>
                                </div>
                             </div>
                         </div>
                      </motion.div>
                   </AnimatePresence>
                </div>

                {/* Right: The Queue (Vertical List) */}
                <div className="lg:col-span-5 h-full overflow-hidden relative">
                    {/* Gradient Masks for scrolling look */}
                    <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-dark-900 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-dark-900 to-transparent z-10 pointer-events-none" />

                    <div className="flex flex-col gap-3 py-4">
                        {reviews.map((review, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={review.id}
                                    onClick={() => handleManualSelect(idx)}
                                    className={`relative p-4 rounded-xl text-left transition-all duration-300 group ${
                                        isActive 
                                        ? 'bg-white/10 border-l-4 border-brand-glow translate-x-2 shadow-[0_0_30px_rgba(0,0,0,0.5)]' 
                                        : 'bg-transparent border-l-4 border-transparent opacity-40 hover:opacity-80 hover:bg-white/5'
                                    }`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                                            {review.user}
                                        </span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={10} className={`${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-700"}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-400 line-clamp-2">"{review.text}"</p>
                                    
                                    {/* Active Progress Bar (Timer Visual) */}
                                    {isActive && (
                                        <motion.div 
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 6, ease: "linear" }}
                                            className="absolute bottom-0 left-0 h-[2px] bg-brand-glow/50"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

            </div>
        )}

      </div>
    </section>
  );
};

// Sub-component for Low Volume (Grid) Mode
const StaticReviewCard = ({ review, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-brand-glow/30 transition-all duration-300 group"
    >
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={`${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-slate-700"}`} />
            ))}
        </div>
        <Quote size={24} className="text-white/20 mb-4" />
        <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light group-hover:text-white transition-colors">
            "{review.text}"
        </p>
        <div className="flex items-center gap-3 pt-6 border-t border-white/5">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                <User size={18} />
            </div>
            <div>
                <div className="text-white font-bold text-sm">{review.user}</div>
                <div className="text-brand-glow text-xs uppercase font-bold tracking-wider flex items-center gap-1">
                    <ShieldCheck size={10} /> {review.role}
                </div>
            </div>
        </div>
    </motion.div>
);

export default CommunityFeedback;