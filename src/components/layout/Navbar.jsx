
// import React, { useState, useEffect } from 'react';
// import { NavLink, Link, useLocation } from 'react-router-dom';
// import { ShoppingCart, Menu, X, User, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import clsx from 'clsx';
// import { useCart } from '../../context/CartContext';
// import { useAuth } from '../../context/AuthContext';
// import { Shield } from 'lucide-react';
// const Navbar = () => {
//   const { user } = useAuth();
//   const { getCartCount } = useCart();
//   const location = useLocation();
//   // console.log('nav bar user',user);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const count = getCartCount();

//   // Handle Scroll Effect
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

//   const navLinks = [
//     { name: 'Shop', path: '/shop' },
//     { name: 'Lab Reports', path: '/science' },
//     { name: 'Learn', path: '/learn' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <>
//       <nav 
//         className={clsx(
//           "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b my-10 md:px-12",
//           isScrolled 
//             ? "bg-dark-900/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
//             : "bg-transparent border-transparent py-5"
//         )}
//       >
//         <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          
//           {/* --- LOGO --- */}
//           <Link to="/" className="group relative z-[110] flex items-center gap-2">
//             <div className="relative">
//               <Sparkles className="text-brand-glow w-5 h-5 absolute -top-3 -left-2 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
//               <h1 className="text-2xl font-black tracking-tighter text-white">
//                 CLOUD<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">7</span>
//               </h1>
//             </div>
//           </Link>

//           {/* --- DESKTOP NAVIGATION (Animated Pills) --- */}
//           <div className="hidden md:flex items-center bg-white/5 backdrop-blur-md p-1.5 rounded-full border border-white/10 relative">
//             {navLinks.map((link) => (
//               <NavLink 
//                 key={link.path} 
//                 to={link.path}
//                 className={({ isActive }) => clsx(
//                   "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10",
//                   isActive ? "text-dark-900" : "text-slate-400 hover:text-white"
//                 )}
//               >
//                 {({ isActive }) => (
//                   <>
//                     {isActive && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
//                         transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
//                       />
//                     )}
//                     {link.name}
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           {/* --- RIGHT ACTIONS --- */}
//           <div className="flex items-center gap-3 md:gap-6 relative z-[110]">

//             {/* CART ICON */}
//             <Link to="/cart" className="relative p-2 text-slate-300 hover:text-white transition-all group">
//               <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
//               <ShoppingCart size={22} className="relative z-10" />
//               {count > 0 && (
//                 <motion.span 
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-dark-900 shadow-lg"
//                 >
//                   {count}
//                 </motion.span>
//               )}
//             </Link>

//             {/* USER PROFILE / LOGIN */}
//             { user?.role != "admin" ? (
//                 <div className="hidden md:block">
//                   {user  ? (
//                     <Link to="/account" className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-white/5 border border-white/10 hover:border-brand-glow/50 hover:bg-white/10 transition-all group">
//                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg overflow-hidden relative">
//                           {user.profile?.first_name?.charAt(0) || <User size={14}/>}
//                           {/* Shine Effect */}
//                           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700" />
//                         </div>
//                         <div className="flex flex-col items-start leading-none">
//                           <span className="text-[10px] text-slate-400 font-medium">Hello,</span>
//                           <span className="text-xs font-bold text-white group-hover:text-brand-glow transition-colors max-w-[80px] truncate">
//                             {user.profile?.first_name || 'User'}
//                           </span>
//                         </div>
//                     </Link>
//                   ) : (
//                     <Link to="/login" className="relative group overflow-hidden px-6 py-2.5 rounded-xl bg-white text-dark-900 font-black text-xs uppercase tracking-widest">
//                       <span className="relative z-10 group-hover:text-white transition-colors duration-300">Login</span>
//                       <div className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
//                     </Link>
//                   )}
//                 </div>
//               ) : (
//                   <Link to="/admin" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all group">
//                     <ShieldCheck size={16} className="animate-pulse" />
//                     <span className="text-[10px] font-black tracking-wider">ADMIN</span>
//                   </Link>
//               )
//             }

