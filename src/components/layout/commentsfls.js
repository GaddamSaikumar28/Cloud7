
// // import React, { useState, useEffect } from 'react';
// // import { NavLink, Link, useLocation } from 'react-router-dom';
// // import { ShoppingCart, Menu, X, User, ShieldCheck, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import clsx from 'clsx';
// // import { useCart } from '../../context/CartContext';
// // import { useAuth } from '../../context/AuthContext';
// // import { layoutApi } from '../../api/layoutApi';

// // const Navbar = () => {
// //   const { user } = useAuth();
// //   const { getCartCount } = useCart();
// //   const location = useLocation();
// //   const count = getCartCount();
// //   // State
// //   const [config, setConfig] = useState(null);
// //   const [navLinks, setNavLinks] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   // Initial Data Fetch
// //   useEffect(() => {
// //     const init = async () => {
// //       try {
// //         const data = await layoutApi.getNavbarData();
// //         setConfig(data.settings);
// //         setNavLinks(data.links.length > 0 ? data.links : defaultLinks);
// //       } catch (err) {
// //         console.error("Navbar Error:", err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     init();
// //   }, []);

// //   // Scroll Effect
// //   useEffect(() => {
// //     const handleScroll = () => setIsScrolled(window.scrollY > 20);
// //     window.addEventListener('scroll', handleScroll);
// //     return () => window.removeEventListener('scroll', handleScroll);
// //   }, []);

// //   // Close mobile menu on route change
// //   useEffect(() => {
// //     setIsMobileMenuOpen(false);
// //     document.body.style.overflow = 'unset';
// //   }, [location]);

// //   const toggleMobileMenu = () => {
// //     const newState = !isMobileMenuOpen;
// //     setIsMobileMenuOpen(newState);
// //     document.body.style.overflow = newState ? 'hidden' : 'unset';
// //   };

// //   // Fallback defaults
// //   const defaultLinks = [
// //     { label: 'Shop', path: '/shop' },
// //     { label: 'Lab Reports', path: '/science' },
// //   ];

// //   return (
// //     <>
// //       <nav 
// //         className={clsx(
// //           "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b my-8 md:my-8 md:px-6",
// //           isScrolled 
// //             ? "bg-dark-900/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
// //             : "bg-transparent border-transparent py-5"
// //         )}
// //       >
// //         <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
// //           {/* --- 1. DYNAMIC LOGO --- */}
// //           <Link to="/" className="group relative z-[110] flex items-center gap-3">
// //              {loading ? (
// //                 <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg" />
// //              ) : config?.logo_url ? (
// //                 // Image Logo
// //                 <img 
// //                   src={config.logo_url} 
// //                   alt={config.site_name} 
// //                   className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
// //                   loading="lazy"
// //                 />
// //              ) : (
// //                 // Text Logo Fallback
// //                 <div className="relative">
// //                   <Sparkles className="text-brand-glow w-5 h-5 absolute -top-3 -left-2 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
// //                   <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
// //                     {config?.site_name?.slice(0, -1) || 'CLOUD'}
// //                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">
// //                        {config?.site_name?.slice(-1) || '7'}
// //                     </span>
// //                   </h1>
// //                 </div>
// //              )}
// //           </Link>

// //           {/* --- 2. DESKTOP LINKS (Animated Pills) --- */}
// //           <div className="hidden md:flex items-center bg-dark-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 relative shadow-inner">
// //             {loading ? (
// //                <div className="flex gap-4 px-4"><Loader2 className="animate-spin text-slate-500" size={16}/></div>
// //             ) : (
// //               // navLinks.map((link) => (
// //               //   <NavLink 
// //               //     key={link.id || link.path} 
// //               //     to={link.path}
// //               //     className={({ isActive }) => clsx(
// //               //       "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10",
// //               //       isActive ? "text-dark-900" : "text-slate-400 hover:text-white"
// //               //     )}
// //               //   >
// //               //     {/* {({ isActive }) => (
// //               //       <>
                      
// //               //           <motion.div
// //               //             layoutId="activeTab"
// //               //             className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
// //               //             transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //               //           />
                      
// //               //         {link.label}
// //               //       </>
// //               //     )} */}
// //               //     {({ isActive }) => (
// //               //       <>
// //               //         <span className="text-lg font-bold tracking-wide">{link.label}</span>
// //               //         <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
// //               //       </>
// //               //     )}
// //               //   </NavLink>
// //               // ))
// //               // navLinks.map((link) => (
// //               //   <NavLink
// //               //     key={link.id || link.path}
// //               //     to={link.path}
// //               //     className={({ isActive }) =>
// //               //       clsx(
// //               //         "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10 flex items-center gap-2",
// //               //         isActive ? "text-white" : "text-slate-400 hover:text-white"
// //               //       )
// //               //     }
// //               //   >
// //               //     {/* Wrap content in a function to access isActive */}
// //               //     {({ isActive }) => (
// //               //       <>
// //               //         <span className="text-lg font-bold tracking-wide">{link.label}</span>
// //               //         <ChevronRight
// //               //           size={16}
// //               //           className={isActive ? "text-brand-glow" : "opacity-30"}
// //               //         />
// //               //         {/* If you want the animated background pill back, add it here: */}
// //               //         {isActive && (
// //               //           <motion.div
// //               //             layoutId="activeTab"
// //               //             className="absolute inset-0 bg-gradient-to-r from-brand-glow/20 to-blue-500/20 rounded-full -z-10 border border-brand-glow/50"
// //               //             transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //               //           />
// //               //         )}
// //               //       </>
// //               //     )}
// //               //   </NavLink>
// //               // ))
// //               navLinks.map((link) => (
// //                 <NavLink 
// //                   key={link.id || link.path} 
// //                   to={link.path}
// //                   // We use a function here to handle the text color change
// //                   className={({ isActive }) => clsx(
// //                     "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 flex items-center gap-2",
// //                     isActive ? "text-dark-900" : "text-slate-400 hover:text-white"
// //                   )}
// //                 >
// //                   {/* Use a function child to access isActive for the icon and the motion div */}
// //                   {({ isActive }) => (
// //                     <>
// //                       {/* 1. The Animated Background Pill */}
// //                       {isActive && (
// //                         <motion.div
// //                           layoutId="activeTab"
// //                           className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
// //                           transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
// //                         />
// //                       )}

// //                       {/* 2. The Link Content */}
// //                       <span className="relative z-10">{link.label}</span>
                      
// //                       {/* 3. The Icon */}
// //                       {/* <ChevronRight 
// //                         size={14} 
// //                         className={clsx(
// //                           "transition-opacity duration-300",
// //                           isActive ? "text-dark-900 opacity-100" : "opacity-30"
// //                         )} 
// //                       /> */}
// //                     </>
// //                   )}
// //                 </NavLink>
// //               ))
// //             )}
// //           </div>

// //           {/* --- 3. RIGHT ACTIONS --- */}
// //           <div className="flex items-center gap-3 md:gap-5 relative z-[110]">

// //             {/* Cart */}
// //             <Link to="/cart" className="relative p-2.5 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 rounded-full transition-all group">
// //               <ShoppingCart size={20} className="text-slate-300 group-hover:text-white transition-colors" />
// //               {count > 0 && (
// //                 <motion.span 
// //                   initial={{ scale: 0 }}
// //                   animate={{ scale: 1 }}
// //                   key={count} // Retrigger anim on change
// //                   className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-dark-900 shadow-lg"
// //                 >
// //                   {count}
// //                 </motion.span>
// //               )}
// //             </Link>

