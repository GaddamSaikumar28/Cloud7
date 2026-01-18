import { supabase } from '../client/supabaseClient';

export const ctaApi = {
  getActiveCTA: async () => {
    const { data, error } = await supabase
      .from('home_cta_sections')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching CTA:", error);
      return null;
    }
    return data;
  }
};