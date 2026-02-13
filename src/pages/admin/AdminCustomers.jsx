import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, User, Ban, ShieldCheck, Mail, Phone, MapPin, 
  Edit2, Save, X, MoreVertical, DollarSign, Package, 
  Lock, AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';
import { adminCustomerApi } from '../../api/adminCustomerApi';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalTab, setModalTab] = useState('profile'); // profile | address | security

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await adminCustomerApi.getAllCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers", err);
    } finally {
      setLoading(false);
    }
  };

  // --- ACTIONS ---

  const handleToggleBlock = async (customer) => {
    const action = customer.is_blocked ? "UNBLOCK" : "BLOCK";
    if (!window.confirm(`Are you sure you want to ${action} this customer? \n\nBlocked users cannot log in.`)) return;

    try {
      await adminCustomerApi.toggleBlockStatus(customer.id, customer.is_blocked);
      // Optimistic update
      setCustomers(prev => prev.map(c => 
        c.id === customer.id ? { ...c, is_blocked: !c.is_blocked } : c
      ));
      if (selectedCustomer?.id === customer.id) {
        setSelectedCustomer(prev => ({ ...prev, is_blocked: !prev.is_blocked }));
      }
    } catch (err) {
      alert("Action failed: " + err.message);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updates = {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'), // This updates the profile table reference only
      phone_number: formData.get('phone_number'),
      admin_notes: formData.get('admin_notes')
    };

    try {
      const updated = await adminCustomerApi.updateProfileDetails(selectedCustomer.id, updates);
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? { ...c, ...updated } : c));
      setSelectedCustomer(prev => ({ ...prev, ...updated }));
      alert("Profile updated successfully");
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!selectedCustomer.defaultAddress) return;
    
    const formData = new FormData(e.target);
    const updates = {
      street_address: formData.get('street_address'),
      city: formData.get('city'),
      state: formData.get('state'),
      zip_code: formData.get('zip_code')
    };

    try {
      const updated = await adminCustomerApi.updateCustomerAddress(selectedCustomer.defaultAddress.id, updates);
      // Update nested state
      const updatedCustomer = {
        ...selectedCustomer,
        defaultAddress: { ...selectedCustomer.defaultAddress, ...updated }
      };
      
      setSelectedCustomer(updatedCustomer);
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? updatedCustomer : c));
      alert("Address updated successfully");
    } catch (err) {
      alert("Address update failed: " + err.message);
    }
  };

  const handleSecurityAction = async (type) => {
    const value = prompt(`Enter new ${type}:`);
    if (!value) return;
    
    try {
      await adminCustomerApi.adminUpdateAuth(selectedCustomer.id, type, value);
      alert(`${type} update request sent. (Note: Requires Backend Edge Function in Prod)`);
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };

  // --- FILTER ---
  const filteredCustomers = customers.filter(c => {
    const query = search.toLowerCase();
    const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
    const email = c.email?.toLowerCase() || '';
    return fullName.includes(query) || email.includes(query);
  });

  if (loading) return <div className="p-12 text-center text-slate-500">Loading customers...</div>;

  return (
    <div className="p-6 md:p-12 min-h-screen bg-dark-900 text-white">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Customers</h1>
          <p className="text-slate-400">Manage users, permissions, and account details.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..." 
            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 w-64 md:w-80 text-white focus:border-brand-glow outline-none transition-colors"
          />
        </div>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="p-6">Customer</th>
                <th className="p-6">Status</th>
                <th className="p-6">Stats</th>
                <th className="p-6">Joined</th>
                <th className="p-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${customer.is_blocked ? 'bg-red-500/20 text-red-500' : 'bg-brand-glow/20 text-brand-glow'}`}>
                        {customer.first_name?.[0]}
                      </div>
                      <div>
                        <div className={`font-bold ${customer.is_blocked ? 'text-slate-500 line-through' : 'text-white'}`}>
                          {customer.first_name} {customer.last_name}
                        </div>
                        <div className="text-slate-500 text-xs">{customer.email || 'No Email'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    {customer.is_blocked ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase">
                        <Ban size={12} /> Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase">
                        <ShieldCheck size={12} /> Active
                      </span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-4">
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-0.5">Orders</span>
                        <span className="text-white font-mono font-bold">{customer.stats.ordersCount}</span>
                      </div>
                      <div className="text-xs">
                        <span className="text-slate-500 block mb-0.5">Spent</span>
                        <span className="text-green-400 font-mono font-bold">${customer.stats.totalSpent.toFixed(2)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-slate-400 text-xs font-mono">
                    {new Date(customer.created_at || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => setSelectedCustomer(customer)}
                      className="px-4 py-2 bg-white/5 hover:bg-brand-glow hover:text-dark-900 text-white rounded-xl text-xs font-bold transition-all uppercase"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCustomer(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-dark-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 bg-white/5 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-black ${selectedCustomer.is_blocked ? 'bg-red-500 text-dark-900' : 'bg-brand-glow text-dark-900'}`}>
                    {selectedCustomer.first_name?.[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedCustomer.first_name} {selectedCustomer.last_name}
                    </h2>
                    <p className="text-slate-400 text-sm">{selectedCustomer.id}</p>
                    <div className="flex gap-2 mt-2">
                       {selectedCustomer.is_blocked && <span className="text-red-400 text-xs font-bold uppercase flex items-center gap-1"><Ban size={12}/> Account Suspended</span>}
                       <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={12}/> Last Order: {selectedCustomer.stats.lastOrder ? new Date(selectedCustomer.stats.lastOrder).toLocaleDateString() : 'Never'}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={20} className="text-slate-400" /></button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-white/10">
                {['profile', 'address', 'security'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setModalTab(tab)}
                    className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                      modalTab === tab ? 'border-brand-glow text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-8 overflow-y-auto custom-scrollbar">
                
                {/* PROFILE TAB */}
                {modalTab === 'profile' && (
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <InputGroup label="First Name" name="first_name" defaultValue={selectedCustomer.first_name} />
                      <InputGroup label="Last Name" name="last_name" defaultValue={selectedCustomer.last_name} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputGroup label="Email (Public)" name="email" defaultValue={selectedCustomer.email} />
                      <InputGroup label="Phone" name="phone_number" defaultValue={selectedCustomer.phone_number} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-500 uppercase">Admin Internal Notes</label>
                       <textarea 
                          name="admin_notes"
                          defaultValue={selectedCustomer.admin_notes}
                          className="w-full h-24 bg-dark-950 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-brand-glow outline-none resize-none"
                          placeholder="Add notes about this customer (hidden from user)..."
                       />
                    </div>
                    <button className="w-full py-4 bg-brand-glow text-dark-900 font-bold rounded-xl hover:scale-[1.01] transition-transform flex items-center justify-center gap-2">
                       <Save size={18} /> Update Profile
                    </button>
                  </form>
                )}

                {/* ADDRESS TAB */}
                {modalTab === 'address' && (
                  selectedCustomer.defaultAddress ? (
                    <form onSubmit={handleSaveAddress} className="space-y-6">
                      <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                         <div className="flex items-center gap-2 text-brand-glow text-xs font-bold uppercase mb-2">
                            <MapPin size={14} /> Default Shipping Address
                         </div>
                         <p className="text-slate-400 text-sm">
                           Editing this will change the default address for future orders.
                         </p>
                      </div>
                      <InputGroup label="Street Address" name="street_address" defaultValue={selectedCustomer.defaultAddress.street_address} />
                      <div className="grid grid-cols-3 gap-4">
                        <InputGroup label="City" name="city" defaultValue={selectedCustomer.defaultAddress.city} />
                        <InputGroup label="State" name="state" defaultValue={selectedCustomer.defaultAddress.state} />
                        <InputGroup label="ZIP" name="zip_code" defaultValue={selectedCustomer.defaultAddress.zip_code} />
                      </div>
                      <button className="w-full py-4 bg-white text-dark-900 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                         <Save size={18} /> Save Address
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-12 text-slate-500 border border-dashed border-white/10 rounded-2xl">
                       <MapPin className="mx-auto mb-2 opacity-50" size={32} />
                       No default address found for this user.
                    </div>
                  )
                )}

                {/* SECURITY TAB */}
                {modalTab === 'security' && (
                  <div className="space-y-8">
                     {/* Block Section */}
                     <div className={`p-6 rounded-2xl border ${selectedCustomer.is_blocked ? 'bg-red-500/10 border-red-500/30' : 'bg-white/5 border-white/10'}`}>
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className={`font-bold ${selectedCustomer.is_blocked ? 'text-red-400' : 'text-white'}`}>
                                 {selectedCustomer.is_blocked ? 'Account Blocked' : 'Block Access'}
                              </h3>
                              <p className="text-slate-400 text-sm mt-1 max-w-sm">
                                 {selectedCustomer.is_blocked 
                                    ? "User is prevented from logging in. Unblock to restore access."
                                    : "Prevents the user from logging in immediately. Existing sessions may persist until expiration."}
                              </p>
                           </div>
                           <button 
                              onClick={() => handleToggleBlock(selectedCustomer)}
                              className={`px-4 py-2 rounded-xl font-bold text-xs uppercase transition-colors ${selectedCustomer.is_blocked ? 'bg-white text-dark-900 hover:bg-slate-200' : 'bg-red-500 text-white hover:bg-red-600'}`}
                           >
                              {selectedCustomer.is_blocked ? 'Unblock User' : 'Block User'}
                           </button>
                        </div>
                     </div>

                     {/* Sensitive Data Section */}
                     <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sensitive Actions</h3>
                        
                        <div className="flex items-center justify-between p-4 bg-dark-950 border border-white/10 rounded-xl">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-slate-400"><Lock size={18} /></div>
                              <div>
                                 <div className="text-white font-bold text-sm">Reset Password</div>
                                 <div className="text-slate-500 text-xs">Trigger a manual password change</div>
                              </div>
                           </div>
                           <button onClick={() => handleSecurityAction('password')} className="text-brand-glow text-xs font-bold hover:underline">CHANGE</button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-dark-950 border border-white/10 rounded-xl">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-slate-400"><Mail size={18} /></div>
                              <div>
                                 <div className="text-white font-bold text-sm">Update Login Email</div>
                                 <div className="text-slate-500 text-xs">Change the authentication email</div>
                              </div>
                           </div>
                           <button onClick={() => handleSecurityAction('email')} className="text-brand-glow text-xs font-bold hover:underline">UPDATE</button>
                        </div>
                     </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Component
const InputGroup = ({ label, name, defaultValue }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
    <input 
      name={name}
      defaultValue={defaultValue}
      className="w-full bg-dark-950 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-brand-glow outline-none transition-colors"
    />
  </div>
);

export default AdminCustomers;