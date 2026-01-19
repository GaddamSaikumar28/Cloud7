
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
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { layoutApi } from '../../api/layoutApi';

// Fallback logo in case API fails
const DEFAULT_LOGO = "https://via.placeholder.com/150x50?text=CLOUD7+LOGO"; 

const Navbar = () => {
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  const count = getCartCount();
  
  const [config, setConfig] = useState(null);
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await layoutApi.getNavbarData();
        setConfig(data.settings);
        setNavLinks(data.links.length > 0 ? data.links : [{ label: 'Shop', path: '/shop' }, { label: 'Science', path: '/science' }]);
      } catch (err) {
        console.error("Navbar Error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    document.body.style.overflow = newState ? 'hidden' : 'unset';
  };

  return (
    <>
      <nav 
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] my-8 transition-all duration-300 border-b",
          isScrolled 
            ? "bg-dark-950/90 backdrop-blur-xl border-white/10 py-3 shadow-2xl" 
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* ================================================================= */}
          {/* 1. LOGO SECTION (FIXED)                                           */}
          {/* ================================================================= */}
          <Link to="/" className="relative z-[110] flex items-center gap-2 group">
             {loading ? (
                <div className="h-8 w-24 bg-white/5 rounded animate-pulse" />
             ) : (
                /* WRAPPER: h-7 (28px). 
                   This keeps the navbar slim (same height as text). 
                */
                <div className="relative h-7 w-40"> 
                   <img 
                      src={config?.logo_url || DEFAULT_LOGO} 
                      alt={config?.site_name || "Cloud7"}
                      /* IMAGE: h-20 (80px) on mobile, h-28 (112px) on desktop.
                         'absolute' lets it grow huge without pushing the nav height.
                      */
                      className="absolute top-1/2 left-0 -translate-y-1/2 h-30 md:h-38 w-auto max-w-none object-contain transition-transform duration-300 group-hover:scale-105" 
                   />
                </div>
             )}
          </Link>

          {/* 2. DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-1 bg-white border border-black p-1 rounded-full" > 
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({ isActive }) => clsx(
                  "px-6 py-2 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 rounded-full",
                  isActive 
                    ? "bg-brand-glow bg-black text-white text-dark-900 shadow-[0_0_20px_rgba(14,165,233,0.4)] scale-105" 
                    : "text-black hover:text-black hover:bg-white/5" 
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* 3. ACTIONS */}
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-black hover:text-white transition-colors bg-white border border-black rounded-full hover:bg-black">
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-glow text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-md">
                  {count}
                </span>
              )}
            </Link>

            {/* Auth Button (Desktop) */}
            <div className="hidden md:block">
              {user ? (
                <Link to={user.role === 'admin' ? "/admin" : "/account"} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-black border border-dark hover:border-brand-glow/50 hover:bg-dark hover:text-white transition-all">
                  <User size={14} className="text-brand-glow text-black" />
                  <span className="text-[10px] font-bold text-black uppercase">{user.profile?.first_name || 'Account'}</span>
                </Link>
              ) : (
                <Link to="/login" className="text-[10px] font-bold uppercase tracking-widest text-black px-4 py-2 border border-white bg-white rounded-lg hover:bg-brand-glow hover:text-white hover:bg-black transition-all">
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden p-2 text-black bg-white rounded-full border border-black relative z-[110]"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 4. ANIMATED MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[101]"
            />

            {/* Slide-out Panel */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-dark-950 border-l border-white/10 z-[102] flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-dark-900">
                {/* Mobile Drawer Logo */}
                 <img 
                      src={config?.logo_url || DEFAULT_LOGO} 
                      alt="Cloud 7"
                      className="h-18 w-auto object-contain" 
                 />
                <button onClick={toggleMobileMenu} className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                   <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-2">
                {/* Navigation Links */}
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
                        {user.profile?.first_name?.charAt(0) || <User size={20}/>}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-white font-bold text-lg">{user.profile?.first_name || 'User'}</p>
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

// Helper Component for Animated Links
const MobileLink = ({ to, idx, onClick, children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: idx * 0.1 }}
  >
    <Link 
      to={to} 
      onClick={onClick}
      className="block text-xl font-bold text-slate-300 hover:text-white hover:pl-2 transition-all py-3 border-b border-white/5 uppercase"
    >
      {children}
    </Link>
  </motion.div>
);

export default Navbar;