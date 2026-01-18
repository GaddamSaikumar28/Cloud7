
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Package, LogOut, MapPin, Printer, 
  ChevronRight, AlertCircle, Check, Loader2, Truck, CreditCard,
  ChevronDown, Box, Ban, RotateCcw, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

// --- INVOICE GENERATOR (Kept Same) ---
const generateInvoiceHTML = (order, user) => {
  const date = new Date(order.created_at).toLocaleDateString();
  const subtotal = order.order_items.reduce((acc, item) => acc + (item.price_at_purchase * item.quantity), 0);
  
  return `
    <html>
      <head>
        <title>Invoice #${order.id.slice(0, 8)}</title>
        <style>
          body { font-family: 'Helvetica', sans-serif; color: #333; padding: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
          h1 { margin: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { padding: 10px; border-bottom: 1px solid #eee; text-align: left; }
          .right { text-align: right; }
        </style>
      </head>
      <body>
        <div class="header">
          <div><h1>CLOUD 7</h1><p>Invoice #${order.id.slice(0, 8).toUpperCase()}</p></div>
          <div class="right"><p>${date}</p><p>${order.status.toUpperCase()}</p></div>
        </div>
        <p><strong>Bill To:</strong> ${user.first_name} ${user.last_name}</p>
        <p><strong>Ship To:</strong> ${order.shipping_address?.street_address}, ${order.shipping_address?.city}</p>
        <table>
          <thead><tr><th>Item</th><th>Qty</th><th class="right">Total</th></tr></thead>
          <tbody>
            ${order.order_items.map(item => `
              <tr>
                <td>${item.item_name} <br><small>${item.item_variant_label}</small></td>
                <td>${item.quantity}</td>
                <td class="right">$${(item.price_at_purchase * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <h3 class="right">Total: $${Number(order.total_amount).toFixed(2)}</h3>
      </body>
    </html>
  `;
};

const Account = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('orders');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  
  // Profile State
  const [profile, setProfile] = useState({ first_name: '', last_name: '', phone_number: '' });
  const [address, setAddress] = useState({ id: null, street_address: '', city: '', state: '', zip_code: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // --- INITIAL DATA FETCH ---
  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [profData, addrData, ordData] = await Promise.all([
        userApi.getProfile(user.id),
        userApi.getDefaultAddress(user.id),
        userApi.getOrders(user.id)
      ]);

      if (profData) setProfile({
        first_name: profData.first_name || '',
        last_name: profData.last_name || '',
        phone_number: profData.phone_number || ''
      });
      
      if (addrData) setAddress(addrData);
      if (ordData) setOrders(ordData);

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg({ type: '', text: '' });
    try {
      await userApi.updateProfile(user.id, profile);
      if (address.street_address) {
        const savedAddr = await userApi.upsertAddress(user.id, address);
        setAddress(savedAddr);
      }
      setMsg({ type: 'success', text: 'Profile updated successfully.' });
    } catch (err) {
      setMsg({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAction = async (actionType, orderId) => {
    const confirmMsg = actionType === 'cancel' 
      ? "Are you sure you want to cancel this order? This cannot be undone." 
      : "Are you sure you want to return this order?";
      
    if (!window.confirm(confirmMsg)) return;

    try {
      if (actionType === 'cancel') {
        await userApi.cancelOrder(orderId);
        alert("Order cancelled successfully.");
      } else {
        await userApi.requestReturn(orderId, "Customer requested via portal");
        alert("Return requested. We will contact you shortly.");
      }
      // Refresh Data
      fetchData(); 
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePrint = (order) => {
    const html = generateInvoiceHTML(order, { ...user, ...profile });
    const win = window.open('', '', 'height=800,width=800');
    win.document.write(html);
    win.document.close();
    win.print();
  };

  if (authLoading || isLoading) return <div className="min-h-screen bg-dark-900 flex items-center justify-center"><Loader2 className="animate-spin text-brand-glow" size={40} /></div>;

  return (
    <div className="min-h-screen bg-dark-900 pt-28 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* --- SIDEBAR --- */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-glow to-blue-600 p-[2px] mb-4">
              <div className="w-full h-full rounded-full bg-dark-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-white uppercase">
                    {profile.first_name?.[0] || user.email[0]}
                </span>
              </div>
            </div>
            <h2 className="text-white font-bold text-lg mb-1">{profile.first_name || 'User'} {profile.last_name}</h2>
            <p className="text-slate-500 text-xs mb-6 truncate max-w-full px-2">{user.email}</p>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300 text-xs font-bold uppercase tracking-widest transition-colors">
                <LogOut size={14} /> Sign Out
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-2">
            {[
              { id: 'orders', icon: Package, label: 'Order History' },
              { id: 'settings', icon: User, label: 'Profile & Settings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl text-sm font-bold transition-all mb-1 last:mb-0 ${
                  activeTab === tab.id 
                  ? 'bg-brand-glow text-dark-900 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3"><tab.icon size={18} /> {tab.label}</div>
                {activeTab === tab.id && <ChevronRight size={16} />}
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            
            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6">Your Orders</h2>
                
                {orders.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                        <Package className="mx-auto text-slate-600 mb-4" size={48} />
                        <h3 className="text-white font-bold text-lg mb-2">No orders yet</h3>
                        <p className="text-slate-400 text-sm mb-6">Start your precision journey today.</p>
                        <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:bg-cyan-300 transition-colors">Browse Products</button>
                    </div>
                ) : (
                    orders.map(order => (
                        <OrderCard 
                          key={order.id} 
                          order={order} 
                          onPrint={() => handlePrint(order)} 
                          onCancel={() => handleAction('cancel', order.id)}
                          onReturn={() => handleAction('return', order.id)}
                        />
                    ))
                )}
              </motion.div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              >
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-8">Account Settings</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-brand-glow uppercase tracking-widest flex items-center gap-2"><User size={14}/> Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="First Name" value={profile.first_name} onChange={e => setProfile({...profile, first_name: e.target.value})} />
                            <Input label="Last Name" value={profile.last_name} onChange={e => setProfile({...profile, last_name: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Phone Number" value={profile.phone_number} onChange={e => setProfile({...profile, phone_number: e.target.value})} placeholder="+1 (555) 000-0000" />
                            <Input label="Email Address" value={user.email} disabled className="opacity-50 cursor-not-allowed" />
                        </div>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-brand-glow uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Default Shipping Address</h3>
                        <Input label="Street Address" value={address.street_address} onChange={e => setAddress({...address, street_address: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
                            <Input label="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label="ZIP Code" value={address.zip_code} onChange={e => setAddress({...address, zip_code: e.target.value})} />
                        </div>
                    </div>
                    {msg.text && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${msg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {msg.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />} {msg.text}
                        </div>
                    )}
                    <div className="flex justify-end pt-4">
                        <button disabled={isSaving} className="px-8 py-3 bg-brand-glow text-dark-900 font-bold rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)] flex items-center gap-2">
                            {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />} SAVE CHANGES
                        </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const Input = ({ label, className = "", ...props }) => (
  <div className={className}>
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">{label}</label>
    <input className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none transition-colors disabled:opacity-50 placeholder:text-slate-700" {...props} />
  </div>
);

const getOrderImage = (order) => {
    // 1. Try to find first item with a valid product image
    const itemWithImage = order.order_items.find(item => item.products?.cover_image_url);
    if (itemWithImage) return itemWithImage.products.cover_image_url;
    // 2. Fallback
    return "https://via.placeholder.com/150/1a1a1a/ffffff?text=Cloud7";
};

const OrderCard = ({ order, onPrint, onCancel, onReturn }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // Status Config
    const statusConfig = {
        pending: { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20', icon: Loader2 },
        processing: { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20', icon: Box },
        shipped: { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20', icon: Truck },
        delivered: { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20', icon: Check },
        cancelled: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20', icon: Ban },
        returned: { color: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20', icon: RotateCcw },
    };
    
    const status = statusConfig[order.status?.toLowerCase()] || statusConfig.pending;
    const StatusIcon = status.icon;
    const imageUrl = getOrderImage(order);
    
    // Logic for Buttons
    const canCancel = (order.status === 'pending' || order.status === 'processing');
    const canReturn = (order.status === 'delivered');
    const isRefunded = order.payments?.some(p => p.status === 'refunded');

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden transition-all hover:border-white/20">
            {/* Header */}
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    {/* Fixed Image Loading */}
                    <div className={`w-14 h-14 rounded-2xl bg-dark-900 border border-white/10 overflow-hidden shrink-0`}>
                       <img src={imageUrl} alt="Order Preview" className="w-full h-full object-cover" loading="lazy"/>
                    </div>
                    
                    <div>
                        <h4 className="text-white font-bold text-lg">Order #{order.id.slice(0, 8).toUpperCase()}</h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                           <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${status.bg} ${status.color} ${status.border}`}>
                              <StatusIcon size={10} /> {order.status}
                           </span>
                           <span className="text-slate-500 text-xs">• {new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right hidden md:block">
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Total</p>
                        <p className="text-white font-mono font-bold text-lg">${Number(order.total_amount).toFixed(2)}</p>
                    </div>
                    <ChevronDown size={20} className={`text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </div>

            {/* Detailed Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                        <div className="border-t border-white/10 bg-black/20 p-6 md:p-8">
                            
                            {/* Tracking & Refund Info */}
                            <div className="flex flex-col gap-3 mb-6">
                                {(order.tracking_number) && (
                                    <div className="p-4 bg-brand-glow/5 border border-brand-glow/10 rounded-xl flex items-start gap-3">
                                        <Truck className="text-brand-glow shrink-0 mt-1" size={18} />
                                        <div>
                                            <h5 className="text-brand-glow font-bold text-sm mb-1">Shipment Tracked</h5>
                                            <p className="text-slate-400 text-xs">Provider: <span className="text-white">{order.shipping_provider}</span></p>
                                            <p className="text-slate-400 text-xs">Tracking ID: <span className="text-white font-mono">{order.tracking_number}</span></p>
                                        </div>
                                    </div>
                                )}
                                {isRefunded && (
                                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl flex items-center gap-3 text-green-400 text-xs font-bold">
                                        <DollarSign size={16} /> Refund Processed
                                    </div>
                                )}
                            </div>

                            {/* Items Grid */}
                            <div className="space-y-4 mb-8">
                                <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Items Ordered</h5>
                                {order.order_items.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-10 h-10 rounded-lg bg-dark-800 border border-white/10 overflow-hidden shrink-0">
                                            {item.products?.cover_image_url && <img src={item.products.cover_image_url} className="w-full h-full object-cover opacity-80" loading="lazy" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm">{item.item_name}</p>
                                            <p className="text-slate-500 text-xs">{item.item_variant_label || item.flavor_name || 'Standard'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-mono text-sm">${Number(item.price_at_purchase).toFixed(2)}</p>
                                            <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 border-t border-white/10 gap-4">
                                <div>
                                    <p className="text-slate-500 text-xs mb-1">Shipping to:</p>
                                    <p className="text-white text-sm font-bold">{order.shipping_address?.street_address}, {order.shipping_address?.city}</p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-400 bg-white/5 px-2 py-1 rounded w-fit">
                                        <CreditCard size={12}/> 
                                        Payment: <span className="text-white capitalize">{order.payment_method || 'Card'}</span> 
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    {canCancel && (
                                        <button onClick={onCancel} className="px-4 py-2 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-xs font-bold uppercase">
                                            Cancel Order
                                        </button>
                                    )}
                                    {canReturn && (
                                        <button onClick={onReturn} className="px-4 py-2 border border-orange-500/30 text-orange-400 rounded-xl hover:bg-orange-500/10 transition-colors text-xs font-bold uppercase">
                                            Return / Refund
                                        </button>
                                    )}
                                    <button onClick={onPrint} className="flex items-center gap-2 px-5 py-2 bg-white text-dark-900 font-bold rounded-xl hover:bg-brand-glow transition-colors text-xs uppercase tracking-wide">
                                        <Printer size={16} /> Invoice
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Account;