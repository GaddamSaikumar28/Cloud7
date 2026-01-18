import { supabase } from '../client/supabaseClient';

export const getDashboardStats = async () => {
  // 1. Total Revenue
  const { data: revenueData } = await supabase
    .from('orders')
    .select('total_amount')
    .neq('status', 'cancelled'); // Don't count cancelled orders
  
  const totalRevenue = revenueData?.reduce((acc, curr) => acc + (Number(curr.total_amount) || 0), 0) || 0;

  // 2. Total Orders
  const { count: totalOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  // 3. Total Users
  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });

  // 4. Low Stock Products
  const { count: lowStock } = await supabase
    .from('product_variants')
    .select('*', { count: 'exact', head: true })
    .lt('stock_quantity', 10);

  return {
    revenue: totalRevenue,
    orders: totalOrders,
    users: totalUsers,
    lowStock: lowStock
  };
};

export const getRecentOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, 
      total_amount, 
      status, 
      created_at,
      user:profiles(first_name, last_name, role) 
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
};

export const getRevenueChartData = async () => {
  // Get orders from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data } = await supabase
    .from('orders')
    .select('created_at, total_amount')
    .gte('created_at', sevenDaysAgo.toISOString())
    .neq('status', 'cancelled');

  // Process data for Recharts (Group by Day)
  const chartMap = {};
  data?.forEach(order => {
    const date = new Date(order.created_at).toLocaleDateString('en-US', { weekday: 'short' });
    chartMap[date] = (chartMap[date] || 0) + Number(order.total_amount);
  });

  return Object.keys(chartMap).map(key => ({ name: key, revenue: chartMap[key] }));
};