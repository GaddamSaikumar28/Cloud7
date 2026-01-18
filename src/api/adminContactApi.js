import { supabase } from '../client/supabaseClient';

export const adminContactApi = {
  
  // --- DASHBOARD DATA ---
  getDashboardData: async () => {
    // Fetch everything in parallel
    const [settings, faqs, submissions] = await Promise.all([
      supabase.from('site_settings').select('*').single(),
      supabase.from('faqs').select('*').order('display_order', { ascending: true }),
      supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    ]);

    return {
      settings: settings.data || {},
      faqs: faqs.data || [],
      submissions: submissions.data || []
    };
  },

  // --- SETTINGS ---
  updateSettings: async (id, data) => {
    // If ID exists update, else insert (singleton pattern)
    if (id) {
      const { error } = await supabase.from('site_settings').update(data).eq('id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from('site_settings').insert([data]);
      if (error) throw error;
    }
  },

  // --- FAQs ---
  createFaq: async (faqData) => {
    const { data, error } = await supabase.from('faqs').insert([faqData]).select().single();
    if (error) throw error;
    return data;
  },

  updateFaq: async (id, faqData) => {
    const { data, error } = await supabase.from('faqs').update(faqData).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },

  deleteFaq: async (id) => {
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (error) throw error;
  },

  // --- SUBMISSIONS (INBOX) ---
  updateSubmissionStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deleteSubmission: async (id) => {
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) throw error;
  }
};