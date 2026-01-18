// // // // // import { createBrowserRouter } from 'react-router-dom';
// // // // // import RootLayout from '../layouts/RootLayout';
// // // // // import Home from '../pages/Home';
// // // // // import Shop from '../pages/Shop';
// // // // // import NotFound from '../pages/NotFound';

// // // // // export const router = createBrowserRouter([
// // // // //   {
// // // // //     path: "/",
// // // // //     element: <RootLayout />,
// // // // //     errorElement: <NotFound />,
// // // // //     children: [
// // // // //       {
// // // // //         index: true,
// // // // //         element: <Home />,
// // // // //       },
// // // // //       {
// // // // //         path: "shop",
// // // // //         element: <Shop />,
// // // // //       },
// // // // //       {
// // // // //         path: "science",
// // // // //         element: <div className="p-20 text-center">Science Page (Coming Soon)</div>,
// // // // //       },
// // // // //       // Add other routes here easily
// // // // //     ],
// // // // //   },
// // // // // ]);
// // // // // src/router/index.jsx
// // // // import { createBrowserRouter } from 'react-router-dom';
// // // // import RootLayout from '../layouts/RootLayout';
// // // // import Home from '../pages/Home';
// // // // import Shop from '../pages/Shop';
// // // // import ProductDetail from '../pages/ProductDetail'; // We will create this next
// // // // import NotFound from '../pages/NotFound';

// // // // export const router = createBrowserRouter([
// // // //   {
// // // //     path: "/",
// // // //     element: <RootLayout />,
// // // //     errorElement: <NotFound />,
// // // //     children: [
// // // //       { index: true, element: <Home /> },
// // // //       { path: "shop", element: <Shop /> },
// // // //       { path: "shop/:id", element: <ProductDetail /> }, // Dynamic Route
// // // //     ],
// // // //   },
// // // // ]);
// // // // import { createBrowserRouter } from 'react-router-dom';
// // // // import RootLayout from '../layouts/RootLayout';
// // // // import Home from '../pages/Home';
// // // // import Shop from '../pages/Shop';
// // // // import ProductDetail from '../pages/ProductDetail';
// // // // import Science from '../pages/Science'; // New
// // // // import Contact from '../pages/Contact'; // New
// // // // import Learn from '../pages/Learn';     // New
// // // // import Cart from '../pages/Cart';       // New
// // // // import Login from '../pages/Login';     // New
// // // // import Signup from '../pages/Signup';   // New
// // // // export const router = createBrowserRouter([
// // // //   {
// // // //     path: "/",
// // // //     element: <RootLayout />,
// // // //     children: [
// // // //       { index: true, element: <Home /> },
// // // //       { path: "shop", element: <Shop /> },
// // // //       { path: "shop/:id", element: <ProductDetail /> },
// // // //       { path: "science", element: <Science /> },
// // // //       { path: "contact", element: <Contact /> }, // Handles both Contact & FAQ
// // // //       { path: "learn", element: <Learn /> },
// // // //       { path: "cart", element: <Cart /> },
// // // //       { path: "login", element: <Login /> },
// // // //       { path: "signup", element: <Signup /> },
// // // //     ],
// // // //   },
// // // // ]);

// // // import { createBrowserRouter } from 'react-router-dom';
// // // import { lazy, Suspense } from 'react';
// // // import RootLayout from '../layouts/RootLayout';

// // // // 1. Replace static imports with lazy imports
// // // const Home = lazy(() => import('../pages/Home'));
// // // const Shop = lazy(() => import('../pages/Shop'));
// // // const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// // // const Science = lazy(() => import('../pages/Science'));
// // // const Contact = lazy(() => import('../pages/Contact'));
// // // const Learn = lazy(() => import('../pages/Learn'));
// // // const Cart = lazy(() => import('../pages/Cart'));
// // // const Login = lazy(() => import('../pages/Login'));
// // // const Signup = lazy(() => import('../pages/Signup'));

