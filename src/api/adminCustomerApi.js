
import { supabase } from '../client/supabaseClient';

export const adminCustomerApi = {
  // --- FETCHING ---
  
  getAllCustomers: async () => {
    // We use a Remote Procedure Call (RPC) to safely join auth.users (email)
    // with public.profiles and aggregate order stats on the server side.
    const { data, error } = await supabase.rpc('get_admin_customer_overview');

    if (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }

    // Map the RPC result to the structure the UI expects
    return data.map(customer => ({
      id: customer.id,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email, // Now correctly populated from auth.users
      phone_number: customer.phone_number,
      is_blocked: customer.is_blocked,
      admin_notes: customer.admin_notes,
      created_at: customer.created_at,
      stats: {
        ordersCount: customer.orders_count || 0,
        totalSpent: customer.total_spent || 0,
        lastOrder: customer.last_order_date
      },
      defaultAddress: customer.default_address // Already JSONB from SQL
    }));
  },

  // --- ACTIONS ---

  toggleBlockStatus: async (userId, currentStatus) => {
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_blocked: !currentStatus })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateProfileDetails: async (userId, updates) => {
    // Note: 'email' cannot be updated here directly as it lives in auth.users.
    // We separate the profile updates from the email/auth updates.
    
    const profileUpdates = {
      first_name: updates.first_name,
      last_name: updates.last_name,
      phone_number: updates.phone_number,
      admin_notes: updates.admin_notes
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    // IMPORTANT: If Email changed, we must update auth.users
    // This typically requires a backend function (Edge Function) due to security.
    // For now, if email differs, we log a warning or you can implement the edge function call.
    if (updates.email) {
      console.warn("Email update requires Service Role / Edge Function. Skipping auth email update.");
      // await supabase.functions.invoke('update-user-email', { userId, email: updates.email });
    }

    return { ...data, email: updates.email }; // Return combined data for UI
  },

  updateCustomerAddress: async (addressId, addressData) => {
    // Edge case: If user has no default address yet, we might need to insert instead of update
    // But since the ID is passed, we assume existence.
    const { data, error } = await supabase
      .from('addresses')
      .update(addressData)
      .eq('id', addressId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mock function for sensitive actions that require Backend/Edge Functions
  adminUpdateAuth: async (userId, type, value) => {
    // In production, call your Supabase Edge Function:
    // const { error } = await supabase.functions.invoke('admin-user-management', { 
    //   body: { action: 'update_password', userId, newPassword: value } 
    // });
    
    console.log(`[Admin Action] Request to update ${type} for ${userId}`);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call
    return true; 
  }
};