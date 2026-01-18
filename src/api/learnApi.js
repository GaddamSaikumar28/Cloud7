import { supabase } from '../client/supabaseClient';

export const learnApi = {
  
  /**
   * Fetch all articles for the Research Hub.
   * Sorted by newest first.
   */
  getArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching articles:", error);
      // Return empty array to prevent app crash
      return [];
    }
    return data;
  },

  /**
   * Fetch Company Values for the "About/Mission" section.
   * Sorted by ID (creation order).
   */
  getCompanyValues: async () => {
    const { data, error } = await supabase
      .from('company_values')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error("Error fetching company values:", error);
      return [];
    }
    return data;
  }
};