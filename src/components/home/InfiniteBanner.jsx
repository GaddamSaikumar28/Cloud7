
// import React from 'react';
// import { Microscope, Leaf, FlaskConical, Flag } from 'lucide-react';

// const items = [
//   { icon: Microscope, text: "ALWAYS LAB TESTED" },
//   { icon: Leaf, text: "PURE KRATOM EXTRACT" },
//   { icon: FlaskConical, text: "RESEARCH BACKED" },
//   { icon: Flag, text: "PROUDLY USA MADE" },
// ];

// const InfiniteBanner = () => {
//   return (
//     <div className="w-full h-14 relative overflow-hidden z-20 border-y border-white/10">
      
//       {/* 1. Dynamic Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36]"></div>
      
//       {/* 2. Animated Gloss/Shimmer Overlay */}
//       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shimmer pointer-events-none"></div>

//       {/* 3. Scrolling Content (Right to Left) */}
//       <div className="absolute inset-0 flex items-center">
//         <div className="flex w-max animate-marquee">
//           {/* We repeat the items 4 times to ensure no gaps on wide screens */}
//           {[...Array(4)].map((_, i) => (
//             <div key={i} className="flex shrink-0">
//               {items.map((item, index) => (
//                 <div key={index} className="flex items-center px-8 lg:px-16 gap-3 group cursor-default">
//                   <item.icon className="w-5 h-5 text-brand-glow/80 group-hover:text-white transition-colors" strokeWidth={1.5} />
//                   <span className="text-white/90 font-bold tracking-widest text-xs uppercase group-hover:text-white transition-colors whitespace-nowrap">
//                     {item.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfiniteBanner;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react'; // Import all icons
import { bannerApi } from '../../api/bannerApi';

// Fallback defaults in case API fails or is loading
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
        if (data && data.length > 0) {
          setItems(data);
        } else {
          setItems(DEFAULTS);
        }
      } catch (err) {
        setItems(DEFAULTS);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  // Duplicate items to create the seamless infinite loop buffer
  // We repeat the list enough times to fill ultra-wide screens
  const content = [...items, ...items, ...items, ...items];

  if (loading) return <div className="h-14 bg-dark-900 border-y border-white/10" />;

  return (
    <div className="w-full h-14 relative overflow-hidden z-20 border-y border-white/10 bg-dark-900 group">
      
      {/* 1. Dynamic Gradient Background (Deep Teal/Blue) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36] opacity-90" />
      
      {/* 2. Animated Gloss/Shimmer Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

      {/* 3. Vignette Edges (Fade out effect) */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-20 pointer-events-none" />

      {/* 4. Scrolling Content */}
      <div className="absolute inset-0 flex items-center">
        <motion.div 
          className="flex min-w-full"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 30, // Adjust speed: higher = slower
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
          // Optional: Pause animation on hover for readability
          whileHover={{ animationPlayState: "paused" }} 
        >
          {content.map((item, index) => (
            <BannerItem key={`${item.id}-${index}`} item={item} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Banner Item ---
const BannerItem = ({ item }) => {
  // Dynamically resolve the icon component from Lucide
  // Fallback to 'Sparkles' if the icon name in DB is invalid
  const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Sparkles;

  return (
    <div className="flex items-center px-8 md:px-12 gap-3 shrink-0 select-none cursor-default group/item transition-colors">
      <IconComponent 
        className="w-4 h-4 md:w-5 md:h-5 text-brand-glow/70 group-hover/item:text-brand-glow group-hover/item:scale-110 transition-all duration-300" 
        strokeWidth={2} 
      />
      
      <span className="text-slate-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase group-hover/item:text-white transition-colors whitespace-nowrap">
        {item.text}
      </span>
      
      {/* Separator Dot (Optional aesthetic choice) */}
      <div className="w-1 h-1 rounded-full bg-white/10 ml-8 md:ml-12" />
    </div>
  );
};

export default InfiniteBanner;