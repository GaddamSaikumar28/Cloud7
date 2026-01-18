import { supabase } from '../client/supabaseClient';

export const adminCtaApi = {
  
  // 1. Get the current configuration
  getConfig: async () => {
    const { data, error } = await supabase
      .from('home_cta_sections')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    
    // Return data or default skeleton if table is empty
    return data || {
      heading_line_1: '',
      heading_line_2: '',
      body_text: '',
      cta_text: 'Shop Now',
      cta_link: '/shop',
      features: [], // Array
      review_stars: 5,
      review_title: '',
      review_quote: '',
      review_author_label: 'Verified Buyer',
      is_active: true
    };
  },

  // 2. Save Configuration (Upsert)
  saveConfig: async (configData) => {
    // We want to ensure we only ever have ONE active config for this specific section layout
    // If an ID exists, we update. If not, we insert.
    
    const payload = {
      ...configData,
      updated_at: new Date()
    };

    // Remove ID from payload if it's null/undefined to let Postgres generate it
    if (!payload.id) delete payload.id;

    const { data, error } = await supabase
      .from('home_cta_sections')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};