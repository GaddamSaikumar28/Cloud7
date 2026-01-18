
// // import { supabase } from '../client/supabaseClient';

// // export const getProductDetail = async (idOrSlug) => {
// //   // Regex to check if the string is a valid UUID
// //   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

// //   let query = supabase
// //     .from('products')
// //     .select(`
// //       *,
// //       category:categories(id, name),
// //       product_variants (
// //         id, price, stock_quantity,is_active,
// //         variant_selection_map (
// //           option:variant_options (
// //             name, metadata,
// //             type:variant_types (name)
// //           )
// //         )
// //       ),
// //       reviews (
// //         id, rating, comment, created_at,
// //         profiles (first_name, last_name)
// //       )
// //     `)
// //     .eq('is_active', true)
// //     .order('created_at', { foreignTable: 'reviews', ascending: false }); // Newest reviews first

// //   if (isUuid) {
// //     query = query.eq('id', idOrSlug);
// //   } else {
// //     query = query.eq('slug', idOrSlug);
// //   }

// //   const { data, error } = await query.single();

// //   if (error) {
// //     console.error("Database Error:", error);
// //     throw error;
// //   }

// //   // --- DYNAMIC DATA RESHAPING ---
// //   const dynamicOptions = {}; 
// //   const variantLookup = {};

// //   if (data.product_variants) {
// //     data.product_variants.forEach(variant => {
// //       // Skip if no mapping exists
// //       if (!variant.variant_selection_map) return;

// //       const keyParts = [];

// //       variant.variant_selection_map.forEach(selection => {
// //         const opt = selection.option;
// //         if (!opt) return;

// //         // Default to 'Flavor' if type is missing (legacy data support)
// //         const typeName = opt.type?.name || 'Flavor'; 
// //         const valueName = opt.name;     

// //         // Add to UI Options (Unique check)
// //         if (!dynamicOptions[typeName]) dynamicOptions[typeName] = [];
        
// //         // Only push if it doesn't already exist in the list
// //         if (!dynamicOptions[typeName].find(o => o.name === valueName)) {
// //           dynamicOptions[typeName].push({
// //             name: valueName,
// //             color: opt.metadata?.color 
// //           });
// //         }

// //         // Build the unique key part
// //         keyParts.push(`${typeName}:${valueName}`);
// //       });

// //       // Sort keys to ensure deterministic matching (e.g. "Flavor:Mint|Size:4")
// //       keyParts.sort(); 
// //       const uniqueKey = keyParts.join('|');

// //       variantLookup[uniqueKey] = {
// //         id: variant.id,
// //         price: variant.price,
// //         stock: variant.stock_quantity // Include stock for frontend logic
// //       };
// //     });
// //   }

// //   // Calculate Ratings
// //   const totalReviews = data.reviews?.length || 0;
// //   const avgRating = totalReviews > 0 
// //     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
// //     : 0;

// //   return {
// //     ...data,
// //     avgRating, // Dynamic avg based on DB
// //     reviews: data.reviews || [], // Ensure array
// //     categoryName: data.category?.name,
// //     dynamicOptions, 
// //     variantLookup   
// //   };
// // };

// // export const getSuggestedProducts = async (categoryId, currentProductId) => {
// //   const { data, error } = await supabase
// //     .from('products')
// //     .select('id, name, slug, image_color, potency, cover_image_url')
// //     .eq('category_id', categoryId)
// //     .eq('is_active', true)
// //     .neq('id', currentProductId)
// //     .limit(4); 

// //   if (error || !data || data.length === 0) return [];
// //   return data;
// // };

// // export const submitProductReview = async (productId, userId, rating, comment) => {
// //   const { data, error } = await supabase
// //     .from('reviews')
// //     .insert([{ product_id: productId, user_id: userId, rating, comment }])
// //     .select(`
// //       id, rating, comment, created_at,
// //       profiles (first_name, last_name)
// //     `)
// //     .single();
  
// //   if (error) {
// //     if (error.code === '23505') throw new Error("You have already reviewed this product.");
// //     throw error;
// //   }
// //   return data;
// // };

// import { supabase } from '../client/supabaseClient';

// export const getProductDetail = async (idOrSlug) => {
//   const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

//   let query = supabase
//     .from('products')
//     .select(`
//       *,
//       category:categories(id, name),
//       product_variants (
//         id, price, stock_quantity, is_active,
//         variant_selection_map (
//           option:variant_options (
//             name, metadata,
//             type:variant_types (name)
//           )
//         )
//       ),
//       reviews (
//         id, rating, comment, created_at,
//         profiles (first_name, last_name)
//       )
//     `)
//     .eq('is_active', true) 
//     .order('created_at', { foreignTable: 'reviews', ascending: false });

//   if (isUuid) {
//     query = query.eq('id', idOrSlug);
//   } else {
//     query = query.eq('slug', idOrSlug);
//   }

//   const { data, error } = await query.single();

//   if (error) {
//     console.error("Database Error:", error);
//     throw error;
//   }

//   // --- STRICT FILTERING & RESHAPING ---
//   const dynamicOptions = {}; 
//   const variantLookup = {};

//   if (data.product_variants) {
//     data.product_variants.forEach(variant => {
//       // 1. CRITICAL FIX: Strictly ignore inactive variants
//       // If a variant is deleted/inactive, its options (e.g., "Size: 1") will NOT be added to the UI
//       if (variant.is_active === false) return;

//       // Skip if no mapping exists
//       if (!variant.variant_selection_map) return;

//       const keyParts = [];

//       variant.variant_selection_map.forEach(selection => {
//         const opt = selection.option;
//         if (!opt) return;

