import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-dark-900 text-center px-4">
      <h1 className="text-9xl font-bold text-white/10">404</h1>
      <h2 className="text-2xl text-white mt-4">Page not found</h2>
      <p className="text-slate-400 mt-2 mb-8">The molecule you are looking for has evaporated.</p>
      <Link 
        to="/" 
        className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;