// //             {/* User Logic */}
// //             { user?.role !== "admin" ? (
// //                 <div className="hidden md:block">
// //                   {user ? (
// //                     <Link to="/account" className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-white/5 border border-white/10 hover:border-brand-glow/50 hover:bg-white/10 transition-all group">
// //                         <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg overflow-hidden relative">
// //                           {user.profile?.first_name?.charAt(0) || <User size={14}/>}
// //                         </div>
// //                         <div className="flex flex-col items-start leading-none gap-0.5">
// //                           <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Account</span>
// //                           <span className="text-xs font-bold text-white group-hover:text-brand-glow transition-colors max-w-[80px] truncate">
// //                             {user.profile?.first_name || 'User'}
// //                           </span>
// //                         </div>
// //                     </Link>
// //                   ) : (
// //                     <Link to="/login" className="relative group overflow-hidden px-6 py-2.5 rounded-xl bg-white text-black-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
// //                       <span className="relative z-10 group-hover:text-black transition-colors duration-300">Login</span>
// //                       {/* <div className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />  */}
// //                     </Link>
// //                   )}
// //                 </div>
// //               ) : (
// //                   <Link to="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all group hover:scale-105">
// //                     <ShieldCheck size={16} className="animate-pulse" />
// //                     <span className="text-[10px] font-black tracking-wider">ADMIN</span>
// //                   </Link>
// //               )
// //             }

// //             {/* Mobile Toggle */}
// //             <button 
// //               onClick={toggleMobileMenu}
// //               className="md:hidden p-2.5 text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95"
// //             >
// //               {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
// //             </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* --- MOBILE DRAWER --- */}
// //       <AnimatePresence>
// //         {isMobileMenuOpen && (
// //           <>
// //             <motion.div 
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={toggleMobileMenu}
// //               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[101]"
// //             />

// //             <motion.div 
// //               initial={{ x: '100%' }}
// //               animate={{ x: 0 }}
// //               exit={{ x: '100%' }}
// //               transition={{ type: "spring", damping: 30, stiffness: 300 }}
// //               className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-dark-950 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
// //             >
// //               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-900">
// //                 <span className="text-sm font-bold text-slate-400 tracking-widest">Cloud 7</span>
// //                 <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
// //                    <X size={20} />
// //                 </button>
// //               </div>

// //               <div className="flex-1 overflow-y-auto p-6 space-y-2">
// //                 {navLinks.map((link, idx) => (
// //                    <MobileLink key={link.path} to={link.path} idx={idx} onClick={toggleMobileMenu}>
// //                       {link.label}
// //                    </MobileLink>
// //                 ))}

// //                 <div className="my-8 border-t border-dashed border-white/10" />

// //                 {/* Mobile Admin/User Actions */}
// //                 {user?.role === 'admin' && (
// //                   <Link to="/admin" onClick={toggleMobileMenu} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
// //                     <ShieldCheck size={20} />
// //                     <span className="font-bold">Admin Dashboard</span>
// //                   </Link>
// //                 )}

// //                 {user ? (
// //                    <Link to="/account" onClick={toggleMobileMenu} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-glow/50 transition-colors">
// //                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-lg">
// //                         {user.profile?.first_name?.charAt(0)}
// //                       </div>
// //                       <div>
// //                         <p className="text-xs text-slate-400 uppercase tracking-wider">Signed in as</p>
// //                         <p className="text-white font-bold text-lg">{user.profile?.first_name}</p>
// //                       </div>
// //                       <ChevronRight className="ml-auto text-slate-500" size={18} />
// //                    </Link>
// //                 ) : (
// //                   <Link to="/login" onClick={toggleMobileMenu} className="w-full py-4 rounded-xl bg-white text-dark-900 font-black tracking-widest flex items-center justify-center shadow-lg hover:bg-brand-glow transition-colors">
// //                     LOGIN / JOIN
// //                   </Link>
// //                 )}
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // };

// // // const MobileLink = ({ to, children, onClick, idx }) => (
// // //   <motion.div
// // //     initial={{ x: 20, opacity: 0 }}
// // //     animate={{ x: 0, opacity: 1 }}
// // //     transition={{ delay: idx * 0.05 }}
// // //   >
// // //     <NavLink 
// // //       to={to} 
// // //       onClick={onClick}
// // //       className={({ isActive }) => clsx(
// // //         "flex items-center justify-between p-4 rounded-xl transition-all duration-300 border border-transparent",
// // //         isActive ? "bg-white/5 border-brand-glow/30 text-brand-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
// // //       )}
// // //     >
// // //       <span className="text-lg font-bold tracking-wide">{children}</span>
// // //       <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
// // //     </NavLink>
// // //   </motion.div>
// // // );

// // const MobileLink = ({ to, children, onClick, idx }) => (
// //   <motion.div
// //     initial={{ x: 20, opacity: 0 }}
// //     animate={{ x: 0, opacity: 1 }}
// //     transition={{ delay: idx * 0.05 }}
// //   >
// //     <NavLink 
// //       to={to} 
// //       onClick={onClick}
// //       className={({ isActive }) => clsx(
// //         "flex items-center justify-between p-4 rounded-xl transition-all duration-300 border border-transparent",
// //         isActive ? "bg-white/5 border-brand-glow/30 text-brand-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
// //       )}
// //     >
// //       {/* Access isActive here via a render function */}
// //       {({ isActive }) => (
// //         <>
// //           <span className="text-lg font-bold tracking-wide">{children}</span>
// //           <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
// //         </>
// //       )}
// //     </NavLink>
// //   </motion.div>
// // );

// // export default Navbar;
// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, Menu, X, User, ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
// import clsx from 'clsx';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { layoutApi } from '../../api/layoutApi';

// const Navbar = () => {
//   const { user } = useAuth();
//   const { getCartCount } = useCart();
//   const location = useLocation();
//   const count = getCartCount();
  
//   const [config, setConfig] = useState(null);
//   const [navLinks, setNavLinks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const data = await layoutApi.getNavbarData();
//         setConfig(data.settings);
//         setNavLinks(data.links.length > 0 ? data.links : [{ label: 'Shop', path: '/shop' }, { label: 'Science', path: '/science' }]);
//       } catch (err) {
//         console.error("Navbar Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll, { passive: true });
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     document.body.style.overflow = 'unset';
//   }, [location]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
//   };

//   return (
//     <>
//       <nav 
//         className={clsx(
//           "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b my-8",
//           isScrolled 
//             ? "bg-dark-950/95 backdrop-blur-md border-grey/10 py-3 shadow-xl" 
//             : "bg-transparent border-transparent py-5"
//         )}
//       >
//         <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
//           {/* 1. LOGO */}
//           <Link to="/" className="relative z-[110] flex items-center gap-2">
//              {loading ? (
//                 <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
//              ) : (
//                 <h1 className="text-xl font-black tracking-tighter text-white uppercase">
//                   {config?.site_name || 'CLOUD7'}
//                 </h1>
//              )}
//           </Link>

