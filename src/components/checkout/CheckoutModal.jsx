
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
//   ShieldCheck, Banknote, Calendar, AlertCircle, Phone, Mail, 
//   Edit2, ShoppingBag, Truck, Lock, ArrowRight 
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../client/supabaseClient';
// import { cartApi } from '../../api/cartApi';

// // --- HELPER: CALCULATE DELIVERY DATE ---
// const calculateDeliveryDate = (zipCode) => {
//   if (!zipCode || zipCode.length < 5) return null;
//   const today = new Date();
//   let daysToAdd = 5; 
//   const zipPrefix = parseInt(zipCode.substring(0, 1));
//   if (!isNaN(zipPrefix) && zipPrefix <= 3) daysToAdd = 3;
  
//   const futureDate = new Date(today);
//   futureDate.setDate(today.getDate() + daysToAdd);
//   if (futureDate.getDay() === 0) futureDate.setDate(futureDate.getDate() + 1);
//   return futureDate;
// };

// const CheckoutModal = ({ isOpen, onClose }) => {
//   const { user } = useAuth();
//   const { cartItems, refreshCart, deliveryConfig, getSubtotal } = useCart();
//   const navigate = useNavigate();

//   // --- LOGIC STATE ---
//   const [step, setStep] = useState(1); 
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);
  
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [savedAddresses, setSavedAddresses] = useState([]);
//   const [selectedAddressId, setSelectedAddressId] = useState('new');
//   const [saveAddress, setSaveAddress] = useState(false);
  
//   const [formData, setFormData] = useState({
//     street_address: '', city: '', state: '', zip_code: '', phone_number: '', email: user?.email || ''
//   });

//   // --- FINANCIALS ---
//   const subtotal = getSubtotal();
//   const shippingFee = subtotal >= (deliveryConfig?.min_order_value || 50) ? 0 : (deliveryConfig?.shipping_fee || 5.99);
//   const total = subtotal + shippingFee;

//   console.log('Checkout Modal Rendered:', { subtotal, shippingFee, total, formData });
//   console.log('Cart Items:', cartItems);
//   // --- INIT DATA ---
//   useEffect(() => {
//     if (isOpen && user) {
//       const initData = async () => {
//         // 1. Profile Phone
//         const { data: profile } = await supabase.from('profiles').select('phone_number').eq('id', user.id).single();
//         if (profile?.phone_number) setFormData(prev => ({ ...prev, phone_number: profile.phone_number }));

//         // 2. Addresses
//         const { data: addrs } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('is_default', { ascending: false });
//         if (addrs && addrs.length > 0) {
//           setSavedAddresses(addrs);
//           const def = addrs.find(a => a.is_default) || addrs[0];
//           handleAddressSelection(def.id, addrs);
//         } else {
//           setSelectedAddressId('new');
//         }
//       };
//       initData();
//     }
//   }, [isOpen, user]);

//   const handleAddressSelection = (id, list = savedAddresses) => {
//     setSelectedAddressId(id);
//     if (id === 'new') {
//       setFormData(prev => ({ ...prev, street_address: '', city: '', state: '', zip_code: '' }));
//     } else {
//       const addr = list.find(a => a.id === id);
//       if (addr) setFormData(prev => ({ ...prev, street_address: addr.street_address, city: addr.city, state: addr.state, zip_code: addr.zip_code }));
//     }
//     setError('');
//   };

//   const validateStep1 = () => {
//     const { street_address, city, state, zip_code, phone_number } = formData;
//     if (!street_address || !city || !state || !zip_code || !phone_number) return setError('Please fill in all fields.');
//     if (zip_code.length < 5) return setError('Invalid ZIP code.');
//     if (phone_number.length < 10) return setError('Invalid Phone Number.');
//     return true;
//   };

//   const handlePlaceOrder = async () => {
//     setLoading(true); setError('');
//     try {
//       if (!user) throw new Error("Session expired.");
      
//       // 1. Stock Check
//       for (const item of cartItems) {
//         const { data: v } = await supabase.from('product_variants').select('stock_quantity, is_active').eq('id', item.variant_id).single();
//         if (!v || !v.is_active || v.stock_quantity < item.quantity) throw new Error(`Item ${item.name} is out of stock.`);
//       }

//       // 2. Save New Address
//       if (selectedAddressId === 'new' && saveAddress) {
//         await supabase.from('addresses').insert([{ user_id: user.id, ...formData, is_default: savedAddresses.length === 0 }]);
//       }

//       // 3. Update Phone
//       if (formData.phone_number) await supabase.from('profiles').update({ phone_number: formData.phone_number }).eq('id', user.id);