//         const typeName = opt.type?.name || 'Flavor'; 
//         const valueName = opt.name;     

//         // Add to UI Options (Unique check)
//         if (!dynamicOptions[typeName]) dynamicOptions[typeName] = [];
        
//         if (!dynamicOptions[typeName].find(o => o.name === valueName)) {
//           dynamicOptions[typeName].push({
//             name: valueName,
//             color: opt.metadata?.color 
//           });
//         }

//         // Build the unique key part
//         keyParts.push(`${typeName}:${valueName}`);
//       });

//       // Sort keys to ensure deterministic matching
//       keyParts.sort(); 
//       const uniqueKey = keyParts.join('|');

//       variantLookup[uniqueKey] = {
//         id: variant.id,
//         price: variant.price,
//         stock: variant.stock_quantity
//       };
//     });
//   }

//   // Calculate Ratings
//   const totalReviews = data.reviews?.length || 0;
//   const avgRating = totalReviews > 0 
//     ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
//     : 0;

//   return {
//     ...data,
//     avgRating,
//     reviews: data.reviews || [],
//     categoryName: data.category?.name,
//     dynamicOptions, // Now only contains options from ACTIVE variants
//     variantLookup   // Now only contains ACTIVE keys
//   };
// };

// export const getSuggestedProducts = async (categoryId, currentProductId) => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('id, name, slug, image_color, potency, cover_image_url')
//     .eq('category_id', categoryId)
//     .neq('id', currentProductId)
//     .eq('is_active', true)
//     .limit(4); 

//   if (error || !data || data.length === 0) return [];
//   return data;
// };

// export const submitProductReview = async (productId, userId, rating, comment) => {
//   const { data, error } = await supabase
//     .from('reviews')
//     .insert([{ product_id: productId, user_id: userId, rating, comment }])
//     .select(`
//       id, rating, comment, created_at,
//       profiles (first_name, last_name)
//     `)
//     .single();
  
//   if (error) {
//     if (error.code === '23505') throw new Error("You have already reviewed this product.");
//     throw error;
//   }
//   return data;
// };

import { supabase } from '../client/supabaseClient';

export const getProductDetail = async (idOrSlug) => {
  // Regex to check if the string is a valid UUID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);

  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name),
      product_variants (
        id, price, stock_quantity, is_active,
        variant_selection_map (
          option:variant_options (
            name, metadata,
            type:variant_types (name)
          )
        )
      ),
      reviews (
        id, rating, comment, created_at,
        profiles (first_name, last_name)
      )
    `)
    .eq('is_active', true) // Security: Only show active products
    .order('created_at', { foreignTable: 'reviews', ascending: false });

  if (isUuid) {
    query = query.eq('id', idOrSlug);
  } else {
    query = query.eq('slug', idOrSlug);
  }

  const { data, error } = await query.single();

  if (error) {
    console.error("Database Error:", error);
    throw error;
  }

  // --- STRICT FILTERING & RESHAPING ---
  const dynamicOptions = {}; 
  const variantLookup = {};

  if (data.product_variants) {
    data.product_variants.forEach(variant => {
      // 1. CRITICAL FIX: Strictly ignore inactive variants.
      // If a variant is deleted/inactive, its options won't be added to the UI lists.
      if (variant.is_active === false) return;

      // Skip if no mapping exists
      if (!variant.variant_selection_map) return;

      const keyParts = [];

      variant.variant_selection_map.forEach(selection => {
        const opt = selection.option;
        if (!opt) return;

        // Default to 'Flavor' if type is missing (legacy data support)
        const typeName = opt.type?.name || 'Flavor'; 
        const valueName = opt.name;     

        // Add to UI Options (Unique check)
        if (!dynamicOptions[typeName]) dynamicOptions[typeName] = [];
        
        // Only push if it doesn't already exist in the list
        if (!dynamicOptions[typeName].find(o => o.name === valueName)) {
          dynamicOptions[typeName].push({
            name: valueName,
            color: opt.metadata?.color 
          });
        }

        // Build the unique key part
        keyParts.push(`${typeName}:${valueName}`);
      });

      // Sort keys to ensure deterministic matching (e.g. "Flavor:Mint|Size:4")
      keyParts.sort(); 
      const uniqueKey = keyParts.join('|');

      variantLookup[uniqueKey] = {
        id: variant.id,
        price: variant.price,
        stock: variant.stock_quantity
      };
    });
  }

  // Calculate Ratings
  const totalReviews = data.reviews?.length || 0;
  const avgRating = totalReviews > 0 
    ? (data.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
    : 0;

  return {
    ...data,
    avgRating,
    reviews: data.reviews || [],
    categoryName: data.category?.name,
    dynamicOptions, // Now only contains options from ACTIVE variants
    variantLookup   // Now only contains ACTIVE keys
  };
};

export const getSuggestedProducts = async (categoryId, currentProductId) => {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, image_color, potency, cover_image_url')
    .eq('category_id', categoryId)
    .neq('id', currentProductId)
    .eq('is_active', true) // Only suggest active products
    .limit(4); 

  if (error || !data || data.length === 0) return [];
  return data;
};

export const submitProductReview = async (productId, userId, rating, comment) => {
  const { data, error } = await supabase
    .from('reviews')
    .insert([{ product_id: productId, user_id: userId, rating, comment }])
    .select(`
      id, rating, comment, created_at,
      profiles (first_name, last_name)
    `)
    .single();
  
  if (error) {
    if (error.code === '23505') throw new Error("You have already reviewed this product.");
    throw error;
  }
  return data;
};