//           {/* 2. DESKTOP NAV (Static & Fast) */}
//           <div className="hidden md:flex items-center gap-1 bg-white border border-white/10 p-1 rounded-full">
//             {navLinks.map((link) => (
//               <NavLink 
//                 key={link.path} 
//                 to={link.path}
//                 className={({ isActive }) => clsx(
//                   "px-5 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all rounded-full",
//                   isActive 
//                     ? "bg-brand-glow bg-black text-white text-dark-900 shadow-lg shadow-brand-glow" 
//                     : "text-slate-400 hover:text-black hover:bg-white/5"
//                 )}
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* 3. ACTIONS */}
//           <div className="flex items-center gap-3">
//             {/* Cart Icon */}
//             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-colors">
//               <ShoppingCart size={20} />
//               {count > 0 && (
//                 <span className="absolute top-0 right-0 w-4 h-4 bg-brand-glow text-dark-900 text-[9px] font-black flex items-center justify-center rounded-full">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* Auth Button */}
//             <div className="hidden md:block">
//               {user ? (
//                 <Link to={user.role === 'admin' ? "/admin" : "/account"} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-glow/50">
//                   <User size={14} className="text-brand-glow" />
//                   <span className="text-[10px] font-bold text-white uppercase">{user.profile?.first_name || 'Account'}</span>
//                 </Link>
//               ) : (
//                 <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-white px-4 py-2 border border-white/20 rounded-lg hover:bg-red hover:text-dark-900 transition-all">
//                   Login
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Toggle */}
//             <button onClick={toggleMobileMenu} className="md:hidden p-2 text-white">
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* 4. SIMPLE MOBILE OVERLAY (Pure CSS Logic for Speed) */}
//       <div className={clsx(
//         "fixed inset-0 z-[90] bg-dark-950 transition-transform duration-300 ease-in-out md:hidden",
//         isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
//       )}>
//         <div className="flex flex-col h-full pt-24 px-6">
//           {navLinks.map((link) => (
//             <Link 
//               key={link.path} 
//               to={link.path} 
//               className="py-4 text-2xl font-black text-white border-b border-white/5 uppercase"
//             >
//               {link.label}
//             </Link>
//           ))}
//           <Link to={user ? "/account" : "/login"} className="mt-8 py-4 bg-brand-glow text-dark-900 text-center font-bold rounded-xl">
//             {user ? "MY ACCOUNT" : "LOGIN / JOIN"}
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
// import { supabase } from '../client/supabaseClient';

// export const adminPromoApi = {
  
//   // 1. GET ALL BANNERS
//   getBanners: async () => {
//     const { data, error } = await supabase
//       .from('promo_banners')
//       .select('*')
//       .order('sort_order', { ascending: true });

//     if (error) throw error;
//     return data;
//   },

//   // 2. UPLOAD MEDIA (Image/Video/GIF)
//   uploadMedia: async (file) => {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `BANNER_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
//     // Upload to 'Cloud7' bucket
//     const { error: uploadError } = await supabase.storage
//       .from('Cloud7')
//       .upload(fileName, file, {
//         cacheControl: '3600',
//         upsert: false
//       });

//     if (uploadError) throw uploadError;

//     // Get Public URL
//     const { data } = supabase.storage
//       .from('Cloud7')
//       .getPublicUrl(fileName);

//     return data.publicUrl;
//   },

//   // 3. UPSERT (Create or Update)
//   saveBanner: async (bannerData) => {
//     // If ID exists, it updates; otherwise, it inserts (due to how Supabase upsert works if configured, 
//     // but for safety, we'll split logic or use simple insert/update)
    
//     if (bannerData.id) {
//       // UPDATE
//       const { data, error } = await supabase
//         .from('promo_banners')
//         .update(bannerData)
//         .eq('id', bannerData.id)
//         .select()
//         .single();
//       if (error) throw error;
//       return data;
//     } else {
//       // INSERT
//       // Remove ID from object if it's null/undefined to let DB auto-gen it
//       const { id, ...insertData } = bannerData;
//       const { data, error } = await supabase
//         .from('promo_banners')
//         .insert([insertData])
//         .select()
//         .single();
//       if (error) throw error;
//       return data;
//     }
//   },

//   // 4. DELETE
//   deleteBanner: async (id) => {
//     const { error } = await supabase
//       .from('promo_banners')
//       .delete()
//       .eq('id', id);

//     if (error) throw error;
//     return true;
//   },

//   // 5. TOGGLE ACTIVE STATUS
//   toggleActive: async (id, currentStatus) => {
//     const { error } = await supabase
//       .from('promo_banners')
//       .update({ is_active: !currentStatus })
//       .eq('id', id);
    
//     if (error) throw error;
//     return !currentStatus;
//   }
// };

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FileText, Search, ShieldCheck, Microscope, 
//   FlaskConical, Download, ExternalLink, AlertCircle, Loader2
// } from 'lucide-react';
// import { getLabReportData } from '../api/labApi';

// const LabReports = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const data = await getLabReportData();
//       setProducts(data);
//     } catch (err) {
//       console.error("Failed to load lab reports:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- FILTER LOGIC ---
//   const filteredProducts = products.map(product => {
//     // If searching, check Product Name OR specific Batch IDs inside variants
//     const query = search.toLowerCase();
//     const matchesProduct = product.name.toLowerCase().includes(query);
    
//     // Filter the reports inside the product
//     const matchingReports = product.reports.filter(r => 
//       matchesProduct || 
//       r.batch.toLowerCase().includes(query) ||
//       r.name.toLowerCase().includes(query)
//     );

//     return { ...product, reports: matchingReports };
//   }).filter(p => p.reports.length > 0); // Only show products that have matching reports

//   return (
//     <div className="min-h-screen bg-dark-900 text-white relative overflow-hidden font-sans">
      
//       {/* --- BACKGROUND FX --- */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-brand-glow/5 blur-[120px] rounded-full pointer-events-none" />

//       {/* --- HERO SECTION --- */}
//       <div className="relative pt-32 pb-16 px-4 md:px-12 text-center z-10">
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//           className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-6"
//         >
//           <Microscope size={14} /> Transparency & Purity
//         </motion.div>
        
//         <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-6">
//           Lab <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Analytics</span>
//         </h1>
        
//         <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-12">
//           Every batch is rigorously tested by ISO-certified third-party laboratories. 
//           Search below to verify the potency and purity of your specific product.
//         </p>

//         {/* SEARCH BAR */}
//         <div className="max-w-xl mx-auto relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-brand-glow to-blue-600 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
//           <div className="relative bg-dark-950 border border-white/10 rounded-xl flex items-center p-2">
//             <Search className="ml-3 text-slate-500" size={20} />
//             <input 
//               type="text" 
//               placeholder="Search by Product Name, Flavor, or Batch ID..." 
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-transparent border-none text-white px-4 py-2 focus:outline-none placeholder:text-slate-600 font-medium"
//             />
//           </div>
//         </div>
//       </div>

//       {/* --- CONTENT GRID --- */}
//       <div className="max-w-7xl mx-auto px-4 md:px-12 pb-24 relative z-10">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20 text-slate-500">
//             <Loader2 size={40} className="animate-spin text-brand-glow mb-4"/>
//             <p>Retrieving Batch Data...</p>
//           </div>
//         ) : filteredProducts.length === 0 ? (
//           <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
//              <FlaskConical size={48} className="mx-auto text-slate-600 mb-4" />
//              <h3 className="text-xl font-bold text-white">No Results Found</h3>
//              <p className="text-slate-500">Try searching for a different batch ID or product name.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-8">
//             {filteredProducts.map((product) => (
//               <motion.div 
//                 key={product.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-colors"
//               >
//                 <div className="grid grid-cols-1 lg:grid-cols-4">
                    
