import { supabase } from '../client/supabaseClient';

export const adminNavigationApi = {

  /**
   * Uploads logo to 'Cloud7' bucket and returns the Public URL.
   */
  uploadLogo: async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `logo-${Date.now()}.${fileExt}`;
    
    // 1. Upload to Cloud7 Bucket
    const { error: uploadError } = await supabase.storage
      .from('Cloud7')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // 2. Get Public URL
    const { data } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  /**
   * Fetch Site Identity (Logo, Name)
   */
  getSettings: async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();
      
    if (error) throw error;
    return data; 
  },

  /**
   * Save Site Identity (Updates the single row)
   */
  saveSettings: async (settings) => {
    // We assume there is only 1 row. If ID exists, update it.
    const payload = {
       ...settings,
       updated_at: new Date() // Force timestamp update
    };

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(payload)
      .select();

    if (error) throw error;
    return data;
  },

  /**
   * Fetch all menu links
   */
  getLinks: async () => {
    const { data, error } = await supabase
      .from('navbar_links')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  /**
   * Save (Upsert) Links
   * If link has ID, it updates. If no ID, it creates.
   */
  saveLinks: async (links) => {
    // Prepare payload: remove temporary UI flags if any
    const payload = links.map(link => ({
        id: link.id, // If this is undefined/null, DB creates new ID
        label: link.label,
        path: link.path,
        sort_order: link.sort_order,
        is_active: link.is_active
    }));

    const { data, error } = await supabase
      .from('navbar_links')
      .upsert(payload)
      .select();

    if (error) throw error;
    return data;
  },

  /**
   * Delete a link
   */
  deleteLink: async (id) => {
    const { error } = await supabase
      .from('navbar_links')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};