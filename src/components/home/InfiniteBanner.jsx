
import React, { useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { bannerApi } from '../../api/bannerApi';

// --- CONSTANTS ---
const DEFAULTS = [
  { text: "ALWAYS LAB TESTED", icon_name: "Microscope" },
  { text: "PURE KRATOM EXTRACT", icon_name: "Leaf" },
  { text: "RESEARCH BACKED", icon_name: "FlaskConical" },
  { text: "PROUDLY USA MADE", icon_name: "Flag" }
];

const InfiniteBanner = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await bannerApi.getActiveBannerItems();
        if (data && data.length > 0) setItems(data);
        else setItems(DEFAULTS);
      } catch (err) {
        setItems(DEFAULTS);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  if (loading) return <div className="h-12 bg-dark-900 border-y border-white/10" />;

  // We only need the base set of items. 
  // The CSS strategy will handle the duplication and seamless looping.
  return (
    <div className="w-full h-12 relative overflow-hidden z-20 border-y border-white/10 bg-dark-900 flex items-center">
      
      {/* 1. Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36] opacity-90" />
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

      {/* 2. Fade Edges (Vignette) */}
      <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#022c36] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#022c36] to-transparent z-20 pointer-events-none" />

      {/* 3. The Marquee Wrapper */}
      <div className="flex w-full overflow-hidden mask-image-linear-gradient">
        {/* We render TWO copies of the content track. 
            As one moves out of view, the second seamlessly replaces it. */}
        <MarqueeTrack items={items} />
        <MarqueeTrack items={items} />
      </div>

      {/* 4. Inject CSS for GPU Acceleration */}
      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        /* Mobile Speed Override: Much faster */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 12s; 
          }
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENT: The Moving Track ---
const MarqueeTrack = ({ items }) => {
  return (
    <div className="animate-marquee flex items-center min-w-full shrink-0 will-change-transform">
      {items.map((item, index) => {
        const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Sparkles;
        return (
          <div 
            key={`${item.id}-${index}`} 
            className="flex items-center px-6 md:px-12 gap-3 shrink-0 whitespace-nowrap"
          >
            <IconComponent 
              className="w-4 h-4 text-brand-glow/70" 
              strokeWidth={2.5} 
            />
            <span className="text-slate-200 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase">
              {item.text}
            </span>
            {/* Dot Separator */}
            <div className="w-1 h-1 rounded-full bg-brand-glow/30 ml-6 md:ml-12" />
          </div>
        );
      })}
    </div>
  );
};

export default InfiniteBanner;