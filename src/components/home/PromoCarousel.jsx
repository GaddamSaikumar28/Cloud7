
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPromoBanners } from '../../api/mainBannerApi';

// --- CONFIGURATION ---
const AUTOPLAY_DELAY = 6000;
const SWIPE_THRESHOLD = 10000;

const PromoCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const loadBanners = async () => {
      try {
        const data = await getPromoBanners();
        setBanners(data || []);
      } catch (err) {
        console.error("Failed to load banners", err);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []);

  // 2. Auto-Rotation Logic (Pauses on Hover)
  useEffect(() => {
    if (banners.length <= 1 || isHovered) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [currentIndex, banners.length, isHovered]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  }, [banners.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  }, [banners.length]);

  // --- RENDERING ---

  // Initial Loading State (Skeleton)
  if (loading) {
    return (
      <div className="w-full h-[500px] md:h-[650px] bg-dark-900 animate-pulse flex items-center justify-center border-b border-white/5">
        <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
      </div>
    );
  }

  // No Data State
  if (banners.length === 0) return null;

  return (
    <div 
      className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-dark-950 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- CAROUSEL TRACK --- */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 w-full h-full"
        >
           <SlideContent banner={banners[currentIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* --- GRADIENT OVERLAYS (For Seamless Integration) --- */}
      {/* Top Vignette */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark-950/80 to-transparent pointer-events-none z-10" />
      
      {/* Bottom Vignette & Blend */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent pointer-events-none z-10" />

      {/* --- CONTROLS --- */}
      
      {/* Navigation Buttons (Hidden on mobile, appear on hover for desktop) */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20 pointer-events-none">
        <button 
          onClick={handlePrev}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 text-white"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators / Progress Bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group/indicator relative h-1 transition-all duration-500 overflow-hidden rounded-full bg-white/20"
            style={{ 
              width: idx === currentIndex ? '48px' : '12px' 
            }}
          >
            {/* Active Progress Fill */}
            {idx === currentIndex && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute inset-0 bg-brand-glow" // Ensure brand-glow is defined in your tailwind config, or use 'bg-blue-500'
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Handles Smart Loading of Media ---
const SlideContent = ({ banner }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  
  // Decide if we wrap in a Link or just a Div
  const Wrapper = banner.link_url ? Link : 'div';
  const wrapperProps = banner.link_url ? { to: banner.link_url } : {};

  return (
    <Wrapper {...wrapperProps} className="block w-full h-full relative">
      
      {/* 1. LOADING STATE (Behind the image) */}
      {!mediaLoaded && (
        <div className="absolute inset-0 bg-dark-900 flex flex-col items-center justify-center z-0">
          <div className="relative">
             <div className="w-12 h-12 border-2 border-white/10 border-t-brand-glow rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* 2. MEDIA LAYER */}
      {banner.media_type === 'video' ? (
        <video
          src={banner.media_url}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            mediaLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setMediaLoaded(true)}
        />
      ) : (
        <img
          src={banner.media_url}
          alt={banner.title || 'Promo'}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            mediaLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setMediaLoaded(true)}
          loading="eager"
        />
      )}

      {/* 3. OPTIONAL TEXT OVERLAY (Glassmorphism) */}
      {/* Only renders if title exists. Adds a professional label look. */}
      {banner.title && (
         <div className="absolute bottom-16 left-6 md:left-12 z-20 max-w-lg">
            <motion.div 
               initial={{ y: 20, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="inline-block"
            >
              {/* Optional: Tag above title */}
              {/* <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-glow/90 text-black rounded mb-3 inline-block">
                New Arrival
              </span> */}
              
              {/* <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg mb-2">
                {banner.title}
              </h2> */}
            </motion.div>
         </div>
      )}
    </Wrapper>
  );
};

export default PromoCarousel;