
import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  { user: "Alex M.", text: "Absolutely game changing. The focus is unreal.", role: "Verified Buyer" },
  { user: "Sarah K.", text: "Best extraction quality I've found so far.", role: "Verified Buyer" },
  { user: "James P.", text: "Fast shipping and premium packaging.", role: "Verified Buyer" },
  { user: "Mike T.", text: "Potency is exactly as described. 10/10.", role: "Long-time User" },
  { user: "Davide R.", text: "Finally a brand that is consistent.", role: "Verified Buyer" },
];

const ReviewCard = ({ review }) => (
  <div className="w-[350px] bg-white/5 backdrop-blur-md border border-white/5 p-6 rounded-xl flex-shrink-0 mx-4 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
    <div className="flex justify-between items-start mb-4">
       <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
        ))}
       </div>
       <span className="text-[10px] text-slate-500 bg-white/5 px-2 py-1 rounded-full">{review.role}</span>
    </div>
    
    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light group-hover:text-white transition-colors">"{review.text}"</p>
    
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
          {review.user.charAt(0)}
      </div>
      <span className="text-slate-200 text-xs font-bold tracking-wide">{review.user}</span>
    </div>
  </div>
);

const ScrollingTestimonials = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden bg-dark-900 border-t border-white/5">
        <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-light text-white mb-2">Community Feedback</h2>
            <p className="text-slate-500 text-sm">Join thousands of optimized users.</p>
        </div>
        
        {/* Marquee Wrapper */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                {/* Loop 4x to ensure seamless infinity */}
                {[...reviews, ...reviews, ...reviews, ...reviews].map((review, i) => (
                    <ReviewCard key={i} review={review} />
                ))}
            </div>
            
            {/* Fade Gradients for smooth edges (CSS Mask Alternative) */}
            <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-dark-900 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-dark-900 to-transparent z-20 pointer-events-none"></div>
        </div>
    </section>
  );
};

export default ScrollingTestimonials;