//                     {/* PRODUCT INFO COLUMN */}
//                     <div className="lg:col-span-1 bg-black/20 p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center text-center lg:items-start lg:text-left">
//                         <div className="w-32 h-32 mb-6 rounded-2xl bg-white/5 p-2 border border-white/10">
//                             {product.image ? (
//                                 <img loading="lazy" src={product.image} alt={product.name} className="w-full h-full object-contain" />
//                             ) : (
//                                 <div className="w-full h-full flex items-center justify-center text-slate-600"><FileText/></div>
//                             )}
//                         </div>
//                         <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
//                         <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-wider bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
//                             <ShieldCheck size={12} /> Third-Party Verified
//                         </div>
//                     </div>

//                     {/* REPORT LIST COLUMN */}
//                     <div className="lg:col-span-3 p-0">
//                         {/* Table Header (Hidden on Mobile) */}
//                         <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5">
//                             <div className="col-span-5">Variant Configuration</div>
//                             <div className="col-span-3">Batch ID</div>
//                             <div className="col-span-2">Date Tested</div>
//                             <div className="col-span-2 text-right">Certificate</div>
//                         </div>

//                         {/* Rows */}
//                         <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
//                             {product.reports.map((report) => (
//                                 <div key={report.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center hover:bg-white/5 transition-colors group">
                                    
//                                     {/* Variant Name */}
//                                     <div className="col-span-1 md:col-span-5 flex items-center gap-3">
//                                         <div className="w-2 h-2 rounded-full bg-brand-glow shrink-0" />
//                                         <span className="font-bold text-sm text-white">{report.name}</span>
//                                     </div>

//                                     {/* Batch */}
//                                     <div className="col-span-1 md:col-span-3 flex items-center gap-2">
//                                         <span className="md:hidden text-xs text-slate-500 uppercase font-bold">Batch:</span>
//                                         <span className="font-mono text-xs text-brand-glow bg-brand-glow/10 px-2 py-1 rounded border border-brand-glow/20">
//                                             {report.batch}
//                                         </span>
//                                     </div>

//                                     {/* Date */}
//                                     <div className="col-span-1 md:col-span-2 flex items-center gap-2 text-sm text-slate-400">
//                                         <span className="md:hidden text-xs text-slate-500 uppercase font-bold">Date:</span>
//                                         {report.date ? new Date(report.date).toLocaleDateString() : 'N/A'}
//                                     </div>

//                                     {/* Action */}
//                                     <div className="col-span-1 md:col-span-2 flex justify-start md:justify-end">
//                                         {report.url ? (
//                                             <a 
//                                                 href={report.url} 
//                                                 target="_blank" 
//                                                 rel="noopener noreferrer"
//                                                 className="flex items-center gap-2 px-4 py-2 bg-white text-dark-900 text-xs font-bold rounded-lg hover:bg-brand-glow transition-all active:scale-95 shadow-lg shadow-white/5 hover:shadow-brand-glow/20"
//                                             >
//                                                 <Download size={14} /> 
//                                                 <span className="hidden lg:inline">COA</span>
//                                                 <span className="lg:hidden">Download</span>
//                                             </a>
//                                         ) : (
//                                             <span className="flex items-center gap-2 px-4 py-2 bg-white/5 text-slate-500 text-xs font-bold rounded-lg border border-white/5 cursor-not-allowed">
//                                                 <AlertCircle size={14} /> Pending
//                                             </span>
//                                         )}
//                                     </div>

//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

// export default LabReports;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FileText, UploadCloud, Trash2, CheckCircle, AlertCircle, 
//   Search, Calendar, Save, X, File, Loader2, Microscope 
// } from 'lucide-react';
// import { adminLabApi } from '../../api/adminLabApi';

// const AdminLabConfig = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
  
//   // Modal State
//   const [editingVariant, setEditingVariant] = useState(null); // The variant object being edited
//   const [formData, setFormData] = useState({ batch_number: '', tested_at: '', file: null, existingUrl: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const data = await adminLabApi.getVariantReports();
//       setProducts(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- MODAL HANDLERS ---

//   const openEditModal = (variant) => {
//     setEditingVariant(variant);
//     setFormData({
//       batch_number: variant.batch_number || '',
//       tested_at: variant.tested_at || '',
//       existingUrl: variant.lab_report_url || '',
//       file: null
//     });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData(prev => ({ ...prev, file: e.target.files[0] }));
//     }
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!formData.batch_number) return alert("Batch Number is required.");
    
//     setIsSubmitting(true);
//     try {
//       let finalUrl = formData.existingUrl;

//       // 1. Upload new file if selected
//       if (formData.file) {
//         finalUrl = await adminLabApi.uploadReportFile(formData.file);
//       }

//       if (!finalUrl && !formData.file) return alert("Please upload a PDF/Image or ensure an existing report exists.");

//       // 2. Update Database
//       await adminLabApi.updateVariantReport(editingVariant.id, {
//         batch_number: formData.batch_number,
//         tested_at: formData.tested_at || new Date().toISOString().split('T')[0],
//         lab_report_url: finalUrl
//       });

//       alert("Report updated successfully!");
//       setEditingVariant(null);
//       loadData(); // Refresh UI
//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to remove this report? The file link and batch info will be cleared.")) return;
    
//     setIsSubmitting(true);
//     try {
//       await adminLabApi.deleteVariantReport(editingVariant.id);
//       setEditingVariant(null);
//       loadData();
//     } catch (err) {
//       alert("Delete failed: " + err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // --- FILTERING ---
//   const filteredProducts = products.filter(p => 
//     p.name.toLowerCase().includes(search.toLowerCase()) || 
//     p.variants.some(v => v.batch_number?.toLowerCase().includes(search.toLowerCase()))
//   );

//   if (loading) return <div className="p-12 text-center text-slate-500">Loading configuration...</div>;

//   return (
//     <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
//       {/* HEADER */}
//       <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-2">Lab Configuration</h1>
//           <p className="text-slate-400">Manage Certificates of Analysis (COAs) and Batch IDs.</p>
//         </div>
//         <div className="relative">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//           <input 
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search Product or Batch..."
//             className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 w-64 md:w-80 text-white focus:border-brand-glow outline-none transition-colors"
//           />
//         </div>
//       </div>

//       {/* LIST */}
//       <div className="space-y-6">
//         {filteredProducts.map(product => (
//           <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            
//             {/* Product Header */}
//             <div className="p-4 bg-black/20 border-b border-white/5 flex items-center gap-4">
//               <div className="w-12 h-12 bg-white/5 rounded-lg overflow-hidden shrink-0 border border-white/10">
//                 {product.cover_image_url && <img src={product.cover_image_url} laoding="lazy" alt="" className="w-full h-full object-cover" />}
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-bold text-lg text-white">{product.name}</h3>
//                 <p className="text-xs text-slate-500">{product.variants.length} Variants</p>
//               </div>
//             </div>

//             {/* Variants Grid */}
//             <div className="p-4 grid gap-4">
//               {product.variants.map(variant => (
//                 <div key={variant.id} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-brand-glow/30 transition-all">
                  
