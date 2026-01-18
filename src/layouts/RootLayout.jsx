import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
// import { products } from '../data/mockData';
// import ChatAssistant from '../components/ai/ChatAssistant';
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-dark-900 selection:bg-white/20 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;