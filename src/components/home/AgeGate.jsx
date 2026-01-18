// src/components/common/AgeGate.jsx
import React, { useState, useEffect } from 'react';

const AgeGate = ({ onVerify }) => {
  const [ageCheckStatus, setAgeCheckStatus] = useState('loading'); // loading, verified, blocked, pending

  useEffect(() => {
    // Check local storage on mount
    const isVerified = localStorage.getItem('isAgeVerified');
    if (isVerified === 'true') {
      setAgeCheckStatus('verified');
      onVerify(true); // Tell parent we are verified
    } else {
      setAgeCheckStatus('pending');
      onVerify(false);
    }
  }, [onVerify]);

  const handleYes = () => {
    localStorage.setItem('isAgeVerified', 'true');
    setAgeCheckStatus('verified');
    onVerify(true);
  };

  const handleNo = () => {
    setAgeCheckStatus('blocked');
  };

  // If verified, do not render anything
  if (ageCheckStatus === 'verified' || ageCheckStatus === 'loading') return null;

  return (
    // Fixed overlay with high z-index and backdrop blur
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 1. The Backdrop:
        - bg-black/60 makes it dark.
        - backdrop-blur-xl creates the heavy blur effect on the website behind.
      */}
      <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-xl" />

      {/* 2. The Modal Content */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 text-center border bg-dark-900 border-white/10 rounded-2xl shadow-2xl">
        
        {ageCheckStatus === 'pending' ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">Age Verification</h2>
            <p className="text-gray-400 mb-8">
              You must be 21 years or older to enter this site.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleYes}
                className="w-full py-3 text-sm font-bold uppercase tracking-wider bg-white text-dark-900 hover:bg-gray-200 transition-colors rounded"
              >
                Yes, I am 21+
              </button>
              <button
                onClick={handleNo}
                className="w-full py-3 text-sm font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-colors rounded"
              >
                No, I am not
              </button>
            </div>
            <p className="mt-6 text-xs text-gray-500">
              By entering, you agree to our Terms of Service and Privacy Policy.
            </p>
          </>
        ) : (
          /* BLOCKED STATE */
          <div className="py-8">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
            <p className="text-gray-300">
              You are not permitted to view this content.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Please close this tab or navigate away.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgeGate;