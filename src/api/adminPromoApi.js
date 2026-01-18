
import { supabase } from '../client/supabaseClient';

export const adminPromoApi = {
  
  // 1. GET ALL BANNERS
  getBanners: async () => {
    const { data, error } = await supabase
      .from('promo_banners')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data;
  },

  // 2. UPLOAD MEDIA (Image/Video/GIF)
  uploadMedia: async (file) => {
    const fileExt = file.name.split('.').pop();
    // Unique filename to prevent caching issues or collisions
    const fileName = `BANNER_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    // Upload to 'Cloud7' bucket
    const { error: uploadError } = await supabase.storage
      .from('Cloud7')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get Public URL
    const { data } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  // 3. SAVE (Create or Update)
  saveBanner: async (bannerData) => {
    
    if (bannerData.id) {
      // --- UPDATE LOGIC ---
      // FIX: Destructure 'id' out of the object so we don't try to update it
      const { id, created_at, ...updateData } = bannerData;

      const { data, error } = await supabase
        .from('promo_banners')
        .update(updateData) // Only update the editable fields
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;

    } else {
      // --- INSERT LOGIC ---
      // Remove 'id' if it's present (e.g. null) so DB generates it
      const { id, ...insertData } = bannerData;

      const { data, error } = await supabase
        .from('promo_banners')
        .insert([insertData])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  },

  // 4. DELETE
  deleteBanner: async (id) => {
    const { error } = await supabase
      .from('promo_banners')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  // 5. TOGGLE ACTIVE STATUS
  toggleActive: async (id, currentStatus) => {
    const { error } = await supabase
      .from('promo_banners')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    
    if (error) throw error;
    return !currentStatus;
  }
};