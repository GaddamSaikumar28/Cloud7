
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  LogOut, ShieldAlert, ChevronRight, Menu, Home,
  Settings2, ClipboardList, Wallet, MessageSquare, Microscope, LayoutTemplate, Flag, Megaphone, Workflow, BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- SECURITY CHECK ---
  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        navigate('/'); // Kick non-admins out
      }
    }
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', path: '/admin/orders' },
    { icon: Users, label: 'Customers', path: '/admin/customers' },
    { icon: Settings2, label:'Variants', path:'/admin/variants'},
    { icon: ClipboardList, label: 'Inventory', path: '/admin/inventory' },
    { icon: Wallet, label: 'Financials', path: '/admin/payments' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: Microscope, label: 'Lab Reports', path: '/admin/lab-config' },
    { icon: MessageSquare, label: 'Messages & FAQ', path: '/admin/contact' },
    { icon: LayoutTemplate, label: 'Hero Editor', path: '/admin/hero' },
    { icon: Flag, label: 'Banner Config', path: '/admin/banner' },
    { icon: Megaphone, label: 'CTA Section', path: '/admin/cta-config' },
    { icon: LayoutTemplate, label: 'Promo Config', path: '/admin/promo-config' },
    { icon: ShieldAlert, label: 'Essence Config', path: '/admin/essence-config' },
    { icon: Workflow, label: 'Process Steps', path: '/admin/process-config' },
    { icon: BookOpen, label: 'Research Hub', path: '/admin/learn' },
    { icon: LayoutDashboard, label: 'Navigation', path: '/admin/navigation' },
    { icon: LayoutTemplate, label: 'Footer', path: '/admin/footer' },
   
  ];

  return (
    <div className="h-screen bg-dark-950 flex text-white font-sans selection:bg-brand-glow selection:text-black overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-white/5 
        flex flex-col h-full
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0
      `}>
        {/* Sidebar Header */}
        <div className="p-8 border-b border-white/5 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-glow to-blue-600 flex items-center justify-center">
            <ShieldAlert size={18} className="text-white" />
          </div>
          <span className="font-black tracking-tighter text-xl">Cloud7 ADMIN</span>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => (
            <NavLink 
              key={item.path} 
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on mobile click
              end={item.path === '/admin'} 
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden shrink-0
                ${isActive ? 'text-white bg-white/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={isActive ? 'text-brand-glow' : 'group-hover:text-brand-glow transition-colors'} />
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                  {isActive && <motion.div layoutId="active-pill" className="absolute left-0 top-0 bottom-0 w-1 bg-brand-glow rounded-r-full" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer (Pinned to bottom) */}
        <div className="p-4 border-t border-white/5 shrink-0 bg-dark-900">
          <div className="grid grid-cols-2 gap-2">
            {/* Home Button */}
            <button 
              onClick={() => navigate('/')} 
              className="flex flex-col items-center justify-center gap-1 p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all border border-white/5 hover:border-white/20"
              title="Go to Live Site"
            >
              <Home size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">View Site</span>
            </button>

            {/* Logout Button */}
            <button 
              onClick={logout} 
              className="flex flex-col items-center justify-center gap-1 p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all border border-red-500/10 hover:border-red-500/30"
              title="Sign Out"
            >
              <LogOut size={20} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* OVERLAY for Mobile (closes menu when clicking outside) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-dark-900/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 z-10">
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu size={24} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white">{user.profile?.first_name} {user.profile?.last_name}</p>
              <p className="text-xs text-brand-glow font-mono uppercase tracking-widest">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-purple-600 border-2 border-dark-800 shadow-lg" />
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar scroll-smooth">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;