// // // // 2. Create a helper component to wrap lazy elements with Suspense
// // // // This prevents repetitive code in your route definitions
// // // const Loadable = (Component) => (props) => (
// // //   <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
// // //     <Component {...props} />
// // //   </Suspense>
// // // );

// // // export const router = createBrowserRouter([
// // //   {
// // //     path: "/",
// // //     element: <RootLayout />,
// // //     children: [
// // //       { index: true, element: <Loadable Component={Home} /> },
// // //       { path: "shop", element: <Loadable Component={Shop} /> },
// // //       { path: "shop/:id", element: <Loadable Component={ProductDetail} /> },
// // //       { path: "science", element: <Loadable Component={Science} /> },
// // //       { path: "contact", element: <Loadable Component={Contact} /> },
// // //       { path: "learn", element: <Loadable Component={Learn} /> },
// // //       { path: "cart", element: <Loadable Component={Cart} /> },
// // //       { path: "login", element: <Loadable Component={Login} /> },
// // //       { path: "signup", element: <Loadable Component={Signup} /> },
// // //     ],
// // //   },
// // // ]);

// // // import { createBrowserRouter } from 'react-router-dom';
// // // import { lazy, Suspense } from 'react';
// // // import RootLayout from '../layouts/RootLayout';

// // // // 1. Lazy imports remain the same
// // // const Home = lazy(() => import('../pages/Home'));
// // // const Shop = lazy(() => import('../pages/Shop'));
// // // const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// // // const Science = lazy(() => import('../pages/Science'));
// // // const Contact = lazy(() => import('../pages/Contact'));
// // // const Learn = lazy(() => import('../pages/Learn'));
// // // const Cart = lazy(() => import('../pages/Cart'));
// // // const Login = lazy(() => import('../pages/Login'));
// // // const Signup = lazy(() => import('../pages/Signup'));

// // // /**
// // //  * 2. Corrected Loadable Wrapper
// // //  * We wrap the lazy component in Suspense and return the JSX tag <Component />
// // //  */
// // // const Loadable = (Component) => (
// // //   <Suspense fallback={<div>Loading...</div>}>
// // //     <Component />
// // //   </Suspense>
// // // );

// // // export const router = createBrowserRouter([
// // //   {
// // //     path: "/",
// // //     element: <RootLayout />,
// // //     children: [
// // //       // We call Loadable(Home) which returns the <Suspense><Home /></Suspense> element
// // //       { index: true, element: Loadable(Home) },
// // //       { path: "shop", element: Loadable(Shop) },
// // //       { path: "product/:slug", element: Loadable(ProductDetail) },
// // //       { path: "science", element: Loadable(Science) },
// // //       { path: "contact", element: Loadable(Contact) },
// // //       { path: "learn", element: Loadable(Learn) },
// // //       { path: "cart", element: Loadable(Cart) },
// // //       { path: "login", element: Loadable(Login) },
// // //       { path: "signup", element: Loadable(Signup) },
// // //     ],
// // //   },
// // // ]);

// // import { createBrowserRouter } from 'react-router-dom';
// // import { lazy, Suspense } from 'react';
// // import RootLayout from '../layouts/RootLayout';

// // // Core Pages
// // const Home = lazy(() => import('../pages/Home'));
// // const Shop = lazy(() => import('../pages/Shop'));
// // const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// // const Science = lazy(() => import('../pages/Science'));
// // const Contact = lazy(() => import('../pages/Contact'));
// // const Learn = lazy(() => import('../pages/Learn'));
// // const Cart = lazy(() => import('../pages/Cart'));
// // const Login = lazy(() => import('../pages/Login'));
// // const Signup = lazy(() => import('../pages/Signup'));

// // // NEW: Account & Admin Pages
// // // const Orders = lazy(() => import('../pages/account/Orders'));
// // // const AccountSettings = lazy(() => import('../pages/account/Settings'));
// // // const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));

