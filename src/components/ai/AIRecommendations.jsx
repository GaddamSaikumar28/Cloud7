// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import React from "react";  
// export const AIRecommendations = ({ currentProduct, allProducts }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getAiRecs = async () => {
//       try {
//         // 1. Initialize Gemini (Use an env variable for your key!)
//         const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
//         // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//         // 2. Build a context-aware prompt
//         const prompt = `
//           You are an expert shopping assistant for Cloud 7, a premium 7-Hydroxymitragynine brand.
          
//           CATALOG: ${JSON.stringify(allProducts.map(p => ({ id: p.id, name: p.name, desc: p.description })))}
//           CURRENT PRODUCT: ${currentProduct.name} - ${currentProduct.description}

//           Recommend 3 products from the catalog that would go well with the current one.
//           Return ONLY a raw JSON array of the product IDs. No text.
//         `;

//         const result = await model.generateContent(prompt);
//         const responseText = result.response.text();
        
//         // Clean and parse IDs
//         const recommendedIds = JSON.parse(responseText.replace(/```json|```/g, "").trim());
        
//         // Filter your mock data to get the full objects
//         const filtered = allProducts.filter(p => recommendedIds.includes(p.id) && p.id !== currentProduct.id);
//         setRecommendations(filtered);
//       } catch (error) {
//         console.error("AI Recommendation Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (currentProduct && allProducts.length > 0) getAiRecs();
//   }, [currentProduct, allProducts]);

//   if (loading) return <div className="animate-pulse text-slate-500">Curating suggestions...</div>;

//   return (
//     <div className="mt-20 border-t border-white/10 pt-12">
//       <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//         <span className="text-brand-glow">✨</span> Suggested for You
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {recommendations.map(item => (
//           <motion.div 
//             key={item.id}
//             whileHover={{ y: -5 }}
//             className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-brand-glow/50 transition-colors"
//           >
//             <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.imageColor} opacity-50 mb-4`} />
//             <h4 className="font-bold text-white mb-2">{item.name}</h4>
//             <p className="text-xs text-slate-400 line-clamp-2 mb-4">{item.description}</p>
//             <button className="text-brand-glow text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
//               View Product
//             </button>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

import { useEffect, useState, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIRecommendations = ({ currentProduct, allProducts }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  
  // Ref to prevent double-calls in React Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    const getAiRecs = async () => {
      // 1. Try to find cached data first
      const cacheKey = `cloud7_recs_${currentProduct.id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        setRecommendations(JSON.parse(cached));
        setIsAiGenerated(true);
        setLoading(false);
        return;
      }

      // 2. Prevent duplicate API calls
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
        // Using 2.0-flash for 2026 stability
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
          Context: Premium 7-Hydroxymitragynine store "Cloud 7".
          Catalog: ${JSON.stringify(allProducts.map(p => ({ id: p.id, name: p.name, cat: p.category })))}
          Current Item: ${currentProduct.name} (${currentProduct.category})
          
          Task: Recommend 3 product IDs that complement this item. 
          Return ONLY a JSON array of strings. No markdown.
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().replace(/```json|```/g, "").trim();
        const recommendedIds = JSON.parse(responseText);

        const finalRecs = allProducts.filter(p => 
          recommendedIds.includes(p.id) && p.id !== currentProduct.id
        );

        // Save to cache and state
        localStorage.setItem(cacheKey, JSON.stringify(finalRecs));
        setRecommendations(finalRecs);
        setIsAiGenerated(true);

      } catch (error) {
        console.error("AI Recs Failed, using fallback:", error);
        // 3. Fallback: If quota exceeded or 404, show different category items
        const fallback = allProducts
          .filter(p => p.id !== currentProduct.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        setRecommendations(fallback);
        setIsAiGenerated(false);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    hasFetched.current = false;
    getAiRecs();
  }, [currentProduct.id, allProducts]);

  if (loading) return (
    <div className="mt-20 py-10 border-t border-white/10 flex flex-col items-center">
      <div className="w-8 h-8 border-2 border-brand-glow border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-slate-500 text-sm animate-pulse tracking-widest uppercase">Analyzing Catalog...</p>
    </div>
  );

  return (
    <div className="mt-20 border-t border-white/10 pt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            Perfect Pairings
            {isAiGenerated && (
              <span className="flex items-center gap-1 bg-brand-glow/10 text-brand-glow text-[10px] px-2 py-1 rounded-full border border-brand-glow/20">
                <Sparkles size={10} /> AI POWERED
              </span>
            )}
          </h2>
          <p className="text-slate-400 mt-2">Selected to enhance your experience with {currentProduct.name}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {recommendations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.imageColor} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.imageColor} mb-6 flex items-center justify-center shadow-lg`}>
                   <span className="text-white text-xs font-black italic">C7</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {item.description}
                </p>

                <Link 
                  to={`/shop/${item.id}`}
                  className="flex items-center gap-2 text-brand-glow font-bold text-xs uppercase tracking-widest hover:text-white transition-colors"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIRecommendations;