// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { Check, ShieldCheck, Truck, Zap, Star, ChevronDown, ShoppingCart } from 'lucide-react';
// // import { products } from '../data/mockData';

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
  
// //   // Find product from ID
// //   const product = products.find(p => p.id === id);
  
// //   // If not found, show loading or redirect (Simplified for now)
// //   if (!product) return <div className="text-white pt-40 text-center">Loading...</div>;

// //   // --- COMPONENT STATE ---
// //   const [selectedSize, setSelectedSize] = useState(product.variants.sizes[1]); // Default to middle size
// //   const [selectedFlavor, setSelectedFlavor] = useState(product.variants.flavors[0]);
// //   const [activeTab, setActiveTab] = useState('description');
// //   const [quantity, setQuantity] = useState(1);
// //   const [isAdding, setIsAdding] = useState(false);

// //   // --- ANIMATION VARIANTS ---
// //   const fadeInUp = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0 }
// //   };

// //   // Fake "Add to Cart" action
// //   const handleAddToCart = () => {
// //     setIsAdding(true);
// //     setTimeout(() => {
// //       setIsAdding(false);
// //       // Here you would dispatch to Redux/Context
// //       alert(`Added ${quantity}x ${product.name} (${selectedFlavor.name}) to cart!`);
// //     }, 1000);
// //   };

// //   return (
// //     <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      
// //       {/* Background Ambience (Dynamic Color based on selection) */}
// //       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${product.imageColor} blur-[150px] opacity-20 pointer-events-none -z-10 transition-colors duration-700`} />

// //       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
// //         {/* --- LEFT COLUMN: VISUALS --- */}
// //         <motion.div 
// //           initial="hidden" animate="visible" variants={fadeInUp}
// //           className="relative h-[500px] lg:h-[700px] flex items-center justify-center"
// //         >
// //           {/* Main Floating Object */}
// //           <motion.div 
// //             animate={{ y: [0, -20, 0] }}
// //             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// //             className="relative z-10 w-full max-w-md aspect-[3/4] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-12"
// //           >
// //              {/* Dynamic Flavor Glow */}
// //              <div className={`absolute inset-0 bg-gradient-to-tr ${product.imageColor} opacity-10 rounded-3xl transition-colors duration-500`} />
             
// //              {/* Product Image Placeholder */}
// //              <div className="w-48 h-64 bg-black rounded-lg shadow-2xl border border-white/20 relative overflow-hidden flex flex-col items-center justify-center">
// //                 <div className="text-2xl font-bold text-white">{product.name.split(" ")[0]}</div>
// //                 <div className="text-sm text-slate-400 mt-2">{selectedFlavor.name}</div>
// //                 <div className="text-xs text-brand-glow mt-1">{selectedSize.count} Count</div>
// //              </div>

// //              {/* Orbiting Pills Animation */}
// //              <div className="absolute inset-0 pointer-events-none">
// //                 <motion.div 
// //                   animate={{ rotate: 360 }}
// //                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //                   className="w-full h-full"
// //                 >
// //                    <div className={`absolute top-10 left-1/2 w-4 h-4 rounded-full ${selectedFlavor.color} shadow-[0_0_15px_currentColor]`} />
// //                    <div className={`absolute bottom-20 right-10 w-3 h-3 rounded-full ${selectedFlavor.color} shadow-[0_0_10px_currentColor] opacity-60`} />
// //                 </motion.div>
// //              </div>
// //           </motion.div>
// //         </motion.div>

// //         {/* --- RIGHT COLUMN: DETAILS --- */}
// //         <motion.div 
// //           initial="hidden" animate="visible" variants={fadeInUp} transition={{ delay: 0.2 }}
// //           className="flex flex-col gap-8"
// //         >
// //           {/* Header */}
// //           <div>
// //             <div className="flex items-center gap-2 mb-4">
// //                <span className="px-3 py-1 rounded-full bg-brand-glow/10 text-brand-glow text-xs font-bold border border-brand-glow/20">
// //                  IN STOCK
// //                </span>
// //                <div className="flex items-center text-yellow-500 text-sm">
// //                   <Star size={14} fill="currentColor" />
// //                   <span className="ml-1 text-slate-300">{product.rating} ({product.reviews} Reviews)</span>
// //                </div>
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{product.name}</h1>
// //             <p className="text-slate-400 text-lg">{product.description}</p>
// //           </div>

// //           <div className="h-px w-full bg-white/10" />

// //           {/* Configuration Grid */}
// //           <div className="space-y-6">
            
// //             {/* 1. Flavor Selector */}
// //             <div>
// //               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Flavor</label>
// //               <div className="flex flex-wrap gap-3">
// //                 {product.variants.flavors.map(flavor => (
// //                   <button
// //                     key={flavor.name}
// //                     onClick={() => setSelectedFlavor(flavor)}
// //                     className={`group relative px-6 py-3 rounded-xl border transition-all duration-300 ${
// //                       selectedFlavor.name === flavor.name 
// //                       ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_20px_rgba(168,199,250,0.1)]' 
// //                       : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
// //                     }`}
// //                   >
// //                     <span className="relative z-10 text-sm font-medium">{flavor.name}</span>
// //                     {selectedFlavor.name === flavor.name && (
// //                        <div className={`absolute bottom-0 left-0 w-full h-1 ${flavor.color} opacity-80`} />
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* 2. Size/Potency Selector */}
// //             <div>
// //               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Size</label>
// //               <div className="grid grid-cols-3 gap-4">
// //                 {product.variants.sizes.map(size => (
// //                   <button
// //                     key={size.count}
// //                     onClick={() => setSelectedSize(size)}
// //                     className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
// //                       selectedSize.count === size.count
// //                       ? 'border-brand-glow bg-brand-glow/10 text-white'
// //                       : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
// //                     }`}
// //                   >
// //                     <span className="text-lg font-bold">{size.count} Pack</span>
// //                     <span className="text-xs opacity-60">${(size.price / size.count).toFixed(2)} / unit</span>
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Pricing & Add to Cart */}
// //           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mt-4">
// //              <div className="flex justify-between items-center mb-6">
// //                 <div>
// //                    <div className="text-3xl font-bold text-white">${selectedSize.price}</div>
// //                    <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
// //                       <Zap size={12} fill="currentColor" /> Free Shipping available
// //                    </div>
// //                 </div>
                
// //                 {/* Quantity */}
// //                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10">
// //                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-slate-400 hover:text-white">-</button>
// //                    <span className="w-8 text-center text-white">{quantity}</span>
// //                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-slate-400 hover:text-white">+</button>
// //                 </div>
// //              </div>

// //              <button 
// //                onClick={handleAddToCart}
// //                disabled={isAdding}
// //                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
// //              >
// //                {isAdding ? (
// //                  <span className="animate-pulse">Processing Molecule...</span>
// //                ) : (
// //                  <>
// //                    ADD TO CART <ShoppingCart size={20} />
// //                  </>
// //                )}
// //              </button>
// //           </div>

// //           {/* Trust Badges */}
// //           <div className="grid grid-cols-3 gap-4 text-center">
// //              <TrustItem icon={ShieldCheck} text="3rd Party Lab Tested" />
// //              <TrustItem icon={Zap} text="Fast Acting Formula" />
// //              <TrustItem icon={Truck} text="Discreet Shipping" />
// //           </div>

// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TrustItem = ({ icon: Icon, text }) => (
// //   <div className="flex flex-col items-center gap-2 text-slate-500">
// //     <Icon className="text-brand-glow" size={20} />
// //     <span className="text-[10px] uppercase font-bold tracking-wide">{text}</span>
// //   </div>
// // );

// // export default ProductDetail;

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Check, ShieldCheck, Truck, Zap, Star, ShoppingCart, ChevronDown, Plus, Minus } from 'lucide-react';
// import { products } from '../data/mockData';

// const ProductDetail = () => {
//   const { id } = useParams();
  
//   // Find product or fallback to first item if ID mismatch (prevents crash)
//   const product = products.find(p => p.id === id) || products[0];

//   const [selectedSize, setSelectedSize] = useState(product.variants.sizes[1]);
//   const [selectedFlavor, setSelectedFlavor] = useState(product.variants.flavors[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
  
//   // State for Accordion sections
//   const [openSection, setOpenSection] = useState('Highlights');

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     setTimeout(() => setIsAdding(false), 1000);
//   };

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     <div className="min-h-screen pt-28 pb-20 relative overflow-hidden bg-dark-900">
      
//       {/* Dynamic Background Glow */}
//       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${product.imageColor} blur-[150px] opacity-10 pointer-events-none -z-10 transition-colors duration-1000`} />

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
//         {/* --- LEFT COLUMN: ANIMATED VISUALS --- */}
//         <div className="sticky top-32">
//           <motion.div 
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="relative h-[500px] lg:h-[600px] w-full flex items-center justify-center"
//           >
//              {/* Main Card */}
//              <div className="relative z-10 w-full max-w-sm aspect-[3/4] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden">
                 
//                  {/* Inner Glow */}
//                  <div className={`absolute inset-0 bg-gradient-to-tr ${product.imageColor} opacity-20 rounded-3xl`} />

//                  {/* Product Graphic (Placeholder for real image) */}
//                  <motion.div 
//                    animate={{ y: [0, -15, 0] }}
//                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                    className="relative w-48 h-64 bg-black rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center mb-8 z-20"
//                  >
//                     <div className="text-3xl font-black text-white italic tracking-tighter">7Tabz</div>
//                     <div className="text-xs text-brand-glow mt-2 uppercase tracking-widest">{selectedFlavor.name}</div>
                    
//                     {/* Floating Pills Effect */}
//                     {[...Array(3)].map((_, i) => (
//                         <motion.div
//                             key={i}
//                             animate={{ 
//                                 y: [0, -40, 0],
//                                 x: [0, i % 2 === 0 ? 20 : -20, 0],
//                                 rotate: [0, 45, 0]
//                             }}
//                             transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
//                             className={`absolute w-6 h-6 rounded-full ${selectedFlavor.color} shadow-lg opacity-80`}
//                             style={{ top: '80%', left: `${20 + (i * 30)}%` }}
//                         />
//                     ))}
//                  </motion.div>

//                  <div className="text-center z-20">
//                      <h3 className="text-white font-bold text-xl">{product.name}</h3>
//                      <p className="text-slate-400 text-sm">{selectedSize.count} Count Pack</p>
//                  </div>
//              </div>
//           </motion.div>
//         </div>

//         {/* --- RIGHT COLUMN: DETAILS & CONFIG --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-8"
//         >
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
//                  In Stock & Ready to Ship
//                </span>
//                <div className="flex items-center text-yellow-500 text-sm">
//                   <Star size={14} fill="currentColor" />
//                   <span className="ml-1 text-slate-300">{product.rating} ({product.reviews} Reviews)</span>
//                </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h1>
//             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
//           </div>

//           <div className="h-px w-full bg-white/10" />

//           {/* FLAVOR SELECTION */}
//           <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Flavor</label>
//               <div className="flex flex-wrap gap-3">
//                 {product.variants.flavors.map(flavor => (
//                   <button
//                     key={flavor.name}
//                     onClick={() => setSelectedFlavor(flavor)}
//                     className={`group relative px-5 py-2 rounded-lg border transition-all duration-300 ${
//                       selectedFlavor.name === flavor.name 
//                       ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(168,199,250,0.1)]' 
//                       : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                         <div className={`w-2 h-2 rounded-full ${flavor.color}`}></div>
//                         <span className="text-sm font-medium">{flavor.name}</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//           </div>

//           {/* SIZE SELECTION */}
//           <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Size</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {product.variants.sizes.map(size => (
//                   <button
//                     key={size.count}
//                     onClick={() => setSelectedSize(size)}
//                     className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
//                       selectedSize.count === size.count
//                       ? 'border-brand-glow bg-brand-glow/10 text-white'
//                       : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
//                     }`}
//                   >
//                     <span className="text-lg font-bold">{size.count} Pack</span>
//                     <span className="text-xs opacity-60">${(size.price / size.count).toFixed(2)} / unit</span>
//                   </button>
//                 ))}
//               </div>
//           </div>

//           {/* ADD TO CART CARD */}
//           <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
//              <div className="flex justify-between items-center mb-6">
//                 <div>
//                    <div className="text-3xl font-bold text-white">${selectedSize.price}</div>
//                    <div className="text-xs text-slate-400 mt-1">One-time purchase</div>
//                 </div>
                
//                 {/* Quantity */}
//                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-10">
//                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full text-slate-400 hover:text-white flex items-center justify-center"><Minus size={14}/></button>
//                    <span className="w-8 text-center text-white text-sm font-bold">{quantity}</span>
//                    <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full text-slate-400 hover:text-white flex items-center justify-center"><Plus size={14}/></button>
//                 </div>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
//              >
//                {isAdding ? <span className="animate-pulse">Processing...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
//              </button>
//           </div>

//           {/* --- NEW ACCORDION DETAILS SECTION --- */}
//           <div className="space-y-4">
//               <AccordionItem 
//                   title="HIGHLIGHTS" 
//                   isOpen={openSection === 'Highlights'} 
//                   onClick={() => toggleSection('Highlights')}
//               >
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details.highlights.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>

//               <AccordionItem 
//                   title="INGREDIENTS" 
//                   isOpen={openSection === 'Ingredients'} 
//                   onClick={() => toggleSection('Ingredients')}
//               >
//                   <div className="space-y-3 text-slate-300 text-sm">
//                       {product.details.ingredients.map((item, i) => <p key={i}>{item}</p>)}
//                   </div>
//               </AccordionItem>

//               <AccordionItem 
//                   title="RECOMMENDED USAGE" 
//                   isOpen={openSection === 'Usage'} 
//                   onClick={() => toggleSection('Usage')}
//               >
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details.usage.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>
//           </div>
          
//           {/* Trust Icons */}
//           <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
//              <TrustItem icon={ShieldCheck} text="Lab Tested" />
//              <TrustItem icon={Zap} text="Fast Acting" />
//              <TrustItem icon={Truck} text="USA Made" />
//           </div>

//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // Helper Components
// const AccordionItem = ({ title, isOpen, onClick, children }) => (
//     <div className="border-b border-white/10">
//         <button 
//             onClick={onClick}
//             className="w-full flex justify-between items-center py-4 text-left group"
//         >
//             <span className="text-sm font-bold text-white group-hover:text-brand-glow transition-colors">{title}</span>
//             <ChevronDown 
//                 size={16} 
//                 className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
//             />
//         </button>
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="overflow-hidden"
//                 >
//                     <div className="pb-6 pt-2">
//                         {children}
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     </div>
// );

// const TrustItem = ({ icon: Icon, text }) => (
//   <div className="flex flex-col items-center gap-2 text-slate-500">
//     <Icon className="text-brand-glow" size={20} />
//     <span className="text-[10px] uppercase font-bold tracking-wide">{text}</span>
//   </div>
// );

// export default ProductDetail;
// src/pages/ProductDetail.jsx

// // // import React from 'react';
// // // import { NavLink, Link } from 'react-router-dom';
// // // import { Search, ShoppingCart } from 'lucide-react';
// // // import clsx from 'clsx'; // Optional: helps with conditional classes
// // // import { useCart } from '../../context/CartContext';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { User, ChevronDown, LogOut } from 'lucide-react';
// // // import { useState } from 'react';
// // // const Navbar = () => {
// // //     const { user, logout } = useAuth(); // Get User State
// // //   const [showProfileMenu, setShowProfileMenu] = useState(false);

// // // const { getCartCount } = useCart();
// // //   const count = getCartCount();
// // //   return (
// // //     <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 w-full transition-all duration-300">
// // //       {/* Logo */}
// // //       <Link to="/" className="text-2xl font-bold tracking-tight text-white">
// // //         Cloud7
// // //       </Link>

// // //       {/* Navigation Links - Pill Shape */}
// // //       <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-2 rounded-full border border-white/10 shadow-lg">
// // //         <NavItem to="/shop">Shop</NavItem>
// // //         <NavItem to="/science">Lab Report</NavItem>
// // //         <NavItem to="/contact">Contact</NavItem>
// // //         {/* <NavItem to="/faqs">FAQs</NavItem> */}
// // //         <NavItem to="/learn">Learn</NavItem>
// // //       </div>

// // //       {/* Icons */}
// // //       <div className="flex items-center gap-6 text-slate-300">
// // //         <Search className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
// // //         {/* <Link to="/cart">
// // //             <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
// // //         </Link> */}
// // //        <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
// // //        <ShoppingCart size={24} />
// // //        {count > 0 && (
// // //          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-lg animate-pulse-slow">
// // //            {count}
// // //          </span>
// // //        )}
// // //     </Link>
// // //     <div className="relative">
// // //             {user ? (
// // //               // LOGGED IN STATE
// // //               <div className="relative">
// // //                 <button 
// // //                   onClick={() => setShowProfileMenu(!showProfileMenu)}
// // //                   className="flex items-center gap-2 text-sm font-bold text-white hover:text-brand-glow transition-colors"
// // //                 >
// // //                   <div className="w-8 h-8 rounded-full bg-brand-glow/20 flex items-center justify-center text-brand-glow border border-brand-glow/50">
// // //                     <User size={16} />
// // //                   </div>
// // //                   <span className="hidden md:block">{user.name}</span>
// // //                   <ChevronDown size={14} className="hidden md:block text-slate-500" />
// // //                 </button>

// // //                 {/* Dropdown Menu */}
// // //                 {showProfileMenu && (
// // //                   <div className="absolute right-0 mt-4 w-48 bg-dark-900 border border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
// // //                     <div className="px-4 py-2 border-b border-white/5 mb-2">
// // //                       <p className="text-xs text-slate-500">Signed in as</p>
// // //                       <p className="text-sm font-bold text-white truncate">{user.email}</p>
// // //                     </div>
// // //                     <Link to="/account" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">Account Settings</Link>
// // //                     <Link to="/orders" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">Order History</Link>
// // //                     <button 
// // //                       onClick={() => { logout(); setShowProfileMenu(false); }}
// // //                       className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 mt-2"
// // //                     >
// // //                       <LogOut size={14} /> Sign Out
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               // GUEST STATE
// // //               <Link to="/login" className="p-2 text-slate-400 hover:text-brand-glow transition-colors">
// // //                  <User size={24} />
// // //               </Link>
// // //             )}
// // //           </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // const NavItem = ({ to, children }) => (
// // //   <NavLink
// // //     to={to}
// // //     className={({ isActive }) =>
// // //       clsx(
// // //         "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
// // //         isActive
// // //           ? "bg-white/10 text-white shadow-glow-sm border border-white/10"
// // //           : "text-slate-400 hover:text-white hover:bg-white/5"
// // //       )
// // //     }
// // //   >
// // //     {children}
// // //   </NavLink>
// // // );

// // // export default Navbar;


// // // import React, { useState, useEffect } from 'react';
// // // import { NavLink, Link, useLocation } from 'react-router-dom';
// // // import { Search, ShoppingCart, User, ChevronDown, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
// // // import clsx from 'clsx';
// // // import { useCart } from '../../context/CartContext';
// // // import { useAuth } from '../../context/AuthContext';

// // // const Navbar = () => {
// // //   const { user, logout } = useAuth();
// // //   const { getCartCount } = useCart();
// // //   const location = useLocation();
  
// // //   const [showProfileMenu, setShowProfileMenu] = useState(false);
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //   const [isScrolled, setIsScrolled] = useState(false);

// // //   const count = getCartCount();
// // //   const isAdmin = user?.role === 'admin';

// // //   // Handle scroll effect for glassmorphism
// // //   useEffect(() => {
// // //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   // Close menus on navigation
// // //   useEffect(() => {
// // //     setIsMobileMenuOpen(false);
// // //     setShowProfileMenu(false);
// // //   }, [location]);

// // //   return (
// // //     <nav className={clsx(
// // //       "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4",
// // //       isScrolled ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
// // //     )}>
// // //       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
// // //         {/* Logo */}
// // //         <Link to="/" className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
// // //           CLOUD<span className="text-brand-glow">7</span>
// // //         </Link>

// // //         {/* Desktop Navigation - Pill Shape */}
// // //         <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/10 shadow-2xl">
// // //           <NavItem to="/shop">Shop</NavItem>
// // //           <NavItem to="/science">Lab Report</NavItem>
// // //           <NavItem to="/contact">Contact</NavItem>
// // //           <NavItem to="/learn">Learn</NavItem>
// // //         </div>

// // //         {/* Right Actions */}
// // //         <div className="flex items-center gap-2 md:gap-5 text-slate-300">
          
// // //           {/* Admin Shield Icon */}
// // //           {isAdmin && (
// // //             <Link 
// // //               to="/admin/dashboard" 
// // //               className="p-2 text-brand-glow hover:bg-brand-glow/10 rounded-full transition-all group"
// // //               title="Admin Panel"
// // //             >
// // //               <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
// // //             </Link>
// // //           )}

// // //           <button className="hidden sm:block p-2 hover:text-white transition-colors">
// // //             <Search size={20} />
// // //           </button>

// // //           {/* Cart Icon */}
// // //           <Link to="/cart" className="relative p-2 hover:text-white transition-colors">
// // //             <ShoppingCart size={22} />
// // //             {count > 0 && (
// // //               <span className="absolute top-0 right-0 w-5 h-5 bg-brand-glow text-dark-900 text-[10px] font-black flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,163,255,0.4)]">
// // //                 {count}
// // //               </span>
// // //             )}
// // //           </Link>

// // //           {/* Profile Section */}
// // //           <div className="relative hidden md:block">
// // //             {user ? (
// // //               <div className="relative">
// // //                 <button 
// // //                   onClick={() => setShowProfileMenu(!showProfileMenu)}
// // //                   className="flex items-center gap-2 p-1 pl-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
// // //                 >
// // //                   <span className="text-xs font-bold text-white">{user.name.split(' ')[0]}</span>
// // //                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs">
// // //                     {user.name.charAt(0)}
// // //                   </div>
// // //                 </button>

// // //                 {showProfileMenu && (
// // //                   <div className="absolute right-0 mt-4 w-56 bg-dark-900 border border-white/10 rounded-2xl shadow-2xl py-3 z-50 animate-in fade-in zoom-in-95">
// // //                     <div className="px-5 py-3 border-b border-white/5 mb-2">
// // //                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Account</p>
// // //                       <p className="text-sm font-bold text-white truncate">{user.email}</p>
// // //                     </div>
// // //                     <MenuLink to="/account" label="Settings" />
// // //                     <MenuLink to="/orders" label="Order History" />
// // //                     {isAdmin && <MenuLink to="/admin" label="Admin Dashboard" className="text-brand-glow" />}
                    
// // //                     <button 
// // //                       onClick={logout}
// // //                       className="w-full text-left px-5 py-2.5 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 mt-2 transition-colors"
// // //                     >
// // //                       <LogOut size={14} /> Sign Out
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             ) : (
// // //               <Link to="/login" className="p-2 hover:text-brand-glow transition-colors">
// // //                  <User size={22} />
// // //               </Link>
// // //             )}
// // //           </div>

// // //           {/* Mobile Menu Toggle */}
// // //           <button 
// // //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// // //             className="md:hidden p-2 text-white"
// // //           >
// // //             {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Menu Overlay */}
// // //       <div className={clsx(
// // //         "fixed inset-0 bg-dark-900 z-[90] md:hidden transition-all duration-500 flex flex-col p-8 pt-24",
// // //         isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
// // //       )}>
// // //         <div className="flex flex-col gap-6 text-center">
// // //           <MobileNavItem to="/shop">Shop All</MobileNavItem>
// // //           <MobileNavItem to="/science">Science & Lab</MobileNavItem>
// // //           <MobileNavItem to="/learn">Learn</MobileNavItem>
// // //           <MobileNavItem to="/contact">Contact</MobileNavItem>
// // //           <div className="h-px bg-white/5 my-4" />
// // //           {user ? (
// // //             <>
// // //               <MobileNavItem to="/orders">My Orders</MobileNavItem>
// // //               <button onClick={logout} className="text-red-400 text-2xl font-bold">Logout</button>
// // //             </>
// // //           ) : (
// // //             <MobileNavItem to="/login">Login / Register</MobileNavItem>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // // Sub-components for cleaner code
// // // const NavItem = ({ to, children }) => (
// // //   <NavLink
// // //     to={to}
// // //     className={({ isActive }) =>
// // //       clsx(
// // //         "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300",
// // //         isActive
// // //           ? "bg-white text-dark-900 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
// // //           : "text-slate-400 hover:text-white hover:bg-white/5"
// // //       )
// // //     }
// // //   >
// // //     {children}
// // //   </NavLink>
// // // );

// // // const MobileNavItem = ({ to, children }) => (
// // //   <Link to={to} className="text-3xl font-black text-white hover:text-brand-glow transition-colors italic uppercase tracking-tighter">
// // //     {children}
// // //   </Link>
// // // );

// // // const MenuLink = ({ to, label, className }) => (
// // //   <Link to={to} className={clsx("block px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors", className)}>
// // //     {label}
// // //   </Link>
// // // );

// // // export default Navbar;

// // import React, { useState, useEffect } from 'react';
// // import { NavLink, Link, useLocation } from 'react-router-dom';
// // import { Search, ShoppingCart, User, LogOut, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import clsx from 'clsx';
// // import { useCart } from '../../context/CartContext';
// // import { useAuth } from '../../context/AuthContext';

// // const Navbar = () => {
// //   const { user, logout } = useAuth();
// //   const { getCartCount } = useCart();
// //   const location = useLocation();
  
// //   const [showProfileMenu, setShowProfileMenu] = useState(false);
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   const count = getCartCount();
// //   const isAdmin = user?.role === 'admin';

// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   useEffect(() => {
// //     setIsMobileMenuOpen(false);
// //     setShowProfileMenu(false);
// //     // Prevent scrolling when mobile menu is open
// //     document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
// //   }, [location, isMobileMenuOpen]);

// //   return (
// //     <>
// //       <nav className={clsx(
// //         "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-12 py-4",
// //         isScrolled ? "bg-dark-900/60 backdrop-blur-2xl border-b border-white/5 py-3" : "bg-transparent"
// //       )}>
// //         <div className="max-w-7xl mx-auto flex justify-between items-center">
          
// //           {/* LOGO */}
// //           <Link to="/" className="relative z-[110] text-2xl font-black tracking-tighter text-white flex items-center gap-1 group">
// //             <span className="group-hover:text-brand-glow transition-colors">CLOUD</span>
// //             <span className="bg-brand-glow text-dark-900 px-1.5 rounded italic">7</span>
// //           </Link>

// //           {/* DESKTOP NAV */}
// //           <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/10">
// //             <NavItem to="/shop">Shop</NavItem>
// //             <NavItem to="/science">Lab Report</NavItem>
// //             <NavItem to="/learn">Learn</NavItem>
// //             <NavItem to="/contact">Contact</NavItem>
// //           </div>

// //           {/* ACTIONS */}
// //           <div className="flex items-center gap-3 md:gap-6 relative z-[110]">
            
// //             {/* Search - Hidden on tiny screens */}
// //             <button className="hidden sm:flex p-2 text-slate-400 hover:text-brand-glow transition-colors">
// //               <Search size={20} />
// //             </button>

// //             {/* Cart Icon */}
// //             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all hover:scale-110">
// //               <ShoppingCart size={22} />
// //               {count > 0 && (
// //                 <motion.span 
// //                   initial={{ scale: 0 }} animate={{ scale: 1 }}
// //                   className="absolute top-0 right-0 w-5 h-5 bg-brand-glow text-dark-900 text-[10px] font-black flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(var(--brand-glow-rgb),0.5)]"
// //                 >
// //                   {count}
// //                 </motion.span>
// //               )}
// //             </Link>

// //             {/* Admin Shield (Desktop Only) */}
// //             {isAdmin && (
// //               <Link to="/admin/dashboard" className="hidden md:flex p-2 text-brand-glow hover:bg-brand-glow/10 rounded-full transition-all border border-brand-glow/20">
// //                 <ShieldCheck size={20} />
// //               </Link>
// //             )}

// //             {/* Profile (Desktop Only) */}
// //             <div className="relative hidden md:block">
// //               {user ? (
// //                 <button 
// //                   onClick={() => setShowProfileMenu(!showProfileMenu)}
// //                   className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-brand-glow/50 transition-all"
// //                 >
// //                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
// //                     {user.name.charAt(0)}
// //                   </div>
// //                   <span className="text-xs font-bold text-white uppercase tracking-tighter">Profile</span>
// //                 </button>
// //               ) : (
// //                 <Link to="/login" className="flex items-center gap-2 px-5 py-2 rounded-full bg-white text-dark-900 text-xs font-black uppercase tracking-widest hover:bg-brand-glow transition-all">
// //                    Login
// //                 </Link>
// //               )}

// //               {/* Profile Dropdown */}
// //               <AnimatePresence>
// //                 {showProfileMenu && user && (
// //                   <motion.div 
// //                     initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
// //                     className="absolute right-0 mt-4 w-60 bg-dark-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden"
// //                   >
// //                     <div className="px-5 py-3 border-b border-white/5 mb-2 bg-white/5">
// //                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Authenticated User</p>
// //                       <p className="text-sm font-bold text-white truncate">{user.email}</p>
// //                     </div>
// //                     <MenuLink to="/account" label="Account Settings" icon={<User size={14}/>} />
// //                     <MenuLink to="/orders" label="My Orders" icon={<ShoppingCart size={14}/>} />
// //                     {isAdmin && <MenuLink to="/admin" label="Admin Terminal" className="text-brand-glow" icon={<ShieldCheck size={14}/>} />}
// //                     <button onClick={logout} className="w-full text-left px-5 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors border-t border-white/5 mt-2">
// //                       <LogOut size={14} /> SIGN OUT
// //                     </button>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>

// //             {/* MOBILE MENU TOGGLE */}
// //             <button 
// //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //               className="p-2 text-white hover:bg-white/5 rounded-full transition-colors"
// //             >
// //               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* FULLSCREEN MOBILE OVERLAY */}
// //       <AnimatePresence>
// //         {isMobileMenuOpen && (
// //           <motion.div 
// //             initial={{ opacity: 0, x: '100%' }}
// //             animate={{ opacity: 1, x: 0 }}
// //             exit={{ opacity: 0, x: '100%' }}
// //             transition={{ type: "spring", damping: 25, stiffness: 200 }}
// //             className="fixed inset-0 bg-dark-950 z-[105] flex flex-col p-8 pt-32"
// //           >
// //             {/* Background Accent */}
// //             <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-brand-glow/10 blur-[120px] rounded-full pointer-events-none" />

// //             {/* Mobile Nav Links */}
// //             <div className="flex flex-col gap-4 mb-12">
// //               <MobileNavItem to="/shop" number="01">Catalog</MobileNavItem>
// //               <MobileNavItem to="/science" number="02">Lab Report</MobileNavItem>
// //               <MobileNavItem to="/learn" number="03">Research</MobileNavItem>
// //               <MobileNavItem to="/contact" number="04">Support</MobileNavItem>
// //             </div>

// //             {/* Mobile Account Section */}
// //             <div className="mt-auto border-t border-white/10 pt-8 pb-12">
// //               {user ? (
// //                 <div className="space-y-6">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 rounded-full bg-brand-glow flex items-center justify-center text-dark-900 font-black text-xl italic">
// //                       {user.name.charAt(0)}
// //                     </div>
// //                     <div>
// //                       <p className="text-white font-black text-xl uppercase tracking-tighter">{user.name}</p>
// //                       <p className="text-slate-400 text-sm">{user.email}</p>
// //                     </div>
// //                   </div>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <Link to="/orders" className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold text-center">Orders</Link>
// //                     <Link to="/account" className="bg-white/5 border border-white/10 p-4 rounded-2xl text-white font-bold text-center">Profile</Link>
// //                     {isAdmin && <Link to="/admin" className="col-span-2 border border-brand-glow/30 p-4 rounded-2xl text-brand-glow font-bold text-center">Admin Panel</Link>}
// //                   </div>
// //                   <button onClick={logout} className="w-full p-4 text-red-400 font-black uppercase tracking-widest text-sm border border-red-400/20 rounded-2xl">Sign Out</button>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-4">
// //                   <p className="text-slate-500 font-bold uppercase tracking-widest text-xs text-center mb-4">Access Protocol</p>
// //                   <Link to="/login" className="flex items-center justify-between bg-white text-dark-900 p-6 rounded-2xl font-black text-xl italic group">
// //                     LOGIN <ArrowRight className="group-hover:translate-x-2 transition-transform" />
// //                   </Link>
// //                   <Link to="/register" className="flex items-center justify-between border border-white/20 text-white p-6 rounded-2xl font-black text-xl italic group">
// //                     SIGN UP <ArrowRight className="group-hover:translate-x-2 transition-transform" />
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // // Sub-components
// // const NavItem = ({ to, children }) => (
// //   <NavLink
// //     to={to}
// //     className={({ isActive }) =>
// //       clsx(
// //         "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300",
// //         isActive
// //           ? "bg-white text-dark-900 shadow-xl"
// //           : "text-slate-400 hover:text-white hover:bg-white/5"
// //       )
// //     }
// //   >
// //     {children}
// //   </NavLink>
// // );

// // const MobileNavItem = ({ to, children, number }) => (
// //   <Link to={to} className="flex items-end gap-4 group">
// //     <span className="text-brand-glow font-black text-sm mb-2 opacity-50">{number}</span>
// //     <span className="text-5xl font-black text-white group-hover:text-brand-glow transition-colors italic uppercase tracking-tighter">
// //       {children}
// //     </span>
// //   </Link>
// // );

// // const MenuLink = ({ to, label, icon, className }) => (
// //   <Link to={to} className={clsx("flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-widest", className)}>
// //     {icon} {label}
// //   </Link>
// // );

// // export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { Search, ShoppingCart, User, LogOut, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { getCartCount } = useCart();
//   const location = useLocation();
  
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const count = getCartCount();
//   const isAdmin = user?.role === 'admin';

//   // Handle scroll effect for glassmorphism
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close menus on navigation and prevent body scroll when mobile menu is open
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setShowProfileMenu(false);
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [location, isMobileMenuOpen]);

//   return (
//     <>
//       <nav className={clsx(
//         "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 py-4",
//         isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
//       )}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
          
//           {/* Logo */}
//           <Link to="/" className="relative z-[110] text-2xl font-black tracking-tighter text-white flex items-center gap-1 group">
//             CLOUD<span className="text-brand-glow">7</span>
//           </Link>

//           {/* Desktop Navigation - Center Pill */}
//           <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/10">
//             <NavItem to="/shop">Shop</NavItem>
//             <NavItem to="/science">Lab Report</NavItem>
//             <NavItem to="/learn">Learn</NavItem>
//             <NavItem to="/contact">Contact</NavItem>
//           </div>

//           {/* Right Actions */}
//           <div className="flex items-center gap-3 md:gap-5 relative z-[110]">
            
//             <button className="hidden sm:block p-2 text-slate-400 hover:text-white transition-colors">
//               <Search size={20} />
//             </button>

//             {/* Cart Icon */}
//             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all">
//               <ShoppingCart size={22} />
//               {count > 0 && (
//                 <span className="absolute top-0 right-0 w-5 h-5 bg-brand-glow text-dark-900 text-[10px] font-black flex items-center justify-center rounded-full shadow-[0_0_15px_rgba(0,163,255,0.4)]">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* Profile Section (Desktop) */}
//             <div className="relative hidden md:block">
//               {user ? (
//                 <div className="relative">
//                   <button 
//                     onClick={() => setShowProfileMenu(!showProfileMenu)}
//                     className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all"
//                   >
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs">
//                       {user.name.charAt(0)}
//                     </div>
//                     <span className="text-xs font-bold text-white uppercase tracking-tighter">Profile</span>
//                   </button>

//                   <AnimatePresence>
//                     {showProfileMenu && (
//                       <motion.div 
//                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                         className="absolute right-0 mt-4 w-56 bg-dark-900 border border-white/10 rounded-2xl shadow-2xl py-3 overflow-hidden"
//                       >
//                         <div className="px-5 py-3 border-b border-white/5 mb-2 bg-white/5">
//                           <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Account</p>
//                           <p className="text-sm font-bold text-white truncate">{user.email}</p>
//                         </div>
//                         <MenuLink to="/account" label="Settings" icon={<User size={14}/>} />
//                         <MenuLink to="/orders" label="Order History" icon={<ShoppingCart size={14}/>} />
//                         {isAdmin && <MenuLink to="/admin" label="Admin Terminal" className="text-brand-glow" icon={<ShieldCheck size={14}/>} />}
//                         <button 
//                           onClick={logout}
//                           className="w-full text-left px-5 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-3 mt-2 border-t border-white/5"
//                         >
//                           <LogOut size={14} /> SIGN OUT
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               ) : (
//                 <Link to="/login" className="px-6 py-2 rounded-full bg-white text-dark-900 text-xs font-black uppercase tracking-widest hover:bg-brand-glow transition-all shadow-lg shadow-white/5">
//                    Login
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Menu Toggle (Visible only on Mobile) */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-white hover:bg-white/5 rounded-full transition-colors"
//             >
//               {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Fullscreen Mobile Menu Overlay */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed inset-0 bg-dark-950 z-[95] md:hidden flex flex-col p-8 pt-32"
//           >
//             {/* Background Glow */}
//             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-glow/10 blur-[100px] rounded-full" />

//             <div className="flex flex-col gap-6">
//               <MobileNavItem to="/shop" number="01">Shop All</MobileNavItem>
//               <MobileNavItem to="/science" number="02">Lab Report</MobileNavItem>
//               <MobileNavItem to="/learn" number="03">Research</MobileNavItem>
//               <MobileNavItem to="/contact" number="04">Contact</MobileNavItem>
//             </div>

//             <div className="mt-auto pb-12 space-y-4">
//               {user ? (
//                 <div className="space-y-4">
//                     <div className="h-px bg-white/10 w-full mb-6" />
//                     <Link to="/account" className="flex items-center gap-4 group">
//                         <div className="w-12 h-12 rounded-full bg-brand-glow flex items-center justify-center text-dark-900 font-black text-xl italic">{user.name.charAt(0)}</div>
//                         <div>
//                             <p className="text-white font-black text-xl italic uppercase">{user.name}</p>
//                             <p className="text-slate-500 text-sm">View Profile</p>
//                         </div>
//                     </Link>
//                     <button onClick={logout} className="w-full py-4 text-red-400 font-black tracking-widest text-xs border border-red-400/20 rounded-xl">LOGOUT</button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 gap-3 pt-8">
//                   <Link to="/login" className="flex items-center justify-between bg-white text-dark-900 p-6 rounded-2xl font-black text-xl italic uppercase group">
//                     Login <ArrowRight className="group-hover:translate-x-2 transition-transform" />
//                   </Link>
//                   <Link to="/register" className="flex items-center justify-between border border-white/10 text-white p-6 rounded-2xl font-black text-xl italic uppercase group">
//                     Sign Up <ArrowRight className="group-hover:translate-x-2 transition-transform" />
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Sub-components for cleaner code
// const NavItem = ({ to, children }) => (
//   <NavLink
//     to={to}
//     className={({ isActive }) =>
//       clsx(
//         "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300",
//         isActive
//           ? "bg-white text-dark-900 shadow-xl"
//           : "text-slate-400 hover:text-white hover:bg-white/5"
//       )
//     }
//   >
//     {children}
//   </NavLink>
// );

// const MobileNavItem = ({ to, children, number }) => (
//   <Link to={to} className="flex items-end gap-4 group">
//     <span className="text-brand-glow font-black text-sm mb-2 opacity-50">{number}</span>
//     <span className="text-5xl font-black text-white group-hover:text-brand-glow transition-colors italic uppercase tracking-tighter">
//       {children}
//     </span>
//   </Link>
// );

// const MenuLink = ({ to, label, icon, className }) => (
//   <Link to={to} className={clsx("flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-widest", className)}>
//     {icon} {label}
//   </Link>
// );

// export default Navbar;
// // import React, { createContext, useContext, useState } from 'react';

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null); // null = guest, object = logged in

// //   const login = (email, password) => {
// //     // Mock Logic: Accept any login
// //     setUser({ 
// //       name: "Dr. Researcher", 
// //       email: email, 
// //       id: "7OH-USER-001" 
// //     });
// //   };

// //   const logout = () => {
// //     setUser(null);
// //   };

// //   const signup = (name, email, password) => {
// //     setUser({ name, email, id: "NEW-USER" });
// //   };

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, signup }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../client/supabase';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check active session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       if (session) fetchProfile(session.user);
//       setLoading(false);
//     });

//     // Listen for changes
//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       if (session) fetchProfile(session.user);
//       else setUser(null);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const fetchProfile = async (authUser) => {
//     const { data } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', authUser.id)
//       .single();
//     setUser({ ...authUser, ...data });
//   };

//   const signup = async (email, password, firstName, lastName) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: { data: { first_name: firstName, last_name: lastName } }
//     });
//     if (error) throw error;
//     return data;
//   };

//   const login = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//     if (error) throw error;
//     return data;
//   };

//   const logout = () => supabase.auth.signOut();

//   return (
//     <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { CheckCircle, X } from 'lucide-react';

// const CartContext = createContext();

// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [toast, setToast] = useState(null); // { message: string, visible: boolean }

//   // --- TOAST LOGIC ---
//   const showToast = (message) => {
//     setToast({ message, visible: true });
//     setTimeout(() => setToast(null), 3000); // Auto hide after 3s
//   };

//   // --- CART LOGIC ---
//   const addToCart = (product, quantity, flavor, size) => {
//     setCartItems((prev) => {
//       // Check if item with same ID + Flavor + Size exists
//       const existingItem = prev.find(
//         (item) => item.id === product.id && item.selectedFlavor.name === flavor.name && item.selectedSize.count === size.count
//       );

//       if (existingItem) {
//         return prev.map((item) =>
//           item === existingItem
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
      
//       // Add new item
//       return [...prev, { ...product, quantity, selectedFlavor: flavor, selectedSize: size }];
//     });
    
//     showToast(`Added ${quantity}x ${product.name} to cart`);
//   };

//   const removeFromCart = (indexToRemove) => {
//     setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
//   };

//   const updateQuantity = (indexToUpdate, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems((prev) =>
//       prev.map((item, index) =>
//         index === indexToUpdate ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);
  
//   const getCartTotal = () => cartItems.reduce((total, item) => total + (item.selectedSize.price * item.quantity), 0);

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartCount, getCartTotal }}>
//       {children}
      
//       {/* GLOBAL TOAST COMPONENT */}
//       <AnimatePresence>
//         {toast && (
//           <motion.div
//             initial={{ opacity: 0, y: 50, scale: 0.9 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 20, scale: 0.9 }}
//             className="fixed bottom-6 right-6 z-50 bg-dark-900 border border-brand-glow/50 text-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] flex items-center gap-4"
//           >
//             <div className="w-8 h-8 rounded-full bg-brand-glow/20 flex items-center justify-center text-brand-glow">
//               <CheckCircle size={18} />
//             </div>
//             <div>
//               <h4 className="font-bold text-sm">Success</h4>
//               <p className="text-slate-400 text-xs">{toast.message}</p>
//             </div>
//             <button onClick={() => setToast(null)} className="ml-4 text-slate-500 hover:text-white">
//               <X size={16} />
//             </button>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </CartContext.Provider>
//   );
// };

// // import React from 'react';
// // import Hero from '../components/home/Hero';
// // import Essence from '../components/home/Essence';
// // import Process from '../components/home/Process';
// // import ProductGrid from '../components/home/ProductGrid'; // Rename this to FeaturedProducts if you prefer
// // import Testimonials from '../components/home/Testimonials';

// // const Home = () => {
// //   return (
// //     <>
// //       <Hero />
// //       <Essence />
// //       <Process />
      
// //       <div id="collection">
// //         <ProductGrid />
// //       </div>
      
// //       <Testimonials />
// //     </>
// //   );
// // };

// // export default Home;
// // src/pages/Home.jsx
// import React from 'react';
// import SmokeBackground from '../components/ui/SmokeBackground';
// import SmokeSeparator from '../components/ui/SmokeSeparator';

// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; // The Blue Auto-Scroller
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import ProductCard from '../components/home/ProductCard';
// import ScrollingTestimonials from '../components/home/ScrollingTestimonials';

// const Home = () => {
//   return (
//     <>
//       <SmokeBackground />
      
//       {/* Hero Section */}
//       <div className="relative z-10">
//         <Hero />
//       </div>

//       {/* Auto Scrolling Banner */}
//       <InfiniteBanner />

//       <SmokeSeparator />

//       {/* Featured Products Grid */}
//       <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Collection</h2>
//            <p className="text-slate-400">Pure. Potent. Precise.</p>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             <ProductCard title="Max Potency 7-OH" />
//             <ProductCard title="Liquid Shot 50ml" />
//             <ProductCard title="Extract Capsules" />
//             <ProductCard title="Raw Leaf Powder" />
//         </div>
//       </section>

//       <SmokeSeparator />

//       {/* Science / Essence Section */}
//       <div className="relative z-10">
//         <Essence />
//       </div>

//       <SmokeSeparator />

//       {/* Process Section */}
//       <div className="relative z-10">
//          <Process />
//       </div>

//       <SmokeSeparator />

//       {/* Scrolling Reviews */}
//       <ScrollingTestimonials />

//     </>
//   );
// };

// export default Home;
// import React from 'react';
// import SmokeBackground from '../components/ui/SmokeBackground';
// import SmokeSeparator from '../components/ui/SmokeSeparator'; // Ensure this uses h-32 or h-64 to create space
// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import ProductCard from '../components/home/ProductCard';
// import ScrollingTestimonials from '../components/home/ScrollingTestimonials';

// const Home = () => {
//   return (
//     <div className="relative">
//       {/* 1. Global Atmospheric Background */}
//       <SmokeBackground /> 
      
//       {/* 2. Hero Section */}
//       <div className="relative z-10 mb-20">
//         <Hero />
//       </div>

//       {/* 3. Infinite Banner (Blue Strip) */}
//       <InfiniteBanner />

//       {/* 4. Products Section (Separated by Smoke) */}
//       <div className="relative z-10">
//         <SmokeSeparator />
//         <section className="py-24 px-6 max-w-7xl mx-auto">
//           <div className="text-center mb-20">
//              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Collection</h2>
//              <p className="text-slate-400 max-w-2xl mx-auto">Precision engineered for the advanced user.</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
//               <ProductCard title="Blue Razz" flavor="Blue Raspberry" color="bg-blue-600" />
//               <ProductCard title="Red Vein" flavor="Cherry Bomb" color="bg-red-600" />
//               <ProductCard title="Green Maeng Da" flavor="Sour Apple" color="bg-green-600" />
//               <ProductCard title="Gold Reserve" flavor="Lemon Drop" color="bg-yellow-500" />
//           </div>
//         </section>
//       </div>

//       {/* 5. Science Section */}
//       <div className="relative z-10 bg-black/30 backdrop-blur-sm">
//         <SmokeSeparator />
//         <Essence />
//       </div>

//       {/* 6. Process Section (Wave Layout) */}
//       <div className="relative z-10">
//          <SmokeSeparator />
//          <Process />
//       </div>

//       {/* 7. Reviews */}
//       <ScrollingTestimonials />

//     </div>
//   );
// };

// export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';

// // Components
// import SmokeBackground from '../components/ui/SmokeBackground';
// import SmokeSeparator from '../components/ui/SmokeSeparator';
// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import ProductCard from '../components/home/ProductCard'; // The new card
// import ScrollingTestimonials from '../components/home/ScrollingTestimonials';
// import FeaturedProtocol from '../components/home/ProductCard';
// // Data
// import { products } from '../data/mockData'; 

// const Home = () => {
//   // We can limit to first 4 products for the homepage
//   const featuredProducts = products.slice(0, 4);

//   return (
//     <div className="relative">
      
//       {/* 1. Global Atmospheric Background */}
//       <SmokeBackground /> 
      
//       {/* 2. Hero Section */}
//       <div className="relative z-10 mb-20">
//         <Hero />
//       </div>

//       {/* 3. Infinite Banner (Blue Strip) */}
//       <InfiniteBanner />

//       {/* 4. Products Section (Separated by Smoke) */}
//       <div className="relative z-10">
//         <SmokeSeparator />
        
//         <section className="py-24 px-6 max-w-7xl mx-auto">
//           {/* Section Header */}
//           <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
//               <div>
//                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">Our Collection</h2>
//                 <p className="text-slate-400 max-w-md text-lg">
//                     Precision engineered alkaloids for the advanced researcher. 
//                     Experience the next evolution of potency.
//                 </p>
//               </div>
              
//               <Link to="/shop" className="group flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:text-brand-glow hover:border-brand-glow transition-all">
//                   VIEW FULL CATALOG <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
//               </Link>
//           </div>
          
//           {/* Product Grid - Using Mock Data */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {featuredProducts.map((product) => (
//                   <ProductCard key={product.id} product={product} />
//               ))}
//           </div>
//         </section>
//       </div>

//       {/* 5. Science Section */}
//       <div className="relative z-10 bg-black/30 backdrop-blur-sm">
//         <SmokeSeparator />
//         <Essence />
//       </div>

//       {/* 6. Process Section (Wave Layout) */}
//       <div className="relative z-10">
//          <SmokeSeparator />
//          <Process />
//       </div>

//       {/* 7. Reviews */}
//       <ScrollingTestimonials />

//     </div>
//   );
// };

// export default Home;
// import { supabase } from '../client/supabaseClient';

// export const getProductDetail = async (idOrSlug) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       )
//     `)
//     .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
//     .single();

//   if (error) throw error;

//   // Reshape database results into the "Mock Data" format
//   const flavorsMap = new Map();
//   const sizesMap = new Map();

//   data.product_variants.forEach(variant => {
//     variant.variant_selection_map.forEach(selection => {
//       const opt = selection.option;
//       if (opt.type.name === 'Flavor') {
//         flavorsMap.set(opt.name, { name: opt.name, color: opt.metadata?.color });
//       } else if (opt.type.name === 'Size') {
//         sizesMap.set(opt.name, { count: parseInt(opt.name), price: variant.price });
//       }
//     });
//   });

//   return {
//     ...data,
//     category: data.category.name,
//     variants: {
//       flavors: Array.from(flavorsMap.values()),
//       sizes: Array.from(sizesMap.values()).sort((a, b) => a.count - b.count)
//     }
//   };
// };
// export const getProductDetail = async (idOrSlug) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `)
//     .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
//     .single();

//   if (error) throw error;

//   // Process Variants
//   const flavorsMap = new Map();
//   const sizesMap = new Map();
//   data.product_variants.forEach(variant => {
//     variant.variant_selection_map.forEach(selection => {
//       const opt = selection.option;
//       if (opt.type.name === 'Flavor') {
//         flavorsMap.set(opt.name, { name: opt.name, color: opt.metadata?.color });
//       } else if (opt.type.name === 'Size') {
//         sizesMap.set(opt.name, { count: parseInt(opt.name), price: variant.price });
//       }
//     });
//   });

//   // Calculate Dynamic Avg Rating
//   const totalReviews = data.reviews.length;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 0;

//   return {
//     ...data,
//     avgRating,
//     categoryName: data.category.name,
//     variants: {
//       flavors: Array.from(flavorsMap.values()),
//       sizes: Array.from(sizesMap.values()).sort((a, b) => a.count - b.count)
//     }
//   };
// };

// import { supabase } from '../client/supabaseClient';

// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ShieldCheck, Truck, Zap, Star, ShoppingCart, ChevronDown, Plus, Minus } from 'lucide-react';
// import { products } from '../data/mockData';
// import { useCart } from '../context/CartContext';
// // import { AIRecommendations } from '../components/ai/AIRecommendations';
// // import AIRecommendations from '../components/ai/AIRecommendations';
// const ProductDetail = () => {
//   const { id } = useParams();
// const { addToCart } = useCart();
//   // Find product or fallback
//   const product = products.find(p => p.id === id) || products[0];

//   const [selectedSize, setSelectedSize] = useState(product.variants.sizes[1]);
//   const [selectedFlavor, setSelectedFlavor] = useState(product.variants.flavors[0]);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [openSection, setOpenSection] = useState('Highlights');

  

//   const handleAddToCart = () => {
//     setIsAdding(true);
//     addToCart(product, quantity, selectedFlavor, selectedSize);
//     setTimeout(() => setIsAdding(false), 1000);
//   };

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   return (
//     // REMOVED 'overflow-hidden' from here to ensure sticky works correctly
//     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900">
      
//       {/* Background Ambience (Fixed Position so it doesn't affect layout) */}
//       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${product.imageColor} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
//         {/* --- LEFT COLUMN (STICKY IMAGE) --- */}
//         {/* 'sticky' keeps it pinned. 'top-32' gives it breathing room from navbar. 'self-start' prevents stretching. */}
//         <div className="lg:sticky lg:top-32 lg:self-start">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative w-full aspect-[3/4] max-h-[70vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
//           >
//              {/* Inner Glow */}
//              <div className={`absolute inset-0 bg-gradient-to-tr ${product.imageColor} opacity-20 rounded-3xl`} />

//              {/* Animated Product Graphic */}
//              <motion.div 
//                animate={{ y: [0, -15, 0] }}
//                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                className="relative z-20 w-56 h-72 bg-black rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center mb-8"
//              >
//                 <div className="text-4xl font-black text-white italic tracking-tighter">Cloud 7</div>
//                 <div className="text-xs text-brand-glow mt-2 uppercase tracking-widest">{selectedFlavor.name}</div>
                
//                 {/* Floating Elements Animation */}
//                 {[...Array(3)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         animate={{ 
//                             y: [0, -40, 0],
//                             x: [0, i % 2 === 0 ? 30 : -30, 0],
//                             rotate: [0, 45, 0]
//                         }}
//                         transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
//                         className={`absolute w-8 h-8 rounded-full ${selectedFlavor.color} shadow-lg opacity-80 backdrop-blur-md`}
//                         style={{ top: '80%', left: `${20 + (i * 25)}%` }}
//                     />
//                 ))}
//              </motion.div>

//              <div className="text-center z-20">
//                  <h3 className="text-white font-bold text-2xl tracking-tight">{product.name}</h3>
//                  <p className="text-slate-400 text-sm mt-1">{selectedSize.count} Count Pack • High Potency</p>
//              </div>
//           </motion.div>
//         </div>

//         {/* --- RIGHT COLUMN (SCROLLING CONTENT) --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-8 pb-20"
//         >
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
//                  In Stock & Ready to Ship
//                </span>
//                <div className="flex items-center text-yellow-500 text-sm">
//                   <Star size={14} fill="currentColor" />
//                   <span className="ml-1 text-slate-300">{product.rating} ({product.reviews} Reviews)</span>
//                </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
//             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
//           </div>

//           <div className="h-px w-full bg-white/10" />

//           {/* Flavor Selection */}
//           <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Flavor</label>
//               <div className="flex flex-wrap gap-3">
//                 {product.variants.flavors.map(flavor => (
//                   <button
//                     key={flavor.name}
//                     onClick={() => setSelectedFlavor(flavor)}
//                     className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 ${
//                       selectedFlavor.name === flavor.name 
//                       ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(168,199,250,0.1)]' 
//                       : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
//                     }`}
//                   >
//                     <div className="flex items-center gap-2">
//                         <div className={`w-3 h-3 rounded-full ${flavor.color} shadow-sm`}></div>
//                         <span className="text-sm font-medium">{flavor.name}</span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//           </div>

//           {/* Size Selection */}
//           <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Size</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {product.variants.sizes.map(size => (
//                   <button
//                     key={size.count}
//                     onClick={() => setSelectedSize(size)}
//                     className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
//                       selectedSize.count === size.count
//                       ? 'border-brand-glow bg-brand-glow/10 text-white shadow-inner'
//                       : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
//                     }`}
//                   >
//                     <span className="text-xl font-bold">{size.count} Pack</span>
//                     <span className="text-xs opacity-60 mt-1">${(size.price / size.count).toFixed(2)} / unit</span>
//                   </button>
//                 ))}
//               </div>
//           </div>

//           {/* Pricing & Cart */}
//           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
//              <div className="flex justify-between items-center mb-6">
//                 <div>
//                    <div className="text-4xl font-bold text-white">${selectedSize.price}</div>
//                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
//                    </div>
//                 </div>
                
//                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
//                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
//                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
//                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
//                 </div>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
//              >
//                {isAdding ? <span className="animate-pulse">Processing...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
//              </button>
//           </div>

//           {/* Technical Details (Accordion) */}
//           <div className="space-y-2 pt-4">
//               <AccordionItem 
//                   title="HIGHLIGHTS" 
//                   isOpen={openSection === 'Highlights'} 
//                   onClick={() => toggleSection('Highlights')}
//               >
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details.highlights.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>

//               <AccordionItem 
//                   title="INGREDIENTS" 
//                   isOpen={openSection === 'Ingredients'} 
//                   onClick={() => toggleSection('Ingredients')}
//               >
//                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg border border-white/5">
//                       {product.details.ingredients.map((item, i) => <p key={i}>{item}</p>)}
//                   </div>
//               </AccordionItem>

//               <AccordionItem 
//                   title="RECOMMENDED USAGE" 
//                   isOpen={openSection === 'Usage'} 
//                   onClick={() => toggleSection('Usage')}
//               >
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details.usage.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>
//           </div>

//           {/* Trust Badges */}
//           <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
//              <TrustItem icon={ShieldCheck} text="Lab Verified" />
//              <TrustItem icon={Zap} text="Rapid Onset" />
//              <TrustItem icon={Truck} text="Discreet Ship" />
//           </div>

//                 /** Here we will create our custom component which shows recommented products based on categories or variants or anything else if has atleast more than or equal to two products */
//           {/* AI Recommendations Component */}
//            {/* <AIRecommendations 
//               currentProduct={product} 
//               allProducts={products} 
//             /> */}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // --- Sub-components ---
// const AccordionItem = ({ title, isOpen, onClick, children }) => (
//     <div className="border-b border-white/10 last:border-0">
//         <button 
//             onClick={onClick}
//             className="w-full flex justify-between items-center py-5 text-left group"
//         >
//             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>
//                 {title}
//             </span>
//             <ChevronDown 
//                 size={18} 
//                 className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} 
//             />
//         </button>
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: 'auto', opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="overflow-hidden"
//                 >
//                     <div className="pb-6 pt-0">
//                         {children}
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     </div>
// );

// const TrustItem = ({ icon: Icon, text }) => (
//   <div className="flex flex-col items-center gap-2 text-slate-500">
//     <Icon className="text-brand-glow group-hover:text-white transition-colors" size={24} strokeWidth={1.5} />
//     <span className="text-[10px] uppercase font-bold tracking-widest">{text}</span>
//   </div>
// );

// export default ProductDetail;
// // src/components/home/ProductCard.jsx
// import React from 'react';
// import { ArrowRight, AlertTriangle } from 'lucide-react';
// import { motion } from 'framer-motion';

// const ProductCard = ({ title, price, id }) => {
//   return (
//     <div className="group relative bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      
//       {/* Top Warning Banner */}
//       <div className="bg-[#4a2c2c] p-2 flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
//         <AlertTriangle size={14} className="text-white" />
//         <span>Max Potency • Advanced Users Only</span>
//       </div>

//       <div className="p-6 pb-8 flex flex-col items-center relative">
        
//         {/* Hover Animation Area */}
//         <div className="relative w-48 h-56 mb-6 flex items-center justify-center">
            
//             {/* Background floating particles (Blue Pills Simulation) */}
//             <motion.div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                <div className="absolute top-0 right-0 w-8 h-8 bg-blue-600 rounded-full shadow-lg transform rotate-12 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700 ease-out"></div>
//                <div className="absolute bottom-10 left-0 w-6 h-6 bg-blue-500 rounded-full shadow-lg transform -rotate-12 group-hover:-translate-x-6 group-hover:translate-y-2 transition-transform duration-700 delay-75 ease-out"></div>
//                <div className="absolute top-1/2 -right-4 w-5 h-5 bg-blue-700 rounded-full shadow-lg blur-[1px] group-hover:translate-x-4 transition-transform duration-700 delay-100 ease-out"></div>
//             </motion.div>

//             {/* Main Product Image Placeholder (Pack) */}
//             <div className="relative z-10 w-40 h-full bg-gradient-to-br from-[#5e1c1c] to-[#3d0e0e] rounded-lg shadow-2xl flex flex-col items-center justify-center border border-white/20 transform group-hover:scale-105 transition-transform duration-500">
//                 <div className="text-white font-black text-2xl italic tracking-tighter">7Tabz</div>
//                 <div className="text-white/60 text-[10px] mt-1">7-Hydroxymitragynine</div>
//                 {/* Simulated Pills on pack */}
//                 <div className="mt-4 grid grid-cols-2 gap-1 opacity-80">
//                     <div className="w-6 h-6 rounded-full bg-blue-600 shadow-inner"></div>
//                     <div className="w-6 h-6 rounded-full bg-blue-600 shadow-inner"></div>
//                     <div className="w-6 h-6 rounded-full bg-blue-600 shadow-inner"></div>
//                     <div className="w-6 h-6 rounded-full bg-blue-600 shadow-inner"></div>
//                 </div>
//             </div>
//         </div>

//         {/* Content */}
//         <h3 className="text-[#004d61] font-bold text-xl mb-2 text-center">{title || "Max Potency 7-OH"}</h3>
//         <p className="text-slate-600 text-center text-sm leading-relaxed mb-6">
//           Our strongest formulation yet, with 65mg of pure 7-OH in each tablet.
//         </p>

//         {/* Button */}
//         <button className="w-full py-3 px-6 rounded-lg border-2 border-slate-200 text-slate-800 font-bold text-sm tracking-wide flex items-center justify-center gap-2 group-hover:bg-[#004d61] group-hover:text-white group-hover:border-[#004d61] transition-all duration-300">
//           SHOP MAX POTENCY
//           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, Star } from 'lucide-react';

// const ProductCard = ({ product }) => {
//   return (
//     <Link to={`/shop/${product.id}`} className="block h-full">
//       <motion.div 
//         whileHover="hover"
//         initial="rest"
//         className="group relative h-full bg-dark-800 rounded-3xl border border-white/10 overflow-hidden transition-colors duration-500 hover:border-white/20"
//       >
        
//         {/* --- 1. DYNAMIC HOVER GLOW --- */}
//         {/* This creates the color bleed effect specific to the product */}
//         <div 
//           className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-gradient-to-br ${product.imageColor}`} 
//         />
        
//         {/* --- 2. IMAGE SECTION --- */}
//         <div className="relative h-64 w-full flex items-center justify-center overflow-hidden bg-white/5">
            
//             {/* Background Blob */}
//             <div className={`absolute w-32 h-32 rounded-full bg-gradient-to-r ${product.imageColor} blur-[60px] opacity-40 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150`} />
            
//             {/* Floating Product Placeholder (Replace with <img> later) */}
//             <motion.div 
//               variants={{
//                 rest: { y: 0, scale: 1 },
//                 hover: { y: -10, scale: 1.05 }
//               }}
//               transition={{ duration: 0.4, ease: "easeOut" }}
//               className="relative z-10 w-32 h-40 bg-dark-900 rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center gap-2"
//             >
//                 <div className="text-2xl font-black text-white italic">Cloud7</div>
//                 <div className="text-[10px] uppercase tracking-widest text-slate-400">{product.category}</div>
//             </motion.div>
//         </div>

//         {/* --- 3. CONTENT SECTION --- */}
//         <div className="p-6 relative z-10">
            
//             {/* Top Row: Rating & Tag */}
//             <div className="flex justify-between items-center mb-3">
//                 <span className="text-[10px] font-bold tracking-widest text-brand-glow uppercase bg-brand-glow/10 px-2 py-1 rounded border border-brand-glow/20">
//                     {product.tagline}
//                 </span>
//                 <div className="flex items-center gap-1 text-yellow-500 text-xs">
//                     <Star size={10} fill="currentColor" /> {product.rating}
//                 </div>
//             </div>

//             {/* Title */}
//             <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
//                 {product.name}
//             </h3>
            
//             {/* Price & Action Row */}
//             <div className="mt-6 flex items-end justify-between">
//                 <div>
//                     <div className="text-xs text-slate-500 mb-1">Starting at</div>
//                     <div className="text-2xl font-light text-white">${product.price}</div>
//                 </div>

//                 {/* Animated Button */}
//                 <motion.div 
//                   className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center overflow-hidden group-hover:w-28 transition-all duration-300"
//                 >
//                     <div className="flex items-center gap-2 whitespace-nowrap px-4">
//                         <ArrowRight size={18} className="shrink-0" />
//                         <span className="text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-2 group-hover:ml-0">
//                             View Now
//                         </span>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>

//       </motion.div>
//     </Link>
//   );
// };

// export default ProductCard;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight, Star, ShoppingBag, Loader2 } from 'lucide-react';
// // import { supabase } from '../lib/supabase'; // Adjust path to your Supabase config
// import { supabase } from '../../client/supabaseClient'; 
// /**
//  * 1. THE PRODUCT CARD COMPONENT
//  * Designed for the high-precision "Cloud 7" aesthetic.
//  */
// const ProductCard = ({ product }) => {
//   return (
//     <Link to={`/product/${product.slug}`} className="block h-full group">
//       <motion.div 
//         whileHover="hover"
//         initial="rest"
//         className="relative h-full bg-dark-800 rounded-[2.5rem] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//       >
//         {/* Dynamic Hover Glow - Driven by Supabase 'image_color' */}
//         <div 
//           className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${product.image_color}`} 
//         />
        
//         {/* IMAGE SECTION */}
//         <div className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-white/[0.02]">
//             <div className={`absolute w-40 h-40 rounded-full bg-gradient-to-r ${product.image_color} blur-[80px] opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-150`} />
            
//             <motion.div 
//               variants={{
//                 rest: { y: 0, scale: 1, rotate: 0 },
//                 hover: { y: -15, scale: 1.1, rotate: -2 }
//               }}
//               className="relative z-10 w-40 h-52 bg-dark-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6"
//             >
//                 <div className="text-3xl font-black text-white italic tracking-tighter uppercase">Cloud7</div>
//                 <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-glow mt-2">
//                   {product.category}
//                 </div>
//             </motion.div>
//         </div>

//         {/* CONTENT SECTION */}
//         <div className="p-8 relative z-10">
//             <div className="flex justify-between items-center mb-4">
//                 <span className="text-[10px] font-black tracking-widest text-brand-glow uppercase bg-brand-glow/10 px-3 py-1 rounded-full border border-brand-glow/20">
//                     {product.tagline}
//                 </span>
//                 <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
//                     <Star size={12} fill="currentColor" /> {product.rating}
//                 </div>
//             </div>

//             <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter leading-tight">
//                 {product.name}
//             </h3>
            
//             <div className="mt-8 flex items-center justify-between">
//                 <div>
//                     <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Entry Point</div>
//                     <div className="text-3xl font-black text-white italic">${product.base_price}</div>
//                 </div>

//                 <motion.div 
//                   className="w-12 h-12 rounded-full bg-white text-dark-900 flex items-center justify-center overflow-hidden group-hover:w-32 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
//                 >
//                     <div className="flex items-center gap-2 whitespace-nowrap px-4">
//                         <ArrowRight size={20} className="shrink-0" />
//                         <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                             Explore
//                         </span>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//       </motion.div>
//     </Link>
//   );
// };

// /**
//  * 2. THE FEATURED PROTOCOL (CAROUSEL + API)
//  * Handles data fetching and the infinite auto-scroll logic.
//  */
// const FeaturedProtocol = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getFeatured = async () => {
//       try {
//         const { data, error } = await supabase
//           .from('products')
//           .select('*')
//           .is('is_featured', true) // Only fetch products marked as featured in Supabase
//           .limit(6);

//         if (error) throw error;
//         setProducts(data || []);
//       } catch (err) {
//         console.error("Error fetching featured protocol:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getFeatured();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-[600px] flex items-center justify-center bg-dark-900">
//         <Loader2 className="text-brand-glow animate-spin" size={40} />
//       </div>
//     );
//   }

//   // Duplicate the list for a seamless loop
//   const duplicatedItems = [...products, ...products];

//   return (
//     <section className="py-24 bg-dark-900 overflow-hidden relative">
//       <div className="max-w-7xl mx-auto px-6 mb-12">
//         <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
//           Featured Protocol
//         </h2>
//         <p className="text-brand-glow mt-3 font-bold tracking-[0.3em] text-xs uppercase opacity-80">
//           High-Performance Alkaloids
//         </p>
//       </div>

//       {/* Infinite Scroll Container */}
//       <div className="flex overflow-hidden group/container relative">
//         {/* Gradient Fades for edges */}
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-20 pointer-events-none" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-20 pointer-events-none" />

//         <div className="flex gap-8 animate-infinite-scroll group-hover/container:[animation-play-state:paused]">
//           {duplicatedItems.map((item, idx) => (
//             <div key={`${item.id}-${idx}`} className="w-[400px] shrink-0">
//               <ProductCard product={item} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Dynamic CSS for the Animation */}
//       <style>{`
//         @keyframes infinite-scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(calc(-400px * ${products.length} - 2rem * ${products.length})); }
//         }
//         .animate-infinite-scroll {
//           animation: infinite-scroll 40s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedProtocol;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { X, MapPin, CreditCard, Loader2 } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { saveAddress, getUserAddresses, createOrder } from '../api/orderApi';

// const CheckoutModal = ({ isOpen, onClose, total, cartItems, clearCart }) => {
//   const { user } = useAuth();
//   const [step, setStep] = useState(1); // 1: Address, 2: Payment
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);

//   useEffect(() => {
//     if (user) getUserAddresses(user.id).then(setSavedAddresses);
//   }, [user]);

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     try {
//       // DUMMY RAZORPAY INTEGRATION
//       // const response = await razorpay.open({...});
      
//       const order = await createOrder({
//         user_id: user.id,
//         total_amount: total,
//         shipping_address: selectedAddress,
//         status: 'paid' // Set to pending if payment fails
//       }, cartItems);

//       alert("Order Placed Successfully! Order ID: " + order.id);
//       clearCart();
//       onClose();
//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
//       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-dark-900 border border-white/10 w-full max-w-lg rounded-3xl p-8 relative overflow-hidden">
//         <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X /></button>
        
//         <div className="flex gap-4 mb-8">
//             <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-brand-glow' : 'bg-white/10'}`} />
//             <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-brand-glow' : 'bg-white/10'}`} />
//         </div>

//         {step === 1 ? (
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><MapPin size={20}/> Delivery Address</h2>
//             <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
//               {savedAddresses.map(addr => (
//                 <div 
//                   key={addr.id} 
//                   onClick={() => setSelectedAddress(addr)}
//                   className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedAddress?.id === addr.id ? 'border-brand-glow bg-brand-glow/5' : 'border-white/5 bg-white/5'}`}
//                 >
//                   <p className="text-white text-sm">{addr.street_address}</p>
//                   <p className="text-slate-400 text-xs">{addr.city}, {addr.state} {addr.zip_code}</p>
//                 </div>
//               ))}
//             </div>
//             <button className="w-full mt-6 py-4 bg-white/10 text-white rounded-xl text-sm font-bold">+ ADD NEW ADDRESS</button>
//             <button 
//                 disabled={!selectedAddress}
//                 onClick={() => setStep(2)}
//                 className="w-full mt-4 py-4 bg-brand-glow text-dark-900 rounded-xl font-bold disabled:opacity-50"
//             >
//                 CONTINUE TO PAYMENT
//             </button>
//           </div>
//         ) : (
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2"><CreditCard size={20}/> Payment</h2>
//             <p className="text-slate-400 mb-8">Secure encrypted payment via Razorpay</p>
            
//             <div className="bg-white/5 p-6 rounded-2xl mb-8">
//                 <div className="flex justify-between text-slate-400 mb-2"><span>Amount to Pay</span><span className="text-white">${total.toFixed(2)}</span></div>
//                 <div className="flex justify-between text-slate-400"><span>Deliver to</span><span className="text-white">{selectedAddress.city}</span></div>
//             </div>

//             <button 
//                 onClick={handlePayment}
//                 disabled={isProcessing}
//                 className="w-full py-4 bg-gradient-to-r from-brand-cyan to-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-3"
//             >
//                 {isProcessing ? <Loader2 className="animate-spin" /> : `PAY $${total.toFixed(2)}`}
//             </button>
//             <button onClick={() => setStep(1)} className="mt-4 text-slate-500 text-sm hover:text-white">Back to Address</button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Mail, MapPin, Phone, ChevronDown, Send } from 'lucide-react';

// const faqs = [
//   { q: "What is Cloud 7-Hydroxymitragynine?", a: "Cloud 7-OH is the primary active alkaloid responsible for the effects of Kratom. We isolate it for precision and potency." },
//   { q: "How long does shipping take?", a: "Orders placed before 2PM EST ship same-day. Standard transit is 2-4 business days." },
//   { q: "Do you offer wholesale?", a: "Yes. Please select 'Wholesale Inquiry' in the contact form to reach our B2B team." },
//   { q: "Is packaging discreet?", a: "Absolutely. All orders ship in plain boxes with generic return labels." },
// ];

// const Contact = () => {
//   const [openIndex, setOpenIndex] = useState(0);

//   return (
//     <div className="min-h-screen pt-32 pb-20 bg-dark-900 text-white relative">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
//         {/* LEFT: Contact Form */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//         >
//            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
//            <p className="text-slate-400 mb-8">Questions about an order or partnership?</p>
           
//            <form className="space-y-6">
//               <div className="grid grid-cols-2 gap-6">
//                   <InputGroup label="First Name" placeholder="Jane" />
//                   <InputGroup label="Last Name" placeholder="Doe" />
//               </div>
//               <InputGroup label="Email" placeholder="jane@example.com" type="email" />
              
//               <div>
//                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Concern</label>
//                   <select className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-glow focus:outline-none transition-colors">
//                       <option>Order Support</option>
//                       <option>Wholesale Inquiry</option>
//                       <option>Product Question</option>
//                       <option>Other</option>
//                   </select>
//               </div>

//               <div>
//                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Message</label>
//                   <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-glow focus:outline-none transition-colors" placeholder="How can we help?"></textarea>
//               </div>

//               <button className="w-full py-4 rounded-xl bg-brand-glow text-dark-900 font-bold tracking-wide hover:bg-white transition-colors flex items-center justify-center gap-2">
//                   SEND MESSAGE <Send size={18} />
//               </button>
//            </form>

//            {/* Contact Info Footer */}
//            <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
//                <ContactItem icon={Mail} title="Email Us" text="support@cloud7.com" />
//                <ContactItem icon={Phone} title="Call Us" text="+1 (888) 555-0123" />
//            </div>
//         </motion.div>

//         {/* RIGHT: FAQ Accordion */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white/5 rounded-3xl p-8 border border-white/10"
//         >
//             <h2 className="text-2xl font-bold mb-8">Frequently Asked</h2>
//             <div className="space-y-4">
//                 {faqs.map((faq, index) => (
//                     <div key={index} className="border-b border-white/10 last:border-0 pb-4">
//                         <button 
//                             onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
//                             className="w-full flex justify-between items-center py-2 text-left group"
//                         >
//                             <span className={`font-bold transition-colors ${openIndex === index ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>
//                                 {faq.q}
//                             </span>
//                             <ChevronDown className={`transition-transform duration-300 text-slate-500 ${openIndex === index ? 'rotate-180' : ''}`} />
//                         </button>
//                         <AnimatePresence>
//                             {openIndex === index && (
//                                 <motion.div 
//                                     initial={{ height: 0, opacity: 0 }}
//                                     animate={{ height: 'auto', opacity: 1 }}
//                                     exit={{ height: 0, opacity: 0 }}
//                                     className="overflow-hidden"
//                                 >
//                                     <p className="text-slate-400 text-sm py-2 leading-relaxed">{faq.a}</p>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>
//                     </div>
//                 ))}
//             </div>
            
//             {/* Help Box */}
//             <div className="mt-12 bg-brand-glow/10 rounded-xl p-6 text-center border border-brand-glow/20">
//                 <p className="text-brand-glow font-bold text-sm mb-1">Still need help?</p>
//                 <p className="text-slate-400 text-xs">Our team responds within 2 hours during business days.</p>
//             </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// };

// const InputGroup = ({ label, placeholder, type = "text" }) => (
//     <div>
//         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">{label}</label>
//         <input 
//             type={type} 
//             placeholder={placeholder}
//             className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:border-brand-glow focus:outline-none transition-colors placeholder:text-slate-600"
//         />
//     </div>
// );

// const ContactItem = ({ icon: Icon, title, text }) => (
//     <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-brand-glow border border-white/10">
//             <Icon size={18} />
//         </div>
//         <div>
//             <div className="text-xs text-slate-500 uppercase font-bold">{title}</div>
//             <div className="text-white font-medium">{text}</div>
//         </div>
//     </div>
// );

// export default Contact;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
// import { useCart } from '../context/CartContext';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
//   const total = getCartTotal();

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
//          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 text-slate-600">
//             <Trash2 size={40} />
//          </div>
//          <h1 className="text-3xl font-bold text-white mb-2">Your Cart is Empty</h1>
//          <p className="text-slate-400 mb-8">Looks like you haven't added any precision alkaloids yet.</p>
//          <Link to="/shop" className="px-8 py-3 bg-brand-glow text-dark-900 font-bold rounded-lg hover:bg-white transition-colors">
//             Start Shopping
//          </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-bold text-white mb-12">Shopping Cart <span className="text-slate-500 text-lg font-normal">({cartItems.length} items)</span></h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
//         {/* LEFT: Cart Items List */}
//         <div className="lg:col-span-2 space-y-4">
//           <AnimatePresence>
//             {cartItems.map((item, index) => (
//               <motion.div
//                 key={`${item.id}-${index}`}
//                 layout
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 flex gap-6 items-center group hover:border-white/20 transition-all"
//               >
//                 {/* Product Image Placeholder */}
//                 <div className={`w-20 h-24 sm:w-24 sm:h-28 shrink-0 rounded-xl bg-gradient-to-br ${item.imageColor} bg-opacity-10 flex items-center justify-center border border-white/10 relative overflow-hidden`}>
//                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
//                    <div className={`w-8 h-8 rounded-full ${item.selectedFlavor.color} shadow-[0_0_15px_currentColor]`} />
//                 </div>

//                 {/* Details */}
//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-bold text-white">{item.name}</h3>
//                       <div className="text-sm text-slate-400 mt-1 flex flex-col sm:flex-row gap-1 sm:gap-3">
//                          <span className="flex items-center gap-1"><span className={`w-2 h-2 rounded-full ${item.selectedFlavor.color}`} /> {item.selectedFlavor.name}</span>
//                          <span className="hidden sm:block">•</span>
//                          <span>{item.selectedSize.count} Count Pack</span>
//                       </div>
//                     </div>
//                     <div className="text-right">
//                        <div className="text-lg font-bold text-white">${(item.selectedSize.price * item.quantity).toFixed(2)}</div>
//                        <div className="text-xs text-slate-500">${item.selectedSize.price} ea</div>
//                     </div>
//                   </div>

//                   {/* Controls */}
//                   <div className="flex justify-between items-end mt-4">
//                      <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-9">
//                         <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-9 h-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">
//                            <Minus size={14} />
//                         </button>
//                         <span className="w-8 text-center text-white text-sm font-bold">{item.quantity}</span>
//                         <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-9 h-full flex items-center justify-center text-slate-400 hover:text-white transition-colors">
//                            <Plus size={14} />
//                         </button>
//                      </div>
                     
//                      <button 
//                        onClick={() => removeFromCart(index)}
//                        className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                      >
//                         <Trash2 size={14} /> Remove
//                      </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         {/* RIGHT: Order Summary */}
//         <div className="lg:sticky lg:top-32 h-fit">
//            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
//               <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
//               <div className="space-y-3 mb-6">
//                  <div className="flex justify-between text-slate-400 text-sm">
//                     <span>Subtotal</span>
//                     <span className="text-white">${total.toFixed(2)}</span>
//                  </div>
//                  <div className="flex justify-between text-slate-400 text-sm">
//                     <span>Shipping</span>
//                     <span className="text-green-400">Free</span>
//                  </div>
//                  <div className="flex justify-between text-slate-400 text-sm">
//                     <span>Tax (Estimated)</span>
//                     <span className="text-white">$0.00</span>
//                  </div>
//               </div>

//               <div className="border-t border-white/10 pt-4 mb-6">
//                  <div className="flex justify-between items-end">
//                     <span className="text-white font-bold">Total</span>
//                     <span className="text-3xl font-bold text-brand-glow">${total.toFixed(2)}</span>
//                  </div>
//               </div>

//               <button className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-2 group">
//                   PROCEED TO CHECKOUT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </button>

//               <div className="mt-6 flex flex-col gap-2 text-center">
//                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
//                     <Lock size={12} /> Secure 256-bit SSL Encrypted Payment
//                  </div>
//                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
//                     <ShieldCheck size={12} /> 30-Day Money Back Guarantee
//                  </div>
//               </div>
//            </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState } from 'react';
// import { ShoppingBag, ArrowRight, Truck } from 'lucide-react';
// import CheckoutModal from '../components/checkout/CheckoutModal';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// const EmptyCartView = () => (
//   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
//     {/* Icon Container */}
//     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-fade-in">
//       <ShoppingBag size={40} className="text-slate-500" />
//     </div>

//     {/* Text Content */}
//     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//       Your cart is empty
//     </h2>
//     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
//       Looks like you haven't added anything yet. Explore our collection to find your edge.
//     </p>

//     {/* CTA Button */}
//     <Link 
//       to="/shop" 
//       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(var(--brand-glow-rgb),0.3)]"
//     >
//       <ShoppingBag size={20} className="transition-transform group-hover:-translate-y-1" />
//       START SHOPPING
//     </Link>
//   </div>
// );


// const Cart = () => {
//   const { cartItems, getSubtotal, getShipping, deliveryConfig } = useCart();
//   const { user } = useAuth();
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   const subtotal = getSubtotal();
//   const shipping = getShipping();
//   const total = subtotal + shipping;
//   const amountToFree = Math.max(0, deliveryConfig.min_order_value - subtotal);

//   if (cartItems.length === 0) return <EmptyCartView />;

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//             {/* Free Shipping Progress Bar */}
//             {amountToFree > 0 ? (
//                 <div className="bg-brand-glow/10 border border-brand-glow/20 p-4 rounded-2xl mb-6 flex items-center gap-4">
//                     <Truck className="text-brand-glow" />
//                     <p className="text-sm text-white">
//                         Add <span className="font-bold">${amountToFree.toFixed(2)}</span> more for <span className="text-brand-glow font-bold">FREE SHIPPING</span>
//                     </p>
//                 </div>
//             ) : (
//                 <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl mb-6 text-green-400 text-sm font-bold">
//                     ✓ You've earned FREE SHIPPING!
//                 </div>
//             )}
            
//             {/* Render Cart Items Map here... */}
//         </div>

//         <aside>
//             <div className="bg-white/5 p-8 rounded-3xl border border-white/10 sticky top-32">
//                 <h3 className="text-xl font-bold text-white mb-6">Summary</h3>
//                 <div className="space-y-4 mb-6">
//                     <div className="flex justify-between text-slate-400"><span>Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
//                     <div className="flex justify-between text-slate-400">
//                         <span>Shipping</span>
//                         <span className={shipping === 0 ? "text-green-400 font-bold" : "text-white"}>
//                             {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
//                         </span>
//                     </div>
//                 </div>
//                 <div className="border-t border-white/10 pt-4 flex justify-between items-end mb-8">
//                     <span className="text-white font-bold">Total</span>
//                     <span className="text-4xl font-bold text-brand-glow">${total.toFixed(2)}</span>
//                 </div>

//                 <button 
//                     onClick={() => setIsCheckoutOpen(true)}
//                     className="w-full py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
//                 >
//                     PROCEED TO CHECKOUT <ArrowRight size={20}/>
//                 </button>
//             </div>
//         </aside>
//       </div>

//       <CheckoutModal 
//         isOpen={isCheckoutOpen} 
//         onClose={() => setIsCheckoutOpen(false)} 
//         total={total}
//       />
//     </div>
//   );
// };

// export default Cart;

// import React, { useState } from 'react';
// import { ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus, ExternalLink } from 'lucide-react';
// import CheckoutModal from '../components/checkout/CheckoutModal';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const EmptyCartView = () => (
//   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
//     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
//       <ShoppingBag size={40} className="text-slate-500" />
//     </div>
//     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
//     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
//       Looks like you haven't added anything yet. Explore our collection to find your edge.
//     </p>
//     <Link 
//       to="/shop" 
//       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//     >
//       START SHOPPING
//     </Link>
//   </div>
// );

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, getSubtotal, getShipping, deliveryConfig } = useCart();
//   const { user } = useAuth();
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   const subtotal = getSubtotal();
//   const shipping = getShipping();
//   const total = subtotal + shipping;
//   const amountToFree = Math.max(0, (deliveryConfig?.min_order_value || 0) - subtotal);

//   if (cartItems.length === 0) return <EmptyCartView />;

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-black text-white mb-10 italic tracking-tighter">YOUR CART</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         <div className="lg:col-span-2">
//             {/* Free Shipping Progress Bar */}
//             {amountToFree > 0 ? (
//                 <div className="bg-brand-glow/10 border border-brand-glow/20 p-4 rounded-2xl mb-8 flex items-center gap-4">
//                     <Truck className="text-brand-glow" size={20} />
//                     <p className="text-sm text-white">
//                         Add <span className="font-bold text-brand-glow">${amountToFree.toFixed(2)}</span> more for <span className="font-bold uppercase">Free Shipping</span>
//                     </p>
//                 </div>
//             ) : (
//                 <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-2xl mb-8 text-green-400 text-sm font-bold flex items-center gap-2">
//                     <Truck size={20} /> ✓ YOU'VE EARNED FREE SHIPPING!
//                 </div>
//             )}
            
//             {/* Product List */}
//             <div className="space-y-6">
//               <AnimatePresence>
//                 {cartItems.map((item, index) => (
//                   <motion.div 
//                     key={`${item.id}-${item.selectedSize.id}-${item.selectedFlavor.name}`}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, scale: 0.95 }}
//                     className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row gap-6 items-center relative group"
//                   >
//                     {/* Product Image/Placeholder */}
//                     <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${item.imageColor || 'from-blue-500 to-purple-600'} flex-shrink-0 flex items-center justify-center shadow-lg`}>
//                        <ShoppingBag className="text-white/20" size={40} />
//                     </div>

//                     {/* Product Info */}
//                     <div className="flex-1 text-center sm:text-left">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
//                         <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.name}</h3>
//                         <Link 
//                           to={`/product/${item.slug || item.id}`} 
//                           className="text-brand-glow text-xs font-bold flex items-center justify-center sm:justify-start gap-1 hover:underline"
//                         >
//                           VIEW PRODUCT <ExternalLink size={12} />
//                         </Link>
//                       </div>
                      
//                       <div className="flex flex-wrap justify-center sm:justify-start gap-3 mb-4">
//                         <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 uppercase border border-white/5">
//                           Flavor: {item.selectedFlavor.name}
//                         </span>
//                         <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-400 uppercase border border-white/5">
//                           Size: {item.selectedSize.count} Pack
//                         </span>
//                       </div>

//                       <div className="flex items-center justify-center sm:justify-start gap-6">
//                         {/* Quantity Controls */}
//                         <div className="flex items-center bg-dark-900 rounded-xl border border-white/10 p-1">
//                           <button 
//                             onClick={() => updateQuantity(index, item.quantity - 1)}
//                             className="p-2 text-slate-400 hover:text-white transition-colors"
//                           >
//                             <Minus size={16} />
//                           </button>
//                           <span className="w-8 text-center text-white font-bold">{item.quantity}</span>
//                           <button 
//                             onClick={() => updateQuantity(index, item.quantity + 1)}
//                             className="p-2 text-slate-400 hover:text-white transition-colors"
//                           >
//                             <Plus size={16} />
//                           </button>
//                         </div>

//                         <div className="text-lg font-bold text-white">
//                           ${(item.selectedSize.price * item.quantity).toFixed(2)}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Remove Button */}
//                     <button 
//                       onClick={() => removeFromCart(index)}
//                       className="absolute top-6 right-6 p-2 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//         </div>

//         {/* Summary Sidebar */}
//         <aside>
//             <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 sticky top-32 shadow-2xl">
//                 <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
//                   ORDER SUMMARY
//                 </h3>
                
//                 <div className="space-y-4 mb-8">
//                     <div className="flex justify-between text-slate-400">
//                       <span className="text-sm uppercase font-bold tracking-widest">Subtotal</span>
//                       <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-slate-400">
//                         <span className="text-sm uppercase font-bold tracking-widest">Shipping</span>
//                         <span className={shipping === 0 ? "text-green-400 font-bold" : "text-white font-bold"}>
//                             {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
//                         </span>
//                     </div>
//                     <div className="h-px bg-white/10 w-full my-2" />
//                     <div className="flex justify-between items-end">
//                       <span className="text-white font-black italic tracking-tighter">TOTAL</span>
//                       <div className="text-right">
//                         <span className="block text-4xl font-black text-brand-glow leading-none">${total.toFixed(2)}</span>
//                         <span className="text-[10px] text-slate-500 uppercase font-bold">Inc. all taxes</span>
//                       </div>
//                     </div>
//                 </div>

//                 <button 
//                     onClick={() => setIsCheckoutOpen(true)}
//                     className="w-full py-5 bg-brand-glow text-dark-900 font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(var(--brand-glow-rgb),0.2)]"
//                 >
//                     CHECKOUT NOW <ArrowRight size={20}/>
//                 </button>

//                 <div className="mt-8 flex items-center justify-center gap-4">
//                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
//                     <img src="/visa-icon.png" alt="Visa" className="w-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer" />
//                   </div>
//                   {/* Add other payment icons here */}
//                 </div>
//             </div>
//         </aside>
//       </div>

//       <CheckoutModal 
//         isOpen={isCheckoutOpen} 
//         onClose={() => setIsCheckoutOpen(false)} 
//         total={total}
//       />
//     </div>
//   );
// };

// export default Cart;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../client/supabaseClient';
// import { cartApi } from '../../api/cartApi';

// const CheckoutModal = ({ isOpen, onClose }) => {
//   const { user } = useAuth();
//   const { cartItems, getSubtotal, getShipping, clearCart } = useCart();
//   const navigate = useNavigate();

//   const [step, setStep] = useState(1); // 1: Address, 2: Payment
//   const [loading, setLoading] = useState(false);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
  
//   // New Address Form State
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAddr, setNewAddr] = useState({ 
//     full_name: '', street_address: '', city: '', state: '', zip_code: '' 
//   });

//   const subtotal = getSubtotal();
//   const shipping = getShipping();
//   const total = subtotal + shipping;

//   useEffect(() => {
//     if (user && isOpen) fetchAddresses();
//   }, [user, isOpen]);

//   const fetchAddresses = async () => {
//     const { data } = await supabase
//       .from('addresses')
//       .select('*')
//       .eq('user_id', user.id);
//     setAddresses(data || []);
//     if (data?.length > 0) setSelectedAddress(data[0]);
//   };

//   const handleAddNewAddress = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('addresses')
//       .insert([{ ...newAddr, user_id: user.id }])
//       .select();
    
//     if (!error) {
//       setAddresses([...addresses, data[0]]);
//       setSelectedAddress(data[0]);
//       setShowAddForm(false);
//     }
//     setLoading(false);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) return navigate('/login');
//     setLoading(true);

//     try {
//       // 1. Create Order Record
//       const { data: order, error: orderErr } = await supabase
//         .from('orders')
//         .insert([{
//           user_id: user.id,
//           total_amount: total,
//           shipping_address: selectedAddress, // Stores snapshot of address
//           status: 'paid' // Dummy success for Razorpay integration point
//         }])
//         .select().single();

//       if (orderErr) throw orderErr;

//       // 2. Map Cart Items to Order Items
//       const orderItems = cartItems.map(item => ({
//         order_id: order.id,
//         product_id: item.id,
//         variant_id: item.selectedSize.id,
//         flavor_name: item.selectedFlavor.name,
//         quantity: item.quantity,
//         price_at_purchase: item.selectedSize.price
//       }));

//       await supabase.from('order_items').insert(orderItems);

//       // 3. CLEANUP: Remove from persistent DB Cart & local state
//       await cartApi.clearCart(user.id);
//       clearCart();

//       alert("Order Placed! Redirecting to History...");
//       onClose();
//       navigate('/account/orders');
//     } catch (err) {
//       alert("Error placing order: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-md" 
//       />

//       <motion.div 
//         initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//         className="relative bg-dark-900 border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-5 h-full">
          
//           {/* Left Side: Summary Sidebar (Desktop Only) */}
//           <div className="hidden md:flex md:col-span-2 bg-white/5 p-8 border-r border-white/5 flex-col justify-between">
//             <div>
//               <h3 className="text-white font-bold text-lg mb-6">Order Summary</h3>
//               <div className="space-y-4">
//                 {cartItems.map((item, i) => (
//                   <div key={i} className="flex gap-3">
//                     <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.imageColor} opacity-30 flex-shrink-0`} />
//                     <div>
//                       <p className="text-white text-xs font-bold truncate w-32">{item.name}</p>
//                       <p className="text-slate-500 text-[10px]">{item.quantity}x • {item.selectedSize.count}pk</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t border-white/10 pt-6">
//               <div className="flex justify-between text-sm mb-2"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
//               <div className="flex justify-between text-sm mb-4"><span className="text-slate-400">Shipping</span><span className="text-green-400 font-bold">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
//               <div className="flex justify-between items-end"><span className="text-white font-bold">Total</span><span className="text-2xl font-bold text-brand-glow">${total.toFixed(2)}</span></div>
//             </div>
//           </div>

//           {/* Right Side: Interactive Flow */}
//           <div className="md:col-span-3 p-8 flex flex-col h-[600px]">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-white font-black text-2xl italic tracking-tighter">
//                 {step === 1 ? 'SHIPPING' : 'PAYMENT'}
//               </h2>
//               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X className="text-slate-500" /></button>
//             </div>

//             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
//               {step === 1 ? (
//                 <div className="space-y-6">
//                   {!showAddForm ? (
//                     <>
//                       <div className="space-y-3">
//                         {addresses.map((addr) => (
//                           <div 
//                             key={addr.id}
//                             onClick={() => setSelectedAddress(addr)}
//                             className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${selectedAddress?.id === addr.id ? 'border-brand-glow bg-brand-glow/5' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
//                           >
//                             <div>
//                               <p className="text-white text-sm font-bold">{addr.full_name}</p>
//                               <p className="text-slate-400 text-xs mt-1">{addr.street_address}, {addr.city}</p>
//                             </div>
//                             {selectedAddress?.id === addr.id && <Check className="text-brand-glow" size={18} />}
//                           </div>
//                         ))}
//                       </div>
//                       <button 
//                         onClick={() => setShowAddForm(true)}
//                         className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-slate-500 text-sm hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2"
//                       >
//                         <Plus size={16}/> Add New Address
//                       </button>
//                     </>
//                   ) : (
//                     <form onSubmit={handleAddNewAddress} className="grid grid-cols-2 gap-4">
//                       <input placeholder="Full Name" className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm" onChange={e => setNewAddr({...newAddr, full_name: e.target.value})} required />
//                       <input placeholder="Street Address" className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm" onChange={e => setNewAddr({...newAddr, street_address: e.target.value})} required />
//                       <input placeholder="City" className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm" onChange={e => setNewAddr({...newAddr, city: e.target.value})} required />
//                       <input placeholder="State" className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm" onChange={e => setNewAddr({...newAddr, state: e.target.value})} required />
//                       <input placeholder="Zip Code" className="bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm" onChange={e => setNewAddr({...newAddr, zip_code: e.target.value})} required />
//                       <button type="submit" disabled={loading} className="col-span-2 py-3 bg-white text-black font-bold rounded-xl text-sm">SAVE ADDRESS</button>
//                       <button type="button" onClick={() => setShowAddForm(false)} className="col-span-2 text-slate-500 text-xs">Cancel</button>
//                     </form>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center h-full text-center">
//                   <div className="w-16 h-16 bg-brand-glow/10 rounded-full flex items-center justify-center mb-4">
//                     <CreditCard className="text-brand-glow" size={32} />
//                   </div>
//                   <h3 className="text-white font-bold text-lg">Secure Payment</h3>
//                   <p className="text-slate-500 text-sm mt-2">All transactions are encrypted.<br/>Redirecting to Razorpay secure gateway.</p>
                  
//                   <div className="mt-8 p-4 bg-white/5 rounded-2xl w-full border border-white/5">
//                     <div className="flex justify-between text-xs mb-1"><span className="text-slate-500">Merchant</span><span className="text-white">Cloud 7 Precision</span></div>
//                     <div className="flex justify-between text-xs"><span className="text-slate-500">Payable Amount</span><span className="text-brand-glow font-bold">${total.toFixed(2)}</span></div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer Actions */}
//             <div className="mt-8 space-y-3">
//               {step === 1 ? (
//                 <button 
//                   disabled={!selectedAddress}
//                   onClick={() => setStep(2)}
//                   className="w-full py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl shadow-[0_0_30px_rgba(168,199,250,0.2)] disabled:opacity-50"
//                 >
//                   CONTINUE TO PAYMENT
//                 </button>
//               ) : (
//                 <div className="flex flex-col gap-3">
//                   <button 
//                     onClick={handlePlaceOrder}
//                     disabled={loading}
//                     className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2"
//                   >
//                     {loading ? <Loader2 className="animate-spin" /> : `PAY $${total.toFixed(2)} NOW`}
//                   </button>
//                   <button onClick={() => setStep(1)} className="flex items-center justify-center gap-2 text-slate-500 text-sm hover:text-white">
//                     <ArrowLeft size={14}/> Back to Shipping
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;


// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
//   ChevronDown, Plus, Minus, MessageSquare 
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { 
//   getProductDetail, 
//   getSuggestedProducts, 
//   submitProductReview 
// } from '../api/productDetailApi';

// const ProductDetail = () => {
//   // const { id: slug } = useParams();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const { slug } = useParams();
//   // Dynamic State
//   const [product, setProduct] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Selection State
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [selectedFlavor, setSelectedFlavor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [openSection, setOpenSection] = useState('Highlights');

//   // Review State
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewComment, setReviewComment] = useState('');
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         const data = await getProductDetail(slug);
//         if (data) {
//           setProduct(data);
//           setSelectedFlavor(data.variants.flavors[0]);
//           setSelectedSize(data.variants.sizes[0]);
          
//           // Fetch suggestions if more than 3 exist in category
//           const related = await getSuggestedProducts(data.category_id, data.id);
//           setSuggestions(related);
//         }
//       } catch (error) {
//         console.error("Failed to load product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [slug]);

//   const handleAddToCart = () => {
//     // setIsAdding(true);
//     // addToCart(product, quantity, selectedFlavor, selectedSize);
//     // setTimeout(() => setIsAdding(false), 1000);

//     if (!product ) {
//       alert("Please select a product.");
//       return;
//     }s
//     console.log(product, quantity, selectedFlavor, selectedSize);
//     setIsAdding(true);
//     addToCart(product, quantity, selectedFlavor, selectedSize);
  
//   // Visual feedback timeout
//     setTimeout(() => setIsAdding(false), 1000);

//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please login to leave a review.");
    
//     setIsSubmittingReview(true);
//     try {
//       await submitProductReview(product.id, user.id, reviewRating, reviewComment);
//       alert("Review submitted successfully!");
//       // Refresh product to show new review/rating
//       const updated = await getProductDetail(slug);
//       setProduct(updated);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Loading...</div>;
//   if (!product) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Product not found.</div>;

//   return (
//     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900">
//       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${product.image_color} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
//         {/* --- LEFT COLUMN (STICKY IMAGE) --- */}
//         <div className="lg:sticky lg:top-32 lg:self-start">
//           <motion.div 
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="relative w-full aspect-[3/4] max-h-[70vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
//           >
//              <div className={`absolute inset-0 bg-gradient-to-tr ${product.image_color} opacity-20 rounded-3xl`} />
//              <motion.div 
//                animate={{ y: [0, -15, 0] }}
//                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                className="relative z-20 w-56 h-72 bg-black rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center mb-8"
//              >
//                 <div className="text-4xl font-black text-white italic tracking-tighter">Cloud 7</div>
//                 <div className="text-xs text-brand-glow mt-2 uppercase tracking-widest">{selectedFlavor?.name}</div>
                
//                 {[...Array(3)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         animate={{ y: [0, -40, 0], x: [0, i % 2 === 0 ? 30 : -30, 0], rotate: [0, 45, 0] }}
//                         transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
//                         className={`absolute w-8 h-8 rounded-full ${selectedFlavor?.color || 'bg-brand-cyan'} shadow-lg opacity-80 backdrop-blur-md`}
//                         style={{ top: '80%', left: `${20 + (i * 25)}%` }}
//                     />
//                 ))}
//              </motion.div>

//              <div className="text-center z-20">
//                  <h3 className="text-white font-bold text-2xl tracking-tight">{product.name}</h3>
//                  <p className="text-slate-400 text-sm mt-1">{selectedSize?.count} Count Pack • {product.potency}</p>
//              </div>
//           </motion.div>
//         </div>

//         {/* --- RIGHT COLUMN --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-8 pb-20"
//         >
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
//                  In Stock
//                </span>
//                <div className="flex items-center text-yellow-500 text-sm">
//                   <Star size={14} fill="currentColor" />
//                   <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
//                </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
//             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
//           </div>

//           {/* Flavor Selection */}
//           {product.variants.flavors.length > 0 && (
//             <div>
//                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Flavor</label>
//                 <div className="flex flex-wrap gap-3">
//                   {product.variants.flavors.map(flavor => (
//                     <button
//                       key={flavor.name}
//                       onClick={() => setSelectedFlavor(flavor)}
//                       className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 ${
//                         selectedFlavor?.name === flavor.name 
//                         ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(168,199,250,0.1)]' 
//                         : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                           <div className={`w-3 h-3 rounded-full ${flavor.color} shadow-sm`}></div>
//                           <span className="text-sm font-medium">{flavor.name}</span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//             </div>
//           )}

//           {/* Size Selection */}
//           <div>
//               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">Select Size</label>
//               <div className="grid grid-cols-3 gap-3">
//                 {product.variants.sizes.map(size => (
//                   <button
//                     key={size.count}
//                     onClick={() => setSelectedSize(size)}
//                     className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
//                       selectedSize?.count === size.count
//                       ? 'border-brand-glow bg-brand-glow/10 text-white shadow-inner'
//                       : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
//                     }`}
//                   >
//                     <span className="text-xl font-bold">{size.count} Pack</span>
//                     <span className="text-xs opacity-60 mt-1">${(size.price / size.count).toFixed(2)} / unit</span>
//                   </button>
//                 ))}
//               </div>
//           </div>

//           {/* Pricing & Cart */}
//           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
//              <div className="flex justify-between items-center mb-6">
//                 <div>
//                    <div className="text-4xl font-bold text-white">${selectedSize?.price}</div>
//                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
//                    </div>
//                 </div>
                
//                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
//                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
//                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
//                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
//                 </div>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
//              >
//                {isAdding ? <span className="animate-pulse">Processing...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
//              </button>
//           </div>

//           {/* Accordions */}
//           <div className="space-y-2 pt-4">
//               <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>
//               <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
//                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
//                       {product.details?.ingredients?.map((item, i) => <p key={i}>{item}</p>)}
//                   </div>
//               </AccordionItem>
//           </div>

//           {/* User Review Submission Section */}
//           <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
//             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> LEAVE A REVIEW</h3>
//             {user ? (
//               <form onSubmit={handleReviewSubmit} className="space-y-4">
//                 <div className="flex gap-2">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <Star
//                       key={star}
//                       size={24}
//                       // Combined into one dynamic template literal
//                       className={`cursor-pointer transition-colors ${
//                         star <= reviewRating ? "text-yellow-500" : "text-slate-600"
//                       }`}
//                       fill={star <= reviewRating ? "currentColor" : "none"}
//                       onClick={() => setReviewRating(star)}
//                     />
//                   ))}
//                 </div>
//                 <textarea 
//                   value={reviewComment}
//                   onChange={(e) => setReviewComment(e.target.value)}
//                   placeholder="Share your experience..."
//                   className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
//                 />
//                 <button 
//                   disabled={isSubmittingReview}
//                   className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
//                 >
//                   {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
//                 </button>
//               </form>
//             ) : (
//               <p className="text-slate-400 text-sm">Please login to write a review.</p>
//             )}
//           </div>

//           {/* Suggested Products (Only if >= 3) */}
//           {suggestions.length > 0 && (
//             <div className="pt-12 border-t border-white/10">
//               <h3 className="text-white font-bold text-xl mb-6 uppercase tracking-widest">Recommended in {product.categoryName}</h3>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                 {suggestions.map(s => (
//                   <Link key={s.id} to={`/product/${s.slug}`} className="group">
//                     <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color} opacity-20 group-hover:opacity-30 transition-opacity mb-3`} />
//                     <h4 className="text-white font-medium text-sm group-hover:text-brand-glow transition-colors">{s.name}</h4>
//                     <p className="text-slate-500 text-xs mt-1">{s.potency}</p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // --- Sub-components (Accordion & Trust) ---
// const AccordionItem = ({ title, isOpen, onClick, children }) => (
//     <div className="border-b border-white/10 last:border-0">
//         <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
//             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
//             <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
//         </button>
//         <AnimatePresence>
//             {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
//         </AnimatePresence>
//     </div>
// );

// export default ProductDetail;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
//   ChevronDown, Plus, Minus, AlertCircle 
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { getProductDetail, getSuggestedProducts } from '../api/productDetailApi';

// const ProductDetail = () => {
//   const { slug } = useParams();
//   const { addToCart } = useCart();
//   const { user } = useAuth();
  
//   // Data
//   const [product, setProduct] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Dynamic Logic
//   const [selections, setSelections] = useState({}); // { Flavor: "Mint", Size: "4 Count" }
//   const [activeVariant, setActiveVariant] = useState(null); // The matched Variant Object

//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   // --- LOAD DATA ---
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setErrorMsg('');
//       try {
//         const data = await getProductDetail(slug);
//         setProduct(data);
        
//         // Auto-select defaults: If a category has only 1 option, select it.
//         const defaults = {};
//         if (data.dynamicOptions) {
//           Object.keys(data.dynamicOptions).forEach(key => {
//             if (data.dynamicOptions[key].length === 1) {
//               defaults[key] = data.dynamicOptions[key][0].name;
//             }
//           });
//         }
//         setSelections(defaults);

//         // Load suggestions
//         if (data.category_id) {
//           const sugg = await getSuggestedProducts(data.category_id, data.id);
//           setSuggestions(sugg);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [slug]);

//   // --- DETERMINE ACTIVE VARIANT ---
//   useEffect(() => {
//     if (!product) return;
    
//     // Create key: "Flavor:Mint|Size:4 Count" (Sorted Alphabetically)
//     const currentKey = Object.entries(selections)
//       .map(([k, v]) => `${k}:${v}`)
//       .sort()
//       .join('|');

//     const variant = product.variantLookup?.[currentKey];
//     setActiveVariant(variant || null);
//   }, [selections, product]);

//   const handleSelection = (type, value) => {
//     setSelections(prev => ({ ...prev, [type]: value }));
//     setErrorMsg('');
//   };

//   const handleAddToCart = () => {
//     setErrorMsg('');

//     // 1. Validate All Options Selected
//     const requiredOptions = Object.keys(product.dynamicOptions || {});
//     const missing = requiredOptions.filter(key => !selections[key]);

//     if (missing.length > 0) {
//       setErrorMsg(`Please select a ${missing.join(' and ')}`);
//       return;
//     }

//     // 2. Validate Variant Exists
//     if (!activeVariant) {
//       setErrorMsg("This specific combination is out of stock or unavailable.");
//       return;
//     }

//     // 3. Add to Cart
//     setIsAdding(true);
//     addToCart(
//       product, 
//       quantity, 
//       selections, 
//       activeVariant.id, 
//       activeVariant.price
//     );

//     setTimeout(() => setIsAdding(false), 1000);
//   };

//   if (loading) return (
//     <div className="min-h-screen bg-dark-900 flex items-center justify-center">
//       <div className="w-12 h-12 border-2 border-brand-glow/30 border-t-brand-glow rounded-full animate-spin" />
//     </div>
//   );

//   if (!product) return (
//     <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
//       Product not found.
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-dark-900 pt-24 pb-12 px-4 md:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
//         {/* LEFT: IMAGE */}
//         <motion.div 
//           initial={{ opacity: 0, x: -20 }} 
//           animate={{ opacity: 1, x: 0 }} 
//           className={`aspect-square rounded-[2.5rem] bg-gradient-to-br ${product.image_color} relative overflow-hidden shadow-2xl border border-white/5`}
//         >
//           <div className="absolute inset-0 bg-black/10" />
//           {/* Placeholder Icon */}
//           <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay">
//             <Zap size={120} className="text-white" />
//           </div>
//         </motion.div>

//         {/* RIGHT: DETAILS */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col">
          
//           <div className="mb-2">
//              <span className="text-brand-glow font-bold uppercase tracking-widest text-xs">{product.categoryName}</span>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4 leading-[0.9]">
//             {product.name}
//           </h1>

//           {/* Rating */}
//           <div className="flex items-center gap-2 mb-6 text-sm font-bold text-slate-400">
//             <div className="flex text-amber-400"><Star size={16} fill="currentColor" /></div>
//             <span className="text-white">{product.avgRating}</span>
//             <span>({product.reviews_count} Reviews)</span>
//           </div>

//           {/* Price */}
//           <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-8">
//             <span className="text-3xl font-black text-brand-glow">
//               ${activeVariant ? activeVariant.price : '---'}
//             </span>
//             {!activeVariant && <span className="text-slate-500 text-sm mb-1">Select options to see price</span>}
//           </div>

//           {/* DYNAMIC OPTIONS RENDERER */}
//           <div className="space-y-6 mb-8">
//             {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
//               <div key={type}>
//                 <div className="flex justify-between mb-3">
//                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{type}</h3>
//                    <span className="text-xs font-bold text-white">{selections[type]}</span>
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {options.map((opt) => {
//                     const isSelected = selections[type] === opt.name;
//                     return (
//                       <button
//                         key={opt.name}
//                         onClick={() => handleSelection(type, opt.name)}
//                         className={`
//                           px-5 py-3 rounded-xl border text-sm font-bold transition-all relative overflow-hidden flex items-center gap-2
//                           ${isSelected 
//                             ? 'bg-white text-dark-900 border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' 
//                             : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}
//                         `}
//                       >
//                         {/* Color Dot if applicable */}
//                         {opt.color && <span className={`w-3 h-3 rounded-full shadow-sm ${opt.color}`} />}
//                         {opt.name}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Error Message */}
//           <AnimatePresence>
//             {errorMsg && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4 overflow-hidden">
//                 <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
//                   <AlertCircle size={16} /> {errorMsg}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Add to Cart Actions */}
//           <div className="flex gap-4 mt-auto">
//              <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-2 border border-white/10">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))} 
//                   className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                 >
//                   <Minus size={18}/>
//                 </button>
//                 <span className="text-xl font-bold text-white w-6 text-center tabular-nums">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)} 
//                   className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                 >
//                   <Plus size={18}/>
//                 </button>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="flex-1 bg-brand-glow text-dark-900 font-black text-lg rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,211,238,0.3)]"
//              >
//                {isAdding ? (
//                  <span className="animate-pulse">Adding...</span>
//                ) : (
//                  <>Add to Cart <ShoppingCart size={20} /></>
//                )}
//              </button>
//           </div>

//           {/* Trust Badges */}
//           <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
//             <div className="flex flex-col items-center gap-2 text-center">
//               <ShieldCheck className="text-slate-500" size={20} />
//               <span className="text-[10px] font-bold text-slate-400 uppercase">Lab Verified</span>
//             </div>
//             <div className="flex flex-col items-center gap-2 text-center">
//               <Truck className="text-slate-500" size={20} />
//               <span className="text-[10px] font-bold text-slate-400 uppercase">Fast Ship</span>
//             </div>
//             <div className="flex flex-col items-center gap-2 text-center">
//               <Zap className="text-slate-500" size={20} />
//               <span className="text-[10px] font-bold text-slate-400 uppercase">Potent</span>
//             </div>
//           </div>

//         </motion.div>
//       </div>

//       {/* Suggested Products Section */}
//       {suggestions.length > 0 && (
//         <div className="max-w-7xl mx-auto mt-32">
//           <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8">You Might Also Like</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {suggestions.map((s) => (
//               <Link key={s.id} to={`/product/${s.slug}`} className="group bg-white/5 border border-white/10 rounded-3xl p-4 hover:bg-white/10 transition-all">
//                 <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color} mb-4 opacity-80 group-hover:opacity-100 transition-opacity`} />
//                 <h3 className="text-white font-bold text-sm mb-1">{s.name}</h3>
//                 <p className="text-brand-glow text-xs font-bold">{s.potency}</p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetail;


// import { supabase } from '../client/supabaseClient';


// export const getProductDetail = async (idOrSlug) => {
//   // Regex to check if the string is a valid UUID
//   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

//   // Start the query
//   let query = supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `);

//   // Target the correct column based on the input type
//   if (isUuid) {
//     query = query.eq('id', idOrSlug);
//   } else {
//     query = query.eq('slug', idOrSlug);
//   }

//   const { data, error } = await query.single();

//   if (error) {
//     console.error("Database Error:", error);
//     throw error;
//   }

//   // --- Reshape logic remains the same ---
//   const flavorsMap = new Map();
//   const sizesMap = new Map();
//   data.product_variants.forEach(variant => {
//     variant.variant_selection_map.forEach(selection => {
//       const opt = selection.option;
//       if (opt.type.name === 'Flavor') {
//         flavorsMap.set(opt.name, { name: opt.name, color: opt.metadata?.color });
//       } else if (opt.type.name === 'Size') {
//         sizesMap.set(opt.name, { count: parseInt(opt.name), price: variant.price });
//       }
//     });
//   });

//   const totalReviews = data.reviews?.length || 0;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 4.5;

//   return {
//     ...data,
//     avgRating,
//     categoryName: data.category?.name,
//     variants: {
//       flavors: Array.from(flavorsMap.values()),
//       sizes: Array.from(sizesMap.values()).sort((a, b) => a.count - b.count)
//     }
//   };
// };

// /** * Fetches suggested products in same category
//  * Only returns results if 3 or more are available
//  */
// export const getSuggestedProducts = async (categoryId, currentProductId) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('id, name, slug, image_color, potency')
//     .eq('category_id', categoryId)
//     .neq('id', currentProductId)
//     .limit(10);

//   if (error || data.length < 3) return [];
//   return data;
// };

// /**
//  * Handles single-review validation via database UNIQUE constraint
//  */
// export const submitProductReview = async (productId, userId, rating, comment) => {
//   const { data, error } = await supabase
//     .from('reviews')
//     .insert([{ product_id: productId, user_id: userId, rating, comment }]);
  
//   if (error) {
//     if (error.code === '23505') throw new Error("You have already reviewed this product.");
//     throw error;
//   }
//   return data;
// };

// import { supabase } from '../client/supabaseClient';

// export const getProductDetail = async (idOrSlug) => {
//   // Regex to check if the string is a valid UUID
//   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

//   // Start the query
//   let query = supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `);

//   // Target the correct column based on the input type
//   if (isUuid) {
//     query = query.eq('id', idOrSlug);
//   } else {
//     query = query.eq('slug', idOrSlug);
//   }

//   const { data, error } = await query.single();

//   if (error) {
//     console.error("Database Error:", error);
//     throw error;
//   }

//   // --- Reshape Logic (Updated with Fixes) ---
//   const flavorsMap = new Map();
//   const sizesMap = new Map();

//   if (data.product_variants) {
//     data.product_variants.forEach(variant => {
//       // Safety Check: Ensure selection map exists
//       if (!variant.variant_selection_map) return;

//       variant.variant_selection_map.forEach(selection => {
//         const opt = selection.option;
        
//         // Safety Check: Ensure option data exists
//         if (!opt || !opt.type) return;

//         if (opt.type.name === 'Flavor') {
//           flavorsMap.set(opt.name, { name: opt.name, color: opt.metadata?.color });
//         } else if (opt.type.name === 'Size') {
//           // --- FIX APPLIED HERE ---
//           // Added 'id: variant.id' so the UI knows which UUID to send to the Cart API
//           sizesMap.set(opt.name, { 
//             id: variant.id, 
//             count: parseInt(opt.name) || 0, // Fallback to 0 if parsing fails 
//             price: variant.price 
//           });
//         }
//       });
//     });
//   }

//   const totalReviews = data.reviews?.length || 0;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 4.5;

//   return {
//     ...data,
//     avgRating,
//     categoryName: data.category?.name,
//     variants: {
//       flavors: Array.from(flavorsMap.values()),
//       sizes: Array.from(sizesMap.values()).sort((a, b) => a.count - b.count)
//     }
//   };
// };

// /** * Fetches suggested products in same category
//  * Only returns results if 3 or more are available
//  */
// export const getSuggestedProducts = async (categoryId, currentProductId) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('id, name, slug, image_color, potency')
//     .eq('category_id', categoryId)
//     .neq('id', currentProductId)
//     .limit(10);

//   if (error || data.length < 3) return [];
//   return data;
// };

// /**
//  * Handles single-review validation via database UNIQUE constraint
//  */
// export const submitProductReview = async (productId, userId, rating, comment) => {
//   const { data, error } = await supabase
//     .from('reviews')
//     .insert([{ product_id: productId, user_id: userId, rating, comment }]);
  
//   if (error) {
//     if (error.code === '23505') throw new Error("You have already reviewed this product.");
//     throw error;
//   }
//   return data;
// };// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';

// const Shop = () => {
//   // Mock State - Later this will be populated by your Backend API
//   const [products, setProducts] = useState([1, 2, 3, 4, 5, 6]);

//   return (
//     <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mb-12"
//       >
//         <h1 className="text-4xl font-bold text-white mb-4">All Collections</h1>
//         <p className="text-slate-400">Explore our premium engineered nutrition.</p>
//       </motion.div>

//       {/* Product Grid - Reusing similar card styles */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {products.map((item) => (
//           <div key={item} className="h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-slate-500">
//              {/* Product Card Component would go here */}
//              Product {item} Placeholder
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Shop;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Filter, SlidersHorizontal, Star } from 'lucide-react';
// import { products } from '../data/mockData';

// const Shop = () => {
//   const [activeCategory, setActiveCategory] = useState('All');
  
//   // Filter Logic
//   const filteredProducts = activeCategory === 'All' 
//     ? products 
//     : products.filter(p => p.category === activeCategory);

//   const categories = ['All', 'Tablets', 'Liquid', 'Powder'];

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      
//       {/* Header & Filter Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
//         <div>
//           <h1 className="text-5xl font-bold text-white mb-2">Shop All</h1>
//           <p className="text-slate-400">Premium alkaloids, engineered for precision.</p>
//         </div>
        
//         {/* Simple Category Filter */}
//         <div className="flex gap-2 mt-6 md:mt-0">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
//                 activeCategory === cat 
//                 ? 'bg-white text-black' 
//                 : 'bg-white/5 text-slate-400 hover:bg-white/10'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Grid */}
//       <motion.div 
//         layout
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//       >
//         <AnimatePresence>
//           {filteredProducts.map((product) => (
//             <ShopProductCard key={product.id} product={product} />
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// };

// // Sub-component for clean code
// const ShopProductCard = ({ product }) => {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       className="group relative bg-dark-800 rounded-2xl border border-white/5 overflow-hidden hover:border-brand-glow/30 transition-colors"
//     >
//       {/* Image Area with Gradient Glow */}
//       <div className={`h-64 w-full bg-gradient-to-br ${product.imageColor} bg-opacity-10 relative overflow-hidden flex items-center justify-center`}>
//         <div className="absolute inset-0 bg-dark-900/40 backdrop-blur-sm group-hover:bg-dark-900/20 transition-all duration-500" />
        
//         {/* Floating Circle Animation */}
//         <div className={`absolute w-40 h-40 rounded-full bg-gradient-to-r ${product.imageColor} blur-[60px] opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-slow`} />
        
//         {/* Placeholder for Product Image */}
//         <div className="relative z-10 w-32 h-40 bg-black/50 rounded-lg border border-white/20 flex flex-col items-center justify-center shadow-2xl transform group-hover:-translate-y-4 transition-transform duration-500">
//            <span className="text-white font-bold">{product.name.split(" ")[0]}</span>
//            <span className="text-xs text-slate-400">Pack</span>
//         </div>
//       </div>

//       {/* Info Area */}
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//            <div className="text-xs font-bold text-brand-glow uppercase tracking-wider">{product.tagline}</div>
//            <div className="flex items-center gap-1 text-yellow-500 text-xs">
//               <Star size={12} fill="currentColor" /> {product.rating}
//            </div>
//         </div>
        
//         <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-glow transition-colors">{product.name}</h3>
        
//         <div className="flex justify-between items-center mt-6">
//           <span className="text-2xl font-light text-white">${product.price}</span>
//           <Link 
//             to={`/shop/${product.id}`}
//             className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-medium transition-all text-sm"
//           >
//             View
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Shop;

// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
// //   ChevronDown, Plus, Minus, MessageSquare, AlertCircle 
// // } from 'lucide-react';
// // import { useCart } from '../context/CartContext';
// // import { useAuth } from '../context/AuthContext';
// // import { 
// //   getProductDetail, 
// //   getSuggestedProducts, 
// //   submitProductReview 
// // } from '../api/productDetailApi';

// // const ProductDetail = () => {
// //   const { addToCart } = useCart();
// //   const { user } = useAuth();
// //   const { slug } = useParams();

// //   // --- Dynamic Data State ---
// //   const [product, setProduct] = useState(null);
// //   const [suggestions, setSuggestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // --- Dynamic Selection State ---
// //   // Replaces specific selectedFlavor/selectedSize with a generic map
// //   const [selections, setSelections] = useState({}); // e.g., { "Flavor": "Mint", "Size": "4 Count" }
// //   const [activeVariant, setActiveVariant] = useState(null); // The resolved SKU (ID, Price, Stock)
  
// //   const [quantity, setQuantity] = useState(1);
// //   const [isAdding, setIsAdding] = useState(false);
// //   const [errorMsg, setErrorMsg] = useState('');
  
// //   // UI State
// //   const [openSection, setOpenSection] = useState('Highlights');

// //   // Review State
// //   const [reviewRating, setReviewRating] = useState(5);
// //   const [reviewComment, setReviewComment] = useState('');
// //   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

// //   // 1. Load Data
// //   useEffect(() => {
// //     const loadData = async () => {
// //       setLoading(true);
// //       setErrorMsg('');
// //       try {
// //         const data = await getProductDetail(slug);
// //         if (data) {
// //           setProduct(data);
          
// //           // Auto-select defaults: If a category has only 1 option, select it automatically
// //           // const defaults = {};
// //           // if (data.dynamicOptions) {
// //           //   Object.keys(data.dynamicOptions).forEach(key => {
// //           //     if (data.dynamicOptions[key].length === 1) {
// //           //       defaults[key] = data.dynamicOptions[key][0].name;
// //           //     }
// //           //   });
// //           // }
// //           if (data.variantLookup && Object.keys(data.variantLookup).length > 0) {
// //             // Convert lookup object to array: [ ["Key", {price: 10}], ... ]
// //             const allVariants = Object.entries(data.variantLookup);
            
// //             // Sort by price ascending
// //             const sortedVariants = allVariants.sort(([, a], [, b]) => a.price - b.price);
            
// //             // Get the key of the cheapest variant (e.g., "Flavor:Mint|Size:4 Count")
// //             const [cheapestKey] = sortedVariants[0];
            
// //             // Parse the key back into the selections object
// //             const defaults = {};
// //             cheapestKey.split('|').forEach(segment => {
// //               const [type, value] = segment.split(':');
// //               if (type && value) {
// //                 defaults[type] = value;
// //               }
// //             });
            
// //             setSelections(defaults);
// //           }
// //           // setSelections(defaults);
          
// //           // Fetch suggestions
// //           if (data.category_id) {
// //             const related = await getSuggestedProducts(data.category_id, data.id);
// //             setSuggestions(related);
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Failed to load product:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadData();
// //   }, [slug]);

// //   // 2. Resolve Active Variant (Price/ID) based on Selections
// //   useEffect(() => {
// //     if (!product) return;
    
// //     // Create key: "Flavor:Mint|Size:4 Count" (Sorted Alphabetically)
// //     const currentKey = Object.entries(selections)
// //       .map(([k, v]) => `${k}:${v}`)
// //       .sort()
// //       .join('|');

// //     // Find the matching variant in the lookup table
// //     const variant = product.variantLookup?.[currentKey];
// //     setActiveVariant(variant || null);
// //   }, [selections, product]);

// //   const handleSelection = (type, value) => {
// //     setSelections(prev => ({ ...prev, [type]: value }));
// //     setErrorMsg('');
// //   };

// //   const handleAddToCart = () => {
// //     setErrorMsg('');

// //     if (!product) return;

// //     // A. Validate All Options Selected
// //     const requiredOptions = Object.keys(product.dynamicOptions || {});
// //     const missing = requiredOptions.filter(key => !selections[key]);

// //     if (missing.length > 0) {
// //       setErrorMsg(`Please select a ${missing.join(' and ')}`);
// //       // Scroll to top of controls if error
// //       return;
// //     }

// //     // B. Validate Variant Exists (Stock/Availability)
// //     if (!activeVariant) {
// //       setErrorMsg("This specific combination is out of stock.");
// //       return;
// //     }

// //     // C. Add to Cart
// //     setIsAdding(true);
// //     addToCart(
// //       product, 
// //       quantity, 
// //       selections, 
// //       activeVariant.id, 
// //       activeVariant.price
// //     );
  
// //     // Visual feedback timeout
// //     setTimeout(() => setIsAdding(false), 1000);
// //   };

// //   const handleReviewSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!user) return alert("Please login to leave a review.");
    
// //     setIsSubmittingReview(true);
// //     try {
// //       await submitProductReview(product.id, user.id, reviewRating, reviewComment);
// //       alert("Review submitted successfully!");
// //       // Refresh product to show new review/rating
// //       const updated = await getProductDetail(slug);
// //       setProduct(updated);
// //     } catch (err) {
// //       alert(err.message);
// //     } finally {
// //       setIsSubmittingReview(false);
// //     }
// //   };

// //   // --- Helpers for Visuals (Derived from selections) ---
// //   const getCurrentFlavorColor = () => {
// //     if (!product?.dynamicOptions?.['Flavor']) return 'bg-brand-cyan';
// //     const selectedFlavorName = selections['Flavor'];
// //     const option = product.dynamicOptions['Flavor'].find(o => o.name === selectedFlavorName);
// //     return option?.color || 'bg-brand-cyan';
// //   };

// //   if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Loading...</div>;
// //   if (!product) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Product not found.</div>;

// //   return (
// //     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900">
// //       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${product.image_color} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

// //       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
// //         {/* --- LEFT COLUMN (STICKY IMAGE) --- */}
// //         <div className="lg:sticky lg:top-32 lg:self-start">
// //           <motion.div 
// //             initial={{ opacity: 0, scale: 0.95 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="relative w-full aspect-[3/4] max-h-[70vh] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden"
// //           >
// //              <div className={`absolute inset-0 bg-gradient-to-tr ${product.image_color} opacity-20 rounded-3xl`} />
// //              <motion.div 
// //                animate={{ y: [0, -15, 0] }}
// //                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// //                className="relative z-20 w-56 h-72 bg-black rounded-xl border border-white/20 shadow-2xl flex flex-col items-center justify-center mb-8"
// //              >
// //                 <div className="text-4xl font-black text-white italic tracking-tighter">Cloud 7</div>
// //                 {/* Dynamic Flavor Text */}
// //                 <div className="text-xs text-brand-glow mt-2 uppercase tracking-widest">
// //                     {selections['Flavor'] || product.categoryName}
// //                 </div>
                
// //                 {/* Floating Orbs Animation */}
// //                 {[...Array(3)].map((_, i) => (
// //                     <motion.div
// //                         key={i}
// //                         animate={{ y: [0, -40, 0], x: [0, i % 2 === 0 ? 30 : -30, 0], rotate: [0, 45, 0] }}
// //                         transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
// //                         className={`absolute w-8 h-8 rounded-full ${getCurrentFlavorColor()} shadow-lg opacity-80 backdrop-blur-md`}
// //                         style={{ top: '80%', left: `${20 + (i * 25)}%` }}
// //                     />
// //                 ))}
// //              </motion.div>

// //              <div className="text-center z-20">
// //                  <h3 className="text-white font-bold text-2xl tracking-tight">{product.name}</h3>
// //                  <p className="text-slate-400 text-sm mt-1">
// //                     {/* Dynamic Subtext */}
// //                     {selections['Size'] ? `${selections['Size']} • ` : ''}{product.potency}
// //                  </p>
// //              </div>
// //           </motion.div>
// //         </div>

// //         {/* --- RIGHT COLUMN --- */}
// //         <motion.div 
// //           initial={{ opacity: 0, x: 20 }}
// //           animate={{ opacity: 1, x: 0 }}
// //           transition={{ delay: 0.2 }}
// //           className="flex flex-col gap-8 pb-20"
// //         >
// //           {/* Header */}
// //           <div>
// //             <div className="flex items-center gap-2 mb-4">
// //                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
// //                  In Stock
// //                </span>
// //                <div className="flex items-center text-yellow-500 text-sm">
// //                   <Star size={14} fill="currentColor" />
// //                   <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
// //                </div>
// //             </div>
// //             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
// //             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
// //           </div>

// //           {/* --- DYNAMIC SELECTORS --- */}
// //           {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
// //             <div key={type}>
// //                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
// //                     Select {type}
// //                 </label>
// //                 <div className="flex flex-wrap gap-3">
// //                   {options.map(opt => {
// //                     const isSelected = selections[type] === opt.name;
// //                     return (
// //                       <button
// //                         key={opt.name}
// //                         onClick={() => handleSelection(type, opt.name)}
// //                         className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
// //                           isSelected 
// //                           ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(168,199,250,0.1)]' 
// //                           : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
// //                         }`}
// //                       >
// //                         {/* Show color dot if available (e.g. Flavor) */}
// //                         {opt.color && (
// //                             <div className={`w-3 h-3 rounded-full ${opt.color} shadow-sm`}></div>
// //                         )}
// //                         <span className="text-sm font-medium">{opt.name}</span>
// //                       </button>
// //                     );
// //                   })}
// //                 </div>
// //             </div>
// //           ))}

// //           {/* Error Message */}
// //           <AnimatePresence>
// //             {errorMsg && (
// //               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
// //                 <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
// //                   <AlertCircle size={16} /> {errorMsg}
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Pricing & Cart */}
// //           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
// //              <div className="flex justify-between items-center mb-6">
// //                 <div>
// //                    <div className="text-4xl font-bold text-white">
// //                      {/* Show Dynamic Price or Placeholder */}
// //                      ${activeVariant ? activeVariant.price : '---'}
// //                    </div>
// //                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
// //                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
// //                    </div>
// //                 </div>
                
// //                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
// //                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
// //                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
// //                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
// //                 </div>
// //              </div>

// //              <button 
// //                onClick={handleAddToCart}
// //                disabled={isAdding}
// //                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
// //              >
// //                {isAdding ? <span className="animate-pulse">Adding...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
// //              </button>
// //           </div>

// //           {/* Accordions (Unchanged Layout) */}
// //           <div className="space-y-2 pt-4">
// //               <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
// //                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
// //                       {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
// //                   </ul>
// //               </AccordionItem>
// //               <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
// //                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
// //                       {product.details?.ingredients?.map((item, i) => <p key={i}>{item}</p>)}
// //                   </div>
// //               </AccordionItem>
// //           </div>

// //           {/* User Review Submission Section (Unchanged Layout) */}
// //           <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
// //             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> LEAVE A REVIEW</h3>
// //             {user ? (
// //               <form onSubmit={handleReviewSubmit} className="space-y-4">
// //                 <div className="flex gap-2">
// //                   {[1, 2, 3, 4, 5].map(star => (
// //                     <Star
// //                       key={star}
// //                       size={24}
// //                       className={`cursor-pointer transition-colors ${
// //                         star <= reviewRating ? "text-yellow-500" : "text-slate-600"
// //                       }`}
// //                       fill={star <= reviewRating ? "currentColor" : "none"}
// //                       onClick={() => setReviewRating(star)}
// //                     />
// //                   ))}
// //                 </div>
// //                 <textarea 
// //                   value={reviewComment}
// //                   onChange={(e) => setReviewComment(e.target.value)}
// //                   placeholder="Share your experience..."
// //                   className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
// //                 />
// //                 <button 
// //                   disabled={isSubmittingReview}
// //                   className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
// //                 >
// //                   {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
// //                 </button>
// //               </form>
// //             ) : (
// //               <p className="text-slate-400 text-sm">Please login to write a review.</p>
// //             )}
// //           </div>

// //           {/* Suggested Products (Unchanged Layout) */}
// //           {suggestions.length > 0 && (
// //             <div className="pt-12 border-t border-white/10">
// //               <h3 className="text-white font-bold text-xl mb-6 uppercase tracking-widest">Recommended in {product.categoryName}</h3>
// //               <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
// //                 {suggestions.map(s => (
// //                   <Link key={s.id} to={`/product/${s.slug}`} className="group">
// //                     <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color} opacity-20 group-hover:opacity-30 transition-opacity mb-3`} />
// //                     <h4 className="text-white font-medium text-sm group-hover:text-brand-glow transition-colors">{s.name}</h4>
// //                     <p className="text-slate-500 text-xs mt-1">{s.potency}</p>
// //                   </Link>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // // --- Sub-components ---
// // const AccordionItem = ({ title, isOpen, onClick, children }) => (
// //     <div className="border-b border-white/10 last:border-0">
// //         <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
// //             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
// //             <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
// //         </button>
// //         <AnimatePresence>
// //             {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
// //         </AnimatePresence>
// //     </div>
// // );

// // export default ProductDetail;

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams, Link } from 'react-router-dom';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { 
// // //   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
// // //   ChevronDown, Plus, Minus, MessageSquare, AlertCircle, Maximize2 
// // // } from 'lucide-react';
// // // import { useCart } from '../context/CartContext';
// // // import { useAuth } from '../context/AuthContext';
// // // import { 
// // //   getProductDetail, 
// // //   getSuggestedProducts, 
// // //   submitProductReview 
// // // } from '../api/productDetailApi';

// // // const ProductDetail = () => {
// // //   const { addToCart } = useCart();
// // //   const { user } = useAuth();
// // //   const { slug } = useParams();

// // //   // --- Dynamic Data State ---
// // //   const [product, setProduct] = useState(null);
// // //   const [suggestions, setSuggestions] = useState([]);
// // //   const [loading, setLoading] = useState(true);
  
// // //   // --- Gallery State (New Feature) ---
// // //   const [currentImage, setCurrentImage] = useState(null);
// // //   const [allImages, setAllImages] = useState([]);

// // //   // --- Dynamic Selection State ---
// // //   const [selections, setSelections] = useState({}); 
// // //   const [activeVariant, setActiveVariant] = useState(null); 
  
// // //   const [quantity, setQuantity] = useState(1);
// // //   const [isAdding, setIsAdding] = useState(false);
// // //   const [errorMsg, setErrorMsg] = useState('');
  
// // //   // UI State
// // //   const [openSection, setOpenSection] = useState('Highlights');
// // //   const [reviewRating, setReviewRating] = useState(5);
// // //   const [reviewComment, setReviewComment] = useState('');
// // //   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

// // //   // 1. Load Data
// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       setLoading(true);
// // //       setErrorMsg('');
// // //       try {
// // //         const data = await getProductDetail(slug);
// // //         if (data) {
// // //           setProduct(data);
          
// // //           // --- IMAGE LOGIC WITH FALLBACK ---
// // //           // 1. Gather all potential images
// // //           const gatheredImages = [];
// // //           if (data.cover_image_url) gatheredImages.push(data.cover_image_url);
// // //           if (data.gallery_images && Array.isArray(data.gallery_images)) {
// // //             gatheredImages.push(...data.gallery_images);
// // //           }
          
// // //           // 2. Remove duplicates
// // //           let uniqueImages = [...new Set(gatheredImages)];
          
// // //           // 3. Fallback: If no images exist in DB, use placeholder
// // //           if (uniqueImages.length === 0) {
// // //             uniqueImages = ["https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image1","https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image2","https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image3"];
// // //           }

// // //           setAllImages(uniqueImages);
// // //           setCurrentImage(uniqueImages[0]); // Default to first image

// // //           // Auto-select defaults
// // //           const defaults = {};
// // //           if (data.dynamicOptions) {
// // //             Object.keys(data.dynamicOptions).forEach(key => {
// // //               if (data.dynamicOptions[key].length === 1) {
// // //                 defaults[key] = data.dynamicOptions[key][0].name;
// // //               }
// // //             });
// // //           }
// // //           setSelections(defaults);
          
// // //           if (data.category_id) {
// // //             const related = await getSuggestedProducts(data.category_id, data.id);
// // //             setSuggestions(related);
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to load product:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadData();
// // //   }, [slug]);

// // //   // 2. Resolve Active Variant
// // //   useEffect(() => {
// // //     if (!product) return;
// // //     const currentKey = Object.entries(selections)
// // //       .map(([k, v]) => `${k}:${v}`)
// // //       .sort()
// // //       .join('|');
// // //     const variant = product.variantLookup?.[currentKey];
// // //     setActiveVariant(variant || null);
// // //   }, [selections, product]);

// // //   const handleSelection = (type, value) => {
// // //     setSelections(prev => ({ ...prev, [type]: value }));
// // //     setErrorMsg('');
// // //   };

// // //   const handleAddToCart = () => {
// // //     setErrorMsg('');
// // //     if (!product) return;

// // //     const requiredOptions = Object.keys(product.dynamicOptions || {});
// // //     const missing = requiredOptions.filter(key => !selections[key]);

// // //     if (missing.length > 0) {
// // //       setErrorMsg(`Please select a ${missing.join(' and ')}`);
// // //       return;
// // //     }

// // //     if (!activeVariant) {
// // //       setErrorMsg("This specific combination is out of stock.");
// // //       return;
// // //     }

// // //     setIsAdding(true);
// // //     addToCart(product, quantity, selections, activeVariant.id, activeVariant.price);
// // //     setTimeout(() => setIsAdding(false), 1000);
// // //   };

// // //   const handleReviewSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!user) return alert("Please login to leave a review.");
// // //     setIsSubmittingReview(true);
// // //     try {
// // //       await submitProductReview(product.id, user.id, reviewRating, reviewComment);
// // //       alert("Review submitted successfully!");
// // //       // Simple re-fetch to update review count
// // //       const updated = await getProductDetail(slug);
// // //       setProduct(updated);
// // //     } catch (err) {
// // //       alert(err.message);
// // //     } finally {
// // //       setIsSubmittingReview(false);
// // //     }
// // //   };

// // //   // Helper: Get color from DB or default to Cyan
// // //   const getGlowColor = () => {
// // //     return product?.image_color || 'from-cyan-500 to-blue-600'; 
// // //   };

// // //   if (loading) return (
// // //     <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
// // //       <div className="w-12 h-12 border-2 border-brand-glow border-t-transparent rounded-full animate-spin" />
// // //     </div>
// // //   );
  
// // //   if (!product) return (
// // //     <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">
// // //       Product not found.
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900 overflow-x-hidden">
      
// // //       {/* 1. Global Ambient Background Glow (Dynamic Color) */}
// // //       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${getGlowColor()} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

// // //       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
// // //         {/* --- LEFT COLUMN: ANIMATED GALLERY --- */}
// // //         <div className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-6">
          
// // //           {/* Main Image Stage */}
// // //           <motion.div 
// // //             initial={{ opacity: 0, scale: 0.95 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             className="relative w-full aspect-square rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden group"
// // //           >
// // //              {/* Dynamic Mesh Gradient inside container */}
// // //              <div className={`absolute inset-0 bg-gradient-to-tr ${getGlowColor()} opacity-20 transition-all duration-700`} />
             
// // //              {/* Floating Orbs Animation */}
// // //              <div className="absolute inset-0 pointer-events-none overflow-hidden">
// // //                 {[...Array(3)].map((_, i) => (
// // //                     <motion.div
// // //                         key={i}
// // //                         animate={{ 
// // //                             y: [0, -40, 0], 
// // //                             x: [0, i % 2 === 0 ? 30 : -30, 0], 
// // //                             scale: [1, 1.2, 1],
// // //                             opacity: [0.3, 0.6, 0.3]
// // //                         }}
// // //                         transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
// // //                         className={`absolute w-32 h-32 rounded-full bg-gradient-to-r ${getGlowColor()} blur-3xl`}
// // //                         style={{ top: `${20 + (i * 20)}%`, left: `${10 + (i * 30)}%` }}
// // //                     />
// // //                 ))}
// // //              </div>

// // //              {/* The Actual Image (Animated Switch) */}
// // //              <div className="relative w-full h-full flex items-center justify-center p-8 z-10">
// // //                 <AnimatePresence mode='wait'>
// // //                     <motion.img
// // //                         key={currentImage} // Changing key triggers exit/enter animation
// // //                         src={currentImage} 
// // //                         alt={product.name}
// // //                         initial={{ opacity: 0, x: 20, scale: 0.95 }}
// // //                         animate={{ opacity: 1, x: 0, scale: 1 }}
// // //                         exit={{ opacity: 0, x: -20, scale: 1.05 }}
// // //                         transition={{ duration: 0.4, ease: "easeOut" }}
// // //                         className="max-w-full max-h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
// // //                     />
// // //                 </AnimatePresence>
// // //              </div>

// // //              {/* Hover Zoom Icon */}
// // //              <div className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md cursor-pointer">
// // //                 <Maximize2 size={20} />
// // //              </div>
// // //           </motion.div>

// // //           {/* Thumbnails (Only render if we have multiple images) */}
// // //           {allImages.length > 1 && (
// // //             <motion.div 
// // //                 initial={{ opacity: 0, y: 20 }}
// // //                 animate={{ opacity: 1, y: 0 }}
// // //                 transition={{ delay: 0.2 }}
// // //                 className="grid grid-cols-4 sm:grid-cols-5 gap-3"
// // //             >
// // //                 {allImages.map((img, idx) => (
// // //                     <button
// // //                         key={idx}
// // //                         onClick={() => setCurrentImage(img)}
// // //                         className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
// // //                             currentImage === img 
// // //                             ? 'border-brand-glow scale-105 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
// // //                             : 'border-white/10 hover:border-white/30 grayscale hover:grayscale-0'
// // //                         }`}
// // //                     >
// // //                         <div className={`absolute inset-0 bg-gradient-to-br ${getGlowColor()} opacity-10`} />
// // //                         <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
// // //                     </button>
// // //                 ))}
// // //             </motion.div>
// // //           )}
// // //         </div>

// // //         {/* --- RIGHT COLUMN: DETAILS (Preserved Original Logic) --- */}
// // //         <motion.div 
// // //           initial={{ opacity: 0, x: 20 }}
// // //           animate={{ opacity: 1, x: 0 }}
// // //           transition={{ delay: 0.2 }}
// // //           className="flex flex-col gap-8 pb-20"
// // //         >
// // //           {/* Header */}
// // //           <div>
// // //             <div className="flex items-center gap-2 mb-4">
// // //                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
// // //                  In Stock
// // //                </span>
// // //                <div className="flex items-center text-yellow-500 text-sm">
// // //                   <Star size={14} fill="currentColor" />
// // //                   <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
// // //                </div>
// // //             </div>
// // //             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
// // //             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
// // //           </div>

// // //           {/* Dynamic Selectors (Flavor, Size, etc.) */}
// // //           {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
// // //             <div key={type}>
// // //                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 block">
// // //                     Select {type}
// // //                 </label>
// // //                 <div className="flex flex-wrap gap-3">
// // //                   {options.map(opt => {
// // //                     const isSelected = selections[type] === opt.name;
// // //                     return (
// // //                       <button
// // //                         key={opt.name}
// // //                         onClick={() => handleSelection(type, opt.name)}
// // //                         className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
// // //                           isSelected 
// // //                           ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(168,199,250,0.1)]' 
// // //                           : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
// // //                         }`}
// // //                       >
// // //                         {/* Dot indicating color if metadata exists */}
// // //                         {opt.color && <div className={`w-3 h-3 rounded-full ${opt.color} shadow-sm`}></div>}
// // //                         <span className="text-sm font-medium">{opt.name}</span>
// // //                       </button>
// // //                     );
// // //                   })}
// // //                 </div>
// // //             </div>
// // //           ))}

// // //           {/* Validation Error */}
// // //           <AnimatePresence>
// // //             {errorMsg && (
// // //               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
// // //                 <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
// // //                   <AlertCircle size={16} /> {errorMsg}
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>

// // //           {/* Pricing & Add to Cart Card */}
// // //           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
// // //              <div className="flex justify-between items-center mb-6">
// // //                 <div>
// // //                    <div className="text-4xl font-bold text-white">
// // //                      ${activeVariant ? activeVariant.price : '---'}
// // //                    </div>
// // //                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
// // //                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
// // //                    </div>
// // //                 </div>
                
// // //                 {/* Quantity Control */}
// // //                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
// // //                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
// // //                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
// // //                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
// // //                 </div>
// // //              </div>

// // //              <button 
// // //                onClick={handleAddToCart}
// // //                disabled={isAdding}
// // //                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
// // //              >
// // //                {isAdding ? <span className="animate-pulse">Adding...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
// // //              </button>
// // //           </div>

// // //           {/* Expandable Details */}
// // //           <div className="space-y-2 pt-4">
// // //               <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
// // //                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
// // //                       {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
// // //                   </ul>
// // //               </AccordionItem>
// // //               <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
// // //                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
// // //                       {product.details?.ingredients?.map((item, i) => <p key={i}>{item}</p>)}
// // //                   </div>
// // //               </AccordionItem>
// // //           </div>

// // //           {/* Review Section */}
// // //           <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
// // //             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> LEAVE A REVIEW</h3>
// // //             {user ? (
// // //               <form onSubmit={handleReviewSubmit} className="space-y-4">
// // //                 <div className="flex gap-2">
// // //                   {[1, 2, 3, 4, 5].map(star => (
// // //                     <Star
// // //                       key={star}
// // //                       size={24}
// // //                       className={`cursor-pointer transition-colors ${
// // //                         star <= reviewRating ? "text-yellow-500" : "text-slate-600"
// // //                       }`}
// // //                       fill={star <= reviewRating ? "currentColor" : "none"}
// // //                       onClick={() => setReviewRating(star)}
// // //                     />
// // //                   ))}
// // //                 </div>
// // //                 <textarea 
// // //                   value={reviewComment}
// // //                   onChange={(e) => setReviewComment(e.target.value)}
// // //                   placeholder="Share your experience..."
// // //                   className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
// // //                 />
// // //                 <button 
// // //                   disabled={isSubmittingReview}
// // //                   className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
// // //                 >
// // //                   {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
// // //                 </button>
// // //               </form>
// // //             ) : (
// // //               <p className="text-slate-400 text-sm">Please login to write a review.</p>
// // //             )}
// // //           </div>

// // //           {/* Suggested Products */}
// // //           {suggestions.length > 0 && (
// // //             <div className="pt-12 border-t border-white/10">
// // //               <h3 className="text-white font-bold text-xl mb-6 uppercase tracking-widest">Recommended in {product.categoryName}</h3>
// // //               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //                 {suggestions.map(s => (
// // //                   <Link key={s.id} to={`/product/${s.slug}`} className="group">
// // //                     <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color || 'from-gray-700 to-gray-800'} relative overflow-hidden mb-3 border border-white/5`}>
// // //                         {s.cover_image_url ? (
// // //                             <img src={s.cover_image_url} alt={s.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
// // //                         ) : (
// // //                             <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
// // //                         )}
// // //                     </div>
// // //                     <h4 className="text-white font-medium text-xs group-hover:text-brand-glow transition-colors truncate">{s.name}</h4>
// // //                     <p className="text-slate-500 text-[10px] mt-0.5">{s.potency}</p>
// // //                   </Link>
// // //                 ))}
// // //               </div>
// // //             </div>
// // //           )}

// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- Sub-components (Unchanged) ---
// // // const AccordionItem = ({ title, isOpen, onClick, children }) => (
// // //     <div className="border-b border-white/10 last:border-0">
// // //         <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
// // //             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
// // //             <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
// // //         </button>
// // //         <AnimatePresence>
// // //             {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
// // //         </AnimatePresence>
// // //     </div>
// // // );

// // // export default ProductDetail;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
//   ChevronDown, Plus, Minus, MessageSquare, AlertCircle, 
//   Maximize2, X, ChevronLeft, ChevronRight 
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { 
//   getProductDetail, 
//   getSuggestedProducts, 
//   submitProductReview 
// } from '../api/productDetailApi';

// const DUMMY_IMAGES = [
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image1",
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image2",
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Image3"
// ];

// const ProductDetail = () => {
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const { slug } = useParams();

//   // --- Data State ---
//   const [product, setProduct] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- Gallery State ---
//   const [images, setImages] = useState([]);
//   const [activeImgIndex, setActiveImgIndex] = useState(0);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//   // --- Selection State ---
//   const [selections, setSelections] = useState({});
//   const [activeVariant, setActiveVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   // --- UI State ---
//   const [openSection, setOpenSection] = useState('Highlights');
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewComment, setReviewComment] = useState('');
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

//   // 1. Load Data & Auto-Select Lowest Price
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setErrorMsg('');
//       try {
//         const data = await getProductDetail(slug);
//         if (data) {
//           setProduct(data);

//           // --- IMAGE LOGIC ---
//           let imgList = [];
//           if (data.cover_image_url) imgList.push(data.cover_image_url);
//           if (data.gallery_images && Array.isArray(data.gallery_images)) {
//             imgList.push(...data.gallery_images);
//           }
//           // Remove duplicates
//           imgList = [...new Set(imgList)];
          
//           // Use Dummy if empty
//           if (imgList.length === 0) imgList = DUMMY_IMAGES;
          
//           setImages(imgList);
//           setActiveImgIndex(0);

//           // --- AUTO SELECTION LOGIC (Restored) ---
//           // Find the cheapest variant to pre-select options
//           if (data.variantLookup && Object.keys(data.variantLookup).length > 0) {
//             const allVariants = Object.entries(data.variantLookup);
//             // Sort by price ascending
//             allVariants.sort(([, a], [, b]) => a.price - b.price);
            
//             // Get the key of the cheapest variant (e.g., "Flavor:Mint|Size:4 Count")
//             const [cheapestKey] = allVariants[0];
            
//             // Parse Key into Selection Object
//             const defaults = {};
//             cheapestKey.split('|').forEach(segment => {
//               const [type, value] = segment.split(':');
//               if (type && value) defaults[type] = value;
//             });
//             setSelections(defaults);
//           }

//           // Fetch suggestions
//           if (data.category_id) {
//             const related = await getSuggestedProducts(data.category_id, data.id);
//             setSuggestions(related);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [slug]);

//   // 2. Resolve Active Variant (Runs when selections change)
//   useEffect(() => {
//     if (!product) return;
//     const currentKey = Object.entries(selections)
//       .map(([k, v]) => `${k}:${v}`)
//       .sort()
//       .join('|');
//     const variant = product.variantLookup?.[currentKey];
//     setActiveVariant(variant || null);
//   }, [selections, product]);

//   // --- HANDLERS ---
//   const handleSelection = (type, value) => {
//     setSelections(prev => ({ ...prev, [type]: value }));
//     setErrorMsg('');
//   };

//   const handleAddToCart = () => {
//     setErrorMsg('');
//     if (!product) return;

//     const requiredOptions = Object.keys(product.dynamicOptions || {});
//     const missing = requiredOptions.filter(key => !selections[key]);

//     if (missing.length > 0) {
//       setErrorMsg(`Please select a ${missing.join(' and ')}`);
//       return;
//     }

//     if (!activeVariant) {
//       setErrorMsg("This specific combination is out of stock.");
//       return;
//     }

//     setIsAdding(true);
//     addToCart(product, quantity, selections, activeVariant.id, activeVariant.price);
//     setTimeout(() => setIsAdding(false), 1000);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please login to leave a review.");
//     setIsSubmittingReview(true);
//     try {
//       await submitProductReview(product.id, user.id, reviewRating, reviewComment);
//       alert("Review submitted successfully!");
//       const updated = await getProductDetail(slug);
//       setProduct(updated);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   // --- GALLERY NAVIGATION ---
//   const nextImage = (e) => {
//     e?.stopPropagation();
//     setActiveImgIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = (e) => {
//     e?.stopPropagation();
//     setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Handle Keyboard for Lightbox
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isLightboxOpen) return;
//       if (e.key === 'Escape') setIsLightboxOpen(false);
//       if (e.key === 'ArrowRight') nextImage();
//       if (e.key === 'ArrowLeft') prevImage();
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isLightboxOpen, images.length]);

//   // Helper for dynamic colors
//   const getGlowColor = () => product?.image_color || 'from-cyan-500 to-blue-600';
//   const getBorderColorClass = () => `border-${product?.image_color?.split('-')[1] || 'cyan'}-500`; // Extract core color

//   if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><Loader2 className="animate-spin text-brand-glow" /></div>;
//   if (!product) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Product not found.</div>;

//   return (
//     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900 overflow-x-hidden">
      
//       {/* Background Ambient */}
//       <div className={`fixed top-0 right-0 w-[800px] h-[600px] rounded-full bg-gradient-to-b ${getGlowColor()} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

//       {/* --- LIGHTBOX MODAL --- */}
//       <AnimatePresence>
//         {isLightboxOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
//             onClick={() => setIsLightboxOpen(false)}
//           >
//             {/* Close Button */}
//             <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full">
//               <X size={32} />
//             </button>

//             {/* Navigation Buttons (Desktop) */}
//             {images.length > 1 && (
//               <>
//                 <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all">
//                   <ChevronLeft size={48} />
//                 </button>
//                 <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all">
//                   <ChevronRight size={48} />
//                 </button>
//               </>
//             )}

//             {/* Main Lightbox Image */}
//             <div 
//               className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
//               onClick={(e) => e.stopPropagation()} 
//             >
//               <AnimatePresence mode='wait'>
//                 <motion.img
//                   key={activeImgIndex}
//                   src={images[activeImgIndex]}
//                   alt="Full view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(0,0,0,0.5)]"
//                 />
//               </AnimatePresence>
//             </div>
            
//             {/* Thumbnails in Lightbox */}
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
//               {images.map((_, idx) => (
//                 <button 
//                   key={idx}
//                   onClick={(e) => { e.stopPropagation(); setActiveImgIndex(idx); }}
//                   className={`w-3 h-3 rounded-full transition-all ${idx === activeImgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
//         {/* --- LEFT COLUMN: ADVANCED GALLERY --- */}
//         <div className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-6 select-none">
          
//           {/* Main Image Stage */}
//           <motion.div 
//             layoutId="main-image-container"
//             onClick={() => setIsLightboxOpen(true)}
//             className={`
//               relative w-full aspect-square rounded-[2rem] 
//               bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden group cursor-zoom-in
//               border border-white/10 transition-all duration-500
//             `}
//             // Dynamic thin border glow
//             style={{ boxShadow: `0 0 40px -10px var(--tw-shadow-color)` }} 
//           >
//              {/* Dynamic Mesh Gradient inside container */}
//              <div className={`absolute inset-0 bg-gradient-to-tr ${getGlowColor()} opacity-20 transition-all duration-700`} />
             
//              {/* Floating Orbs Animation */}
//              <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                 {[...Array(3)].map((_, i) => (
//                     <motion.div
//                         key={i}
//                         animate={{ 
//                             y: [0, -30, 0], 
//                             x: [0, i % 2 === 0 ? 20 : -20, 0], 
//                             scale: [1, 1.1, 1],
//                             opacity: [0.3, 0.5, 0.3]
//                         }}
//                         transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
//                         className={`absolute w-40 h-40 rounded-full bg-gradient-to-r ${getGlowColor()} blur-3xl`}
//                         style={{ top: `${20 + (i * 20)}%`, left: `${10 + (i * 30)}%` }}
//                     />
//                 ))}
//              </div>

//              {/* The Actual Image (Swipeable Logic) */}
//              <div className="relative w-full h-full flex items-center justify-center p-8 z-10">
//                 <AnimatePresence mode='wait'>
//                     <motion.img
//                         key={activeImgIndex}
//                         src={images[activeImgIndex]} 
//                         alt={product.name}
//                         initial={{ opacity: 0, x: 20, scale: 0.95 }}
//                         animate={{ opacity: 1, x: 0, scale: 1 }}
//                         exit={{ opacity: 0, x: -20, scale: 1.05 }}
//                         transition={{ duration: 0.3, ease: "easeOut" }}
//                         className="max-w-full max-h-full object-contain drop-shadow-2xl"
//                     />
//                 </AnimatePresence>
//              </div>

//              {/* Hover Zoom Icon */}
//              <div className="absolute top-4 right-4 p-3 bg-black/40 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md transform group-hover:scale-110">
//                 <Maximize2 size={24} />
//              </div>
             
//              {/* In-Place Navigation (Hover Only) */}
//              {images.length > 1 && (
//                <>
//                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 rounded-full text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
//                    <ChevronLeft size={28}/>
//                  </button>
//                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 rounded-full text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all">
//                    <ChevronRight size={28}/>
//                  </button>
//                </>
//              )}
//           </motion.div>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="grid grid-cols-5 gap-3"
//             >
//                 {images.map((img, idx) => {
//                     const isActive = idx === activeImgIndex;
//                     return (
//                         <button
//                             key={idx}
//                             onClick={() => setActiveImgIndex(idx)}
//                             className={`
//                                 relative aspect-square rounded-xl overflow-hidden transition-all duration-300
//                                 ${isActive 
//                                     ? `ring-2 ring-offset-2 ring-offset-dark-900 ring-brand-glow scale-105 opacity-100` 
//                                     : 'opacity-50 hover:opacity-100 hover:scale-105'}
//                             `}
//                         >
//                             <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
//                             {/* Active Glow Overlay */}
//                             {isActive && <div className={`absolute inset-0 bg-gradient-to-tr ${getGlowColor()} opacity-20`} />}
//                         </button>
//                     );
//                 })}
//             </motion.div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: DETAILS (Functionality Preserved) --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-8 pb-20"
//         >
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
//                  In Stock
//                </span>
//                <div className="flex items-center text-yellow-500 text-sm">
//                   <Star size={14} fill="currentColor" />
//                   <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
//                </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
//             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
//           </div>

//           {/* Dynamic Selectors */}
//           {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
//             <div key={type}>
//                 <div className="flex justify-between items-end mb-3">
//                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select {type}</label>
//                    {selections[type] && <span className="text-xs font-bold text-brand-glow">{selections[type]}</span>}
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {options.map(opt => {
//                     const isSelected = selections[type] === opt.name;
//                     return (
//                       <button
//                         key={opt.name}
//                         onClick={() => handleSelection(type, opt.name)}
//                         className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
//                           isSelected 
//                           ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-105' 
//                           : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
//                         }`}
//                       >
//                         {opt.color && <div className={`w-3 h-3 rounded-full ${opt.color} shadow-sm`}></div>}
//                         <span className="text-sm font-medium">{opt.name}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//             </div>
//           ))}

//           {/* Error Message */}
//           <AnimatePresence>
//             {errorMsg && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
//                 <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
//                   <AlertCircle size={16} /> {errorMsg}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pricing & Cart */}
//           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm shadow-xl">
//              <div className="flex justify-between items-center mb-6">
//                 <div>
//                    <AnimatePresence mode='wait'>
//                      <motion.div 
//                        key={activeVariant ? activeVariant.price : 'empty'}
//                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
//                        className="text-4xl font-bold text-white"
//                      >
//                        ${activeVariant ? activeVariant.price : '---'}
//                      </motion.div>
//                    </AnimatePresence>
//                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
//                    </div>
//                 </div>
                
//                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
//                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
//                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
//                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
//                 </div>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
//              >
//                {isAdding ? <span className="animate-pulse">Adding...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
//              </button>
//           </div>

//           {/* Accordions */}
//           <div className="space-y-2 pt-4">
//               <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>
//               <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
//                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
//                       {product.details?.ingredients?.map((item, i) => <p key={i}>{item}</p>)}
//                   </div>
//               </AccordionItem>
//           </div>

//           {/* Review Section */}
//           <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
//             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> LEAVE A REVIEW</h3>
//             {user ? (
//               <form onSubmit={handleReviewSubmit} className="space-y-4">
//                 <div className="flex gap-2">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <Star
//                       key={star}
//                       size={24}
//                       className={`cursor-pointer transition-colors ${
//                         star <= reviewRating ? "text-yellow-500" : "text-slate-600"
//                       }`}
//                       fill={star <= reviewRating ? "currentColor" : "none"}
//                       onClick={() => setReviewRating(star)}
//                     />
//                   ))}
//                 </div>
//                 <textarea 
//                   value={reviewComment}
//                   onChange={(e) => setReviewComment(e.target.value)}
//                   placeholder="Share your experience..."
//                   className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
//                 />
//                 <button 
//                   disabled={isSubmittingReview}
//                   className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
//                 >
//                   {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
//                 </button>
//               </form>
//             ) : (
//               <p className="text-slate-400 text-sm">Please login to write a review.</p>
//             )}
//           </div>

//           {/* Suggestions */}
//           {suggestions.length > 0 && (
//             <div className="pt-12 border-t border-white/10">
//               <h3 className="text-white font-bold text-xl mb-6 uppercase tracking-widest">Recommended in {product.categoryName}</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {suggestions.map(s => (
//                   <Link key={s.id} to={`/product/${s.slug}`} className="group">
//                     <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color || 'from-gray-700 to-gray-800'} relative overflow-hidden mb-3 border border-white/5`}>
//                         {s.cover_image_url ? (
//                             <img src={s.cover_image_url} alt={s.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
//                         )}
//                     </div>
//                     <h4 className="text-white font-medium text-xs group-hover:text-brand-glow transition-colors truncate">{s.name}</h4>
//                     <p className="text-slate-500 text-[10px] mt-0.5">{s.potency}</p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // --- Helper Components ---
// const Loader2 = ({ className }) => (
//   <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//   </svg>
// );

// const AccordionItem = ({ title, isOpen, onClick, children }) => (
//     <div className="border-b border-white/10 last:border-0">
//         <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
//             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
//             <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
//         </button>
//         <AnimatePresence>
//             {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
//         </AnimatePresence>
//     </div>
// );

// export default ProductDetail;




// import { supabase } from '../client/supabaseClient';

// export const getProductDetail = async (idOrSlug) => {
//   // Regex to check if the string is a valid UUID
//   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

//   let query = supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `);

//   if (isUuid) {
//     query = query.eq('id', idOrSlug);
//   } else {
//     query = query.eq('slug', idOrSlug);
//   }

//   const { data, error } = await query.single();

//   if (error) {
//     console.error("Database Error:", error);
//     throw error;
//   }

//   // --- DYNAMIC DATA RESHAPING ---
//   // 1. dynamicOptions: For rendering the buttons (Grouped by Type)
//   // 2. variantLookup: For finding the specific Variant ID based on combination
//   const dynamicOptions = {}; 
//   const variantLookup = {};

//   if (data.product_variants) {
//     data.product_variants.forEach(variant => {
//       if (!variant.variant_selection_map) return;

//       // Build a deterministic key for this variant combination
//       // Example Key: "Flavor:Mint|Size:4 Count"
//       const keyParts = [];

//       variant.variant_selection_map.forEach(selection => {
//         const opt = selection.option;
//         if (!opt || !opt.type) return;

//         const typeName = opt.type.name; // e.g. "Size"
//         const valueName = opt.name;     // e.g. "4 Count"

//         // Add to UI Options (Unique check)
//         if (!dynamicOptions[typeName]) dynamicOptions[typeName] = [];
//         if (!dynamicOptions[typeName].find(o => o.name === valueName)) {
//           dynamicOptions[typeName].push({
//             name: valueName,
//             color: opt.metadata?.color // For color swatches
//           });
//         }

//         keyParts.push(`${typeName}:${valueName}`);
//       });

//       // Sort keys to ensure "Flavor:Mint|Size:4" matches "Size:4|Flavor:Mint"
//       keyParts.sort(); 
//       const uniqueKey = keyParts.join('|');

//       variantLookup[uniqueKey] = {
//         id: variant.id,
//         price: variant.price,
//         stock: variant.stock_quantity
//       };
//     });
//   }

//   // Calculate Ratings
//   const totalReviews = data.reviews?.length || 0;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 4.5;

//   return {
//     ...data,
//     avgRating,
//     categoryName: data.category?.name,
//     dynamicOptions, // { "Size": [{name: "4 Count"}], "Flavor": [...] }
//     variantLookup   // { "Flavor:Mint|Size:4 Count": { id: "...", price: 10 } }
//   };
// };

// export const getSuggestedProducts = async (categoryId, currentProductId) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('id, name, slug, image_color, potency , cover_image_url')
//     .eq('category_id', categoryId)
//     .neq('id', currentProductId)
//     .limit(4); // Limit to 4 for better UI layout

//   if (error || !data || data.length === 0) return [];
//   return data;
// };

// export const submitProductReview = async (productId, userId, rating, comment) => {
//   const { data, error } = await supabase
//     .from('reviews')
//     .insert([{ product_id: productId, user_id: userId, rating, comment }]);
  
//   if (error) {
//     if (error.code === '23505') throw new Error("You have already reviewed this product.");
//     throw error;
//   }
//   return data;
// };
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Save, ArrowLeft, Upload, Plus, Trash, Layers, AlertCircle } from 'lucide-react';
// import { getConfigData, getProductForEdit, saveProduct, uploadProductImage } from '../../api/adminProductApi';
// import { Loader2 } from 'lucide-react';
// const AdminProductForm = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams(); // If slug exists, we are editing
//   const isEditing = !!slug;

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
  
//   // Config Data (Categories, Option Types)
//   const [config, setConfig] = useState({ categories: [], variantTypes: [], variantOptions: [] });

//   // --- FORM STATE ---
//   const [formData, setFormData] = useState({
//     name: '',
//     slug: '',
//     tagline: '',
//     description: '',
//     category_id: '',
//     potency: '',
//     image_color: 'from-cyan-500 to-blue-500', // Default
//     features: [''],
//     details: { highlights: [], ingredients: [], usage: [] },
//     rating: '5.0',
//     reviews_count: 0,
//     cover_image_url: '',
//     gallery_images: []
//   });

//   // --- VARIANT GENERATOR STATE ---
//   // "selectedOptions" tracks which options are active for generation (e.g., Flavor: [Mint, Berry])
//   const [selectedOptions, setSelectedOptions] = useState({}); 
//   // "generatedVariants" is the final list of rows to save
//   const [generatedVariants, setGeneratedVariants] = useState([]);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       const configData = await getConfigData();
//       setConfig(configData);

//       if (isEditing) {
//         const product = await getProductForEdit(slug);
        
//         // Populate Basic Fields
//         setFormData({
//           id: product.id, // Important for upsert
//           name: product.name,
//           slug: product.slug,
//           tagline: product.tagline || '',
//           description: product.description || '',
//           category_id: product.category_id,
//           potency: product.potency || '',
//           image_color: product.image_color || '',
//           features: product.features || [''],
//           details: product.details || { highlights: [], ingredients: [], usage: [] },
//           rating: product.rating,
//           reviews_count: product.reviews_count,
//           cover_image_url: product.cover_image_url || '',
//           gallery_images: product.gallery_images || []
//         });

//         // Populate Variants (Reconstruct Table)
//         if (product.product_variants) {
//            const variants = product.product_variants.map(v => ({
//              id: v.id, // Important to update existing
//              sku: v.sku,
//              price: v.price,
//              stock_quantity: v.stock_quantity,
//              // Map backend option structure to UI
//              optionIds: v.variant_selection_map.map(m => m.option.id),
//              name: v.variant_selection_map.map(m => m.option.name).join(' / ')
//            }));
//            setGeneratedVariants(variants);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- HANDLERS ---

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFeatureChange = (idx, val) => {
//     const newFeatures = [...formData.features];
//     newFeatures[idx] = val;
//     setFormData(prev => ({ ...prev, features: newFeatures }));
//   };

//   const handleDetailChange = (key, idx, val) => {
//     const newDetails = { ...formData.details };
//     if (!newDetails[key]) newDetails[key] = [];
//     newDetails[key][idx] = val;
//     setFormData(prev => ({ ...prev, details: newDetails }));
//   };

//   const handleImageUpload = async (e, field) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     try {
//       const url = await uploadProductImage(file);
//       if (field === 'cover_image_url') {
//         setFormData(prev => ({ ...prev, cover_image_url: url }));
//       } else {
//         setFormData(prev => ({ ...prev, gallery_images: [...prev.gallery_images, url] }));
//       }
//     } catch (err) {
//       alert("Upload failed");
//     }
//   };

//   // --- VARIANT LOGIC ---
  
//   const handleOptionToggle = (typeId, optionId) => {
//     setSelectedOptions(prev => {
//       const current = prev[typeId] || [];
//       const updated = current.includes(optionId) 
//         ? current.filter(id => id !== optionId)
//         : [...current, optionId];
//       return { ...prev, [typeId]: updated };
//     });
//   };

//   const generateVariants = () => {
//     // Cartesian Product Logic
//     const typeIds = Object.keys(selectedOptions).filter(k => selectedOptions[k].length > 0);
//     if (typeIds.length === 0) return;

//     let combinations = [[]];
    
//     typeIds.forEach(typeId => {
//       const optionIds = selectedOptions[typeId];
//       const newCombinations = [];
//       combinations.forEach(combo => {
//         optionIds.forEach(optId => {
//           newCombinations.push([...combo, optId]);
//         });
//       });
//       combinations = newCombinations;
//     });

//     // Transform combinations into rows
//     const newRows = combinations.map(comboIds => {
//       const names = comboIds.map(id => config.variantOptions.find(o => o.id === id)?.name).join(' / ');
//       const skuGen = `SKU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
//       return {
//         id: null, // New variant
//         sku: skuGen,
//         price: 0,
//         stock_quantity: 100,
//         optionIds: comboIds,
//         name: names
//       };
//     });

//     // Append to existing, don't overwrite if they just want to add more
//     setGeneratedVariants(prev => [...prev, ...newRows]);
//     // Reset selection to avoid confusion
//     setSelectedOptions({});
//   };

//   const handleVariantChange = (idx, field, val) => {
//     const updated = [...generatedVariants];
//     updated[idx][field] = val;
//     setGeneratedVariants(updated);
//   };

//   // --- SUBMIT ---

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       // Clean up empty arrays/strings
//       const cleanData = { ...formData };
//       cleanData.features = cleanData.features.filter(f => f.trim() !== '');
      
//       await saveProduct(cleanData, generatedVariants);
//       navigate('/admin/products');
//     } catch (err) {
//       console.error(err);
//       alert(`Error saving product: ${err.message}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="p-10 text-center text-white">Loading Config...</div>;

//   return (
//     <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20">
      
//       {/* HEADER */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <button type="button" onClick={() => navigate('/admin/products')} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="text-2xl font-black text-white italic uppercase">{isEditing ? 'Edit Protocol' : 'New Protocol'}</h1>
//         </div>
//         <button type="submit" disabled={saving} className="px-8 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50">
//            {saving ? <Loader2 className="animate-spin"/> : <Save size={18} />} Save Config
//         </button>
//       </div>

//       {/* 1. BASIC INFO */}
//       <div className="bg-dark-900 border border-white/10 rounded-3xl p-8 space-y-6">
//         <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Core Metadata</h3>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Product Name</label>
//             <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" placeholder="e.g. Cloud 7-OH Tablets" />
//           </div>
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Slug (URL)</label>
//             <input required name="slug" value={formData.slug} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" placeholder="e.g. cloud-7oh-tablets" />
//           </div>
//           <div className="space-y-2 col-span-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Tagline</label>
//             <input name="tagline" value={formData.tagline} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
//           </div>
//           <div className="space-y-2 col-span-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
//             <textarea rows={4} name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
//             <select name="category_id" value={formData.category_id} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none appearance-none">
//                <option value="">Select...</option>
//                {config.categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
//             </select>
//           </div>
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Potency Label</label>
//             <input name="potency" value={formData.potency} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white" placeholder="e.g. Max (20mg)" />
//           </div>
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase">Theme Color</label>
//             <select name="image_color" value={formData.image_color} onChange={handleInputChange} className="w-full bg-dark-950 border border-white/10 rounded-xl p-3 text-white focus:border-brand-glow outline-none">
//               <option value="from-cyan-500 to-blue-500">Cyan / Blue</option>
//               <option value="from-purple-500 to-pink-500">Purple / Pink</option>
//               <option value="from-red-600 to-orange-600">Red / Orange</option>
//               <option value="from-green-500 to-emerald-600">Green / Emerald</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* 2. MEDIA UPLOAD */}
//       <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
//          <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Visual Assets</h3>
//          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Cover Image</label>
//                <div className="relative aspect-square bg-dark-950 rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center overflow-hidden group hover:border-brand-glow transition-colors">
//                   {formData.cover_image_url ? (
//                     <img src={formData.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
//                   ) : (
//                     <Upload className="text-slate-600" />
//                   )}
//                   <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'cover_image_url')} />
//                </div>
//             </div>
//             <div>
//                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Gallery ({formData.gallery_images.length})</label>
//                <div className="grid grid-cols-3 gap-2">
//                   {formData.gallery_images.map((img, i) => (
//                     <div key={i} className="aspect-square rounded-lg bg-dark-950 overflow-hidden border border-white/10">
//                       <img src={img} className="w-full h-full object-cover" />
//                     </div>
//                   ))}
//                   <div className="aspect-square bg-dark-950 rounded-lg border-2 border-dashed border-white/10 flex items-center justify-center relative hover:border-brand-glow transition-colors">
//                      <Plus className="text-slate-600" />
//                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleImageUpload(e, 'gallery')} />
//                   </div>
//                </div>
//             </div>
//          </div>
//       </div>

//       {/* 3. DETAILS JSON BUILDER */}
//       <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
//          <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest mb-4">Product Details (JSON)</h3>
//          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {['highlights', 'ingredients', 'usage'].map(section => (
//                <div key={section} className="space-y-2">
//                   <div className="flex justify-between">
//                      <label className="text-xs font-bold text-slate-500 uppercase">{section}</label>
//                      <button type="button" onClick={() => {
//                         const newArr = [...(formData.details[section] || []), ''];
//                         setFormData({...formData, details: {...formData.details, [section]: newArr}});
//                      }} className="text-xs text-brand-glow font-bold">+ Add Line</button>
//                   </div>
//                   {formData.details[section]?.map((val, i) => (
//                     <input 
//                       key={i} 
//                       value={val} 
//                       onChange={(e) => handleDetailChange(section, i, e.target.value)}
//                       className="w-full bg-dark-950 border border-white/10 rounded-lg p-2 text-white text-sm mb-1" 
//                     />
//                   ))}
//                </div>
//             ))}
//          </div>
//       </div>

//       {/* 4. VARIANT CONFIGURATION (The Complex Part) */}
//       <div className="bg-dark-900 border border-white/10 rounded-3xl p-8">
//          <div className="flex justify-between items-center mb-6">
//             <h3 className="text-lg font-bold text-brand-glow uppercase tracking-widest">SKU & Variants</h3>
//          </div>
         
//          {/* Generator UI */}
//          <div className="bg-dark-950 rounded-2xl p-6 mb-8 border border-white/5">
//             <h4 className="text-white font-bold mb-4">1. Select Options to Generate Combinations</h4>
//             <div className="flex flex-wrap gap-8">
//                {config.variantTypes.map(type => (
//                  <div key={type.id}>
//                     <p className="text-xs font-bold text-slate-500 uppercase mb-2">{type.name}</p>
//                     <div className="flex flex-wrap gap-2">
//                        {config.variantOptions.filter(o => o.type_id === type.id || (!o.type_id && type.name === 'Flavor')).map(opt => (
//                          <button
//                            key={opt.id}
//                            type="button"
//                            onClick={() => handleOptionToggle(type.id, opt.id)}
//                            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-all ${
//                              selectedOptions[type.id]?.includes(opt.id) 
//                              ? 'bg-brand-glow text-dark-900 border-brand-glow' 
//                              : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30'
//                            }`}
//                          >
//                            {opt.name}
//                          </button>
//                        ))}
//                     </div>
//                  </div>
//                ))}
//             </div>
//             <button type="button" onClick={generateVariants} className="mt-6 w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 border border-white/10 flex items-center justify-center gap-2">
//                <Layers size={18} /> Generate Variant Matrix
//             </button>
//          </div>

//          {/* Variants Table */}
//          {generatedVariants.length > 0 ? (
//            <div className="overflow-x-auto">
//              <table className="w-full text-left text-sm text-slate-400">
//                <thead className="bg-white/5 uppercase text-xs font-bold">
//                  <tr>
//                    <th className="p-3">Variant Name</th>
//                    <th className="p-3">SKU</th>
//                    <th className="p-3">Price ($)</th>
//                    <th className="p-3">Stock</th>
//                    <th className="p-3">Action</th>
//                  </tr>
//                </thead>
//                <tbody className="divide-y divide-white/5">
//                  {generatedVariants.map((v, i) => (
//                    <tr key={i}>
//                      <td className="p-3 text-white font-bold">{v.name}</td>
//                      <td className="p-3"><input value={v.sku} onChange={(e) => handleVariantChange(i, 'sku', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-full" /></td>
//                      <td className="p-3"><input type="number" step="0.01" value={v.price} onChange={(e) => handleVariantChange(i, 'price', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-24" /></td>
//                      <td className="p-3"><input type="number" value={v.stock_quantity} onChange={(e) => handleVariantChange(i, 'stock_quantity', e.target.value)} className="bg-dark-950 border border-white/10 rounded p-2 text-white w-20" /></td>
//                      <td className="p-3">
//                        <button type="button" onClick={() => setGeneratedVariants(prev => prev.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:bg-red-500/10 rounded"><Trash size={16}/></button>
//                      </td>
//                    </tr>
//                  ))}
//                </tbody>
//              </table>
//            </div>
//          ) : (
//            <div className="text-center p-8 border-2 border-dashed border-white/10 rounded-2xl">
//               <AlertCircle className="mx-auto text-slate-600 mb-2" />
//               <p className="text-slate-500">No variants configured. Use the generator above.</p>
//            </div>
//          )}
//       </div>

//     </form>
//   );
// };

// export default AdminProductForm;
// export const saveProduct = async (productData, variantsData) => {
//   // 1. Upsert Product (Insert or Update)
//   const { data: product, error: prodError } = await supabase
//     .from('products')
//     .upsert(productData)
//     .select()
//     .single();

//   if (prodError) throw prodError;

//   // 2. Handle Variants (If any)
//   if (variantsData && variantsData.length > 0) {
//     // Strategy: For this MVP, we will Upsert variants based on SKU or ID
//     for (const v of variantsData) {
//       // Prepare variant row
//       const variantPayload = {
//         product_id: product.id,
//         sku: v.sku,
//         price: v.price,
//         stock_quantity: v.stock_quantity
//       };
      
//       // If editing, v.id might exist
//       if (v.id) variantPayload.id = v.id;

//       const { data: savedVariant, error: varError } = await supabase
//         .from('product_variants')
//         .upsert(variantPayload)
//         .select()
//         .single();

//       if (varError) throw varError;

//       // 3. Link Options (variant_selection_map)
//       // v.optionIds should be an array of option_ids like [4, 11]
//       if (v.optionIds && v.optionIds.length > 0) {
//          // Clear old maps for this variant to be safe
//          await supabase.from('variant_selection_map').delete().eq('variant_id', savedVariant.id);
         
//          const mapPayload = v.optionIds.map(optId => ({
//             variant_id: savedVariant.id,
//             option_id: optId
//          }));
         
//          await supabase.from('variant_selection_map').insert(mapPayload);
//       }
//     }
//   }

//   return product;
// };


// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShieldCheck, Truck, Zap, Star, ShoppingCart, 
//   ChevronDown, Plus, Minus, MessageSquare, AlertCircle, 
//   Maximize2, X, ChevronLeft, ChevronRight, Check
// } from 'lucide-react';
// import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
// import { 
//   getProductDetail, 
//   getSuggestedProducts, 
//   submitProductReview 
// } from '../api/productDetailApi';

// const DUMMY_IMAGES = [
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+1",
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+2",
//   "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=No+Image+3"
// ];

// const ProductDetail = () => {
//   const { addToCart } = useCart();
//   const { user } = useAuth();
//   const { slug } = useParams();

//   // --- Data State ---
//   const [product, setProduct] = useState(null);
//   const [suggestions, setSuggestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // --- Gallery State ---
//   const [images, setImages] = useState([]);
//   const [activeImgIndex, setActiveImgIndex] = useState(0);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

//   // --- Selection State ---
//   const [selections, setSelections] = useState({});
//   const [activeVariant, setActiveVariant] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isAdding, setIsAdding] = useState(false);
//   const [errorMsg, setErrorMsg] = useState('');

//   // --- UI State ---
//   const [openSection, setOpenSection] = useState('Highlights');
//   const [reviewRating, setReviewRating] = useState(5);
//   const [reviewComment, setReviewComment] = useState('');
//   const [isSubmittingReview, setIsSubmittingReview] = useState(false);

//   // 1. Load Data & Auto-Select
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setErrorMsg('');
//       try {
//         const data = await getProductDetail(slug);
//         if (data) {
//           setProduct(data);

//           // --- IMAGE LOGIC ---
//           let imgList = [];
//           if (data.cover_image_url) imgList.push(data.cover_image_url);
//           if (data.gallery_images && Array.isArray(data.gallery_images)) {
//             imgList.push(...data.gallery_images);
//           }
//           // Remove duplicates & Fallback
//           imgList = [...new Set(imgList)];
//           if (imgList.length === 0) imgList = DUMMY_IMAGES;
          
//           setImages(imgList);
//           setActiveImgIndex(0);

//           // --- AUTO SELECTION (Lowest Price) ---
//           if (data.variantLookup && Object.keys(data.variantLookup).length > 0) {
//             const allVariants = Object.entries(data.variantLookup);
//             allVariants.sort(([, a], [, b]) => a.price - b.price);
            
//             const [cheapestKey] = allVariants[0];
//             const defaults = {};
//             cheapestKey.split('|').forEach(segment => {
//               const [type, value] = segment.split(':');
//               if (type && value) defaults[type] = value;
//             });
//             setSelections(defaults);
//           }

//           console.log("product details",data);
//           // Suggestions
//           if (data.category_id) {
//             const related = await getSuggestedProducts(data.category_id, data.id);
//             setSuggestions(related);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, [slug]);

//   // 2. Resolve Active Variant
//   useEffect(() => {
//     if (!product) return;
//     const currentKey = Object.entries(selections)
//       .map(([k, v]) => `${k}:${v}`)
//       .sort()
//       .join('|');
//     const variant = product.variantLookup?.[currentKey];
//     setActiveVariant(variant || null);
//   }, [selections, product]);

//   const handleSelection = (type, value) => {
//     setSelections(prev => ({ ...prev, [type]: value }));
//     setErrorMsg('');
//   };

//   const handleAddToCart = () => {
//     setErrorMsg('');
//     if (!product) return;

//     const requiredOptions = Object.keys(product.dynamicOptions || {});
//     const missing = requiredOptions.filter(key => !selections[key]);

//     if (missing.length > 0) {
//       setErrorMsg(`Please select a ${missing.join(' and ')}`);
//       return;
//     }

//     if (!activeVariant) {
//       setErrorMsg("This specific combination is out of stock.");
//       return;
//     }

//     setIsAdding(true);
//     addToCart(product, quantity, selections, activeVariant.id, activeVariant.price);
//     setTimeout(() => setIsAdding(false), 1000);
//   };

//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please login to leave a review.");
//     setIsSubmittingReview(true);
//     try {
//       await submitProductReview(product.id, user.id, reviewRating, reviewComment);
//       alert("Review submitted successfully!");
//       const updated = await getProductDetail(slug);
//       setProduct(updated);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setIsSubmittingReview(false);
//     }
//   };

//   // --- GALLERY NAVIGATION (Lightbox Only) ---
//   const nextImage = (e) => {
//     e?.stopPropagation();
//     setActiveImgIndex((prev) => (prev + 1) % images.length);
//   };

//   const prevImage = (e) => {
//     e?.stopPropagation();
//     setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   // Helper for dynamic colors
//   const getGlowColor = () => product?.image_color || 'from-cyan-500 to-blue-600';

//   if (loading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><div className="w-12 h-12 border-2 border-brand-glow border-t-transparent rounded-full animate-spin" /></div>;
//   if (!product) return <div className="min-h-screen bg-dark-900 flex items-center justify-center text-white">Product not found.</div>;

//   return (
//     <div className="min-h-screen pt-28 pb-20 relative bg-dark-900 overflow-x-hidden">
      
//       {/* Background Ambient */}
//       <div className={`fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b ${getGlowColor()} blur-[150px] opacity-10 pointer-events-none z-0 transition-colors duration-1000`} />

//       {/* --- LIGHTBOX MODAL --- */}
//       <AnimatePresence>
//         {isLightboxOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
//             onClick={() => setIsLightboxOpen(false)}
//           >
//             <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 bg-white/10 rounded-full">
//               <X size={32} />
//             </button>

//             {/* Lightbox Navigation Buttons (Only visible here) */}
//             {images.length > 1 && (
//               <>
//                 <button onClick={prevImage} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all">
//                   <ChevronLeft size={48} />
//                 </button>
//                 <button onClick={nextImage} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all">
//                   <ChevronRight size={48} />
//                 </button>
//               </>
//             )}

//             <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
//               <AnimatePresence mode='wait'>
//                 <motion.img
//                   key={activeImgIndex}
//                   src={images[activeImgIndex]}
//                   alt="Full view"
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 1.1 }}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   className="max-w-full max-h-full object-contain"
//                 />
//               </AnimatePresence>
//             </div>
            
//             <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
//               {images.map((_, idx) => (
//                 <button 
//                   key={idx}
//                   onClick={(e) => { e.stopPropagation(); setActiveImgIndex(idx); }}
//                   className={`w-3 h-3 rounded-full transition-all ${idx === activeImgIndex ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/60'}`}
//                 />
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start relative z-10">
        
//         {/* --- LEFT COLUMN: CLEAN GALLERY --- */}
//         <div className="lg:sticky lg:top-32 lg:self-start flex flex-col gap-6">
          
//           {/* Main Image Stage */}
//           <div 
//             className="relative w-full aspect-square group cursor-zoom-in rounded-3xl"
//             onClick={() => setIsLightboxOpen(true)}
//           >
//              {/* Dynamic Colored Shadow / Glow */}
//              {/* This creates a glow exactly matching the image_color behind the main image */}
//              <div className={`absolute inset-4 -z-10 rounded-3xl bg-gradient-to-br ${getGlowColor()} blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

//              {/* The Image */}
//              <div className="w-full h-full rounded-3xl overflow-hidden border border-white/5 bg-black/20 relative">
//                 <AnimatePresence mode='wait'>
//                     <motion.img
//                         key={activeImgIndex}
//                         src={images[activeImgIndex]} 
//                         alt={product.name}
//                         initial={{ opacity: 0, scale: 1.05 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.4, ease: "easeOut" }}
//                         className="w-full h-full object-contain p-2"
//                     />
//                 </AnimatePresence>
                
//                 {/* Maximize Icon (Top Right) */}
//                 <div className="absolute top-4 right-4 p-2 bg-black/30 backdrop-blur-md rounded-full text-white/70 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <Maximize2 size={20} />
//                 </div>
//              </div>
//           </div>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//                 className="grid grid-cols-5 gap-4"
//             >
//                 {images.map((img, idx) => {
//                     const isActive = idx === activeImgIndex;
//                     return (
//                         <button
//                             key={idx}
//                             onClick={() => setActiveImgIndex(idx)}
//                             className={`
//                                 relative aspect-square rounded-xl overflow-hidden transition-all duration-300 border-2
//                                 ${isActive 
//                                     ? `border-brand-glow shadow-[0_0_15px_-3px_rgba(34,211,238,0.3)] scale-105 opacity-100` 
//                                     : 'border-transparent border-white/5 opacity-60 hover:opacity-100 hover:border-white/20'}
//                             `}
//                         >
//                             <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
//                         </button>
//                     );
//                 })}
//             </motion.div>
//           )}
//         </div>

//         {/* --- RIGHT COLUMN: DETAILS --- */}
//         <motion.div 
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.2 }}
//           className="flex flex-col gap-8 pb-20"
//         >
//           {/* Header */}
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wide">
//                  In Stock
//                </span>
//                <div className="flex items-center text-yellow-500 text-sm">
//                   <Star size={14} fill="currentColor" />
//                   <span className="ml-1 text-slate-300">{product.avgRating} ({product.reviews?.length || 0} Reviews)</span>
//                </div>
//             </div>
//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{product.name}</h1>
//             <p className="text-slate-400 text-lg leading-relaxed">{product.description}</p>
//           </div>

//           {/* Dynamic Selectors */}
//           {product.dynamicOptions && Object.entries(product.dynamicOptions).map(([type, options]) => (
//             <div key={type}>
//                 <div className="flex justify-between items-end mb-3">
//                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select {type}</label>
//                    {selections[type] && <span className="text-xs font-bold text-brand-glow">{selections[type]}</span>}
//                 </div>
//                 <div className="flex flex-wrap gap-3">
//                   {options.map(opt => {
//                     const isSelected = selections[type] === opt.name;
//                     return (
//                       <button
//                         key={opt.name}
//                         onClick={() => handleSelection(type, opt.name)}
//                         className={`group relative px-5 py-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${
//                           isSelected 
//                           ? 'border-brand-glow bg-brand-glow/10 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)] scale-105' 
//                           : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
//                         }`}
//                       >
//                         {opt.color && <div className={`w-3 h-3 rounded-full ${opt.color} shadow-sm`}></div>}
//                         <span className="text-sm font-medium">{opt.name}</span>
//                       </button>
//                     );
//                   })}
//                 </div>
//             </div>
//           ))}

//           {/* Error Message */}
//           <AnimatePresence>
//             {errorMsg && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
//                 <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-2 text-sm font-bold">
//                   <AlertCircle size={16} /> {errorMsg}
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Pricing & Cart */}
//           <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm shadow-xl">
//              <div className="flex justify-between items-center mb-6">
//                 <div>
//                    <AnimatePresence mode='wait'>
//                      <motion.div 
//                        key={activeVariant ? activeVariant.price : 'empty'}
//                        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
//                        className="text-4xl font-bold text-white"
//                      >
//                        ${activeVariant ? activeVariant.price : '---'}
//                      </motion.div>
//                    </AnimatePresence>
//                    <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
//                       <Zap size={12} className="text-yellow-400" fill="currentColor"/> Fast Delivery
//                    </div>
//                 </div>
                
//                 <div className="flex items-center bg-dark-900 rounded-lg border border-white/10 h-12">
//                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Minus size={16}/></button>
//                    <span className="w-8 text-center text-white text-lg font-bold">{quantity}</span>
//                    <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full text-slate-400 hover:text-white flex items-center justify-center transition-colors"><Plus size={16}/></button>
//                 </div>
//              </div>

//              <button 
//                onClick={handleAddToCart}
//                disabled={isAdding}
//                className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-cyan to-[#006080] text-white font-bold text-lg tracking-wide hover:shadow-[0_0_30px_rgba(0,77,97,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
//              >
//                {isAdding ? <span className="animate-pulse">Adding...</span> : <>ADD TO CART <ShoppingCart size={20} /></>}
//              </button>
//           </div>

//           {/* Accordions */}
//           <div className="space-y-2 pt-4">
//               <AccordionItem title="HIGHLIGHTS" isOpen={openSection === 'Highlights'} onClick={() => setOpenSection(openSection === 'Highlights' ? null : 'Highlights')}>
//                   <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm marker:text-brand-glow">
//                       {product.details?.highlights?.map((item, i) => <li key={i}>{item}</li>)}
//                   </ul>
//               </AccordionItem>
//               <AccordionItem title="INGREDIENTS" isOpen={openSection === 'Ingredients'} onClick={() => setOpenSection(openSection === 'Ingredients' ? null : 'Ingredients')}>
//                   <div className="space-y-3 text-slate-300 text-sm leading-relaxed bg-white/5 p-4 rounded-lg">
//                       {product.details?.ingredients?.map((item, i) => <p key={i}>{item}</p>)}
//                   </div>
//               </AccordionItem>
//           </div>

//           {/* Review Section */}
//           <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mt-8">
//             <h3 className="text-white font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> LEAVE A REVIEW</h3>
//             {user ? (
//               <form onSubmit={handleReviewSubmit} className="space-y-4">
//                 <div className="flex gap-2">
//                   {[1, 2, 3, 4, 5].map(star => (
//                     <Star
//                       key={star}
//                       size={24}
//                       className={`cursor-pointer transition-colors ${
//                         star <= reviewRating ? "text-yellow-500" : "text-slate-600"
//                       }`}
//                       fill={star <= reviewRating ? "currentColor" : "none"}
//                       onClick={() => setReviewRating(star)}
//                     />
//                   ))}
//                 </div>
//                 <textarea 
//                   value={reviewComment}
//                   onChange={(e) => setReviewComment(e.target.value)}
//                   placeholder="Share your experience..."
//                   className="w-full bg-dark-900 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none min-h-[100px]"
//                 />
//                 <button 
//                   disabled={isSubmittingReview}
//                   className="px-6 py-2 bg-brand-glow/20 border border-brand-glow/40 text-brand-glow rounded-lg hover:bg-brand-glow/30 transition-all font-bold text-xs"
//                 >
//                   {isSubmittingReview ? "SUBMITTING..." : "SUBMIT REVIEW"}
//                 </button>
//               </form>
//             ) : (
//               <p className="text-slate-400 text-sm">Please login to write a review.</p>
//             )}
//           </div>

//           {/* Suggestions */}
//           {suggestions.length > 0 && (
//             <div className="pt-12 border-t border-white/10">
//               <h3 className="text-white font-bold text-xl mb-6 uppercase tracking-widest">Recommended in {product.categoryName}</h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {suggestions.map(s => (
//                   <Link key={s.id} to={`/product/${s.slug}`} className="group">
//                     <div className={`aspect-square rounded-2xl bg-gradient-to-br ${s.image_color || 'from-gray-700 to-gray-800'} relative overflow-hidden mb-3 border border-white/5`}>
//                         {s.cover_image_url ? (
//                             <img src={s.cover_image_url} alt={s.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
//                         ) : (
//                             <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
//                         )}
//                     </div>
//                     <h4 className="text-white font-medium text-xs group-hover:text-brand-glow transition-colors truncate">{s.name}</h4>
//                     <p className="text-slate-500 text-[10px] mt-0.5">{s.potency}</p>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// };

// // --- Helper Components ---
// const Loader2 = ({ className }) => (
//   <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//   </svg>
// );

// const AccordionItem = ({ title, isOpen, onClick, children }) => (
//     <div className="border-b border-white/10 last:border-0">
//         <button onClick={onClick} className="w-full flex justify-between items-center py-5 text-left group">
//             <span className={`text-sm font-bold tracking-wider transition-colors ${isOpen ? 'text-brand-glow' : 'text-white group-hover:text-slate-300'}`}>{title}</span>
//             <ChevronDown size={18} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-glow' : ''}`} />
//         </button>
//         <AnimatePresence>
//             {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-6 pt-0">{children}</div></motion.div>}
//         </AnimatePresence>
//     </div>
// );

// export default ProductDetail;

// import { supabase } from '../client/supabaseClient';

// export const getProductDetail = async (idOrSlug) => {
//   // Regex to check if the string is a valid UUID
//   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

//   let query = supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `);

//   if (isUuid) {
//     query = query.eq('id', idOrSlug);
//   } else {
//     query = query.eq('slug', idOrSlug);
//   }

//   const { data, error } = await query.single();

//   if (error) {
//     console.error("Database Error:", error);
//     throw error;
//   }

//   // --- DYNAMIC DATA RESHAPING ---
//   const dynamicOptions = {}; 
//   const variantLookup = {};

//   if (data.product_variants) {
//     data.product_variants.forEach(variant => {
//       // Skip if no mapping exists
//       if (!variant.variant_selection_map) return;

//       const keyParts = [];

//       variant.variant_selection_map.forEach(selection => {
//         const opt = selection.option;
//         // Check if option exists. We REMOVED the strict check for (!opt.type)
//         if (!opt) return;

//         // --- BUG FIX START ---
//         // If type is null (common for Flavors in your DB), default to 'Flavor'
//         const typeName = opt.type?.name || 'Flavor'; 
//         const valueName = opt.name;     
//         // --- BUG FIX END ---

//         // Add to UI Options (Unique check)
//         if (!dynamicOptions[typeName]) dynamicOptions[typeName] = [];
        
//         // Only push if it doesn't already exist in the list
//         if (!dynamicOptions[typeName].find(o => o.name === valueName)) {
//           dynamicOptions[typeName].push({
//             name: valueName,
//             color: opt.metadata?.color 
//           });
//         }

//         // Build the unique key part
//         keyParts.push(`${typeName}:${valueName}`);
//       });

//       // Sort keys to ensure deterministic matching (e.g. "Flavor:Mint|Size:4")
//       keyParts.sort(); 
//       const uniqueKey = keyParts.join('|');

//       variantLookup[uniqueKey] = {
//         id: variant.id,
//         price: variant.price,
//         stock: variant.stock_quantity
//       };
//     });
//   }

//   // Calculate Ratings
//   const totalReviews = data.reviews?.length || 0;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 4.5;

//   return {
//     ...data,
//     avgRating,
//     categoryName: data.category?.name,
//     dynamicOptions, 
//     variantLookup   
//   };
// };

// export const getSuggestedProducts = async (categoryId, currentProductId) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('id, name, slug, image_color, potency, cover_image_url')
//     .eq('category_id', categoryId)
//     .neq('id', currentProductId)
//     .limit(4); 

//   if (error || !data || data.length === 0) return [];
//   return data;
// };

// export const submitProductReview = async (productId, userId, rating, comment) => {
//   const { data, error } = await supabase
//     .from('reviews')
//     .insert([{ product_id: productId, user_id: userId, rating, comment }]);
  
//   if (error) {
//     if (error.code === '23505') throw new Error("You have already reviewed this product.");
//     throw error;
//   }
//   return data;
// };

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Star, Loader2 } from 'lucide-react';
// import { getAllProducts, getCategories } from '../api/productApi';

// const Shop = () => {
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadShopData = async () => {
//       try {
//         setLoading(true);
//         const [productsData, categoriesData] = await Promise.all([
//           getAllProducts(),
//           getCategories()
//         ]);
//         setProducts(productsData);
//         setCategories(categoriesData);
//       } catch (err) {
//         console.error("Error loading shop:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadShopData();
//   }, []);

//   // Filter Logic: Filters based on the categoryName joined from the DB
//   const filteredProducts = activeCategory === 'All' 
//     ? products 
//     : products.filter(p => p.categoryName === activeCategory);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-dark-900">
//         <Loader2 className="w-10 h-10 text-brand-glow animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto bg-dark-900">
//       {/* Background Glow */}
//       <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,163,255,0.08)_0%,transparent_50%)] pointer-events-none" />
      
//       {/* Header & Filter Bar */}
//       <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6 relative z-10">
//         <div>
//           <h1 className="text-5xl font-bold text-white mb-2 tracking-tighter">Shop All</h1>
//           <p className="text-slate-400">Premium alkaloids, engineered for precision.</p>
//         </div>
        
//         <div className="flex gap-2 mt-6 md:mt-0 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
//           {categories.map(cat => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
//                 activeCategory === cat 
//                 ? 'bg-brand-glow text-dark-900 shadow-[0_0_20px_rgba(0,163,255,0.3)]' 
//                 : 'bg-white/5 text-slate-400 border border-white/10 hover:border-white/20'
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Product Grid */}
//       <motion.div 
//         layout
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
//       >
//         <AnimatePresence mode='popLayout'>
//           {filteredProducts.map((product) => (
//             <ShopProductCard key={product.id} product={product} />
//           ))}
//         </AnimatePresence>
//       </motion.div>

//       {filteredProducts.length === 0 && (
//         <div className="text-center py-20 text-slate-500">
//           No products found in this category.
//         </div>
//       )}
//     </div>
//   );
// };

// const ShopProductCard = ({ product }) => {
//   return (
//     <motion.div
//       layout
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       className="group relative bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-brand-glow/40 transition-all duration-500 backdrop-blur-sm"
//     >
//       {/* Image Area */}
//       <div className={`h-72 w-full bg-gradient-to-br ${product.image_color} opacity-20 relative flex items-center justify-center`}>
//          {/* Animated Glow */}
//         <div className={`absolute w-48 h-48 rounded-full bg-gradient-to-r ${product.image_color} blur-[80px] opacity-50 group-hover:opacity-80 transition-opacity`} />
        
//         {/* Dynamic Badge */}
//         <div className="absolute top-4 left-4 z-20">
//             <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-tighter">
//                 {product.potency}
//             </span>
//         </div>

//         {/* Product Box Visual */}
//         <div className="relative z-10 w-32 h-44 bg-dark-900 rounded-xl border border-white/20 flex flex-col items-center justify-center shadow-2xl transform group-hover:-translate-y-4 group-hover:rotate-2 transition-all duration-700">
//            <div className="text-lg font-black text-white italic tracking-tighter">Cloud 7</div>
//            <div className="h-px w-12 bg-brand-glow/30 my-2" />
//            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{product.categoryName}</span>
//         </div>
//       </div>

//       {/* Info Area */}
//       <div className="p-8">
//         <div className="flex justify-between items-center mb-3">
//            <div className="text-[10px] font-black text-brand-glow uppercase tracking-[0.2em]">{product.tagline}</div>
//            <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
//               <Star size={12} fill="currentColor" /> {product.rating || 'New'}
//            </div>
//         </div>
        
//         <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-brand-glow transition-colors line-clamp-1">{product.name}</h3>
        
//         <div className="flex justify-between items-center">
//           <div className="flex flex-col">
//             <span className="text-xs text-slate-500 uppercase font-bold">Starting at</span>
//             <span className="text-2xl font-bold text-white">${product.displayPrice}</span>
//           </div>
          
//           <Link 
//             to={`/product/${product.slug}`}
//             className="h-12 px-8 rounded-xl bg-white text-black font-bold hover:bg-brand-glow hover:text-white transition-all duration-300 flex items-center justify-center text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)]"
//           >
//             VIEW DETAILS
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Shop;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Search, Filter, Sparkles, Zap, Loader2, ShoppingBag } from 'lucide-react';
// import { getAllProducts, getCategories } from '../api/productApi';
// // import { ProductCard } from '../components/ProductCard';
// import { ProductCard } from '../components/home/ProductCard';
// const Shop = () => {
//   // --- STATE ---
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [categories, setCategories] = useState(['All']);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     const initShop = async () => {
//       try {
//         const [productsData, categoriesData] = await Promise.all([
//           getAllProducts(),
//           getCategories()
//         ]);
//         setProducts(productsData);
//         setFilteredProducts(productsData);
//         setCategories(categoriesData);
//       } catch (err) {
//         console.error("Failed to load shop data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     initShop();
//   }, []);

//   // --- FILTERING LOGIC ---
//   useEffect(() => {
//     let result = products;

//     // 1. Filter by Category
//     if (activeCategory !== 'All') {
//       result = result.filter(p => p.categoryName === activeCategory);
//     }

//     // 2. Filter by Search
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(p => 
//         p.name.toLowerCase().includes(query) || 
//         p.description?.toLowerCase().includes(query)
//       );
//     }

//     setFilteredProducts(result);
//   }, [activeCategory, searchQuery, products]);

//   // --- LOADING SKELETON ---
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center">
//         <Loader2 className="animate-spin text-brand-glow mb-4" size={48} />
//         <p className="text-slate-500 animate-pulse font-mono uppercase tracking-widest text-xs">Loading Protocols...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-dark-900 pb-20 relative overflow-x-hidden">
      
//       {/* 1. DYNAMIC BACKGROUND (Ambient Orbs) */}
//       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//         <motion.div 
//           animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
//           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-glow/10 rounded-full blur-[120px]"
//         />
//         <motion.div 
//           animate={{ x: [0, -50, 0], y: [0, -30, 0], opacity: [0.05, 0.15, 0.05] }}
//           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//           className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"
//         />
//       </div>

//       {/* 2. HERO HEADER */}
//       <div className="relative pt-32 pb-12 px-6 z-10">
//         <div className="max-w-7xl mx-auto text-center">
//            <motion.div
//              initial={{ opacity: 0, y: 20 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ duration: 0.6 }}
//            >
//              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-glow text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
//                <Sparkles size={12} /> Premium Bio-Hacking
//              </span>
//              <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
//                Lab-Grade <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">Protocols</span>
//              </h1>
//              <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
//                Explore our curated collection of engineered nutrition designed to optimize your biological performance.
//              </p>
//            </motion.div>
//         </div>
//       </div>

//       {/* 3. STICKY FILTER BAR */}
//       <div className="sticky top-24 z-40 px-4 mb-12">
//         <div className="max-w-7xl mx-auto">
//           <motion.div 
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row gap-4 justify-between items-center"
//           >
//             {/* Category Pills */}
//             <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
//               {categories.map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setActiveCategory(cat)}
//                   className={`
//                     px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
//                     ${activeCategory === cat 
//                       ? 'bg-brand-glow text-dark-900 shadow-[0_0_20px_rgba(34,211,238,0.3)]' 
//                       : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}
//                   `}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Search Input */}
//             <div className="relative w-full md:w-80">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
//               <input 
//                 type="text" 
//                 placeholder="Search protocols..." 
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full bg-dark-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all placeholder:text-slate-600"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* 4. PRODUCT GRID */}
//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Results Count */}
//         <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
//           <p className="text-slate-400 text-sm font-mono">
//             Showing <span className="text-white font-bold">{filteredProducts.length}</span> results
//           </p>
//           {activeCategory !== 'All' && (
//             <div className="text-xs text-brand-glow font-bold uppercase tracking-widest flex items-center gap-2">
//               <Filter size={12} /> {activeCategory}
//             </div>
//           )}
//         </div>

//         {filteredProducts.length === 0 ? (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }}
//             className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
//           >
//             <ShoppingBag className="mx-auto text-slate-600 mb-4" size={48} />
//             <h3 className="text-2xl font-bold text-white mb-2">No protocols found</h3>
//             <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
//             <button 
//               onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
//               className="mt-6 px-6 py-2 bg-white text-dark-900 font-bold rounded-xl hover:bg-brand-glow transition-colors"
//             >
//               Reset Filters
//             </button>
//           </motion.div>
//         ) : (
//           <motion.div 
//             layout 
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             <AnimatePresence>
//               {filteredProducts.map((product) => (
//                 <motion.div
//                   layout
//                   key={product.id}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   {/* Using your updated ProductCard component */}
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </motion.div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Shop;

// // import React, { useState } from 'react';
// // import { ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus, ExternalLink } from 'lucide-react';
// // import CheckoutModal from '../components/checkout/CheckoutModal';
// // import { useAuth } from '../context/AuthContext';
// // import { useCart } from '../context/CartContext';
// // import { Link } from 'react-router-dom';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const EmptyCartView = () => (
// //   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
// //     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
// //       <ShoppingBag size={40} className="text-slate-500" />
// //     </div>
// //     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
// //     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
// //       Looks like you haven't added anything yet. Explore our collection to find your edge.
// //     </p>
// //     <Link 
// //       to="/shop" 
// //       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
// //     >
// //       START SHOPPING
// //     </Link>
// //   </div>
// // );

// // const Cart = () => {
// //   const { cartItems, removeFromCart, updateQuantity, getSubtotal, getShipping, deliveryConfig } = useCart();
// //   const { user } = useAuth();
// //   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

// //   const subtotal = getSubtotal();
// //   const shipping = getShipping();
// //   const total = subtotal + shipping;
// //   const amountToFree = Math.max(0, (deliveryConfig?.min_order_value || 0) - subtotal);

// //   if (cartItems.length === 0) return <EmptyCartView />;

// //   return (
// //     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
// //       <h1 className="text-4xl font-black text-white mb-10 italic tracking-tighter uppercase">YOUR CART</h1>
      
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
// //         <div className="lg:col-span-2">
// //             {/* Free Shipping Progress Bar */}
// //             <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl mb-8 flex items-center gap-4">
// //                 <Truck className="text-brand-glow" size={20} />
// //                 <p className="text-sm text-white">
// //                     {amountToFree > 0 ? (
// //                         <>Add <span className="font-bold text-brand-glow">${amountToFree.toFixed(2)}</span> more for <span className="font-bold uppercase tracking-wider">FREE SHIPPING</span></>
// //                     ) : (
// //                         <span className="text-green-400 font-bold uppercase tracking-wider">✓ YOU'VE EARNED FREE SHIPPING!</span>
// //                     )}
// //                 </p>
// //             </div>
            
// //             {/* Product List */}
// //             <div className="space-y-6">
// //               <AnimatePresence>
// //                 {cartItems.map((item, index) => (
// //                   <motion.div 
// //                     key={`${item.id}-${item.selectedSize.id}-${item.selectedFlavor.name}`}
// //                     initial={{ opacity: 0, y: 10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     exit={{ opacity: 0, x: -20 }}
// //                     className="bg-white/5 border border-white/10 rounded-[2rem] p-5 sm:p-7 flex flex-col sm:flex-row gap-8 items-center relative group hover:bg-white/[0.08] transition-all"
// //                   >
// //                     {/* Product Image Section */}
// //                     <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${item.imageColor || 'from-blue-600 to-purple-600'} flex-shrink-0 flex items-center justify-center shadow-2xl border border-white/5`}>
// //                        <ShoppingBag className="text-white/20" size={48} />
// //                     </div>

// //                     {/* Product Info Section */}
// //                     <div className="flex-1 w-full flex flex-col justify-center">
// //                       <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
// //                         <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">
// //                           {item.name}
// //                         </h3>
// //                         <Link 
// //                           to={`/product/${item.slug || item.id}`} 
// //                           className="text-[10px] font-black text-slate-400 hover:text-brand-glow flex items-center gap-1.5 transition-colors uppercase tracking-widest group/link"
// //                         >
// //                           VIEW PRODUCT <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
// //                         </Link>
// //                       </div>
                      
// //                       <div className="flex flex-wrap gap-2 mb-6">
// //                         <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-white/5">
// //                           Flavor: {item.selectedFlavor.name}
// //                         </span>
// //                         <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-slate-300 uppercase tracking-widest border border-white/5">
// //                           Size: {item.selectedSize.count} Pack
// //                         </span>
// //                       </div>

// //                       <div className="flex items-center justify-between">
// //                         {/* Quantity Controls */}
// //                         <div className="flex items-center bg-dark-900 rounded-xl border border-white/10 p-1">
// //                           <button 
// //                             onClick={() => updateQuantity(index, item.quantity - 1)}
// //                             className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
// //                           >
// //                             <Minus size={16} />
// //                           </button>
// //                           <span className="w-10 text-center text-white font-black text-lg">{item.quantity}</span>
// //                           <button 
// //                             onClick={() => updateQuantity(index, item.quantity + 1)}
// //                             className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
// //                           >
// //                             <Plus size={16} />
// //                           </button>
// //                         </div>

// //                         <div className="text-2xl font-black text-white italic tracking-tighter">
// //                           ${(item.selectedSize.price * item.quantity).toFixed(2)}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Remove Button */}
// //                     <button 
// //                       onClick={() => removeFromCart(index)}
// //                       className="absolute top-5 right-5 p-2 text-slate-600 hover:text-red-500 transition-colors"
// //                     >
// //                       <Trash2 size={18} />
// //                     </button>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>
// //             </div>
// //         </div>

// //         {/* Summary Sidebar */}
// //         <aside className="lg:sticky lg:top-32">
// //             <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-xl">
// //                 <h3 className="text-2xl font-black text-white mb-8 italic uppercase tracking-tighter">
// //                   ORDER SUMMARY
// //                 </h3>
                
// //                 <div className="space-y-5 mb-8">
// //                     <div className="flex justify-between items-center text-slate-400">
// //                       <span className="text-xs font-bold uppercase tracking-[0.2em]">Subtotal</span>
// //                       <span className="text-white font-bold tracking-tight">${subtotal.toFixed(2)}</span>
// //                     </div>
// //                     <div className="flex justify-between items-center text-slate-400">
// //                         <span className="text-xs font-bold uppercase tracking-[0.2em]">Shipping</span>
// //                         <span className={shipping === 0 ? "text-green-400 font-bold" : "text-white font-bold"}>
// //                             {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
// //                         </span>
// //                     </div>
                    
// //                     <div className="border-t border-white/10 pt-6 mt-6">
// //                       <div className="flex justify-between items-end">
// //                         <div>
// //                           <span className="text-white font-black italic uppercase tracking-tighter text-lg leading-none">TOTAL</span>
// //                           <span className="block text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Inc. all taxes</span>
// //                         </div>
// //                         <div className="text-right">
// //                           <span className="text-5xl font-black text-brand-glow italic tracking-tighter leading-none">
// //                             ${total.toFixed(2)}
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                 </div>

// //                 <button 
// //                     onClick={() => setIsCheckoutOpen(true)}
// //                     className="w-full py-5 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.05)] group"
// //                 >
// //                     CHECKOUT NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
// //                 </button>

// //                 <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
// //                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
// //                     <span className="text-[10px] font-black">SSL</span>
// //                   </div>
// //                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
// //                     <span className="text-[10px] font-black">24/7</span>
// //                   </div>
// //                 </div>
// //             </div>
// //         </aside>
// //       </div>

// //       <CheckoutModal 
// //         isOpen={isCheckoutOpen} 
// //         onClose={() => setIsCheckoutOpen(false)} 
// //         total={total}
// //       />
// //     </div>
// //   );
// // };

// // export default Cart;

// import React, { useState } from 'react';
// import { ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus } from 'lucide-react';
// import CheckoutModal from '../components/checkout/CheckoutModal';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const EmptyCartView = () => (
//   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
//     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
//       <ShoppingBag size={40} className="text-slate-500" />
//     </div>
//     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
//     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
//       Looks like you haven't added anything yet. Explore our collection to find your edge.
//     </p>
//     <Link 
//       to="/shop" 
//       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//     >
//       START SHOPPING
//     </Link>
//   </div>
// );

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, getSubtotal, getShipping, deliveryConfig } = useCart();
//   const { user } = useAuth();
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   const subtotal = getSubtotal();
//   const shipping = getShipping();
//   const total = subtotal + shipping;
//   const amountToFree = Math.max(0, (deliveryConfig?.min_order_value || 0) - subtotal);

//   if (!cartItems || cartItems.length === 0) return <EmptyCartView />;

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-black text-white mb-10 italic tracking-tighter uppercase">YOUR CART</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
//         <div className="lg:col-span-2">
//             {/* Free Shipping Progress Bar */}
//             <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl mb-8 flex items-center gap-4">
//                 <Truck className="text-brand-glow" size={20} />
//                 <p className="text-sm text-white">
//                     {amountToFree > 0 ? (
//                         <>Add <span className="font-bold text-brand-glow">${amountToFree.toFixed(2)}</span> more for <span className="font-bold uppercase tracking-wider">FREE SHIPPING</span></>
//                     ) : (
//                         <span className="text-green-400 font-bold uppercase tracking-wider">✓ YOU'VE EARNED FREE SHIPPING!</span>
//                     )}
//                 </p>
//             </div>
            
//             {/* Product List */}
//             <div className="space-y-6">
//               <AnimatePresence>
//                 {cartItems.map((item, index) => {
//                   // SAFETY CHECK: Skip invalid items to prevent crash
//                   if (!item.selectedSize) return null;

//                   return (
//                     <motion.div 
//                       // FIX: Safe unique key generation
//                       key={`${item.id}-${item.selectedSize?.id || 'nosize'}-${item.selectedFlavor?.name || 'noflavor'}-${index}`}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="bg-white/5 border border-white/10 rounded-[2rem] p-5 sm:p-7 flex flex-col sm:flex-row gap-8 items-center relative group hover:bg-white/[0.08] transition-all"
//                     >
//                       {/* Product Image Section */}
//                       <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${item.imageColor || 'from-blue-600 to-purple-600'} flex-shrink-0 flex items-center justify-center shadow-2xl border border-white/5`}>
//                         <ShoppingBag className="text-white/20" size={48} />
//                       </div>

//                       {/* Product Info Section */}
//                       <div className="flex-1 w-full flex flex-col justify-center">
//                           <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
//                               <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">
//                                 {item.name}
//                               </h3>
//                               <Link to={`/product/${item.slug || item.id}`} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
//                                   View Details
//                               </Link>
//                           </div>

//                           {/* Options */}
//                           <div className="flex flex-wrap gap-3 mb-6">
//                               <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 font-medium">
//                                 Flavor: <span className="text-white">{item.selectedFlavor?.name}</span>
//                               </div>
//                               <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 font-medium">
//                                 Size: <span className="text-white">{item.selectedSize?.count} Count</span>
//                               </div>
//                           </div>

//                           {/* Price & Quantity Controls */}
//                           <div className="flex items-center justify-between">
//                             <div className="text-2xl font-bold text-white">
//                                 ${(parseFloat(item.selectedSize?.price || 0) * item.quantity).toFixed(2)}
//                             </div>

//                             <div className="flex items-center gap-4 bg-black/40 rounded-xl p-1 border border-white/10">
//                                 <button 
//                                   onClick={() => updateQuantity(index, item.quantity - 1)}
//                                   className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                                 >
//                                   <Minus size={14} />
//                                 </button>
//                                 <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
//                                 <button 
//                                   onClick={() => updateQuantity(index, item.quantity + 1)}
//                                   className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                                 >
//                                   <Plus size={14} />
//                                 </button>
//                             </div>
//                           </div>
//                       </div>

//                       {/* Remove Button */}
//                       <button 
//                           onClick={() => removeFromCart(index)}
//                           className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
//                       >
//                           <Trash2 size={18} />
//                       </button>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>
//         </div>

//         {/* Checkout Summary */}
//         <aside className="lg:col-span-1 lg:sticky lg:top-32">
//             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
//                 <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
//                 <div className="space-y-4 mb-8">
//                     <div className="flex justify-between text-slate-400 text-sm">
//                       <span>Subtotal</span>
//                       <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-slate-400 text-sm">
//                       <span>Shipping</span>
//                       <span className="text-white font-medium">
//                         {shipping === 0 ? <span className="text-brand-glow">FREE</span> : `$${shipping.toFixed(2)}`}
//                       </span>
//                     </div>
//                     <div className="pt-4 border-t border-white/10">
//                       <div className="flex justify-between items-end">
//                         <span className="text-slate-300 font-bold">Total</span>
//                         <div className="text-right">
//                           <span className="text-3xl font-black text-white tracking-tight">
//                             ${total.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                 </div>

//                 <button 
//                     onClick={() => setIsCheckoutOpen(true)}
//                     className="w-full py-5 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.05)] group"
//                 >
//                     CHECKOUT NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
//                 </button>

//                 <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">SSL</span>
//                   </div>
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">24/7</span>
//                   </div>
//                 </div>
//             </div>
//         </aside>
//       </div>

//       <CheckoutModal 
//         isOpen={isCheckoutOpen} 
//         onClose={() => setIsCheckoutOpen(false)} 
//         total={total}
//       />
//     </div>
//   );
// };

// export default Cart;

// // // import { supabase } from '../client/supabaseClient';

// // // export const cartApi = {
// // //   // Sync local cart to DB on login
// // //   syncCart: async (userId, localItems) => {
// // //     for (const item of localItems) {
// // //       await supabase.from('cart_items').upsert({
// // //         user_id: userId,
// // //         variant_id: item.selectedSize.id,
// // //         product_id: item.id,
// // //         flavor_name: item.selectedFlavor.name,
// // //         quantity: item.quantity
// // //       });
// // //     }
// // //   },

// // //   fetchCart: async (userId) => {
// // //     const { data } = await supabase
// // //       .from('cart_items')
// // //       .select(`*, products(*), product_variants(*)`)
// // //       .eq('user_id', userId);
// // //     return data || [];
// // //   },

// // //   updateQuantity: async (itemId, quantity) => {
// // //     await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
// // //   },

// // //   removeItem: async (itemId) => {
// // //     await supabase.from('cart_items').delete().eq('id', itemId);
// // //   },

// // //   clearCart: async (userId) => {
// // //     await supabase.from('cart_items').delete().eq('user_id', userId);
// // //   },

// // //   getDeliveryConfig: async () => {
// // //     const { data } = await supabase.from('delivery_configs').select('*').eq('is_active', true).single();
// // //     return data;
// // //   }
// // // };

// // import { supabase } from '../client/supabaseClient';

// // export const cartApi = {
// //   // Fetch Cart with robust selection
// //   fetchCart: async (userId) => {
// //     const { data, error } = await supabase
// //       .from('cart_items')
// //       .select(`
// //         *, 
// //         products (id, name, slug, image_color, potency), 
// //         product_variants (id, price, size_name)
// //       `)
// //       .eq('user_id', userId);
      
// //     if (error) {
// //       console.error("Error fetching cart:", error);
// //       return [];
// //     }
// //     return data || [];
// //   },

// //   // THE FIXED ADD/SYNC LOGIC
// //   addToCart: async (userId, product, variantId, flavorName, quantityToAdd) => {
// //     // 1. Check if item already exists for this user
// //     const { data: existingItem } = await supabase
// //       .from('cart_items')
// //       .select('id, quantity')
// //       .eq('user_id', userId)
// //       .eq('variant_id', variantId) // This is the unique key
// //       .maybeSingle();

// //     if (existingItem) {
// //       // 2. UPDATE: Item exists, so add to the existing count
// //       const newQuantity = existingItem.quantity + quantityToAdd;
// //       const { data, error } = await supabase
// //         .from('cart_items')
// //         .update({ quantity: newQuantity })
// //         .eq('id', existingItem.id)
// //         .select();
      
// //       if (error) throw error;
// //       return data;
// //     } else {
// //       // 3. INSERT: Item does not exist, create new row
// //       const { data, error } = await supabase
// //         .from('cart_items')
// //         .insert({
// //           user_id: userId,
// //           product_id: product.id,
// //           variant_id: variantId,
// //           flavor_name: flavorName,
// //           quantity: quantityToAdd
// //         })
// //         .select();

// //       if (error) throw error;
// //       return data;
// //     }
// //   },

// //   updateQuantity: async (itemId, quantity) => {
// //     await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
// //   },

// //   removeItem: async (itemId) => {
// //     await supabase.from('cart_items').delete().eq('id', itemId);
// //   },

// //   getDeliveryConfig: async () => {
// //     const { data } = await supabase.from('delivery_configs').select('*').eq('is_active', true).single();
// //     return data;
// //   }
// // };

// import { supabase } from '../client/supabaseClient';

// export const cartApi = {
//   // 1. FETCH CART (Fixed to get "Size Name" from nested tables)
//   fetchCart: async (userId) => {
//     const { data, error } = await supabase
//       .from('cart_items')
//       .select(`
//         *,
//         products (id, name, slug, image_color, potency),
//         product_variants (
//           id, 
//           price,
//           variant_selection_map (
//             variant_options (
//               name
//             )
//           )
//         )
//       `)
//       .eq('user_id', userId);

//     if (error) {
//       console.error("Error fetching cart:", error);
//       return [];
//     }
//     return data || [];
//   },

//   // 2. ADD TO CART (Smart Logic: Update if exists, Insert if new)
//   addToCart: async (userId, product, variantId, flavorName, quantityToAdd) => {
//     try {
//       // Check if this specific item (User + Variant + Flavor) already exists
//       const { data: existingItem } = await supabase
//         .from('cart_items')
//         .select('id, quantity')
//         .eq('user_id', userId)
//         .eq('variant_id', variantId)
//         .eq('flavor_name', flavorName)
//         .maybeSingle();

//       if (existingItem) {
//         // A. UPDATE existing row (Increase Count)
//         const newQuantity = existingItem.quantity + quantityToAdd;
//         const { data, error } = await supabase
//           .from('cart_items')
//           .update({ quantity: newQuantity })
//           .eq('id', existingItem.id)
//           .select();
        
//         if (error) throw error;
//         return data;
//       } else {
//         // B. INSERT new row
//         const { data, error } = await supabase
//           .from('cart_items')
//           .insert({
//             user_id: userId,
//             product_id: product.id,
//             variant_id: variantId,
//             flavor_name: flavorName,
//             quantity: quantityToAdd
//           })
//           .select();

//         if (error) throw error;
//         return data;
//       }
//     } catch (err) {
//       console.error("API Add Cart Error:", err);
//       throw err;
//     }
//   },

//   // 3. Update Quantity (Simple Update)
//   updateQuantity: async (itemId, quantity) => {
//     await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
//   },

//   // 4. Remove Item
//   removeItem: async (itemId) => {
//     await supabase.from('cart_items').delete().eq('id', itemId);
//   },

//   // 5. Get Config
//   getDeliveryConfig: async () => {
//     const { data } = await supabase.from('delivery_configs').select('*').eq('is_active', true).maybeSingle();
//     return data;
//   }
// };

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, ShieldCheck, DollarSign } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // import { useCart } from '../../context/CartContext';
// // import { useNavigate } from 'react-router-dom';
// // import { supabase } from '../../client/supabaseClient';
// // import { cartApi } from '../../api/cartApi';

// // const CheckoutModal = ({ isOpen, onClose }) => {
// //   const { user } = useAuth();
// //   const { cartItems, getSubtotal, getShipping, clearCart } = useCart();
// //   const navigate = useNavigate();

// //   // --- STEPS STATE ---
// //   // 1: Shipping Address
// //   // 2: Billing Address (US Requirement for AVS)
// //   // 3: Payment Method & Review
// //   const [step, setStep] = useState(1); 
// //   const [loading, setLoading] = useState(false);
// //   const [processingOrder, setProcessingOrder] = useState(false);

// //   // --- DATA STATE ---
// //   const [addresses, setAddresses] = useState([]);
// //   const [shippingAddress, setShippingAddress] = useState(null);
  
// //   // Billing State
// //   const [sameAsShipping, setSameAsShipping] = useState(true);
// //   const [billingAddress, setBillingAddress] = useState(null);

// //   // --- NEW ADDRESS FORM STATE ---
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [newAddr, setNewAddr] = useState({ 
// //     full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' 
// //   });

// //   // --- CALCULATIONS ---
// //   const subtotal = getSubtotal();
// //   const shippingCost = getShipping();
  
// //   // US Tax Calculation Logic (Mocked)
// //   // In production, you would call an API (like Stripe Tax or Avalara) here based on zip_code
// //   const estimatedTax = shippingAddress?.state === 'NY' ? subtotal * 0.08875 : 0; 
  
// //   const total = subtotal + shippingCost + estimatedTax;

// //   // --- INITIAL LOAD ---
// //   useEffect(() => {
// //     if (user && isOpen) {
// //       fetchAddresses();
// //       setStep(1);
// //     }
// //   }, [user, isOpen]);

// //   // Ensure billing matches shipping if checkbox is checked
// //   useEffect(() => {
// //     if (sameAsShipping) {
// //       setBillingAddress(shippingAddress);
// //     }
// //   }, [sameAsShipping, shippingAddress]);

// //   const fetchAddresses = async () => {
// //     const { data } = await supabase
// //       .from('addresses')
// //       .select('*')
// //       .eq('user_id', user.id)
// //       .order('is_default', { ascending: false }); // Default first
      
// //     setAddresses(data || []);
    
// //     // Auto-select default
// //     const defaultAddr = data?.find(a => a.is_default) || data?.[0];
// //     setShippingAddress(defaultAddr);
// //     setBillingAddress(defaultAddr);
// //   };

// //   const handleAddNewAddress = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
    
// //     // Insert new address
// //     const { data, error } = await supabase
// //       .from('addresses')
// //       .insert([{ ...newAddr, user_id: user.id, is_default: addresses.length === 0 }]) // Make default if it's the first one
// //       .select();
    
// //     if (!error && data) {
// //       const newAddressList = [...addresses, data[0]];
// //       setAddresses(newAddressList);
// //       setShippingAddress(data[0]); // Auto select the new one
// //       setShowAddForm(false);
// //       // Reset form
// //       setNewAddr({ full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' });
// //     }
// //     setLoading(false);
// //   };

// //   const handlePlaceOrder = async () => {
// //     if (!user) return navigate('/login');
// //     if (!shippingAddress || !billingAddress) return alert("Please select addresses.");

// //     setProcessingOrder(true);

// //     try {
// //       /* ---------------------------------------------------------
// //          PAYMENT INTEGRATION POINT (Stripe/Razorpay)
// //          ---------------------------------------------------------
// //          1. Create a PaymentIntent on your backend.
// //          2. Confirm the payment on the frontend here.
// //          3. Only proceed to DB insertion if payment.status === 'succeeded'.
         
// //          For now, we simulate a successful payment delay.
// //       */
// //       await new Promise(resolve => setTimeout(resolve, 2000)); 
      
// //       const mockPaymentId = `pay_${Date.now()}`; 
// //       const mockProvider = "stripe_mock";

// //       // ---------------------------------------------------------
// //       // DATABASE TRANSACTION
// //       // ---------------------------------------------------------

// //       // 1. Create Order Record
// //       const { data: order, error: orderErr } = await supabase
// //         .from('orders')
// //         .insert([{
// //           user_id: user.id,
// //           total_amount: total,
// //           tax_amount: estimatedTax,
// //           shipping_cost: shippingCost,
// //           status: 'paid', // Or 'processing' if you use webhooks
// //           shipping_address: shippingAddress, // JSONB Snapshot
// //           billing_address: billingAddress,   // JSONB Snapshot
// //           payment_intent_id: mockPaymentId
// //         }])
// //         .select()
// //         .single();

// //       if (orderErr) throw new Error(orderErr.message);

// //       // 2. Create Order Items (Linking Variants)
// //       const orderItemsData = cartItems.map(item => ({
// //         order_id: order.id,
// //         product_id: item.id,
// //         variant_id: item.variantId, // Crucial: The specific SKU UUID
// //         flavor_name: item.flavorName, // Legacy/Fallback
// //         item_name: item.name, // Snapshot name
// //         item_variant_label: item.description, // Snapshot description (e.g. "Size: 4 | Flavor: Mint")
// //         quantity: item.quantity,
// //         price_at_purchase: item.price
// //       }));

// //       const { error: itemsErr } = await supabase.from('order_items').insert(orderItemsData);
// //       if (itemsErr) throw new Error(itemsErr.message);

// //       // 3. Create Payment Record (New Table)
// //       const { error: payErr } = await supabase.from('payments').insert([{
// //         order_id: order.id,
// //         user_id: user.id,
// //         provider: mockProvider,
// //         provider_payment_id: mockPaymentId,
// //         amount: total,
// //         status: 'succeeded'
// //       }]);

// //       if (payErr) console.error("Payment Log Error:", payErr); // Don't block flow, just log

// //       // 4. Cleanup
// //       await cartApi.clearCart(user.id); // Clear DB Cart
// //       clearCart(); // Clear Context State

// //       // 5. Success
// //       alert("Order Placed Successfully!");
// //       onClose();
// //       navigate('/account'); // Make sure you have this route

// //     } catch (err) {
// //       console.error("Checkout Error:", err);
// //       alert("Failed to place order. Please try again.");
// //     } finally {
// //       setProcessingOrder(false);
// //     }
// //   };

// //   // --- RENDER HELPERS ---
// //   const renderAddressList = (selectedId, onSelect) => (
// //     <div className="space-y-3 mb-4">
// //       {addresses.map((addr) => (
// //         <div 
// //           key={addr.id}
// //           onClick={() => onSelect(addr)}
// //           className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group
// //             ${selectedId === addr.id 
// //               ? 'border-brand-glow bg-brand-glow/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
// //               : 'border-white/5 bg-white/5 hover:border-white/20'}`}
// //         >
// //           <div>
// //             <div className="flex items-center gap-2">
// //               <p className="text-white text-sm font-bold">{addr.full_name}</p>
// //               {addr.is_default && <span className="text-[10px] bg-white/10 px-2 rounded-full text-slate-400">Default</span>}
// //             </div>
// //             <p className="text-slate-400 text-xs mt-1">{addr.street_address}, {addr.city}, {addr.state} {addr.zip_code}</p>
// //           </div>
// //           {selectedId === addr.id && <Check className="text-brand-glow" size={18} />}
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   const renderAddressForm = () => (
// //     <form onSubmit={handleAddNewAddress} className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
// //       <h4 className="col-span-2 text-white text-sm font-bold mb-2">Add New Address</h4>
// //       <input placeholder="Full Name" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, full_name: e.target.value})} required />
// //       <input placeholder="Street Address" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, street_address: e.target.value})} required />
// //       <input placeholder="City" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, city: e.target.value})} required />
// //       <input placeholder="State (NY, CA)" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, state: e.target.value})} required />
// //       <input placeholder="Zip Code" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, zip_code: e.target.value})} required />
      
// //       <div className="col-span-2 flex gap-3 mt-2">
// //         <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
// //         <button type="submit" disabled={loading} className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl text-sm hover:brightness-110 transition-colors">
// //           {loading ? <Loader2 className="animate-spin mx-auto" size={18}/> : "Save Address"}
// //         </button>
// //       </div>
// //     </form>
// //   );

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
// //       {/* Backdrop */}
// //       <motion.div 
// //         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //         onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
// //       />

// //       <motion.div 
// //         initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
// //         className="relative bg-dark-900 border border-white/10 w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
// //       >
        
// //         {/* --- LEFT SIDE: ORDER SUMMARY --- */}
// //         <div className="hidden md:flex w-[350px] bg-white/5 p-8 border-r border-white/5 flex-col h-full">
// //           <h3 className="text-white font-black italic tracking-tighter text-xl mb-6">YOUR ORDER</h3>
          
// //           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
// //             {cartItems.map((item, i) => (
// //               <div key={i} className="flex gap-4 items-start">
// //                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.imageColor} opacity-80 flex-shrink-0 border border-white/10`} />
// //                 <div>
// //                   <p className="text-white text-sm font-bold leading-tight">{item.name}</p>
// //                   <p className="text-brand-glow text-[10px] font-bold uppercase tracking-wider mt-1">{item.description}</p>
// //                   <p className="text-slate-500 text-xs mt-1">{item.quantity} x ${item.price}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
// //             <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
// //             <div className="flex justify-between text-sm"><span className="text-slate-400">Shipping</span><span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
// //             <div className="flex justify-between text-sm"><span className="text-slate-400">Est. Tax</span><span className="text-white">${estimatedTax.toFixed(2)}</span></div>
// //             <div className="pt-4 border-t border-white/5 flex justify-between items-end">
// //                <span className="text-white font-bold">Total</span>
// //                <span className="text-3xl font-black text-brand-glow italic tracking-tighter">${total.toFixed(2)}</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* --- RIGHT SIDE: STEPS --- */}
// //         <div className="flex-1 flex flex-col h-full bg-dark-900 relative">
// //             {/* Header */}
// //             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-dark-900/50 backdrop-blur-md z-10">
// //                <div className="flex items-center gap-2">
// //                  {step > 1 && (
// //                     <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
// //                       <ArrowLeft size={20} />
// //                     </button>
// //                  )}
// //                  <h2 className="text-white font-black text-2xl italic tracking-tighter uppercase">
// //                    {step === 1 ? 'Shipping Info' : step === 2 ? 'Billing Address' : 'Payment'}
// //                  </h2>
// //                </div>
// //                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
// //             </div>

// //             {/* Content Area */}
// //             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              
// //               {/* STEP 1: SHIPPING ADDRESS */}
// //               {step === 1 && (
// //                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
// //                   <div className="flex justify-between items-end mb-4">
// //                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Address</label>
// //                      {!showAddForm && (
// //                         <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1 hover:underline">
// //                            <Plus size={14}/> New Address
// //                         </button>
// //                      )}
// //                   </div>

// //                   {showAddForm ? renderAddressForm() : renderAddressList(shippingAddress?.id, setShippingAddress)}

// //                   <button 
// //                     onClick={() => setStep(2)} 
// //                     disabled={!shippingAddress || showAddForm}
// //                     className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
// //                   >
// //                     Next: Billing Info
// //                   </button>
// //                 </motion.div>
// //               )}

// //               {/* STEP 2: BILLING ADDRESS (US Requirement) */}
// //               {step === 2 && (
// //                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
// //                     <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6 flex items-center gap-3 cursor-pointer" onClick={() => setSameAsShipping(!sameAsShipping)}>
// //                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${sameAsShipping ? 'bg-brand-glow border-brand-glow' : 'border-slate-500'}`}>
// //                           {sameAsShipping && <Check size={16} className="text-dark-900" />}
// //                        </div>
// //                        <span className="text-white font-bold text-sm">Same as Shipping Address</span>
// //                     </div>

// //                     {!sameAsShipping && (
// //                       <div className="mt-4">
// //                         <div className="flex justify-between items-end mb-4">
// //                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Billing Address</label>
// //                             {!showAddForm && <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1"><Plus size={14}/> New Address</button>}
// //                         </div>
// //                         {showAddForm ? renderAddressForm() : renderAddressList(billingAddress?.id, setBillingAddress)}
// //                       </div>
// //                     )}

// //                     <button 
// //                         onClick={() => setStep(3)} 
// //                         disabled={!sameAsShipping && !billingAddress}
// //                         className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all uppercase tracking-widest"
// //                     >
// //                         Next: Payment
// //                     </button>
// //                  </motion.div>
// //               )}

// //               {/* STEP 3: PAYMENT */}
// //               {step === 3 && (
// //                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col justify-center">
                   
// //                    <div className="text-center mb-8">
// //                       <div className="w-20 h-20 bg-brand-glow/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-glow/20">
// //                          <ShieldCheck size={40} className="text-brand-glow" />
// //                       </div>
// //                       <h3 className="text-2xl font-bold text-white mb-2">Secure Checkout</h3>
// //                       <p className="text-slate-400 text-sm max-w-xs mx-auto">
// //                         Transaction is end-to-end encrypted. Payment processed securely via Stripe.
// //                       </p>
// //                    </div>

// //                    {/* Mock Credit Card Form (Placeholder for Stripe Elements) */}
// //                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 mb-8">
// //                       <div>
// //                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 block">Card Number</label>
// //                          <div className="relative">
// //                             <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
// //                             <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 pl-12 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none" />
// //                          </div>
// //                       </div>
// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 block">Expiry</label>
// //                             <input type="text" placeholder="MM / YY" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none" />
// //                         </div>
// //                         <div>
// //                             <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 block">CVC</label>
// //                             <input type="text" placeholder="123" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none" />
// //                         </div>
// //                       </div>
// //                    </div>

// //                    <button 
// //                       onClick={handlePlaceOrder}
// //                       disabled={processingOrder}
// //                       className="w-full py-5 bg-brand-glow text-dark-900 font-black rounded-2xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-lg"
// //                    >
// //                       {processingOrder ? (
// //                          <>Processing <Loader2 className="animate-spin" /></>
// //                       ) : (
// //                          <>Pay ${total.toFixed(2)} <DollarSign size={20} className="fill-current" /></>
// //                       )}
// //                    </button>

// //                 </motion.div>
// //               )}
// //             </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default CheckoutModal;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
//   ShieldCheck, DollarSign, Banknote, Wallet, AlertTriangle 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../client/supabaseClient';
// import { cartApi } from '../../api/cartApi';

// const CheckoutModal = ({ isOpen, onClose }) => {
//   const { user } = useAuth();
//   const { cartItems, getSubtotal, getShipping, clearCart } = useCart();
//   const navigate = useNavigate();

//   // --- STEPS STATE ---
//   const [step, setStep] = useState(1); 
//   const [loading, setLoading] = useState(false);
//   const [processingOrder, setProcessingOrder] = useState(false);

//   // --- DATA STATE ---
//   const [addresses, setAddresses] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState(null);
  
//   // Billing State
//   const [sameAsShipping, setSameAsShipping] = useState(true);
//   const [billingAddress, setBillingAddress] = useState(null);

//   // Payment Method State (NEW)
//   const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'cod'

//   // --- NEW ADDRESS FORM STATE ---
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAddr, setNewAddr] = useState({ 
//     full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' 
//   });

//   // --- CALCULATIONS ---
//   const subtotal = getSubtotal();
//   const shippingCost = getShipping();
//   const estimatedTax = shippingAddress?.state === 'NY' ? subtotal * 0.08875 : 0; 
//   const total = subtotal + shippingCost + estimatedTax;

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     if (user && isOpen) {
//       fetchAddresses();
//       setStep(1);
//     }
//   }, [user, isOpen]);

//   useEffect(() => {
//     if (sameAsShipping) {
//       setBillingAddress(shippingAddress);
//     }
//   }, [sameAsShipping, shippingAddress]);

//   const fetchAddresses = async () => {
//     const { data } = await supabase
//       .from('addresses')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('is_default', { ascending: false });
      
//     setAddresses(data || []);
//     const defaultAddr = data?.find(a => a.is_default) || data?.[0];
//     setShippingAddress(defaultAddr);
//     setBillingAddress(defaultAddr);
//   };

//   const handleAddNewAddress = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('addresses')
//       .insert([{ ...newAddr, user_id: user.id, is_default: addresses.length === 0 }])
//       .select();
    
//     if (!error && data) {
//       const newAddressList = [...addresses, data[0]];
//       setAddresses(newAddressList);
//       setShippingAddress(data[0]); 
//       setShowAddForm(false);
//       setNewAddr({ full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' });
//     }
//     setLoading(false);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) return navigate('/login');
//     if (!shippingAddress || !billingAddress) return alert("Please select addresses.");

//     setProcessingOrder(true);

//     try {
//       let paymentStatus = 'pending';
//       let orderStatus = 'pending';
//       let provider = 'cod';
//       let providerId = `cod_${Date.now()}`;

//       // --- 1. HANDLE PAYMENT LOGIC ---
//       if (paymentMethod === 'card') {
//         // Simulate Stripe Delay
//         await new Promise(resolve => setTimeout(resolve, 2000)); 
//         // If Stripe succeeds:
//         paymentStatus = 'succeeded';
//         orderStatus = 'paid'; // Order is fully paid
//         provider = 'stripe_mock';
//         providerId = `pi_${Date.now()}`;
//       } else {
//         // COD Logic: No delay, simple verification
//         await new Promise(resolve => setTimeout(resolve, 500)); 
//         paymentStatus = 'pending'; // Money not collected yet
//         orderStatus = 'pending'; // Order placed, waiting for fulfillment/payment
//         provider = 'cod';
//       }

//       // --- 2. CREATE ORDER ---
//       const { data: order, error: orderErr } = await supabase
//         .from('orders')
//         .insert([{
//           user_id: user.id,
//           total_amount: total,
//           tax_amount: estimatedTax,
//           shipping_cost: shippingCost,
//           status: orderStatus,
//           payment_method: paymentMethod, // Store how they want to pay
//           shipping_address: shippingAddress,
//           billing_address: billingAddress,
//           payment_intent_id: providerId
//         }])
//         .select()
//         .single();

//       if (orderErr) throw new Error(orderErr.message);

//       // --- 3. CREATE ORDER ITEMS ---
//       const orderItemsData = cartItems.map(item => ({
//         order_id: order.id,
//         product_id: item.id,
//         variant_id: item.variantId, 
//         flavor_name: item.flavorName, 
//         item_name: item.name, 
//         item_variant_label: item.description, 
//         quantity: item.quantity,
//         price_at_purchase: item.price
//       }));

//       const { error: itemsErr } = await supabase.from('order_items').insert(orderItemsData);
//       if (itemsErr) throw new Error(itemsErr.message);

//       // --- 4. CREATE PAYMENT RECORD ---
//       const { error: payErr } = await supabase.from('payments').insert([{
//         order_id: order.id,
//         user_id: user.id,
//         provider: provider,
//         provider_payment_id: providerId,
//         amount: total,
//         status: paymentStatus // 'pending' for COD, 'succeeded' for Card
//       }]);

//       if (payErr) console.error("Payment Log Error:", payErr);

//       // --- 5. CLEANUP & REDIRECT ---
//       await cartApi.clearCart(user.id);
//       clearCart();
      
//       const successMsg = paymentMethod === 'cod' 
//         ? "Order Placed! Please pay cash upon delivery." 
//         : "Payment Successful! Order Placed.";
        
//       alert(successMsg);
//       onClose();
//       navigate('/account'); // Navigate to order history

//     } catch (err) {
//       console.error("Checkout Error:", err);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setProcessingOrder(false);
//     }
//   };

//   // --- RENDER HELPERS (Addresses) ---
//   const renderAddressList = (selectedId, onSelect) => (
//     <div className="space-y-3 mb-4">
//       {addresses.map((addr) => (
//         <div 
//           key={addr.id}
//           onClick={() => onSelect(addr)}
//           className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group
//             ${selectedId === addr.id 
//               ? 'border-brand-glow bg-brand-glow/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
//               : 'border-white/5 bg-white/5 hover:border-white/20'}`}
//         >
//           <div>
//             <div className="flex items-center gap-2">
//               <p className="text-white text-sm font-bold">{addr.full_name}</p>
//               {addr.is_default && <span className="text-[10px] bg-white/10 px-2 rounded-full text-slate-400">Default</span>}
//             </div>
//             <p className="text-slate-400 text-xs mt-1">{addr.street_address}, {addr.city}, {addr.state} {addr.zip_code}</p>
//           </div>
//           {selectedId === addr.id && <Check className="text-brand-glow" size={18} />}
//         </div>
//       ))}
//     </div>
//   );

//   const renderAddressForm = () => (
//     <form onSubmit={handleAddNewAddress} className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
//       <h4 className="col-span-2 text-white text-sm font-bold mb-2">Add New Address</h4>
//       <input placeholder="Full Name" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, full_name: e.target.value})} required />
//       <input placeholder="Street Address" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, street_address: e.target.value})} required />
//       <input placeholder="City" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, city: e.target.value})} required />
//       <input placeholder="State (NY, CA)" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, state: e.target.value})} required />
//       <input placeholder="Zip Code" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, zip_code: e.target.value})} required />
      
//       <div className="col-span-2 flex gap-3 mt-2">
//         <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
//         <button type="submit" disabled={loading} className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl text-sm hover:brightness-110 transition-colors">
//           {loading ? <Loader2 className="animate-spin mx-auto" size={18}/> : "Save Address"}
//         </button>
//       </div>
//     </form>
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
//       />

//       <motion.div 
//         initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
//         className="relative bg-dark-900 border border-white/10 w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
//       >
        
//         {/* --- LEFT SIDE: ORDER SUMMARY --- */}
//         <div className="hidden md:flex w-[350px] bg-white/5 p-8 border-r border-white/5 flex-col h-full">
//           <h3 className="text-white font-black italic tracking-tighter text-xl mb-6">YOUR ORDER</h3>
          
//           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
//             {cartItems.map((item, i) => (
//               <div key={i} className="flex gap-4 items-start">
//                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.imageColor || 'from-gray-700 to-gray-800'} opacity-80 flex-shrink-0 border border-white/10`} />
//                 <div>
//                   <p className="text-white text-sm font-bold leading-tight">{item.name}</p>
//                   <p className="text-brand-glow text-[10px] font-bold uppercase tracking-wider mt-1">{item.description}</p>
//                   <p className="text-slate-500 text-xs mt-1">{item.quantity} x ${item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
//             <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
//             <div className="flex justify-between text-sm"><span className="text-slate-400">Shipping</span><span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
//             <div className="flex justify-between text-sm"><span className="text-slate-400">Est. Tax</span><span className="text-white">${estimatedTax.toFixed(2)}</span></div>
//             <div className="pt-4 border-t border-white/5 flex justify-between items-end">
//                <span className="text-white font-bold">Total</span>
//                <span className="text-3xl font-black text-brand-glow italic tracking-tighter">${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: STEPS --- */}
//         <div className="flex-1 flex flex-col h-full bg-dark-900 relative">
//             {/* Header */}
//             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-dark-900/50 backdrop-blur-md z-10">
//                <div className="flex items-center gap-2">
//                  {step > 1 && (
//                     <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
//                       <ArrowLeft size={20} />
//                     </button>
//                  )}
//                  <h2 className="text-white font-black text-2xl italic tracking-tighter uppercase">
//                    {step === 1 ? 'Shipping Info' : step === 2 ? 'Billing Address' : 'Payment Method'}
//                  </h2>
//                </div>
//                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
//             </div>

//             {/* Content Area */}
//             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              
//               {/* STEP 1: SHIPPING ADDRESS */}
//               {step === 1 && (
//                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//                   <div className="flex justify-between items-end mb-4">
//                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Address</label>
//                      {!showAddForm && (
//                         <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1 hover:underline">
//                            <Plus size={14}/> New Address
//                         </button>
//                      )}
//                   </div>

//                   {showAddForm ? renderAddressForm() : renderAddressList(shippingAddress?.id, setShippingAddress)}

//                   <button 
//                     onClick={() => setStep(2)} 
//                     disabled={!shippingAddress || showAddForm}
//                     className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
//                   >
//                     Next: Billing Info
//                   </button>
//                 </motion.div>
//               )}

//               {/* STEP 2: BILLING ADDRESS */}
//               {step === 2 && (
//                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//                     <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6 flex items-center gap-3 cursor-pointer" onClick={() => setSameAsShipping(!sameAsShipping)}>
//                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${sameAsShipping ? 'bg-brand-glow border-brand-glow' : 'border-slate-500'}`}>
//                           {sameAsShipping && <Check size={16} className="text-dark-900" />}
//                        </div>
//                        <span className="text-white font-bold text-sm">Same as Shipping Address</span>
//                     </div>

//                     {!sameAsShipping && (
//                       <div className="mt-4">
//                         <div className="flex justify-between items-end mb-4">
//                             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Billing Address</label>
//                             {!showAddForm && <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1"><Plus size={14}/> New Address</button>}
//                         </div>
//                         {showAddForm ? renderAddressForm() : renderAddressList(billingAddress?.id, setBillingAddress)}
//                       </div>
//                     )}

//                     <button 
//                         onClick={() => setStep(3)} 
//                         disabled={!sameAsShipping && !billingAddress}
//                         className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all uppercase tracking-widest"
//                     >
//                         Next: Payment Method
//                     </button>
//                  </motion.div>
//               )}

//               {/* STEP 3: PAYMENT & REVIEW */}
//               {step === 3 && (
//                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
                   
//                    <div className="mb-6">
//                       <h3 className="text-white font-bold text-lg mb-4">Select Payment Method</h3>
//                       <div className="grid grid-cols-2 gap-4">
                          
//                           {/* Card Selection */}
//                           <button 
//                             onClick={() => setPaymentMethod('card')}
//                             className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden
//                               ${paymentMethod === 'card' 
//                                 ? 'bg-brand-glow text-dark-900 border-brand-glow shadow-lg' 
//                                 : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
//                           >
//                              <CreditCard size={28} />
//                              <span className="font-bold text-sm uppercase tracking-wider">Credit Card</span>
//                              {paymentMethod === 'card' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-dark-900"/>}
//                           </button>

//                           {/* COD Selection */}
//                           <button 
//                             onClick={() => setPaymentMethod('cod')}
//                             className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden
//                               ${paymentMethod === 'cod' 
//                                 ? 'bg-green-500 text-dark-900 border-green-500 shadow-lg' 
//                                 : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
//                           >
//                              <Banknote size={28} />
//                              <span className="font-bold text-sm uppercase tracking-wider">Cash on Delivery</span>
//                              {paymentMethod === 'cod' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-dark-900"/>}
//                           </button>
//                       </div>
//                    </div>

//                    {/* Payment Form Area */}
//                    <div className="flex-1 flex flex-col justify-center">
                      
//                       {/* CARD FORM */}
//                       {paymentMethod === 'card' && (
//                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 mb-4">
//                            <div className="flex items-center justify-between mb-2">
//                              <h4 className="text-white font-bold text-sm">Card Details</h4>
//                              <div className="flex gap-2 text-slate-500">
//                                 <ShieldCheck size={16} /> <span className="text-xs">Secure Encrypted</span>
//                              </div>
//                            </div>
//                            <div>
//                               <input type="text" placeholder="Card Number" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" />
//                            </div>
//                            <div className="grid grid-cols-2 gap-4">
//                              <input type="text" placeholder="MM / YY" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" />
//                              <input type="text" placeholder="CVC" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" />
//                            </div>
//                         </motion.div>
//                       )}

//                       {/* COD INFO */}
//                       {paymentMethod === 'cod' && (
//                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl mb-4 text-center">
//                             <Wallet className="mx-auto text-green-400 mb-3" size={32} />
//                             <h4 className="text-green-400 font-bold text-lg mb-1">Pay Upon Delivery</h4>
//                             <p className="text-slate-400 text-sm max-w-xs mx-auto">
//                               Please ensure you have exact change available. We will contact you to confirm the delivery slot.
//                             </p>
//                         </motion.div>
//                       )}

//                       <button 
//                           onClick={handlePlaceOrder}
//                           disabled={processingOrder}
//                           className={`w-full py-5 font-black rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-lg
//                             ${paymentMethod === 'cod' 
//                               ? 'bg-green-500 hover:bg-green-400 text-dark-900 shadow-[0_0_30px_rgba(34,197,94,0.3)]' 
//                               : 'bg-brand-glow hover:bg-cyan-300 text-dark-900 shadow-[0_0_30px_rgba(34,211,238,0.3)]'}`}
//                       >
//                           {processingOrder ? (
//                             <>Processing <Loader2 className="animate-spin" /></>
//                           ) : (
//                             <>
//                               {paymentMethod === 'cod' ? 'Place COD Order' : `Pay $${total.toFixed(2)}`}
//                               {paymentMethod === 'cod' ? <Check size={24}/> : <DollarSign size={20} className="fill-current" />}
//                             </>
//                           )}
//                       </button>
//                    </div>

//                 </motion.div>
//               )}
//             </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { User, Package, LogOut, MapPin, Lock, Printer, ChevronRight, AlertCircle, Check } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { userApi } from '../api/userApi';
// import { useNavigate } from 'react-router-dom';

// const Account = () => {
//   const { user, logout, loading: authLoading } = useAuth(); // Ensure fetchProfile updates 'user' in context
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('settings');

//   if (authLoading) return <div className="min-h-screen bg-dark-900" />;

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   return (
//     <div className="min-h-screen bg-dark-900 pt-24 pb-12 px-4 md:px-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
//         {/* Sidebar */}
//         <div className="lg:col-span-1">
//           <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-28">
//             <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
//               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-glow to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
//                 {user?.profile?.first_name?.charAt(0) || 'U'}
//               </div>
//               <div>
//                 <h3 className="text-white font-bold">{user?.profile?.first_name} {user?.profile?.last_name}</h3>
//                 <p className="text-slate-500 text-xs uppercase tracking-wider">{user?.role || 'Customer'}</p>
//               </div>
//             </div>

//             <nav className="space-y-2">
//               <SidebarItem 
//                 icon={User} label="Account Settings" 
//                 isActive={activeTab === 'settings'} 
//                 onClick={() => setActiveTab('settings')} 
//               />
//               <SidebarItem 
//                 icon={Package} label="Order History" 
//                 isActive={activeTab === 'orders'} 
//                 onClick={() => setActiveTab('orders')} 
//               />
//               <button 
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
//               >
//                 <LogOut size={18} />
//                 <span className="font-bold text-sm">Sign Out</span>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="lg:col-span-3">
//           <AnimatePresence mode="wait">
//             {activeTab === 'settings' ? <SettingsTab key="settings" user={user} /> : <OrdersTab key="orders" user={user} />}
//           </AnimatePresence>
//         </div>

//       </div>
//     </div>
//   );
// };

// // --- Sub-Component: Settings Tab ---
// const SettingsTab = ({ user }) => {
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState({ type: '', text: '' });
  
//   console.log(user);
//   // Form State
//   const [formData, setFormData] = useState({
//     firstName: user?.user_metadata?.first_name || '',
//     lastName: user?.user_metadata?.last_name || '',
//     phone: user?.user_metadata?.phone || '',
//     street: user?.address?.street_address || '',
//     city: user?.address?.city || '',
//     state: user?.address?.state || '',
//     zip: user?.address?.zip_code || '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg({ type: '', text: '' });

//     try {
//       // 1. Update Profile
//       await userApi.updateProfile(user.id, {
//         first_name: formData.firstName,
//         last_name: formData.lastName,
//         phone_number: formData.phone
//       });

//       // 2. Update Address
//       await userApi.updateAddress(user.id, {
//         street_address: formData.street,
//         city: formData.city,
//         state: formData.state,
//         zip_code: formData.zip
//       });

//       // 3. Update Password (Optional)
//       if (formData.newPassword) {
//         if (formData.newPassword !== formData.confirmPassword) throw new Error("Passwords do not match");
//         if (formData.newPassword.length < 6) throw new Error("Password must be 6+ chars");
//         await userApi.updatePassword(formData.newPassword);
//       }

//       setMsg({ type: 'success', text: 'Profile updated successfully!' });
//     } catch (err) {
//       setMsg({ type: 'error', text: err.message });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-3xl p-8">
//       <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
      
//       {msg.text && (
//         <div className={`p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-bold ${msg.type === 'error' ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
//           {msg.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />} {msg.text}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Personal Details */}
//         <section>
//           <h3 className="text-brand-glow text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><User size={14} /> Personal Details</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//              <Input label="First Name" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
//              <Input label="Last Name" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
//              <div className="md:col-span-2">
//                 <Input label="Phone Number" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
//              </div>
//           </div>
//         </section>

//         {/* Address */}
//         <section>
//           <h3 className="text-brand-glow text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><MapPin size={14} /> Shipping Address</h3>
//           <Input label="Street Address" value={formData.street} onChange={e => setFormData({...formData, street: e.target.value})} className="mb-4" />
//           <div className="grid grid-cols-3 gap-4">
//              <Input label="City" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
//              <Input label="State" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
//              <Input label="Zip Code" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
//           </div>
//         </section>

//         {/* Password */}
//         <section className="p-6 bg-black/20 rounded-2xl border border-white/5">
//           <h3 className="text-brand-glow text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2"><Lock size={14} /> Security</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//              <Input type="password" label="New Password" placeholder="Leave blank to keep current" value={formData.newPassword} onChange={e => setFormData({...formData, newPassword: e.target.value})} />
//              <Input type="password" label="Confirm Password" placeholder="Confirm new password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
//           </div>
//         </section>

//         <button disabled={loading} className="px-8 py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-brand-glow transition-all disabled:opacity-50">
//           {loading ? 'Saving Changes...' : 'Save Changes'}
//         </button>
//       </form>
//     </motion.div>
//   );
// };

// // --- Sub-Component: Orders Tab ---
// const OrdersTab = ({ user }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       userApi.getOrders(user.id).then(setOrders).finally(() => setLoading(false));
//     }
//   }, [user]);

//   const printInvoice = (order) => {
//     const printWindow = window.open('', '_blank');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Invoice #${order.id.slice(0, 8)}</title>
//           <style>
//             body { font-family: sans-serif; padding: 40px; }
//             .header { display: flex; justify-content: space-between; border-bottom: 2px solid #000; padding-bottom: 20px; }
//             .title { font-size: 24px; font-weight: bold; }
//             .table { width: 100%; border-collapse: collapse; margin-top: 30px; }
//             .table th { text-align: left; border-bottom: 1px solid #ccc; padding: 10px 0; }
//             .table td { padding: 10px 0; border-bottom: 1px solid #eee; }
//             .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div>
//               <div class="title">CLOUD7 RESEARCH</div>
//               <p>123 Lab Street, Tech City</p>
//             </div>
//             <div style="text-align: right;">
//               <p><strong>Order ID:</strong> ${order.id}</p>
//               <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
//               <p><strong>Status:</strong> ${order.status}</p>
//             </div>
//           </div>
//           <h3>Bill To:</h3>
//           <p>${user.profile.first_name} ${user.profile.last_name}</p>
//           <p>${order.shipping_address.streetAddress}, ${order.shipping_address.city}</p>

//           <table class="table">
//             <thead>
//               <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
//             </thead>
//             <tbody>
//               ${order.order_items.map(item => `
//                 <tr>
//                   <td>${item.products.name} (${item.flavor_name || 'Standard'})</td>
//                   <td>${item.quantity}</td>
//                   <td>$${item.price_at_purchase}</td>
//                   <td>$${(item.quantity * item.price_at_purchase).toFixed(2)}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//           <div class="total">Total Paid: $${order.total_amount}</div>
//           <script>window.print();</script>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//   };

//   return (
//     <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
//       <h2 className="text-2xl font-bold text-white">Order History</h2>
//       {loading ? <div className="text-white">Loading orders...</div> : orders.length === 0 ? (
//         <div className="p-12 text-center border border-white/10 rounded-3xl bg-white/5">
//           <Package size={48} className="mx-auto text-slate-600 mb-4" />
//           <p className="text-slate-400">No orders found.</p>
//         </div>
//       ) : (
//         orders.map(order => (
//           <div key={order.id} className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-brand-glow/30 transition-colors">
//             <div className="flex flex-wrap justify-between items-center mb-6 pb-6 border-b border-white/10 gap-4">
//                <div>
//                  <p className="text-xs text-slate-500 uppercase tracking-wider">Order ID</p>
//                  <p className="text-white font-mono text-sm">#{order.id.slice(0, 8)}</p>
//                </div>
//                <div>
//                  <p className="text-xs text-slate-500 uppercase tracking-wider">Date</p>
//                  <p className="text-white text-sm">{new Date(order.created_at).toLocaleDateString()}</p>
//                </div>
//                <div>
//                  <p className="text-xs text-slate-500 uppercase tracking-wider">Total</p>
//                  <p className="text-brand-glow font-bold">${order.total_amount}</p>
//                </div>
//                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
//                  order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
//                }`}>
//                  {order.status}
//                </div>
//                <button onClick={() => printInvoice(order)} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white text-white hover:text-dark-900 rounded-lg text-xs font-bold transition-all">
//                  <Printer size={14} /> INVOICE
//                </button>
//             </div>
            
//             <div className="space-y-3">
//               {order.order_items.map(item => (
//                 <div key={item.id} className="flex items-center gap-4">
//                   <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.products.image_color} opacity-80`} />
//                   <div>
//                     <p className="text-white font-bold text-sm">{item.products.name}</p>
//                     <p className="text-slate-500 text-xs">Qty: {item.quantity} × ${item.price_at_purchase} | {item.flavor_name}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </motion.div>
//   );
// };

// // UI Helpers
// const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
//   <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-brand-glow text-dark-900 font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
//     <Icon size={18} /> <span className="text-sm">{label}</span> {isActive && <ChevronRight size={14} className="ml-auto" />}
//   </button>
// );

// const Input = ({ label, className = "", ...props }) => (
//   <div className={className}>
//     <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{label}</label>
//     <input className="w-full bg-black/30 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-brand-glow focus:outline-none transition-colors" {...props} />
//   </div>
// );

// export default Account;


// import React, { useState } from 'react';
// import { ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus } from 'lucide-react';
// import CheckoutModal from '../components/checkout/CheckoutModal';
// import { useAuth } from '../context/AuthContext';
// import { useCart } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';

// const EmptyCartView = () => (
//   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
//     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
//       <ShoppingBag size={40} className="text-slate-500" />
//     </div>
//     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
//     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
//       Looks like you haven't added anything yet. Explore our collection to find your edge.
//     </p>
//     <Link 
//       to="/shop" 
//       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//     >
//       START SHOPPING
//     </Link>
//   </div>
// );

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, getSubtotal, getShipping, deliveryConfig } = useCart();
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   const subtotal = getSubtotal();
//   const shipping = getShipping();
//   const total = subtotal + shipping;
//   const amountToFree = Math.max(0, (deliveryConfig?.min_order_value || 0) - subtotal);

//   if (!cartItems || cartItems.length === 0) return <EmptyCartView />;

//   return (
//     <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
//       <h1 className="text-4xl font-black text-white mb-10 italic tracking-tighter uppercase">YOUR CART</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
//         <div className="lg:col-span-2">
//             {/* Free Shipping Progress Bar */}
//             <div className="bg-dark-900 border border-white/10 p-5 rounded-2xl mb-8 flex items-center gap-4">
//                 <Truck className="text-brand-glow" size={20} />
//                 <p className="text-sm text-white">
//                     {amountToFree > 0 ? (
//                         <>Add <span className="font-bold text-brand-glow">${amountToFree.toFixed(2)}</span> more for <span className="font-bold uppercase tracking-wider">FREE SHIPPING</span></>
//                     ) : (
//                         <span className="text-green-400 font-bold uppercase tracking-wider">✓ YOU'VE EARNED FREE SHIPPING!</span>
//                     )}
//                 </p>
//             </div>
            
//             {/* Product List */}
//             <div className="space-y-6">
//               <AnimatePresence>
//                 {cartItems.map((item, index) => (
//                     <motion.div 
//                       // Unique Key combining ID + Variant to prevent render issues
//                       key={`${item.dbId || item.id}-${item.variantId}-${index}`}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -20 }}
//                       className="bg-white/5 border border-white/10 rounded-[2rem] p-5 sm:p-7 flex flex-col sm:flex-row gap-8 items-center relative group hover:bg-white/[0.08] transition-all"
//                     >
//                       {/* Product Image Section */}
//                       <div className={`w-36 h-36 rounded-3xl bg-gradient-to-br ${item.imageColor || 'from-blue-600 to-purple-600'} flex-shrink-0 flex items-center justify-center shadow-2xl border border-white/5`}>
//                         <ShoppingBag className="text-white/20" size={48} />
//                       </div>

//                       {/* Product Info Section */}
//                       <div className="flex-1 w-full flex flex-col justify-center">
//                           <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-4">
//                               <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-tight">
//                                 {item.name}
//                               </h3>
//                               <Link to={`/product/${item.slug || item.id}`} className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
//                                   View Details
//                               </Link>
//                           </div>

//                           {/* Dynamic Description (Size, Flavor, etc.) */}
//                           <div className="flex flex-wrap gap-3 mb-6">
//                               <div className="px-3 py-1 rounded-lg bg-black/40 border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-2">
//                                 <span className="w-2 h-2 rounded-full bg-brand-glow"></span>
//                                 {item.description}
//                               </div>
//                           </div>

//                           {/* Price & Quantity Controls */}
//                           <div className="flex items-center justify-between">
//                             <div className="text-2xl font-bold text-white">
//                                 ${(parseFloat(item.price || 0) * item.quantity).toFixed(2)}
//                             </div>

//                             <div className="flex items-center gap-4 bg-black/40 rounded-xl p-1 border border-white/10">
//                                 <button 
//                                   onClick={() => updateQuantity(index, item.quantity - 1)}
//                                   className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                                 >
//                                   <Minus size={14} />
//                                 </button>
//                                 <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
//                                 <button 
//                                   onClick={() => updateQuantity(index, item.quantity + 1)}
//                                   className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
//                                 >
//                                   <Plus size={14} />
//                                 </button>
//                             </div>
//                           </div>
//                       </div>

//                       {/* Remove Button */}
//                       <button 
//                           onClick={() => removeFromCart(index)}
//                           className="absolute top-4 right-4 p-2 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
//                       >
//                           <Trash2 size={18} />
//                       </button>
//                     </motion.div>
//                   ))}
//               </AnimatePresence>
//             </div>
//         </div>

//         {/* Checkout Summary */}
//         <aside className="lg:col-span-1 lg:sticky lg:top-32">
//             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl">
//                 <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
//                 <div className="space-y-4 mb-8">
//                     <div className="flex justify-between text-slate-400 text-sm">
//                       <span>Subtotal</span>
//                       <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-slate-400 text-sm">
//                       <span>Shipping</span>
//                       <span className="text-white font-medium">
//                         {shipping === 0 ? <span className="text-brand-glow">FREE</span> : `$${shipping.toFixed(2)}`}
//                       </span>
//                     </div>
//                     <div className="pt-4 border-t border-white/10">
//                       <div className="flex justify-between items-end">
//                         <span className="text-slate-300 font-bold">Total</span>
//                         <div className="text-right">
//                           <span className="text-3xl font-black text-white tracking-tight">
//                             ${total.toFixed(2)}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                 </div>

//                 <button 
//                     onClick={() => setIsCheckoutOpen(true)}
//                     className="w-full py-5 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.05)] group"
//                 >
//                     CHECKOUT NOW <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
//                 </button>

//                 <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">SSL</span>
//                   </div>
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">24/7</span>
//                   </div>
//                 </div>
//             </div>
//         </aside>
//       </div>

//       <CheckoutModal 
//         isOpen={isCheckoutOpen} 
//         onClose={() => setIsCheckoutOpen(false)} 
//         total={total}
//       />
//     </div>
//   );
// };

// export default Cart;


// // // // // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // // // import { useAuth } from './AuthContext';
// // // // // import { cartApi } from '../api/cartApi';

// // // // // const CartContext = createContext();
// // // // // export const useCart = () => useContext(CartContext);

// // // // // export const CartProvider = ({ children }) => {
// // // // //   const { user } = useAuth();
// // // // //   const [cartItems, setCartItems] = useState([]);
// // // // //   const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

// // // // //   // Load Cart & Delivery Config
// // // // //   useEffect(() => {
// // // // //     const initCart = async () => {
// // // // //       const config = await cartApi.getDeliveryConfig();
// // // // //       setDeliveryConfig(config);

// // // // //       if (user) {
// // // // //         const dbItems = await cartApi.fetchCart(user.id);
// // // // //         // Map DB items to UI structure
// // // // //         setCartItems(dbItems.map(item => ({
// // // // //           dbId: item.id,
// // // // //           id: item.product_id,
// // // // //           name: item.products.name,
// // // // //           imageColor: item.products.image_color,
// // // // //           quantity: item.quantity,
// // // // //           selectedFlavor: { name: item.flavor_name },
// // // // //           selectedSize: { id: item.variant_id, price: item.product_variants.price, count: item.product_variants.size_name }
// // // // //         })));
// // // // //       }
// // // // //     };
// // // // //     initCart();
// // // // //   }, [user]);

// // // // //   const addToCart = async (product, quantity, flavor, size) => {
// // // // //     if (user) {
// // // // //         await cartApi.syncCart(user.id, [{ ...product, quantity, selectedFlavor: flavor, selectedSize: size }]);
// // // // //         const updated = await cartApi.fetchCart(user.id);
// // // // //         setCartItems(updated); // Simplified for example
// // // // //     } else {
// // // // //         // Fallback to local state for guests
// // // // //         setCartItems(prev => [...prev, { ...product, quantity, selectedFlavor: flavor, selectedSize: size }]);
// // // // //     }
// // // // //   };

// // // // //   const updateQuantity = async (index, newQuantity) => {
// // // // //     if (newQuantity < 1) return;
// // // // //     const item = cartItems[index];
// // // // //     if (user && item.dbId) {
// // // // //         await cartApi.updateQuantity(item.dbId, newQuantity);
// // // // //     }
// // // // //     setCartItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQuantity } : it));
// // // // //   };

// // // // //   const removeFromCart = async (index) => {
// // // // //     const item = cartItems[index];
// // // // //     if (user && item.dbId) await cartApi.removeItem(item.dbId);
// // // // //     setCartItems(prev => prev.filter((_, i) => i !== index));
// // // // //   };
// // // // //   const getCartCount = () => cartItems.reduce((total, item) => total + item.quantity, 0);
// // // // //   const getSubtotal = () => cartItems.reduce((acc, it) => acc + (it.selectedSize.price * it.quantity), 0);
// // // // //   const getShipping = () => {
// // // // //     const sub = getSubtotal();
// // // // //     if (sub === 0) return 0;
// // // // //     return sub >= deliveryConfig.min_order_value ? 0 : deliveryConfig.shipping_fee;
// // // // //   };

// // // // //   return (
// // // // //     <CartContext.Provider value={{ 
// // // // //         cartItems, addToCart, removeFromCart, updateQuantity,getCartCount,
// // // // //         getSubtotal, getShipping, deliveryConfig,
// // // // //         clearCart: () => {
// // // // //             if(user) cartApi.clearCart(user.id);
// // // // //             setCartItems([]);
// // // // //         }
// // // // //     }}>
// // // // //       {children}
// // // // //     </CartContext.Provider>
// // // // //   );
// // // // // };

// // // // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // // import { useAuth } from './AuthContext';
// // // // import { cartApi } from '../api/cartApi';

// // // // const CartContext = createContext();
// // // // export const useCart = () => useContext(CartContext);

// // // // export const CartProvider = ({ children }) => {
// // // //   const { user } = useAuth();
// // // //   const [cartItems, setCartItems] = useState([]);
// // // //   const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

// // // //   // Helper: Safely map DB items to UI format
// // // //   const mapDbItemsToUi = (dbItems) => {
// // // //     return dbItems
// // // //       .filter(item => item.products && item.product_variants) // FILTER OUT CORRUPT ITEMS
// // // //       .map(item => ({
// // // //         dbId: item.id,
// // // //         id: item.product_id,
// // // //         name: item.products?.name || 'Unknown Product',
// // // //         slug: item.products?.slug, // Ensure slug exists for links
// // // //         imageColor: item.products?.image_color,
// // // //         quantity: item.quantity,
// // // //         selectedFlavor: { name: item.flavor_name },
// // // //         selectedSize: { 
// // // //           id: item.variant_id, 
// // // //           price: item.product_variants?.price || 0, 
// // // //           count: item.product_variants?.size_name || 'Standard'
// // // //         }
// // // //       }));
// // // //   };

// // // //   // Load Cart & Delivery Config
// // // //   useEffect(() => {
// // // //     const initCart = async () => {
// // // //       try {
// // // //         const config = await cartApi.getDeliveryConfig();
// // // //         if (config) setDeliveryConfig(config);

// // // //         if (user) {
// // // //           const dbItems = await cartApi.fetchCart(user.id);
// // // //           setCartItems(mapDbItemsToUi(dbItems));
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Failed to initialize cart:", error);
// // // //       }
// // // //     };
// // // //     initCart();
// // // //   }, [user]);

// // // //   const addToCart = async (product, quantity, flavor, size) => {
// // // //     // 1. Validate Input (Edge Case)
// // // //     if (!product || !size || !flavor) {
// // // //       console.error("Invalid product data passed to addToCart");
// // // //       return;
// // // //     }

// // // //     // 2. OPTIMISTIC UPDATE (Instant UI Feedback)
// // // //     const tempItem = {
// // // //       dbId: `temp-${Date.now()}`, // Temporary ID
// // // //       id: product.id,
// // // //       name: product.name,
// // // //       slug: product.slug,
// // // //       imageColor: product.image_color,
// // // //       quantity,
// // // //       selectedFlavor: flavor,
// // // //       selectedSize: size
// // // //     };

// // // //     setCartItems(prev => {
// // // //       // Check if item already exists to update quantity
// // // //       const existingIdx = prev.findIndex(item => 
// // // //         item.id === tempItem.id && 
// // // //         item.selectedSize.id === tempItem.selectedSize.id && 
// // // //         item.selectedFlavor.name === tempItem.selectedFlavor.name
// // // //       );

// // // //       if (existingIdx > -1) {
// // // //         const updated = [...prev];
// // // //         updated[existingIdx].quantity += quantity;
// // // //         return updated;
// // // //       }
// // // //       return [...prev, tempItem];
// // // //     });

// // // //     // 3. Background Sync (If User Logged In)
// // // //     if (user) {
// // // //       try {
// // // //         await cartApi.syncCart(user.id, [{ ...product, quantity, selectedFlavor: flavor, selectedSize: size }]);
// // // //         // Silent re-fetch to ensure data consistency (DB IDs, etc.)
// // // //         const dbItems = await cartApi.fetchCart(user.id);
// // // //         setCartItems(mapDbItemsToUi(dbItems));
// // // //       } catch (err) {
// // // //         console.error("Failed to sync cart to DB:", err);
// // // //         // Optional: Revert state here if strict consistency is needed
// // // //       }
// // // //     }
// // // //   };

// // // //   const updateQuantity = async (index, newQuantity) => {
// // // //     if (newQuantity < 1) return;
    
// // // //     // Optimistic Update
// // // //     const item = cartItems[index];
// // // //     setCartItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQuantity } : it));

// // // //     if (user && item.dbId && !item.dbId.startsWith('temp-')) {
// // // //         try {
// // // //             await cartApi.updateQuantity(item.dbId, newQuantity);
// // // //         } catch (error) {
// // // //             console.error("Failed to update quantity:", error);
// // // //         }
// // // //     }
// // // //   };

// // // //   const removeFromCart = async (index) => {
// // // //     const item = cartItems[index];
    
// // // //     // Optimistic Update
// // // //     setCartItems(prev => prev.filter((_, i) => i !== index));

// // // //     if (user && item.dbId && !item.dbId.startsWith('temp-')) {
// // // //         try {
// // // //             await cartApi.removeItem(item.dbId);
// // // //         } catch (error) {
// // // //             console.error("Failed to remove item:", error);
// // // //         }
// // // //     }
// // // //   };

// // // //   const getCartCount = () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
// // // //   // FIX: Added optional chaining (?.) to prevent "undefined is not an object" crash
// // // //   const getSubtotal = () => cartItems.reduce((acc, it) => {
// // // //       const price = parseFloat(it.selectedSize?.price || 0);
// // // //       return acc + (price * (it.quantity || 1));
// // // //   }, 0);

// // // //   const getShipping = () => {
// // // //     const sub = getSubtotal();
// // // //     if (sub === 0) return 0;
// // // //     return sub >= (deliveryConfig?.min_order_value || 0) ? 0 : (deliveryConfig?.shipping_fee || 0);
// // // //   };

// // // //   return (
// // // //     <CartContext.Provider value={{ 
// // // //         cartItems, addToCart, removeFromCart, updateQuantity, 
// // // //         getCartCount, getSubtotal, getShipping, deliveryConfig 
// // // //     }}>
// // // //       {children}
// // // //     </CartContext.Provider>
// // // //   );
// // // // };

// // // import React, { createContext, useContext, useState, useEffect } from 'react';
// // // import { useAuth } from './AuthContext';
// // // import { cartApi } from '../api/cartApi';

// // // const CartContext = createContext();
// // // export const useCart = () => useContext(CartContext);

// // // export const CartProvider = ({ children }) => {
// // //   const { user } = useAuth();
// // //   const [cartItems, setCartItems] = useState([]);
// // //   const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

// // //   // Helper to map DB response to UI structure safely
// // //   const mapDbToUi = (items) => {
// // //     return items
// // //       .filter(item => item.product_variants && item.products) // <--- CRITICAL: Remove broken rows
// // //       .map(item => ({
// // //         dbId: item.id,
// // //         id: item.product_id,
// // //         name: item.products.name,
// // //         slug: item.products.slug,
// // //         imageColor: item.products.image_color,
// // //         quantity: item.quantity,
// // //         selectedFlavor: { name: item.flavor_name },
// // //         // Safely map variant data
// // //         selectedSize: { 
// // //           id: item.variant_id, 
// // //           price: item.product_variants.price, 
// // //           count: item.product_variants.size_name 
// // //         }
// // //       }));
// // //   };

// // //   // Load Cart
// // //   useEffect(() => {
// // //     const initCart = async () => {
// // //       try {
// // //         const config = await cartApi.getDeliveryConfig();
// // //         if (config) setDeliveryConfig(config);

// // //         if (user) {
// // //           const dbItems = await cartApi.fetchCart(user.id);
// // //           setCartItems(mapDbToUi(dbItems));
// // //         }
// // //       } catch (err) {
// // //         console.error("Cart init error:", err);
// // //       }
// // //     };
// // //     initCart();
// // //   }, [user]);

// // //   const addToCart = async (product, quantity, flavor, size) => {
// // //     // 1. Optimistic UI Update (Immediate feedback)
// // //     setCartItems(prev => {
// // //       // Check if item exists in local state
// // //       const existingIndex = prev.findIndex(item => 
// // //         item.id === product.id && 
// // //         item.selectedSize.id === size.id && 
// // //         item.selectedFlavor.name === flavor.name
// // //       );

// // //       if (existingIndex >= 0) {
// // //         // Increment existing
// // //         const updated = [...prev];
// // //         updated[existingIndex] = {
// // //           ...updated[existingIndex],
// // //           quantity: updated[existingIndex].quantity + quantity
// // //         };
// // //         return updated;
// // //       } else {
// // //         // Add new
// // //         return [...prev, {
// // //           dbId: 'temp-' + Date.now(), // Temp ID until sync
// // //           id: product.id,
// // //           name: product.name,
// // //           slug: product.slug,
// // //           imageColor: product.image_color,
// // //           quantity,
// // //           selectedFlavor: flavor,
// // //           selectedSize: size
// // //         }];
// // //       }
// // //     });

// // //     // 2. Database Sync
// // //     if (user) {
// // //       try {
// // //         // Use the new smart API function
// // //         await cartApi.addToCart(user.id, product, size.id, flavor.name, quantity);
        
// // //         // Refresh to get real IDs and merged states
// // //         const dbItems = await cartApi.fetchCart(user.id);
// // //         setCartItems(mapDbToUi(dbItems));
// // //       } catch (error) {
// // //         console.error("Failed to add to cart:", error);
// // //         // Optional: Revert state if needed
// // //       }
// // //     }
// // //   };

// // //   const updateQuantity = async (index, newQuantity) => {
// // //     if (newQuantity < 1) return;
    
// // //     const item = cartItems[index];
    
// // //     // UI Update
// // //     setCartItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQuantity } : it));

// // //     // DB Update
// // //     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
// // //        await cartApi.updateQuantity(item.dbId, newQuantity);
// // //     }
// // //   };

// // //   const removeFromCart = async (index) => {
// // //     const item = cartItems[index];
    
// // //     // UI Update
// // //     setCartItems(prev => prev.filter((_, i) => i !== index));

// // //     // DB Update
// // //     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
// // //        await cartApi.removeItem(item.dbId);
// // //     }
// // //   };

// // //   const getCartCount = () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
// // //   const getSubtotal = () => cartItems.reduce((acc, it) => {
// // //     // Safety check for price
// // //     const price = it.selectedSize?.price || 0; 
// // //     return acc + (price * it.quantity);
// // //   }, 0);

// // //   const getShipping = () => {
// // //     const sub = getSubtotal();
// // //     if (sub === 0) return 0;
// // //     return sub >= (deliveryConfig?.min_order_value || 0) ? 0 : (deliveryConfig?.shipping_fee || 0);
// // //   };

// // //   return (
// // //     <CartContext.Provider value={{ 
// // //         cartItems, addToCart, removeFromCart, updateQuantity, 
// // //         getCartCount, getSubtotal, getShipping, deliveryConfig 
// // //     }}>
// // //       {children}
// // //     </CartContext.Provider>
// // //   );
// // // };

// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // import { useAuth } from './AuthContext';
// // import { cartApi } from '../api/cartApi';

// // const CartContext = createContext();
// // export const useCart = () => useContext(CartContext);

// // export const CartProvider = ({ children }) => {
// //   const { user } = useAuth();
// //   const [cartItems, setCartItems] = useState([]);
// //   const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

// //   // --- HELPER: Map Database Structure to UI ---
// //   const mapDbToUi = (items) => {
// //     return items
// //       // Filter out corrupted rows (missing product or variant)
// //       .filter(item => item.products && item.product_variants) 
// //       .map(item => {
// //         // Extract the "Size Name" from the deep nesting
// //         // path: product_variants -> variant_selection_map[0] -> variant_options -> name
// //         const variantMap = item.product_variants?.variant_selection_map || [];
// //         const sizeName = variantMap.length > 0 
// //           ? variantMap[0]?.variant_options?.name 
// //           : 'Standard';

// //         return {
// //           dbId: item.id,
// //           id: item.product_id,
// //           name: item.products.name,
// //           slug: item.products.slug,
// //           imageColor: item.products.image_color,
// //           quantity: item.quantity,
// //           selectedFlavor: { name: item.flavor_name },
// //           selectedSize: { 
// //             id: item.variant_id, 
// //             price: item.product_variants.price, 
// //             count: sizeName // <--- FIXED MAPPING HERE
// //           }
// //         };
// //       });
// //   };

// //   // --- INITIALIZE CART ---
// //   useEffect(() => {
// //     const initCart = async () => {
// //       try {
// //         const config = await cartApi.getDeliveryConfig();
// //         if (config) setDeliveryConfig(config);

// //         if (user) {
// //           const dbItems = await cartApi.fetchCart(user.id);
// //           setCartItems(mapDbToUi(dbItems));
// //         }
// //       } catch (err) {
// //         console.error("Cart init failed:", err);
// //       }
// //     };
// //     initCart();
// //   }, [user]);

// //   // --- ADD TO CART (Optimistic + Sync) ---
// //   const addToCart = async (product, quantity, flavor, size) => {
// //     // 1. Optimistic Update (Immediate Feedback)
// //     setCartItems(prev => {
// //       const existingIdx = prev.findIndex(item => 
// //         item.id === product.id && 
// //         item.selectedSize.id === size.id && 
// //         item.selectedFlavor.name === flavor.name
// //       );

// //       if (existingIdx > -1) {
// //         // Merge Quantity
// //         const updated = [...prev];
// //         updated[existingIdx].quantity += quantity;
// //         return updated;
// //       } else {
// //         // Add New
// //         return [...prev, {
// //           dbId: `temp-${Date.now()}`,
// //           id: product.id,
// //           name: product.name,
// //           slug: product.slug,
// //           imageColor: product.image_color,
// //           quantity,
// //           selectedFlavor: flavor,
// //           selectedSize: size
// //         }];
// //       }
// //     });

// //     // 2. Database Sync
// //     if (user) {
// //       try {
// //         await cartApi.addToCart(user.id, product, size.id, flavor.name, quantity);
// //         // Silent refresh to ensure IDs are synced
// //         const dbItems = await cartApi.fetchCart(user.id);
// //         setCartItems(mapDbToUi(dbItems));
// //       } catch (err) {
// //         console.error("Sync failed:", err);
// //       }
// //     }
// //   };

// //   // --- STANDARD FUNCTIONS ---
// //   const updateQuantity = async (index, newQty) => {
// //     if (newQty < 1) return;
// //     const item = cartItems[index];

// //     setCartItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQty } : it));

// //     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
// //       await cartApi.updateQuantity(item.dbId, newQty);
// //     }
// //   };

// //   const removeFromCart = async (index) => {
// //     const item = cartItems[index];
// //     setCartItems(prev => prev.filter((_, i) => i !== index));

// //     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
// //       await cartApi.removeItem(item.dbId);
// //     }
// //   };

// //   const getCartCount = () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
// //   const getSubtotal = () => cartItems.reduce((acc, it) => {
// //     const price = parseFloat(it.selectedSize?.price || 0);
// //     return acc + (price * (it.quantity || 1));
// //   }, 0);

// //   const getShipping = () => {
// //     const sub = getSubtotal();
// //     return sub >= (deliveryConfig?.min_order_value || 0) ? 0 : (deliveryConfig?.shipping_fee || 0);
// //   };

// //   return (
// //     <CartContext.Provider value={{ 
// //       cartItems, addToCart, removeFromCart, updateQuantity, 
// //       getCartCount, getSubtotal, getShipping, deliveryConfig 
// //     }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { cartApi } from '../api/cartApi';

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const { user } = useAuth();
//   const [cartItems, setCartItems] = useState([]);
//   const [deliveryConfig, setDeliveryConfig] = useState({ min_order_value: 0, shipping_fee: 0 });

//   // --- MAP DB RESPONSE TO UI ---
//   const mapDbToUi = (items) => {
//     return items
//       .filter(item => item.product_variants && item.products) // Safety Filter
//       .map(item => {
//         // Reconstruct description from deep nested relation
//         const variantMap = item.product_variants?.variant_selection_map || [];
//         const labels = variantMap.map(vm => {
//           const type = vm.variant_options?.type?.name;
//           const val = vm.variant_options?.name;
//           return (type && val) ? `${type}: ${val}` : null;
//         }).filter(Boolean);

//         return {
//           dbId: item.id,
//           id: item.product_id,
//           variantId: item.variant_id,
//           name: item.products.name,
//           slug: item.products.slug,
//           imageColor: item.products.image_color,
//           quantity: item.quantity,
//           description: labels.join(' | ') || 'Standard',
//           price: item.product_variants.price
//         };
//       });
//   };

//   // --- INIT CART ---
//   useEffect(() => {
//     const initCart = async () => {
//       try {
//         const config = await cartApi.getDeliveryConfig();
//         if (config) setDeliveryConfig(config);

//         if (user) {
//           const dbItems = await cartApi.fetchCart(user.id);
//           setCartItems(mapDbToUi(dbItems));
//         }
//       } catch (err) {
//         console.error("Cart Init Error:", err);
//       }
//     };
//     initCart();
//   }, [user]);

//   // --- ADD TO CART ---
//   const addToCart = async (product, quantity, selections, variantId, variantPrice) => {
//     // 1. Build Description String for Optimistic UI
//     const description = Object.entries(selections)
//       .map(([k, v]) => `${k}: ${v}`)
//       .join(' | ');

//     // 2. Legacy Support: Extract "Flavor" for the flavor_name column
//     const legacyFlavor = selections["Flavor"] || null;

//     // 3. Optimistic Update
//     setCartItems(prev => {
//       const existingIdx = prev.findIndex(item => item.variantId === variantId);

//       if (existingIdx > -1) {
//         // Update Quantity locally
//         const updated = [...prev];
//         updated[existingIdx].quantity += quantity;
//         return updated;
//       } else {
//         // Add New Item locally
//         return [...prev, {
//           dbId: `temp-${Date.now()}`,
//           id: product.id,
//           variantId: variantId,
//           name: product.name,
//           slug: product.slug,
//           imageColor: product.image_color,
//           quantity,
//           description,
//           price: variantPrice // Use the specific variant price passed from ProductDetail
//         }];
//       }
//     });

//     // 4. DB Sync
//     if (user) {
//       try {
//         await cartApi.addToCart(user.id, product.id, variantId, legacyFlavor, quantity);
//         // Silent refresh to ensure IDs are synced
//         const dbItems = await cartApi.fetchCart(user.id);
//         setCartItems(mapDbToUi(dbItems));
//       } catch (err) {
//         console.error("Cart Sync Error:", err);
//       }
//     }
//   };

//   // --- UPDATE / REMOVE ---
//   const updateQuantity = async (index, newQty) => {
//     if (newQty < 1) return;
//     const item = cartItems[index];

//     setCartItems(prev => prev.map((it, i) => i === index ? { ...it, quantity: newQty } : it));

//     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
//       await cartApi.updateQuantity(item.dbId, newQty);
//     }
//   };

//   const removeFromCart = async (index) => {
//     const item = cartItems[index];
//     setCartItems(prev => prev.filter((_, i) => i !== index));

//     if (user && item.dbId && !item.dbId.toString().startsWith('temp')) {
//       await cartApi.removeItem(item.dbId);
//     }
//   };

//   const getCartCount = () => cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  
//   const getSubtotal = () => cartItems.reduce((acc, it) => acc + (parseFloat(it.price || 0) * it.quantity), 0);
  
//   const getShipping = () => {
//     const sub = getSubtotal();
//     return (sub > 0 && sub < (deliveryConfig?.min_order_value || 0)) ? (deliveryConfig?.shipping_fee || 0) : 0;
//   };

//   return (
//     <CartContext.Provider value={{ 
//       cartItems, addToCart, removeFromCart, updateQuantity, 
//       getCartCount, getSubtotal, getShipping, deliveryConfig 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
//   ShieldCheck, DollarSign, Banknote, Wallet, Calendar 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../client/supabaseClient';
// import { cartApi } from '../../api/cartApi';

// // --- HELPER: CALCULATE DELIVERY DATE ---
// const calculateDeliveryDate = (zipCode) => {
//   if (!zipCode) return null;
  
//   const today = new Date();
//   let daysToAdd = 5; // Standard Shipping

//   // Simulate Logic: East Coast (0xxxx-3xxxx) gets faster shipping (2-3 days)
//   const zipPrefix = parseInt(zipCode.substring(0, 1));
//   if (!isNaN(zipPrefix) && zipPrefix <= 3) {
//     daysToAdd = 3;
//   }

//   // Add days ignoring weekends (Simple version)
//   const futureDate = new Date(today);
//   futureDate.setDate(today.getDate() + daysToAdd);

//   // If Sunday, move to Monday
//   if (futureDate.getDay() === 0) {
//     futureDate.setDate(futureDate.getDate() + 1);
//   }

//   return futureDate;
// };

// const CheckoutModal = ({ isOpen, onClose }) => {
//   const { user } = useAuth();
//   const { cartItems, getSubtotal, getShipping, clearCart } = useCart();
//   const navigate = useNavigate();

//   // --- STEPS STATE ---
//   const [step, setStep] = useState(1); 
//   const [loading, setLoading] = useState(false);
//   const [processingOrder, setProcessingOrder] = useState(false);

//   // --- DATA STATE ---
//   const [addresses, setAddresses] = useState([]);
//   const [shippingAddress, setShippingAddress] = useState(null);
//   const [billingAddress, setBillingAddress] = useState(null);
//   const [sameAsShipping, setSameAsShipping] = useState(true);
//   const [paymentMethod, setPaymentMethod] = useState('card');
  
//   // --- DELIVERY STATE ---
//   const [estimatedDate, setEstimatedDate] = useState(null);

//   // --- FORM STATE ---
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newAddr, setNewAddr] = useState({ 
//     full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' 
//   });

//   // --- CALCULATIONS ---
//   const subtotal = getSubtotal();
//   const shippingCost = getShipping();
//   const estimatedTax = shippingAddress?.state === 'NY' ? subtotal * 0.08875 : 0; 
//   const total = subtotal + shippingCost + estimatedTax;

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     if (user && isOpen) {
//       fetchAddresses();
//       setStep(1);
//     }
//   }, [user, isOpen]);

//   // Sync Billing
//   useEffect(() => {
//     if (sameAsShipping) {
//       setBillingAddress(shippingAddress);
//     }
//   }, [sameAsShipping, shippingAddress]);

//   // Recalculate Date when Shipping Address changes
//   useEffect(() => {
//     if (shippingAddress?.zip_code) {
//       const date = calculateDeliveryDate(shippingAddress.zip_code);
//       setEstimatedDate(date);
//     }
//   }, [shippingAddress]);

//   const fetchAddresses = async () => {
//     const { data } = await supabase
//       .from('addresses')
//       .select('*')
//       .eq('user_id', user.id)
//       .order('is_default', { ascending: false });
      
//     setAddresses(data || []);
//     const defaultAddr = data?.find(a => a.is_default) || data?.[0];
//     setShippingAddress(defaultAddr);
//     setBillingAddress(defaultAddr);
//   };

//   const handleAddNewAddress = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('addresses')
//       .insert([{ ...newAddr, user_id: user.id, is_default: addresses.length === 0 }])
//       .select();
    
//     if (!error && data) {
//       const newAddressList = [...addresses, data[0]];
//       setAddresses(newAddressList);
//       setShippingAddress(data[0]); 
//       setShowAddForm(false);
//       setNewAddr({ full_name: '', street_address: '', city: '', state: '', zip_code: '', country: 'US' });
//     }
//     setLoading(false);
//   };

//   const handlePlaceOrder = async () => {
//     if (!user) return navigate('/login');
//     if (!shippingAddress || !billingAddress) return alert("Please select addresses.");

//     setProcessingOrder(true);

//     try {
//       let paymentStatus = 'pending';
//       let orderStatus = 'pending';
//       let providerId = paymentMethod === 'card' ? `pi_${Date.now()}` : `cod_${Date.now()}`;
//       let provider = paymentMethod === 'card' ? 'stripe_mock' : 'cod';

//       if (paymentMethod === 'card') {
//         await new Promise(resolve => setTimeout(resolve, 2000)); 
//         paymentStatus = 'succeeded';
//         orderStatus = 'paid';
//       } else {
//         await new Promise(resolve => setTimeout(resolve, 500)); 
//       }

//       // --- CREATE ORDER (With Delivery Date) ---
//       const { data: order, error: orderErr } = await supabase
//         .from('orders')
//         .insert([{
//           user_id: user.id,
//           total_amount: total,
//           tax_amount: estimatedTax,
//           shipping_cost: shippingCost,
//           status: orderStatus,
//           payment_method: paymentMethod,
//           shipping_address: shippingAddress,
//           billing_address: billingAddress,
//           payment_intent_id: providerId,
//           estimated_delivery_date: estimatedDate // <--- INSERTING DATE HERE
//         }])
//         .select()
//         .single();

//       if (orderErr) throw new Error(orderErr.message);

//       // --- CREATE ITEMS ---
//       const orderItemsData = cartItems.map(item => ({
//         order_id: order.id,
//         product_id: item.id,
//         variant_id: item.variantId, 
//         flavor_name: item.flavorName, 
//         item_name: item.name, 
//         item_variant_label: item.description, 
//         quantity: item.quantity,
//         price_at_purchase: item.price
//       }));

//       const { error: itemsErr } = await supabase.from('order_items').insert(orderItemsData);
//       if (itemsErr) throw new Error(itemsErr.message);

//       // --- CREATE PAYMENT ---
//       const { error: payErr } = await supabase.from('payments').insert([{
//         order_id: order.id,
//         user_id: user.id,
//         provider: provider,
//         provider_payment_id: providerId,
//         amount: total,
//         status: paymentStatus
//       }]);

//       if (payErr) console.error("Payment Log Error:", payErr);

//       await cartApi.clearCart(user.id);
//       clearCart();
      
//       alert(paymentMethod === 'cod' ? "Order Placed! Pay on delivery." : "Order Successful!");
//       onClose();
//       navigate('/account'); 

//     } catch (err) {
//       console.error("Checkout Error:", err);
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setProcessingOrder(false);
//     }
//   };

//   // --- RENDER HELPERS ---
//   const renderAddressList = (selectedId, onSelect) => (
//     <div className="space-y-3 mb-4">
//       {addresses.map((addr) => (
//         <div 
//           key={addr.id}
//           onClick={() => onSelect(addr)}
//           className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center group
//             ${selectedId === addr.id 
//               ? 'border-brand-glow bg-brand-glow/10 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
//               : 'border-white/5 bg-white/5 hover:border-white/20'}`}
//         >
//           <div>
//             <div className="flex items-center gap-2">
//               <p className="text-white text-sm font-bold">{addr.full_name}</p>
//               {addr.is_default && <span className="text-[10px] bg-white/10 px-2 rounded-full text-slate-400">Default</span>}
//             </div>
//             <p className="text-slate-400 text-xs mt-1">{addr.street_address}, {addr.city}, {addr.state} {addr.zip_code}</p>
//           </div>
//           {selectedId === addr.id && <Check className="text-brand-glow" size={18} />}
//         </div>
//       ))}
//     </div>
//   );

//   const renderAddressForm = () => (
//     <form onSubmit={handleAddNewAddress} className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
//       <h4 className="col-span-2 text-white text-sm font-bold mb-2">Add New Address</h4>
//       <input placeholder="Full Name" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, full_name: e.target.value})} required />
//       <input placeholder="Street Address" className="col-span-2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, street_address: e.target.value})} required />
//       <input placeholder="City" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, city: e.target.value})} required />
//       <input placeholder="State (NY, CA)" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, state: e.target.value})} required />
//       <input placeholder="Zip Code" className="bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-brand-glow outline-none" onChange={e => setNewAddr({...newAddr, zip_code: e.target.value})} required />
      
//       <div className="col-span-2 flex gap-3 mt-2">
//         <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3 rounded-xl border border-white/10 text-slate-400 text-sm hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
//         <button type="submit" disabled={loading} className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl text-sm hover:brightness-110 transition-colors">
//           {loading ? <Loader2 className="animate-spin mx-auto" size={18}/> : "Save Address"}
//         </button>
//       </div>
//     </form>
//   );

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

//       <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative bg-dark-900 border border-white/10 w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
//         {/* --- LEFT SIDE: ORDER SUMMARY --- */}
//         <div className="hidden md:flex w-[350px] bg-white/5 p-8 border-r border-white/5 flex-col h-full">
//           <h3 className="text-white font-black italic tracking-tighter text-xl mb-6">YOUR ORDER</h3>
//           <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
//             {cartItems.map((item, i) => (
//               <div key={i} className="flex gap-4 items-start">
//                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.imageColor || 'from-gray-700 to-gray-800'} opacity-80 flex-shrink-0 border border-white/10`} />
//                 <div>
//                   <p className="text-white text-sm font-bold leading-tight">{item.name}</p>
//                   <p className="text-brand-glow text-[10px] font-bold uppercase tracking-wider mt-1">{item.description}</p>
//                   <p className="text-slate-500 text-xs mt-1">{item.quantity} x ${item.price}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-white/10 pt-6 mt-6 space-y-3">
//             {/* DELIVERY DATE DISPLAY */}
//             {estimatedDate && (
//                 <div className="flex items-center gap-3 p-3 bg-brand-glow/10 border border-brand-glow/20 rounded-xl mb-4">
//                     <Calendar size={18} className="text-brand-glow" />
//                     <div>
//                         <p className="text-[10px] font-bold text-brand-glow uppercase tracking-wider">Estimated Arrival</p>
//                         <p className="text-white text-sm font-bold">{estimatedDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
//                     </div>
//                 </div>
//             )}

//             <div className="flex justify-between text-sm"><span className="text-slate-400">Subtotal</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
//             <div className="flex justify-between text-sm"><span className="text-slate-400">Shipping</span><span className="text-white">{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span></div>
//             <div className="flex justify-between text-sm"><span className="text-slate-400">Est. Tax</span><span className="text-white">${estimatedTax.toFixed(2)}</span></div>
//             <div className="pt-4 border-t border-white/5 flex justify-between items-end">
//                <span className="text-white font-bold">Total</span>
//                <span className="text-3xl font-black text-brand-glow italic tracking-tighter">${total.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* --- RIGHT SIDE: STEPS --- */}
//         <div className="flex-1 flex flex-col h-full bg-dark-900 relative">
//             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-dark-900/50 backdrop-blur-md z-10">
//                <div className="flex items-center gap-2">
//                  {step > 1 && (
//                     <button onClick={() => setStep(step - 1)} className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
//                       <ArrowLeft size={20} />
//                     </button>
//                  )}
//                  <h2 className="text-white font-black text-2xl italic tracking-tighter uppercase">
//                    {step === 1 ? 'Shipping Info' : step === 2 ? 'Billing Address' : 'Payment Method'}
//                  </h2>
//                </div>
//                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
//               {step === 1 && (
//                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//                   <div className="flex justify-between items-end mb-4">
//                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Address</label>
//                      {!showAddForm && <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1 hover:underline"><Plus size={14}/> New Address</button>}
//                   </div>
//                   {showAddForm ? renderAddressForm() : renderAddressList(shippingAddress?.id, setShippingAddress)}
//                   <button onClick={() => setStep(2)} disabled={!shippingAddress || showAddForm} className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest">Next: Billing Info</button>
//                 </motion.div>
//               )}

//               {step === 2 && (
//                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
//                     <div className="bg-white/5 border border-white/10 p-4 rounded-2xl mb-6 flex items-center gap-3 cursor-pointer" onClick={() => setSameAsShipping(!sameAsShipping)}>
//                        <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${sameAsShipping ? 'bg-brand-glow border-brand-glow' : 'border-slate-500'}`}>{sameAsShipping && <Check size={16} className="text-dark-900" />}</div>
//                        <span className="text-white font-bold text-sm">Same as Shipping Address</span>
//                     </div>
//                     {!sameAsShipping && (
//                       <div className="mt-4">
//                         <div className="flex justify-between items-end mb-4"><label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Billing Address</label>{!showAddForm && <button onClick={() => setShowAddForm(true)} className="text-brand-glow text-xs font-bold flex items-center gap-1"><Plus size={14}/> New Address</button>}</div>
//                         {showAddForm ? renderAddressForm() : renderAddressList(billingAddress?.id, setBillingAddress)}
//                       </div>
//                     )}
//                     <button onClick={() => setStep(3)} disabled={!sameAsShipping && !billingAddress} className="w-full mt-6 py-4 bg-white text-dark-900 font-bold rounded-2xl shadow-lg hover:bg-brand-glow transition-all uppercase tracking-widest">Next: Payment Method</button>
//                  </motion.div>
//               )}

//               {step === 3 && (
//                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="h-full flex flex-col">
//                    <div className="mb-6">
//                       <h3 className="text-white font-bold text-lg mb-4">Select Payment Method</h3>
//                       <div className="grid grid-cols-2 gap-4">
//                           <button onClick={() => setPaymentMethod('card')} className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900 border-brand-glow shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}>
//                              <CreditCard size={28} /> <span className="font-bold text-sm uppercase tracking-wider">Credit Card</span> {paymentMethod === 'card' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-dark-900"/>}
//                           </button>
//                           <button onClick={() => setPaymentMethod('cod')} className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900 border-green-500 shadow-lg' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}>
//                              <Banknote size={28} /> <span className="font-bold text-sm uppercase tracking-wider">Cash on Delivery</span> {paymentMethod === 'cod' && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-dark-900"/>}
//                           </button>
//                       </div>
//                    </div>

//                    <div className="flex-1 flex flex-col justify-center">
//                       {paymentMethod === 'card' && (
//                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 mb-4">
//                            <div className="flex items-center justify-between mb-2"><h4 className="text-white font-bold text-sm">Card Details</h4><div className="flex gap-2 text-slate-500"><ShieldCheck size={16} /> <span className="text-xs">Secure Encrypted</span></div></div>
//                            <div><input type="text" placeholder="Card Number" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" /></div>
//                            <div className="grid grid-cols-2 gap-4"><input type="text" placeholder="MM / YY" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" /><input type="text" placeholder="CVC" className="w-full bg-dark-900 border border-white/10 rounded-xl py-3 px-4 text-white font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none transition-colors" /></div>
//                         </motion.div>
//                       )}

//                       {paymentMethod === 'cod' && (
//                         <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl mb-4 text-center">
//                             <Wallet className="mx-auto text-green-400 mb-3" size={32} />
//                             <h4 className="text-green-400 font-bold text-lg mb-1">Pay Upon Delivery</h4>
//                             <p className="text-slate-400 text-sm max-w-xs mx-auto">Please ensure you have exact change available. We will contact you to confirm the delivery slot.</p>
//                         </motion.div>
//                       )}

//                       <button onClick={handlePlaceOrder} disabled={processingOrder} className={`w-full py-5 font-black rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-lg ${paymentMethod === 'cod' ? 'bg-green-500 hover:bg-green-400 text-dark-900 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-brand-glow hover:bg-cyan-300 text-dark-900 shadow-[0_0_30px_rgba(34,211,238,0.3)]'}`}>
//                           {processingOrder ? <><Loader2 className="animate-spin" /> Processing</> : <>{paymentMethod === 'cod' ? 'Place COD Order' : `Pay $${total.toFixed(2)}`} {paymentMethod === 'cod' ? <Check size={24}/> : <DollarSign size={20} className="fill-current" />}</>}
//                       </button>
//                    </div>
//                 </motion.div>
//               )}
//             </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;



// // // import React, { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { 
// // //   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
// // //   ShieldCheck, DollarSign, Banknote, Wallet, Calendar, AlertCircle 
// // // } from 'lucide-react';
// // // import { useAuth } from '../../context/AuthContext';
// // // import { useCart } from '../../context/CartContext';
// // // import { useNavigate } from 'react-router-dom';
// // // import { supabase } from '../../client/supabaseClient';
// // // import { cartApi } from '../../api/cartApi';

// // // // --- HELPER: CALCULATE DELIVERY DATE ---
// // // const calculateDeliveryDate = (zipCode) => {
// // //   if (!zipCode) return null;
  
// // //   const today = new Date();
// // //   let daysToAdd = 5; // Standard Shipping

// // //   // Simulate Logic: East Coast (0xxxx-3xxxx) gets faster shipping (2-3 days)
// // //   const zipPrefix = parseInt(zipCode.substring(0, 1));
// // //   if (!isNaN(zipPrefix) && zipPrefix <= 3) {
// // //     daysToAdd = 3;
// // //   }

// // //   // Add days ignoring weekends (Simple version)
// // //   const futureDate = new Date(today);
// // //   futureDate.setDate(today.getDate() + daysToAdd);

// // //   // If Sunday, move to Monday
// // //   if (futureDate.getDay() === 0) {
// // //     futureDate.setDate(futureDate.getDate() + 1);
// // //   }

// // //   return futureDate;
// // // };

// // // const CheckoutModal = ({ isOpen, onClose, total }) => {
// // //   const { user } = useAuth();
// // //   const { cartItems, refreshCart } = useCart(); // Assuming refreshCart exists to update UI after clear
// // //   const navigate = useNavigate();

// // //   // --- FORM STATE ---
// // //   const [step, setStep] = useState(1); // 1: Address, 2: Payment
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [success, setSuccess] = useState(false);
// // //   const [paymentMethod, setPaymentMethod] = useState('card');
// // //   const [saveAddress, setSaveAddress] = useState(false);

// // //   // Address State
// // //   const [formData, setFormData] = useState({
// // //     street_address: '',
// // //     city: '',
// // //     state: '',
// // //     zip_code: ''
// // //   });

// // //   // Load User Address on Mount
// // //   useEffect(() => {
// // //     if (isOpen && user) {
// // //       const loadAddress = async () => {
// // //         const { data } = await supabase
// // //           .from('addresses')
// // //           .select('*')
// // //           .eq('user_id', user.id)
// // //           .eq('is_default', true)
// // //           .maybeSingle();
        
// // //         if (data) {
// // //           setFormData({
// // //             street_address: data.street_address,
// // //             city: data.city,
// // //             state: data.state,
// // //             zip_code: data.zip_code
// // //           });
// // //         }
// // //       };
// // //       loadAddress();
// // //     }
// // //   }, [isOpen, user]);

// // //   // --- HANDLERS ---
// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData(prev => ({ ...prev, [name]: value }));
// // //     setError('');
// // //   };

// // //   const validateStep1 = () => {
// // //     if (!formData.street_address || !formData.city || !formData.state || !formData.zip_code) {
// // //       setError('Please fill in all address fields.');
// // //       return false;
// // //     }
// // //     return true;
// // //   };

// // //   const handleNextStep = () => {
// // //     if (validateStep1()) setStep(2);
// // //   };

// // //   // --- ORDER PROCESSING (THE CORE LOGIC) ---
// // //   const handlePlaceOrder = async () => {
// // //     setLoading(true);
// // //     setError('');

// // //     try {
// // //       if (!user) throw new Error("User session invalid.");

// // //       // 1. FINAL STOCK CHECK (Concurrency Guard)
// // //       // Check if items are still available right before purchase
// // //       for (const item of cartItems) {
// // //         const { data: variant } = await supabase
// // //           .from('product_variants')
// // //           .select('stock_quantity, is_active')
// // //           .eq('id', item.variant_id)
// // //           .single();

// // //         if (!variant || !variant.is_active) {
// // //             throw new Error(`Item "${item.products?.name}" is no longer available.`);
// // //         }
// // //         if (variant.stock_quantity < item.quantity) {
// // //             throw new Error(`Insufficient stock for "${item.products?.name}". Available: ${variant.stock_quantity}`);
// // //         }
// // //       }

// // //       // 2. SAVE ADDRESS (If Checked)
// // //       if (saveAddress) {
// // //         // Upsert address logic could go here, for now we insert new if requested
// // //         await supabase.from('addresses').insert([{
// // //            user_id: user.id,
// // //            ...formData,
// // //            is_default: true // Set as new default
// // //         }]);
// // //       }

// // //       // 3. CREATE ORDER RECORD
// // //       const { data: order, error: orderError } = await supabase
// // //         .from('orders')
// // //         .insert([{
// // //           user_id: user.id,
// // //           total_amount: total,
// // //           status: 'pending', // Default status
// // //           payment_method: paymentMethod,
// // //           shipping_address: formData,
// // //           shipping_provider: 'Standard Shipping',
// // //           shipping_cost: total > 50 ? 0 : 5.99,
// // //           estimated_delivery_date: calculateDeliveryDate(formData.zip_code)
// // //         }])
// // //         .select()
// // //         .single();

// // //       if (orderError) throw orderError;

// // //       // 4. CREATE ORDER ITEMS (Snapshot)
// // //       const orderItemsPayload = cartItems.map(item => ({
// // //         order_id: order.id,
// // //         product_id: item.product_id,
// // //         variant_id: item.variant_id,
// // //         quantity: item.quantity,
// // //         price_at_purchase: item.product_variants.price, // Lock in price
// // //         item_name: item.products.name,
// // //         item_variant_label: item.product_variants?.variant_selection_map?.map(v => v.variant_options?.name).join(' / ') || item.flavor_name,
// // //         flavor_name: item.flavor_name // Legacy support
// // //       }));

// // //       const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
// // //       if (itemsError) throw itemsError;

// // //       // 5. PROCESS PAYMENT RECORD
// // //       // In a real app, this is where you'd confirm the Stripe Intent
// // //       const { error: payError } = await supabase.from('payments').insert([{
// // //         order_id: order.id,
// // //         user_id: user.id,
// // //         amount: total,
// // //         provider: paymentMethod === 'card' ? 'stripe' : 'manual',
// // //         status: paymentMethod === 'card' ? 'succeeded' : 'pending', // Cards are paid instantly, COD is pending
// // //         provider_payment_id: paymentMethod === 'card' ? `ch_${Date.now()}_simulated` : null
// // //       }]);
      
// // //       if (payError) throw payError;

// // //       // 6. UPDATE INVENTORY (Decrement Stock)
// // //       for (const item of cartItems) {
// // //         // We fetch current stock again or rely on the previous check. 
// // //         // Ideally use an RPC for atomic decrement, but standard update works for low traffic.
// // //         const currentStock = item.product_variants.stock_quantity;
// // //         await supabase
// // //           .from('product_variants')
// // //           .update({ stock_quantity: Math.max(0, currentStock - item.quantity) })
// // //           .eq('id', item.variant_id);
// // //       }

// // //       // 7. CLEAR CART
// // //       await cartApi.clearCart(user.id);
// // //       if (refreshCart) refreshCart(); // Update context

// // //       // 8. FINISH
// // //       setSuccess(true);
// // //       setTimeout(() => {
// // //         onClose();
// // //         navigate('/account/orders'); // Redirect to order history
// // //       }, 2000);

// // //     } catch (err) {
// // //       console.error(err);
// // //       setError(err.message || "Failed to place order. Please try again.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!isOpen) return null;

// // //   return (
// // //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
// // //       <motion.div 
// // //         initial={{ opacity: 0, scale: 0.95 }}
// // //         animate={{ opacity: 1, scale: 1 }}
// // //         exit={{ opacity: 0, scale: 0.95 }}
// // //         className="w-full max-w-lg bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
// // //       >
        
// // //         {/* HEADER */}
// // //         <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
// // //           <div>
// // //             <h2 className="text-xl font-black text-white uppercase italic tracking-wider">
// // //                {success ? 'Order Confirmed!' : 'Secure Checkout'}
// // //             </h2>
// // //             {!success && (
// // //               <div className="flex items-center gap-2 mt-1 text-xs text-brand-glow font-bold uppercase tracking-widest">
// // //                 <ShieldCheck size={12} /> 256-Bit SSL Encrypted
// // //               </div>
// // //             )}
// // //           </div>
// // //           <button onClick={onClose} disabled={loading} className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
// // //             <X size={20} />
// // //           </button>
// // //         </div>

// // //         {/* BODY */}
// // //         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
          
// // //           <AnimatePresence mode="wait">
// // //             {success ? (
// // //                <motion.div 
// // //                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
// // //                  className="flex flex-col items-center justify-center h-full py-10 text-center"
// // //                >
// // //                   <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
// // //                      <Check size={40} className="text-dark-900 stroke-[4]" />
// // //                   </div>
// // //                   <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
// // //                   <p className="text-slate-400 max-w-xs mx-auto">Your order has been placed. Redirecting to your orders...</p>
// // //                </motion.div>
// // //             ) : step === 1 ? (
// // //               <motion.div 
// // //                 key="step1"
// // //                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
// // //                 className="space-y-6"
// // //               >
// // //                  <div className="space-y-4">
// // //                     <label className="text-xs font-bold text-slate-500 uppercase">Shipping Address</label>
                    
// // //                     <input 
// // //                       name="street_address" 
// // //                       placeholder="Street Address" 
// // //                       value={formData.street_address}
// // //                       onChange={handleInputChange}
// // //                       className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-colors"
// // //                     />
                    
// // //                     <div className="grid grid-cols-2 gap-4">
// // //                        <input 
// // //                           name="city" 
// // //                           placeholder="City" 
// // //                           value={formData.city}
// // //                           onChange={handleInputChange}
// // //                           className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-colors"
// // //                        />
// // //                        <input 
// // //                           name="state" 
// // //                           placeholder="State" 
// // //                           value={formData.state}
// // //                           onChange={handleInputChange}
// // //                           className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-colors"
// // //                        />
// // //                     </div>
                    
// // //                     <input 
// // //                        name="zip_code" 
// // //                        placeholder="ZIP Code" 
// // //                        value={formData.zip_code}
// // //                        onChange={handleInputChange}
// // //                        maxLength={5}
// // //                        className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-colors"
// // //                     />

// // //                     {/* Save Address Toggle */}
// // //                     <div className="flex items-center gap-3 pt-2 cursor-pointer" onClick={() => setSaveAddress(!saveAddress)}>
// // //                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${saveAddress ? 'bg-brand-glow border-brand-glow' : 'border-white/20 bg-dark-950'}`}>
// // //                           {saveAddress && <Check size={14} className="text-dark-900" />}
// // //                        </div>
// // //                        <span className="text-sm text-slate-400">Save this address for future orders</span>
// // //                     </div>

// // //                     {formData.zip_code.length === 5 && (
// // //                        <div className="bg-brand-glow/10 border border-brand-glow/20 p-3 rounded-lg flex items-center gap-3 text-brand-glow text-xs font-bold mt-2">
// // //                           <Calendar size={14} />
// // //                           Estimated Delivery: {calculateDeliveryDate(formData.zip_code)?.toDateString()}
// // //                        </div>
// // //                     )}
// // //                  </div>
// // //               </motion.div>
// // //             ) : (
// // //               <motion.div 
// // //                 key="step2"
// // //                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
// // //                 className="space-y-6"
// // //               >
// // //                  {/* Summary Card */}
// // //                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
// // //                     <div>
// // //                        <p className="text-xs text-slate-500 uppercase font-bold">Total to Pay</p>
// // //                        <p className="text-2xl font-mono font-bold text-white">${total.toFixed(2)}</p>
// // //                     </div>
// // //                     <div className="text-right">
// // //                        <p className="text-xs text-slate-500">Shipping To:</p>
// // //                        <p className="text-sm text-white font-medium">{formData.city}, {formData.zip_code}</p>
// // //                     </div>
// // //                  </div>

// // //                  <div className="space-y-3">
// // //                     <label className="text-xs font-bold text-slate-500 uppercase">Payment Method</label>
                    
// // //                     <button 
// // //                        onClick={() => setPaymentMethod('card')}
// // //                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${paymentMethod === 'card' ? 'bg-brand-glow/10 border-brand-glow shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-dark-950 border-white/10 hover:border-white/20'}`}
// // //                     >
// // //                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900' : 'bg-dark-900 text-slate-400'}`}>
// // //                           <CreditCard size={20} />
// // //                        </div>
// // //                        <div className="text-left">
// // //                           <p className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Credit / Debit Card</p>
// // //                           <p className="text-[10px] text-slate-500">Secure simulated processing via Stripe</p>
// // //                        </div>
// // //                        {paymentMethod === 'card' && <Check className="ml-auto text-brand-glow" size={20} />}
// // //                     </button>

// // //                     <button 
// // //                        onClick={() => setPaymentMethod('cod')}
// // //                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${paymentMethod === 'cod' ? 'bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-dark-950 border-white/10 hover:border-white/20'}`}
// // //                     >
// // //                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900' : 'bg-dark-900 text-slate-400'}`}>
// // //                           <Banknote size={20} />
// // //                        </div>
// // //                        <div className="text-left">
// // //                           <p className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</p>
// // //                           <p className="text-[10px] text-slate-500">Pay physically upon receipt</p>
// // //                        </div>
// // //                        {paymentMethod === 'cod' && <Check className="ml-auto text-green-500" size={20} />}
// // //                     </button>
// // //                  </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>

// // //           {/* Error Message */}
// // //           <AnimatePresence>
// // //             {error && (
// // //               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-200 text-xs">
// // //                 <AlertCircle size={16} className="shrink-0 mt-0.5" />
// // //                 <span>{error}</span>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>

// // //         </div>

// // //         {/* FOOTER */}
// // //         {!success && (
// // //           <div className="p-6 border-t border-white/10 bg-dark-950">
// // //              {step === 1 ? (
// // //                <button 
// // //                  onClick={handleNextStep}
// // //                  className="w-full py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-brand-glow transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
// // //                >
// // //                  Continue to Payment <ArrowRight size={18} />
// // //                </button>
// // //              ) : (
// // //                <div className="flex gap-3">
// // //                   <button 
// // //                     onClick={() => setStep(1)}
// // //                     className="px-6 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
// // //                   >
// // //                     <ArrowLeft size={20} />
// // //                   </button>
// // //                   <button 
// // //                     onClick={handlePlaceOrder}
// // //                     disabled={loading}
// // //                     className={`flex-1 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm ${
// // //                       paymentMethod === 'cod' 
// // //                       ? 'bg-green-500 text-dark-900 hover:bg-green-400' 
// // //                       : 'bg-brand-glow text-dark-900 hover:bg-cyan-300'
// // //                     } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// // //                   >
// // //                     {loading ? <Loader2 className="animate-spin" /> : (paymentMethod === 'cod' ? 'Place COD Order' : `Pay $${total.toFixed(2)}`)}
// // //                   </button>
// // //                </div>
// // //              )}
// // //           </div>
// // //         )}
// // //       </motion.div>
// // //     </div>
// // //   );
// // // };

// // // export default CheckoutModal;

// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
// //   ShieldCheck, Banknote, Calendar, AlertCircle, Phone, Mail, Edit2 
// // } from 'lucide-react';
// // import { useAuth } from '../../context/AuthContext';
// // import { useCart } from '../../context/CartContext';
// // import { useNavigate } from 'react-router-dom';
// // import { supabase } from '../../client/supabaseClient';
// // import { cartApi } from '../../api/cartApi';
// // import { ArrowRight } from 'lucide-react';
// // // --- HELPER: CALCULATE DELIVERY DATE ---
// // const calculateDeliveryDate = (zipCode) => {
// //   if (!zipCode || zipCode.length < 5) return null;
  
// //   const today = new Date();
// //   let daysToAdd = 5; // Standard Shipping

// //   // Simulate Logic: East Coast (0xxxx-3xxxx) gets faster shipping
// //   const zipPrefix = parseInt(zipCode.substring(0, 1));
// //   if (!isNaN(zipPrefix) && zipPrefix <= 3) {
// //     daysToAdd = 3;
// //   }

// //   const futureDate = new Date(today);
// //   futureDate.setDate(today.getDate() + daysToAdd);

// //   // If Sunday, move to Monday
// //   if (futureDate.getDay() === 0) {
// //     futureDate.setDate(futureDate.getDate() + 1);
// //   }

// //   return futureDate;
// // };

// // const CheckoutModal = ({ isOpen, onClose }) => {
// //   const { user } = useAuth();
// //   const { cartItems, refreshCart, deliveryConfig, getSubtotal } = useCart();
// //   const navigate = useNavigate();

// //   // --- FORM STATE ---
// //   const [step, setStep] = useState(1); // 1: Address, 2: Payment
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState(false);
  
// //   // Payment State
// //   const [paymentMethod, setPaymentMethod] = useState('card');
// //   const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

// //   // Address State
// //   const [savedAddresses, setSavedAddresses] = useState([]);
// //   const [selectedAddressId, setSelectedAddressId] = useState('new');
// //   const [saveAddress, setSaveAddress] = useState(false);
// //   const [formData, setFormData] = useState({
// //     street_address: '',
// //     city: '',
// //     state: '',
// //     zip_code: '',
// //     phone_number: '', // Critical for delivery
// //     email: user?.email || ''
// //   });

// //   // --- FINANCIALS (Calculated Live) ---
// //   const subtotal = getSubtotal();
// //   const shippingFee = subtotal >= (deliveryConfig?.min_order_value || 50) ? 0 : (deliveryConfig?.shipping_fee || 5.99);
// //   const total = subtotal + shippingFee;

// //   // --- INITIAL LOAD ---
// //   useEffect(() => {
// //     if (isOpen && user) {
// //       // 1. Load Profile (for phone number)
// //       const loadProfile = async () => {
// //         const { data: profile } = await supabase
// //           .from('profiles')
// //           .select('phone_number, first_name, last_name')
// //           .eq('id', user.id)
// //           .single();
        
// //         if (profile?.phone_number) {
// //           setFormData(prev => ({ ...prev, phone_number: profile.phone_number }));
// //         }
// //       };

// //       // 2. Load Addresses
// //       const loadAddresses = async () => {
// //         const { data } = await supabase
// //           .from('addresses')
// //           .select('*')
// //           .eq('user_id', user.id)
// //           .order('is_default', { ascending: false }); // Default first
        
// //         if (data && data.length > 0) {
// //           setSavedAddresses(data);
// //           // Auto-select the default address
// //           const defaultAddr = data.find(a => a.is_default) || data[0];
// //           setSelectedAddressId(defaultAddr.id);
// //           populateForm(defaultAddr);
// //         } else {
// //           setSelectedAddressId('new');
// //         }
// //       };

// //       loadProfile();
// //       loadAddresses();
// //     }
// //   }, [isOpen, user]);

// //   const populateForm = (addr) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       street_address: addr.street_address,
// //       city: addr.city,
// //       state: addr.state,
// //       zip_code: addr.zip_code
// //     }));
// //   };

// //   const handleAddressSelection = (id) => {
// //     setSelectedAddressId(id);
// //     if (id === 'new') {
// //       setFormData(prev => ({ ...prev, street_address: '', city: '', state: '', zip_code: '' }));
// //     } else {
// //       const addr = savedAddresses.find(a => a.id === id);
// //       if (addr) populateForm(addr);
// //     }
// //   };

// //   // --- VALIDATION ---
// //   const validateStep1 = () => {
// //     const { street_address, city, state, zip_code, phone_number } = formData;
    
// //     if (!street_address || !city || !state || !zip_code || !phone_number) {
// //       setError('Please fill in all required fields, including Phone Number.');
// //       return false;
// //     }
// //     if (zip_code.length < 5) {
// //       setError('Please enter a valid ZIP code.');
// //       return false;
// //     }
// //     if (phone_number.length < 10) {
// //       setError('Please enter a valid Phone Number.');
// //       return false;
// //     }
// //     return true;
// //   };

// //   const handleNextStep = () => {
// //     setError('');
// //     if (validateStep1()) setStep(2);
// //   };

// //   // --- ORDER PLACEMENT ---
// //   const handlePlaceOrder = async () => {
// //     setLoading(true);
// //     setError('');

// //     try {
// //       if (!user) throw new Error("User session invalid.");
// //       if (cartItems.length === 0) throw new Error("Your cart is empty.");

// //       // 1. CONCURRENCY CHECK (Stock Validation)
// //       for (const item of cartItems) {
// //         const { data: variant } = await supabase
// //           .from('product_variants')
// //           .select('stock_quantity, is_active')
// //           .eq('id', item.variant_id)
// //           .single();

// //         if (!variant || !variant.is_active) {
// //             throw new Error(`Item "${item.products?.name}" is no longer available.`);
// //         }
// //         if (variant.stock_quantity < item.quantity) {
// //             throw new Error(`Insufficient stock for "${item.products?.name}". Available: ${variant.stock_quantity}`);
// //         }
// //       }

// //       // 2. SAVE NEW ADDRESS (If 'new' was selected and save checked)
// //       let finalShippingAddress = { ...formData };
      
// //       if (selectedAddressId === 'new' && saveAddress) {
// //         const { data: newAddr, error: addrError } = await supabase.from('addresses').insert([{
// //            user_id: user.id,
// //            street_address: formData.street_address,
// //            city: formData.city,
// //            state: formData.state,
// //            zip_code: formData.zip_code,
// //            is_default: savedAddresses.length === 0 // Make default if it's the first one
// //         }]).select().single();
        
// //         if (!addrError && newAddr) {
// //            // Use the ID if needed later, but we store the JSON snapshot in orders anyway
// //         }
// //       }

// //       // 3. UPDATE PROFILE PHONE (If missing)
// //       if (formData.phone_number) {
// //         await supabase.from('profiles')
// //           .update({ phone_number: formData.phone_number })
// //           .eq('id', user.id);
// //       }

// //       // 4. CREATE ORDER
// //       const { data: order, error: orderError } = await supabase
// //         .from('orders')
// //         .insert([{
// //           user_id: user.id,
// //           total_amount: total,
// //           status: 'pending',
// //           payment_method: paymentMethod,
// //           shipping_address: finalShippingAddress, // JSONB snapshot
// //           shipping_provider: 'Standard Shipping',
// //           shipping_cost: shippingFee,
// //           estimated_delivery_date: calculateDeliveryDate(formData.zip_code)
// //         }])
// //         .select()
// //         .single();

// //       if (orderError) throw orderError;

// //       // 5. CREATE ORDER ITEMS
// //       const orderItemsPayload = cartItems.map(item => ({
// //         order_id: order.id,
// //         product_id: item.product_id,
// //         variant_id: item.variant_id,
// //         quantity: item.quantity,
// //         price_at_purchase: item.product_variants.price,
// //         item_name: item.products.name,
// //         // Robust Label Construction
// //         item_variant_label: item.product_variants?.variant_selection_map?.map(v => v.variant_options?.name).join(' / ') || item.flavor_name,
// //         flavor_name: item.flavor_name
// //       }));

// //       const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
// //       if (itemsError) throw itemsError;

// //       // 6. RECORD PAYMENT
// //       const { error: payError } = await supabase.from('payments').insert([{
// //         order_id: order.id,
// //         user_id: user.id,
// //         amount: total,
// //         provider: paymentMethod === 'card' ? 'stripe' : 'manual',
// //         status: paymentMethod === 'card' ? 'succeeded' : 'pending',
// //         provider_payment_id: paymentMethod === 'card' ? `ch_sim_${Date.now()}` : null
// //       }]);
      
// //       if (payError) throw payError;

// //       // 7. DECREMENT STOCK
// //       // Note: In high-concurrency apps, use a Postgres Function (RPC) for this loop
// //       for (const item of cartItems) {
// //         const currentStock = item.product_variants.stock_quantity;
// //         await supabase
// //           .from('product_variants')
// //           .update({ stock_quantity: Math.max(0, currentStock - item.quantity) })
// //           .eq('id', item.variant_id);
// //       }

// //       // 8. CLEAR CART & FINISH
// //       await cartApi.clearCart(user.id);
// //       if (refreshCart) refreshCart();
      
// //       setSuccess(true);
// //       setTimeout(() => {
// //         onClose();
// //         navigate('/account');
// //       }, 2500);

// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message || "Transaction failed. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
// //       <motion.div 
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         className="w-full max-w-lg bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
// //       >
        
// //         {/* HEADER */}
// //         <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-center">
// //           <div>
// //             <h2 className="text-xl font-black text-white uppercase italic tracking-wider">
// //                {success ? 'Order Confirmed' : 'Secure Checkout'}
// //             </h2>
// //             {!success && (
// //               <div className="flex items-center gap-2 mt-1 text-xs text-brand-glow font-bold uppercase tracking-widest">
// //                 <ShieldCheck size={12} /> Encrypted Transaction
// //               </div>
// //             )}
// //           </div>
// //           <button onClick={onClose} disabled={loading} className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* BODY */}
// //         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative">
          
// //           <AnimatePresence mode="wait">
// //             {success ? (
// //                <motion.div 
// //                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
// //                  className="flex flex-col items-center justify-center h-full py-10 text-center"
// //                >
// //                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
// //                      <Check size={48} className="text-dark-900 stroke-[4]" />
// //                   </div>
// //                   <h3 className="text-2xl font-bold text-white mb-2">Order Successful!</h3>
// //                   <p className="text-slate-400 max-w-xs mx-auto mb-6">Thank you for your purchase. A confirmation email has been sent.</p>
// //                   <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-4 py-2 rounded-lg">
// //                     <Loader2 size={12} className="animate-spin" /> Redirecting to orders...
// //                   </div>
// //                </motion.div>
// //             ) : step === 1 ? (
// //               <motion.div 
// //                 key="step1"
// //                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
// //                 className="space-y-6"
// //               >
// //                  {/* Address Selector */}
// //                  {savedAddresses.length > 0 && (
// //                    <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
// //                       {savedAddresses.map(addr => (
// //                         <button
// //                           key={addr.id}
// //                           onClick={() => handleAddressSelection(addr.id)}
// //                           className={`flex-shrink-0 p-3 rounded-xl border text-left min-w-[140px] transition-all ${
// //                             selectedAddressId === addr.id 
// //                             ? 'bg-brand-glow/10 border-brand-glow text-white' 
// //                             : 'bg-dark-950 border-white/10 text-slate-400 hover:border-white/30'
// //                           }`}
// //                         >
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <MapPin size={14} className={selectedAddressId === addr.id ? 'text-brand-glow' : ''}/>
// //                             <span className="text-xs font-bold">{addr.city}</span>
// //                           </div>
// //                           <p className="text-[10px] truncate">{addr.street_address}</p>
// //                         </button>
// //                       ))}
// //                       <button
// //                         onClick={() => handleAddressSelection('new')}
// //                         className={`flex-shrink-0 p-3 rounded-xl border text-left min-w-[140px] flex items-center justify-center gap-2 transition-all ${
// //                           selectedAddressId === 'new'
// //                           ? 'bg-brand-glow/10 border-brand-glow text-white'
// //                           : 'bg-white/5 border-dashed border-white/20 text-slate-400 hover:border-white/50'
// //                         }`}
// //                       >
// //                          <Plus size={16} /> <span className="text-xs font-bold">New Address</span>
// //                       </button>
// //                    </div>
// //                  )}

// //                  <div className="space-y-4">
// //                     <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
// //                        <Edit2 size={12} /> Shipping Details
// //                     </label>
                    
// //                     <div className="grid grid-cols-1 gap-4">
// //                       <input 
// //                         name="street_address" 
// //                         placeholder="Street Address" 
// //                         value={formData.street_address}
// //                         onChange={(e) => { setFormData({...formData, street_address: e.target.value}); setError(''); }}
// //                         className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none transition-colors"
// //                       />
// //                     </div>
                    
// //                     <div className="grid grid-cols-2 gap-4">
// //                        <input 
// //                           name="city" 
// //                           placeholder="City" 
// //                           value={formData.city}
// //                           onChange={(e) => setFormData({...formData, city: e.target.value})}
// //                           className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none"
// //                        />
// //                        <input 
// //                           name="state" 
// //                           placeholder="State" 
// //                           value={formData.state}
// //                           onChange={(e) => setFormData({...formData, state: e.target.value})}
// //                           className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none"
// //                        />
// //                     </div>
                    
// //                     <div className="grid grid-cols-2 gap-4">
// //                        <input 
// //                           name="zip_code" 
// //                           placeholder="ZIP Code" 
// //                           value={formData.zip_code}
// //                           onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
// //                           maxLength={5}
// //                           className="w-full bg-dark-950 border border-white/10 rounded-xl p-4 text-white focus:border-brand-glow outline-none"
// //                        />
// //                        <div className="relative">
// //                           <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
// //                           <input 
// //                               name="phone_number" 
// //                               placeholder="Phone Number" 
// //                               value={formData.phone_number}
// //                               onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
// //                               className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-brand-glow outline-none"
// //                           />
// //                        </div>
// //                     </div>

// //                     <div className="relative opacity-50 pointer-events-none">
// //                         <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
// //                         <input 
// //                             value={formData.email} 
// //                             readOnly 
// //                             className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-400"
// //                         />
// //                     </div>

// //                     {/* Save Address Toggle (Only for new addresses) */}
// //                     {selectedAddressId === 'new' && (
// //                       <div className="flex items-center gap-3 pt-2 cursor-pointer" onClick={() => setSaveAddress(!saveAddress)}>
// //                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${saveAddress ? 'bg-brand-glow border-brand-glow' : 'border-white/20 bg-dark-950'}`}>
// //                             {saveAddress && <Check size={14} className="text-dark-900" />}
// //                          </div>
// //                          <span className="text-sm text-slate-400">Save this address for future orders</span>
// //                       </div>
// //                     )}

// //                     {formData.zip_code.length >= 5 && (
// //                        <div className="bg-brand-glow/10 border border-brand-glow/20 p-3 rounded-lg flex items-center gap-3 text-brand-glow text-xs font-bold mt-2 animate-in fade-in slide-in-from-top-2">
// //                           <Calendar size={14} />
// //                           Estimated Delivery: {calculateDeliveryDate(formData.zip_code)?.toDateString()}
// //                        </div>
// //                     )}
// //                  </div>
// //               </motion.div>
// //             ) : (
// //               <motion.div 
// //                 key="step2"
// //                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
// //                 className="space-y-6"
// //               >
// //                  {/* Summary Card */}
// //                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
// //                     <div>
// //                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total to Pay</p>
// //                        <p className="text-2xl font-mono font-bold text-white flex items-start gap-1">
// //                           <span className="text-sm mt-1">$</span>{total.toFixed(2)}
// //                        </p>
// //                     </div>
// //                     <div className="text-right">
// //                        <p className="text-xs text-slate-500 uppercase font-bold mb-1">Delivering To</p>
// //                        <p className="text-sm text-white font-medium">{formData.city}, {formData.zip_code}</p>
// //                        <p className="text-[10px] text-slate-500">{formData.phone_number}</p>
// //                     </div>
// //                  </div>

// //                  <div className="space-y-3">
// //                     <label className="text-xs font-bold text-slate-500 uppercase">Select Payment Method</label>
                    
// //                     <button 
// //                        onClick={() => setPaymentMethod('card')}
// //                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${paymentMethod === 'card' ? 'bg-brand-glow/10 border-brand-glow shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'bg-dark-950 border-white/10 hover:border-white/20'}`}
// //                     >
// //                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900' : 'bg-dark-900 text-slate-400'}`}>
// //                           <CreditCard size={20} />
// //                        </div>
// //                        <div className="text-left flex-1">
// //                           <p className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Credit / Debit Card</p>
// //                           <p className="text-[10px] text-slate-500">Secure simulated processing via Stripe</p>
// //                        </div>
// //                        {paymentMethod === 'card' && <Check className="text-brand-glow" size={20} />}
// //                     </button>

// //                     {/* Simulated Card Inputs */}
// //                     <AnimatePresence>
// //                       {paymentMethod === 'card' && (
// //                         <motion.div 
// //                           initial={{ height: 0, opacity: 0 }} 
// //                           animate={{ height: 'auto', opacity: 1 }}
// //                           exit={{ height: 0, opacity: 0 }}
// //                           className="overflow-hidden"
// //                         >
// //                           <div className="p-4 bg-dark-950 border border-white/10 rounded-xl space-y-3">
// //                              <input 
// //                                placeholder="0000 0000 0000 0000" 
// //                                maxLength={19}
// //                                className="w-full bg-dark-900 border border-white/10 rounded-lg p-3 text-white text-sm font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none"
// //                              />
// //                              <div className="flex gap-3">
// //                                 <input 
// //                                   placeholder="MM/YY" 
// //                                   maxLength={5}
// //                                   className="w-1/2 bg-dark-900 border border-white/10 rounded-lg p-3 text-white text-sm font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none"
// //                                 />
// //                                 <input 
// //                                   placeholder="CVC" 
// //                                   maxLength={3}
// //                                   type="password"
// //                                   className="w-1/2 bg-dark-900 border border-white/10 rounded-lg p-3 text-white text-sm font-mono placeholder:text-slate-600 focus:border-brand-glow outline-none"
// //                                 />
// //                              </div>
// //                           </div>
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>

// //                     <button 
// //                        onClick={() => setPaymentMethod('cod')}
// //                        className={`w-full p-4 rounded-xl border flex items-center gap-4 transition-all ${paymentMethod === 'cod' ? 'bg-green-500/10 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.1)]' : 'bg-dark-950 border-white/10 hover:border-white/20'}`}
// //                     >
// //                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900' : 'bg-dark-900 text-slate-400'}`}>
// //                           <Banknote size={20} />
// //                        </div>
// //                        <div className="text-left flex-1">
// //                           <p className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</p>
// //                           <p className="text-[10px] text-slate-500">Pay physically upon receipt</p>
// //                        </div>
// //                        {paymentMethod === 'cod' && <Check className="text-green-500" size={20} />}
// //                     </button>
// //                  </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Error Message */}
// //           <AnimatePresence>
// //             {error && (
// //               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2 text-red-200 text-xs font-bold">
// //                 <AlertCircle size={16} className="shrink-0 mt-0.5" />
// //                 <span>{error}</span>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //         </div>

// //         {/* FOOTER */}
// //         {!success && (
// //           <div className="p-6 border-t border-white/10 bg-dark-950">
// //              {step === 1 ? (
// //                <button 
// //                  onClick={handleNextStep}
// //                  className="w-full py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-brand-glow transition-colors flex items-center justify-center gap-2 uppercase tracking-wide text-sm shadow-lg hover:shadow-brand-glow/20"
// //                >
// //                  Continue to Payment <ArrowRight size={18} />
// //                </button>
// //              ) : (
// //                <div className="flex gap-3">
// //                   <button 
// //                     onClick={() => setStep(1)}
// //                     className="px-6 py-4 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
// //                   >
// //                     <ArrowLeft size={20} />
// //                   </button>
// //                   <button 
// //                     onClick={handlePlaceOrder}
// //                     disabled={loading}
// //                     className={`flex-1 py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm shadow-lg ${
// //                       paymentMethod === 'cod' 
// //                       ? 'bg-green-500 text-dark-900 hover:bg-green-400 hover:shadow-green-500/20' 
// //                       : 'bg-brand-glow text-dark-900 hover:bg-cyan-300 hover:shadow-brand-glow/20'
// //                     } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                   >
// //                     {loading ? <Loader2 className="animate-spin" /> : (paymentMethod === 'cod' ? 'Place COD Order' : `Pay $${total.toFixed(2)}`)}
// //                   </button>
// //                </div>
// //              )}
// //           </div>
// //         )}
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default CheckoutModal;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
//   ShieldCheck, Banknote, Calendar, AlertCircle, Phone, Mail, 
//   Edit2, ChevronRight, Lock , ArrowRight
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../client/supabaseClient';
// import { cartApi } from '../../api/cartApi';

// // --- HELPER: CALCULATE DELIVERY DATE ---
// const calculateDeliveryDate = (zipCode) => {
//   if (!zipCode || zipCode.length < 5) return null;
  
//   const today = new Date();
//   let daysToAdd = 5; // Standard Shipping

//   // Simulate Logic: East Coast (0xxxx-3xxxx) gets faster shipping
//   const zipPrefix = parseInt(zipCode.substring(0, 1));
//   if (!isNaN(zipPrefix) && zipPrefix <= 3) {
//     daysToAdd = 3;
//   }

//   const futureDate = new Date(today);
//   futureDate.setDate(today.getDate() + daysToAdd);

//   // If Sunday, move to Monday
//   if (futureDate.getDay() === 0) {
//     futureDate.setDate(futureDate.getDate() + 1);
//   }

//   return futureDate;
// };

// const CheckoutModal = ({ isOpen, onClose }) => {
//   const { user } = useAuth();
//   const { cartItems, refreshCart, deliveryConfig, getSubtotal } = useCart();
//   const navigate = useNavigate();

//   // --- FORM STATE ---
//   const [step, setStep] = useState(1); // 1: Address, 2: Payment
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
  
//   // Payment State
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

//   // Address State
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState('new');
//   const [saveAddress, setSaveAddress] = useState(false);
//   const [formData, setFormData] = useState({
//     street_address: '',
//     city: '',
//     state: '',
//     zip_code: '',
//     phone_number: '', 
//     email: user?.email || ''
//   });

//   // --- FINANCIALS ---
//   const subtotal = getSubtotal();
//   const shippingFee = subtotal >= (deliveryConfig?.min_order_value || 50) ? 0 : (deliveryConfig?.shipping_fee || 5.99);
//   const total = subtotal + shippingFee;

//   // --- INITIAL LOAD ---
//   useEffect(() => {
//     if (isOpen && user) {
//       const loadProfile = async () => {
//         const { data: profile } = await supabase
//           .from('profiles')
//           .select('phone_number, first_name, last_name')
//           .eq('id', user.id)
//           .single();
        
//         if (profile?.phone_number) {
//           setFormData(prev => ({ ...prev, phone_number: profile.phone_number }));
//         }
//       };

//       const loadAddresses = async () => {
//         const { data } = await supabase
//           .from('addresses')
//           .select('*')
//           .eq('user_id', user.id)
//           .order('is_default', { ascending: false }); 
        
//         if (data && data.length > 0) {
//           setSavedAddresses(data);
//           const defaultAddr = data.find(a => a.is_default) || data[0];
//           setSelectedAddressId(defaultAddr.id);
//           populateForm(defaultAddr);
//         } else {
//           setSelectedAddressId('new');
//         }
//       };

//       loadProfile();
//       loadAddresses();
//     }
//   }, [isOpen, user]);

//   const populateForm = (addr) => {
//     setFormData(prev => ({
//       ...prev,
//       street_address: addr.street_address,
//       city: addr.city,
//       state: addr.state,
//       zip_code: addr.zip_code
//     }));
//   };

//   const handleAddressSelection = (id) => {
//     setSelectedAddressId(id);
//     if (id === 'new') {
//       setFormData(prev => ({ ...prev, street_address: '', city: '', state: '', zip_code: '' }));
//     } else {
//       const addr = savedAddresses.find(a => a.id === id);
//       if (addr) populateForm(addr);
//     }
//   };

//   // --- VALIDATION ---
//   const validateStep1 = () => {
//     const { street_address, city, state, zip_code, phone_number } = formData;
    
//     if (!street_address || !city || !state || !zip_code || !phone_number) {
//       setError('Please fill in all required fields, including Phone Number.');
//       return false;
//     }
//     if (zip_code.length < 5) {
//       setError('Please enter a valid ZIP code.');
//       return false;
//     }
//     if (phone_number.length < 10) {
//       setError('Please enter a valid Phone Number.');
//       return false;
//     }
//     return true;
//   };

//   const handleNextStep = () => {
//     setError('');
//     if (validateStep1()) setStep(2);
//   };

//   // --- ORDER PLACEMENT ---
//   const handlePlaceOrder = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       if (!user) throw new Error("User session invalid.");
//       if (cartItems.length === 0) throw new Error("Your cart is empty.");

//       // 1. Stock Check
//       for (const item of cartItems) {
//         const { data: variant } = await supabase
//           .from('product_variants')
//           .select('stock_quantity, is_active')
//           .eq('id', item.variant_id)
//           .single();

//         if (!variant || !variant.is_active) {
//             throw new Error(`Item "${item.products?.name}" is no longer available.`);
//         }
//         if (variant.stock_quantity < item.quantity) {
//             throw new Error(`Insufficient stock for "${item.products?.name}". Available: ${variant.stock_quantity}`);
//         }
//       }

//       // 2. Save Address
//       let finalShippingAddress = { ...formData };
//       if (selectedAddressId === 'new' && saveAddress) {
//         await supabase.from('addresses').insert([{
//            user_id: user.id,
//            street_address: formData.street_address,
//            city: formData.city,
//            state: formData.state,
//            zip_code: formData.zip_code,
//            is_default: savedAddresses.length === 0 
//         }]);
//       }

//       // 3. Update Phone
//       if (formData.phone_number) {
//         await supabase.from('profiles')
//           .update({ phone_number: formData.phone_number })
//           .eq('id', user.id);
//       }

//       // 4. Create Order
//       const { data: order, error: orderError } = await supabase
//         .from('orders')
//         .insert([{
//           user_id: user.id,
//           total_amount: total,
//           status: 'pending',
//           payment_method: paymentMethod,
//           shipping_address: finalShippingAddress,
//           shipping_provider: 'Standard Shipping',
//           shipping_cost: shippingFee,
//           estimated_delivery_date: calculateDeliveryDate(formData.zip_code)
//         }])
//         .select()
//         .single();

//       if (orderError) throw orderError;

//       // 5. Create Order Items
//       const orderItemsPayload = cartItems.map(item => ({
//         order_id: order.id,
//         product_id: item.product_id,
//         variant_id: item.variant_id,
//         quantity: item.quantity,
//         price_at_purchase: item.product_variants.price,
//         item_name: item.products.name,
//         item_variant_label: item.product_variants?.variant_selection_map?.map(v => v.variant_options?.name).join(' / ') || item.flavor_name,
//         flavor_name: item.flavor_name
//       }));

//       const { error: itemsError } = await supabase.from('order_items').insert(orderItemsPayload);
//       if (itemsError) throw itemsError;

//       // 6. Record Payment
//       const { error: payError } = await supabase.from('payments').insert([{
//         order_id: order.id,
//         user_id: user.id,
//         amount: total,
//         provider: paymentMethod === 'card' ? 'stripe' : 'manual',
//         status: paymentMethod === 'card' ? 'succeeded' : 'pending',
//         provider_payment_id: paymentMethod === 'card' ? `ch_sim_${Date.now()}` : null
//       }]);
      
//       if (payError) throw payError;

//       // 7. Update Stock
//       for (const item of cartItems) {
//         const currentStock = item.product_variants.stock_quantity;
//         await supabase
//           .from('product_variants')
//           .update({ stock_quantity: Math.max(0, currentStock - item.quantity) })
//           .eq('id', item.variant_id);
//       }

//       // 8. Clear & Finish
//       await cartApi.clearCart(user.id);
//       if (refreshCart) refreshCart();
      
//       setSuccess(true);
//       setTimeout(() => {
//         onClose();
//         navigate('/account/orders');
//       }, 2500);

//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Transaction failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Heavy Blur Backdrop */}
//       <motion.div 
//         initial={{ opacity: 0 }} 
//         animate={{ opacity: 1 }} 
//         exit={{ opacity: 0 }}
//         onClick={onClose}
//         className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-all"
//       />

//       {/* Main Modal */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95, y: 20 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 20 }}
//         className="relative w-full max-w-xl bg-dark-900/90 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] backdrop-blur-md"
//       >
//         {/* Top Glow Accent */}
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-50" />

//         {/* HEADER */}
//         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md sticky top-0 z-20">
//           <div>
//             <h2 className="text-xl font-black text-white uppercase italic tracking-wider flex items-center gap-3">
//                {success ? (
//                  <>Order Confirmed <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> </>
//                ) : (
//                  <>Secure Checkout <span className="w-2 h-2 rounded-full bg-brand-glow animate-pulse"/> </>
//                )}
//             </h2>
//             {!success && (
//               <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
//                 <ShieldCheck size={12} className="text-brand-glow" /> 
//                 <span className="text-brand-glow">SSL Encrypted</span> • Trusted Payment Gateway
//               </div>
//             )}
//           </div>
//           <button onClick={onClose} disabled={loading} className="group p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all">
//             <X size={20} className="group-hover:rotate-90 transition-transform duration-300"/>
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 relative">
//           <AnimatePresence mode="wait">
            
//             {/* SUCCESS STATE */}
//             {success ? (
//                <motion.div 
//                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                  className="flex flex-col items-center justify-center h-full py-12 text-center"
//                >
//                   <div className="relative mb-8">
//                      <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full" />
//                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
//                         <Check size={48} className="text-dark-900 stroke-[4]" />
//                      </div>
//                   </div>
//                   <h3 className="text-3xl font-black text-white italic uppercase tracking-tight mb-3">Order Successful</h3>
//                   <p className="text-slate-400 max-w-xs mx-auto mb-8 text-sm leading-relaxed">
//                     Thank you for your purchase. A confirmation email has been sent to <span className="text-white font-bold">{formData.email}</span>.
//                   </p>
//                   <div className="flex items-center gap-3 text-xs text-brand-glow font-bold bg-brand-glow/10 px-6 py-3 rounded-full border border-brand-glow/20">
//                     <Loader2 size={14} className="animate-spin" /> Redirecting to your orders...
//                   </div>
//                </motion.div>
//             ) 
            
//             // STEP 1: ADDRESS & CONTACT
//             : step === 1 ? (
//               <motion.div 
//                 key="step1"
//                 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
//                 className="space-y-8"
//               >
//                  {/* Address Selector Carousel */}
//                  {savedAddresses.length > 0 && (
//                    <div className="space-y-3">
//                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                         <MapPin size={12} /> Saved Addresses
//                      </label>
//                      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar -mx-2 px-2">
//                         {savedAddresses.map(addr => (
//                           <button
//                             key={addr.id}
//                             onClick={() => handleAddressSelection(addr.id)}
//                             className={`relative flex-shrink-0 p-4 rounded-2xl border text-left min-w-[160px] transition-all duration-300 group ${
//                               selectedAddressId === addr.id 
//                               ? 'bg-brand-glow/10 border-brand-glow shadow-[0_0_20px_rgba(34,211,238,0.1)] ring-1 ring-brand-glow' 
//                               : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20'
//                             }`}
//                           >
//                             <div className={`flex items-center gap-2 mb-2 font-bold text-sm ${selectedAddressId === addr.id ? 'text-white' : 'text-slate-300'}`}>
//                               <span className="truncate">{addr.city}</span>
//                               {selectedAddressId === addr.id && <Check size={14} className="text-brand-glow ml-auto" />}
//                             </div>
//                             <p className="text-[11px] opacity-70 truncate leading-relaxed">{addr.street_address}</p>
//                             <p className="text-[11px] opacity-70">{addr.zip_code}</p>
//                           </button>
//                         ))}
//                         <button
//                           onClick={() => handleAddressSelection('new')}
//                           className={`flex-shrink-0 p-4 rounded-2xl border border-dashed text-left min-w-[140px] flex flex-col items-center justify-center gap-2 transition-all group ${
//                             selectedAddressId === 'new'
//                             ? 'bg-brand-glow/5 border-brand-glow text-white'
//                             : 'bg-transparent border-white/20 text-slate-500 hover:border-white/40 hover:text-slate-300'
//                           }`}
//                         >
//                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
//                               <Plus size={16} /> 
//                            </div>
//                            <span className="text-xs font-bold">Add New</span>
//                         </button>
//                      </div>
//                    </div>
//                  )}

//                  {/* Form Fields */}
//                  <div className="space-y-5">
//                     <div className="flex justify-between items-center">
//                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                           <Edit2 size={12} /> Shipping Details
//                        </label>
//                        {selectedAddressId !== 'new' && (
//                          <span className="text-[10px] text-brand-glow font-bold bg-brand-glow/10 px-2 py-1 rounded">
//                            Autofilled from saved
//                          </span>
//                        )}
//                     </div>
                    
//                     <div className="group relative">
//                       <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors" size={18} />
//                       <input 
//                         name="street_address" 
//                         placeholder="Street Address" 
//                         value={formData.street_address}
//                         onChange={(e) => { setFormData({...formData, street_address: e.target.value}); setError(''); }}
//                         className="w-full bg-dark-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                       />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                        <input 
//                           name="city" 
//                           placeholder="City" 
//                           value={formData.city}
//                           onChange={(e) => setFormData({...formData, city: e.target.value})}
//                           className="w-full bg-dark-950/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                        />
//                        <input 
//                           name="state" 
//                           placeholder="State" 
//                           value={formData.state}
//                           onChange={(e) => setFormData({...formData, state: e.target.value})}
//                           className="w-full bg-dark-950/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                        />
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-4">
//                        <input 
//                           name="zip_code" 
//                           placeholder="ZIP Code" 
//                           value={formData.zip_code}
//                           onChange={(e) => setFormData({...formData, zip_code: e.target.value})}
//                           maxLength={5}
//                           className="w-full bg-dark-950/50 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                        />
//                        <div className="relative group">
//                           <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors" />
//                           <input 
//                               name="phone_number" 
//                               placeholder="Phone Number" 
//                               value={formData.phone_number}
//                               onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
//                               className="w-full bg-dark-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                           />
//                        </div>
//                     </div>

//                     <div className="relative group">
//                         <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
//                         <input 
//                             value={formData.email} 
//                             readOnly 
//                             className="w-full bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-slate-400 cursor-not-allowed"
//                         />
//                         <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" />
//                     </div>

//                     {/* New Address Save Toggle */}
//                     {selectedAddressId === 'new' && (
//                       <div 
//                         className="flex items-center gap-3 pt-2 cursor-pointer group" 
//                         onClick={() => setSaveAddress(!saveAddress)}
//                       >
//                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${saveAddress ? 'bg-brand-glow border-brand-glow' : 'border-white/20 bg-white/5 group-hover:border-white/40'}`}>
//                             {saveAddress && <Check size={14} className="text-dark-900" />}
//                          </div>
//                          <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Save this address to my profile</span>
//                       </div>
//                     )}

//                     {/* Delivery Estimate Badge */}
//                     <AnimatePresence>
//                       {formData.zip_code.length >= 5 && (
//                         <motion.div 
//                           initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
//                           className="bg-brand-glow/5 border border-brand-glow/10 p-4 rounded-2xl flex items-center gap-3 text-brand-glow"
//                         >
//                             <div className="w-10 h-10 rounded-full bg-brand-glow/10 flex items-center justify-center shrink-0">
//                                 <Calendar size={18} />
//                             </div>
//                             <div>
//                                 <p className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-0.5">Estimated Arrival</p>
//                                 <p className="text-sm font-bold">{calculateDeliveryDate(formData.zip_code)?.toDateString()}</p>
//                             </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                  </div>
//               </motion.div>
//             ) 
            
//             // STEP 2: REVIEW & PAYMENT
//             : (
//               <motion.div 
//                 key="step2"
//                 initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
//                 className="space-y-8"
//               >
//                  {/* Order Summary Card */}
//                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
//                     <div className="absolute top-0 right-0 w-32 h-32 bg-brand-glow/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-brand-glow/10 transition-colors" />
                    
//                     <div className="flex justify-between items-start mb-4 relative z-10">
//                        <div>
//                           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Total to Pay</p>
//                           <p className="text-3xl font-mono font-black text-white flex items-start gap-1">
//                              <span className="text-lg mt-1 text-slate-400">$</span>{total.toFixed(2)}
//                           </p>
//                        </div>
//                        <div className="text-right">
//                           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Ship To</p>
//                           <p className="text-sm text-white font-bold">{formData.city}, {formData.zip_code}</p>
//                           <p className="text-[11px] text-slate-400">{formData.phone_number}</p>
//                        </div>
//                     </div>
                    
//                     <div className="h-px bg-white/10 w-full mb-4" />
//                     <div className="flex gap-2 text-[11px] text-slate-400">
//                        <ShieldCheck size={14} className="text-emerald-400" /> 
//                        Verified by 7-OH Secure Payments
//                     </div>
//                  </div>

//                  {/* Payment Methods */}
//                  <div className="space-y-4">
//                     <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
//                        <CreditCard size={12} /> Payment Method
//                     </label>
                    
//                     <button 
//                        onClick={() => setPaymentMethod('card')}
//                        className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 group ${
//                          paymentMethod === 'card' 
//                          ? 'bg-brand-glow/5 border-brand-glow shadow-lg shadow-brand-glow/5' 
//                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
//                        }`}
//                     >
//                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900' : 'bg-dark-900 text-slate-400 group-hover:text-white'}`}>
//                           <CreditCard size={22} />
//                        </div>
//                        <div className="text-left flex-1">
//                           <p className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-slate-300'}`}>Credit / Debit Card</p>
//                           <p className="text-[11px] text-slate-500">Secure simulated processing</p>
//                        </div>
//                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-glow bg-brand-glow' : 'border-white/20'}`}>
//                           {paymentMethod === 'card' && <Check size={12} className="text-dark-900" />}
//                        </div>
//                     </button>

//                     <AnimatePresence>
//                       {paymentMethod === 'card' && (
//                         <motion.div 
//                           initial={{ height: 0, opacity: 0 }} 
//                           animate={{ height: 'auto', opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="overflow-hidden"
//                         >
//                           <div className="p-5 bg-dark-950/50 border border-white/10 rounded-2xl space-y-4 mb-2">
//                              <div className="space-y-1">
//                                 <label className="text-[10px] uppercase font-bold text-slate-500">Card Number</label>
//                                 <div className="relative">
//                                     <input 
//                                       placeholder="0000 0000 0000 0000" 
//                                       maxLength={19}
//                                       className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm font-mono placeholder:text-slate-700 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                                     />
//                                     <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
//                                 </div>
//                              </div>
//                              <div className="flex gap-4">
//                                 <div className="space-y-1 w-1/2">
//                                   <label className="text-[10px] uppercase font-bold text-slate-500">Expiry</label>
//                                   <input 
//                                     placeholder="MM/YY" 
//                                     maxLength={5}
//                                     className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono placeholder:text-slate-700 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                                   />
//                                 </div>
//                                 <div className="space-y-1 w-1/2">
//                                   <label className="text-[10px] uppercase font-bold text-slate-500">CVC</label>
//                                   <input 
//                                     placeholder="123" 
//                                     maxLength={3}
//                                     type="password"
//                                     className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono placeholder:text-slate-700 focus:border-brand-glow focus:ring-1 focus:ring-brand-glow outline-none transition-all"
//                                   />
//                                 </div>
//                              </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     <button 
//                        onClick={() => setPaymentMethod('cod')}
//                        className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all duration-300 group ${
//                          paymentMethod === 'cod' 
//                          ? 'bg-green-500/10 border-green-500 shadow-lg shadow-green-500/10' 
//                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
//                        }`}
//                     >
//                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900' : 'bg-dark-900 text-slate-400 group-hover:text-white'}`}>
//                           <Banknote size={22} />
//                        </div>
//                        <div className="text-left flex-1">
//                           <p className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-slate-300'}`}>Cash on Delivery</p>
//                           <p className="text-[11px] text-slate-500">Pay physically upon receipt</p>
//                        </div>
//                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-white/20'}`}>
//                           {paymentMethod === 'cod' && <Check size={12} className="text-dark-900" />}
//                        </div>
//                     </button>
//                  </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Error Message */}
//           <AnimatePresence>
//             {error && (
//               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-200 text-xs font-bold shadow-lg">
//                 <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-400" />
//                 <span>{error}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//         </div>

//         {/* FOOTER ACTION BAR */}
//         {!success && (
//           <div className="p-6 border-t border-white/5 bg-white/5 backdrop-blur-md sticky bottom-0 z-20">
//              {step === 1 ? (
//                <button 
//                  onClick={handleNextStep}
//                  className="w-full py-4 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-brand-glow/30"
//                >
//                  Continue <ArrowRight size={18} />
//                </button>
//              ) : (
//                <div className="flex gap-3">
//                   <button 
//                     onClick={() => setStep(1)}
//                     className="px-6 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors border border-white/5"
//                   >
//                     <ArrowLeft size={20} />
//                   </button>
//                   <button 
//                     onClick={handlePlaceOrder}
//                     disabled={loading}
//                     className={`flex-1 py-4 font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-lg ${
//                       paymentMethod === 'cod' 
//                       ? 'bg-green-500 text-dark-900 hover:bg-green-400 shadow-green-500/20' 
//                       : 'bg-brand-glow text-dark-900 hover:bg-cyan-300 shadow-brand-glow/20'
//                     } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
//                   >
//                     {loading ? <Loader2 className="animate-spin" /> : (paymentMethod === 'cod' ? 'Confirm COD Order' : `Pay $${total.toFixed(2)}`)}
//                   </button>
//                </div>
//              )}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ShoppingBag, ArrowRight, Truck, Trash2, Plus, Minus, 
//   AlertTriangle, XCircle, AlertCircle 
// } from 'lucide-react';
// import CheckoutModal from '../components/checkout/CheckoutModal';
// import { useCart } from '../context/CartContext';

// const EmptyCartView = () => (
//   <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 pt-32 pb-20">
//     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/10 animate-pulse">
//       <ShoppingBag size={40} className="text-slate-500" />
//     </div>
//     <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your cart is empty</h2>
//     <p className="text-slate-400 text-lg mb-10 max-w-md text-center leading-relaxed">
//       Looks like you haven't added anything yet. Explore our collection to find your edge.
//     </p>
//     <Link 
//       to="/shop" 
//       className="group px-8 py-4 bg-brand-glow text-dark-900 font-bold rounded-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
//     >
//       START SHOPPING
//     </Link>
//   </div>
// );

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity, cartLoading } = useCart();
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

//   // --- CART CALCULATIONS ---
  
//   // 1. Identify issues with items
//   const analyzedItems = cartItems.map(item => {
//     const product = item.products;
//     const variant = item.product_variants;
    
//     // Status Flags
//     const isHardDeleted = !product || !variant; // Data missing in DB
//     const isArchived = (product && !product.is_active) || (variant && !variant.is_active); // Soft deleted
//     const stock = variant?.stock_quantity || 0;
//     const isOutOfStock = !isHardDeleted && !isArchived && stock <= 0;
//     const isInsufficientStock = !isHardDeleted && !isArchived && !isOutOfStock && item.quantity > stock;

//     // A "Blocking" issue prevents checkout
//     const isBlocking = isHardDeleted || isArchived || isOutOfStock;

//     return {
//       ...item,
//       stock,
//       isHardDeleted,
//       isArchived,
//       isOutOfStock,
//       isInsufficientStock,
//       isBlocking
//     };
//   });

//   console.log(analyzedItems);
//   const hasBlockingIssues = analyzedItems.some(i => i.isBlocking);

  
//   // 2. Financials (Only count valid, non-blocking items)
//   const subtotal = analyzedItems.reduce((acc, item) => {
//     if (item.isBlocking) return acc; // Don't charge for unavailable items
//     return acc + (Number(item.product_variants?.price || 0) * item.quantity);
//   }, 0);

//   const shipping = subtotal > 50 ? 0 : 5.99;
//   const total = subtotal + shipping;

//   if (cartLoading) {
//     return (
//       <div className="min-h-screen pt-32 flex items-center justify-center bg-dark-900">
//         <div className="animate-spin w-8 h-8 border-2 border-brand-glow border-t-transparent rounded-full"/>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) return <EmptyCartView />;

//   return (
//     <div className="min-h-screen pt-32 pb-20 bg-dark-900 relative">
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
//         {/* LEFT COLUMN: Cart Items */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="flex items-center justify-between mb-4">
//             <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter">Your Cart</h1>
//             <span className="text-slate-400 font-mono text-sm">{cartItems.length} ITEMS</span>
//           </div>

//           <AnimatePresence mode="popLayout">
//             {analyzedItems.map((item) => {
//                // Safe Data Access
//                const product = item.products || {};
//                const variant = item.product_variants || {};
//                const variantName = variant.variant_selection_map
//                  ?.map(v => v.variant_options?.name)
//                  .join(' / ') || item.flavor_name || 'Standard';

//                return (
//                 <motion.div 
//                   key={item.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, x: -100 }}
//                   className={`relative flex gap-6 p-4 rounded-2xl border transition-all ${
//                     item.isBlocking 
//                       ? 'bg-red-900/10 border-red-500/20 opacity-80' 
//                       : 'bg-white/5 border-white/10 hover:border-white/20'
//                   }`}
//                 >
//                   {/* Image */}
//                   <div className="w-24 h-24 rounded-xl bg-dark-950 border border-white/5 overflow-hidden shrink-0 relative">
//                     {product.slug && !item.isHardDeleted ? (
//                       <Link to={`/product/${product.slug}`}>
//                         <img 
//                           src={product.image_color ? "https://via.placeholder.com/150/1a1a1a/ffffff?text=" + product.name.substring(0,3) : "https://via.placeholder.com/150"} 
//                           alt={product.name} 
//                           className={`w-full h-full object-cover ${item.isBlocking ? 'grayscale opacity-50' : ''}`} 
//                         />
//                       </Link>
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-slate-700">
//                         <ShoppingBag size={24} />
//                       </div>
//                     )}
                    
//                     {/* Status Overlays */}
//                     {item.isOutOfStock && (
//                       <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                          <span className="text-[10px] font-bold text-red-400 uppercase text-center px-1">Out of Stock</span>
//                       </div>
//                     )}
//                     {item.isArchived && (
//                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
//                           <span className="text-[10px] font-bold text-slate-400 uppercase text-center px-1">Discontinued</span>
//                        </div>
//                     )}
//                   </div>

//                   {/* Details */}
//                   <div className="flex-1 flex flex-col justify-between">
//                     <div>
//                       <div className="flex justify-between items-start">
//                         <div>
//                            <h3 className={`font-bold text-lg leading-tight ${item.isBlocking ? 'text-slate-500 line-through' : 'text-white'}`}>
//                               {product.name || 'Unknown Product'}
//                            </h3>
//                            <p className="text-sm text-slate-400 mt-1">{variantName}</p>
//                         </div>
//                         <p className={`font-mono font-bold ${item.isBlocking ? 'text-slate-600' : 'text-brand-glow'}`}>
//                            ${(Number(variant.price || 0) * item.quantity).toFixed(2)}
//                         </p>
//                       </div>

//                       {/* Error Messages */}
//                       {item.isBlocking ? (
//                         <div className="mt-2 flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 p-2 rounded-lg self-start inline-flex">
//                           <XCircle size={14} />
//                           {item.isHardDeleted ? "Item removed from store" :
//                            item.isArchived ? "Product no longer available" : 
//                            "Currently Out of Stock"}
//                         </div>
//                       ) : item.isInsufficientStock ? (
//                         <div className="mt-2 flex items-center gap-2 text-orange-400 text-xs font-bold">
//                            <AlertCircle size={14} />
//                            Only {item.stock} left in stock!
//                         </div>
//                       ) : null}
//                     </div>

//                     <div className="flex justify-between items-end mt-4">
//                       {/* Quantity Controls */}
//                       <div className="flex items-center bg-dark-950 rounded-lg border border-white/10 h-10">
//                         <button 
//                           onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
//                           disabled={item.isBlocking || item.quantity <= 1}
//                           className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
//                         >
//                           <Minus size={14}/>
//                         </button>
//                         <span className={`w-8 text-center text-sm font-bold ${item.isBlocking ? 'text-slate-600' : 'text-white'}`}>
//                           {item.quantity}
//                         </span>
//                         <button 
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           disabled={item.isBlocking || item.quantity >= item.stock}
//                           className="w-10 h-full flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
//                         >
//                           <Plus size={14}/>
//                         </button>
//                       </div>

//                       <button 
//                         onClick={() => removeFromCart(item.id)}
//                         className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
//                         title="Remove Item"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>

//         {/* RIGHT COLUMN: Summary */}
//         <aside className="lg:col-span-1">
//             <div className="sticky top-32 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
//                 <h2 className="text-xl font-black text-white uppercase italic tracking-wider mb-6">Order Summary</h2>
                
//                 <div className="space-y-4 mb-8">
//                     <div className="flex justify-between text-slate-400 text-sm">
//                         <span>Subtotal</span>
//                         <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex justify-between text-slate-400 text-sm">
//                         <span>Shipping</span>
//                         <span className="text-white font-mono">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
//                     </div>
//                     {shipping === 0 && (
//                       <div className="text-xs text-emerald-400 flex items-center gap-1">
//                         <Truck size={12} /> Free shipping applied
//                       </div>
//                     )}
//                     <div className="h-px bg-white/10 my-4" />
//                     <div className="flex justify-between items-end">
//                       <span className="text-white font-bold text-lg uppercase">Total</span>
//                       <div className="text-right">
//                         <span className="text-xs text-slate-500 block mb-1">USD</span>
//                         <div className="text-3xl font-black text-brand-glow font-mono tracking-tight flex items-start gap-1">
//                           <span className="text-lg mt-1">$</span>
//                           <span>{total.toFixed(2)}</span>
//                         </div>
//                       </div>
//                     </div>
//                 </div>

//                 {hasBlockingIssues && (
//                   <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
//                     <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
//                     <div className="text-xs text-red-200">
//                       <p className="font-bold mb-1">Checkout Unavailable</p>
//                       Some items in your cart are out of stock or no longer available. Please remove them to proceed.
//                     </div>
//                   </div>
//                 )}

//                 <button 
//                     onClick={() => setIsCheckoutOpen(true)}
//                     disabled={hasBlockingIssues}
//                     className={`w-full py-5 font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm tracking-widest shadow-[0_10px_30px_rgba(255,255,255,0.05)] group transition-all ${
//                       hasBlockingIssues 
//                       ? 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
//                       : 'bg-white text-dark-900 hover:bg-brand-glow hover:scale-[1.02] active:scale-95'
//                     }`}
//                 >
//                     CHECKOUT NOW <ArrowRight size={20} className={hasBlockingIssues ? '' : 'group-hover:translate-x-1 transition-transform'}/>
//                 </button>

//                 <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">SSL</span>
//                   </div>
//                   <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
//                     <span className="text-[10px] font-black">24/7</span>
//                   </div>
//                 </div>
//             </div>
//         </aside>
//       </div>

//       <CheckoutModal 
//         isOpen={isCheckoutOpen} 
//         onClose={() => setIsCheckoutOpen(false)} 
//         total={total}
//       />
//     </div>
//   );
// };

// export default Cart;

// import { supabase } from '../client/supabaseClient';

// export const cartApi = {
//   // 1. Fetch Cart with deep nested attributes
//   fetchCart: async (userId) => {
//     const { data, error } = await supabase
//       .from('cart_items')
//       .select(`
//         *,
//         products (id, name, slug, image_color),
//         product_variants (
//           id, price, stock_quantity, is_active,
//           variant_selection_map (
//             variant_options (
//               name,
//               type:variant_types(name) 
//             )
//           )
//         )
//       `)
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) {
//       console.error("Fetch Cart Error:", error);
//       return [];
//     }
//     return data || [];
//   },
// addToCart: async (userId, productId, variantId, flavorName, quantity) => {
//     // Check if item exists
//     const { data: existing } = await supabase
//       .from('cart_items')
//       .select('id, quantity')
//       .eq('user_id', userId)
//       .eq('variant_id', variantId) // Variant ID is the specific SKU
//       .maybeSingle();

//     if (existing) {
//       // Update
//       return await supabase.from('cart_items')
//         .update({ quantity: existing.quantity + quantity })
//         .eq('id', existing.id);
//     } else {
//       // Insert
//       return await supabase.from('cart_items')
//         .insert({
//           user_id: userId,
//           product_id: productId,
//           variant_id: variantId,
//           // FIX: Send 'Standard' if flavor is missing/null to satisfy DB constraints
//           flavor_name: flavorName || 'Standard', 
//           quantity: quantity
//         });
//     }
//   },

//   updateQuantity: async (itemId, quantity) => {
//     await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
//   },

//   removeItem: async (itemId) => {
//     await supabase.from('cart_items').delete().eq('id', itemId);
//   },

//   clearCart: async (userId) => {
//     await supabase.from('cart_items').delete().eq('user_id', userId);
//   },

//   getDeliveryConfig: async () => {
//     const { data } = await supabase.from('delivery_configs').select('*').eq('is_active', true).maybeSingle();
//     return data;
//   }
// };

// import { supabase } from '../client/supabaseClient';

// /**
//  * Fetches all products including their category name and variants for the shop page
//  */
// export const getAllProducts = async () => {
//   const { data, error } = await supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(name),
//       product_variants (
//         price
//       )
//     `);

//   if (error) throw error;

//   // Since a product has multiple variants (1-pack, 4-pack), 
//   // we'll use the lowest variant price as the "Starting At" price for the shop grid.
//   return data.map(product => {
//     const prices = product.product_variants.map(v => v.price);
//     return {
//       ...product,
//       categoryName: product.category?.name || 'Uncategorized',
//       displayPrice: prices.length > 0 ? Math.min(...prices) : 'TBD'
//     };
//   });
// };

// /**
//  * Fetches the list of active categories for the filter bar
//  */
// export const getCategories = async () => {
//   const { data, error } = await supabase
//     .from('categories')
//     .select('name');
  
//   if (error) throw error;
//   return ['All', ...data.map(c => c.name)];
// };

// // // import React from 'react';
// // // import { Link } from 'react-router-dom';
// // // import { ArrowRight } from 'lucide-react';

// // // // Components
// // // import SmokeBackground from '../components/ui/SmokeBackground';
// // // import SmokeSeparator from '../components/ui/SmokeSeparator';
// // // import Hero from '../components/home/Hero';
// // // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // // import Essence from '../components/home/Essence';
// // // import Process from '../components/home/Process';
// // // import ScrollingTestimonials from '../components/home/ScrollingTestimonials';

// // // // Dynamic API Component
// // // // import { FeaturedProtocol } from '../components/home/ProductCard';
// // // import { FeaturedProducts } from '../components/home/ProductCard';
// // // const Home = () => {
// // //   return (
// // //     <div className="relative bg-dark-950">
      
// // //       {/* 1. Global Atmospheric Background */}
// // //       <SmokeBackground /> 
      
// // //       {/* 2. Hero Section */}
// // //       <div className="relative z-10 mb-10">
// // //         <Hero />
// // //       </div>

// // //       {/* 3. Infinite Banner (Blue Strip) */}
// // //       <InfiniteBanner />

// // //       {/* 4. Advanced Featured Protocol (Infinite Scroll) */}
// // //       <div className="relative z-10">
// // //         <SmokeSeparator />
// // //         {/* This component handles its own Supabase fetching internally */}
// // //         <FeaturedProducts />
// // //       </div>

// // //       {/* 5. Collection Header & Call to Action */}
// // //       <div className="relative z-10 py-20 px-6 max-w-7xl mx-auto">
// // //         <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 border border-white/10 rounded-[3rem] p-12 gap-8">
// // //             <div className="text-center md:text-left">
// // //               <h2 className="text-3xl md:text-5xl font-black text-white mb-4 italic tracking-tighter uppercase">The Full Catalog</h2>
// // //               <p className="text-slate-400 max-w-md text-lg font-medium leading-relaxed">
// // //                   Precision engineered alkaloids for the advanced researcher. 
// // //                   Experience the next evolution of potency.
// // //               </p>
// // //             </div>
            
// // //             <Link 
// // //               to="/shop" 
// // //               className="group flex items-center justify-center gap-3 bg-brand-glow text-dark-900 px-10 py-5 rounded-2xl font-black tracking-widest text-sm hover:scale-105 transition-all shadow-[0_10px_30px_rgba(var(--brand-glow-rgb),0.3)]"
// // //             >
// // //                 SHOP ALL PRODUCTS <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
// // //             </Link>
// // //         </div>
// // //       </div>

// // //       {/* 6. Science Section */}
// // //       <div className="relative z-10 bg-black/30 backdrop-blur-sm">
// // //         <SmokeSeparator />
// // //         <Essence />
// // //       </div>

// // //       {/* 7. Process Section */}
// // //       <div className="relative z-10">
// // //          <SmokeSeparator />
// // //          <Process />
// // //       </div>

// // //       {/* 8. Reviews */}
// // //       <ScrollingTestimonials />

// // //     </div>
// // //   );
// // // };

// // // export default Home;
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { ArrowRight, Sparkles, Zap, Activity } from 'lucide-react';

// // // Components
// // import Hero from '../components/home/Hero';
// // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // import Essence from '../components/home/Essence';
// // import Process from '../components/home/Process';
// // import ScrollingTestimonials from '../components/home/ScrollingTestimonials';

// // // FIX: Default import (no curly braces)
// // // Ensure this path points to where you saved ProductCard.jsx
// // import FeaturedProducts from '../components/home/ProductCard'; 

// // const Home = () => {
// //   return (
// //     <div className="relative min-h-screen bg-dark-950 overflow-hidden selection:bg-brand-glow selection:text-dark-900">
      
// //       {/* ------------------------------------------------------- */}
// //       {/* 1. NEW DYNAMIC BACKGROUND (The "Living Lab" Effect)     */}
// //       {/* ------------------------------------------------------- */}
// //       <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
// //          {/* Deep Ambient Base */}
// //          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-dark-900 via-dark-950 to-black" />
         
// //          {/* Animated Color Orbs */}
// //          <motion.div 
// //            animate={{ 
// //              x: [0, 100, -100, 0], 
// //              y: [0, -50, 50, 0],
// //              scale: [1, 1.2, 1],
// //            }}
// //            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //            className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-glow/10 rounded-full blur-[120px] mix-blend-screen"
// //          />
// //          <motion.div 
// //            animate={{ 
// //              x: [0, -100, 100, 0], 
// //              y: [0, 100, -50, 0],
// //              scale: [1, 1.3, 1],
// //            }}
// //            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
// //            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] mix-blend-screen"
// //          />
         
// //          {/* Grid Overlay */}
// //          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
// //       </div>

// //       {/* ------------------------------------------------------- */}
// //       {/* 2. CONTENT SECTIONS                                     */}
// //       {/* ------------------------------------------------------- */}
// //       <div className="relative z-10 flex flex-col gap-24 pb-24">
        
// //         {/* HERO */}
// //         <div className="pt-10">
// //           <Hero />
// //         </div>

// //         {/* BANNER STRIP */}
// //         <div className="border-y border-white/5 bg-dark-900/50 backdrop-blur-sm">
// //           <InfiniteBanner />
// //         </div>

// //         {/* FEATURED PROTOCOLS */}
// //         <div className="relative">
// //           {/* Section Glow */}
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-r from-transparent via-brand-glow/5 to-transparent blur-3xl -z-10" />
// //           <FeaturedProducts />
// //         </div>

// //         {/* CTA CARD: "THE FULL CATALOG" */}
// //         <div className="px-6 max-w-7xl mx-auto w-full">
// //           <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-dark-800/50 backdrop-blur-xl"
// //           >
// //             {/* Hover Gradient Effect */}
// //             <div className="absolute inset-0 bg-gradient-to-r from-brand-glow/20 via-purple-500/20 to-brand-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
            
// //             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-20 gap-10">
// //               <div className="text-center md:text-left space-y-6">
// //                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-brand-glow text-xs font-bold uppercase tracking-widest">
// //                     <Zap size={14} fill="currentColor" /> Ready to Ship
// //                  </div>
// //                  <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
// //                     Unlock Your <br/>
// //                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-white">Full Potential</span>
// //                  </h2>
// //                  <p className="text-slate-400 max-w-lg text-lg leading-relaxed">
// //                     Access our complete library of engineered alkaloids. Each formulation is rigorous tested for purity and potency.
// //                  </p>
// //               </div>

// //               <Link 
// //                 to="/shop" 
// //                 className="relative group/btn overflow-hidden rounded-2xl bg-white px-10 py-6 text-dark-900 font-black tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
// //               >
// //                  <span className="relative z-10 flex items-center gap-3">
// //                    EXPLORE CATALOG <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform"/>
// //                  </span>
// //                  <div className="absolute inset-0 bg-gradient-to-r from-brand-glow to-cyan-300 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
// //               </Link>
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* ESSENCE (Science) */}
// //         <div className="relative">
// //            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/50 to-transparent -z-10" />
// //            <Essence />
// //         </div>

// //         {/* PROCESS */}
// //         <div className="relative">
// //            <Process />
// //         </div>

// //         {/* TESTIMONIALS */}
// //         <div className="pb-10">
// //            <ScrollingTestimonials />
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default Home;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { ArrowRight, Zap, Play, Beaker, Hexagon } from 'lucide-react';

// // Components
// import Hero from '../components/home/Hero';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import ScrollingTestimonials from '../components/home/ScrollingTestimonials';

// // Correct Import for the Featured Section
// import FeaturedProducts from '../components/home/ProductCard'; 

// /**
//  * INTERNAL COMPONENT: Digital Smoke Layer
//  * Creates a drifting, gaseous effect using code-generated gradients.
//  */
// const SmokeLayer = () => {
//   return (
//     <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
//       {/* Dark Base */}
//       <div className="absolute inset-0 bg-dark-950" />
      
//       {/* Smoke Plume 1 (Cyan/Teal) */}
//       <motion.div 
//         animate={{ 
//           x: [-100, 100, -100], 
//           y: [-50, 50, -50],
//           opacity: [0.3, 0.5, 0.3],
//           scale: [1, 1.2, 1]
//         }}
//         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-gradient-to-br from-brand-glow/10 to-transparent rounded-full blur-[150px] mix-blend-screen"
//       />

//       {/* Smoke Plume 2 (Purple/Indigo) */}
//       <motion.div 
//         animate={{ 
//           x: [100, -100, 100], 
//           y: [50, -50, 50],
//           opacity: [0.2, 0.4, 0.2],
//           scale: [1.2, 1, 1.2]
//         }}
//         transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
//         className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-gradient-to-tl from-purple-900/20 to-transparent rounded-full blur-[150px] mix-blend-screen"
//       />

//       {/* Noise Texture for "Crispness" */}
//       <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
//     </div>
//   );
// };

// const Home = () => {
//   const { scrollYProgress } = useScroll();
//   const y = useTransform(scrollYProgress, [0, 1], [0, -100]); // Parallax effect

//   return (
//     <div className="relative min-h-screen bg-dark-950 overflow-hidden selection:bg-brand-glow selection:text-dark-900">
      
//       {/* 1. ATMOSPHERIC BACKGROUND */}
//       <SmokeLayer />

//       {/* 2. MAIN CONTENT WRAPPER */}
//       <div className="relative z-10 flex flex-col gap-0">
        
//         {/* HERO SECTION */}
//         <section className="relative pt-10 pb-20">
//           <Hero />
          
//           {/* Scroll Indicator */}
//           <motion.div 
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
//             className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-glow/50"
//           >
//             <span className="text-[10px] uppercase tracking-[0.3em]">Scroll to Explore</span>
//             <motion.div 
//               animate={{ y: [0, 10, 0] }} 
//               transition={{ duration: 2, repeat: Infinity }}
//               className="w-px h-12 bg-gradient-to-b from-brand-glow/0 via-brand-glow to-brand-glow/0" 
//             />
//           </motion.div>
//         </section>

//         {/* INFINITE BANNER (Tech Strip) */}
//         <div className="border-y border-white/10 bg-dark-900/40 backdrop-blur-md relative z-20">
//           <InfiniteBanner />
//         </div>

//         {/* FEATURED PROTOCOLS (Parallax Container) */}
//         <section className="relative py-24">
//            {/* Section Header */}
//            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
//               <Hexagon size={400} strokeWidth={0.5} className="text-white" />
//            </div>
           
//            <FeaturedProducts />
//         </section>

//         {/* FULL CATALOG CTA (Glass Card) */}
//         <section className="py-20 px-6">
//           <div className="max-w-7xl mx-auto">
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true, margin: "-100px" }}
//               transition={{ duration: 0.8, ease: "easeOut" }}
//               className="relative group overflow-hidden rounded-[3rem] border border-white/10 bg-dark-800/40 backdrop-blur-2xl"
//             >
//               {/* Dynamic Border Glow */}
//               <div className="absolute inset-0 bg-gradient-to-r from-brand-glow/0 via-brand-glow/30 to-brand-glow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
//               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-12 md:p-24 gap-12">
//                 <div className="space-y-6 max-w-2xl">
//                    <div className="inline-flex items-center gap-3 text-brand-glow">
//                       <span className="relative flex h-3 w-3">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-glow opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-glow"></span>
//                       </span>
//                       <span className="text-xs font-bold uppercase tracking-[0.2em]">Lab Access Open</span>
//                    </div>
                   
//                    <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.9]">
//                       The Complete <br/>
//                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">Formulary</span>
//                    </h2>
                   
//                    <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
//                       Access our full library of engineered alkaloids. Each protocol is rigorously tested for bioavailability, potency, and cognitive impact.
//                    </p>
//                 </div>

//                 <Link 
//                   to="/shop" 
//                   className="group/btn relative overflow-hidden rounded-full bg-white px-12 py-6 text-dark-900 font-black tracking-widest text-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
//                 >
//                    <span className="relative z-10 flex items-center gap-4">
//                      ENTER SHOP <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform"/>
//                    </span>
//                    {/* Button Hover Effect */}
//                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-brand-glow opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ESSENCE (Science Section) */}
//         <div className="relative z-10">
//            {/* Visual Divider */}
//            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//            <Essence />
//         </div>

//         {/* PROCESS */}
//         <div className="relative z-10 bg-black/20 backdrop-blur-sm">
//            <Process />
//         </div>

//         {/* REVIEWS */}
//         <div className="pb-12 pt-12">
//            <ScrollingTestimonials />
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Home;
// // import React from 'react';
// // import { motion } from 'framer-motion';

// // const Hero = () => {
// //   return (
// //     <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      
// //       {/* Background Smoke Simulation */}
// //       <div className="absolute inset-0 z-0 pointer-events-none">
// //         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-glow/10 rounded-full blur-[100px] animate-pulse-slow"></div>
// //         <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[120px]"></div>
// //       </div>

// //       <div className="z-10 text-center max-w-4xl px-4 mb-12">
// //         <motion.h1 
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="text-5xl md:text-7xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 mb-6 leading-tight"
// //         >
// //           Elevate Your Experience.<br />
// //           Pure. Precise. Cloud7.
// //         </motion.h1>
        
// //         <motion.p 
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 0.2 }}
// //           className="text-slate-400 text-lg max-w-xl mx-auto"
// //         >
// //           Our premium product is engineered at our octacore product and environment airborne commerce solution.
// //         </motion.p>
// //       </div>

// //       {/* Product Visualization */}
// //       <div className="relative z-10 w-full max-w-lg mx-auto h-[400px] flex items-center justify-center">
// //          {/* Placeholder for the 3D Product Image (Tablets/Bottles) */}
// //          <motion.div 
// //             animate={{ y: [0, -20, 0] }}
// //             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// //             className="relative"
// //          >
// //             {/* Creating a CSS-only representation of the products for demonstration */}
// //             <div className="relative w-64 h-80 bg-gradient-to-br from-slate-800 to-black rounded-3xl border border-white/20 shadow-glow-lg flex items-center justify-center transform -rotate-6 z-10 backdrop-blur-xl">
// //                <span className="text-2xl font-light tracking-widest text-white/80">Cloud7</span>
// //                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"></div>
// //             </div>
            
// //             <div className="absolute -bottom-10 -right-12 w-32 h-40 bg-slate-900 rounded-2xl border border-white/20 shadow-glow-lg flex items-center justify-center transform rotate-12 z-20">
// //               <span className="text-sm font-light text-white/80">Cloud7</span>
// //             </div>
            
// //              {/* Smoke Overlay around product */}
// //             <div className="absolute inset-0 -z-10 bg-white/5 blur-[60px] rounded-full scale-150"></div>
// //          </motion.div>
// //       </div>

// //       <motion.div 
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         transition={{ delay: 0.4 }}
// //         className="z-10 mt-16"
// //       >
// //         <button className="group relative px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-medium overflow-hidden transition-all hover:border-white/60 hover:shadow-glow">
// //           <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
// //           <span className="relative z-10 tracking-widest text-sm">EXPLORE COLLECTION</span>
// //         </button>
// //       </motion.div>
// //     </section>
// //   );
// // };

// // export default Hero;
// // import React, { useEffect, useState } from 'react';
// // import { motion, useScroll, useTransform } from 'framer-motion';
// // import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { heroApi } from '../../api/heroApi';

// // const Hero = () => {
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
  
// //   // --- PARALLAX SCROLL HOOKS ---
// //   const { scrollY } = useScroll();
  
// //   // Text moves slightly slower than scroll (Depth: 0)
// //   const textY = useTransform(scrollY, [0, 500], [0, 150]); 
  
// //   // Independent parallax speeds for the 4 images to create 3D depth
// //   const yImg1 = useTransform(scrollY, [0, 500], [0, -80]);  // Main (Moves up slowly)
// //   const yImg2 = useTransform(scrollY, [0, 500], [0, -200]); // Background (Moves up fast)
// //   const yImg3 = useTransform(scrollY, [0, 500], [0, -40]);  // Foreground (Moves up very slowly)
// //   const yImg4 = useTransform(scrollY, [0, 500], [0, -150]); // Midground

// //   useEffect(() => {
// //     const loadHero = async () => {
// //       try {
// //         const heroData = await heroApi.getActiveHero();
// //         if (heroData) setData(heroData);
// //       } catch (e) {
// //         console.error("Hero load failed", e);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadHero();
// //   }, []);

// //   // --- LOADING STATE ---
// //   if (loading) {
// //     return (
// //       <div className="h-screen w-full bg-dark-900 flex items-center justify-center">
// //          <Loader2 className="animate-spin text-brand-glow" size={32} />
// //       </div>
// //     );
// //   }

// //   // --- DATA DEFAULTS ---
// //   const content = data || {
// //     headline: "Elevate Your Experience",
// //     subheadline: "Pure. Precise. Cloud7.",
// //     cta_text: "SHOP NOW",
// //     cta_link: "/shop",
// //     glow_color: "#3b82f6",
// //     hero_images: [] // Expecting array of URLs
// //   };

// //   // Safe access to images array (fills with null if missing)
// //   const images = content.hero_images && content.hero_images.length > 0 
// //     ? content.hero_images 
// //     : [null, null, null, null]; 

// //   return (
// //     <section className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden bg-dark-900 selection:bg-brand-glow selection:text-dark-900">
      
// //       {/* 1. PROCEDURAL SMOKE BACKGROUND */}
// //       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
// //          <SmokeEngine color={content.glow_color} />
// //       </div>

// //       {/* 2. MAIN CONTENT CONTAINER */}
// //       <div className="relative z-10 container mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-24 h-full">
        
// //         {/* --- LEFT COLUMN: TEXT CONTENT --- */}
// //         <motion.div 
// //           style={{ y: textY }}
// //           className="text-center lg:text-left space-y-8 relative z-20 order-2 lg:order-1"
// //         >
// //           <motion.div 
// //              initial={{ opacity: 0, x: -50 }}
// //              animate={{ opacity: 1, x: 0 }}
// //              transition={{ duration: 1, ease: "easeOut" }}
// //           >
// //             {/* Badge */}
// //             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
// //                 <Sparkles size={12} className="text-brand-glow animate-pulse" />
// //                 <span className="text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase">Next Gen Alkaloids</span>
// //             </div>

// //             {/* Headline */}
// //             <h1 className="text-5xl md:text-7xl xl:text-8xl font-black italic tracking-tighter leading-[0.9] text-white mb-8 drop-shadow-2xl">
// //               {content.headline}
// //             </h1>
            
// //             {/* Subheadline */}
// //             <p className="text-lg md:text-xl text-slate-400 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed border-l-2 border-brand-glow/50 pl-6">
// //               {content.subheadline}
// //             </p>
// //           </motion.div>

// //           {/* CTA Button */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.4, duration: 0.8 }}
// //           >
// //              <Link 
// //                 to={content.cta_link} 
// //                 className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-brand-glow font-pj rounded-xl hover:scale-105 active:scale-95"
// //              >
// //                 <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-20 group-hover:opacity-50 blur-lg transition-opacity duration-200" />
// //                 <span className="relative flex items-center gap-3 text-sm md:text-base tracking-widest uppercase">
// //                    {content.cta_text} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
// //                 </span>
// //              </Link>
// //           </motion.div>
// //         </motion.div>


// //         {/* --- RIGHT COLUMN: FLOATING PRODUCT CLUSTER --- */}
// //         <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center order-1 lg:order-2 perspective-[1000px]">
           
// //            {/* Center Glow Halo behind products */}
// //            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-glow/20 rounded-full blur-[100px] animate-pulse" />

// //            {/* IMAGE 1: MAIN HERO (Center, Largest, Sharp) */}
// //            <FloatingImage 
// //               src={images[0]} 
// //               yParallax={yImg1} 
// //               className="z-30 w-56 md:w-80 lg:w-96 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
// //               delay={0}
// //               duration={6}
// //            />

// //            {/* IMAGE 2: Top Right (Background, Blurred, Tilted) */}
// //            <FloatingImage 
// //               src={images[1]} 
// //               yParallax={yImg2} 
// //               className="absolute top-0 right-0 md:top-10 lg:-right-10 z-10 w-28 md:w-40 opacity-70 blur-[1px] rotate-12 brightness-75"
// //               delay={1}
// //               duration={7}
// //            />

// //            {/* IMAGE 3: Bottom Left (Foreground, Small, Sharp) */}
// //            <FloatingImage 
// //               src={images[2]} 
// //               yParallax={yImg3} 
// //               className="absolute bottom-10 left-0 lg:-left-12 z-40 w-24 md:w-32 rotate-[-15deg] drop-shadow-2xl"
// //               delay={2}
// //               duration={5}
// //            />

// //            {/* IMAGE 4: Top Left (Far Background, Very Blurred) */}
// //            <FloatingImage 
// //               src={images[3]} 
// //               yParallax={yImg4} 
// //               className="absolute top-0 left-4 md:left-10 z-0 w-20 md:w-28 opacity-40 blur-[3px] rotate-[-6deg]"
// //               delay={0.5}
// //               duration={8}
// //            />
// //         </div>
// //       </div>

// //       {/* 3. FOREGROUND FOG (Bottom Fade to merge with next section) */}
// //       <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-dark-900 via-dark-900/90 to-transparent z-20 pointer-events-none" />
// //     </section>
// //   );
// // };


// // // --- HELPER COMPONENT: Floating Element ---
// // const FloatingImage = ({ src, className, yParallax, delay, duration }) => {
// //   if (!src) return null; // Gracefully handle missing images

// //   return (
// //     <motion.div
// //       style={{ y: yParallax }}
// //       className={className}
// //       initial={{ opacity: 0, scale: 0.8 }}
// //       animate={{ 
// //          // Preserve existing opacity classes if present
// //          opacity: className.includes('opacity') ? undefined : 1, 
// //          scale: 1,
// //          y: [0, -20, 0] // Gentle bobbing animation independent of scroll
// //       }}
// //       transition={{ 
// //          opacity: { duration: 1 },
// //          scale: { duration: 1 },
// //          // Infinite bobbing loop
// //          y: { duration: duration, repeat: Infinity, ease: "easeInOut", delay: delay }
// //       }}
// //     >
// //        <img src={src} alt="Product Element" className="w-full h-auto object-contain" />
// //     </motion.div>
// //   );
// // };


// // // --- HELPER COMPONENT: Procedural Smoke Engine ---
// // const SmokeEngine = ({ color }) => {
// //    const smokeColor = color || '#3b82f6';
   
// //    return (
// //       <>
// //          {/* Layer 1: Deep Slow Base Mist */}
// //          <motion.div 
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
// //             className="absolute top-[-50%] left-[-20%] w-[150%] h-[150%] rounded-[40%] blur-[120px] opacity-20"
// //             style={{ 
// //                background: `radial-gradient(circle at center, ${smokeColor} 0%, transparent 60%)` 
// //             }}
// //          />

// //          {/* Layer 2: Faster Moving Contrast Mist */}
// //          <motion.div 
// //             animate={{ rotate: -360, scale: [1, 1.2, 1] }}
// //             transition={{ 
// //                rotate: { duration: 90, repeat: Infinity, ease: "linear" },
// //                scale: { duration: 25, repeat: Infinity, ease: "easeInOut" }
// //             }}
// //             className="absolute bottom-[-30%] right-[-20%] w-[120%] h-[120%] rounded-[45%] blur-[90px] opacity-10 mix-blend-screen"
// //             style={{ 
// //                background: `radial-gradient(circle at center, #ffffff 0%, transparent 70%)` 
// //             }}
// //          />
// //       </>
// //    );
// // };

// // export default Hero;

// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { heroApi } from '../../api/heroApi';

// const Hero = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- PARALLAX SCROLL HOOKS ---
//   const { scrollY } = useScroll();
//   const yParallax = useTransform(scrollY, [0, 500], [0, 200]);
//   const opacityParallax = useTransform(scrollY, [0, 300], [1, 0]);

//   useEffect(() => {
//     const loadHero = async () => {
//       try {
//         const heroData = await heroApi.getActiveHero();
//         if (heroData) setData(heroData);
//       } catch (e) {
//         console.error("Hero load failed", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadHero();
//   }, []);

//   if (loading) {
//     return (
//       <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
//         <Loader2 className="animate-spin text-slate-500" size={32} />
//       </div>
//     );
//   }

//   // --- DATA DEFAULTS (Fallback to match the reference image style) ---
//   const content = data || {
//     headline: "Elevate Your Experience.",
//     subheadline: "Pure. Precise. Cloud7.",
//     cta_text: "EXPLORE COLLECTION",
//     cta_link: "/shop",
//     glow_color: "#ffffff",
//     hero_images: []
//   };

//   // Ensure we have an array for the cluster
//   const images = content.hero_images || [];

//   return (
//     <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white selection:bg-white/20">
      
//       {/* 1. CINEMATIC SMOKE BACKGROUND */}
//       <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
//         <AtmosphericFog color={content.glow_color} />
//       </div>

//       {/* 2. MAIN CONTENT (Centered Layout) */}
//       <motion.div 
//         style={{ opacity: opacityParallax, y: yParallax }}
//         className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-[-5vh]"
//       >
        
//         {/* TOP TYPOGRAPHY */}
//         <div className="space-y-6 max-w-4xl mx-auto mb-12">
//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: "easeOut" }}
//             className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-slate-200"
//           >
//             {content.headline}
//             <span className="block mt-2 text-slate-400 opacity-90">{content.subheadline}</span>
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//             className="text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed"
//           >
//             Our premium product is engineered with our signature spectrum purity and erunannant extreme ecommerce solution.
//           </motion.p>
//         </div>

//         {/* CENTER STAGE: PRODUCT CLUSTER & SMOKE */}
//         <div className="relative w-full max-w-3xl h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px]">
          
//           {/* Back Glow Halo */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[100px]" />

//           {/* Product Cluster */}
//           <ProductStage images={images} />

//           {/* Foreground Mist (Wraps around the product) */}
//           <div className="absolute inset-0 pointer-events-none z-20 mix-blend-screen opacity-60">
//              <MistLayer direction="left" duration={20} />
//           </div>
//         </div>

//         {/* BOTTOM CTA: GLOWING PILL */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="relative z-30 mt-8"
//         >
//           <Link to={content.cta_link} className="group relative inline-block">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
//             <div className="relative flex items-center px-12 py-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:border-white/30 transition-colors duration-300">
//               <span className="text-sm font-bold tracking-[0.2em] text-slate-100 uppercase group-hover:text-white transition-colors">
//                 {content.cta_text}
//               </span>
//             </div>
//             {/* Inner Glow Ring */}
//             <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 group-hover:ring-white/30" />
//           </Link>
//         </motion.div>

//       </motion.div>

//       {/* 3. BOTTOM FADE (Seamless Transition) */}
//       <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-20" />
      
//       {/* SVG FILTERS FOR REALISTIC SMOKE */}
//       <svg className="hidden">
//         <filter id="smoke-filter">
//           <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="warp" />
//           <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
//         </filter>
//       </svg>
//     </section>
//   );
// };

// // --- COMPONENT: PRODUCT STAGE (The Cluster) ---
// const ProductStage = ({ images }) => {
//   // If no images, show nothing
//   if (!images || images.length === 0) return null;

//   // Layout Logic: 
//   // If 1 image: Center it.
//   // If multiple: Arrange them like the reference (Tablets back, bottles front).
//   const isSingle = images.length === 1;

//   return (
//     <div className="relative z-10 w-full h-full flex items-center justify-center">
//       {images.map((src, index) => {
//         if (!src) return null;
        
//         // Dynamic positioning based on index to create "Cluster"
//         let posStyles = "z-10 scale-100";
//         let floatDelay = 0;
        
//         if (!isSingle) {
//              if (index === 0) { // Main Center (Front)
//                 posStyles = "z-30 w-[180px] md:w-[240px] translate-y-10";
//                 floatDelay = 0;
//              } else if (index === 1) { // Back Left (Tablet style)
//                 posStyles = "z-10 w-[200px] md:w-[280px] -translate-x-24 -translate-y-10 -rotate-12 opacity-80 blur-[1px] brightness-75";
//                 floatDelay = 1;
//              } else if (index === 2) { // Back Right (Tablet style)
//                 posStyles = "z-10 w-[200px] md:w-[280px] translate-x-24 -translate-y-16 rotate-6 opacity-80 blur-[1px] brightness-75";
//                 floatDelay = 2;
//              } else { // Extra items (Front floating)
//                 posStyles = "z-40 w-[100px] md:w-[140px] translate-x-20 translate-y-20 rotate-12";
//                 floatDelay = 1.5;
//              }
//         } else {
//              posStyles = "z-20 w-[250px] md:w-[350px]";
//         }

//         return (
//           <motion.img
//             key={index}
//             src={src}
//             alt="Hero Product"
//             className={`absolute object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${posStyles}`}
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ 
//                 opacity: 1, 
//                 scale: 1,
//                 y: [0, -15, 0] 
//             }}
//             transition={{
//                 opacity: { duration: 1.5, delay: 0.5 },
//                 scale: { duration: 1.5, delay: 0.5 },
//                 y: { 
//                     duration: 6, 
//                     repeat: Infinity, 
//                     ease: "easeInOut", 
//                     delay: floatDelay 
//                 }
//             }}
//           />
//         );
//       })}
//     </div>
//   );
// };

// // --- COMPONENT: ATMOSPHERIC FOG ENGINE ---
// const AtmosphericFog = ({ color }) => {
//   return (
//     <>
//        {/* Base Dark Gradient */}
//        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#050505] to-[#050505]" />
       
//        {/* Moving Fog Layers */}
//        <div className="absolute inset-0 opacity-30 mix-blend-screen">
//           <MistLayer direction="right" duration={25} />
//        </div>
//        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
//           <MistLayer direction="left" duration={35} />
//        </div>
//     </>
//   );
// };

// const MistLayer = ({ direction, duration }) => {
//   const xValues = direction === 'left' ? [0, -50, 0] : [0, 50, 0];
  
//   return (
//     <motion.div
//       animate={{ x: xValues, rotate: [0, 5, -5, 0] }}
//       transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
//       className="w-[150%] h-[150%] -top-[25%] -left-[25%] absolute"
//       style={{
//         background: `
//             radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
//             radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 0%, transparent 40%)
//         `,
//         filter: 'url(#smoke-filter) blur(30px)', // The magic "Wispy" effect
//       }}
//     />
//   );
// };

// export default Hero;


// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { ArrowRight, Star, Loader2 } from 'lucide-react';
// // import { supabase } from '../../client/supabaseClient';

// // /**
// //  * DYNAMIC PRODUCT CARD
// //  * Maps directly to your public.products table schema
// //  */
// // export const ProductCard = ({ product }) => {
// //   // Get the first variant price or default to 'TBD'
// //   const displayPrice = product.product_variants?.[0]?.price || "TBD";

// //   return (
// //     <Link to={`/product/${product.slug}`} className="block h-full group">
// //       <motion.div 
// //         whileHover="hover"
// //         initial="rest"
// //         className="relative h-full bg-dark-800 rounded-[2.5rem] border border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20"
// //       >
// //         {/* Dynamic Glow using your 'image_color' column */}
// //         <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 bg-gradient-to-br ${product.image_color}`} />
        
// //         <div className="relative h-72 w-full flex items-center justify-center overflow-hidden bg-white/[0.02]">
// //             <div className={`absolute w-40 h-40 rounded-full bg-gradient-to-r ${product.image_color} blur-[80px] opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-150`} />
            
// //             <motion.div 
// //               variants={{
// //                 rest: { y: 0, scale: 1 },
// //                 hover: { y: -15, scale: 1.05 }
// //               }}
// //               className="relative z-10 w-40 h-52 bg-dark-900 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center justify-center p-6 text-center"
// //             >
// //                 <div className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none">Cloud7</div>
// //                 <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-glow mt-2">
// //                   {product.potency || 'Standard'}
// //                 </div>
// //             </motion.div>
// //         </div>

// //         <div className="p-8 relative z-10">
// //             <div className="flex justify-between items-center mb-4">
// //                 <span className="text-[10px] font-black tracking-widest text-brand-glow uppercase bg-brand-glow/10 px-3 py-1 rounded-full border border-brand-glow/20">
// //                     {product.tagline || 'New Arrival'}
// //                 </span>
// //                 <div className="flex items-center gap-1 text-yellow-500 font-bold text-xs">
// //                     <Star size={12} fill="currentColor" /> {product.rating || '5.0'}
// //                 </div>
// //             </div>

// //             <h3 className="text-2xl font-black text-white mb-2 uppercase italic tracking-tighter leading-tight">
// //                 {product.name}
// //             </h3>
            
// //             <div className="mt-8 flex items-center justify-between">
// //                 <div>
// //                     <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Starting At</div>
// //                     <div className="text-3xl font-black text-white italic tracking-tighter">${displayPrice}</div>
// //                 </div>

// //                 <motion.div className="w-12 h-12 rounded-full bg-white text-dark-900 flex items-center justify-center overflow-hidden group-hover:w-32 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
// //                     <div className="flex items-center gap-2 whitespace-nowrap px-4">
// //                         <ArrowRight size={20} className="shrink-0" />
// //                         <span className="text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
// //                     </div>
// //                 </motion.div>
// //             </div>
// //         </div>
// //       </motion.div>
// //     </Link>
// //   );
// // };

// // /**
// //  * FEATURED PROTOCOL (AUTO-SCROLLING API SECTION)
// //  */
// // export const FeaturedProtocol = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchFeatured = async () => {
// //       // Joining with product_variants to get prices dynamically
// //       const { data, error } = await supabase
// //         .from('products')
// //         .select('*, product_variants(price)')
// //         .order('rating', { ascending: false })
// //         .limit(6);

// //       if (!error && data) setProducts(data);
// //       setLoading(false);
// //     };
// //     fetchFeatured();
// //   }, []);

// //   if (loading) return (
// //     <div className="h-[500px] flex items-center justify-center bg-dark-900">
// //       <Loader2 className="animate-spin text-brand-glow" size={40} />
// //     </div>
// //   );

// //   const scrollItems = [...products, ...products];

// //   return (
// //     <section className="py-24 bg-dark-900 overflow-hidden relative">
// //       <div className="max-w-7xl mx-auto px-6 mb-12">
// //         <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">Featured Protocol</h2>
// //         <p className="text-brand-glow mt-3 font-bold tracking-[0.3em] text-xs uppercase opacity-80">High-Performance Alkaloids</p>
// //       </div>

// //       <div className="flex overflow-hidden group/container">
// //         <div className="flex gap-8 animate-infinite-scroll group-hover/container:[animation-play-state:paused]">
// //           {scrollItems.map((item, idx) => (
// //             <div key={`${item.id}-${idx}`} className="w-[400px] shrink-0">
// //               <ProductCard product={item} />
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <style>{`
// //         @keyframes infinite-scroll {
// //           from { transform: translateX(0); }
// //           to { transform: translateX(calc(-400px * ${products.length} - 2rem * ${products.length})); }
// //         }
// //         .animate-infinite-scroll {
// //           animation: infinite-scroll 45s linear infinite;
// //         }
// //       `}</style>
// //     </section>
// //   );
// // };

// // export default ProductCard;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight, Star, Loader2, Zap, ShoppingBag, Activity } from 'lucide-react';
// import { supabase } from '../../client/supabaseClient';

// const DUMMY_IMAGE = "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Protocol+Image";

// /**
//  * ------------------------------------------------------------------
//  * PRODUCT CARD COMPONENT
//  * High-performance, animated card with dynamic coloring and fallbacks.
//  * ------------------------------------------------------------------
//  */
// export const ProductCard = ({ product }) => {
//   // Safe Fallbacks
//   const displayPrice = product.product_variants?.[0]?.price || "TBD";
//   const glowColor = product.image_color || 'from-cyan-500 to-blue-600';
//   const coverImage = product.cover_image_url || DUMMY_IMAGE;
  
//   // Extract a single color for shadows (approximate based on gradient logic or default to cyan)
//   // This allows us to have a matching colored shadow without complex parsing
//   const shadowColorClass = product.image_color?.includes('red') ? 'shadow-red-500/20' 
//     : product.image_color?.includes('green') ? 'shadow-green-500/20' 
//     : product.image_color?.includes('purple') ? 'shadow-purple-500/20' 
//     : 'shadow-cyan-500/20';

//   return (
//     <Link to={`/product/${product.slug}`} className="block h-full group relative">
      
//       {/* BACKGROUND GLOW (Ambient Light) */}
//       <div className={`absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700`} />

//       <motion.div 
//         whileHover={{ y: -8 }}
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ type: "spring", stiffness: 300, damping: 20 }}
//         className={`
//           relative h-full bg-dark-800/90 backdrop-blur-xl rounded-[2rem] 
//           border border-white/10 overflow-hidden flex flex-col
//           transition-all duration-500 group-hover:border-white/20 group-hover:shadow-2xl ${shadowColorClass}
//         `}
//       >
        
//         {/* --- 1. IMAGE AREA --- */}
//         <div className="relative h-72 w-full overflow-hidden bg-dark-900">
           
//            {/* Dynamic Mesh Gradient Overlay (Subtle tint) */}
//            <div className={`absolute inset-0 bg-gradient-to-tr ${glowColor} opacity-10 mix-blend-overlay z-10`} />
           
//            {/* The Image */}
//            <motion.img 
//              src={coverImage} 
//              alt={product.name}
//              whileHover={{ scale: 1.1 }}
//              transition={{ duration: 0.7, ease: "easeOut" }}
//              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
//            />

//            {/* Gradient for text readability */}
//            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent z-20" />

//            {/* Floating Badges */}
//            <div className="absolute top-4 left-4 z-30 flex gap-2">
//               <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white flex items-center gap-1">
//                  <Activity size={10} className="text-brand-glow" /> {product.potency || 'High Potency'}
//               </span>
//            </div>

//            {/* "Quick View" Button (Slides up on hover) */}
//            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
//               <div className={`w-full py-3 rounded-xl bg-gradient-to-r ${glowColor} flex items-center justify-center gap-2 text-white font-bold text-xs shadow-lg tracking-wider`}>
//                  <ShoppingBag size={14} /> View Product
//               </div>
//            </div>
//         </div>

//         {/* --- 2. DETAILS AREA --- */}
//         <div className="p-6 flex flex-col flex-1 relative z-20">
//             {/* Title & Tagline */}
//             <div className="mb-auto">
//                <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase leading-none mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">
//                   {product.name}
//                </h3>
//                <p className="text-slate-400 text-sm line-clamp-2 h-10 leading-relaxed">
//                   {product.tagline || product.description?.substring(0, 80) + "..."}
//                </p>
//             </div>

//             {/* Footer: Price & Rating */}
//             <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
//                <div>
//                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Starting At</p>
//                   <div className="flex items-baseline gap-1">
//                      <span className="text-lg font-bold text-white group-hover:text-brand-glow transition-colors">${displayPrice}</span>
//                   </div>
//                </div>

//                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
//                   <Star size={12} className="text-yellow-400 fill-yellow-400" />
//                   <span className="text-xs font-bold text-white">{product.rating || '4.9'}</span>
//                </div>
//             </div>
//         </div>

//       </motion.div>
//     </Link>
//   );
// };

// /**
//  * ------------------------------------------------------------------
//  * FEATURED PRODUCTS SECTION (Infinite Scroll)
//  * Fetches data and renders the marquee of ProductCards.
//  * ------------------------------------------------------------------
//  */
// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeatured = async () => {
//       // Updated query to fetch cover_image_url
//       const { data, error } = await supabase
//         .from('products')
//         .select(`
//           *,
//           product_variants (price)
//         `)
//         .limit(6);
        
//       if (error) console.error('Error fetching featured:', error);
//       else setProducts(data || []);
//       setLoading(false);
//     };
//     fetchFeatured();
//   }, []);

//   if (loading) return (
//     <div className="h-[500px] flex items-center justify-center bg-dark-900">
//       <Loader2 className="animate-spin text-brand-glow" size={40} />
//     </div>
//   );

//   // Duplicate items for seamless infinite scroll
//   const scrollItems = [...products, ...products, ...products];

//   return (
//     <section className="py-24 bg-dark-900 overflow-hidden relative">
//       {/* Background Decor */}
//       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.05),transparent_50%)] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
//         <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
//           Featured Protocols
//         </h2>
//         <div className="flex items-center gap-2 mt-3">
//            <Zap size={16} className="text-brand-glow" fill="currentColor"/>
//            <p className="text-brand-glow font-bold tracking-[0.3em] text-xs uppercase opacity-80">
//              High-Performance Alkaloids
//            </p>
//         </div>
//       </div>

//       <div className="flex overflow-hidden group/container py-4">
//         <div className="flex gap-8 animate-infinite-scroll group-hover/container:[animation-play-state:paused] px-4">
//           {scrollItems.map((item, idx) => (
//             <div key={`${item.id}-${idx}`} className="w-[380px] shrink-0 h-[500px]">
//               <ProductCard product={item} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         @keyframes infinite-scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(calc(-380px * ${products.length} - 2rem * ${products.length})); }
//         }
//         .animate-infinite-scroll {
//           animation: infinite-scroll 40s linear infinite;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default FeaturedProducts;

// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { Search, ShoppingCart, User, LogOut, ShieldCheck, Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { getCartCount } = useCart();
//   const location = useLocation();
  
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const count = getCartCount();
//   const isAdmin = user?.role === 'admin';

//   // Handle scroll for glassmorphism
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Sync menu state and body scroll
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setShowProfileMenu(false);
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [location]);

//   // Toggle function for clarity
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className={clsx(
//         "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-12 py-4",
//         isScrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
//       )}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
          
//           {/* LOGO */}
//           <Link to="/" className="relative z-[110] text-2xl font-black tracking-tighter text-white flex items-center">
//             CLOUD<span className="text-brand-glow">7</span>
//           </Link>

//           {/* DESKTOP NAV - Hidden on Mobile */}
//           <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/10">
//             <NavItem to="/shop">Shop</NavItem>
//             <NavItem to="/science">Lab Report</NavItem>
//             <NavItem to="/learn">Learn</NavItem>
//             <NavItem to="/contact">Contact</NavItem>
//           </div>

//           {/* RIGHT ACTIONS */}
//           <div className="flex items-center gap-2 md:gap-5 relative z-[110]">
//             <button className="hidden sm:flex p-2 text-slate-400 hover:text-white transition-colors">
//               <Search size={20} />
//             </button>

//             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all">
//               <ShoppingCart size={22} />
//               {count > 0 && (
//                 <span className="absolute top-0 right-0 w-5 h-5 bg-brand-glow text-dark-900 text-[10px] font-black flex items-center justify-center rounded-full">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* Profile Dropdown (Desktop Only) */}
//             <div className="hidden md:block relative">
//                {user ? (
//                  <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs">{user.name.charAt(0)}</div>
//                     <span className="text-xs font-bold text-white uppercase tracking-tighter">Profile</span>
//                  </button>
//                ) : (
//                  <Link to="/login" className="px-6 py-2 rounded-full bg-white text-dark-900 text-xs font-black uppercase tracking-widest hover:bg-brand-glow transition-all">Login</Link>
//                )}
//             </div>

//             {/* HAMBURGER TOGGLE - Visible ONLY on mobile */}
//             <button 
//               onClick={toggleMobileMenu}
//               className="md:hidden p-2 text-white hover:bg-white/5 rounded-full transition-colors"
//               aria-label="Toggle Menu"
//             >
//               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* HALF-SCREEN OVERLAY MENU (Left Side) */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop Blur */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]"
//             />

//             {/* Menu Content - Covers exactly half width as per reference UI */}
//             <motion.div 
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[102] shadow-2xl flex flex-col"
//             >
//               {/* Menu Header */}
//               <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
//                 <h2 className="text-xl font-bold text-slate-800">Menu</h2>
//                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
//                    <X size={24} />
//                 </button>
//               </div>

//               {/* Search Bar - Matching reference UI */}
//               <div className="p-4">
//                 <div className="relative">
//                   <input 
//                     type="text" 
//                     placeholder="Login to search" 
//                     className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 pr-10 text-sm focus:ring-2 focus:ring-brand-glow"
//                   />
//                   <Search size={18} className="absolute right-3 top-3.5 text-slate-400" />
//                 </div>
//               </div>

//               {/* Nav Links */}
//               <div className="flex-1 overflow-y-auto px-2">
//                 <MobileLink to="/" label="Home" />
//                 {/* <MobileLink to="/about" label="About Us" hasSub />
//                 <MobileLink to="/shop" label="Products" hasSub /> */}
//                 <MobileLink to="/shop" label="Shop" />
//                 <MobileLink to="/science" label="Lab Reports" />
//                 <MobileLink to="/learn" label="Learn" />
//                 <MobileLink to="/contact" label="Contact Us" />
//               </div>

//               {/* Bottom Login/Register - Fixed at bottom like reference */}
//               <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto">
//                 <Link to="/login" className="flex items-center gap-3 text-slate-700 font-semibold hover:text-brand-glow transition-colors">
//                   <User size={20} className="text-slate-400" />
//                   Login / Register
//                 </Link>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Sub-components
// const NavItem = ({ to, children }) => (
//   <NavLink to={to} className={({ isActive }) => clsx(
//     "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300",
//     isActive ? "bg-white text-dark-900" : "text-slate-400 hover:text-white"
//   )}>{children}</NavLink>
// );

// const MobileLink = ({ to, label, hasSub }) => (
//   <Link to={to} className="flex items-center justify-between px-4 py-4 text-slate-700 font-bold border-b border-slate-50 hover:bg-slate-50 transition-all rounded-lg mx-2">
//     {label}
//     {hasSub && <ChevronRight size={18} className="text-slate-400" />}
//   </Link>
// );

// export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user } = useAuth();
//   const { getCartCount } = useCart();
//   const location = useLocation();
  
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const count = getCartCount();

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     document.body.style.overflow = 'unset';
//   }, [location]);

//   const toggleMobileMenu = () => {
//     const newState = !isMobileMenuOpen;
//     setIsMobileMenuOpen(newState);
//     document.body.style.overflow = newState ? 'hidden' : 'unset';
//   };

//   return (
//     <>
//       <nav className={clsx(
//         "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-12 py-4",
//         isScrolled ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent"
//       )}>
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
          
//           {/* LOGO */}
//           <Link to="/" className="relative z-[110] text-2xl font-black tracking-tighter text-white flex items-center">
//             CLOUD<span className="text-brand-glow">7</span>
//           </Link>

//           {/* DESKTOP NAV */}
//           <div className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-white/10">
//             <NavItem to="/shop">Shop</NavItem>
//             <NavItem to="/science">Lab Report</NavItem>
//             <NavItem to="/learn">Learn</NavItem>
//             <NavItem to="/contact">Contact</NavItem>
//           </div>

//           {/* RIGHT ACTIONS */}
//           <div className="flex items-center gap-2 md:gap-5 relative z-[110]">
            
//             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all group">
//               <ShoppingCart size={22} className="group-hover:scale-110 transition-transform" />
//               {count > 0 && (
//                 <span className="absolute top-0 right-0 w-5 h-5 bg-brand-glow text-dark-900 text-[10px] font-black flex items-center justify-center rounded-full border-2 border-dark-900">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* Profile Logic */}
//             <div className="hidden md:block">
//                {user ? (
//                  <Link to="/account" className="flex items-center gap-3 p-1 pr-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
//                       {user.profile?.first_name?.charAt(0) || 'U'}
//                     </div>
//                     <span className="text-xs font-bold text-white group-hover:text-brand-glow uppercase tracking-wide transition-colors">
//                       {user.profile?.first_name || 'Account'}
//                     </span>
//                  </Link>
//                ) : (
//                  <Link to="/login" className="px-6 py-2 rounded-full bg-white text-dark-900 text-xs font-black uppercase tracking-widest hover:bg-brand-glow transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]">
//                    Login
//                  </Link>
//                )}
//             </div>

//             {/* HAMBURGER */}
//             <button 
//               onClick={toggleMobileMenu}
//               className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
//             >
//               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE MENU */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => toggleMobileMenu()} // Close on click outside
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[101]"
//             />

//             {/* Drawer - Note exit x: '100%' fixes the left-exit bug */}
//             <motion.div 
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }} 
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-dark-900 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
//             >
//               {/* Header */}
//               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
//                 <h2 className="text-xl font-bold text-white">Menu</h2>
//                 <button onClick={() => toggleMobileMenu()} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
//                    <X size={24} />
//                 </button>
//               </div>

//               {/* Links */}
//               <div className="flex-1 overflow-y-auto py-4 px-2 space-y-2">
//                 <MobileLink to="/" label="Home" onClick={toggleMobileMenu} />
//                 <MobileLink to="/shop" label="Shop" onClick={toggleMobileMenu} />
//                 <MobileLink to="/science" label="Lab Reports" onClick={toggleMobileMenu} />
//                 <MobileLink to="/learn" label="Learn" onClick={toggleMobileMenu} />
//                 <MobileLink to="/contact" label="Contact Us" onClick={toggleMobileMenu} />
                
//                 {/* Account Link in Mobile */}
//                 <div className="border-t border-white/10 mt-6 pt-6 mx-2">
//                   {user ? (
//                     <MobileLink to="/account" label="My Account" icon={User} onClick={toggleMobileMenu} />
//                   ) : (
//                     <Link to="/login" onClick={toggleMobileMenu} className="flex items-center justify-center w-full py-4 rounded-xl bg-white text-dark-900 font-bold uppercase tracking-widest">
//                       Login / Register
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Sub-components
// const NavItem = ({ to, children }) => (
//   <NavLink to={to} className={({ isActive }) => clsx(
//     "px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300",
//     isActive ? "bg-grey text-dark-900" : "text-slate-400 hover:text-white hover:bg-grey/5"
//   )}>{children}</NavLink>
// );

// const MobileLink = ({ to, label, icon: Icon, onClick }) => (
//   <Link 
//     to={to} 
//     onClick={onClick}
//     className="flex items-center justify-between px-4 py-4 text-slate-300 font-bold hover:bg-white/5 hover:text-white transition-all rounded-xl mx-2"
//   >
//     <div className="flex items-center gap-3">
//       {Icon && <Icon size={18} />}
//       {label}
//     </div>
//   </Link>
// );

// export default Navbar;
