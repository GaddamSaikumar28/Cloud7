
import { supabase } from '../client/supabaseClient';

/**
 * Fetches all active products with dynamic pricing and review calculations
 */
export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      product_variants (
        price,
        is_active
      ),
      reviews (
        rating,
        status
      )
    `)
    .eq('is_active', true);

  if (error) throw error;

  // Transform data for UI
  return data.map(product => {
    // 1. Calculate Active Variants & Price
    const activeVariants = product.product_variants?.filter(v => v.is_active !== false) || [];
    const prices = activeVariants.map(v => Number(v.price));
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

    // 2. Calculate Real-Time Reviews (Approved Only)
    // We default to 'approved' if status is missing, just to be safe, 
    // but schema says default is 'approved'.
    const approvedReviews = product.reviews?.filter(r => r.status === 'approved') || [];
    const reviewCount = approvedReviews.length;
    
    const avgRating = reviewCount > 0 
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

    // Round to 1 decimal place (e.g., 4.5)
    const formattedRating = avgRating > 0 ? parseFloat(avgRating.toFixed(1)) : null;

    return {
      ...product,
      categoryName: product.category?.name || 'Uncategorized',
      
      // Dynamic Pricing
      displayPrice: minPrice > 0 ? minPrice.toFixed(2) : 'TBD',
      
      // Dynamic Reviews
      calculatedRating: formattedRating,
      calculatedReviewsCount: reviewCount,
      
      // Asset Fallback
      coverImage: product.cover_image_url || "https://via.placeholder.com/600x600/1a1a1a/ffffff?text=Protocol+Image"
    };
  });
};

/**
 * Fetches the list of active categories for the filter bar
 */
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
};