//       // 4. Create Order
//       const { data: order, error: orderErr } = await supabase.from('orders').insert([{
//         user_id: user.id, total_amount: total, status: 'pending', payment_method: paymentMethod,
//         shipping_address: formData, shipping_provider: 'Standard', shipping_cost: shippingFee,
//         estimated_delivery_date: calculateDeliveryDate(formData.zip_code)
//       }]).select().single();
//       if (orderErr) throw orderErr;

//       // 5. Order Items
//       const itemsPayload = cartItems.map(item => ({
//         order_id: order.id, product_id: item.id, variant_id: item.variant_id, quantity: item.quantity,
//         price_at_purchase: item.price, item_name: item.name, flavor_name: item.description, item_variant_label: item.description
//       }));
//       await supabase.from('order_items').insert(itemsPayload);

//       // 6. Payment & Stock
//       await supabase.from('payments').insert([{
//         order_id: order.id, user_id: user.id, amount: total, provider: paymentMethod === 'card' ? 'stripe' : 'manual',
//         status: paymentMethod === 'card' ? 'succeeded' : 'pending', provider_payment_id: `sim_${Date.now()}`
//       }]);

//       for (const item of cartItems) {
//          // Naive decrement. In prod, use RPC.
//          await cartApi.updateQuantity(item.variant_id, -item.quantity); // This function needs to be 'decrementStock' actually, 
//          // Assuming simple update for now:
//          const { data: v } = await supabase.from('product_variants').select('stock_quantity').eq('id', item.variant_id).single();
//          if(v) await supabase.from('product_variants').update({ stock_quantity: Math.max(0, v.stock_quantity - item.quantity) }).eq('id', item.variant_id);
//       }

//       // 7. Clear
//       await cartApi.clearCart(user.id);
//       if (refreshCart) refreshCart();
//       setSuccess(true);
//       setTimeout(() => { onClose(); navigate('/account'); }, 2500);

//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <motion.div 
//         initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//         onClick={onClose} 
//         className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all" 
//       />

//       {/* Main Container */}
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95, y: 30 }} 
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         exit={{ opacity: 0, scale: 0.95, y: 30 }}
//         className="relative w-full max-w-5xl bg-dark-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
//       >
        
//         {/* --- LEFT SIDEBAR (SUMMARY) --- */}
//         <div className="hidden md:flex md:w-2/5 bg-white/5 border-r border-white/10 p-8 flex-col relative overflow-hidden">
//           {/* Background Ambient */}
//           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-glow/5 to-purple-500/5 pointer-events-none" />

//           <div className="relative z-10 flex-1 flex flex-col">
//             <h3 className="text-white font-black text-lg uppercase italic tracking-wider mb-6 flex items-center gap-2">
//               <ShoppingBag size={18} className="text-brand-glow"/> Order Summary
//             </h3>
            
//             {/* Items Scroll */}
//             {/* <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 mb-6">
//               {cartItems.map((item, i) => (
//                 <div key={i} className="flex gap-4 items-start group">
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.imageColor || 'from-gray-700 to-gray-800'} flex-shrink-0 border border-white/10 shadow-lg`} />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-white text-sm font-bold truncate group-hover:text-brand-glow transition-colors">{item.name}</p>
//                     <p className="text-slate-500 text-[11px] truncate">{item.description}</p>
//                     <p className="text-slate-400 text-xs mt-1">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="text-white font-mono text-sm">${(item?.product_variants?.price * item.quantity).toFixed(2)}</p>
//                 </div>
//               ))}
//             </div> */}
//             <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 mb-6">
//               {cartItems.map((item, i) => {
//                 // --- SAFE DATA MAPPING ---
//                 const product = item.products || {};
//                 const variant = item.product_variants || {};
                
//                 // 1. Name & Color
//                 const name = product.name || 'Unknown Item';
//                 const color = product.image_color || 'from-gray-700 to-gray-800';

//                 // 2. Dynamic Description (Variant Label)
//                 // Checks variant map first (e.g., "Blue Razz / 4pk"), then flavor_name, then default
//                 const description = variant.variant_selection_map
//                   ?.map(v => v.variant_options?.name)
//                   .join(' / ') 
//                   || item.flavor_name 
//                   || 'Standard';

//                 // 3. Price Calculation
//                 const unitPrice = Number(variant.price || 0);
//                 const qty = item.quantity || 1;
//                 const lineTotal = unitPrice * qty;

//                 return (
//                   <div key={i} className="flex gap-4 items-start group">
//                     {/* Product Image Placeholder */}
//                     <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex-shrink-0 border border-white/10 shadow-lg`} />
                    
//                     {/* Details */}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-white text-sm font-bold truncate group-hover:text-brand-glow transition-colors">
//                         {name}
//                       </p>
//                       <p className="text-slate-500 text-[11px] truncate">
//                         {description}
//                       </p>
//                       <p className="text-slate-400 text-xs mt-1">
//                         Qty: {qty}
//                       </p>
//                     </div>
                    
