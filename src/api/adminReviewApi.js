import { supabase } from '../client/supabaseClient';

export const getAdminReviews = async ({ status, search, productId }) => {
  // Query the View instead of the raw table
  let query = supabase
    .from('admin_reviews_view')
    .select('*')
    .order('created_at', { ascending: false });

  // Filters
  if (status && status !== 'All') {
    query = query.eq('status', status.toLowerCase());
  }
  
  if (productId) {
    query = query.eq('product_id', productId);
  }

  // Search by Comment, Email, or Name
  if (search) {
    query = query.or(`comment.ilike.%${search}%,email.ilike.%${search}%,first_name.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// --- ACTIONS ---

export const updateReviewStatus = async (id, status) => {
  const { error } = await supabase
    .from('reviews')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
};

export const updateAdminResponse = async (id, response) => {
  const { error } = await supabase
    .from('reviews')
    .update({ admin_response: response })
    .eq('id', id);
  if (error) throw error;
};

export const deleteReview = async (id) => {
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

// Create a Manual Review (e.g. importing from another platform)
export const createAdminReview = async (payload) => {
  const { error } = await supabase
    .from('reviews')
    .insert([{
      product_id: payload.product_id,
      user_id: payload.user_id, // Ensure this admin/system user exists
      rating: payload.rating,
      comment: payload.comment,
      status: 'approved',
      created_at: payload.date ? new Date(payload.date) : new Date()
    }]);
  if (error) throw error;
};