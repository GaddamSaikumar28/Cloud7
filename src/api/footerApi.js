import { supabase } from '../client/supabaseClient';

export const footerApi = {
  getFooterData: async () => {
    // 1. Get Global Footer Settings
    const { data: settings } = await supabase
      .from('footer_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    // 2. Get Site Settings (for Logo)
    const { data: siteSettings } = await supabase
      .from('site_settings')
      .select('logo_url, site_name')
      .limit(1)
      .maybeSingle();

    // 3. Get Navigation Links
    const { data: links } = await supabase
      .from('footer_links')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    // 4. Get Social Links
    const { data: social } = await supabase
      .from('social_links')
      .select('*')
      .eq('is_active', true);

    return {
      settings: settings || {},
      logo: siteSettings || { site_name: 'Cloud7', logo_url: '' },
      links: links || [],
      social: social || []
    };
  }
};