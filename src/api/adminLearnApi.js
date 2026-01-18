import { supabase } from '../client/supabaseClient';

export const adminLearnApi = {
  
  // --- ARTICLES ---
  getArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  saveArticle: async (article) => {
    const payload = { ...article, updated_at: new Date() }; // Add updated_at if you added that column, or just ignore
    if (!payload.id) delete payload.id;
    
    const { data, error } = await supabase
      .from('articles')
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteArticle: async (id) => {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
  },

  // --- VALUES (ABOUT SECTION) ---
  getValues: async () => {
    const { data, error } = await supabase.from('company_values').select('*').order('id');
    if (error) throw error;
    return data;
  },

  saveValue: async (val) => {
    const payload = { ...val };
    if (!payload.id) delete payload.id;

    const { data, error } = await supabase
      .from('company_values')
      .upsert(payload)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteValue: async (id) => {
    const { error } = await supabase.from('company_values').delete().eq('id', id);
    if (error) throw error;
  },

  uploadImage: async (file) => {
    // 1. Create a clean file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `article-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('Cloud7')
      .upload(filePath, file);

    if (error) {
      throw new Error("Upload failed: " + error.message);
    }

    // 3. Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  },
};