// // /**
// //  * Enhanced Loadable Wrapper
// //  * Using a consistent loading state matching your brand aesthetic
// //  */
// // const Loadable = (Component) => (
// //   <Suspense fallback={
// //     <div className="min-h-screen bg-dark-900 flex items-center justify-center">
// //       <div className="w-12 h-12 border-2 border-brand-glow/20 border-t-brand-glow rounded-full animate-spin" />
// //     </div>
// //   }>
// //     <Component />
// //   </Suspense>
// // );

// // export const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <RootLayout />,
// //     children: [
// //       { index: true, element: Loadable(Home) },
// //       { path: "shop", element: Loadable(Shop) },
// //       { path: "product/:slug", element: Loadable(ProductDetail) },
// //       { path: "science", element: Loadable(Science) },
// //       { path: "contact", element: Loadable(Contact) },
// //       { path: "learn", element: Loadable(Learn) },
// //       { path: "cart", element: Loadable(Cart) },
// //       { path: "login", element: Loadable(Login) },
// //       { path: "signup", element: Loadable(Signup) },
      
// //       // New Protected/Account Routes
// //       // { path: "orders", element: Loadable(Orders) },
// //       // { path: "account", element: Loadable(AccountSettings) },
      
// //       // // Admin Routes
// //       // { path: "admin", element: Loadable(AdminDashboard) },
// //     ],
// //   },
// // ]);

// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import RootLayout from '../layouts/RootLayout';

// // Lazy imports
// const Home = lazy(() => import('../pages/Home'));
// const Shop = lazy(() => import('../pages/Shop'));
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// const Science = lazy(() => import('../pages/Science'));
// const Contact = lazy(() => import('../pages/Contact'));
// const Learn = lazy(() => import('../pages/Learn'));
// const Cart = lazy(() => import('../pages/Cart'));
// const Login = lazy(() => import('../pages/Login'));
// const Signup = lazy(() => import('../pages/Signup'));
// // const Orders = lazy(() => import('../pages/account/Orders'));
// // const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));

// // FIX: Loadable must return a component (a function), not a JSX tag.
// const Loadable = (Component) => (props) => (
//   <Suspense fallback={
//     <div className="min-h-screen bg-dark-900 flex items-center justify-center">
//       <div className="w-12 h-12 border-2 border-brand-glow/20 border-t-brand-glow rounded-full animate-spin" />
//     </div>
//   }>
//     <Component {...props} />
//   </Suspense>
// );

// // Create the components from the wrapper
// const HomeComp = Loadable(Home);
// const ShopComp = Loadable(Shop);
// const ProductComp = Loadable(ProductDetail);
// const ScienceComp = Loadable(Science);
// const ContactComp = Loadable(Contact);
// const LearnComp = Loadable(Learn);
// const CartComp = Loadable(Cart);
// const LoginComp = Loadable(Login);
// const SignupComp = Loadable(Signup);
// // const OrdersComp = Loadable(Orders);
// // const AdminComp = Loadable(AdminDashboard);

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <HomeComp /> },
//       { path: "shop", element: <ShopComp /> },
//       { path: "product/:slug", element: <ProductComp /> },
//       { path: "science", element: <ScienceComp /> },
//       { path: "contact", element: <ContactComp /> },
//       { path: "learn", element: <LearnComp /> },
//       { path: "cart", element: <CartComp /> },
//       { path: "login", element: <LoginComp /> },
//       { path: "signup", element: <SignupComp /> },
//       // { path: "orders", element: <OrdersComp /> },
//       // { path: "admin", element: <AdminComp /> },
//     ],
//   },
// ]);

// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import RootLayout from '../layouts/RootLayout';

// // Helper for a consistent loader
// const Loader = () => (
//   <div className="min-h-screen bg-dark-900 flex items-center justify-center">
//     <div className="w-12 h-12 border-2 border-brand-glow/20 border-t-brand-glow rounded-full animate-spin" />
//   </div>
// );