//                   {/* Info */}
//                   <div className="flex-1 w-full">
//                     <div className="flex items-center gap-2 mb-1">
//                       <div className={`w-2 h-2 rounded-full ${variant.lab_report_url ? 'bg-green-500' : 'bg-orange-500'}`} />
//                       <span className="font-bold text-sm">{variant.name}</span>
//                     </div>
//                     <div className="flex items-center gap-4 text-xs text-slate-400">
//                       {/* <span className="font-mono">SKU: {variant.sku || 'N/A'}</span> */}
//                       {variant.batch_number ? (
//                         <span className="text-brand-glow font-bold bg-brand-glow/10 px-2 rounded">Batch: {variant.batch_number}</span>
//                       ) : (
//                         <span className="text-orange-400 flex items-center gap-1"><AlertCircle size={10}/> Missing Report</span>
//                       )}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex items-center gap-3 w-full md:w-auto justify-end">
//                     {variant.lab_report_url && (
//                       <a href={variant.lab_report_url} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg" title="View PDF">
//                         <FileText size={18} />
//                       </a>
//                     )}
//                     <button 
//                       onClick={() => openEditModal(variant)}
//                       className="px-4 py-2 bg-brand-glow text-dark-900 font-bold text-xs rounded-lg hover:brightness-110 flex items-center gap-2"
//                     >
//                       <Microscope size={14} /> {variant.lab_report_url ? 'Edit Config' : 'Upload Report'}
//                     </button>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* EDIT MODAL */}
//       <AnimatePresence>
//         {editingVariant && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setEditingVariant(null)}
//               className="absolute inset-0 bg-black/80 backdrop-blur-sm"
//             />
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
//               className="relative w-full max-w-lg bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-8"
//             >
//               <div className="flex justify-between items-start mb-6">
//                  <div>
//                     <h2 className="text-2xl font-bold text-white">Configure Report</h2>
//                     <p className="text-slate-400 text-sm mt-1">{editingVariant.name}</p>
//                  </div>
//                  <button onClick={() => setEditingVariant(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-slate-400" /></button>
//               </div>

//               <form onSubmit={handleSave} className="space-y-6">
                
//                 {/* Batch ID */}
//                 <div className="space-y-2">
//                    <label className="text-xs font-bold text-slate-500 uppercase">Batch Number</label>
//                    <input 
//                       value={formData.batch_number}
//                       onChange={e => setFormData({...formData, batch_number: e.target.value})}
//                       placeholder="e.g. B-101-XZ"
//                       className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
//                    />
//                 </div>

//                 {/* Date */}
//                 <div className="space-y-2">
//                    <label className="text-xs font-bold text-slate-500 uppercase">Date Tested</label>
//                    <div className="relative">
//                       <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
//                       <input 
//                         type="date"
//                         value={formData.tested_at}
//                         onChange={e => setFormData({...formData, tested_at: e.target.value})}
//                         className="w-full bg-dark-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white text-sm focus:border-brand-glow outline-none"
//                       />
//                    </div>
//                 </div>

//                 {/* File Upload */}
//                 <div className="space-y-2">
//                    <label className="text-xs font-bold text-slate-500 uppercase">Lab Report (PDF/Image)</label>
                   
//                    {/* Current File Status */}
//                    {formData.existingUrl && !formData.file && (
//                      <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl mb-2">
//                         <CheckCircle size={16} className="text-green-500" />
//                         <span className="text-xs text-green-400 font-bold truncate flex-1">Current: ...{formData.existingUrl.slice(-15)}</span>
//                         <a href={formData.existingUrl} target="_blank" rel="noreferrer" className="text-xs underline text-white">View</a>
//                      </div>
//                    )}

//                    <div className="relative group cursor-pointer">
//                       <input 
//                         type="file" 
//                         accept=".pdf,.jpg,.jpeg,.png"
//                         onChange={handleFileChange}
//                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                       />
//                       <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 group-hover:border-brand-glow/50 group-hover:bg-brand-glow/5 transition-all">
//                          <UploadCloud size={32} className="text-slate-500 mb-2 group-hover:text-brand-glow" />
//                          <p className="text-sm font-bold text-white">{formData.file ? formData.file.name : 'Click to Upload New File'}</p>
//                          <p className="text-xs text-slate-500 mt-1">PDF, JPG or PNG</p>
//                       </div>
//                    </div>
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-3 pt-4 border-t border-white/10">
//                    {formData.existingUrl && (
//                      <button 
//                        type="button" 
//                        onClick={handleDelete}
//                        className="px-4 py-3 bg-red-500/10 text-red-400 font-bold rounded-xl hover:bg-red-500/20 border border-red-500/20 flex items-center gap-2"
//                      >
//                         <Trash2 size={18} />
//                      </button>
//                    )}
//                    <button 
//                      type="submit" 
//                      disabled={isSubmitting}
//                      className="flex-1 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
//                    >
//                       {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
//                       Save Configuration
//                    </button>
//                 </div>

//               </form>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// };

// export default AdminLabConfig;

// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';

// // --- LAYOUTS ---
// import RootLayout from '../layouts/RootLayout';

// // --- 1. EAGER IMPORTS (Instant Navigation for Customers) ---
// // We import these directly so they are bundled together. 
// // No spinners when clicking between Home and Shop.
// import Home from '../pages/Home';
// import Shop from '../pages/Shop';
// import ProductDetail from '../pages/ProductDetail';
// import Science from '../pages/Science';
// import Contact from '../pages/Contact';
// import Learn from '../pages/Learn';
// import Cart from '../pages/Cart';
// import Login from '../pages/Login';
// import Signup from '../pages/Signup';
// import Account from '../pages/Account';
// // import AdminContact from '../pages/admin/AdminContact';

// // --- 2. LAZY IMPORTS (Admin Only) ---
// // We DO want to lazy load the Admin section because:
// // A) Regular customers don't need this code (saves them bandwidth).
// // B) It contains heavy libraries like Recharts.
// const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
// const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
// // const AdminProducts = lazy(() => import('../pages/admin/AdminProducts')); // (Coming soon)
// const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
// const AdminProductForm = lazy(() => import('../pages/admin/AdminProductForm'));
// const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
// const AdminOrderDetail = lazy(() => import('../pages/admin/AdminOrderDetail'));
// const AdminVariants = lazy(() => import('../pages/admin/AdminVariants'));
// const AdminInventory = lazy(() => import('../pages/admin/AdminInventory'));
// const AdminPayments = lazy(() => import('../pages/admin/AdminPayments'));
// const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));
// const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
// const AdminLabConfig = lazy(() => import('../pages/admin/AdminLabConfig'));
// const AdminContact = lazy(() => import('../pages/admin/AdminContact'));
// const AdminHero = lazy(() => import('../pages/admin/AdminHero'));
// const AdminBanner = lazy(() => import('../pages/admin/AdminBanner'));
// const AdminCTAConfig = lazy(() => import('../pages/admin/AdminCTA'));
// const AdminEssence = lazy(() => import('../pages/admin/AdminEssence'));
// const AdminProcess = lazy(() => import('../pages/admin/AdminProcess'));
// const AdminLearn = lazy(() => import('../pages/admin/AdminLearn'));
// const AdminNavigation = lazy(() => import('../pages/admin/AdminNavigation'));
// const AdminFooter = lazy(() => import('../pages/admin/AdminFooter'));
// // Helper for Admin Loading State
// const AdminLoader = () => (
//   <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-brand-glow">
//     <div className="w-12 h-12 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
//     <span className="text-xs font-mono uppercase tracking-widest">Loading Dashboard...</span>
//   </div>
// );

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "shop", element: <Shop /> },
//       { path: "product/:slug", element: <ProductDetail /> },
//       { path: "science", element: <Science /> },
//       { path: "cart", element: <Cart /> },
//       { path: "login", element: <Login /> },
//       { path: "signup", element: <Signup /> },
//       { path: "account", element: <Account /> },
//       { path: "learn", element: <Learn /> },
//       { path: "contact", element: <Contact /> },
//     ],
//   },
  
