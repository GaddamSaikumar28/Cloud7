
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

// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, Menu, X, User, ShieldCheck, ChevronRight } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
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
//     const newState = !isMobileMenuOpen;
//     setIsMobileMenuOpen(newState);
//     document.body.style.overflow = newState ? 'hidden' : 'unset';
//   };

//   return (
//     <>
//       <nav 
//         className={clsx(
//           "fixed top-0 left-0 right-0 z-[100] my-8 transition-all duration-300 border-b",
//           isScrolled 
//             ? "bg-dark-950/90 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
//             : "bg-transparent border-transparent py-5"
//         )}
//       >
//         <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          

//           {/* 1. LOGO (FIXED: Large visual logo, Slim navbar layout) */}
//           <Link to="/" className="relative z-[110] flex items-center gap-2 group">
//              {loading ? (
//                 <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
//              ) : (
//                 // 1. We create a 'Wrapper' with a fixed height (h-10) and width (w-32 or w-40).
//                 //    This forces the navbar to stay slim (it only sees this 10 unit height).
//                 <div className="relative h-10 w-40"> 
//                    <img 
//                       src={config?.logo_url || DEFAULT_LOGO} 
//                       alt={config?.site_name || "Cloud7"}
//                       // 2. The Image is 'absolute', meaning it ignores the wrapper's boundaries.
//                       //    - h-24: Makes the logo BIG (much taller than the wrapper).
//                       //    - top-1/2 -translate-y-1/2: Centers it vertically perfectly.
//                       //    - object-contain left-0: Aligns it to the left.
//                       className="absolute top-1/2 left-0 -translate-y-1/2 h-20 md:h-24 w-auto max-w-none object-contain transition-transform duration-300 group-hover:scale-105" 
//                    />
//                 </div>
//              )}
//           </Link>

//           {/* 2. DESKTOP NAV */}
//           {/* className="hidden md:flex items-center gap-1 bg-white border border-white/10 p-1 rounded-full"  className="hidden md:flex items-center gap-2"*/}
//           <div className="hidden md:flex items-center gap-1 bg-white border border-black p-1 rounded-full" > 
//             {navLinks.map((link) => (
//               <NavLink 
//                 key={link.path} 
//                 to={link.path}
//                 className={({ isActive }) => clsx(
//                   "px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
//                   isActive 
//                     ? "bg-brand-glow bg-black text-white text-dark-900 shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-105" 
//                     : "text-black hover:text-black hover:bg-white/5" 
//                 )}
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </div>

//           {/* 3. ACTIONS */}
//           <div className="flex items-center gap-3">
//             {/* Cart Icon */}
//             <Link to="/cart" className="relative p-2 text-black hover:text-white transition-colors bg-white border border-black rounded-full hover:bg-black">
//               <ShoppingCart size={20} />
//               {count > 0 && (
//                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-glow text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-md">
//                   {count}
//                 </span>
//               )}
//             </Link>

//             {/* Auth Button (Desktop) */}
//             <div className="hidden md:block">
//               {user ? (
//                 <Link to={user.role === 'admin' ? "/admin" : "/account"} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black border border-dark hover:border-brand-glow/50 hover:bg-dark hover:text-white transition-all">
//                   <User size={14} className="text-brand-glow text-black" />
//                   <span className="text-[10px] font-bold text-black uppercase">{user.profile?.first_name || 'Account'}</span>
//                 </Link>
//               ) : (
//                 <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-black px-4 py-2 border border-white bg-white rounded-lg hover:bg-brand-glow hover:text-white hover:bg-black transition-all">
//                   Login
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Toggle */}
//             <button 
//               onClick={toggleMobileMenu} 
//               className="md:hidden p-2 text-white bg-dark-900/50 rounded-full border border-white/10 relative z-[110]"
//             >
//               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* 4. ANIMATED MOBILE DRAWER */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={toggleMobileMenu}
//               className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[101]"
//             />

//             {/* Slide-out Panel */}
//             <motion.div 
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: "spring", damping: 30, stiffness: 300 }}
//               className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-dark-950 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
//             >
//               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-900">
//                 <span className="text-sm font-bold text-slate-400 tracking-widest uppercase">Cloud 7</span>
//                 <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
//                    <X size={20} />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto p-6 space-y-2">
//                 {/* Navigation Links */}
//                 {navLinks.map((link, idx) => (
//                    <MobileLink key={link.path} to={link.path} idx={idx} onClick={toggleMobileMenu}>
//                       {link.label}
//                    </MobileLink>
//                 ))}

//                 <div className="my-8 border-t border-dashed border-white/10" />

//                 {/* Mobile Admin/User Actions */}
//                 {user?.role === 'admin' && (
//                   <Link to="/admin" onClick={toggleMobileMenu} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
//                     <ShieldCheck size={20} />
//                     <span className="font-bold">Admin Dashboard</span>
//                   </Link>
//                 )}

//                 {user ? (
//                    <Link to="/account" onClick={toggleMobileMenu} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-glow/50 transition-colors">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-lg">
//                         {user.profile?.first_name?.charAt(0) || <User size={20}/>}
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400 uppercase tracking-wider">Signed in as</p>
//                         <p className="text-white font-bold text-lg">{user.profile?.first_name || 'User'}</p>
//                       </div>
//                       <ChevronRight className="ml-auto text-slate-500" size={18} />
//                    </Link>
//                 ) : (
//                   <Link to="/login" onClick={toggleMobileMenu} className="w-full py-4 rounded-xl bg-white text-dark-900 font-black tracking-widest flex items-center justify-center shadow-lg hover:bg-brand-glow transition-colors">
//                     LOGIN / JOIN
//                   </Link>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // Helper Component for Animated Links
// const MobileLink = ({ to, idx, onClick, children }) => (
//   <motion.div
//     initial={{ opacity: 0, x: 20 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ delay: idx * 0.1 }}
//   >
//     <Link 
//       to={to} 
//       onClick={onClick}
//       className="block text-xl font-bold text-slate-300 hover:text-white hover:pl-2 transition-all py-3 border-b border-white/5 uppercase"
//     >
//       {children}
//     </Link>
//   </motion.div>
// );

// export default Navbar;


// // // import React, { useRef } from 'react';
// // // import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// // // // --- COMPONENTS ---
// // // import Hero from '../components/home/Hero';
// // // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // // import Essence from '../components/home/Essence';
// // // import Process from '../components/home/Process';
// // // import FeaturedProducts from '../components/home/ProductCard'; 
// // // import CTASection from '../components/home/CTASection';
// // // import CommunityFeedback from '../components/home/CommunityFeedback';

// // // // --- ASSETS / ICONS ---
// // // // (Assuming you have these installed via lucide-react)
// // // import { Atom, Hexagon, Zap } from 'lucide-react';

// // // const Home = () => {
// // //   // Global Scroll Hooks for Parallax
// // //   const { scrollYProgress } = useScroll();
// // //   const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
// // //   const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

// // //   return (
// // //     <div className="relative min-h-screen bg-dark-950 overflow-x-hidden selection:bg-brand-glow selection:text-dark-900">
      
// // //       {/* 1. SCROLL PROGRESS BAR (Fixed Top) */}
// // //       <motion.div
// // //         className="fixed top-0 left-0 right-0 h-1 bg-brand-glow origin-left z-[1000] shadow-[0_0_20px_#0ea5e9]"
// // //         style={{ scaleX }}
// // //       />

// // //       {/* 2. CINEMATIC BACKGROUND SYSTEM */}
// // //       <div className="fixed inset-0 pointer-events-none z-0">
// // //          {/* Noise Texture */}
// // //          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
         
// // //          {/* Deep Space Gradients (Parallax) */}
// // //          <motion.div style={{ y: backgroundY }} className="absolute inset-0">
// // //              <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-brand-glow/10 rounded-full blur-[150px] mix-blend-screen" />
// // //              <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen" />
// // //              <div className="absolute top-[40%] left-[20%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
// // //          </motion.div>

// // //          {/* Floating Geometry (Decorative) */}
// // //          <FloatingGeometry />
// // //       </div>

// // //       {/* --- MAIN CONTENT --- */}
// // //       <div className="relative z-10 flex flex-col">
        
// // //         {/* SECTION 1: HERO */}
// // //         <section className="relative pt-0 pb-0">
// // //            <Hero />
// // //            {/* Fade to Black at bottom of Hero for smooth transition */}
// // //            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent pointer-events-none" />
// // //         </section>

// // //         {/* SECTION 2: SOCIAL PROOF BANNER */}
// // //         <div className="relative z-20 -mt-10 mb-20">
// // //            <div className="transform -rotate-1 origin-left border-y border-white/10 bg-dark-900/80 backdrop-blur-md shadow-2xl">
// // //               <InfiniteBanner />
// // //            </div>
// // //         </div>

// // //         {/* SECTION 3: FEATURED PRODUCTS (The "Shop" Spotlight) */}
// // //         <RevealSection className="relative py-24">
// // //            {/* Spotlight Glow behind products */}
// // //            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />
// // //             */}
// // //            {/* <div className="relative z-10">
// // //               <div className="text-center mb-16">
// // //                  <span className="inline-block py-1 px-3 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest mb-4">
// // //                     The Collection
// // //                  </span>
// // //                  <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">
// // //                     Potency <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-white">Redefined</span>
// // //                  </h2>
// // //               </div> */}
// // //               <FeaturedProducts />
// // //            {/* </div> */}
// // //         </RevealSection>

// // //         {/* <NebulaSeparator /> */}

// // //         {/* SECTION 4: THE LAB (Science & Process Combined) */}
// // //         <section className="relative py-32 overflow-hidden">
// // //            {/* Tech Grid Background specifically for this section */}
// // //            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
           
// // //            <RevealSection>
// // //               <Essence />
// // //            </RevealSection>

// // //            <div className="h-24" /> {/* Spacer */}

// // //            <RevealSection>
// // //               <Process />
// // //            </RevealSection>
// // //         </section>

// // //         {/* <NebulaSeparator direction="left" /> */}

// // //         {/* SECTION 5: CTA (High Energy) */}
// // //         <RevealSection className="py-20 relative">
// // //              <CTASection />
// // //         </RevealSection>

// // //         {/* SECTION 6: COMMUNITY (Reviews) */}
// // //         <section className="relative py-24 bg-dark-900 border-t border-white/5">
// // //            <CommunityFeedback />
// // //         </section>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- SUB-COMPONENT: ANIMATED SEPARATOR ---
// // // const NebulaSeparator = ({ direction = "right" }) => {
// // //   return (
// // //     <div className="relative w-full h-px my-12 md:my-24 pointer-events-none overflow-visible">
// // //        {/* The glowing line */}
// // //        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-glow/30 to-transparent" />
       
// // //        {/* The Energy Pulse */}
// // //        <motion.div 
// // //          animate={{ x: direction === "right" ? ["-100%", "100%"] : ["100%", "-100%"] }}
// // //          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
// // //          className="absolute top-[-1px] left-0 w-[40%] h-[3px] bg-gradient-to-r from-transparent via-brand-glow to-transparent blur-[2px]"
// // //        />
       
// // //        {/* Center Starburst */}
// // //        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-glow/10 rounded-full blur-[40px]" />
// // //     </div>
// // //   );
// // // };

// // // // --- SUB-COMPONENT: REVEAL WRAPPER ---
// // // // Wraps sections to fade/slide them in as you scroll
// // // const RevealSection = ({ children, className }) => {
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, y: 60 }}
// // //       whileInView={{ opacity: 1, y: 0 }}
// // //       viewport={{ once: true, margin: "-100px" }}
// // //       transition={{ duration: 0.8, ease: "easeOut" }}
// // //       className={className}
// // //     >
// // //       {children}
// // //     </motion.div>
// // //   );
// // // };

// // // // --- SUB-COMPONENT: FLOATING GEOMETRY ---
// // // // Purely decorative background elements
// // // const FloatingGeometry = () => {
// // //     return (
// // //         <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
// // //             {/* Element 1: Hexagon */}
// // //             <motion.div 
// // //                 animate={{ y: [0, -40, 0], rotate: [0, 180, 360], opacity: [0.2, 0.5, 0.2] }}
// // //                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// // //                 className="absolute top-[10%] left-[5%] text-brand-glow"
// // //             >
// // //                 <Hexagon size={120} strokeWidth={0.5} />
// // //             </motion.div>

// // //             {/* Element 2: Atom */}
// // //             <motion.div 
// // //                 animate={{ y: [0, 60, 0], rotate: [0, -180, 0], opacity: [0.1, 0.3, 0.1] }}
// // //                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
// // //                 className="absolute top-[40%] right-[5%] text-purple-500"
// // //             >
// // //                 <Atom size={200} strokeWidth={0.5} />
// // //             </motion.div>

// // //             {/* Element 3: Spark */}
// // //             <motion.div 
// // //                 animate={{ scale: [1, 1.5, 1], opacity: [0, 0.4, 0] }}
// // //                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// // //                 className="absolute bottom-[20%] left-[20%] text-white"
// // //             >
// // //                 <Zap size={40} className="blur-sm" />
// // //             </motion.div>
// // //         </div>
// // //     )
// // // }

// // // export default Home;

// // // import React from 'react';
// // // import { motion } from 'framer-motion';

