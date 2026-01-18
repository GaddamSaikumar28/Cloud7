import { supabase } from '../client/supabaseClient';

export const essenceApi = {
  getActiveEssence: async () => {
    const { data, error } = await supabase
      .from('essence_sections')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching Essence:", error);
      return null;
    }
    return data;
  }
};