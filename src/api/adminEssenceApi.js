import { supabase } from '../client/supabaseClient';

export const adminEssenceApi = {
  
  // 1. Get Config (with Fallback)
  getConfig: async () => {
    const { data, error } = await supabase
      .from('essence_sections')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    
    // Return DB data OR a clean default object
    return data || {
      heading: '',
      subheading: '',
      paragraph_1: '',
      paragraph_2: '',
      footer_text: '',
      glow_color: '#0ea5e9', // Default Brand Blue
      is_active: true
    };
  },

  // 2. Save Config (Upsert)
  saveConfig: async (configData) => {
    // timestamp for internal tracking
    const payload = {
      ...configData,
      updated_at: new Date() 
    };

    // If payload.id is null/undefined, remove it so Postgres generates a new one
    if (!payload.id) delete payload.id;

    const { data, error } = await supabase
      .from('essence_sections')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};