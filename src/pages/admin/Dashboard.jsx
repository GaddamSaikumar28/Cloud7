import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Package, Users, TrendingUp, AlertTriangle, 
  ArrowUpRight, Clock, CheckCircle, XCircle 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { getDashboardStats, getRecentOrders, getRevenueChartData } from '../../api/adminApi';

const Dashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, users: 0, lowStock: 0 });
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, ordersData, chartData] = await Promise.all([
          getDashboardStats(),
          getRecentOrders(),
          getRevenueChartData()
        ]);
        setStats(statsData);
        setOrders(ordersData);
        setChartData(chartData);
      } catch (err) {
        console.error("Dashboard Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="text-white text-center mt-20">Initializing Command Center...</div>;

  return (
    <div className="space-y-8">
      
      {/* 1. Header & Welcome */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-4"
      >
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">Overview</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time platform analytics and performance metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-brand-glow bg-brand-glow/10 px-3 py-1 rounded-full border border-brand-glow/20 animate-pulse">
           <span className="w-2 h-2 rounded-full bg-brand-glow"></span> LIVE SYSTEM STATUS: OPTIMAL
        </div>
      </motion.div>

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="+12.5%" 
          color="cyan" 
        />
        <StatCard 
          title="Total Orders" 
          value={stats.orders} 
          icon={Package} 
          trend="+5.2%" 
          color="purple" 
        />
        <StatCard 
          title="Active Users" 
          value={stats.users} 
          icon={Users} 
          trend="+8.1%" 
          color="blue" 
        />
        <StatCard 
          title="Low Stock Alerts" 
          value={stats.lowStock} 
          icon={AlertTriangle} 
          trend="Action Needed" 
          color="red" 
          isAlert
        />
      </div>

      {/* 3. Charts & Recent Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE CHART */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-dark-900 border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <TrendingUp size={100} />
          </div>
          <h3 className="text-lg font-bold text-white mb-6">Revenue Trajectory (Last 7 Days)</h3>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" tick={{fontSize: 12}} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* RECENT ACTIVITY */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-dark-900 border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <button className="text-xs text-brand-glow font-bold hover:underline">View All</button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
            {orders.map((order, i) => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                 <div className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center border border-white/10 text-slate-400">
                    <ShoppingBagIcon status={order.status} />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-bold text-white truncate w-32">
                      {order.user?.first_name || 'Guest'} {order.user?.last_name || ''}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-brand-glow">${order.total_amount}</p>
                    <StatusBadge status={order.status} />
                 </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

// --- SUB COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, trend, color, isAlert }) => {
  const colorMap = {
    cyan: 'text-brand-glow bg-brand-glow/10 border-brand-glow/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`p-6 rounded-3xl bg-dark-900 border border-white/5 shadow-lg relative overflow-hidden group`}
    >
      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity bg-${color}-500`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          <Icon size={24} />
        </div>
        {!isAlert && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
            <ArrowUpRight size={12} /> {trend}
          </div>
        )}
        {isAlert && <div className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-1 rounded-lg blink">{trend}</div>}
      </div>
      
      <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <p className="text-3xl font-black text-white mt-1">{value}</p>
    </motion.div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    pending: "text-yellow-400",
    paid: "text-blue-400",
    shipped: "text-purple-400",
    delivered: "text-green-400",
    cancelled: "text-red-400",
  };
  return <span className={`text-[10px] font-bold uppercase tracking-wide ${styles[status] || 'text-slate-400'}`}>{status}</span>;
};

const ShoppingBagIcon = ({ status }) => {
  if (status === 'delivered') return <CheckCircle size={18} className="text-green-500" />;
  if (status === 'cancelled') return <XCircle size={18} className="text-red-500" />;
  if (status === 'pending') return <Clock size={18} className="text-yellow-500" />;
  return <Package size={18} />;
};

export default Dashboard;