// // // // --- COMPONENTS ---
// // // import Hero from '../components/home/Hero';
// // // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // // import Essence from '../components/home/Essence';
// // // import Process from '../components/home/Process';
// // // import FeaturedProducts from '../components/home/ProductCard'; 
// // // import CTASection from '../components/home/CTASection';
// // // import CommunityFeedback from '../components/home/CommunityFeedback';

// // // const Home = () => {
// // //   return (
// // //     // Removed overflow-x-hidden from main div to prevent scroll-jacking issues
// // //     <div className="relative min-h-screen bg-dark-950 selection:bg-brand-glow selection:text-dark-900">
      
// // //       {/* 1. SIMPLE BACKGROUND SYSTEM (Static for Performance) */}
// // //       <div className="fixed inset-0 pointer-events-none z-0">
// // //          {/* Subtle Noise Texture - Reduced opacity */}
// // //          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
         
// // //          {/* Static Glows (No parallax/transforms) */}
// // //          <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px]" />
// // //          <div className="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[120px]" />
// // //       </div>

// // //       {/* --- MAIN CONTENT --- */}
// // //       <div className="relative z-10">
        
// // //         {/* SECTION 1: HERO (Eagerly loaded) */}
// // //         <section className="relative">
// // //            <Hero />
// // //         </section>

// // //         {/* SECTION 2: SOCIAL PROOF BANNER (Simplified) */}
// // //         <div className="relative z-20 mb-12">
// // //            <div className="border-y border-white/5 bg-dark-900/50 backdrop-blur-sm">
// // //               <InfiniteBanner />
// // //            </div>
// // //         </div>

// // //         {/* SECTION 3: FEATURED PRODUCTS */}
// // //         <StaticReveal className="relative py-16">
// // //            <FeaturedProducts />
// // //         </StaticReveal>

// // //         {/* SECTION 4: THE LAB (Reduced complexity) */}
// // //         <section className="relative py-20">
// // //            <StaticReveal>
// // //               <Essence />
// // //            </StaticReveal>

// // //            <div className="h-16" />

// // //            <StaticReveal>
// // //               <Process />
// // //            </StaticReveal>
// // //         </section>

// // //         {/* SECTION 5: CTA */}
// // //         <StaticReveal className="py-16">
// // //              <CTASection />
// // //         </StaticReveal>

// // //         {/* SECTION 6: COMMUNITY */}
// // //         <section className="relative py-20 bg-dark-900/30 border-t border-white/5">
// // //            <CommunityFeedback />
// // //         </section>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // --- OPTIMIZED REVEAL WRAPPER ---
// // // // Uses a simpler "Fade In" without heavy Y-axis travel or springs
// // // const StaticReveal = ({ children, className }) => {
// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0 }}
// // //       whileInView={{ opacity: 1 }}
// // //       viewport={{ once: true, margin: "-50px" }}
// // //       transition={{ duration: 0.5, ease: "easeOut" }}
// // //       className={className}
// // //     >
// // //       {children}
// // //     </motion.div>
// // //   );
// // // };

// // // export default Home;

// // import React from 'react';
// // import { motion } from 'framer-motion';

// // import PromoCarousel from '../components/home/PromoCarousel';
// // // --- COMPONENTS ---
// // import Hero from '../components/home/Hero';
// // import InfiniteBanner from '../components/home/InfiniteBanner'; 
// // import Essence from '../components/home/Essence';
// // import Process from '../components/home/Process';
// // import FeaturedProducts from '../components/home/ProductCard'; 
// // import CTASection from '../components/home/CTASection';
// // import CommunityFeedback from '../components/home/CommunityFeedback';

// // const Home = () => {
// //   return (
// //     // Base layout: Simple dark background, no heavy noise/overlays
// //     <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-dark-900">
      
// //       <section className="relative z-0">
// //          <PromoCarousel />
// //       </section>

// //       {/* SECTION 1: HERO */}
// //       {/* Kept separate for z-index layering if Hero has its own image */}
// //       <section className="relative">
// //          <Hero />
// //       </section>

// //       {/* SECTION 2: SOCIAL PROOF */}
// //       {/* Simple border-y for separation, removed the rotation/tilt for better rendering */}
// //       <div className="relative z-10 border-y border-white/5 bg-dark-900">
// //           <InfiniteBanner />
// //       </div>

// //       {/* SECTION 3: FEATURED PRODUCTS */}
// //       <section className="py-20 md:py-32 max-w-7xl mx-auto px-4">
// //          <FadeIn>
// //             <FeaturedProducts />
// //          </FadeIn>
// //       </section>

// //       {/* SECTION 4: SCIENCE & PROCESS */}
// //       {/* A subtle change in background color to separate this section visually */}
// //       <section className="py-24 bg-dark-900/50 border-t border-white/5">
// //          <div className="max-w-7xl mx-auto px-4 space-y-24">
// //             <FadeIn>
// //               <Essence />
// //             </FadeIn>
            
// //             <FadeIn>
// //               <Process />
// //             </FadeIn>
// //          </div>
// //       </section>

// //       {/* SECTION 5: CTA */}
// //       <section className="py-20">
// //          <FadeIn>
// //              <CTASection />
// //          </FadeIn>
// //       </section>

// //       {/* SECTION 6: COMMUNITY */}
// //       <section className="py-24 bg-dark-900 border-t border-white/5">
// //          <CommunityFeedback />
// //       </section>

// //     </div>
// //   );
// // };

// // // --- UTILITY: LIGHTWEIGHT FADE ---
// // // A very simple wrapper that triggers once. 
// // // Much lighter than complex scroll hooks.
// // const FadeIn = ({ children }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, margin: "-50px" }} // Triggers slightly before element is in full view
// //       transition={{ duration: 0.6, ease: "easeOut" }}
// //     >
// //       {children}
// //     </motion.div>
// //   );
// // };

// // export default Home;
// import React from 'react';
// import { motion } from 'framer-motion';

// // --- COMPONENTS ---
// // import Hero from '../components/home/Hero'; // <-- Replaced by PromoCarousel
// import PromoCarousel from '../components/home/PromoCarousel';
// import InfiniteBanner from '../components/home/InfiniteBanner'; 
// import Essence from '../components/home/Essence';
// import Process from '../components/home/Process';
// import FeaturedProducts from '../components/home/ProductCard'; 
// import CTASection from '../components/home/CTASection';
// import CommunityFeedback from '../components/home/CommunityFeedback';
// import Hero from '../components/home/Hero';
// import LabPreview from '../components/home/LabPreview';     // <--- NEW: Lab/Science
// import JournalSection from '../components/home/JournalSection'; // <--- NEW: Blog/Articles


// const Home = () => {
//   return (
//     // Base layout: Simple dark background
//     <div className="min-h-screen bg-dark-950 text-white selection:bg-brand-glow selection:text-dark-900">
      
//       {/* SECTION 1: DYNAMIC PROMO BANNER (HERO) */}
//       <section className="relative z-0">
//          <PromoCarousel />
//       </section>

//       <section className="relative ">
//          <Hero />
//       </section>

//       {/* SECTION 2: SOCIAL PROOF */}
//       {/* Added border-t-0 to merge seamlessly with the banner if needed, or keep border */}
//       <div className="relative z-10 border-y border-white/5 bg-dark-900">
//           <InfiniteBanner />
//       </div>

//       {/* SECTION 3: FEATURED PRODUCTS */}
//       <section className="py-20 md:py-32 max-w-7xl mx-auto px-4">
//          <FadeIn>
//             <FeaturedProducts />
//          </FadeIn>
//       </section>

//       {/* SECTION 4: SCIENCE & PROCESS */}
//       <section className="py-24 bg-dark-900/50 border-t border-white/5">
//          <div className="max-w-7xl mx-auto px-4 space-y-24">
//             <FadeIn>
//               <Essence />
//             </FadeIn>
            
//             <FadeIn>
//               <Process />
//             </FadeIn>
//          </div>
//       </section>

//       {/* SECTION 5: CTA */}
//       <section className="py-20">
//          <FadeIn>
//              <CTASection />
//          </FadeIn>
//       </section>

//       {/* SECTION 6: COMMUNITY */}
//       <section className="py-24 bg-dark-900 border-t border-white/5">
//          <CommunityFeedback />
//       </section>

//     </div>
//   );
// };

// // --- UTILITY: LIGHTWEIGHT FADE ---
// const FadeIn = ({ children }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-50px" }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default Home;
// src/pages/Home.jsx

// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
// // import { 
// //   ArrowRight, Zap, ShoppingBag, Activity, ShieldCheck, 
// //   Microscope, Timer, TrendingUp, AlertCircle 
// // } from 'lucide-react';
// // import { supabase } from '../../client/supabaseClient';

// // const DUMMY_IMAGE = "https://via.placeholder.com/600x600/transparent/ffffff?text=Protocol+Alpha";

// // /**
// //  * ------------------------------------------------------------------
// //  * MAIN COMPONENT: Featured Protocols
// //  * ------------------------------------------------------------------
// //  */
// // const FeaturedProducts = () => {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchFeatured = async () => {
// //       // Fetch products marked as 'is_featured'
// //       const { data, error } = await supabase
// //         .from('products')
// //         .select('*, product_variants(*), category:categories(*)')
// //         .eq('is_active', true)
// //         .eq('is_featured', true)
// //         .limit(3); // Fetch a few, but we optimize for 1

// //       if (!error && data) setProducts(data);
// //       setLoading(false);
// //     };
// //     fetchFeatured();
// //   }, []);

// //   if (loading) return null;
// //   if (products.length === 0) return null;

// //   // Decide Layout: If 1 product, use Spotlight. If more, use Grid.
// //   const isSingleFeature = products.length === 1;

// //   return (
// //     <section className="relative py-10 bg-dark-900 overflow-hidden">
      
// //       {/* Background Decor (Grid & Glow) */}
// //       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 pointer-events-none" />
// //       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-glow/5 rounded-full blur-[120px] pointer-events-none" />

// //       <div className="container mx-auto px-4 relative z-10">
        
// //         {/* Section Header */}
// //         <div className="mb-16 text-center">
// //           {/* <motion.div 
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-glow/20 bg-brand-glow/5 mb-6"
// //           >
// //              <Zap size={12} className="text-brand-glow animate-pulse" />
// //              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-glow uppercase">
// //                Featured Protocol
// //              </span>
// //           </motion.div> */}
          
// //           <motion.h2 
// //              initial={{ opacity: 0, scale: 0.9 }}
// //              whileInView={{ opacity: 1, scale: 1 }}
// //              viewport={{ once: true }}
// //              className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase"
// //           >
// //             Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">Performance</span>
// //           </motion.h2>
// //         </div>

// //         {/* --- DYNAMIC RENDER --- */}
// //         {isSingleFeature ? (
// //           <SpotlightStage product={products[0]} />
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //              {products.map(p => <StandardCard key={p.id} product={p} />)}
// //           </div>
// //         )}

// //       </div>
// //     </section>
// //   );
// // };

// // /**
// //  * ------------------------------------------------------------------
// //  * SUB-COMPONENT: Spotlight Stage (The "Futuristic" Single View)
// //  * ------------------------------------------------------------------
// //  */
// // const SpotlightStage = ({ product }) => {
// //   // Logic to get price
// //   const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
// //   const prices = activeVariants.map(v => Number(v.price));
// //   const minPrice = prices.length > 0 ? Math.min(...prices).toFixed(2) : "0.00";
  
// //   // Mouse tracking for "Holographic" tilt effect
// //   const mouseX = useMotionValue(0);
// //   const mouseY = useMotionValue(0);

// //   function handleMouseMove({ currentTarget, clientX, clientY }) {
// //     let { left, top, width, height } = currentTarget.getBoundingClientRect();
// //     mouseX.set(clientX - left - width / 2);
// //     mouseY.set(clientY - top - height / 2);
// //   }

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 40 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ duration: 0.8 }}
// //       onMouseMove={handleMouseMove}
// //       className="relative w-full max-w-6xl mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md group"
// //     >
// //       <div className="grid grid-cols-1 lg:grid-cols-2">
        
// //         {/* LEFT: The Visual Stage */}
// //         <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center p-12 overflow-hidden bg-gradient-to-b from-white/5 to-transparent">
           
// //            {/* Animated Background Rings */}
// //            <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
// //               <div className="w-[300px] h-[300px] border border-brand-glow rounded-full animate-[spin_10s_linear_infinite]" />
// //               <div className="absolute w-[450px] h-[450px] border border-dashed border-white/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
// //            </div>

// //            {/* Floating Product Image */}
// //            <motion.div 
// //              className="relative z-20 w-full max-w-sm"
// //              animate={{ y: [0, -20, 0] }}
// //              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
// //            >
// //               {/* Glow Behind */}
// //               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-glow/20 blur-[80px] rounded-full" />
              
// //               <img 
// //                 src={product.cover_image_url || DUMMY_IMAGE} 
// //                 alt={product.name} 
// //                 className="relative z-10 w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110" 
// //                 loading="lazy"
// //               />
// //            </motion.div>

// //            {/* Scanning Line Effect (On Hover) */}
// //            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-glow/10 to-transparent h-[10%] w-full -translate-y-full group-hover:animate-scan pointer-events-none z-30 opacity-0 group-hover:opacity-100" />
// //         </div>

// //         {/* RIGHT: Data & Specs */}
// //         <div className="p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/10 relative">
           
