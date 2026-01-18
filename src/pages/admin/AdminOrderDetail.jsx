import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Truck, User, MapPin, CreditCard, Calendar, 
  Save, MessageSquare, Package, CheckCircle 
} from 'lucide-react';
import { getOrderDetails, updateOrderStatus, updateTracking, addOrderNote } from '../../api/adminOrderApi';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Actions State
  const [status, setStatus] = useState('');
  const [tracking, setTracking] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await getOrderDetails(id);
      setOrder(data);
      setStatus(data.status);
      setTracking(data.tracking_number || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if(!window.confirm(`Change status to ${status}?`)) return;
    setIsSubmitting(true);
    await updateOrderStatus(id, status);
    await loadOrder(); // Refresh log
    setIsSubmitting(false);
  };

  const handleTrackingUpdate = async () => {
    setIsSubmitting(true);
    await updateTracking(id, tracking);
    await loadOrder();
    setIsSubmitting(false);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if(!note.trim()) return;
    setIsSubmitting(true);
    await addOrderNote(id, note);
    setNote('');
    await loadOrder();
    setIsSubmitting(false);
  };

  if (loading) return <div className="p-10 text-center text-white">Loading Order Details...</div>;
  if (!order) return <div className="p-10 text-center text-red-500">Order not found</div>;

  return (
    <div className="space-y-6 pb-20">
      
      {/* Top Nav */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/admin/orders" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
             Order #{order.id.substring(0,8)}
             <span className="text-sm font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
               {new Date(order.created_at).toLocaleString()}
             </span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (Items & Timeline) */}
        <div className="lg:col-span-2 space-y-6">
           
           {/* Order Items */}
           <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-brand-glow font-bold uppercase tracking-widest text-xs mb-4">Items Ordered</h3>
              <div className="space-y-4">
                 {order.items.map(item => (
                   <div key={item.id} className="flex gap-4 items-center bg-dark-950/50 p-3 rounded-xl border border-white/5">
                      <div className="w-16 h-16 bg-dark-800 rounded-lg overflow-hidden flex-shrink-0">
                         {item.product?.cover_image_url && <img src={item.product.cover_image_url} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                         <p className="text-white font-bold">{item.item_name || item.product?.name}</p>
                         <p className="text-slate-500 text-xs">{item.item_variant_label}</p>
                         {/* <p className="text-slate-500 text-xs font-mono">SKU: {item.variant?.sku || 'N/A'}</p> */}
                      </div>
                      <div className="text-right">
                         <p className="text-white font-bold">x{item.quantity}</p>
                         <p className="text-brand-glow text-sm">${item.price_at_purchase}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                 <div className="text-right space-y-1">
                    <p className="text-slate-400 text-sm">Subtotal: <span className="text-white">${order.total_amount - order.shipping_cost - order.tax_amount}</span></p>
                    <p className="text-slate-400 text-sm">Shipping: <span className="text-white">${order.shipping_cost}</span></p>
                    <p className="text-slate-400 text-sm">Tax: <span className="text-white">${order.tax_amount}</span></p>
                    <p className="text-xl font-black text-brand-glow mt-2">${order.total_amount}</p>
                 </div>
              </div>
           </div>

           {/* Timeline / Logs */}
           <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-brand-glow font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                 <Calendar size={14}/> Order Timeline
              </h3>
              
              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex gap-2 mb-6">
                 <input 
                   value={note}
                   onChange={e => setNote(e.target.value)}
                   placeholder="Add an internal note..."
                   className="flex-1 bg-dark-950 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-brand-glow outline-none"
                 />
                 <button disabled={isSubmitting} className="px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl">
                    <MessageSquare size={18} />
                 </button>
              </form>

              {/* Log Stream */}
              <div className="space-y-6 relative pl-2">
                 {/* Vertical Line */}
                 <div className="absolute top-0 bottom-0 left-[19px] w-px bg-white/10" />
                 
                 {order.logs?.map(log => (
                    <div key={log.id} className="relative flex gap-4 items-start">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-dark-900 z-10 
                          ${log.action === 'STATUS_UPDATE' ? 'bg-blue-500 text-white' : 
                            log.action === 'TRACKING_ADDED' ? 'bg-green-500 text-white' : 
                            'bg-slate-700 text-slate-300'}`}
                       >
                          {log.action === 'STATUS_UPDATE' ? <CheckCircle size={16} /> : 
                           log.action === 'TRACKING_ADDED' ? <Truck size={16} /> : 
                           <MessageSquare size={16} />}
                       </div>
                       <div className="bg-dark-950 border border-white/5 p-3 rounded-xl flex-1">
                          <p className="text-white text-sm">{log.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{new Date(log.created_at).toLocaleString()}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

        </div>

        {/* RIGHT COLUMN (Management & Info) */}
        <div className="space-y-6">
           
           {/* Status Management */}
           <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-brand-glow font-bold uppercase tracking-widest text-xs mb-4">Fulfillment</h3>
              
              <div className="space-y-4">
                 <div>
                    <label className="text-xs text-slate-500 uppercase font-bold">Order Status</label>
                    <div className="flex gap-2 mt-1">
                       <select 
                         value={status} 
                         onChange={(e) => setStatus(e.target.value)}
                         className="flex-1 bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-brand-glow"
                       >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                       </select>
                       <button onClick={handleStatusUpdate} disabled={status === order.status || isSubmitting} className="bg-brand-glow text-dark-900 px-3 rounded-xl font-bold hover:brightness-110 disabled:opacity-50">
                          <Save size={18} />
                       </button>
                    </div>
                 </div>

                 <div>
                    <label className="text-xs text-slate-500 uppercase font-bold">Tracking Number</label>
                    <div className="flex gap-2 mt-1">
                       <input 
                         value={tracking}
                         onChange={(e) => setTracking(e.target.value)}
                         placeholder="e.g. 1Z999..."
                         className="flex-1 bg-dark-950 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-brand-glow font-mono"
                       />
                       <button onClick={handleTrackingUpdate} disabled={isSubmitting} className="bg-white/10 text-white px-3 rounded-xl font-bold hover:bg-white/20 disabled:opacity-50">
                          <Truck size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Customer Info */}
           <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-brand-glow font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                 <User size={14}/> Customer Details
              </h3>
              <div className="space-y-3">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-glow to-blue-600" />
                    <div>
                       <p className="text-white font-bold">{order.user?.first_name} {order.user?.last_name}</p>
                       <p className="text-slate-400 text-xs">{order.user?.phone_number || 'No Phone'}</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Shipping Address */}
           <div className="bg-dark-900 border border-white/10 rounded-2xl p-6">
              <h3 className="text-brand-glow font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                 <MapPin size={14}/> Shipping Address
              </h3>
              <div className="text-sm text-slate-300 space-y-1">
                 <p className="font-bold text-white">{order.shipping_address?.street_address}</p>
                 <p>{order.shipping_address?.city}, {order.shipping_address?.state} {order.shipping_address?.zip_code}</p>
                 <p className="text-xs text-slate-500 mt-2 uppercase">{order.shipping_provider}</p>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;