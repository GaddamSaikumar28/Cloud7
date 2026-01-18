import { supabase } from '../client/supabaseClient';

export const contactApi = {
  
  // 1. Fetch Page Configuration (FAQs + Contact Info)
  getPageData: async () => {
    try {
      // Parallel fetch for speed
      const [settingsRes, faqsRes] = await Promise.all([
        supabase.from('site_settings').select('*').limit(1).single(),
        supabase.from('faqs').select('*').eq('is_active', true).order('display_order', { ascending: true })
      ]);

      return {
        contactInfo: settingsRes.data || {},
        faqs: faqsRes.data || []
      };
    } catch (error) {
      console.error("Error fetching contact data:", error);
      throw error;
    }
  },

  // 2. Submit Contact Form
  sendMessage: async (formData, userId = null) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        user_id: userId,
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: 'new'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};