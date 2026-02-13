import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Clock, CheckCircle, Truck, XCircle, Package } from 'lucide-react';
import { getAdminOrders } from '../../api/adminOrderApi';
import { motion } from 'framer-motion';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getAdminOrders({ status: statusFilter, search });
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  console.log(orders);
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'processing': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'shipped': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'delivered': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
           <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Order Management</h1>
           <p className="text-slate-400 text-sm">Track and fulfill customer orders.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4">
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search by Order UUID..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-dark-950 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-white text-sm focus:border-brand-glow outline-none"
          />
        </form>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                statusFilter === status 
                ? 'bg-brand-glow text-dark-900 border-brand-glow' 
                : 'bg-transparent text-slate-500 border-white/10 hover:border-white/30'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-xs uppercase tracking-widest text-slate-400">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan="6" className="p-8 text-center text-slate-500">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-slate-500">No orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">
                    {order.id.substring(0, 8)}...
                  </td>
                  <td className="p-4 font-bold text-white">
                    {order.user?.first_name} {order.user?.last_name}
                  </td>
                  <td className="p-4 text-sm text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-mono text-brand-glow">
                    ${order.total_amount}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/orders/${order.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-brand-glow transition-colors">
                      <Eye size={14} /> View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;