// //            {/* Header Info */}
// //            <div className="mb-8">
// //               <div className="flex items-center gap-3 mb-4">
// //                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase rounded">
// //                     In Stock
// //                  </span>
// //                  <span className="px-3 py-1 bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase rounded flex items-center gap-1">
// //                     <ShieldCheck size={12} /> Lab Verified
// //                  </span>
// //               </div>
// //               <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase mb-4 leading-[0.9]">
// //                  {product.name}
// //               </h1>
// //               <p className="text-lg text-slate-400 font-light leading-relaxed border-l-2 border-white/10 pl-4">
// //                  {product.tagline || product.description?.substring(0, 100) + '...'}
// //               </p>
// //            </div>

// //            {/* Tech Specs Grid (Seller Perspective: Show why it's good) */}
// //            <div className="grid grid-cols-2 gap-4 mb-8">
// //               <SpecBox icon={Activity} label="Potency" value={product.potency || "High"} />
// //               <SpecBox icon={Timer} label="Onset" value="15-20 Min" />
// //               <SpecBox icon={Microscope} label="Purity" value="99.8%" />
// //               <SpecBox icon={TrendingUp} label="Effect" value="Focus" />
// //            </div>

// //            {/* Price & Action */}
// //            <div className="mt-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
// //               <div>
// //                  <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Starting At</p>
// //                  <div className="text-4xl font-mono font-bold text-white">${minPrice}</div>
// //               </div>
              
// //               <Link to={`/shop/${product.slug}`} className="w-full sm:w-auto">
// //                  <button className="w-full relative px-8 py-4 bg-brand-glow text-dark-900 font-bold text-sm tracking-widest uppercase rounded-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(14,165,233,0.3)] hover:shadow-[0_0_50px_rgba(14,165,233,0.5)] overflow-hidden group/btn">
// //                     <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
// //                     <span className="relative flex items-center justify-center gap-3">
// //                        View Product <ArrowRight size={18} />
// //                     </span>
// //                  </button>
// //               </Link>
// //            </div>

// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // /**
// //  * ------------------------------------------------------------------
// //  * SUB-COMPONENT: Spec Box (For the Grid)
// //  * ------------------------------------------------------------------
// //  */
// // const SpecBox = ({ icon: Icon, label, value }) => (
// //    <div className="bg-dark-950/50 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-brand-glow/30 transition-colors group">
// //       <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-glow group-hover:bg-brand-glow/10 transition-colors">
// //          <Icon size={20} />
// //       </div>
// //       <div>
// //          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{label}</div>
// //          <div className="text-white font-bold font-mono">{value}</div>
// //       </div>
// //    </div>
// // );


// // /**
// //  * ------------------------------------------------------------------
// //  * SUB-COMPONENT: Standard Card (Fallback for multiple products)
// //  * ------------------------------------------------------------------
// //  */
// // const StandardCard = ({ product }) => {
// //    const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
// //    const minPrice = activeVariants.length > 0 ? Math.min(...activeVariants.map(v => Number(v.price))).toFixed(2) : "0.00";

// //    return (
// //       <Link to={`/product/${product.slug}`} className="group relative block h-full">
// //          <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-brand-glow/50 transition-colors flex flex-col">
// //             <div className="relative aspect-[4/5] bg-dark-950/50 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
// //                <div className="absolute inset-0 bg-gradient-to-tr from-brand-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
// //                <img 
// //                   src={product.cover_image_url || DUMMY_IMAGE} 
// //                   alt={product.name} 
// //                   className="relative z-10 w-3/4 h-auto object-contain transition-transform duration-500 group-hover:scale-110" 
// //                   loading="lazy"
// //                />
// //             </div>
// //             <div className="mt-auto">
// //                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brand-glow transition-colors">{product.name}</h3>
// //                <div className="flex items-center justify-between pt-4 border-t border-white/10">
// //                   <span className="text-brand-glow font-mono text-lg font-bold">${minPrice}</span>
// //                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-brand-glow group-hover:text-dark-900 transition-colors">
// //                      <ArrowRight size={14} />
// //                   </div>
// //                </div>
// //             </div>
// //          </div>
// //       </Link>
// //    );
// // };

// // export default FeaturedProducts;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { supabase } from '../../client/supabaseClient';

// const DUMMY_IMAGE = "https://placehold.co/400x600/png"; // Fallback

// const FeaturedProducts = () => {
//   const [variants, setVariants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVariants = async () => {
//       // Fetch all active variants. 
//       // Assumption: You want to show the specific flavors of your single product.
//       const { data, error } = await supabase
//         .from('product_variants')
//         .select('*')
//         .eq('is_active', true)
//         .order('price', { ascending: true }); // Or order by SKU/Name

//       if (!error && data) setVariants(data);
//       setLoading(false);
//     };
//     fetchVariants();
    
//   }, []);

//   console.log(variants);
//   if (loading) return null;

//   // Helper to format SKU into a readable Name (since we don't have a 'name' column in variants yet)
//   // Example SKU: "7OH--BLUE-RAZZ" -> "Blue Razz"
//   const formatName = (sku) => {
//     if (!sku) return "Unknown Flavor";
//     const parts = sku.split('--');
//     if (parts.length > 1) {
//       // Remove generic codes, replace hyphens with spaces
//       return parts[1].replace(/_/g, ' ').replace(/-/g, ' '); 
//     }
//     return sku;
//   };

//   return (
//     <section className="relative w-full max-w-7xl mx-auto px-4 z-10">
      
//       {/* Optional Header - Keep it minimal */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
//           Choose Your <span className="text-brand-glow">Flavor</span>
//         </h2>
//         <p className="text-slate-400 mt-4 max-w-lg mx-auto">
//           Premium hemp-derived cannabinoids. Select a profile below.
//         </p>
//       </div>

//       {/* THE GRID: Matches the clean 3-4 column layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {variants.map((variant, index) => (
//           <VariantCard 
//             key={variant.id} 
//             variant={variant} 
//             idx={index}
//             name={formatName(variant.sku)} 
//           />
//         ))}
//       </div>

//     </section>
//   );
// };

// const VariantCard = ({ variant, name, idx }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: idx * 0.1, duration: 0.5 }}
//       className="group relative flex flex-col h-full"
//     >
//       {/* CARD CONTAINER */}
//       {/* We use a very dark background with a subtle border, mimicking the reference */}
//       <div className="flex-1 bg-dark-900 border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-glow/30 hover:bg-white/5 hover:-translate-y-2 hover:shadow-2xl">
        
//         {/* 1. TITLE (Top) */}
//         <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">
//           {name}
//         </h3>
//         <p className="text-sm text-brand-glow font-mono font-medium mb-6">
//            ${variant.price}
//         </p>

//         {/* 2. IMAGE (Middle - Tall & Clean) */}
//         <div className="relative w-full aspect-[3/4] mb-8 flex items-center justify-center">
//            {/* Subtle glow behind image on hover */}
//            <div className="absolute inset-0 bg-brand-glow/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
           
//            <img 
//             src={variant.image_url || DUMMY_IMAGE} 
//             alt={name}
//             className="relative z-10 w-full h-full object-contain drop-shadow-xl transform transition-transform duration-500 group-hover:scale-110"
//            />
//         </div>

//         {/* 3. BUTTON (Bottom) */}
//         {/* Using a pill shape button like the reference */}
//         <div className="w-full mt-auto">
//           <Link to={`/product/${variant.product_id}?variant=${variant.id}`}>
//             <button className="w-full py-3.5 px-6 bg-dark-950 text-white font-bold text-sm uppercase tracking-widest rounded-full border border-white/10 hover:bg-brand-glow hover:text-dark-950 hover:border-brand-glow transition-all active:scale-95">
//               Shop Now
//             </button>
//           </Link>
//         </div>

//       </div>
//     </motion.div>
//   );
// };

// export default FeaturedProducts;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// // // // // import { ArrowRight, Sparkles, Loader2, Star, Zap } from 'lucide-react';
// // // // // import { Link } from 'react-router-dom';
// // // // // import { heroApi } from '../../api/heroApi';

// // // // // const Hero = () => {
// // // // //   const [data, setData] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   // --- PARALLAX PHYSICS ---
// // // // //   const { scrollY } = useScroll();
// // // // //   const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
// // // // //   // Parallax Values
// // // // //   const yText = useSpring(useTransform(scrollY, [0, 500], [0, 150]), springConfig);
// // // // //   const yMain = useSpring(useTransform(scrollY, [0, 500], [0, 50]), springConfig);
// // // // //   const yFront = useSpring(useTransform(scrollY, [0, 500], [0, -80]), springConfig); // Moves Up fast
// // // // //   const yBack = useSpring(useTransform(scrollY, [0, 500], [0, 30]), springConfig);   // Moves Down slow
// // // // //   const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);

// // // // //   useEffect(() => {
// // // // //     const loadHero = async () => {
// // // // //       try {
// // // // //         const heroData = await heroApi.getActiveHero();
// // // // //         if (heroData) setData(heroData);
// // // // //       } catch (e) {
// // // // //         console.error("Hero load failed", e);
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };
// // // // //     loadHero();
// // // // //     console.log(data,"heroapi response");
// // // // //   }, []);

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="h-screen w-full bg-dark-950 flex items-center justify-center">
// // // // //          <Loader2 className="animate-spin text-brand-glow" size={32} />
// // // // //       </div>
// // // // //     );
// // // // //   }
// // // // //   console.log(data,"raw data of the api response");
// // // // //   // --- DATA ---
// // // // //   const content = data || {
// // // // //     headline: "Elevate Your Experience",
// // // // //     subheadline: "Pure. Precise. Cloud7.",
// // // // //     cta_text: "EXPLORE COLLECTION",
// // // // //     cta_link: "/shop",
// // // // //     glow_color: "#0ea5e9",
// // // // //     hero_images: []
// // // // //   };

// // // // //   // Safe Image Handling (Ensures 4 slots)
// // // // //   const rawImages = content.hero_images?.length > 0 
// // // // //     ? content.hero_images 
// // // // //     : (content.hero_image_url ? [content.hero_image_url] : []);
// // // // //   const images = [...rawImages, null, null, null, null].slice(0, 4); 
// // // // //   const hasMultipleImages = rawImages.length > 1;

// // // // //   return (
// // // // //     <div className="relative bg-dark-950 overflow-hidden min-h-screen">
      
// // // // //       {/* 1. TOP TICKER */}
// // // // //       {/* <TopTicker /> */}

// // // // //       {/* 2. BACKGROUND: AURORA SYSTEM */}
// // // // //       <div className="absolute inset-0 z-0 pointer-events-none">
// // // // //         <AuroraBackground baseColor={content.glow_color} />
// // // // //         {/* Texture Overlay */}
// // // // //         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
// // // // //         {/* Bottom Fade to blend with next section */}
// // // // //         <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-dark-950 to-transparent" />
// // // // //       </div>

// // // // //       {/* 3. MAIN CONTENT */}
// // // // //       <section className="relative z-10 w-full min-h-[110vh] flex flex-col items-center pt-32 pb-20">
        
// // // // //         {/* A. TEXT LAYER */}
// // // // //         <motion.div 
// // // // //           style={{ y: yText, opacity: opacityFade }}
// // // // //           className="container mx-auto px-5 text-center max-w-5xl relative z-20 mb-4"
// // // // //         >
// // // // //           {/* Badge */}
// // // // //           <motion.div 
// // // // //             // initial={{ opacity: 0, y: -20 }}
// // // // //             // animate={{ opacity: 1, y: 0 }}
// // // // //             // transition={{ duration: 0.8 }}
// // // // //             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_20px_rgba(14,165,233,0.3)] mb-8"
// // // // //           >
// // // // //             <Sparkles size={12} className="text-brand-glow animate-pulse" />
// // // // //             <span className="text-[5px] font-bold tracking-[0.25em] text-white uppercase">
// // // // //               Next Generation Potency
// // // // //             </span>
// // // // //           </motion.div>

// // // // //           {/* Headline */}
// // // // //           <motion.h1 
// // // // //             // initial={{ opacity: 0, scale: 0.9 }}
// // // // //             // animate={{ opacity: 1, scale: 1 }}
// // // // //             // transition={{ duration: 1, ease: "easeOut" }}
// // // // //             className="text-6l md:text-7xl lg:text-9l font-black tracking-tighter leading-[0.85] text-white mb-6 drop-shadow-2xl"
// // // // //           >
// // // // //             {content.headline}
// // // // //           </motion.h1>

// // // // //           {/* Subheadline */}
// // // // //           {/* <motion.p 
// // // // //             initial={{ opacity: 0 }}
// // // // //             animate={{ opacity: 1 }}
// // // // //             transition={{ delay: 0.3, duration: 1 }}
// // // // //             className="text-lg md:text-2xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md"
// // // // //           >
// // // // //             {content.subheadline}
// // // // //           </motion.p> */}
// // // // //         </motion.div>

// // // // //         {/* B. 3D PRODUCT STAGE */}
// // // // //         <div className="relative w-full h-[600px] md:h-[800px] perspective-[2000px] my-5  flex items-center justify-center -mt-12 md:-mt-24 pointer-events-none">
            
