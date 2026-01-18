

import { supabase } from '../client/supabaseClient';


export const getAdminProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(name),
      product_variants(price, stock_quantity, is_active)
    `)
    .eq('is_active', true) // <--- FILTER: Only show active products
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getProductForEdit = async (slug) => {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      product_variants (
        id, sku, price, stock_quantity, is_active,
        variant_selection_map (
           option:variant_options (id, name, type_id)
        )
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) throw error;

  // PRODUCTION FIX: Hide "Soft Deleted" variants from the UI
  if (data.product_variants) {
    data.product_variants = data.product_variants.filter(v => v.is_active !== false);
  }

  return data;
};

export const getConfigData = async () => {
  // const [cats, types, options] = await Promise.all([
  //   supabase.from('categories').select('*'),
  //   supabase.from('variant_types').select('*'),
  //   supabase.from('variant_options').select('*')
  // ]);
  const [cats, types, options] = await Promise.all([
    supabase.from('categories').select('*'),
    
    supabase.from('variant_types')
      .select('*')
      .eq('is_active', true)
      .order('id'),
      
    supabase.from('variant_options')
      .select('*')
      .eq('is_active', true)
      .order('id')
  ]);

  return {
    categories: cats.data || [],
    variantTypes: types.data || [],
    variantOptions: options.data || []
  };
};

// --- WRITE DATA ---

export const uploadProductImage = async (file) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('Cloud7')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from('Cloud7').getPublicUrl(filePath);
  return data.publicUrl;
};

export const saveProduct = async (productData, variantsData) => {
  // 1. Upsert Product
  const { data: product, error: prodError } = await supabase
    .from('products')
    .upsert(productData)
    .select()
    .single();

  if (prodError) throw prodError;

  // --- SOFT DELETE SYNCHRONIZATION ---
  
  // A. Fetch all existing variants (Active AND Inactive) to map IDs
  const { data: existingDbVariants } = await supabase
    .from('product_variants')
    .select('id, sku')
    .eq('product_id', product.id);

  const dbVariantMap = existingDbVariants ? existingDbVariants.reduce((acc, v) => ({...acc, [v.id]: v}), {}) : {};
  
  // B. Get IDs currently in the Form
  const formVariantIds = variantsData
    .filter(v => v.id) 
    .map(v => v.id);

  // C. Detect deleted variants (In DB but NOT in Form)
  const idsToSoftDelete = Object.keys(dbVariantMap).filter(id => !formVariantIds.includes(id));

  // D. Soft Delete Logic
  if (idsToSoftDelete.length > 0) {
    for (const id of idsToSoftDelete) {
        const oldSku = dbVariantMap[id]?.sku || 'NOSKU';
        // Rename SKU so it can be reused by a new active variant
        const archivedSku = `${oldSku}_ARCHIVED_${Date.now()}`; 
        
        await supabase
          .from('product_variants')
          .update({ 
            is_active: false,
            sku: archivedSku 
          })
          .eq('id', id);
    }
  }
  
  // --- UPSERT ACTIVE VARIANTS ---

  if (variantsData && variantsData.length > 0) {
    for (const v of variantsData) {
      const variantPayload = {
        product_id: product.id,
        sku: v.sku,
        price: v.price,
        stock_quantity: v.stock_quantity,
        is_active: true // Explicitly mark as active
      };
      
      if (v.id) variantPayload.id = v.id;

      const { data: savedVariant, error: varError } = await supabase
        .from('product_variants')
        .upsert(variantPayload)
        .select()
        .single();

      if (varError) throw varError;

      // Link Options
      if (v.optionIds && v.optionIds.length > 0) {
         // Safe to delete mapping if it's just a lookup table, 
         // BUT if order_items rely on this map, we might need soft delete here too.
         // For now, assuming map is just for UI lookup, Hard Delete/Re-insert is usually OK 
         // unless you query history using this map. 
         // Safest approach: Delete only for this variant ID.
         await supabase.from('variant_selection_map').delete().eq('variant_id', savedVariant.id);
         
         const mapPayload = v.optionIds.map(optId => ({
            variant_id: savedVariant.id,
            option_id: optId
         }));
         
         await supabase.from('variant_selection_map').insert(mapPayload);
      }
    }
  }

  return product;
};

export const deleteProduct = async (id) => {
  // 1. Get the current slug so we can rename it
  const { data: current, error: fetchError } = await supabase
    .from('products')
    .select('slug')
    .eq('id', id)
    .single();
    
  if (fetchError) throw fetchError;

  // 2. Archive the Product
  // We rename the slug to free it up. E.g. "blue-razz" -> "blue-razz_ARCHIVED_173849..."
  // This allows you to immediately create a NEW product with the slug "blue-razz".
  const archivedSlug = `${current.slug}_ARCHIVED_${Date.now()}`;

  const { error: productError } = await supabase
    .from('products')
    .update({ 
      is_active: false, 
      slug: archivedSlug 
    })
    .eq('id', id);

  if (productError) throw productError;

  // 3. Archive all associated Variants (Cleanup)
  // We also rename their SKUs to free them up
  const { data: variants } = await supabase
    .from('product_variants')
    .select('id, sku')
    .eq('product_id', id);

  if (variants && variants.length > 0) {
    for (const v of variants) {
      const archivedSku = `${v.sku}_ARCHIVED_${Date.now()}`;
      await supabase
        .from('product_variants')
        .update({ is_active: false, sku: archivedSku })
        .eq('id', v.id);
    }
  }
};