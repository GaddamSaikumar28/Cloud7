
import { supabase } from '../client/supabaseClient';

export const cartApi = {
  // 1. Fetch Cart with deep nested attributes
  fetchCart: async (userId) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products (id, name, cover_image_url ,slug, image_color, is_active), 
        product_variants (
          id, price, stock_quantity, is_active,
          variant_selection_map (
            variant_options (
              name,
              type:variant_types(name) 
            )
          )
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Fetch Cart Error:", error);
      return [];
    }
    return data || [];
  },

  // 2. Add Item (Upsert Logic with FULL Return Data)
  addToCart: async (userId, productId, variantId, flavorName, quantity) => {
    // Check if item exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('variant_id', variantId) 
      .maybeSingle();

    let query;

    if (existing) {
      // Update existing item
      query = supabase.from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('id', existing.id);
    } else {
      // Insert new item
      query = supabase.from('cart_items')
        .insert({
          user_id: userId,
          product_id: productId,
          variant_id: variantId,
          flavor_name: flavorName || 'Standard', 
          quantity: quantity
        });
    }

    // CRITICAL FIX: Select the FULL structure so the UI can render it immediately without crashing
    const { data, error } = await query
      .select(`
        *,
        products (id, name, slug, image_color, is_active), 
        product_variants (
          id, price, stock_quantity, is_active,
          variant_selection_map (
            variant_options (
              name,
              type:variant_types(name) 
            )
          )
        )
      `)
      .single();

    if (error) throw error;
    return data;
  },

  updateQuantity: async (itemId, quantity) => {
    await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
  },

  removeItem: async (itemId) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
  },

  clearCart: async (userId) => {
    await supabase.from('cart_items').delete().eq('user_id', userId);
  },

  getDeliveryConfig: async () => {
    const { data } = await supabase
      .from('delivery_configs')
      .select('*')
      .eq('is_active', true)
      .single();
    return data;
  }
};