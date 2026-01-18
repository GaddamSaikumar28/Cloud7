
import { supabase } from '../client/supabaseClient';

export const adminLabApi = {
  
  // 1. Fetch Hierarchy for Admin View (Active Products -> Active Variants -> Active Options)
  getVariantReports: async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id, name, cover_image_url, is_active,
        product_variants (
          id, sku, price, is_active,
          batch_number, tested_at, lab_report_url, image_url,
          variant_selection_map (
            option:variant_options (name, is_active, type:variant_types(name))
          )
        )
      `)
      .eq('is_active', true) // Filter 1: Only Active Products
      .order('name');

    if (error) throw error;

    // Flatten for easier UI consumption
    return data.map(product => ({
      ...product,
      variants: product.product_variants
        // Filter 2: Only Active Variants
        ?.filter(v => v.is_active === true) 
        .map(v => {
          
          // Filter 3: Construct Name using only Active Options
          const variantName = v.variant_selection_map
              ?.filter(m => m.option?.is_active === true) // Check if option is active
              ?.sort((a, b) => a.option?.type?.name.localeCompare(b.option?.type?.name))
              .map(m => m.option?.name)
              .join(' + ') || 'Standard';

          return {
            id: v.id,
            sku: v.sku,
            name: variantName,
            batch_number: v.batch_number,
            tested_at: v.tested_at,
            lab_report_url: v.lab_report_url,
            image_url: v.image_url
          };
        }) || []
    }));
  },

  // 2. Upload File to Storage
  uploadReportFile: async (file) => {
    const fileExt = file.name.split('.').pop();
    // Sanitize filename and add timestamp to prevent collisions
    const fileName = `COA_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('Cloud7') // <--- Using the specified bucket
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    // Get Public URL
    const { data } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  // 3. Update DB Record (Add/Edit)
  updateVariantReport: async (variantId, reportData) => {
    // reportData: { batch_number, tested_at, lab_report_url }
    const { data, error } = await supabase
      .from('product_variants')
      .update(reportData)
      .eq('id', variantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  uploadVariantImage: async (file) => {
    const fileExt = file.name.split('.').pop();
    // distinct prefix VAR_IMG
    const fileName = `VAR_IMG_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`; 
    
    const { error: uploadError } = await supabase.storage
      .from('Cloud7') 
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(fileName);

    return data.publicUrl;
  },

  // 4. Delete Report (Clear columns)
  deleteVariantReport: async (variantId) => {
    // We strictly clear the metadata. 
    // Optionally, you could delete the file from storage too, but keeping it for audit is often safer.
    const { data, error } = await supabase
      .from('product_variants')
      .update({
        batch_number: null,
        tested_at: null,
        lab_report_url: null
      })
      .eq('id', variantId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};