import { supabase } from '../client/supabaseClient';

export const layoutApi = {
  
  // Fetch Logo & Links
  getNavbarData: async () => {
    // 1. Get Settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('site_name, logo_url')
      .limit(1)
      .maybeSingle();

    // 2. Get Links
    const { data: links } = await supabase
      .from('navbar_links')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    return {
      settings: settings || { site_name: 'CLOUD7', logo_url: null },
      links: links || []
    };
  },

  // Admin: Save Link Order/Updates
  saveLinks: async (links) => {
    const { error } = await supabase.from('navbar_links').upsert(links);
    if (error) throw error;
  },

  // Admin: Update Site Identity
  updateIdentity: async (settings) => {
    // Assuming ID 1 or the only row
    const { error } = await supabase
      .from('site_settings')
      .update(settings)
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Hack to update all rows if singleton
      
    // Better approach: Get ID first, then update. 
    // For now, assuming you have one row in site_settings.
  }
};