//                     {/* Price */}
//                     <p className="text-white font-mono text-sm">
//                       ${lineTotal.toFixed(2)}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Totals */}
//             <div className="pt-6 border-t border-white/10 space-y-3">
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-400">Subtotal</span>
//                 <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-slate-400">Shipping</span>
//                 <span className="text-emerald-400 font-bold font-mono">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
//               </div>
//               <div className="h-px bg-white/10 my-2" />
//               <div className="flex justify-between items-end">
//                 <span className="text-white font-black uppercase tracking-wider">Total</span>
//                 <span className="text-2xl font-black text-brand-glow font-mono">${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- RIGHT CONTENT (INTERACTIVE) --- */}
//         <div className="flex-1 bg-dark-900 flex flex-col relative h-full">
          
//           {/* Header */}
//           <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5">
//              <div>
//                 <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
//                   {success ? 'Order Confirmed' : (step === 1 ? 'Shipping Info' : 'Payment')}
//                 </h2>
//                 {!success && <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Step {step} of 2</p>}
//              </div>
//              <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
//                <X size={20} />
//              </button>
//           </div>

//           {/* Scrollable Body */}
//           <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
//             <AnimatePresence mode="wait">
              
//               {/* SUCCESS VIEW */}
//               {success ? (
//                 <motion.div 
//                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
//                   className="h-full flex flex-col items-center justify-center text-center pb-10"
//                 >
//                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
//                      <Check size={48} className="text-dark-900 stroke-[4]" />
//                    </div>
//                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Success!</h3>
//                    <p className="text-slate-400 max-w-xs mx-auto mb-8">
//                      Your order has been placed. A confirmation email has been sent to <span className="text-white">{formData.email}</span>.
//                    </p>
//                    <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-slate-400">
//                      <Loader2 size={12} className="animate-spin" /> Redirecting...
//                    </div>
//                 </motion.div>
//               ) 
              
//               // STEP 1: SHIPPING
//               : step === 1 ? (
//                 <motion.div 
//                   key="step1"
//                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
//                   className="space-y-8"
//                 >
//                    {/* Saved Addresses */}
//                    {savedAddresses.length > 0 && (
//                      <div className="space-y-3">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Saved Locations</label>
//                         <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar -mx-2 px-2">
//                            {savedAddresses.map(addr => (
//                              <button
//                                key={addr.id}
//                                onClick={() => handleAddressSelection(addr.id)}
//                                className={`flex-shrink-0 p-4 rounded-2xl border text-left min-w-[150px] transition-all group ${selectedAddressId === addr.id ? 'bg-brand-glow/10 border-brand-glow' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
//                              >
//                                <div className="flex items-center gap-2 mb-1">
//                                  <span className={`text-sm font-bold ${selectedAddressId === addr.id ? 'text-white' : 'text-slate-300'}`}>{addr.city}</span>
//                                  {selectedAddressId === addr.id && <Check size={14} className="text-brand-glow ml-auto" />}
//                                </div>
//                                <p className="text-[10px] text-slate-500 truncate">{addr.street_address}</p>
//                              </button>
//                            ))}
//                            <button onClick={() => handleAddressSelection('new')} className={`flex-shrink-0 p-4 rounded-2xl border border-dashed min-w-[140px] flex flex-col items-center justify-center gap-2 transition-all ${selectedAddressId === 'new' ? 'border-brand-glow bg-brand-glow/5 text-white' : 'border-white/20 text-slate-500 hover:border-white/40'}`}>
//                               <Plus size={16} /> <span className="text-xs font-bold">New Address</span>
//                            </button>
//                         </div>
//                      </div>
//                    )}

//                    {/* Form */}
//                    <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Edit2 size={12}/> Shipping Details</label>
//                          {selectedAddressId !== 'new' && <span className="text-[10px] text-brand-glow bg-brand-glow/10 px-2 py-1 rounded font-bold">Autofilled</span>}
//                       </div>
                      
//                       <div className="space-y-4">
//                          <div className="relative group">
//                             <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors"/>
//                             <input name="street_address" value={formData.street_address} onChange={(e) => {setFormData({...formData, street_address: e.target.value}); setError('')}} placeholder="Street Address" className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none transition-all placeholder:text-slate-600" />
//                          </div>
//                          <div className="grid grid-cols-2 gap-4">
//                             <input name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="City" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
//                             <input name="state" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} placeholder="State" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
//                          </div>
//                          <div className="grid grid-cols-2 gap-4">
//                             <input name="zip_code" value={formData.zip_code} onChange={(e) => setFormData({...formData, zip_code: e.target.value})} maxLength={5} placeholder="ZIP Code" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
//                             <div className="relative group">
//                                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors"/>
//                                <input name="phone_number" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} placeholder="Phone Number" className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
//                             </div>
//                          </div>
//                       </div>

