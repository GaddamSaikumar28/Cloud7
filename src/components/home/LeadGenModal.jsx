import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
// import { useAuth } from '../../context/AuthContext'; // 1. Import your Auth Hook
const LeadGenModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, loading } = useAuth(); // 2. Get user and loading state

  useEffect(() => {
    // 3. Logic: If loading, do nothing. If user exists, do nothing.
    if (loading || user) return;

    // 4. Only start timer if visitor is NOT logged in
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, loading]); // Dependencies ensure this re-runs if auth state changes

  const handleClose = () => setIsOpen(false);

  // If user is logged in, force the component to return null immediately
  if (user) return null; 

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* MODAL CONTENT */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:flex md:items-center md:justify-center md:inset-0 pointer-events-none"
          >
            <div className="bg-[#111] border border-white/10 w-full max-w-md mx-auto rounded-t-3xl md:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative">
              
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5 z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-5 border border-white/5 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Sparkles className="text-white w-6 h-6" />
                </div>

                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                  Unlock Cloud7 Rewards
                </h3>
                <p className="text-gray-400 text-sm mb-8 max-w-[280px] leading-relaxed">
                  Join the community for exclusive access to new drops and member-only potency guides.
                </p>

                <Link 
                  to="/signup"
                  className="block w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-wider text-sm hover:bg-gray-200 transition-colors mb-4"
                >
                  Sign Up Now
                </Link>

                <p className="text-gray-500 text-xs font-medium">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-white hover:text-gray-300 transition-colors underline decoration-gray-600 underline-offset-2"
                  >
                    Sign in
                  </Link>
                </p>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#009DDC] to-transparent opacity-50" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LeadGenModal;