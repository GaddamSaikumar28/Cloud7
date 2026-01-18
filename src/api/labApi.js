import { supabase } from '../client/supabaseClient';

export const getLabReportData = async () => {
  // 1. Fetch Active Products with Active Variants
  const { data, error } = await supabase
    .from('products')
    .select(`
      id, 
      name, 
      cover_image_url, 
      is_active,
      product_variants (
        id, 
        sku, 
        batch_number, 
        lab_report_url, 
        tested_at,
        is_active,
        image_url,
        variant_selection_map (
          option:variant_options (name, type:variant_types(name))
        )
      )
    `)
    .eq('is_active', true)
    .order('name');

  if (error) throw error;
  const allReports = [];
  // 2. Process and Flatten Data
  // const processed = data.map(product => {
  //   // Filter only active variants
  //   const activeVariants = product.product_variants?.filter(v => v.is_active) || [];
    
  //   // Format Variants for the Table
  //   const reports = activeVariants.map(v => {
  //       // Create a name like "Mint / 20 Count"
  //       // We sort by type name (e.g., Flavor before Size) to keep consistency
  //       const attributes = v.variant_selection_map
  //           ?.sort((a, b) => a.option?.type?.name.localeCompare(b.option?.type?.name))
  //           .map(m => m.option?.name)
  //           .join(' + ') || 'Standard';

  //       return {
  //           id: v.id,
  //           name: attributes,
  //           batch: v.batch_number || 'Pending',
  //           date: v.tested_at || null,
  //           url: v.lab_report_url,
  //           sku: v.sku
  //       };
  //   });

  //   return {
  //       id: product.id,
  //       name: product.name,
  //       image: product.cover_image_url,
  //       reports: reports
  //   };
  // }).filter(p => p.reports.length > 0); // Hide products with no active variants
  data.forEach(product => {
    // Filter only active variants
    const activeVariants = product.product_variants?.filter(v => v.is_active) || [];
    
    activeVariants.forEach(v => {
        // Create a name like "Mint / 20 Count"
        const attributes = v.variant_selection_map
            ?.sort((a, b) => a.option?.type?.name.localeCompare(b.option?.type?.name))
            .map(m => m.option?.name)
            .join(' + ') || 'Standard';

        allReports.push({
            id: v.id,
            productId: product.id,
            productName: product.name,
            variantName: attributes,
            // Use Variant Specific Image -> Fallback to Product Cover -> Fallback to Placeholder
            image: v.image_url || product.cover_image_url || "https://placehold.co/400x600/png", 
            batch: v.batch_number || 'Pending',
            date: v.tested_at || null,
            url: v.lab_report_url,
            sku: v.sku
        });
    });
  });
  return allReports;
};