// // Lazy imports - Ensure these files EXIST and have "export default"
// const Home = lazy(() => import('../pages/Home'));
// const Shop = lazy(() => import('../pages/Shop'));
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// const Science = lazy(() => import('../pages/Science'));
// const Contact = lazy(() => import('../pages/Contact'));
// const Learn = lazy(() => import('../pages/Learn'));
// const Cart = lazy(() => import('../pages/Cart'));
// const Login = lazy(() => import('../pages/Login'));
// const Signup = lazy(() => import('../pages/signup'));

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { 
//         index: true, 
//         element: <Suspense fallback={<Loader />}><Home /></Suspense> 
//       },
//       { 
//         path: "shop", 
//         element: <Suspense fallback={<Loader />}><Shop /></Suspense> 
//       },
//       { 
//         path: "product/:slug", 
//         element: <Suspense fallback={<Loader />}><ProductDetail /></Suspense> 
//       },
//       { 
//         path: "science", 
//         element: <Suspense fallback={<Loader />}><Science /></Suspense> 
//       },
//       { 
//         path: "cart", 
//         element: <Suspense fallback={<Loader />}><Cart /></Suspense> 
//       },
//       { 
//         path: "login", 
//         element: <Suspense fallback={<Loader />}><Login /></Suspense> 
//       },
//       { 
//         path: "signup", 
//         element: <Suspense fallback={<Loader />}><Signup /></Suspense> 
//       }
//     ],
//   },
// ]);

// import { createBrowserRouter } from 'react-router-dom';
// import { lazy, Suspense } from 'react';
// import RootLayout from '../layouts/RootLayout';

// // Helper for a consistent loader
// const Loader = () => (
//   <div className="min-h-screen bg-dark-900 flex items-center justify-center">
//     <div className="w-12 h-12 border-2 border-brand-glow/20 border-t-brand-glow rounded-full animate-spin" />
//   </div>
// );

// // Lazy imports
// const Home = lazy(() => import('../pages/Home'));
// const Shop = lazy(() => import('../pages/Shop'));
// const ProductDetail = lazy(() => import('../pages/ProductDetail'));
// const Science = lazy(() => import('../pages/Science'));
// const Contact = lazy(() => import('../pages/Contact'));
// const Learn = lazy(() => import('../pages/Learn'));
// const Cart = lazy(() => import('../pages/Cart'));
// const Login = lazy(() => import('../pages/Login'));
// const Signup = lazy(() => import('../pages/Signup')); // Check casing of filename
// const Account = lazy(() => import('../pages/Account')); // NEW

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { 
//         index: true, 
//         element: <Suspense fallback={<Loader />}><Home /></Suspense> 
//       },
//       { 
//         path: "shop", 
//         element: <Suspense fallback={<Loader />}><Shop /></Suspense> 
//       },
//       { 
//         path: "product/:slug", 
//         element: <Suspense fallback={<Loader />}><ProductDetail /></Suspense> 
//       },
//       { 
//         path: "science", 
//         element: <Suspense fallback={<Loader />}><Science /></Suspense> 
//       },
//       { 
//         path: "cart", 
//         element: <Suspense fallback={<Loader />}><Cart /></Suspense> 
//       },
//       { 
//         path: "login", 
//         element: <Suspense fallback={<Loader />}><Login /></Suspense> 
//       },
//       { 
//         path: "signup", 
//         element: <Suspense fallback={<Loader />}><Signup /></Suspense> 
//       },
//       { 
//         path: "account", 
//         element: <Suspense fallback={<Loader />}><Account /></Suspense> 
//       },
//       { 
//         path: "learn", 
//         element: <Suspense fallback={<Loader />}><Learn /></Suspense> 
//       },
//       { 
//         path: "contact", 
//         element: <Suspense fallback={<Loader />}><Contact /></Suspense> 
//       }
//     ],
//   },
// ]);
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