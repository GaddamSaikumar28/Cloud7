// src/api/homeContentApi.js
import { supabase } from '../client/supabaseClient';

export const homeContentApi = {
  
  // 1. Fetch Latest Articles
  getLatestArticles: async () => {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('is_featured', true) // prioritize featured
      .order('created_at', { ascending: false })
      .limit(3);

    if (error) throw error;
    return data;
  },

  // 2. Fetch Latest Verified Batches (for Lab Preview)
  getLatestLabResults: async () => {
    // We want to show real data: "Just tested: Mint Batch #123"
    const { data, error } = await supabase
      .from('product_variants')
      .select(`
        id, 
        batch_number, 
        tested_at, 
        product:products (name, cover_image_url)
      `)
      .not('lab_report_url', 'is', null) // Only ones with reports
      .not('tested_at', 'is', null)
      .order('tested_at', { ascending: false })
      .limit(5);

    if (error) throw error;
    
    // Flatten structure for easier UI use
    return data.map(item => ({
      id: item.id,
      productName: item.product?.name || 'Product',
      batch: item.batch_number,
      date: item.tested_at,
      image: item.product?.cover_image_url
    }));
  }
};