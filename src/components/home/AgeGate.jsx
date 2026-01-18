// // // src/components/common/AgeGate.jsx
// // import React, { useState, useEffect } from 'react';

// // const AgeGate = ({ onVerify }) => {
// //   const [ageCheckStatus, setAgeCheckStatus] = useState('loading'); // loading, verified, blocked, pending

// //   useEffect(() => {
// //     // Check local storage on mount
// //     const isVerified = localStorage.getItem('isAgeVerified');
// //     if (isVerified === 'true') {
// //       setAgeCheckStatus('verified');
// //       onVerify(true); // Tell parent we are verified
// //     } else {
// //       setAgeCheckStatus('pending');
// //       onVerify(false);
// //     }
// //   }, [onVerify]);

// //   const handleYes = () => {
// //     localStorage.setItem('isAgeVerified', 'true');
// //     setAgeCheckStatus('verified');
// //     onVerify(true);
// //   };

// //   const handleNo = () => {
// //     setAgeCheckStatus('blocked');
// //   };

// //   // If verified, do not render anything
// //   if (ageCheckStatus === 'verified' || ageCheckStatus === 'loading') return null;

// //   return (
// //     // Fixed overlay with high z-index and backdrop blur
// //     <div className="fixed inset-0 z-[9999] flex items-center justify-center">
// //       {/* 1. The Backdrop:
// //         - bg-black/60 makes it dark.
// //         - backdrop-blur-xl creates the heavy blur effect on the website behind.
// //       */}
// //       <div className="absolute inset-0 bg-dark-950/80 backdrop-blur-xl" />

// //       {/* 2. The Modal Content */}
// //       <div className="relative z-10 w-full max-w-md p-8 mx-4 text-center border bg-dark-900 border-white/10 rounded-2xl shadow-2xl">
        
// //         {ageCheckStatus === 'pending' ? (
// //           <>
// //             <h2 className="text-3xl font-bold text-white mb-2">Age Verification</h2>
// //             <p className="text-gray-400 mb-8">
// //               You must be 21 years or older to enter this site.
// //             </p>

// //             <div className="flex flex-col gap-3">
// //               <button
// //                 onClick={handleYes}
// //                 className="w-full py-3 text-sm font-bold uppercase tracking-wider bg-white text-dark-900 hover:bg-gray-200 transition-colors rounded"
// //               >
// //                 Yes, I am 21+
// //               </button>
// //               <button
// //                 onClick={handleNo}
// //                 className="w-full py-3 text-sm font-bold uppercase tracking-wider border border-white/20 text-white hover:bg-white/5 transition-colors rounded"
// //               >
// //                 No, I am not
// //               </button>
// //             </div>
// //             <p className="mt-6 text-xs text-gray-500">
// //               By entering, you agree to our Terms of Service and Privacy Policy.
// //             </p>
// //           </>
// //         ) : (
// //           /* BLOCKED STATE */
// //           <div className="py-8">
// //             <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
// //             <p className="text-gray-300">
// //               You are not permitted to view this content.
// //             </p>
// //             <p className="text-xs text-gray-500 mt-4">
// //               Please close this tab or navigate away.
// //             </p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AgeGate;
// import React, { useState, useEffect } from 'react';
// import { ShieldAlert, ChevronRight } from 'lucide-react'; // Adding icons for visual hierarchy

// const AgeGate = ({ onVerify }) => {
//   const [ageCheckStatus, setAgeCheckStatus] = useState('loading');

//   useEffect(() => {
//     const isVerified = localStorage.getItem('isAgeVerified');
//     if (isVerified === 'true') {
//       setAgeCheckStatus('verified');
//       onVerify(true);
//     } else {
//       setAgeCheckStatus('pending');
//       onVerify(false);
//     }
//   }, [onVerify]);

//   const handleYes = () => {
//     localStorage.setItem('isAgeVerified', 'true');
//     setAgeCheckStatus('verified');
//     onVerify(true);
//   };

//   const handleNo = () => {
//     setAgeCheckStatus('blocked');
//   };

//   if (ageCheckStatus === 'verified' || ageCheckStatus === 'loading') return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
//       {/* 1. THE BACKDROP - Solid dark overlay instead of heavy blur */}
//       <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-sm" />

//       {/* 2. THE MODAL CARD */}
//       <div className="relative z-10 w-full max-w-lg overflow-hidden bg-dark-900 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
        
//         {/* Top Accent Bar */}
//         <div className="h-1.5 w-full bg-gradient-to-r from-brand-glow via-blue-500 to-purple-600" />

