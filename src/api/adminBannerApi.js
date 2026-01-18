import { supabase } from '../client/supabaseClient';

export const adminBannerApi = {
  
  // 1. Fetch All Items (Active & Inactive)
  getAllItems: async () => {
    const { data, error } = await supabase
      .from('banner_items')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  // 2. Add New Item
  addItem: async (itemData) => {
    // Get the current max sort order to append to the end
    const { data: maxData } = await supabase
      .from('banner_items')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1);
    
    const nextOrder = (maxData && maxData[0]?.sort_order) ? maxData[0].sort_order + 1 : 1;

    const { data, error } = await supabase
      .from('banner_items')
      .insert([{ ...itemData, sort_order: nextOrder }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 3. Update Item
  updateItem: async (id, updates) => {
    const { data, error } = await supabase
      .from('banner_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Delete Item
  deleteItem: async (id) => {
    const { error } = await supabase
      .from('banner_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // 5. Reorder Items (Swap logic)
  reorderItems: async (items) => {
    // This receives the full array in the new desired order
    // We assume the frontend handles the array manipulation
    // We just update the sort_order for everyone
    
    const updates = items.map((item, index) => ({
      id: item.id,
      text: item.text, // Supabase requires passing other non-null fields or just PK
      sort_order: index + 1
    }));

    const { error } = await supabase
      .from('banner_items')
      .upsert(updates, { onConflict: 'id' }); // Upsert is efficient for batch updates

    if (error) throw error;
  }
};