import { supabase } from '../client/supabaseClient';

export const reviewsApi = {
  getFeaturedReviews: async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles (first_name, last_name, role)
      `)
      .eq('status', 'approved') // Only show approved
      .gte('rating', 4)         // Only show 4 or 5 stars on homepage
      .order('created_at', { ascending: false })
      .limit(10);               // Fetch top 10 recent

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    // Format data for UI
    return data.map(r => ({
      id: r.id,
      text: r.comment,
      rating: r.rating,
      user: r.profiles 
        ? `${r.profiles.first_name || 'Cloud7'} ${r.profiles.last_name?.charAt(0) || 'User'}.`
        : 'Anonymous',
      role: r.verified_purchase ? 'Verified Buyer' : 'Community Member',
      date: new Date(r.created_at).toLocaleDateString()
    }));
  }
};