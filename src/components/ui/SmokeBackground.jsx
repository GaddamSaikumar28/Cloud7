// src/components/ui/SmokeBackground.jsx
import React from 'react';

const SmokeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep Atmosphere */}
      <div className="absolute inset-0 bg-dark-900" />
      
      {/* Moving Smoke/Fog Layers */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 animate-smoke-drift">
         <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_60%)] blur-[100px]" />
      </div>
      
      <div className="absolute bottom-0 right-0 w-full h-full opacity-20 animate-float-delayed">
         <div className="absolute bottom-[-20%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(168,199,250,0.1)_0%,transparent_70%)] blur-[120px]" />
      </div>
    </div>
  );
};

export default SmokeBackground;