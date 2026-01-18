import { supabase } from '../client/supabaseClient';

export const adminHeroApi = {
  
  // 1. Get Current Config
  getHeroConfig: async () => {
    const { data, error } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    
    // Default structure if DB is empty
    return data || {
      headline: '',
      subheadline: '',
      cta_text: 'SHOP NOW',
      cta_link: '/shop',
      glow_color: '#3b82f6',
      hero_images: [null, null, null, null] // Ensure 4 slots
    };
  },

  // 2. Upload Image to 'Cloud7' Bucket
  uploadHeroImage: async (file) => {
    if (!file) return null;

    const fileExt = file.name.split('.').pop();
    // Unique filename: hero_timestamp_random.png
    const fileName = `hero_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('Cloud7')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('Cloud7').getPublicUrl(fileName);
    return data.publicUrl;
  },

  // 3. Save Configuration (Update or Insert)
  saveHeroConfig: async (configData, id = null) => {
    // If we have an ID, update; otherwise insert a new active row
    if (id) {
      const { data, error } = await supabase
        .from('hero_sections')
        .update(configData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('hero_sections')
        .insert([{ ...configData, is_active: true }])
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  }
};