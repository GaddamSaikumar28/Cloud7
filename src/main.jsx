
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css';
import { CartProvider } from './context/CartContext'; // Import this
import { AuthProvider } from './context/AuthContext';
import { Suspense } from 'react';
ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
  <AuthProvider>
    <CartProvider>
      <Suspense fallback={<div className="splash-screen">Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </CartProvider>
  </AuthProvider>
</React.StrictMode>,
);