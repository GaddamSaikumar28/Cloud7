
import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// --- LAYOUTS ---
import RootLayout from '../layouts/RootLayout';

// --- 1. EAGER IMPORTS (Home Page Only) ---
// Keep ONLY the landing page eager so it loads instantly.
import Home from '../pages/Home';

// --- 2. LAZY IMPORTS (Customer Pages) ---
// Moving these to lazy loading drastically reduces initial load time.
const Shop = lazy(() => import('../pages/Shop'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Science = lazy(() => import('../pages/Science'));
const Contact = lazy(() => import('../pages/Contact'));
const Learn = lazy(() => import('../pages/Learn'));
const Cart = lazy(() => import('../pages/Cart'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Account = lazy(() => import('../pages/Account'));

// --- 3. LAZY IMPORTS (Admin) ---
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
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
const AdminPromoConfig = lazy(() => import('../pages/admin/AdminPromoConfig'));
const AdminPhotoMarquee = lazy(() => import('../pages/admin/MarqueeManager'));
// Shared Loading State for Customers
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cloud-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Admin Specific Loader
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
      { 
        path: "shop", 
        element: <Suspense fallback={<PageLoader />}><Shop /></Suspense> 
      },
      { 
        path: "product/:slug", 
        element: <Suspense fallback={<PageLoader />}><ProductDetail /></Suspense> 
      },
      { 
        path: "science", 
        element: <Suspense fallback={<PageLoader />}><Science /></Suspense> 
      },
      { 
        path: "cart", 
        element: <Suspense fallback={<PageLoader />}><Cart /></Suspense> 
      },
      { 
        path: "login", 
        element: <Suspense fallback={<PageLoader />}><Login /></Suspense> 
      },
      { 
        path: "signup", 
        element: <Suspense fallback={<PageLoader />}><Signup /></Suspense> 
      },
      { 
        path: "account", 
        element: <Suspense fallback={<PageLoader />}><Account /></Suspense> 
      },
      { 
        path: "learn", 
        element: <Suspense fallback={<PageLoader />}><Learn /></Suspense> 
      },
      { 
        path: "contact", 
        element: <Suspense fallback={<PageLoader />}><Contact /></Suspense> 
      },
    ],
  },
  
  {
    path: "/admin",
    element: (
      <Suspense fallback={<AdminLoader />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <AdminProducts /> },
      { path: "products/new", element: <AdminProductForm /> },
      { path: "products/edit/:slug", element: <AdminProductForm /> },
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
      { path: "promo-config", element :<AdminPromoConfig /> },
      { path: "essence-config", element :<AdminEssence /> },
      { path: "process-config", element :<AdminProcess /> },
      { path: "learn", element :<AdminLearn /> },
      { path: "navigation", element :<AdminNavigation /> },
      { path: "footer", element :<AdminFooter /> },
      { path: "photo-marquee", element :<AdminPhotoMarquee />  }
    ]
  }
]);