//                       {selectedAddressId === 'new' && (
//                         <div onClick={() => setSaveAddress(!saveAddress)} className="flex items-center gap-3 py-2 cursor-pointer group">
//                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${saveAddress ? 'bg-brand-glow border-brand-glow' : 'border-white/20 bg-dark-950 group-hover:border-white/40'}`}>
//                               {saveAddress && <Check size={12} className="text-dark-900" />}
//                            </div>
//                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Save address to profile</span>
//                         </div>
//                       )}

//                       <AnimatePresence>
//                         {formData.zip_code.length >= 5 && (
//                           <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-brand-glow/5 border border-brand-glow/10 p-3 rounded-xl flex items-center gap-3">
//                              <div className="w-8 h-8 rounded-full bg-brand-glow/10 flex items-center justify-center text-brand-glow shrink-0"><Calendar size={14}/></div>
//                              <div>
//                                 <p className="text-[10px] uppercase font-bold text-slate-500">Estimated Delivery</p>
//                                 <p className="text-xs font-bold text-white">{calculateDeliveryDate(formData.zip_code)?.toDateString()}</p>
//                              </div>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                    </div>
//                 </motion.div>
//               ) 
              
//               // STEP 2: PAYMENT
//               : (
//                 <motion.div 
//                   key="step2"
//                   initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
//                   className="space-y-8"
//                 >
//                    {/* Mobile Summary (Only shows on mobile since left bar hides) */}
//                    <div className="md:hidden bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
//                       <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Due</p>
//                       <p className="text-2xl font-black text-white">${total.toFixed(2)}</p>
//                    </div>

//                    <div className="space-y-4">
//                       <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Method</label>
                      
//                       <button onClick={() => setPaymentMethod('card')} className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all group ${paymentMethod === 'card' ? 'bg-brand-glow/5 border-brand-glow shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
//                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900' : 'bg-dark-900 text-slate-400'}`}><CreditCard size={20}/></div>
//                          <div className="text-left flex-1">
//                             <p className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-slate-300'}`}>Credit / Debit Card</p>
//                             <p className="text-[11px] text-slate-500">Secure simulated transaction</p>
//                          </div>
//                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-glow bg-brand-glow' : 'border-white/20'}`}>{paymentMethod === 'card' && <Check size={12} className="text-dark-900" />}</div>
//                       </button>

//                       <AnimatePresence>
//                          {paymentMethod === 'card' && (
//                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
//                               <div className="p-5 bg-dark-950 border border-white/10 rounded-2xl space-y-3">
//                                  <div className="relative"><input placeholder="0000 0000 0000 0000" className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm font-mono focus:border-brand-glow outline-none"/><Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/></div>
//                                  <div className="flex gap-3">
//                                     <input placeholder="MM/YY" className="w-1/2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono focus:border-brand-glow outline-none"/>
//                                     <input placeholder="CVC" type="password" className="w-1/2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono focus:border-brand-glow outline-none"/>
//                                  </div>
//                               </div>
//                            </motion.div>
//                          )}
//                       </AnimatePresence>

//                       <button onClick={() => setPaymentMethod('cod')} className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all group ${paymentMethod === 'cod' ? 'bg-green-500/10 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
//                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900' : 'bg-dark-900 text-slate-400'}`}><Banknote size={20}/></div>
//                          <div className="text-left flex-1">
//                             <p className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-slate-300'}`}>Cash on Delivery</p>
//                             <p className="text-[11px] text-slate-500">Pay physically upon receipt</p>
//                          </div>
//                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-white/20'}`}>{paymentMethod === 'cod' && <Check size={12} className="text-dark-900" />}</div>
//                       </button>
//                    </div>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* ERROR */}
//             <AnimatePresence>
//                {error && (
//                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-200 text-xs font-bold">
//                     <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
//                  </motion.div>
//                )}
//             </AnimatePresence>
//           </div>

//           {/* Footer Bar */}
//           {!success && (
//             <div className="p-6 md:p-8 border-t border-white/5 bg-white/5 backdrop-blur-md">
//                {step === 1 ? (
//                  <button onClick={() => {setError(''); if(validateStep1()) setStep(2)}} className="w-full py-4 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)]">
//                     Proceed to Payment <ArrowRight size={18}/>
//                  </button>
//                ) : (
//                  <div className="flex gap-4">
//                     <button onClick={() => setStep(1)} className="px-6 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors border border-white/5"><ArrowLeft size={20}/></button>
//                     <button onClick={handlePlaceOrder} disabled={loading} className={`flex-1 py-4 font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-xl ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900 hover:bg-green-400 shadow-green-500/20' : 'bg-brand-glow text-dark-900 hover:bg-cyan-300 shadow-brand-glow/20'} ${loading && 'opacity-70 cursor-not-allowed'}`}>
//                        {loading ? <Loader2 className="animate-spin" /> : (paymentMethod === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`)}
//                     </button>
//                  </div>
//                )}
//             </div>
//           )}
//         </div>