//   // --- ADMIN ROUTES (Protected & Lazy Loaded) ---
//   {
//     path: "/admin",
//     element: (
//       <Suspense fallback={<AdminLoader />}>
//         <AdminLayout />
//       </Suspense>
//     ),
//     children: [
//       { 
//         index: true, 
//         element: <Dashboard /> 
//       },
//       { 
//         path: "products", 
//         element: <AdminProducts /> 
//       },
//       { 
//         path: "products/new", 
//         element: <AdminProductForm /> 
//       },
//       { 
//         path: "products/edit/:slug", 
//         element: <AdminProductForm /> 
//       },
//       { path: "orders", element: <AdminOrders /> },
//       { path: "orders/:id", element: <AdminOrderDetail /> },
//       { path: "variants", element: <AdminVariants /> },
//       { path: "inventory", element: <AdminInventory /> },
//       { path: "payments", element: <AdminPayments /> },
//       { path: "reviews", element: <AdminReviews /> },
//       { path: "customers", element: <AdminCustomers /> },
//       { path: "lab-config", element :<AdminLabConfig /> },
//       { path: "contact", element :<AdminContact /> },
//       { path: "hero", element :<AdminHero /> },
//       { path: "banner", element :<AdminBanner /> },
//       { path: "cta-config", element :<AdminCTAConfig /> },
//       { path: "essence-config", element :<AdminEssence /> },
//       { path: "process-config", element :<AdminProcess /> },
//       { path: "learn", element :<AdminLearn /> },
//       { path: "navigation", element :<AdminNavigation /> },
//       { path: "footer", element :<AdminFooter /> },
//       // We will add the Products page here in the next step
//       // { path: "products", element: <AdminProducts /> }
//     ]
//   }
// ]);


// import React, { useEffect, useState } from 'react';
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { ArrowRight, Sparkles, Loader2, Star, Zap } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { heroApi } from '../../api/heroApi';

// const Hero = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // --- PARALLAX PHYSICS ---
//   const { scrollY } = useScroll();
//   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
//   // Create smooth parallax values
//   const yText = useSpring(useTransform(scrollY, [0, 500], [0, 100]), springConfig);
//   const yMainImage = useSpring(useTransform(scrollY, [0, 500], [0, 50]), springConfig);
//   const yBackImages = useSpring(useTransform(scrollY, [0, 500], [0, -100]), springConfig); // Move Up faster
//   const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

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

//   // --- LOADING ---
//   if (loading) {
//     return (
//       <div className="h-screen w-full bg-dark-900 flex items-center justify-center">
//          <Loader2 className="animate-spin text-brand-glow" size={32} />
//       </div>
//     );
//   }

//   // --- DATA PREPARATION ---
//   const content = data || {
//     headline: "Elevate Your Experience",
//     subheadline: "Pure. Precise. Cloud7.",
//     cta_text: "EXPLORE COLLECTION",
//     cta_link: "/shop",
//     glow_color: "#0ea5e9",
//     hero_images: []
//   };

//   // Ensure 4 slots for the cluster logic
//   const rawImages = content.hero_images && content.hero_images.length > 0 
//     ? content.hero_images 
//     : (content.hero_image_url ? [content.hero_image_url] : []);
    
//   // Fill rest with null to avoid index errors
//   const images = [...rawImages, null, null, null, null]; 
//   const isCluster = rawImages.length > 1;

//   return (
//     <div className="relative bg-dark-900 overflow-hidden">
      
//       {/* 1. TOP SALE MARQUEE (Sticky Top) */}
//       <TopTicker />

//       {/* 2. MAIN HERO SECTION */}
//       <section className="relative min-h-[110vh] w-full flex flex-col items-center justify-start pt-32 pb-20">
        
//         {/* --- DYNAMIC BACKGROUND --- */}
//         <div className="absolute inset-0 z-0 pointer-events-none">
//            {/* <SmokeEngine color={content.glow_color} /> */}
//            {/* Vignette */}
//            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)] opacity-80" /> */}
//            {/* Noise Texture (Optional for premium feel) */}
//            {/* <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" /> */}
//         </div>

//         {/* --- CONTENT CONTAINER --- */}
//         <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
          
//           {/* A. TEXT LAYER */}
//           <motion.div 
//             style={{ y: yText, opacity: opacityFade }}
//             className="text-center max-w-5xl mx-auto mb-12 relative z-20"
//           >
//             {/* Badge */}
//             <motion.div 
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8 }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg mb-8"
//             >
//               <Sparkles size={12} className="text-brand-glow animate-pulse" />
//               <span className="text-[10px] font-bold tracking-[0.25em] text-slate-300 uppercase">
//                 Next Generation Products
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <motion.h1 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//               className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter leading-[0.9] text-white mb-6 drop-shadow-2xl"
//             >
//               {content.headline}
//             </motion.h1>

//             {/* Subheadline */}
//             <motion.p 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3, duration: 1 }}
//               className="text-lg md:text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed"
//             >
//               {content.subheadline}
//             </motion.p>
//           </motion.div>

//           {/* B. 3D PRODUCT STAGE */}
//           <div className="relative w-full h-[500px] md:h-[600px] perspective-[1200px] flex items-center justify-center -mt-8">
             
//              {/* Center Spotlight (Dynamic Color) */}
//              <div 
//                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px] opacity-40 animate-pulse-slow"
//                style={{ backgroundColor: content.glow_color }}
//              />

//              {/* IMAGE COMPOSITION */}
//              {isCluster ? (
//                 <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
                   
//                    {/* 1. MAIN HERO (Center, Crisp, Highest Priority) */}
//                    <ProductLayer 
//                       src={images[0]} 
//                       y={yMainImage}
//                       className="z-30 w-[280px] md:w-[380px] lg:w-[450px] drop-shadow-[0_35px_60px_rgba(0,0,0,0.9)]"
//                       animation={{ y: [0, -20, 0], duration: 6 }}
//                    />

//                    {/* 2. BACK RIGHT (Blurred, Moving Fast) */}
//                    <ProductLayer 
//                       src={images[1]} 
//                       y={yBackImages}
//                       className="absolute top-10 right-[5%] md:right-[15%] z-10 w-[140px] md:w-[200px] opacity-60 blur-[2px] grayscale-[30%] rotate-12"
//                       animation={{ y: [0, -30, 0], duration: 8, delay: 1 }}
//                    />

//                    {/* 3. FRONT LEFT (Small, Sharp, Moving Slow) */}
//                    <ProductLayer 
//                       src={images[2]} 
//                       y={yMainImage} // Moves with main
//                       className="absolute bottom-20 left-[5%] md:left-[18%] z-40 w-[100px] md:w-[150px] rotate-[-15deg] drop-shadow-xl"
//                       animation={{ y: [0, -15, 0], duration: 5, delay: 2 }}
//                    />

//                    {/* 4. DEEP BACKGROUND LEFT (Very Blurred) */}
//                    <ProductLayer 
//                       src={images[3]} 
//                       y={yBackImages}
//                       className="absolute -top-10 left-[0%] md:left-[10%] z-0 w-[120px] md:w-[160px] opacity-30 blur-[4px] rotate-[-6deg]"
//                       animation={{ y: [0, -25, 0], duration: 9, delay: 0.5 }}
//                    />
//                 </div>
//              ) : (
//                 // SINGLE IMAGE FALLBACK
//                 <ProductLayer 
//                    src={images[0]} 
//                    y={yMainImage}
//                    className="z-30 w-full max-w-sm md:max-w-lg object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.7)]"
//                    animation={{ y: [0, -25, 0], duration: 6 }}
//                 />
//              )}
//           </div>

