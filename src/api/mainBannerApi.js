import { supabase } from '../client/supabaseClient';

export const getPromoBanners = async () => {
  const { data, error } = await supabase
    .from('promo_banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
  return data;
};