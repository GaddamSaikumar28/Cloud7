// src/components/ui/SmokeSeparator.jsx
import React from 'react';

const SmokeSeparator = () => {
  return (
    <div className="relative h-32 w-full overflow-hidden pointer-events-none -my-10 z-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-glow/5 to-transparent blur-[40px] opacity-60"></div>
      {/* Horizontal smoke wisps */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 blur-xl"></div>
    </div>
  );
};

export default SmokeSeparator;