//           {/* C. CTA BUTTON (Floating above bottom fog) */}
//           <motion.div
//              initial={{ opacity: 0, y: 50 }}
//              animate={{ opacity: 1, y: 0 }}
//              transition={{ delay: 0.6, duration: 0.8 }}
//              className="relative z-50 -mt-12"
//           >
//              <Link 
//                 to={content.cta_link} 
//                 className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-brand-glow/90 font-pj rounded-2xl hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.7)] backdrop-blur-sm"
//              >
//                 {/* Button Inner Glow */}
//                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm md:text-base text-dark-900">
//                    {content.cta_text} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
//                 </span>
//              </Link>
//           </motion.div>

//         </div>

//         {/* 3. FOREGROUND FOG (Seamless Transition) */}
//         <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-dark-900 via-dark-900/95 to-transparent z-40 pointer-events-none" />
//       </section>
//     </div>
//   );
// };

// /* -------------------------------------------------------------------------- */
// /* SUB COMPONENTS                              */
// /* -------------------------------------------------------------------------- */

// // 1. TOP TICKER (Auto Scroller)
// const TopTicker = () => {
//    return (
//       <div className="fixed top-0 left-0 w-full z-50 bg-brand-glow/10 backdrop-blur-md border-b border-white/5 h-10 flex items-center overflow-hidden">
//          <motion.div 
//             className="flex items-center gap-12 whitespace-nowrap min-w-full"
//             animate={{ x: ["0%", "-50%"] }}
//             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//          >
//             {[...Array(10)].map((_, i) => (
//                <React.Fragment key={i}>
//                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-glow flex items-center gap-2">
//                      <Zap size={12} className="fill-brand-glow" /> 
//                      New Formula Dropping Soon
//                   </span>
//                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
//                      <Star size={12} /> 
//                      Free Shipping on Orders $50+
//                   </span>
//                </React.Fragment>
//             ))}
//          </motion.div>
//       </div>
//    );
// };

// // 2. PRODUCT LAYER (Handles specific image animation and parallax)
// const ProductLayer = ({ src, className, animation, y }) => {
//   if (!src) return null; // Logic to hide layer if no image in that slot

//   return (
//     <motion.div
//       style={{ y }} // Parallax from scroll
//       className={`absolute ${className}`} // Positioning classes
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1 }}
//       transition={{ duration: 1.5, ease: "easeOut" }}
//     >
//        <motion.img 
//          src={src} 
//          alt="Cloud7 Product" 
//          className="w-full h-auto object-contain"
//          // Gentle idle floating animation
//          animate={animation.y ? { y: animation.y } : {}}
//          transition={{ 
//             y: { duration: animation.duration, repeat: Infinity, ease: "easeInOut", delay: animation.delay || 0 } 
//          }}
//        />
//     </motion.div>
//   );
// };

// // 3. SMOKE ENGINE (Procedural Background)
// const SmokeEngine = ({ color }) => {
//    const smokeColor = color || '#0ea5e9';
//    return (
//       <>
//          {/* Deep Layer */}
//          <motion.div 
//             animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//             transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
//             className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] rounded-[40%] blur-[120px] opacity-20"
//             style={{ background: `radial-gradient(circle at center, ${smokeColor} 0%, transparent 70%)` }}
//          />
//          {/* Detail Layer */}
//          <motion.div 
//             animate={{ rotate: -360, x: [-50, 50, -50] }}
//             transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
//             className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] rounded-[45%] blur-[100px] opacity-10 mix-blend-screen"
//             style={{ background: `radial-gradient(circle at center, #ffffff 0%, transparent 60%)` }}
//          />
//       </>
//    );
// };

// export default Hero;

// // // import React, { useEffect, useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import * as LucideIcons from 'lucide-react'; // Import all icons
// // // import { bannerApi } from '../../api/bannerApi';

// // // // Fallback defaults in case API fails or is loading
// // // const DEFAULTS = [
// // //   { text: "ALWAYS LAB TESTED", icon_name: "Microscope" },
// // //   { text: "PURE KRATOM EXTRACT", icon_name: "Leaf" },
// // //   { text: "RESEARCH BACKED", icon_name: "FlaskConical" },
// // //   { text: "PROUDLY USA MADE", icon_name: "Flag" }
// // // ];

// // // const InfiniteBanner = () => {
// // //   const [items, setItems] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     const loadItems = async () => {
// // //       try {
// // //         const data = await bannerApi.getActiveBannerItems();
// // //         if (data && data.length > 0) {
// // //           setItems(data);
// // //         } else {
// // //           setItems(DEFAULTS);
// // //         }
// // //       } catch (err) {
// // //         setItems(DEFAULTS);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };
// // //     loadItems();
// // //   }, []);

// // //   // Duplicate items to create the seamless infinite loop buffer
// // //   // We repeat the list enough times to fill ultra-wide screens
// // //   const content = [...items, ...items, ...items, ...items];

// // //   if (loading) return <div className="h-14 bg-dark-900 border-y border-white/10" />;

// // //   return (
// // //     <div className="w-full h-14 relative overflow-hidden z-20 border-y border-white/10 bg-dark-900 group">
      
// // //       {/* 1. Dynamic Gradient Background (Deep Teal/Blue) */}
// // //       <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36] opacity-90" />
      
// // //       {/* 2. Animated Gloss/Shimmer Overlay */}
// // //       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shimmer pointer-events-none" />

// // //       {/* 3. Vignette Edges (Fade out effect) */}
// // //       <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dark-900 to-transparent z-20 pointer-events-none" />
// // //       <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dark-900 to-transparent z-20 pointer-events-none" />

// // //       {/* 4. Scrolling Content */}
// // //       <div className="absolute inset-0 flex items-center">
// // //         <motion.div 
// // //           className="flex min-w-full"
// // //           animate={{ x: ["0%", "-50%"] }}
// // //           transition={{ 
// // //             duration: 30, // Adjust speed: higher = slower
// // //             repeat: Infinity, 
// // //             ease: "linear",
// // //             repeatType: "loop"
// // //           }}
// // //           // Optional: Pause animation on hover for readability
// // //           whileHover={{ animationPlayState: "paused" }} 
// // //         >
// // //           {content.map((item, index) => (
// // //             <BannerItem key={`${item.id}-${index}`} item={item} />
// // //           ))}
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- SUB-COMPONENT: Banner Item ---
// // // const BannerItem = ({ item }) => {
// // //   // Dynamically resolve the icon component from Lucide
// // //   // Fallback to 'Sparkles' if the icon name in DB is invalid
// // //   const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Sparkles;

// // //   return (
// // //     <div className="flex items-center px-8 md:px-12 gap-3 shrink-0 select-none cursor-default group/item transition-colors">
// // //       <IconComponent 
// // //         className="w-4 h-4 md:w-5 md:h-5 text-brand-glow/70 group-hover/item:text-brand-glow group-hover/item:scale-110 transition-all duration-300" 
// // //         strokeWidth={2} 
// // //       />
      
// // //       <span className="text-slate-300 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase group-hover/item:text-white transition-colors whitespace-nowrap">
// // //         {item.text}
// // //       </span>
      