// // // // //             {hasMultipleImages ? (
// // // // //               <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                  
// // // // //                   {/* --- IMAGE 3: BACK LEFT (Blurry, Distant) --- */}
// // // // //                   <ProductLayer 
// // // // //                     src={images[3]}
// // // // //                     y={yBack}
// // // // //                     className="absolute top-[10%] left-[5%] md:left-[15%] w-[180px] md:w-[250px] z-0 blur-[4px] opacity-60 grayscale-[20%] rotate-[-12deg]"
// // // // //                     floatConfig={{ duration: 7, y: [-15, 15, -15], rotate: [-12, -15, -12] }}
// // // // //                   />

// // // // //                   {/* --- IMAGE 1: BACK RIGHT (Semi-Blurry) --- */}
// // // // //                   <ProductLayer 
// // // // //                     src={images[1]}
// // // // //                     y={yBack}
// // // // //                     className="absolute top-[20%] right-[5%] md:right-[15%] w-[200px] md:w-[300px] z-10 blur-[2px] opacity-80 rotate-[12deg]"
// // // // //                     floatConfig={{ duration: 8, delay: 1, y: [-20, 20, -20], rotate: [12, 10, 12] }}
// // // // //                   />

// // // // //                   {/* --- IMAGE 0: MAIN HERO (Center, Sharp, Glowing) --- */}
// // // // //                   {/* Note: This is the anchor */}
// // // // //                   <ProductLayer 
// // // // //                     src={images[0]}
// // // // //                     y={yMain}
// // // // //                     className="relative z-20 w-[300px] md:w-[500px] lg:w-[550px] drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)] filter brightness-110"
// // // // //                     floatConfig={{ duration: 6, y: [-10, 10, -10] }} // Gentle bob
// // // // //                   />

// // // // //                   {/* --- IMAGE 2: FRONT LEFT (Very Sharp, Close Up, Fast Move) --- */}
// // // // //                   <ProductLayer 
// // // // //                     src={images[2]}
// // // // //                     y={yFront}
// // // // //                     className="absolute bottom-[15%] left-[10%] md:left-[20%] w-[150px] md:w-[280px] z-30 drop-shadow-2xl rotate-[-6deg]"
// // // // //                     floatConfig={{ duration: 5, delay: 0.5, y: [0, -30, 0], rotate: [-6, -3, -6] }}
// // // // //                   />

// // // // //               </div>
// // // // //             ) : (
// // // // //               // Fallback for single image
// // // // //               <ProductLayer 
// // // // //                 src={images[0]}
// // // // //                 y={yMain}
// // // // //                 className="z-20 w-full max-w-md md:max-w-xl object-contain drop-shadow-[0_35px_60px_rgba(14,165,233,0.3)]"
// // // // //                 floatConfig={{ duration: 6, y: [-15, 15, -15] }}
// // // // //               />
// // // // //             )}
// // // // //         </div>

// // // // //         {/* C. CTA BUTTON */}
// // // // //         <motion.div
// // // // //             initial={{ opacity: 0, y: 50 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             transition={{ delay: 0.6, duration: 0.8 }}
// // // // //             className="relative z-50 -mt-32 md:-mt-48"
// // // // //         >
// // // // //             <Link 
// // // // //               to={content.cta_link} 
// // // // //               className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-brand-glow/90 rounded-2xl hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(14,165,233,0.5)] hover:shadow-[0_0_60px_-10px_rgba(14,165,233,0.8)] backdrop-blur-md"
// // // // //             >
// // // // //               <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
// // // // //               <span className="relative flex items-center gap-3 tracking-widest uppercase text-sm md:text-base text-dark-950 font-black">
// // // // //                   {content.cta_text} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
// // // // //               </span>
// // // // //             </Link>
// // // // //         </motion.div>

// // // // //       </section>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // /* -------------------------------------------------------------------------- */
// // // // // /* SUB COMPONENTS                              */
// // // // // /* -------------------------------------------------------------------------- */

// // // // // // 1. TOP TICKER
// // // // // // const TopTicker = () => {
// // // // // //    return (
// // // // // //       <div className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/5 h-10 flex items-center overflow-hidden">
// // // // // //          <motion.div 
// // // // // //             className="flex items-center gap-12 whitespace-nowrap min-w-full"
// // // // // //             animate={{ x: ["0%", "-50%"] }}
// // // // // //             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
// // // // // //          >
// // // // // //             {[...Array(10)].map((_, i) => (
// // // // // //                <React.Fragment key={i}>
// // // // // //                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-glow flex items-center gap-2">
// // // // // //                      <Zap size={12} className="fill-brand-glow" /> 
// // // // // //                      Potency Redefined
// // // // // //                   </span>
// // // // // //                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/50 flex items-center gap-2">
// // // // // //                      <Star size={12} /> 
// // // // // //                      Lab Tested & Verified
// // // // // //                   </span>
// // // // // //                </React.Fragment>
// // // // // //             ))}
// // // // // //          </motion.div>
// // // // // //       </div>
// // // // // //    );
// // // // // // };

// // // // // // 2. PRODUCT LAYER (Handles Parallax + Idle Float)
// // // // // const ProductLayer = ({ src, className, floatConfig, y }) => {
// // // // //   if (!src) return null; 

// // // // //   return (
// // // // //     <motion.div
// // // // //       style={{ y }} // Scroll Parallax
// // // // //       className={`absolute ${className}`} 
// // // // //       initial={{ opacity: 0, scale: 0.8 }}
// // // // //       animate={{ opacity: className.includes('opacity') ? undefined : 1, scale: 1 }}
// // // // //       transition={{ duration: 1.5, ease: "easeOut" }}
// // // // //     >
// // // // //        {/* Idle Floating Animation nested inside */}
// // // // //        <motion.img 
// // // // //          src={src} 
// // // // //          alt="Cloud7 Product" 
// // // // //          className="w-full h-auto object-contain"
// // // // //          animate={{ 
// // // // //             y: floatConfig?.y || [0, -10, 0],
// // // // //             rotate: floatConfig?.rotate || [0, 0, 0]
// // // // //          }}
// // // // //          transition={{ 
// // // // //             duration: floatConfig?.duration || 5, 
// // // // //             delay: floatConfig?.delay || 0,
// // // // //             repeat: Infinity, 
// // // // //             ease: "easeInOut" 
// // // // //          }}
// // // // //        />
// // // // //     </motion.div>
// // // // //   );
// // // // // };

// // // // // // 3. AURORA BACKGROUND (Colorful & Beautiful)
// // // // // const AuroraBackground = ({ baseColor }) => {
// // // // //   const color1 = baseColor || '#0ea5e9'; // Brand Glow (Cyan)
// // // // //   const color2 = '#7c3aed'; // Deep Purple
// // // // //   const color3 = '#1d4ed8'; // Royal Blue

// // // // //   return (
// // // // //     <div className="absolute inset-0 overflow-hidden bg-dark-950">
       
// // // // //        {/* Blob 1: Top Left (Brand Color) */}
// // // // //        <motion.div 
// // // // //          className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full blur-[120px] opacity-30 mix-blend-screen"
// // // // //          style={{ backgroundColor: color1 }}
// // // // //          animate={{ 
// // // // //             scale: [1, 1.2, 1],
// // // // //             rotate: [0, 45, 0],
// // // // //             x: [0, 50, 0]
// // // // //          }}
// // // // //          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
// // // // //        />

// // // // //        {/* Blob 2: Bottom Right (Purple) */}
// // // // //        <motion.div 
// // // // //          className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[100px] opacity-25 mix-blend-screen"
// // // // //          style={{ backgroundColor: color2 }}
// // // // //          animate={{ 
// // // // //             scale: [1, 1.3, 1],
// // // // //             x: [0, -60, 0],
// // // // //             y: [0, 30, 0]
// // // // //          }}
// // // // //          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
// // // // //        />

// // // // //        {/* Blob 3: Center/Moving (Blue) */}
// // // // //        <motion.div 
// // // // //          className="absolute top-[40%] left-[30%] w-[50vw] h-[50vw] rounded-full blur-[140px] opacity-20 mix-blend-screen"
// // // // //          style={{ backgroundColor: color3 }}
// // // // //          animate={{ 
// // // // //             x: [-40, 40, -40],
// // // // //             y: [-40, 40, -40],
// // // // //             scale: [1, 1.1, 1]
// // // // //          }}
// // // // //          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
// // // // //        />

// // // // //        {/* Radial Gradient Overlay (Vignette) */}
// // // // //        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Hero;
// // // // import React, { useEffect, useState, useRef } from 'react';
// // // // import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// // // // import { ArrowRight, ChevronRight, Play } from 'lucide-react';
// // // // import { Link } from 'react-router-dom';
// // // // import { heroApi } from '../../api/heroApi';

// // // // // --- CONFIG ---
// // // // const AUTO_ROTATE_MS = 5000;

// // // // const Hero = () => {
// // // //   const [data, setData] = useState(null);
// // // //   const [activeImgIndex, setActiveImgIndex] = useState(0);
// // // //   const [isHovering, setIsHovering] = useState(false);
// // // //   const [imagesLoaded, setImagesLoaded] = useState(false);
  
// // // //   // Parallax Physics
// // // //   const { scrollY } = useScroll();
// // // //   const yContent = useTransform(scrollY, [0, 500], [0, 100]);
// // // //   const opacityFade = useTransform(scrollY, [0, 400], [1, 0]);
// // // //   const scaleImage = useTransform(scrollY, [0, 500], [1, 1.1]);

// // // //   useEffect(() => {
// // // //     const loadHero = async () => {
// // // //       try {
// // // //         const result = await heroApi.getActiveHero();
// // // //         if (result) setData(result);
// // // //       } catch (err) {
// // // //         console.error("Hero Error:", err);
// // // //       }
// // // //     };
// // // //     loadHero();
// // // //   }, []);

// // // //   // Auto-Rotate Logic (stops on hover)
// // // //   useEffect(() => {
// // // //     if (!data?.hero_images || data.hero_images.length <= 1 || isHovering) return;

// // // //     const timer = setInterval(() => {
// // // //       setActiveImgIndex((prev) => (prev + 1) % data.hero_images.length);
// // // //     }, AUTO_ROTATE_MS);

// // // //     return () => clearInterval(timer);
// // // //   }, [data, isHovering]);

// // // //   // Fallback / Loading
// // // //   if (!data) return <div className="h-screen bg-dark-950" />;

// // // //   // Determine active assets
// // // //   // Prefer the array 'hero_images', fallback to single 'hero_image_url'
// // // //   const gallery = (data.hero_images && data.hero_images.length > 0) 
// // // //     ? data.hero_images 
// // // //     : [data.hero_image_url];
  
// // // //   const activeImage = gallery[activeImgIndex];
// // // //   const glowColor = data.glow_color || '#0ea5e9'; // Fallback blue

// // // //   return (
// // // //     <section 
// // // //       className="relative w-full h-[95vh] min-h-[700px] overflow-hidden bg-dark-950 flex flex-col items-center justify-center"
// // // //       onMouseEnter={() => setIsHovering(true)}
// // // //       onMouseLeave={() => setIsHovering(false)}
// // // //     >
      
// // // //       {/* 1. ATMOSPHERIC GLOW (Dynamic based on DB color) */}
// // // //       <div 
// // // //         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 transition-colors duration-1000 ease-in-out pointer-events-none"
// // // //         style={{ backgroundColor: glowColor }}
// // // //       />
      
// // // //       {/* 2. BACKGROUND TEXTURE (Grid + Noise) */}
// // // //       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none opacity-50" />
// // // //       <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />


// // // //       {/* 3. MAIN CONTENT LAYER */}
// // // //       <motion.div 
// // // //         style={{ opacity: opacityFade, y: yContent }}
// // // //         className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center md:justify-between"
// // // //       >
        
// // // //         {/* LEFT: TEXT CONTENT */}
// // // //         <div className="w-full md:w-5/12 text-center md:text-left order-2 md:order-1 mt-8 md:mt-0">
          
// // // //           {/* Subheadline (Technical Tag) */}
// // // //           <motion.div 
// // // //             initial={{ opacity: 0, x: -20 }}
// // // //             animate={{ opacity: 1, x: 0 }}
// // // //             transition={{ delay: 0.2 }}
// // // //             className="flex items-center justify-center md:justify-start gap-3 mb-6"
// // // //           >
// // // //             <span className="w-8 h-[1px] bg-brand-glow/50" />
// // // //             <span className="text-brand-glow text-xs font-mono tracking-[0.3em] uppercase">
// // // //               {data.subheadline}
// // // //             </span>
// // // //           </motion.div>

// // // //           {/* Headline (Big Impact) */}
// // // //           <motion.h1 
// // // //             initial={{ opacity: 0, y: 20 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: 0.3, duration: 0.8 }}
// // // //             className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
// // // //           >
// // // //             {data.headline.split(' ').map((word, i) => (
// // // //               <span key={i} className="block">{word}</span>
// // // //             ))}
// // // //           </motion.h1>

// // // //           {/* CTA Button */}
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: 1 }}
// // // //             transition={{ delay: 0.5 }}
// // // //           >
// // // //             <Link to={data.cta_link} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-dark-950 font-bold uppercase tracking-wider text-sm overflow-hidden rounded-full hover:scale-105 transition-transform duration-300">
// // // //               <span className="relative z-10">{data.cta_text}</span>
// // // //               <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
// // // //               {/* Button Hover Glow */}
// // // //               <div 
// // // //                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// // // //                 style={{ backgroundColor: glowColor, mixBlendMode: 'color' }}
// // // //               />
// // // //             </Link>
// // // //           </motion.div>
// // // //         </div>


