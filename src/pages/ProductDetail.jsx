
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Truck, Zap, Star, ShoppingCart, 
  ChevronDown, Plus, Minus, MessageSquare, AlertCircle, 
  Maximize2, X, ChevronLeft, ChevronRight, User, Calendar
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  getProductDetail, 
  getSuggestedProducts, 
  submitProductReview 
} from '../api/productDetailApi';

const DUMMY_IMAGES = [
  "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+1",
  "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+2",
  "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+3"
];

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { slug } = useParams();

  // --- Data State ---
  const [product, setProduct] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Gallery State ---
  const [images, setImages] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // --- Selection State ---
  const [selections, setSelections] = useState({});
  const [activeVariant, setActiveVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- UI State ---
  const [openSection, setOpenSection] = useState('Highlights');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // 1. Load Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const data = await getProductDetail(slug);
        if (data) {
          setProduct(data);

          // Image Setup
          let imgList = [];
          if (data.cover_image_url) imgList.push(data.cover_image_url);
          if (data.gallery_images && Array.isArray(data.gallery_images)) {
            imgList.push(...data.gallery_images);
          }
          imgList = [...new Set(imgList)];
          if (imgList.length === 0) imgList = DUMMY_IMAGES;
          setImages(imgList);
          setActiveImgIndex(0);

          // Load Suggestions
          if (data.category_id) {
            const related = await getSuggestedProducts(data.category_id, data.id);
            setSuggestions(related);
          }

          // Auto-Select Logic: Pick the first valid variant available
          if (data.variantLookup && Object.keys(data.variantLookup).length > 0) {
            const allVariants = Object.entries(data.variantLookup);
            // Sort by price (Cheapest first)
            allVariants.sort(([, a], [, b]) => a.price - b.price);
            
            // Decode the first valid key
            const [firstKey] = allVariants[0];
            const defaults = {};
            firstKey.split('|').forEach(segment => {
              const [type, value] = segment.split(':');
              if (type && value) defaults[type] = value;
            });
            setSelections(defaults);
          }
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [slug]);

  // 2. Resolve Active Variant & Handle Dependencies
  useEffect(() => {
    if (!product) return;

    // Sanitize: Ensure we don't have "ghost" selections for options that don't exist in the UI
    const validKeys = Object.keys(product.dynamicOptions || {});
    const cleanSelections = {};
    validKeys.forEach(key => {
        if (selections[key]) cleanSelections[key] = selections[key];
    });

    const currentKey = Object.entries(cleanSelections)
      .map(([k, v]) => `${k}:${v}`)
      .sort()
      .join('|');
    
    const variant = product.variantLookup?.[currentKey];
    
    if (variant) {
      setActiveVariant(variant);
    } else {
      setActiveVariant(null);
    }
  }, [selections, product]);

  // --- LOGIC: Check availability given OTHER selections ---
  const isOptionAvailable = (targetType, targetValue) => {
    if (!product || !product.variantLookup) return false;
    
    // Check if this option + current other selections match ANY variant
    const otherSelections = { ...selections };
    delete otherSelections[targetType]; 

    const requiredSegments = Object.entries(otherSelections).map(([k, v]) => `${k}:${v}`);
    requiredSegments.push(`${targetType}:${targetValue}`);

    return Object.keys(product.variantLookup).some(key => {
        return requiredSegments.every(segment => key.includes(segment));
    });
  };

  const handleSelection = (type, value) => {
    // 1. Basic update
    let newSelections = { ...selections, [type]: value };
    
    // 2. SMART PRUNING:
    // If we select a Flavor that does NOT have a Size, remove Size from selections.
    // We check if the new combination (ignoring removed keys) is valid.
    
    // Find all variants that contain our NEW selection
    const potentialMatches = Object.keys(product.variantLookup).filter(key => 
      key.includes(`${type}:${value}`)
    );

    // If a currently selected key (e.g., "Size") is NOT present in ANY potential match for the new selection, remove it.
    Object.keys(newSelections).forEach(existingKey => {
      if (existingKey === type) return; // Don't remove what we just clicked

      const isKeyRelevant = potentialMatches.some(key => key.includes(`${existingKey}:`));
      
      if (!isKeyRelevant) {
        delete newSelections[existingKey];
      }
    });

    setSelections(newSelections);
    setErrorMsg('');
  };

  const handleAddToCart = () => {
    setErrorMsg('');
    if (!product) return;

    // Validate that we have a variant
    if (!activeVariant) {
       // Check if selections are incomplete
       const possibleKeys = Object.keys(product.dynamicOptions || {});
       const missing = possibleKeys.filter(key => !selections[key]);
       
       // Only complain about missing keys if they are actually required for a valid variant
       // (Simple check: if no variant is found, likely something is missing or invalid)
       if (missing.length > 0) {
           setErrorMsg(`Please select options.`);
       } else {
           setErrorMsg("This combination is unavailable.");
       }
       return;
    }

    if (activeVariant.stock <= 0) {
      setErrorMsg("Sorry, this item is out of stock.");
      return;
    }

    setIsAdding(true);
    addToCart(product, quantity, selections, activeVariant.id, activeVariant.price);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to leave a review.");
    setIsSubmittingReview(true);
    try {
      const newReview = await submitProductReview(product.id, user.id, reviewRating, reviewComment);
      setProduct(prev => ({
        ...prev,
        reviews: [newReview, ...prev.reviews],
        reviews_count: (prev.reviews_count || 0) + 1
      }));
      setReviewComment('');
      alert("Review submitted successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const getGlowColor = () => product?.image_color || 'from-cyan-500 to-blue-600';

  if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><div className="w-12 h-12 border-2 border-brand-glow border-t-transparent rounded-full animate-spin" /></div>;
  if (!product) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Product not found.</div>;

  const isOutOfStock = activeVariant && activeVariant.stock <= 0;

  return (
    <div className="min-h-screen pt-28 pb-20 relative bg-dark-900 overflow-x-hidden">
      
      {/* Background Ambient */}
      <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${getGlowColor()} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full">
              <X size={32} />
            </button>
            <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <img src={images[activeImgIndex]} alt="Full view" className="max-w-full max-h-full object-contain" loading="lazy" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
        {/* --- LEFT COLUMN: GALLERY --- */}
        <div className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-6">
          <div 
            className="relative w-full aspect-square group cursor-zoom-in rounded-3xl"
            onClick={() => setIsLightboxOpen(true)}
          >
             <div className={`absolute inset-4 -z-10 rounded-3xl bg-gradient-to-br ${getGlowColor()} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
             <div className="w-full h-full rounded-3xl overflow-hidden border border-white/5 bg-black/20 relative">
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={activeImgIndex}
                        src={images[activeImgIndex]} 
                        alt={product.name}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-contain p-2"
                    />
                </AnimatePresence>
             </div>
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-4">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2 ${idx === activeImgIndex ? `border-brand-glow` : 'border-transparent border-white/5 opacity-60'}`}
                    >
                        <img src={img} className="w-full h-full object-cover" loading="lazy"/>
                    </button>
                ))}
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN: DETAILS --- */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8 pb-20"
        >
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               {isOutOfStock ? (
                 <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/20 uppercase tracking-wide">
                    Out of Stock
                 </span>
               ) : (
                 <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
                    In Stock
                 </span>
               )}
               <div className="flex items-center text-yellow-500 text-sm">
                  <Star size={14} fill="currentColor" />
                  <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
               </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Dynamic Selectors */}
          {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
            <div key={type}>
                <div className="flex justify-between items-end mb-3">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select {type}</label>
                   {selections[type] && <span className="text-xs font-bold text-brand-glow">{selections[type]}</span>}
                </div>
                <div className="flex flex-wrap gap-3">
                  {options.map(opt => {
                    const isSelected = selections[type] === opt.name;
                    const isAvailable = isOptionAvailable(type, opt.name);

                    return (
                      <button
                        key={opt.name}
                        onClick={() => isAvailable && handleSelection(type, opt.name)}
                        disabled={!isAvailable}
                        className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
                          isSelected 
                          ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-105' 
                          : isAvailable
                            ? 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                            : 'border-white/5 bg-transparent text-slate-700 cursor-not-allowed opacity-50'
                        }`}
                      >
                        {opt.color && <div className={`w-3 h-3 rounded-full ${opt.color} shadow-sm`}></div>}
                        <span className="text-sm font-medium">{opt.name}</span>
                        {!isAvailable && <span className="absolute inset-0 flex items-center justify-center text-slate-500/20 rotate-45 pointer-events-none">|</span>}
                      </button>
                    );
                  })}
                </div>
            </div>
          ))}

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pricing & Cart */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm shadow-xl">
             <div className="flex justify-between items-center mb-6">
                <div>
                   <AnimatePresence mode='wait'>
                     <motion.div 
                       key={activeVariant ? activeVariant.price : 'empty'}
                       initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                       className="text-4xl font-bold text-white"
                     >
                       ${activeVariant ? activeVariant.price : '---'}
                     </motion.div>
                   </AnimatePresence>
                   <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      {isOutOfStock ? (
                         <span className="text-red-400 font-bold">Currently Out of Stock</span>
                      ) : activeVariant && activeVariant.stock < 10 ? (
                         <span className="text-orange-400 font-bold">Only {activeVariant.stock} left!</span>
                      ) : (
                         <><Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery</>
                      )}
                   </div>
                </div>
                
                <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
                   <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
                   <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
                </div>
             </div>

             <button 
               onClick={handleAddToCart}
               disabled={isAdding || isOutOfStock || !activeVariant}
               className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide flex items-center justify-center gap-2 relative overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                 isOutOfStock 
                 ? 'bg-slate-700 text-slate-400' 
                 : 'bg-gradient-to-r from-brand-cyan to-[#006080] text-white hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99]'
               }`}
             >
               {isAdding ? <span className="animate-pulse">Adding...</span> : 
                isOutOfStock ? "OUT OF STOCK" :
                <>ADD TO CART <ShoppingCart size={20} /></>
               }
             </button>
          </div>

          {/* Reviews List & Form */}
          <div className="space-y-6 pt-8 border-t border-white/10">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> REVIEWS ({product.reviews?.length})</h3>
              
              {/* Reviews List */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mb-8 max-h-[300px] overflow-y-auto custom-scrollbar space-y-4 pr-2">
                  {product.reviews.map(rev => (
                    <div key={rev.id} className="bg-dark-950 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-brand-glow/20 flex items-center justify-center text-brand-glow">
                             <User size={14} />
                          </div>
                          <div>
                            <p className="text-white text-sm font-bold">{rev.profiles?.first_name || 'User'} {rev.profiles?.last_name || ''}</p>
                            <div className="flex text-yellow-500">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} fill={i < rev.rating ? "currentColor" : "none"} className={i < rev.rating ? "" : "text-slate-700"} />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar size={10} /> {new Date(rev.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Review */}
              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4 border-t border-white/5 pt-4">
                  <p className="text-xs font-bold text-slate-500 uppercase">Write a review</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={24}
                        className={`cursor-pointer transition-colors ${star <= reviewRating ? "text-yellow-500" : "text-slate-600"}`}
                        fill={star <= reviewRating ? "currentColor" : "none"}
                        onClick={() => setReviewRating(star)}
                      />
                    ))}
                  </div>
                  <textarea 
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience..."
                    className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
                  />
                  <button 
                    disabled={isSubmittingReview}
                    className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
                  >
                    {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
                  </button>
                </form>
              ) : (
                <p className="text-slate-400 text-sm text-center py-4 bg-white/5 rounded-xl border border-white/5">
                   <Link to="/login" className="text-brand-glow hover:underline">Log in</Link> to leave a review.
                </p>
              )}
            </div>
          </div>

          {/* Highlights & Suggestions */}
          <div className="space-y-2">
              <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
                      {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </AccordionItem>
              <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
                  <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
                      {product.details?.ingredients?.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
              </AccordionItem>
          </div>

          {suggestions.length > 0 && (
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-white font-bold text-lg mb-4 uppercase tracking-widest">You May Also Like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {suggestions.map(s => (
                  <Link key={s.id} to={`/product/${s.slug}`} className="group">
                    <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color || 'from-gray-700 to-gray-800'} relative overflow-hidden mb-3 border border-white/5`}>
                        {s.cover_image_url && <img loading="lazy" src={s.cover_image_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />}
                    </div>
                    <h4 className="text-white font-medium text-xs group-hover:text-brand-glow transition-colors truncate">{s.name}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const AccordionItem = ({ title, isOpen, onClick, children }) => (
    <div className="border-b border-white/10 last:border-0">
        <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
            <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
            <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
        </button>
        <AnimatePresence>
            {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
        </AnimatePresence>
    </div>
);

export default ProductDetail;