// // //       {/* Separator Dot (Optional aesthetic choice) */}
// // //       <div className="w-1 h-1 rounded-full bg-white/10 ml-8 md:ml-12" />
// // //     </div>
// // //   );
// // // };

// // // export default InfiniteBanner;
// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import * as LucideIcons from 'lucide-react';
// // import { bannerApi } from '../../api/bannerApi';

// // const DEFAULTS = [
// //   { text: "ALWAYS LAB TESTED", icon_name: "Microscope" },
// //   { text: "PURE KRATOM EXTRACT", icon_name: "Leaf" },
// //   { text: "RESEARCH BACKED", icon_name: "FlaskConical" },
// //   { text: "PROUDLY USA MADE", icon_name: "Flag" }
// // ];

// // const InfiniteBanner = () => {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isMobile, setIsMobile] = useState(false);

// //   useEffect(() => {
// //     // 1. Data Loading
// //     const loadItems = async () => {
// //       try {
// //         const data = await bannerApi.getActiveBannerItems();
// //         if (data && data.length > 0) setItems(data);
// //         else setItems(DEFAULTS);
// //       } catch (err) {
// //         setItems(DEFAULTS);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadItems();

// //     // 2. Simple Mobile Detection (to adjust speed)
// //     const checkMobile = () => setIsMobile(window.innerWidth < 768);
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   // 3. Speed Configuration
// //   // Desktop: 20s (Fast but readable)
// //   // Mobile: 10s (Very snappy because distance is shorter)
// //   const ANIMATION_DURATION = isMobile ? 10 : 20;

// //   // Duplicate items 6 times to ensure no gaps on large screens or fast scrolling
// //   const content = [...items, ...items, ...items, ...items, ...items, ...items];

// //   if (loading) return <div className="h-12 bg-dark-900 border-y border-white/10" />;

// //   return (
// //     <div className="w-full h-12 relative overflow-hidden z-20 border-y border-white/10 bg-dark-900 group">
      
// //       {/* Background Gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36] opacity-90" />
      
// //       {/* Gloss Effect */}
// //       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

// //       {/* Fade Edges */}
// //       <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#022c36] to-transparent z-20 pointer-events-none" />
// //       <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#022c36] to-transparent z-20 pointer-events-none" />

// //       {/* Scrolling Container */}
// //       <div className="absolute inset-0 flex items-center">
// //         <motion.div 
// //           className="flex min-w-full"
// //           animate={{ x: ["0%", "-50%"] }}
// //           transition={{ 
// //             duration: ANIMATION_DURATION, 
// //             repeat: Infinity, 
// //             ease: "linear",
// //             repeatType: "loop"
// //           }}
// //         >
// //           {content.map((item, index) => (
// //             <BannerItem key={`${item.id}-${index}`} item={item} />
// //           ))}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // const BannerItem = ({ item }) => {
// //   const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Sparkles;

// //   return (
// //     <div className="flex items-center px-6 md:px-10 gap-2 md:gap-3 shrink-0 select-none cursor-default group/item transition-colors">
// //       <IconComponent 
// //         className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-glow/70 group-hover/item:text-brand-glow transition-all duration-300" 
// //         strokeWidth={2.5} 
// //       />
      
// //       <span className="text-slate-200 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase group-hover/item:text-white transition-colors whitespace-nowrap">
// //         {item.text}
// //       </span>
      
// //       {/* Separator */}
// //       <div className="w-1 h-1 rounded-full bg-brand-glow/30 ml-6 md:ml-10" />
// //     </div>
// //   );
// // };

// // export default InfiniteBanner;
// import React, { useEffect, useState, useLayoutEffect } from 'react';
// import { motion } from 'framer-motion';
// import * as LucideIcons from 'lucide-react';
// import { bannerApi } from '../../api/bannerApi';

// // --- CONFIGURATION ---
// // Lower numbers = Faster Speed
// // We use very low numbers because mobile width is small
// const SPEED_SETTINGS = {
//   MOBILE_DURATION: 10,    // 6 seconds for a full loop (Very Fast)
//   DESKTOP_DURATION: 30   // 15 seconds (Standard)
// };

// const DEFAULTS = [
//   { text: "ALWAYS LAB TESTED", icon_name: "Microscope" },
//   { text: "PURE KRATOM EXTRACT", icon_name: "Leaf" },
//   { text: "RESEARCH BACKED", icon_name: "FlaskConical" },
//   { text: "PROUDLY USA MADE", icon_name: "Flag" }
// ];

// const InfiniteBanner = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Initialize duration based on current window width immediately
//   const [duration, setDuration] = useState(
//     typeof window !== 'undefined' && window.innerWidth < 768 
//       ? SPEED_SETTINGS.MOBILE_DURATION 
//       : SPEED_SETTINGS.DESKTOP_DURATION
//   );

//   useEffect(() => {
//     // 1. Data Loading
//     const loadItems = async () => {
//       try {
//         const data = await bannerApi.getActiveBannerItems();
//         if (data && data.length > 0) setItems(data);
//         else setItems(DEFAULTS);
//       } catch (err) {
//         setItems(DEFAULTS);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadItems();
//   }, []);

//   // 2. Responsive Speed Handler
//   useLayoutEffect(() => {
//     const handleResize = () => {
//       const isMobile = window.innerWidth < 768;
//       setDuration(isMobile ? SPEED_SETTINGS.MOBILE_DURATION : SPEED_SETTINGS.DESKTOP_DURATION);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // 3. Repeat Content
//   // We repeat 8 times to create a massive virtual width. 
//   // More content = More distance to travel in the same time = Faster visual speed.
//   const content = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

//   if (loading) return <div className="h-12 bg-dark-900 border-y border-white/10" />;

//   return (
//     <div className="w-full h-12 relative overflow-hidden z-20 border-y border-white/10 bg-dark-900 group">
      
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#022c36] via-[#004d61] to-[#022c36] opacity-90" />
      
//       {/* Shimmer */}
//       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />

//       {/* Side Fades */}
//       <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#022c36] to-transparent z-20 pointer-events-none" />
//       <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#022c36] to-transparent z-20 pointer-events-none" />

//       {/* Scroller */}
//       <div className="absolute inset-0 flex items-center">
//         <motion.div 
//           className="flex min-w-max" // 'min-w-max' ensures the container is as wide as the text
//           animate={{ x: ["0%", "-50%"] }}
//           transition={{ 
//             duration: duration, 
//             repeat: Infinity, 
//             ease: "linear",
//             repeatType: "loop"
//           }}
//         >
//           {content.map((item, index) => (
//             <BannerItem key={`${item.id}-${index}`} item={item} />
//           ))}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// const BannerItem = ({ item }) => {
//   const IconComponent = LucideIcons[item.icon_name] || LucideIcons.Sparkles;

//   return (
//     <div className="flex items-center px-4 md:px-10 gap-2 md:gap-3 shrink-0 select-none cursor-default group/item transition-colors">
//       <IconComponent 
//         className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-glow/70 group-hover/item:text-brand-glow transition-all duration-300" 
//         strokeWidth={2.5} 
//       />
      
//       <span className="text-slate-200 text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase group-hover/item:text-white transition-colors whitespace-nowrap">
//         {item.text}
//       </span>
      
//       {/* Separator Dot */}
//       <div className="w-1 h-1 rounded-full bg-brand-glow/30 ml-4 md:ml-10" />
//     </div>
//   );
// };

// export default InfiniteBanner;