// // // //         {/* RIGHT: IMAGE GALLERY STAGE */}
// // // //         <div className="w-full md:w-7/12 h-[50vh] md:h-[70vh] relative order-1 md:order-2 flex items-center justify-center perspective-1000">
          
// // // //           {/* Active Image Render */}
// // // //           <AnimatePresence mode="wait">
// // // //              <motion.img
// // // //                 key={activeImgIndex} // Key change triggers animation
// // // //                 src={activeImage}
// // // //                 alt="Hero Product"
// // // //                 initial={{ opacity: 0, scale: 0.9, rotateY: 10, filter: 'blur(10px)' }}
// // // //                 animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
// // // //                 exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
// // // //                 transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
// // // //                 style={{ scale: scaleImage }}
// // // //                 className="relative z-20 max-h-full w-auto object-contain drop-shadow-2xl"
// // // //              />
// // // //           </AnimatePresence>

// // // //           {/* Image Navigation Dots / Thumbnails (Desktop Only) */}
// // // //           {gallery.length > 1 && (
// // // //              <div className="absolute bottom-0 right-0 md:right-12 z-30 flex items-center gap-4 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/5">
// // // //                 {gallery.map((img, idx) => (
// // // //                   <button
// // // //                     key={idx}
// // // //                     onClick={() => setActiveImgIndex(idx)}
// // // //                     className={`relative w-12 h-12 rounded-full overflow-hidden border transition-all duration-300 ${
// // // //                         idx === activeImgIndex 
// // // //                         ? 'border-brand-glow scale-110 opacity-100' 
// // // //                         : 'border-transparent opacity-50 hover:opacity-100'
// // // //                     }`}
// // // //                   >
// // // //                      <img src={img} className="w-full h-full object-cover" alt="thumb" />
// // // //                   </button>
// // // //                 ))}
// // // //              </div>
// // // //           )}

// // // //         </div>

// // // //       </motion.div>


// // // //       {/* 4. BOTTOM GRADIENT (Seamless Blend) */}
// // // //       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent z-[2]" />
      
// // // //     </section>
// // // //   );
// // // // };

// // // // export default Hero;
// // // import React, { useEffect, useState } from 'react';
// // // import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// // // import { ArrowRight } from 'lucide-react';
// // // import { Link } from 'react-router-dom';
// // // import { heroApi } from '../../api/heroApi';

// // // // --- CONFIG ---
// // // const AUTO_ROTATE_MS = 5000;

// // // const Hero = () => {
// // //   const [data, setData] = useState(null);
// // //   const [activeImgIndex, setActiveImgIndex] = useState(0);
// // //   const [isHovering, setIsHovering] = useState(false);
  
// // //   // --- FIXED PARALLAX PHYSICS ---
// // //   const { scrollY } = useScroll();
  
// // //   // 1. Content moves down slightly (Parallax)
// // //   const yContent = useTransform(scrollY, [0, 1000], [0, 200]);
  
// // //   // 2. FIXED: Opacity now fades much later (starts at 500px, ends at 900px)
// // //   // This ensures it stays visible until the next section actually covers it.
// // //   const opacityFade = useTransform(scrollY, [0, 500, 900], [1, 1, 0]);
  
// // //   // 3. Image scales up slightly
// // //   const scaleImage = useTransform(scrollY, [0, 1000], [1, 1.1]);

// // //   useEffect(() => {
// // //     const loadHero = async () => {
// // //       try {
// // //         const result = await heroApi.getActiveHero();
// // //         if (result) setData(result);
// // //       } catch (err) {
// // //         console.error("Hero Error:", err);
// // //       }
// // //     };
// // //     loadHero();
// // //   }, []);

// // //   // Auto-Rotate Logic
// // //   useEffect(() => {
// // //     if (!data?.hero_images || data.hero_images.length <= 1 || isHovering) return;

// // //     const timer = setInterval(() => {
// // //       setActiveImgIndex((prev) => (prev + 1) % data.hero_images.length);
// // //     }, AUTO_ROTATE_MS);

// // //     return () => clearInterval(timer);
// // //   }, [data, isHovering]);

// // //   if (!data) return <div className="h-screen bg-dark-950" />;

// // //   const gallery = (data.hero_images && data.hero_images.length > 0) 
// // //     ? data.hero_images 
// // //     : [data.hero_image_url];
  
// // //   const activeImage = gallery[activeImgIndex];
// // //   const glowColor = data.glow_color || '#0ea5e9'; 

// // //   return (
// // //     <section 
// // //       className="relative w-full h-[95vh] min-h-[700px] overflow-hidden bg-dark-950 flex flex-col items-center justify-center"
// // //       onMouseEnter={() => setIsHovering(true)}
// // //       onMouseLeave={() => setIsHovering(false)}
// // //     >
      
// // //       {/* 1. ATMOSPHERIC GLOW (Fixed Background - No Parallax on this to keep it stable) */}
// // //       <div 
// // //         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-20 transition-colors duration-1000 ease-in-out pointer-events-none"
// // //         style={{ backgroundColor: glowColor }}
// // //       />
      
// // //       {/* 2. BACKGROUND TEXTURE */}
// // //       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none opacity-50" />
// // //       <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

// // //       {/* 3. MAIN CONTENT LAYER (With Fixed Parallax) */}
// // //       <motion.div 
// // //         style={{ opacity: opacityFade, y: yContent }}
// // //         className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col md:flex-row items-center md:justify-between"
// // //       >
        
// // //         {/* LEFT: TEXT CONTENT */}
// // //         <div className="w-full md:w-5/12 text-center md:text-left order-2 md:order-1 mt-8 md:mt-0 relative z-20">
          
// // //           {/* Subheadline */}
// // //           <motion.div 
// // //             initial={{ opacity: 0, x: -20 }}
// // //             animate={{ opacity: 1, x: 0 }}
// // //             transition={{ delay: 0.2 }}
// // //             className="flex items-center justify-center md:justify-start gap-3 mb-6"
// // //           >
// // //             <span className="w-8 h-[1px] bg-brand-glow/50" />
// // //             <span className="text-brand-glow text-xs font-mono tracking-[0.3em] uppercase">
// // //               {data.subheadline}
// // //             </span>
// // //           </motion.div>

// // //           {/* Headline */}
// // //           <motion.h1 
// // //             initial={{ opacity: 0, y: 20 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             transition={{ delay: 0.3, duration: 0.8 }}
// // //             className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
// // //           >
// // //             {data.headline.split(' ').map((word, i) => (
// // //               <span key={i} className="block">{word}</span>
// // //             ))}
// // //           </motion.h1>

// // //           {/* CTA Button */}
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: 1 }}
// // //             transition={{ delay: 0.5 }}
// // //           >
// // //             <Link to={data.cta_link} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-dark-950 font-bold uppercase tracking-wider text-sm overflow-hidden rounded-full hover:scale-105 transition-transform duration-300">
// // //               <span className="relative z-10">{data.cta_text}</span>
// // //               <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
// // //               <div 
// // //                 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// // //                 style={{ backgroundColor: glowColor, mixBlendMode: 'color' }}
// // //               />
// // //             </Link>
// // //           </motion.div>
// // //         </div>

// // //         {/* RIGHT: IMAGE GALLERY STAGE */}
// // //         <div className="w-full md:w-7/12 h-[50vh] md:h-[70vh] relative order-1 md:order-2 flex items-center justify-center perspective-1000">
          
// // //           <AnimatePresence mode="wait">
// // //              <motion.img
// // //                 key={activeImgIndex} 
// // //                 src={activeImage}
// // //                 alt="Hero Product"
// // //                 initial={{ opacity: 0, scale: 0.9, rotateY: 10, filter: 'blur(10px)' }}
// // //                 animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
// // //                 exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
// // //                 transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
// // //                 style={{ scale: scaleImage }}
// // //                 className="relative z-20 max-h-full w-auto object-contain drop-shadow-2xl"
// // //              />
// // //           </AnimatePresence>

// // //           {/* Thumbnails */}
// // //           {gallery.length > 1 && (
// // //              <div className="absolute bottom-0 right-0 md:right-12 z-30 flex items-center gap-4 bg-black/20 backdrop-blur-md p-2 rounded-full border border-white/5">
// // //                 {gallery.map((img, idx) => (
// // //                   <button
// // //                     key={idx}
// // //                     onClick={() => setActiveImgIndex(idx)}
// // //                     className={`relative w-12 h-12 rounded-full overflow-hidden border transition-all duration-300 ${
// // //                         idx === activeImgIndex 
// // //                         ? 'border-brand-glow scale-110 opacity-100' 
// // //                         : 'border-transparent opacity-50 hover:opacity-100'
// // //                     }`}
// // //                   >
// // //                      <img src={img} className="w-full h-full object-cover" alt="thumb" />
// // //                   </button>
// // //                 ))}
// // //              </div>
// // //           )}

// // //         </div>

// // //       </motion.div>

// // //       {/* 4. BOTTOM GRADIENT */}
// // //       <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark-950 to-transparent z-[2]" />
      
// // //     </section>
// // //   );
// // // };

// // // export default Hero;
// // // import React, { useEffect, useState } from 'react';
// // // import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// // // import { ArrowRight, ChevronRight, ChevronLeft, Minus } from 'lucide-react';
// // // import { Link } from 'react-router-dom';
// // // import { heroApi } from '../../api/heroApi';

// // // // --- CONFIGURATION ---
// // // const AUTO_ROTATE_MS = 6000;

// // // const Hero = () => {
// // //   const [data, setData] = useState(null);
// // //   const [activeImgIndex, setActiveImgIndex] = useState(0);
// // //   const [isHovering, setIsHovering] = useState(false);

// // //   // --- PARALLAX (Movement Only, No Opacity Fade) ---
// // //   const { scrollY } = useScroll();
  
// // //   // The background moves slightly slower than scroll (Depth)
// // //   const yBackground = useTransform(scrollY, [0, 1000], [0, 150]);
  
// // //   // The text moves slightly faster (Parallax foreground)
// // //   const yText = useTransform(scrollY, [0, 1000], [0, -50]);

// // //   useEffect(() => {
// // //     const loadHero = async () => {
// // //       try {
// // //         const result = await heroApi.getActiveHero();
// // //         if (result) setData(result);
// // //       } catch (err) {
// // //         console.error("Hero Error:", err);
// // //       }
// // //     };
// // //     loadHero();
// // //   }, []);

// // //   // Auto-Rotate Logic
// // //   useEffect(() => {
// // //     if (!data?.hero_images || data.hero_images.length <= 1 || isHovering) return;
// // //     const timer = setInterval(() => {
// // //       handleNext();
// // //     }, AUTO_ROTATE_MS);
// // //     return () => clearInterval(timer);
// // //   }, [data, isHovering, activeImgIndex]);

// // //   const handleNext = () => {
// // //     if (!data) return;
// // //     const gallery = data.hero_images || [data.hero_image_url];
// // //     setActiveImgIndex((prev) => (prev + 1) % gallery.length);
// // //   };

// // //   const handlePrev = () => {
// // //     if (!data) return;
// // //     const gallery = data.hero_images || [data.hero_image_url];
// // //     setActiveImgIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
// // //   };

// // //   if (!data) return <div className="h-screen bg-dark-950" />;

// // //   const gallery = (data.hero_images && data.hero_images.length > 0) 
// // //     ? data.hero_images 
// // //     : [data.hero_image_url];
  
// // //   const activeImage = gallery[activeImgIndex];
// // //   const glowColor = data.glow_color || '#0ea5e9';

// // //   return (
// // //     <section 
// // //       className="relative w-full min-h-screen overflow-hidden bg-dark-950 flex flex-col justify-center"
// // //       onMouseEnter={() => setIsHovering(true)}
// // //       onMouseLeave={() => setIsHovering(false)}
// // //     >
      
// // //       {/* 1. BACKGROUND LAYER (Parallax) */}
// // //       <motion.div 
// // //         style={{ y: yBackground }}
// // //         className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
// // //       >
// // //         {/* Technical Grid Pattern */}
// // //         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
// // //         {/* Volumetric Top Light (Based on Glow Color) */}
// // //         <div 
// // //            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-gradient-to-b from-current to-transparent opacity-10 blur-3xl"
// // //            style={{ color: glowColor }}
// // //         />
        
// // //         {/* Noise Texture */}
// // //         <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
// // //       </motion.div>


// // //       {/* 2. MAIN CONTAINER */}
// // //       <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full pt-20 pb-20">

// // //         {/* --- LEFT COL: TYPOGRAPHY (5 Cols) --- */}
// // //         <motion.div 
// // //           style={{ y: yText }}
// // //           className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 relative"
// // //         >
// // //           {/* Decorative Tag */}
// // //           <div className="flex items-center gap-3 mb-8">
// // //              <span className="flex h-2 w-2 relative">
// // //                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: glowColor }}></span>
// // //                 <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: glowColor }}></span>
// // //              </span>
// // //              <span className="text-xs font-mono text-slate-400 tracking-[0.3em] uppercase">
// // //                 Series 01 / Available Now
// // //              </span>
// // //           </div>

// // //           {/* Headline */}
// // //           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
// // //             {data.headline}
// // //           </h1>