//             {/* HAMBURGER (Mobile) */}
//             <button 
//               onClick={toggleMobileMenu}
//               className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors active:scale-90"
//             >
//               {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* --- MOBILE MENU OVERLAY --- */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={toggleMobileMenu}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]"
//             />

//             {/* Menu Drawer */}
//             <motion.div 
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: "spring", damping: 25, stiffness: 200 }}
//               className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-dark-900 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
//             >
//               <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
//                 <span className="text-lg font-bold text-white tracking-widest">MENU</span>
//                 <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
//                    <X size={24} />
//                 </button>
//               </div>

//               <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
//                 {/* Mobile Links with Staggered Animation */}
//                 {navLinks.map((link, idx) => (
//                    <MobileLink key={link.path} to={link.path} idx={idx} onClick={toggleMobileMenu}>
//                       {link.name}
//                    </MobileLink>
//                 ))}

//                 <div className="my-6 border-t border-white/10" />

//                 {/* Admin Link Mobile */}
//                 {user?.role === 'admin' && (
//                   <Link to="/admin" onClick={toggleMobileMenu} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
//                     <ShieldCheck size={20} />
//                     <span className="font-bold">Admin Dashboard</span>
//                   </Link>
//                 )}

//                 {/* Auth Mobile */}
//                 {user ? (
//                    <Link to="/account" onClick={toggleMobileMenu} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
//                       <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold">
//                         {user.profile?.first_name?.charAt(0)}
//                       </div>
//                       <div>
//                         <p className="text-xs text-slate-400">Signed in as</p>
//                         <p className="text-white font-bold">{user.profile?.first_name}</p>
//                       </div>
//                       <ChevronRight className="ml-auto text-slate-500" size={18} />
//                    </Link>
//                 ) : (
//                   <Link to="/login" onClick={toggleMobileMenu} className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-glow to-blue-600 text-white font-bold tracking-widest flex items-center justify-center shadow-lg shadow-brand-glow/20">
//                     LOGIN / REGISTER
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

// // Helper for Staggered Animation
// const MobileLink = ({ to, children, onClick, idx }) => (
//   <motion.div
//     initial={{ x: 50, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ delay: idx * 0.1 }}
//   >
//     <NavLink 
//       to={to} 
//       onClick={onClick}
//       className={({ isActive }) => clsx(
//         "flex items-center justify-between p-4 rounded-xl transition-all duration-300",
//         isActive ? "bg-white/10 text-brand-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
//       )}
//     >
//       <span className="text-lg font-bold tracking-wide">{children}</span>
//       <ChevronRight size={18} className="opacity-50" />
//     </NavLink>
//   </motion.div>
// );

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ShieldCheck, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { layoutApi } from '../../api/layoutApi';