//         <div className="p-8 md:p-12 text-center">
//           {ageCheckStatus === 'pending' ? (
//             <>
//               {/* Icon / Caution Symbol */}
//               <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-white/5 border border-white/10">
//                 <ShieldAlert className="w-8 h-8 text-brand-glow" />
//               </div>

//               <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight uppercase italic">
//                 Age <span className="text-brand-glow">Verification</span>
//               </h2>
              
//               <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-sm mx-auto">
//                 This experience is tailored for adults. You must be <span className="text-white font-bold underline decoration-brand-glow underline-offset-4">21 or older</span> to enter.
//               </p>

//               <div className="flex flex-col gap-4">
//                 <button
//                   onClick={handleYes}
//                   className="group relative w-full py-4 bg-white text-dark-950 font-black text-sm uppercase tracking-widest rounded-xl hover:bg-brand-glow transition-all active:scale-[0.98] flex items-center justify-center gap-2"
//                 >
//                   I am 21 or Older
//                   <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                 </button>
                
//                 <button
//                   onClick={handleNo}
//                   className="w-full py-4 bg-transparent text-slate-400 font-bold text-xs uppercase tracking-widest border border-white/5 rounded-xl hover:bg-white/5 hover:text-white transition-all"
//                 >
//                   No, Exit Site
//                 </button>
//               </div>

//               <div className="mt-10 pt-8 border-t border-white/5">
//                 <p className="text-[10px] text-slate-500 leading-normal uppercase tracking-tighter">
//                   By clicking enter, you verify that you are of legal age and agree to our <br />
//                   <span className="text-slate-400">Terms of Service</span> & <span className="text-slate-400">Privacy Policy</span>.
//                 </p>
//               </div>
//             </>
//           ) : (
//             /* BLOCKED STATE - HIGH CONTRAST RED */
//             <div className="py-6">
//               <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-500/10 border border-red-500/20">
//                 <X size={40} className="text-red-500" />
//               </div>
//               <h2 className="text-3xl font-black text-white mb-4 uppercase">Access Denied</h2>
//               <p className="text-slate-400 max-w-xs mx-auto mb-0">
//                 You do not meet the age requirements to view this content.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgeGate;
// src/components/common/AgeGate.jsx
import React, { useState, useEffect } from 'react';
import { ShieldAlert, ChevronRight, X } from 'lucide-react';

const AgeGate = ({ onVerify }) => {
  const [ageCheckStatus, setAgeCheckStatus] = useState('loading');

  useEffect(() => {
    const isVerified = localStorage.getItem('isAgeVerified');
    if (isVerified === 'true') {
      setAgeCheckStatus('verified');
      onVerify(true);
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

  if (ageCheckStatus === 'verified' || ageCheckStatus === 'loading') return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* 1. THE BACKDROP - Solid Black (95% opacity) to hide the website behind it */}
      <div className="absolute inset-0 bg-black/95" />

      {/* 2. THE MODAL CARD - Solid White Background */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Optional: A very subtle top border for a polished look */}
        <div className="h-2 w-full bg-gray-900" />

        <div className="p-10 text-center">
          {ageCheckStatus === 'pending' ? (
            <>
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-100 text-black">
                <ShieldAlert className="w-8 h-8" />
              </div>

              <h2 className="text-3xl font-black text-gray-900 mb-3 uppercase tracking-tight">
                Age Verification
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                This website contains age-restricted content. <br/>
                You must be <span className="font-bold text-black underline decoration-2 underline-offset-2">21 or older</span> to enter.
              </p>

              <div className="flex flex-col gap-4">
                {/* Primary Action - High Contrast Black Button */}
                <button
                  onClick={handleYes}
                  className="group w-full py-4 bg-black text-white font-bold text-sm uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                >
                  I am 21 or Older
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                {/* Secondary Action - White Button with Border */}
                <button
                  onClick={handleNo}
                  className="w-full py-4 bg-white text-gray-900 font-bold text-xs uppercase tracking-widest border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  No, Exit Site
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400 font-medium">
                  By clicking enter, you agree to our Terms of Service & Privacy Policy.
                </p>
              </div>
            </>
          ) : (
            /* BLOCKED STATE - Clean White/Red */
            <div className="py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-red-50 text-red-600">
                <X size={40} />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-4 uppercase">Access Denied</h2>
              <p className="text-gray-600 max-w-xs mx-auto mb-6">
                You do not meet the age requirements to view this content.
              </p>
              <button 
                 onClick={() => window.history.back()}
                 className="text-sm font-bold text-gray-900 underline hover:text-gray-600"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeGate;