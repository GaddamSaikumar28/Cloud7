import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPromoBanners } from '../../api/mainBannerApi';

const PromoCarousel = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Data
  useEffect(() => {
    const loadBanners = async () => {
      const data = await getPromoBanners();
      setBanners(data);
      setLoading(false);
    };
    loadBanners();
  }, []);

  // 2. Auto-Rotation Timer
  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Change every 6 seconds
    return () => clearInterval(timer);
  }, [currentIndex, banners.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  if (loading) return null; // Or a skeleton loader
  if (banners.length === 0) return null;

  return (
    <div className="relative group w-full overflow-hidden bg-dark-950">
      
      {/* ASPECT RATIO CONTAINER */}
      {/* Mobile: h-[50vh], Desktop: h-[600px] or dynamic based on content */}
      <div className="relative w-full h-[50vh] md:h-[600px]">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full"
          >
            <SlideContent banner={banners[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        {/* GRADIENT OVERLAY (Text Readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* NAVIGATION CONTROLS (Only if > 1 slide) */}
      {banners.length > 1 && (
        <>
          {/* Arrows - Hidden on Mobile, Visible on Hover Desktop */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-glow hover:text-dark-900 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-glow hover:text-dark-900 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-brand-glow' : 'w-2 bg-white/30 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// --- SUB-COMPONENT: HANDLES MEDIA TYPES ---
const SlideContent = ({ banner }) => {
  const ContentWrapper = banner.link_url ? Link : 'div';
  const props = banner.link_url ? { to: banner.link_url } : {};

  return (
    <ContentWrapper {...props} className="block w-full h-full relative">
      {banner.media_type === 'video' ? (
        <video
          src={banner.media_url}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline // CRITICAL for iOS
        />
      ) : (
        <img
          src={banner.media_url}
          alt={banner.title}
          className="w-full h-full object-cover"
          loading="eager" // Load current slide immediately
        />
      )}
      
      {/* OPTIONAL: TEXT OVERLAY IF YOU WANT IT OVER THE BANNER */}
      {/* <div className="absolute bottom-12 left-4 md:left-12 z-10 max-w-xl">
         <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">
           {banner.title}
         </h2>
      </div> */}
    </ContentWrapper>
  );
};

export default PromoCarousel;