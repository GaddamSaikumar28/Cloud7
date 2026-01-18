import { supabase } from '../client/supabaseClient';

export const bannerApi = {
  getActiveBannerItems: async () => {
    const { data, error } = await supabase
      .from('banner_items')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error("Error fetching banner items:", error);
      return [];
    }
    
    return data; 
  }
};