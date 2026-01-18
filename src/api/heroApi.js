import { supabase } from '../client/supabaseClient';

export const heroApi = {
  /**
   * Fetches the currently active hero configuration.
   * Returns null if no active hero is found.
   */
  getActiveHero: async () => {
    const { data, error } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Error fetching hero:", error);
      return null;
    }
    
    return data; 
  }
};