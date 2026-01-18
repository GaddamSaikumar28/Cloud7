// import { supabase } from '../client/supabaseClient';

// export const userApi = {
//   // Update Profile (Name, Phone, etc.)
//   updateProfile: async (userId, profileData) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .update(profileData)
//       .eq('id', userId)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   },

//   // Update Address
//   updateAddress: async (userId, addressData) => {
//     // Check if address exists
//     const { data: existing } = await supabase
//       .from('addresses')
//       .select('id')
//       .eq('user_id', userId)
//       .maybeSingle();

//     if (existing) {
//       const { data, error } = await supabase
//         .from('addresses')
//         .update(addressData)
//         .eq('user_id', userId)
//         .select();
//       if (error) throw error;
//       return data;
//     } else {
//       const { data, error } = await supabase
//         .from('addresses')
//         .insert([{ user_id: userId, ...addressData, is_default: true }])
//         .select();
//       if (error) throw error;
//       return data;
//     }
//   },

//   // Update Password
//   updatePassword: async (newPassword) => {
//     const { data, error } = await supabase.auth.updateUser({
//       password: newPassword
//     });
//     if (error) throw error;
//     return data;
//   },

//   // Fetch Order History with Items and Product details
//   getOrders: async (userId) => {
//     const { data, error } = await supabase
//       .from('orders')
//       .select(`
//         *,
//         order_items (
//           *,
//           products (name, image_color)
//         )
//       `)
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   }
// };
import { supabase } from '../client/supabaseClient';

// export const userApi = {
//   // --- PROFILE MANAGEMENT ---
  
//   getProfile: async (userId) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .select('*')
//       .eq('id', userId)
//       .single();
//     if (error && error.code !== 'PGRST116') throw error; // Ignore 'not found'
//     return data;
//   },

//   updateProfile: async (userId, profileData) => {
//     const { data, error } = await supabase
//       .from('profiles')
//       .update(profileData)
//       .eq('id', userId)
//       .select()
//       .single();
//     if (error) throw error;
//     return data;
//   },

//   // --- ADDRESS MANAGEMENT ---

//   // Get the default address for the settings form
//   getDefaultAddress: async (userId) => {
//     const { data, error } = await supabase
//       .from('addresses')
//       .select('*')
//       .eq('user_id', userId)
//       .eq('is_default', true)
//       .maybeSingle();
      
//     if (error) throw error;
//     return data;
//   },

//   // Upsert (Insert or Update) Address
//   upsertAddress: async (userId, addressData) => {
//     // 1. Check if we have an ID to update
//     if (addressData.id) {
//       const { data, error } = await supabase
//         .from('addresses')
//         .update(addressData)
//         .eq('id', addressData.id)
//         .select()
//         .single();
//       if (error) throw error;
//       return data;
//     } 
//     // 2. Otherwise Insert New Default
//     else {
//       // First, remove default flag from others (optional, but good practice)
//       await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);

//       const { data, error } = await supabase
//         .from('addresses')
//         .insert([{ ...addressData, user_id: userId, is_default: true }])
//         .select()
//         .single();
//       if (error) throw error;
//       return data;
//     }
//   },

//   // --- ORDER HISTORY ---

//   getOrders: async (userId) => {
//     const { data, error } = await supabase
//       .from('orders')
//       .select(`
//         *,
//         order_items (
//           id, quantity, price_at_purchase, item_name, item_variant_label, flavor_name,
//           products (slug, cover_image_url, image_color) 
//         ),
//         payments (
//           provider, status, amount
//         )
//       `)
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });

//     if (error) throw error;
//     return data;
//   }
// };

// import { supabase } from '../client/supabaseClient';

export const userApi = {
  // --- PROFILE & ADDRESS (Existing) ---
  
  getProfile: async (userId) => {
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  updateProfile: async (userId, profileData) => {
    const { data, error } = await supabase.from('profiles').update(profileData).eq('id', userId).select().single();
    if (error) throw error;
    return data;
  },

  getDefaultAddress: async (userId) => {
    const { data } = await supabase.from('addresses').select('*').eq('user_id', userId).eq('is_default', true).maybeSingle();
    return data;
  },

  upsertAddress: async (userId, addressData) => {
    if (addressData.id) {
      const { data, error } = await supabase.from('addresses').update(addressData).eq('id', addressData.id).select().single();
      if (error) throw error;
      return data;
    } else {
      await supabase.from('addresses').update({ is_default: false }).eq('user_id', userId);
      const { data, error } = await supabase.from('addresses').insert([{ ...addressData, user_id: userId, is_default: true }]).select().single();
      if (error) throw error;
      return data;
    }
  },

  // --- ORDER MANAGEMENT ---

  getOrders: async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          id, quantity, price_at_purchase, item_name, item_variant_label, flavor_name, product_id,
          products (slug, cover_image_url, image_color) 
        ),
        payments (
          provider, status, amount
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Cancel Order (Only if not shipped/delivered)
  cancelOrder: async (orderId) => {
    // 1. Mark Order as Cancelled
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'cancelled' })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // 2. Log the action
    await supabase.from('order_logs').insert([{
      order_id: orderId,
      action: 'cancelled',
      message: 'User requested cancellation via portal.'
    }]);

    // 3. (Optional) Create Refund Record if payment was successful
    // In a real app, this would trigger a Stripe Refund Webhook
    const { data: payment } = await supabase.from('payments').select('status, amount').eq('order_id', orderId).single();
    
    if (payment && payment.status === 'succeeded') {
       await supabase.from('payments').update({ status: 'refunded' }).eq('order_id', orderId);
    }

    return data;
  },

  // Request Return (Only if delivered)
  requestReturn: async (orderId, reason) => {
    // 1. Update status to 'returned' (or 'return_requested' if you have that status)
    const { data, error } = await supabase
      .from('orders')
      .update({ status: 'returned' }) 
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // 2. Log the request
    await supabase.from('order_logs').insert([{
      order_id: orderId,
      action: 'return_requested',
      message: `User requested return. Reason: ${reason}`
    }]);
    
    // 3. Mark payment as 'refunded' (Simulated)
    await supabase.from('payments').update({ status: 'refunded' }).eq('order_id', orderId);

    return data;
  }
};