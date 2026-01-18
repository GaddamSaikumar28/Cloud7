import { supabase } from '../client/supabaseClient';

// Fetch list of orders with filters
export const getAdminOrders = async ({ status, search }) => {
  let query = supabase
    .from('orders')
    .select(`
      id, created_at, status, total_amount, 
      user:profiles(first_name, last_name, phone_number),
      items:order_items(count)
    `)
    .order('created_at', { ascending: false });

  if (status && status !== 'All') {
    query = query.eq('status', status.toLowerCase());
  }

  // Note: Deep text search on joined tables is complex in Supabase. 
  // For this level, we allow searching by exact Order ID.
  if (search) {
    query = query.eq('id', search);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Fetch single full order details
export const getOrderDetails = async (orderId) => {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      user:profiles(*),
      items:order_items(
        *,
        product:products(name, slug, cover_image_url),
        variant:product_variants(sku)
      ),
      logs:order_logs(*)
    `)
    .eq('id', orderId)
    .single();

  if (error) throw error;
  
  // Sort logs by newest
  data.logs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return data;
};

// Update Status & Log it
export const updateOrderStatus = async (orderId, newStatus) => {
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId);

  if (error) throw error;

  await logOrderAction(orderId, 'STATUS_UPDATE', `Order status changed to ${newStatus}`);
};

// Update Tracking
export const updateTracking = async (orderId, trackingNumber) => {
  const { error } = await supabase
    .from('orders')
    .update({ 
      tracking_number: trackingNumber,
      status: 'shipped' // Auto-update status usually happens here
    })
    .eq('id', orderId);

  if (error) throw error;
  await logOrderAction(orderId, 'TRACKING_ADDED', `Tracking number added: ${trackingNumber}`);
};

// Add Internal Note
export const addOrderNote = async (orderId, note) => {
  await logOrderAction(orderId, 'NOTE', note);
};

// Helper to write to log table
const logOrderAction = async (orderId, action, message) => {
  await supabase.from('order_logs').insert([{ order_id: orderId, action, message }]);
};