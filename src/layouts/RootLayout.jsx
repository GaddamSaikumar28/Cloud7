
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import AgeGate from '../components/home/AgeGate'; // Import the new component

const RootLayout = () => {
  // We keep track if verification is complete just in case you want to 
  // completely hide the DOM, but for the "blur" effect to work, 
  // we actually need the DOM to render behind the modal.
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="relative min-h-screen bg-dark-900 selection:bg-white/20 flex flex-col">
      
      {/* 1. The Age Gate Overlay */}
      <AgeGate onVerify={setIsVerified} />

      {/* 2. The Main Content 
         We add a conditional class logic here.
         If NOT verified, we can strictly disable scrolling on the body content 
         to prevent users from scrolling while the popup is open.
      */}
      <div className={`${!isVerified ? 'h-screen overflow-hidden' : 'flex flex-col flex-grow'}`}>
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;