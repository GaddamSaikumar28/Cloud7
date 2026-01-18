import { supabase } from '../client/supabaseClient';

export const adminFooterApi = {
  
  // --- SETTINGS ---
  getSettings: async () => {
    const { data, error } = await supabase
      .from('footer_settings')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return data || {};
  },

  saveSettings: async (settings) => {
    const payload = { ...settings, updated_at: new Date() };
    if(!payload.id) delete payload.id; // Let DB generate ID if missing

    const { data, error } = await supabase
      .from('footer_settings')
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // --- LINKS ---
  getLinks: async () => {
    const { data, error } = await supabase
      .from('footer_links')
      .select('*')
      .order('column_name', { ascending: true })
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data;
  },

  saveLink: async (link) => {
    const { id, ...payload } = link;
    const { data, error } = await supabase
      .from('footer_links')
      .upsert({ id: id || undefined, ...payload }) // Handle ID auto-gen
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteLink: async (id) => {
    const { error } = await supabase.from('footer_links').delete().eq('id', id);
    if (error) throw error;
  },

  // --- SOCIALS ---
  getSocials: async () => {
    const { data, error } = await supabase.from('social_links').select('*').order('id');
    if (error) throw error;
    return data;
  },

  saveSocial: async (social) => {
    const { id, ...payload } = social;
    const { data, error } = await supabase
      .from('social_links')
      .upsert({ id: id || undefined, ...payload })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteSocial: async (id) => {
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) throw error;
  }
};