// // //           {/* Subheadline with side line */}
// // //           <div className="flex gap-6 mb-10 pl-2">
// // //             <div className="w-[2px] h-auto bg-gradient-to-b from-white/50 to-transparent" />
// // //             <p className="text-lg text-slate-300 font-light leading-relaxed max-w-md">
// // //               {data.subheadline}
// // //             </p>
// // //           </div>

// // //           {/* CTA Group */}
// // //           <div className="flex items-center gap-6">
// // //             <Link to={data.cta_link} className="group relative px-8 py-4 bg-white text-dark-950 font-bold uppercase tracking-widest text-xs overflow-hidden">
// // //                <span className="relative z-10 flex items-center gap-2">
// // //                  {data.cta_text} <ArrowRight size={14} />
// // //                </span>
// // //                <div className="absolute inset-0 bg-brand-glow transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
// // //             </Link>
            
// // //             {/* Gallery Controls (Desktop) */}
// // //             <div className="hidden md:flex items-center gap-4 ml-4">
// // //                <button onClick={handlePrev} className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white transition-all">
// // //                   <ChevronLeft size={20} />
// // //                </button>
// // //                <span className="text-xs font-mono text-white/50">
// // //                   {String(activeImgIndex + 1).padStart(2, '0')} <span className="mx-1">/</span> {String(gallery.length).padStart(2, '0')}
// // //                </span>
// // //                <button onClick={handleNext} className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white transition-all">
// // //                   <ChevronRight size={20} />
// // //                </button>
// // //             </div>
// // //           </div>
// // //         </motion.div>


// // //         {/* --- RIGHT COL: PRODUCT STAGE (7 Cols) --- */}
// // //         <div className="lg:col-span-7 h-[50vh] lg:h-[80vh] relative flex items-center justify-center order-1 lg:order-2 perspective-1000">
           
// // //            {/* Glow behind product */}
// // //            <div 
// // //              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] rounded-full blur-[100px] opacity-20 transition-colors duration-700"
// // //              style={{ backgroundColor: glowColor }}
// // //            />

// // //            <AnimatePresence mode="wait">
// // //              <motion.div
// // //                key={activeImgIndex}
// // //                initial={{ opacity: 0, x: 50, scale: 0.95 }}
// // //                animate={{ opacity: 1, x: 0, scale: 1 }}
// // //                exit={{ opacity: 0, x: -50, scale: 1.05 }}
// // //                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
// // //                className="relative z-20 w-full h-full flex items-center justify-center"
// // //              >
// // //                 <img 
// // //                   src={activeImage} 
// // //                   alt="Hero Product"
// // //                   className="max-h-full max-w-full object-contain drop-shadow-2xl"
// // //                 />
// // //              </motion.div>
// // //            </AnimatePresence>

// // //            {/* Mobile Only Controls */}
// // //            <div className="absolute bottom-0 w-full flex justify-center gap-2 md:hidden">
// // //               {gallery.map((_, idx) => (
// // //                 <div 
// // //                   key={idx} 
// // //                   className={`h-1 rounded-full transition-all duration-300 ${idx === activeImgIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
// // //                 />
// // //               ))}
// // //            </div>
// // //         </div>

// // //       </div>

// // //       {/* 3. SCROLL INDICATOR (Anchored Bottom Right) */}
// // //       <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center gap-4 z-20">
// // //          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-white/30" />
// // //          <span className="writing-vertical-lr text-[10px] text-white/30 uppercase tracking-widest rotate-180">
// // //             Scroll to Explore
// // //          </span>
// // //       </div>

// // //       {/* 4. SEAMLESS BLEND TO NEXT SECTION */}
// // //       <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-dark-950 to-transparent z-20" />

// // //     </section>
// // //   );
// // // };

// // // export default Hero;
// // import React, { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ArrowRight } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { heroApi } from '../../api/heroApi';

// // // --- CONFIGURATION ---
// // const AUTO_ROTATE_MS = 6000;

// // const Hero = () => {
// //   const [data, setData] = useState(null);
// //   const [activeImgIndex, setActiveImgIndex] = useState(0);

// //   // Load Data
// //   useEffect(() => {
// //     const loadHero = async () => {
// //       try {
// //         const result = await heroApi.getActiveHero();
// //         if (result) setData(result);
// //       } catch (err) {
// //         console.error("Hero Error:", err);
// //       }
// //     };
// //     loadHero();
// //   }, []);

// //   // Auto-Rotate Logic with Reset
// //   useEffect(() => {
// //     if (!data?.hero_images || data.hero_images.length <= 1) return;

// //     const timer = setInterval(() => {
// //       setActiveImgIndex((prev) => 
// //         (prev + 1) % (data.hero_images || [data.hero_image_url]).length
// //       );
// //     }, AUTO_ROTATE_MS);

// //     return () => clearInterval(timer);
// //   }, [data, activeImgIndex]);

// //   if (!data) return <div className="h-screen bg-zinc-950" />;

// //   const gallery = (data.hero_images && data.hero_images.length > 0) 
// //     ? data.hero_images 
// //     : [data.hero_image_url];
  
// //   const activeImage = gallery[activeImgIndex];
// //   const glowColor = data.glow_color || '#ffffff';

// //   return (
// //     <section className="relative w-full h-screen overflow-hidden bg-zinc-950 text-white flex items-center justify-center">
      
// //       {/* 1. AMBIENT BACKGROUND */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {/* Subtle Gradient Spot */}
// //         <motion.div 
// //           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
// //           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
// //           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20"
// //           style={{ backgroundColor: glowColor }}
// //         />
// //         {/* Grain Overlay */}
// //         <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
// //       </div>

// //       <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

// //         {/* --- LEFT: MINIMAL TEXT --- */}
// //         <div className="flex flex-col justify-center items-start space-y-8 pl-4 lg:pl-12">
          
// //           {/* Animated Text Reveal */}
// //           <div className="overflow-hidden">
// //             <motion.h1 
// //               initial={{ y: 100 }}
// //               animate={{ y: 0 }}
// //               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
// //               className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
// //             >
// //               {data.headline}
// //             </motion.h1>
// //           </div>

// //           <motion.p 
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 0.4, duration: 1 }}
// //             className="text-lg text-zinc-400 font-light max-w-md leading-relaxed"
// //           >
// //             {data.subheadline}
// //           </motion.p>

// //           {/* SHOP NOW BUTTON */}
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.6 }}
// //           >
// //             <Link 
// //               to={data.cta_link || "/shop"} 
// //               className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full overflow-hidden transition-all hover:pr-14"
// //             >
// //               <span className="relative z-10 font-bold tracking-wide uppercase text-sm">
// //                 Shop Now
// //               </span>
              
// //               {/* Arrow slides in on hover */}
// //               <span className="absolute right-5 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
// //                 <ArrowRight size={18} />
// //               </span>

// //               {/* Background fill effect */}
// //               <div 
// //                 className="absolute inset-0 bg-zinc-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" 
// //               />
// //             </Link>
// //           </motion.div>
// //         </div>


// //         {/* --- RIGHT: PRODUCT & PROGRESS --- */}
// //         <div className="relative h-[50vh] lg:h-[70vh] flex flex-col items-center justify-center">
           
// //            {/* Image Container */}
// //            <div className="relative w-full h-full flex items-center justify-center">
// //              <AnimatePresence mode="wait">
// //                <motion.img
// //                  key={activeImgIndex}
// //                  src={activeImage}
// //                  alt="Hero Product"
// //                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
// //                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
// //                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
// //                  transition={{ duration: 0.8, ease: "easeInOut" }}
// //                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
// //                />
// //              </AnimatePresence>
// //            </div>

// //            {/* Minimal Progress Indicators */}
// //            <div className="absolute bottom-0 left-0 w-full flex items-center gap-4 px-8">
// //              {/* Text Counter */}
// //              <span className="text-xs font-mono text-zinc-500">
// //                 0{activeImgIndex + 1}
// //              </span>
             
// //              {/* Progress Bar Container */}
// //              <div className="relative flex-1 h-[1px] bg-white/10 overflow-hidden">
// //                 {/* Active Progress Line */}
// //                 <motion.div 
// //                   key={activeImgIndex} // Re-renders animation on index change
// //                   initial={{ x: "-100%" }}
// //                   animate={{ x: "0%" }}
// //                   transition={{ duration: AUTO_ROTATE_MS / 1000, ease: "linear" }}
// //                   className="absolute inset-0 bg-white"
// //                 />
// //              </div>

// //              <span className="text-xs font-mono text-zinc-500">
// //                 0{gallery.length}
// //              </span>
// //            </div>

// //         </div>

// //       </div>
// //     </section>
// //   );
// // };

// // export default Hero;
// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { heroApi } from '../../api/heroApi';

// // --- CONFIGURATION ---
// const AUTO_ROTATE_MS = 6000;

// const Hero = () => {
//   const [data, setData] = useState(null);
//   const [activeImgIndex, setActiveImgIndex] = useState(0);
//   const [areImagesCached, setAreImagesCached] = useState(false);

//   // 1. Load Data
//   useEffect(() => {
//     const loadHero = async () => {
//       try {
//         const result = await heroApi.getActiveHero();
//         if (result) {
//           setData(result);
//           // Trigger preloading immediately after data is received
//           preloadImages(result.hero_images || [result.hero_image_url]);
//         }
//       } catch (err) {
//         console.error("Hero Error:", err);
//       }
//     };
//     loadHero();
//   }, []);

//   // 2. System Cache Preloader
//   // This downloads all images to browser cache so subsequent slides exist instantly
//   const preloadImages = async (urls) => {
//     const promises = urls.map((src) => {
//       return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.src = src;
//         img.onload = resolve;
//         img.onerror = resolve; // Resolve anyway to prevent blocking
//       });
//     });

//     await Promise.all(promises);
//     setAreImagesCached(true); // All images are now in system cache
//   };

//   // 3. Auto-Rotate Logic
//   useEffect(() => {
//     if (!data?.hero_images || data.hero_images.length <= 1) return;

//     const timer = setInterval(() => {
//       setActiveImgIndex((prev) => 
//         (prev + 1) % (data.hero_images || [data.hero_image_url]).length
//       );
//     }, AUTO_ROTATE_MS);

//     return () => clearInterval(timer);
//   }, [data, activeImgIndex]);

//   // Initial Loading State (Before API returns)
//   if (!data) return <div className="h-screen bg-black flex items-center justify-center text-zinc-600">Loading...</div>;

//   const gallery = (data.hero_images && data.hero_images.length > 0) 
//     ? data.hero_images 
//     : [data.hero_image_url];
  
//   const activeImage = gallery[activeImgIndex];
//   const glowColor = data.glow_color || '#ffffff';

//   return (
//     <section className="relative w-full h-screen overflow-hidden bg-black text-white flex items-center justify-center">
      
//       {/* 1. AMBIENT BACKGROUND */}
//       <div className="absolute inset-0 pointer-events-none">
//         <motion.div 
//           animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
//           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-20"
//           style={{ backgroundColor: glowColor }}
//         />
//         <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
//       </div>

//       <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">

//         {/* --- LEFT: TEXT CONTENT --- */}
//         <div className="flex flex-col justify-center items-start space-y-8 pl-4 lg:pl-12 order-2 lg:order-1">
//           <div className="overflow-hidden">
//             <motion.h1 
//               initial={{ y: 100 }}
//               animate={{ y: 0 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//               className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
//             >
//               {data.headline}
//             </motion.h1>
//           </div>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 1 }}
//             className="text-lg text-zinc-400 font-light max-w-md leading-relaxed"
//           >
//             {data.subheadline}
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//           >
//             <Link 
//               to={data.cta_link || "/shop"} 
//               className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full overflow-hidden transition-all hover:pr-14"
//             >
//               <span className="relative z-10 font-bold tracking-wide uppercase text-sm">
//                 Shop Now
//               </span>
//               <span className="absolute right-5 opacity-0 transform -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
//                 <ArrowRight size={18} />
//               </span>
//               <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* --- RIGHT: PRODUCT IMAGE --- */}
//         <div className="relative h-[50vh] lg:h-[70vh] flex flex-col items-center justify-center order-1 lg:order-2">
//            <div className="relative w-full h-full flex items-center justify-center">
             
//              {/* If images aren't cached yet, show loading. If cached, show image transition */}
//              {!areImagesCached ? (
//                 <div className="animate-pulse text-zinc-600 text-sm tracking-widest uppercase font-mono">
//                   Loading Experience...
//                 </div>
//              ) : (
//                <AnimatePresence mode="wait">
//                  <motion.img
//                    key={activeImgIndex}
//                    src={activeImage}
//                    alt="Hero Product"
//                    // Animation only plays after image is confirmed loaded from cache
//                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
//                    transition={{ duration: 0.8, ease: "easeInOut" }}
//                    className="max-h-full max-w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
//                  />
//                </AnimatePresence>
//              )}

//            </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default Hero;
// // // // src/components/home/LabPreview.jsx
// // // import React, { useEffect, useState } from 'react';
// // // import { motion } from 'framer-motion';
// // // import { ShieldCheck, Microscope, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
// // // import { Link } from 'react-router-dom';
// // // import { homeContentApi } from '../../api/homeContentApi';

// // // const LabPreview = () => {
// // //   const [batches, setBatches] = useState([]);