//       </motion.div>
//     </div>
//   );
// };

// export default CheckoutModal;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, CreditCard, Loader2, Plus, Check, ArrowLeft, 
  ShieldCheck, Banknote, Calendar, AlertCircle, Phone, Mail, 
  Edit2, ShoppingBag, Lock, ArrowRight 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client/supabaseClient';
import { cartApi } from '../../api/cartApi';

// --- HELPER: CALCULATE DELIVERY DATE ---
const calculateDeliveryDate = (zipCode) => {
  if (!zipCode || zipCode.length < 5) return null;
  const today = new Date();
  let daysToAdd = 5; 
  const zipPrefix = parseInt(zipCode.substring(0, 1));
  if (!isNaN(zipPrefix) && zipPrefix <= 3) daysToAdd = 3;
  
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysToAdd);
  if (futureDate.getDay() === 0) futureDate.setDate(futureDate.getDate() + 1);
  return futureDate;
};

const CheckoutModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { cartItems, refreshCart, deliveryConfig, getSubtotal } = useCart();
  const navigate = useNavigate();

  // --- LOGIC STATE ---
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('new');
  const [saveAddress, setSaveAddress] = useState(false);
  
  const [formData, setFormData] = useState({
    street_address: '', city: '', state: '', zip_code: '', phone_number: '', email: user?.email || ''
  });

  // --- FINANCIALS ---
  const subtotal = getSubtotal();
  const shippingFee = subtotal >= (deliveryConfig?.min_order_value || 50) ? 0 : (deliveryConfig?.shipping_fee || 5.99);
  const total = subtotal + shippingFee;

  // --- INIT DATA ---
  useEffect(() => {
    if (isOpen && user) {
      const initData = async () => {
        // 1. Profile Phone
        const { data: profile } = await supabase.from('profiles').select('phone_number').eq('id', user.id).single();
        if (profile?.phone_number) setFormData(prev => ({ ...prev, phone_number: profile.phone_number }));

        // 2. Addresses
        const { data: addrs } = await supabase.from('addresses').select('*').eq('user_id', user.id).order('is_default', { ascending: false });
        if (addrs && addrs.length > 0) {
          setSavedAddresses(addrs);
          const def = addrs.find(a => a.is_default) || addrs[0];
          handleAddressSelection(def.id, addrs);
        } else {
          setSelectedAddressId('new');
        }
      };
      initData();
    }
  }, [isOpen, user]);

  const handleAddressSelection = (id, list = savedAddresses) => {
    setSelectedAddressId(id);
    if (id === 'new') {
      setFormData(prev => ({ ...prev, street_address: '', city: '', state: '', zip_code: '' }));
    } else {
      const addr = list.find(a => a.id === id);
      if (addr) setFormData(prev => ({ ...prev, street_address: addr.street_address, city: addr.city, state: addr.state, zip_code: addr.zip_code }));
    }
    setError('');
  };

  const validateStep1 = () => {
    const { street_address, city, state, zip_code, phone_number } = formData;
    if (!street_address || !city || !state || !zip_code || !phone_number) return setError('Please fill in all fields.');
    if (zip_code.length < 5) return setError('Invalid ZIP code.');
    if (phone_number.length < 10) return setError('Invalid Phone Number.');
    return true;
  };

  const handlePlaceOrder = async () => {
    setLoading(true); setError('');
    try {
      if (!user) throw new Error("Session expired.");
      if (cartItems.length === 0) throw new Error("Cart is empty");
      
      // 1. Stock Check
      for (const item of cartItems) {
        const { data: v } = await supabase.from('product_variants').select('stock_quantity, is_active').eq('id', item.variant_id).single();
        if (!v || !v.is_active || v.stock_quantity < item.quantity) throw new Error(`Item ${item.products?.name} is out of stock.`);
      }

      // 2. Prepare Clean Address Object (Fixes the JSONB bug)
      // We explicitly pull fields to ensure no DB metadata (like created_at) pollutes the order address
      const shippingSnapshot = {
        street_address: formData.street_address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        phone_number: formData.phone_number,
        email: formData.email
      };

      // 3. Save New Address (if requested)
      if (selectedAddressId === 'new' && saveAddress) {
        await supabase.from('addresses').insert([{ user_id: user.id, ...shippingSnapshot, is_default: savedAddresses.length === 0 }]);
      }

      // 4. Update Profile Phone
      if (formData.phone_number) await supabase.from('profiles').update({ phone_number: formData.phone_number }).eq('id', user.id);

      // 5. Create Order Header
      const { data: order, error: orderErr } = await supabase.from('orders').insert([{
        user_id: user.id, 
        total_amount: total, 
        status: 'pending', 
        payment_method: paymentMethod,
        shipping_address: shippingSnapshot, // Clean object
        shipping_provider: 'Standard Shipping', 
        shipping_cost: shippingFee,
        estimated_delivery_date: calculateDeliveryDate(formData.zip_code)
      }]).select().single();
      
      if (orderErr) throw orderErr;

      // 6. Insert Order Items (Safe Handling)
      try {
        const itemsPayload = cartItems.map(item => {
            // FIX: Ensure price is never undefined/null
            const price = item.product_variants?.price || 0;
            // FIX: Ensure flavor name isn't null if DB constraints require it
            const flavor = item.flavor_name || 'Standard'; 
            
            return {
                order_id: order.id, 
                product_id: item.product_id, 
                variant_id: item.variant_id, 
                quantity: item.quantity,
                price_at_purchase: price, 
                item_name: item.products?.name || 'Item', 
                flavor_name: flavor, 
                item_variant_label: item.description || flavor
            };
        });
        
        const { error: itemsError } = await supabase.from('order_items').insert(itemsPayload);
        if (itemsError) throw itemsError;

      } catch (itemErr) {
        // ROLLBACK: If items fail, delete the empty order header
        console.error("Item Insert Failed, Rolling back order...", itemErr);
        await supabase.from('orders').delete().eq('id', order.id);
        throw new Error("Failed to process items. Please try again.");
      }

      // 7. Record Payment
      await supabase.from('payments').insert([{
        order_id: order.id, user_id: user.id, amount: total, provider: paymentMethod === 'card' ? 'stripe' : 'cod',
        status: paymentMethod === 'card' ? 'succeeded' : 'pending', provider_payment_id: paymentMethod === 'card' ? `sim_${Date.now()}` : `cod_${Date.now()}`
      }]);

      // 8. Decrement Stock
      for (const item of cartItems) {
         const { data: v } = await supabase.from('product_variants').select('stock_quantity').eq('id', item.variant_id).single();
         if(v) await supabase.from('product_variants').update({ stock_quantity: Math.max(0, v.stock_quantity - item.quantity) }).eq('id', item.variant_id);
      }

      // 9. Cleanup
      await cartApi.clearCart(user.id);
      if (refreshCart) refreshCart();
      
      setSuccess(true);
      setTimeout(() => { onClose(); navigate('/account'); }, 2500);

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
console.log('checkout page',cartItems);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all" 
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-5xl bg-dark-900 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] max-h-[800px]"
      >
        
        {/* --- LEFT SIDEBAR (SUMMARY) - SCROLLABLE --- */}
        <div className="hidden md:flex md:w-2/5 bg-white/5 border-r border-white/10 p-0 flex-col relative overflow-hidden h-full">
          {/* Background Ambient */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-glow/5 to-purple-500/5 pointer-events-none" />

          {/* Header (Sticky) */}
          <div className="p-8 pb-4 relative z-10 shrink-0">
             <h3 className="text-white font-black text-lg uppercase italic tracking-wider flex items-center gap-2">
               <ShoppingBag size={18} className="text-brand-glow"/> Order Summary
             </h3>
          </div>
            
          {/* Items Scrollable Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-2 space-y-4 relative z-10">
            {cartItems.map((item, i) => {
                // Safe Data Access for Sidebar Display
                const productName = item.products?.name || 'Unknown';
                const productPrice = item.product_variants?.price || 0;
                const variantLabel = item.product_variants?.variant_selection_map?.map(v => v.variant_options?.name).join(' / ') || item.flavor_name || 'Standard';
                const imgColor = item.products?.image_color || 'from-gray-700 to-gray-800';
                const imgUrl = item.products?.cover_image_url || null;
                return (
                  <div key={i} className="flex gap-4 items-start group">
                    {/* <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${imgColor} flex-shrink-0 border border-white/10 shadow-lg`} /> */}
                    <div className="w-14 h-14 rounded-xl bg-dark-800 flex-shrink-0 border border-white/10 shadow-lg overflow-hidden">
                      {imgUrl ? (
                        <img 
                          src={imgUrl} 
                          alt={productName} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${imgColor}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-bold truncate group-hover:text-brand-glow transition-colors">{productName}</p>
                      <p className="text-slate-500 text-[11px] truncate">{variantLabel}</p>
                      <p className="text-slate-400 text-xs mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-white font-mono text-sm">${(productPrice * item.quantity).toFixed(2)}</p>
                  </div>
                );
            })}
          </div>

          {/* Totals Footer (Sticky at bottom) */}
          <div className="p-8 pt-6 border-t border-white/10 space-y-3 relative z-10 bg-white/5 backdrop-blur-md shrink-0">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-white font-mono">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Shipping</span>
              <span className="text-emerald-400 font-bold font-mono">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between items-end">
              <span className="text-white font-black uppercase tracking-wider">Total</span>
              <span className="text-2xl font-black text-brand-glow font-mono">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT CONTENT (INTERACTIVE) - SCROLLABLE --- */}
        <div className="flex-1 bg-dark-900 flex flex-col relative h-full overflow-hidden">
          
          {/* Header (Sticky) */}
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/5 shrink-0 bg-dark-900 z-20">
             <div>
                <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase">
                  {success ? 'Order Confirmed' : (step === 1 ? 'Shipping Info' : 'Payment')}
                </h2>
                {!success && <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Step {step} of 2</p>}
             </div>
             <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
               <X size={20} />
             </button>
          </div>

          {/* Scrollable Form Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
            <AnimatePresence mode="wait">
              
              {/* SUCCESS VIEW */}
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center pb-10"
                >
                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                     <Check size={48} className="text-dark-900 stroke-[4]" />
                   </div>
                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Success!</h3>
                   <p className="text-slate-400 max-w-xs mx-auto mb-8">
                     Your order has been placed. A confirmation email has been sent to <span className="text-white">{formData.email}</span>.
                   </p>
                   <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs text-slate-400">
                     <Loader2 size={12} className="animate-spin" /> Redirecting...
                   </div>
                </motion.div>
              ) 
              
              // STEP 1: SHIPPING
              : step === 1 ? (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   {/* Saved Addresses */}
                   {savedAddresses.length > 0 && (
                     <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Saved Locations</label>
                        <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar -mx-2 px-2">
                           {savedAddresses.map(addr => (
                             <button
                               key={addr.id}
                               onClick={() => handleAddressSelection(addr.id)}
                               className={`flex-shrink-0 p-4 rounded-2xl border text-left min-w-[150px] transition-all group ${selectedAddressId === addr.id ? 'bg-brand-glow/10 border-brand-glow' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                             >
                               <div className="flex items-center gap-2 mb-1">
                                 <span className={`text-sm font-bold ${selectedAddressId === addr.id ? 'text-white' : 'text-slate-300'}`}>{addr.city}</span>
                                 {selectedAddressId === addr.id && <Check size={14} className="text-brand-glow ml-auto" />}
                               </div>
                               <p className="text-[10px] text-slate-500 truncate">{addr.street_address}</p>
                             </button>
                           ))}
                           <button onClick={() => handleAddressSelection('new')} className={`flex-shrink-0 p-4 rounded-2xl border border-dashed min-w-[140px] flex flex-col items-center justify-center gap-2 transition-all ${selectedAddressId === 'new' ? 'border-brand-glow bg-brand-glow/5 text-white' : 'border-white/20 text-slate-500 hover:border-white/40'}`}>
                              <Plus size={16} /> <span className="text-xs font-bold">New Address</span>
                           </button>
                        </div>
                     </div>
                   )}

                   {/* Form */}
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><Edit2 size={12}/> Shipping Details</label>
                         {selectedAddressId !== 'new' && <span className="text-[10px] text-brand-glow bg-brand-glow/10 px-2 py-1 rounded font-bold">Autofilled</span>}
                      </div>
                      
                      <div className="space-y-4">
                         <div className="relative group">
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors"/>
                            <input name="street_address" value={formData.street_address} onChange={(e) => {setFormData({...formData, street_address: e.target.value}); setError('')}} placeholder="Street Address" className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none transition-all placeholder:text-slate-600" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <input name="city" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} placeholder="City" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
                            <input name="state" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} placeholder="State" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <input name="zip_code" value={formData.zip_code} onChange={(e) => setFormData({...formData, zip_code: e.target.value})} maxLength={5} placeholder="ZIP Code" className="bg-dark-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
                            <div className="relative group">
                               <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-glow transition-colors"/>
                               <input name="phone_number" value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} placeholder="Phone Number" className="w-full bg-dark-950 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none placeholder:text-slate-600" />
                            </div>
                         </div>
                      </div>

                      {selectedAddressId === 'new' && (
                        <div onClick={() => setSaveAddress(!saveAddress)} className="flex items-center gap-3 py-2 cursor-pointer group">
                           <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${saveAddress ? 'bg-brand-glow border-brand-glow' : 'border-white/20 bg-dark-950 group-hover:border-white/40'}`}>
                              {saveAddress && <Check size={12} className="text-dark-900" />}
                           </div>
                           <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Save address to profile</span>
                        </div>
                      )}

                      <AnimatePresence>
                        {formData.zip_code.length >= 5 && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-brand-glow/5 border border-brand-glow/10 p-3 rounded-xl flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-brand-glow/10 flex items-center justify-center text-brand-glow shrink-0"><Calendar size={14}/></div>
                             <div>
                                <p className="text-[10px] uppercase font-bold text-slate-500">Estimated Delivery</p>
                                <p className="text-xs font-bold text-white">{calculateDeliveryDate(formData.zip_code)?.toDateString()}</p>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </motion.div>
              ) 
              
              // STEP 2: PAYMENT
              : (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   {/* Mobile Summary (Hidden on desktop) */}
                   <div className="md:hidden bg-white/5 p-4 rounded-xl border border-white/10 mb-6">
                      <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Due</p>
                      <p className="text-2xl font-black text-white">${total.toFixed(2)}</p>
                   </div>

                   <div className="space-y-4">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Method</label>
                      
                      <button onClick={() => setPaymentMethod('card')} className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all group ${paymentMethod === 'card' ? 'bg-brand-glow/5 border-brand-glow shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'card' ? 'bg-brand-glow text-dark-900' : 'bg-dark-900 text-slate-400'}`}><CreditCard size={20}/></div>
                         <div className="text-left flex-1">
                            <p className={`font-bold text-sm ${paymentMethod === 'card' ? 'text-white' : 'text-slate-300'}`}>Credit / Debit Card</p>
                            <p className="text-[11px] text-slate-500">Secure simulated transaction</p>
                         </div>
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-brand-glow bg-brand-glow' : 'border-white/20'}`}>{paymentMethod === 'card' && <Check size={12} className="text-dark-900" />}</div>
                      </button>

                      <AnimatePresence>
                         {paymentMethod === 'card' && (
                           <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                              <div className="p-5 bg-dark-950 border border-white/10 rounded-2xl space-y-3">
                                 <div className="relative"><input placeholder="0000 0000 0000 0000" className="w-full bg-dark-900 border border-white/10 rounded-xl p-3 pl-10 text-white text-sm font-mono focus:border-brand-glow outline-none"/><Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/></div>
                                 <div className="flex gap-3">
                                    <input placeholder="MM/YY" className="w-1/2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono focus:border-brand-glow outline-none"/>
                                    <input placeholder="CVC" type="password" className="w-1/2 bg-dark-900 border border-white/10 rounded-xl p-3 text-white text-sm font-mono focus:border-brand-glow outline-none"/>
                                 </div>
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>

                      <button onClick={() => setPaymentMethod('cod')} className={`w-full p-4 rounded-2xl border flex items-center gap-4 transition-all group ${paymentMethod === 'cod' ? 'bg-green-500/10 border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900' : 'bg-dark-900 text-slate-400'}`}><Banknote size={20}/></div>
                         <div className="text-left flex-1">
                            <p className={`font-bold text-sm ${paymentMethod === 'cod' ? 'text-white' : 'text-slate-300'}`}>Cash on Delivery</p>
                            <p className="text-[11px] text-slate-500">Pay physically upon receipt</p>
                         </div>
                         <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-white/20'}`}>{paymentMethod === 'cod' && <Check size={12} className="text-dark-900" />}</div>
                      </button>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR */}
            <AnimatePresence>
               {error && (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3 text-red-200 text-xs font-bold">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          {/* Footer Bar (Sticky) */}
          {!success && (
            <div className="p-6 md:p-8 border-t border-white/5 bg-white/5 backdrop-blur-md shrink-0 z-20">
               {step === 1 ? (
                 <button onClick={() => {setError(''); if(validateStep1()) setStep(2)}} className="w-full py-4 bg-white text-dark-900 font-black rounded-2xl hover:bg-brand-glow transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    Proceed to Payment <ArrowRight size={18}/>
                 </button>
               ) : (
                 <div className="flex gap-4">
                    <button onClick={() => setStep(1)} className="px-6 py-4 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors border border-white/5"><ArrowLeft size={20}/></button>
                    <button onClick={handlePlaceOrder} disabled={loading} className={`flex-1 py-4 font-black rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm shadow-xl ${paymentMethod === 'cod' ? 'bg-green-500 text-dark-900 hover:bg-green-400 shadow-green-500/20' : 'bg-brand-glow text-dark-900 hover:bg-cyan-300 shadow-brand-glow/20'} ${loading && 'opacity-70 cursor-not-allowed'}`}>
                       {loading ? <Loader2 className="animate-spin" /> : (paymentMethod === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`)}
                    </button>
                 </div>
               )}
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

export default CheckoutModal;