const Navbar = () => {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const count = getCartCount();
  // State
  const [config, setConfig] = useState(null);
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Initial Data Fetch
  useEffect(() => {
    const init = async () => {
      try {
        const data = await layoutApi.getNavbarData();
        setConfig(data.settings);
        setNavLinks(data.links.length > 0 ? data.links : defaultLinks);
      } catch (err) {
        console.error("Navbar Error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  // Fallback defaults
  const defaultLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'Lab Reports', path: '/science' },
  ];

  return (
    <>
      <nav 
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b my-8 md:my-8 md:px-6",
          isScrolled 
            ? "bg-dark-900/80 backdrop-blur-xl border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* --- 1. DYNAMIC LOGO --- */}
          <Link to="/" className="group relative z-[110] flex items-center gap-3">
             {loading ? (
                <div className="h-8 w-32 bg-white/5 animate-pulse rounded-lg" />
             ) : config?.logo_url ? (
                // Image Logo
                <img 
                  src={config.logo_url} 
                  alt={config.site_name} 
                  className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" 
                />
             ) : (
                // Text Logo Fallback
                <div className="relative">
                  <Sparkles className="text-brand-glow w-5 h-5 absolute -top-3 -left-2 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
                    {config?.site_name?.slice(0, -1) || 'CLOUD'}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-glow to-blue-500">
                       {config?.site_name?.slice(-1) || '7'}
                    </span>
                  </h1>
                </div>
             )}
          </Link>

          {/* --- 2. DESKTOP LINKS (Animated Pills) --- */}
          <div className="hidden md:flex items-center bg-dark-900/50 backdrop-blur-md p-1.5 rounded-full border border-white/10 relative shadow-inner">
            {loading ? (
               <div className="flex gap-4 px-4"><Loader2 className="animate-spin text-slate-500" size={16}/></div>
            ) : (
              // navLinks.map((link) => (
              //   <NavLink 
              //     key={link.id || link.path} 
              //     to={link.path}
              //     className={({ isActive }) => clsx(
              //       "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10",
              //       isActive ? "text-dark-900" : "text-slate-400 hover:text-white"
              //     )}
              //   >
              //     {/* {({ isActive }) => (
              //       <>
                      
              //           <motion.div
              //             layoutId="activeTab"
              //             className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              //             transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              //           />
                      
              //         {link.label}
              //       </>
              //     )} */}
              //     {({ isActive }) => (
              //       <>
              //         <span className="text-lg font-bold tracking-wide">{link.label}</span>
              //         <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
              //       </>
              //     )}
              //   </NavLink>
              // ))
              // navLinks.map((link) => (
              //   <NavLink
              //     key={link.id || link.path}
              //     to={link.path}
              //     className={({ isActive }) =>
              //       clsx(
              //         "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 z-10 flex items-center gap-2",
              //         isActive ? "text-white" : "text-slate-400 hover:text-white"
              //       )
              //     }
              //   >
              //     {/* Wrap content in a function to access isActive */}
              //     {({ isActive }) => (
              //       <>
              //         <span className="text-lg font-bold tracking-wide">{link.label}</span>
              //         <ChevronRight
              //           size={16}
              //           className={isActive ? "text-brand-glow" : "opacity-30"}
              //         />
              //         {/* If you want the animated background pill back, add it here: */}
              //         {isActive && (
              //           <motion.div
              //             layoutId="activeTab"
              //             className="absolute inset-0 bg-gradient-to-r from-brand-glow/20 to-blue-500/20 rounded-full -z-10 border border-brand-glow/50"
              //             transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              //           />
              //         )}
              //       </>
              //     )}
              //   </NavLink>
              // ))
              navLinks.map((link) => (
                <NavLink 
                  key={link.id || link.path} 
                  to={link.path}
                  // We use a function here to handle the text color change
                  className={({ isActive }) => clsx(
                    "relative px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 z-10 flex items-center gap-2",
                    isActive ? "text-dark-900" : "text-slate-400 hover:text-white"
                  )}
                >
                  {/* Use a function child to access isActive for the icon and the motion div */}
                  {({ isActive }) => (
                    <>
                      {/* 1. The Animated Background Pill */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-500 rounded-full -z-10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {/* 2. The Link Content */}
                      <span className="relative z-10">{link.label}</span>
                      
                      {/* 3. The Icon */}
                      {/* <ChevronRight 
                        size={14} 
                        className={clsx(
                          "transition-opacity duration-300",
                          isActive ? "text-dark-900 opacity-100" : "opacity-30"
                        )} 
                      /> */}
                    </>
                  )}
                </NavLink>
              ))
            )}
          </div>

          {/* --- 3. RIGHT ACTIONS --- */}
          <div className="flex items-center gap-3 md:gap-5 relative z-[110]">

            {/* Cart */}
            <Link to="/cart" className="relative p-2.5 bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 rounded-full transition-all group">
              <ShoppingCart size={20} className="text-slate-300 group-hover:text-white transition-colors" />
              {count > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={count} // Retrigger anim on change
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-dark-900 shadow-lg"
                >
                  {count}
                </motion.span>
              )}
            </Link>

            {/* User Logic */}
            { user?.role !== "admin" ? (
                <div className="hidden md:block">
                  {user ? (
                    <Link to="/account" className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-white/5 border border-white/10 hover:border-brand-glow/50 hover:bg-white/10 transition-all group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-lg overflow-hidden relative">
                          {user.profile?.first_name?.charAt(0) || <User size={14}/>}
                        </div>
                        <div className="flex flex-col items-start leading-none gap-0.5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Account</span>
                          <span className="text-xs font-bold text-white group-hover:text-brand-glow transition-colors max-w-[80px] truncate">
                            {user.profile?.first_name || 'User'}
                          </span>
                        </div>
                    </Link>
                  ) : (
                    <Link to="/login" className="relative group overflow-hidden px-6 py-2.5 rounded-xl bg-white text-dark-900 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">Login</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-glow to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    </Link>
                  )}
                </div>
              ) : (
                  <Link to="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-dark-900 transition-all group hover:scale-105">
                    <ShieldCheck size={16} className="animate-pulse" />
                    <span className="text-[10px] font-black tracking-wider">ADMIN</span>
                  </Link>
              )
            }

            {/* Mobile Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2.5 text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE DRAWER --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[101]"
            />

            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-dark-950 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-900">
                <span className="text-sm font-bold text-slate-400 tracking-widest">NAVIGATION</span>
                <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                   <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {navLinks.map((link, idx) => (
                   <MobileLink key={link.path} to={link.path} idx={idx} onClick={toggleMobileMenu}>
                      {link.label}
                   </MobileLink>
                ))}

                <div className="my-8 border-t border-dashed border-white/10" />

                {/* Mobile Admin/User Actions */}
                {user?.role === 'admin' && (
                  <Link to="/admin" onClick={toggleMobileMenu} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4">
                    <ShieldCheck size={20} />
                    <span className="font-bold">Admin Dashboard</span>
                  </Link>
                )}

                {user ? (
                   <Link to="/account" onClick={toggleMobileMenu} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-glow/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.profile?.first_name?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-white font-bold text-lg">{user.profile?.first_name}</p>
                      </div>
                      <ChevronRight className="ml-auto text-slate-500" size={18} />
                   </Link>
                ) : (
                  <Link to="/login" onClick={toggleMobileMenu} className="w-full py-4 rounded-xl bg-white text-dark-900 font-black tracking-widest flex items-center justify-center shadow-lg hover:bg-brand-glow transition-colors">
                    LOGIN / JOIN
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// const MobileLink = ({ to, children, onClick, idx }) => (
//   <motion.div
//     initial={{ x: 20, opacity: 0 }}
//     animate={{ x: 0, opacity: 1 }}
//     transition={{ delay: idx * 0.05 }}
//   >
//     <NavLink 
//       to={to} 
//       onClick={onClick}
//       className={({ isActive }) => clsx(
//         "flex items-center justify-between p-4 rounded-xl transition-all duration-300 border border-transparent",
//         isActive ? "bg-white/5 border-brand-glow/30 text-brand-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
//       )}
//     >
//       <span className="text-lg font-bold tracking-wide">{children}</span>
//       <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
//     </NavLink>
//   </motion.div>
// );

const MobileLink = ({ to, children, onClick, idx }) => (
  <motion.div
    initial={{ x: 20, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: idx * 0.05 }}
  >
    <NavLink 
      to={to} 
      onClick={onClick}
      className={({ isActive }) => clsx(
        "flex items-center justify-between p-4 rounded-xl transition-all duration-300 border border-transparent",
        isActive ? "bg-white/5 border-brand-glow/30 text-brand-glow" : "text-slate-300 hover:bg-white/5 hover:text-white"
      )}
    >
      {/* Access isActive here via a render function */}
      {({ isActive }) => (
        <>
          <span className="text-lg font-bold tracking-wide">{children}</span>
          <ChevronRight size={16} className={isActive ? "text-brand-glow" : "opacity-30"} />
        </>
      )}
    </NavLink>
  </motion.div>
);

export default Navbar;