// // //   useEffect(() => {
// // //     const load = async () => {
// // //       try {
// // //         const data = await homeContentApi.getLatestLabResults();
// // //         setBatches(data);
// // //       } catch (e) {
// // //         console.error(e);
// // //       }
// // //     };
// // //     load();
// // //   }, []);

// // //   return (
// // //     <div className="relative w-full bg-dark-900 border-y border-white/5 overflow-hidden">
// // //       <div className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center">
        
// // //         {/* LEFT: Text Content */}
// // //         <div className="space-y-8 relative z-10">
// // //           <motion.div 
// // //             initial={{ opacity: 0, x: -20 }}
// // //             whileInView={{ opacity: 1, x: 0 }}
// // //             viewport={{ once: true }}
// // //             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-glow/10 border border-brand-glow/20 text-brand-glow text-xs font-bold uppercase tracking-widest"
// // //           >
// // //             <ShieldCheck size={14} /> 100% Verified Potency
// // //           </motion.div>
          
// // //           <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
// // //             Total Transparency. <br />
// // //             <span className="text-slate-500">Down to the molecule.</span>
// // //           </h2>
          
// // //           <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
// // //             We don't guess. Every single batch sent to your door has been third-party tested for purity, heavy metals, and potency. Scan your bottle to see the proof.
// // //           </p>

// // //           <Link 
// // //             to="/science" 
// // //             className="group inline-flex items-center gap-3 text-white font-bold text-lg border-b border-brand-glow pb-1 hover:text-brand-glow transition-colors"
// // //           >
// // //             View Full Lab Database <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform"/>
// // //           </Link>
// // //         </div>

// // //         {/* RIGHT: Live Feed Visualization */}
// // //         <div className="relative">
// // //             {/* Decorative Glow */}
// // //             <div className="absolute -inset-10 bg-brand-glow/20 blur-[100px] rounded-full opacity-50" />
            
// // //             <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8">
// // //                 <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
// // //                     <div className="flex items-center gap-3">
// // //                         <Microscope className="text-brand-glow" size={24} />
// // //                         <span className="font-bold text-white uppercase tracking-wider">Recent Analysis</span>
// // //                     </div>
// // //                     <div className="flex items-center gap-2">
// // //                         <span className="relative flex h-3 w-3">
// // //                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
// // //                           <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
// // //                         </span>
// // //                         <span className="text-xs font-mono text-green-400">LIVE FEED</span>
// // //                     </div>
// // //                 </div>

// // //                 <div className="space-y-4">
// // //                     {batches.length > 0 ? batches.map((batch, i) => (
// // //                         <motion.div 
// // //                             key={batch.id}
// // //                             initial={{ opacity: 0, y: 10 }}
// // //                             whileInView={{ opacity: 1, y: 0 }}
// // //                             transition={{ delay: i * 0.1 }}
// // //                             className="flex items-center justify-between p-3 rounded-lg bg-dark-950/50 border border-white/5 hover:border-white/20 transition-colors group"
// // //                         >
// // //                             <div className="flex items-center gap-4">
// // //                                 <div className="h-10 w-10 bg-white/10 rounded-md flex items-center justify-center">
// // //                                     <FileText size={16} className="text-slate-400 group-hover:text-white transition-colors" />
// // //                                 </div>
// // //                                 <div>
// // //                                     <h4 className="font-bold text-sm text-white">{batch.productName}</h4>
// // //                                     <p className="text-xs text-slate-500 font-mono">BATCH: {batch.batch}</p>
// // //                                 </div>
// // //                             </div>
// // //                             <div className="text-right">
// // //                                 <div className="flex items-center gap-1 text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded">
// // //                                     <CheckCircle2 size={10} /> PASS
// // //                                 </div>
// // //                                 <p className="text-[10px] text-slate-600 mt-1">{new Date(batch.date).toLocaleDateString()}</p>
// // //                             </div>
// // //                         </motion.div>
// // //                     )) : (
// // //                         <p className="text-slate-500 text-sm text-center py-4">Loading verification data...</p>
// // //                     )}
// // //                 </div>

// // //                 {/* Card Footer */}
// // //                 <div className="mt-6 pt-4 border-t border-white/10 text-center">
// // //                     <p className="text-xs text-slate-500 uppercase tracking-widest">
// // //                         Certified by ISO 17025 Accredited Labs
// // //                     </p>
// // //                 </div>
// // //             </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default LabPreview;
// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { ShieldCheck, ArrowRight, Check, FileText } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { homeContentApi } from '../../api/homeContentApi';

// // const LabPreview = () => {
// //   const [batches, setBatches] = useState([]);

// //   useEffect(() => {
// //     const load = async () => {
// //       try {
// //         const data = await homeContentApi.getLatestLabResults();
// //         setBatches(data);
// //       } catch (e) {
// //         console.error(e);
// //       }
// //     };
// //     load();
// //   }, []);

// //   return (
// //     <div className="relative w-full bg-dark-900 border-y border-white/5 overflow-hidden py-24">
// //       <div className="max-w-7xl mx-auto px-4">
        
// //         {/* HEADER */}
// //         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
// //           <div className="max-w-2xl">
// //             <div className="flex items-center gap-2 mb-4">
// //                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
// //                <span className="text-xs font-bold uppercase tracking-widest text-green-500">
// //                  Third-Party Verified
// //                </span>
// //             </div>
// //             <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
// //               Purity You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-purple-500">Trace.</span>
// //             </h2>
// //             <p className="text-slate-400">
// //               Every batch is tested for potency and safety. We believe in radical transparency.
// //             </p>
// //           </div>

// //           <Link 
// //             to="/science" 
// //             className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 hover:border-brand-glow transition-all font-bold text-sm uppercase tracking-widest text-white group"
// //           >
// //             View Reports <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
// //           </Link>
// //         </div>

// //         {/* VERIFICATION GRID */}
// //         {/* Shows product images in a clean, high-end card style */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
// //            {batches.map((batch, i) => (
// //              <motion.div
// //                key={batch.id}
// //                initial={{ opacity: 0, y: 20 }}
// //                whileInView={{ opacity: 1, y: 0 }}
// //                viewport={{ once: true }}
// //                transition={{ delay: i * 0.1 }}
// //                className="group relative bg-white/5 border border-white/5 hover:border-brand-glow/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-glow/10"
// //              >
// //                {/* "Verified" Badge */}
// //                <div className="absolute top-3 right-3 z-10">
// //                   <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-1.5 rounded-full backdrop-blur-md">
// //                      <Check size={12} strokeWidth={3} />
// //                   </div>
// //                </div>

// //                {/* Product Image */}
// //                <div className="relative aspect-square mb-4 flex items-center justify-center bg-dark-950/30 rounded-xl overflow-hidden">
// //                   <img 
// //                     src={batch.image || "https://placehold.co/400x400/png"} 
// //                     alt={batch.productName}
// //                     className="w-3/4 h-3/4 object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-500" 
// //                   />
// //                </div>

// //                {/* Info */}
// //                <div className="space-y-1">
// //                   <h4 className="font-bold text-white text-sm truncate leading-tight group-hover:text-brand-glow transition-colors">
// //                     {batch.productName}
// //                   </h4>
// //                   <div className="flex flex-col gap-0.5">
// //                     <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
// //                        Batch: <span className="text-slate-300">{batch.batch}</span>
// //                     </span>
// //                     <span className="text-[10px] text-slate-600">
// //                        {new Date(batch.date).toLocaleDateString()}
// //                     </span>
// //                   </div>
// //                </div>
// //              </motion.div>
// //            ))}

// //            {/* View All Card (Last item) */}
// //            {/* <Link to="/science" className="group flex flex-col items-center justify-center bg-transparent border border-dashed border-white/10 rounded-2xl hover:border-brand-glow hover:bg-brand-glow/5 transition-all p-4 text-center">
// //               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform text-brand-glow">
// //                  <FileText size={20} />
// //               </div>
// //               <span className="text-xs font-bold text-white uppercase tracking-widest">View All Reports</span>
// //            </Link> */}
// //         </div>

// //         {/* Mobile Button */}
// //         <div className="mt-8 md:hidden text-center">
// //            <Link to="/science" className="text-brand-glow font-bold uppercase text-sm border-b border-brand-glow/30 pb-1">
// //              View All Reports
// //            </Link>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default LabPreview;
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   ShieldCheck, 
//   ArrowRight, 
//   FileText, 
//   Microscope, 
//   Activity, 
//   CheckCircle2, 
//   Download 
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { homeContentApi } from '../../api/homeContentApi';

// const LabPreview = () => {
//   const [batches, setBatches] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const data = await homeContentApi.getLatestLabResults();
//         // Fallback if API returns empty during dev
//         setBatches(data || []);
//       } catch (e) {
//         console.error("Failed to load lab results", e);
//       } finally {
//         setLoading(false);
//       }
//     };
//     load();
//   }, []);

//   // Variant for staggered animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <section className="relative w-full bg-[#050505] py-24 overflow-hidden">
//       {/* Background Decor: Subtle scientific grid/glow */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
//           {/* LEFT SIDE: The Promise (Text Content) */}
//           <div className="lg:col-span-4 flex flex-col justify-center h-full pt-4">
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 w-fit mb-6">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
//               </span>
//               <span className="text-[10px] font-bold uppercase tracking-widest text-green-400">
//                 Live Lab Data
//               </span>
//             </div>

//             <h2 className="text-4xl md:text-5xl font-black text-white leading-[0.95] mb-6 tracking-tighter">
//               RADICAL <br />
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//                 TRANSPARENCY.
//               </span>
//             </h2>

//             <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base border-l-2 border-white/10 pl-4">
//               We don't just claim purity; we prove it. Every single batch is subjected to rigorous third-party chromatography to ensure safety and potency.
//             </p>

//             {/* Testing Metrics List */}
//             <div className="space-y-4 mb-8">
//               <TestMetric icon={Microscope} label="Alkaloid Potency Analysis" />
//               <TestMetric icon={ShieldCheck} label="Heavy Metals Screening" />
//               <TestMetric icon={Activity} label="Microbial Contaminant Test" />
//             </div>

//             <Link 
//               to="/science" 
//               className="hidden lg:inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs hover:bg-slate-200 transition-colors rounded-sm"
//             >
//               Access Full Library <ArrowRight size={16} />
//             </Link>
//           </div>

//           {/* RIGHT SIDE: The Evidence (Cards Grid) */}
//           <div className="lg:col-span-8">
//              {loading ? (
//                 <div className="w-full h-64 flex items-center justify-center border border-dashed border-white/10 rounded-xl">
//                     <span className="text-slate-500 animate-pulse">Fetching batch data...</span>
//                 </div>
//              ) : (
//                 <motion.div 
//                   variants={containerVariants}
//                   initial="hidden"
//                   whileInView="show"
//                   viewport={{ once: true }}
//                   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
//                 >
//                   {batches.slice(0, 6).map((batch) => (
//                     <BatchCard key={batch.id} batch={batch} variants={itemVariants} />
//                   ))}
                  
//                   {/* "View All" Card for Mobile/Tablet context mainly, or simply filler */}
//                   <Link to="/science" className="group flex flex-col items-center justify-center bg-white/5 border border-dashed border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 transition-all duration-300 rounded-xl min-h-[220px]">
//                     <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                         <ArrowRight className="text-white group-hover:text-blue-400" />
//                     </div>
//                     <span className="text-xs font-bold text-white uppercase tracking-widest">View All Reports</span>
//                   </Link>
//                 </motion.div>
//              )}
//           </div>

//           <div className="lg:hidden col-span-1 mt-4">
//              <Link 
//               to="/science" 
//               className="w-full flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-xs hover:bg-white/5 transition-colors rounded-sm"
//             >
//               Access Full Library <ArrowRight size={16} />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- Sub Components ---

// const TestMetric = ({ icon: Icon, label }) => (
//   <div className="flex items-center gap-3 group">
//     <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-blue-400/10 transition-colors">
//       <Icon size={14} />
//     </div>
//     <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{label}</span>
//   </div>
// );

// const BatchCard = ({ batch, variants }) => {
//   return (
//     <motion.div 
//       variants={variants}
//       className="group relative bg-[#0A0A0A] border border-white/10 hover:border-blue-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 flex flex-col"
//     >
//       {/* Top Status Bar */}
//       <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
//         <div className="flex items-center gap-2">
//             <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
//             <span className="text-[10px] font-mono text-green-500 font-bold uppercase tracking-wider">PASS</span>
//         </div>
//         <span className="text-[10px] font-mono text-slate-500">ISO 17025</span>
//       </div>

//       <div className="p-5 flex flex-col h-full relative">
//         {/* Subtle background icon for texture */}
//         <FileText className="absolute top-10 right-5 text-white/[0.02] w-24 h-24 -rotate-12 pointer-events-none" />

//         <div className="flex items-start gap-4 mb-4">
//             {/* Small Thumbnail */}
//             <div className="w-12 h-12 bg-white/5 rounded-md p-1 flex-shrink-0">
//                 <img 
//                     src={batch.image || "https://placehold.co/100x100"} 
//                     alt="Product" 
//                     className="w-full h-full object-contain"
//                 />
//             </div>
//             <div>
//                 <h4 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
//                     {batch.productName}
//                 </h4>
//                 <div className="flex flex-col">
//                     <span className="text-[10px] text-slate-500 uppercase tracking-wider">Batch ID</span>
//                     <span className="text-xs font-mono text-slate-300">{batch.batch}</span>
//                 </div>
//             </div>
//         </div>

