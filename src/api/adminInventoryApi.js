
import { supabase } from '../client/supabaseClient';

export const getInventory = async () => {
  // 1. Fetch Variants
  // We filter by is_active: true to ensure we only manage stock for live items.
  const { data, error } = await supabase
    .from('product_variants')
    .select(`
      id, sku, price, stock_quantity, is_active,
      product:products (
        id, name, cover_image_url, is_active
      ),
      variant_selection_map (
        option:variant_options (name)
      )
    `)
    .eq('is_active', true) // Only Active Variants
    .order('stock_quantity', { ascending: true }); // Low stock first

  if (error) throw error;

  // 2. Filter & Flatten
  // Edge Case: If a parent product was archived but the variant flag wasn't updated,
  // we filter it out here to be safe.
  const cleanData = data
    .filter(v => v.product && v.product.is_active === true) 
    .map(v => {
      // Construct readable name like "Mint / 10 Count"
      const variantName = v.variant_selection_map
        ?.map(map => map.option?.name)
        .join(' / ') || 'Standard';

      return {
        id: v.id,
        sku: v.sku || 'No SKU',
        price: v.price,
        stock: v.stock_quantity,
        productName: v.product.name,
        productImage: v.product.cover_image_url,
        variantName: variantName
      };
    });

  return cleanData;
};

export const updateSku = async (id, updates) => {
  // Validation: Ensure stock isn't negative
  if (updates.stock_quantity !== undefined && updates.stock_quantity < 0) {
    throw new Error("Stock cannot be negative.");
  }

  const { data, error } = await supabase
    .from('product_variants')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};