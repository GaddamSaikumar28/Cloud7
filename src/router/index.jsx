
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// --- LAYOUTS ---
import RootLayout from '../layouts/RootLayout';

// --- 1. EAGER IMPORTS (Instant Navigation for Customers) ---
// We import these directly so they are bundled together. 
// No spinners when clicking between Home and Shop.
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import ProductDetail from '../pages/ProductDetail';
import Science from '../pages/Science';
import Contact from '../pages/Contact';
import Learn from '../pages/Learn';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Account from '../pages/Account';
// import AdminContact from '../pages/admin/AdminContact';

// --- 2. LAZY IMPORTS (Admin Only) ---
// We DO want to lazy load the Admin section because:
// A) Regular customers don't need this code (saves them bandwidth).
// B) It contains heavy libraries like Recharts.
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
// const AdminProducts = lazy(() => import('../pages/admin/AdminProducts')); // (Coming soon)
const AdminProducts = lazy(() => import('../pages/admin/AdminProducts'));
const AdminProductForm = lazy(() => import('../pages/admin/AdminProductForm'));
const AdminOrders = lazy(() => import('../pages/admin/AdminOrders'));
const AdminOrderDetail = lazy(() => import('../pages/admin/AdminOrderDetail'));
const AdminVariants = lazy(() => import('../pages/admin/AdminVariants'));
const AdminInventory = lazy(() => import('../pages/admin/AdminInventory'));
const AdminPayments = lazy(() => import('../pages/admin/AdminPayments'));
const AdminReviews = lazy(() => import('../pages/admin/AdminReviews'));
const AdminCustomers = lazy(() => import('../pages/admin/AdminCustomers'));
const AdminLabConfig = lazy(() => import('../pages/admin/AdminLabConfig'));
const AdminContact = lazy(() => import('../pages/admin/AdminContact'));
const AdminHero = lazy(() => import('../pages/admin/AdminHero'));
const AdminBanner = lazy(() => import('../pages/admin/AdminBanner'));
const AdminCTAConfig = lazy(() => import('../pages/admin/AdminCTA'));
const AdminEssence = lazy(() => import('../pages/admin/AdminEssence'));
const AdminProcess = lazy(() => import('../pages/admin/AdminProcess'));
const AdminLearn = lazy(() => import('../pages/admin/AdminLearn'));
const AdminNavigation = lazy(() => import('../pages/admin/AdminNavigation'));
const AdminFooter = lazy(() => import('../pages/admin/AdminFooter'));
// Helper for Admin Loading State
const AdminLoader = () => (
  <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center text-brand-glow">
    <div className="w-12 h-12 border-2 border-current border-t-transparent rounded-full animate-spin mb-4" />
    <span className="text-xs font-mono uppercase tracking-widest">Loading Dashboard...</span>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:slug", element: <ProductDetail /> },
      { path: "science", element: <Science /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "account", element: <Account /> },
      { path: "learn", element: <Learn /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  
  // --- ADMIN ROUTES (Protected & Lazy Loaded) ---
  {
    path: "/admin",
    element: (
      <Suspense fallback={<AdminLoader />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { 
        index: true, 
        element: <Dashboard /> 
      },
      { 
        path: "products", 
        element: <AdminProducts /> 
      },
      { 
        path: "products/new", 
        element: <AdminProductForm /> 
      },
      { 
        path: "products/edit/:slug", 
        element: <AdminProductForm /> 
      },
      { path: "orders", element: <AdminOrders /> },
      { path: "orders/:id", element: <AdminOrderDetail /> },
      { path: "variants", element: <AdminVariants /> },
      { path: "inventory", element: <AdminInventory /> },
      { path: "payments", element: <AdminPayments /> },
      { path: "reviews", element: <AdminReviews /> },
      { path: "customers", element: <AdminCustomers /> },
      { path: "lab-config", element :<AdminLabConfig /> },
      { path: "contact", element :<AdminContact /> },
      { path: "hero", element :<AdminHero /> },
      { path: "banner", element :<AdminBanner /> },
      { path: "cta-config", element :<AdminCTAConfig /> },
      { path: "essence-config", element :<AdminEssence /> },
      { path: "process-config", element :<AdminProcess /> },
      { path: "learn", element :<AdminLearn /> },
      { path: "navigation", element :<AdminNavigation /> },
      { path: "footer", element :<AdminFooter /> },
      // We will add the Products page here in the next step
      // { path: "products", element: <AdminProducts /> }
    ]
  }
]);