//         <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
//             <span className="text-[10px] text-slate-500">
//                 {new Date(batch.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
//             </span>
//             <div className="flex items-center gap-1 text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
//                 View COA <Download size={12} />
//             </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default LabPreview;
// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import { supabase } from '../../client/supabaseClient';

// // const DUMMY_IMAGE = "https://placehold.co/400x600/png"; 

// // const FeaturedProducts = () => {
// //   const [variants, setVariants] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchVariants = async () => {
// //       // 1. Fetch active variants
// //       const { data: variantData, error: variantError } = await supabase
// //         .from('product_variants')
// //         .select(`
// //           *,
// //           product:products (
// //             id,
// //             name,
// //             slug
// //           ),
// //           variant_selection_map (
// //             option:variant_options (
// //               name,
// //               type:variant_types (name)
// //             )
// //           )
// //         `)
// //         .eq('is_active', true)
// //         .order('price', { ascending: true });

// //       if (!variantError && variantData) {
// //         // 2. Process data to extract the specific "Flavor" or "Option" name
// //         const processed = variantData.map(v => {
// //           // Find the option that corresponds to 'Flavor' or just take the first option found
// //           const flavorOption = v.variant_selection_map?.find(
// //             map => map.option?.type?.name === 'Flavor'
// //           ) || v.variant_selection_map?.[0]; // Fallback to first option

// //           return {
// //             ...v,
// //             displayName: flavorOption ? flavorOption.option.name : formatSku(v.sku)
// //           };
// //         });
// //         setVariants(processed);
// //       }
// //       setLoading(false);
// //     };

// //     fetchVariants();
// //   }, []);

// //   console.log(variants);
// //   // Fallback if no specific option is found
// //   const formatSku = (sku) => {
// //     if (!sku) return "Unknown Flavor";
// //     const parts = sku.split('--');
// //     return parts.length > 1 ? parts[1].replace(/_/g, ' ') : sku;
// //   };

// //   if (loading) return null;

// //   return (
// //     <section className="relative w-full max-w-7xl mx-auto px-2 sm:px-4 z-10">
      
// //       <div className="text-center mb-8 md:mb-12">
// //         <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tight">
// //           Choose Your <span className="text-brand-glow">Flavor</span>
// //         </h2>
// //       </div>

// //       {/* GRID LAYOUT: 2 columns on mobile (grid-cols-2), 4 on laptop */}
// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
// //         {variants.map((variant, index) => (
// //           <VariantCard 
// //             key={variant.id} 
// //             variant={variant} 
// //             idx={index}
// //           />
// //         ))}
// //       </div>

// //     </section>
// //   );
// // };

// // const VariantCard = ({ variant, idx }) => {
// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true }}
// //       transition={{ delay: idx * 0.05, duration: 0.4 }}
// //       className="group relative flex flex-col h-full"
// //     >
// //       <div className="flex-1 bg-dark-900 border border-white/5 rounded-2xl p-3 md:p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-brand-glow/30 hover:bg-white/5 hover:-translate-y-1 hover:shadow-xl">
        
// //         {/* 1. TITLE (Smaller on mobile) */}
// //         {/* <h5 className="text-xs md:text-xl font-bold text-white uppercase tracking-wider mb-1 md:mb-2 truncate w-full">
// //           {variant?.product?.name || 'Product'}
// //         </h5>

// //         <h4 className="text-xs md:text-xl font-bold text-white uppercase tracking-wider mb-1 md:mb-2 truncate w-full">
// //           {variant.displayName}
// //         </h4> */}
// //         <h5 className="text-[9px] md:text-sm font-medium text-gray-500 uppercase tracking-wide mb-0.5 truncate w-full">
// //           {variant?.product?.name || 'Product'}
// //         </h5>

// //         {/* 2. VARIANT NAME - Small but Bold */}
// //         <h4 className="text-[11px] md:text-lg font-black text-white uppercase tracking-tight mb-2 truncate w-full leading-tight">
// //           {variant.displayName}
// //         </h4>
// //         {/* <p className="text-xs md:text-sm text-brand-glow font-mono font-medium mb-3 md:mb-6">
// //            ${variant.price}
// //         </p> */}

// //         {/* 2. IMAGE (Optimized size) */}
// //         <div className="relative w-full aspect-[3/4] mb-4 md:mb-8 flex items-center justify-center">
// //            <img 
// //             src={variant.image_url || DUMMY_IMAGE} 
// //             alt={variant.displayName}
// //             className="relative z-10 w-full h-full object-contain drop-shadow-lg transform transition-transform duration-500 group-hover:scale-105"
// //             loading="lazy"
// //            />
// //         </div>

// //         {/* 3. BUTTON (Compact on mobile) */}
// //         <div className="w-full mt-auto">
// //           <Link to={`/product/${variant.product?.id}?variant=${variant.id}`}>
// //             <button className="w-full py-2 md:py-3.5 bg-dark-950 text-white font-bold text-[10px] md:text-sm uppercase tracking-widest rounded-lg md:rounded-full border border-white/10 hover:bg-brand-glow hover:text-dark-950 hover:border-brand-glow transition-all active:scale-95">
// //               Shop
// //             </button>
// //           </Link>
// //         </div>

// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default FeaturedProducts;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { supabase } from '../../client/supabaseClient';

// const DUMMY_IMAGE = "https://placehold.co/400x600/png";

// // Helper to match the screenshot colors based on product name/sku
// const getBrandStyles = (name = "") => {
//   const lowerName = name.toLowerCase();
//   if (lowerName.includes('extra strength')) return { bg: 'bg-[#E31E24]', border: 'border-[#E31E24]', icon: '⚡' };
//   if (lowerName.includes('max potency')) return { bg: 'bg-[#4A1417]', border: 'border-[#4A1417]', icon: '⚠️' };
//   if (lowerName.includes('pseudo')) return { bg: 'bg-[#004A51]', border: 'border-[#004A51]', icon: '♾️' };
//   return { bg: 'bg-[#009DDC]', border: 'border-[#009DDC]', icon: '①' }; // Default blue
// };

// const FeaturedProducts = () => {
//   const [variants, setVariants] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVariants = async () => {
//       const { data: variantData, error: variantError } = await supabase
//         .from('product_variants')
//         .select(`
//           *,
//           product:products (id, name, slug, description),
//           variant_selection_map (
//             option:variant_options (
//               name,
//               type:variant_types (name)
//             )
//           )
//         `)
//         .eq('is_active', true)
//         .order('price', { ascending: true });

//       if (!variantError && variantData) {
//         const processed = variantData.map(v => {
//           const flavorOption = v.variant_selection_map?.find(
//             map => map.option?.type?.name === 'Flavor'
//           ) || v.variant_selection_map?.[0];

//           return {
//             ...v,
//             displayName: flavorOption ? flavorOption.option.name : (v.sku ? v.sku.split('--')[1]?.replace(/_/g, ' ') : "Pure Extract")
//           };
//         });
//         setVariants(processed);
//       }
//       setLoading(false);
//     };
//     fetchVariants();
//   }, []);

//   if (loading) return null;

//   return (
//     <section className="bg-black py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter italic">
//             PURE. PRECISE. <span className="text-[#009DDC]">POTENT.</span>
//           </h2>
//           <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
//             7Tabz purifies and packages Kratom's most powerful ingredients into delicious tablets and shots.
//           </p>
//         </div>

//         {/* Scrollable Container */}
//         <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 snap-x no-scrollbar">
//           {variants.map((variant, index) => (
//             <div key={variant.id} className="min-w-[280px] md:min-w-[300px] flex-1 snap-start">
//               <VariantCard variant={variant} idx={index} />
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         .no-scrollbar::-webkit-scrollbar { display: none; }
//         .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </section>
//   );
// };

// const VariantCard = ({ variant, idx }) => {
//   const styles = getBrandStyles(variant.product?.name);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: idx * 0.1 }}
//       className="bg-white rounded-xl overflow-hidden flex flex-col h-full shadow-2xl"
//     >
//       {/* 1. Header Badge Area */}
//       <div className={`${styles.bg} p-3 flex items-center justify-between text-white uppercase tracking-tighter`}>
//         <div className="flex items-center gap-2">
//           <span className="text-xl font-bold">{styles.icon}</span>
//           <div className="flex flex-col">
//             <span className="text-[10px] font-bold leading-none opacity-90">Strength Level</span>
//             <span className="text-xs font-black leading-none">{variant.product?.name?.split(' ')[0] || 'Premium'}</span>
//           </div>
//         </div>
//         <div className="text-right">
//             <span className="text-[10px] block font-bold opacity-80 leading-none">Formulation</span>
//             <span className="text-[10px] font-black leading-none">Lab Certified</span>
//         </div>
//       </div>

//       {/* 2. Content Body */}
//       <div className="p-5 flex flex-col items-center flex-grow text-center">
//         {/* Product Image */}
//         <div className="relative w-full aspect-square mb-6 group cursor-pointer">
//           <img 
//             src={variant.image_url || DUMMY_IMAGE} 
//             alt={variant.displayName}
//             className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
//           />
//         </div>

//         {/* Title Area */}
//         <h3 className="text-xl font-black text-gray-900 mb-2 leading-none uppercase">
//           {variant.product?.name}
//         </h3>
//         <p className="text-gray-500 text-xs mb-6 line-clamp-2 px-2">
//           {variant.product?.description || "Precisely formulated high-purity extract tablets."}
//         </p>

//         {/* Action Button */}
//         <div className="w-full mt-auto">
//           <Link to={`/product/${variant.product?.id}?variant=${variant.id}`} className="block w-full">
//             <button className={`w-full py-4 rounded-lg border-2 ${styles.border} ${styles.bg.replace('bg-', 'text-')} font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors group`}>
//               Shop {variant.displayName}
//               <span className="group-hover:translate-x-1 transition-transform">→</span>
//             </button>
//           </Link>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default FeaturedProducts;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { getPromoBanners } from '../../api/mainBannerApi';

// const PromoCarousel = () => {
//   const [banners, setBanners] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // 1. Fetch Data
//   useEffect(() => {
//     const loadBanners = async () => {
//       const data = await getPromoBanners();
//       setBanners(data);
//       setLoading(false);
//     };
//     loadBanners();
//   }, []);

//   // 2. Auto-Rotation Timer
//   useEffect(() => {
//     if (banners.length <= 1) return;
//     const timer = setInterval(() => {
//       nextSlide();
//     }, 6000); // Change every 6 seconds
//     return () => clearInterval(timer);
//   }, [currentIndex, banners.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
//   };

//   if (loading) return null; // Or a skeleton loader
//   if (banners.length === 0) return null;

//   return (
//     <div className="relative group w-full overflow-hidden bg-dark-950">
      
//       {/* ASPECT RATIO CONTAINER */}
//       {/* Mobile: h-[50vh], Desktop: h-[600px] or dynamic based on content */}
//       <div className="relative w-full h-[50vh] md:h-[600px]">
//         <AnimatePresence mode='wait'>
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.7 }}
//             className="absolute inset-0 w-full h-full"
//           >
//             <SlideContent banner={banners[currentIndex]} />
//           </motion.div>
//         </AnimatePresence>

//         {/* GRADIENT OVERLAY (Text Readability) */}
//         <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
//       </div>

//       {/* NAVIGATION CONTROLS (Only if > 1 slide) */}
//       {banners.length > 1 && (
//         <>
//           {/* Arrows - Hidden on Mobile, Visible on Hover Desktop */}
//           <button 
//             onClick={prevSlide}
//             className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-glow hover:text-dark-900 hidden md:flex"
//           >
//             <ChevronLeft size={24} />
//           </button>
//           <button 
//             onClick={nextSlide}
//             className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-glow hover:text-dark-900 hidden md:flex"
//           >
//             <ChevronRight size={24} />
//           </button>

//           {/* Dots Indicator */}
//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
//             {banners.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentIndex(idx)}
//                 className={`h-1.5 rounded-full transition-all duration-300 ${
//                   idx === currentIndex ? 'w-8 bg-brand-glow' : 'w-2 bg-white/30 hover:bg-white'
//                 }`}
//               />
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // --- SUB-COMPONENT: HANDLES MEDIA TYPES ---
// const SlideContent = ({ banner }) => {
//   const ContentWrapper = banner.link_url ? Link : 'div';
//   const props = banner.link_url ? { to: banner.link_url } : {};

//   return (
//     <ContentWrapper {...props} className="block w-full h-full relative">
//       {banner.media_type === 'video' ? (
//         <video
//           src={banner.media_url}
//           className="w-full h-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline // CRITICAL for iOS
//         />
//       ) : (
//         <img
//           src={banner.media_url}
//           alt={banner.title}
//           className="w-full h-full object-cover"
//           loading="eager" // Load current slide immediately
//         />
//       )}
      
//       {/* OPTIONAL: TEXT OVERLAY IF YOU WANT IT OVER THE BANNER */}
//       {/* <div className="absolute bottom-12 left-4 md:left-12 z-10 max-w-xl">
//          <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">
//            {banner.title}
//          </h2>
//       </div> */}
//     </ContentWrapper>
//   );
// };

// export default PromoCarousel;