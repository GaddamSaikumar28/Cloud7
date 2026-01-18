// import { supabase } from '../client/supabaseClient';

// // --- READ ---
// export const getVariantConfig = async () => {
//   // Fetch Types with their Options nested
//   const { data, error } = await supabase
//     .from('variant_types')
//     .select(`
//       *,
//       options:variant_options(*)
//     `)
//     .order('id', { ascending: true });

//   if (error) throw error;
  
//   // Sort options by ID or Name within the types
//   const sorted = data.map(type => ({
//     ...type,
//     options: type.options?.sort((a, b) => a.id - b.id) || []
//   }));

//   return sorted;
// };

// // --- VARIANT TYPES (The Parent: e.g. "Flavor", "Size") ---

// export const createVariantType = async (name, displayStyle, description) => {
//   const { data, error } = await supabase
//     .from('variant_types')
//     .insert([{ name, display_style: displayStyle, description }])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const deleteVariantType = async (id) => {
//   // Note: Database Cascade should handle options, but we check logic here if needed
//   const { error } = await supabase
//     .from('variant_types')
//     .delete()
//     .eq('id', id);

//   if (error) throw error;
// };

// // --- VARIANT OPTIONS (The Child: e.g. "Mint", "Large") ---

// export const createVariantOption = async (typeId, name, metadata = {}) => {
//   const { data, error } = await supabase
//     .from('variant_options')
//     .insert([{ type_id: typeId, name, metadata }])
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const updateVariantOption = async (id, name, metadata) => {
//   const { data, error } = await supabase
//     .from('variant_options')
//     .update({ name, metadata })
//     .eq('id', id)
//     .select()
//     .single();

//   if (error) throw error;
//   return data;
// };

// export const deleteVariantOption = async (id) => {
//   const { error } = await supabase
//     .from('variant_options')
//     .delete()
//     .eq('id', id);

//   if (error) throw error;
// };
import { supabase } from '../client/supabaseClient';

// --- READ ---
export const getVariantConfig = async () => {
  // Fetch Types with their Options nested
  // We fetch ALL (active and inactive) for the Admin panel so they can be managed
  const { data, error } = await supabase
    .from('variant_types')
    .select(`
      *,
      options:variant_options(*)
    `)
    .order('is_active', { ascending: false }) // Active first
    .order('id', { ascending: true });

  if (error) throw error;
  
  // Sort options: Active first, then by ID
  const sorted = data.map(type => ({
    ...type,
    options: type.options?.sort((a, b) => {
        // Sort by Active status first
        if (a.is_active === b.is_active) {
            return a.id - b.id;
        }
        return a.is_active ? -1 : 1;
    }) || []
  }));

  return sorted;
};

// --- VARIANT TYPES (The Parent: e.g. "Flavor", "Size") ---

export const createVariantType = async (name, displayStyle, description) => {
  const { data, error } = await supabase
    .from('variant_types')
    .insert([{ 
        name, 
        display_style: displayStyle, 
        description,
        is_active: true 
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Toggle Type Status (Soft Delete / Restore)
export const toggleVariantTypeStatus = async (id, currentStatus) => {
  const { data, error } = await supabase
    .from('variant_types')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Hard Delete (Only allows if no dependent data exists)
export const deleteVariantType = async (id) => {
  const { error } = await supabase
    .from('variant_types')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// --- VARIANT OPTIONS (The Child: e.g. "Mint", "Large") ---

export const createVariantOption = async (typeId, name, metadata = {}) => {
  const { data, error } = await supabase
    .from('variant_options')
    .insert([{ 
        type_id: typeId, 
        name, 
        metadata,
        is_active: true 
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Toggle Option Status (Soft Delete / Restore)
export const toggleVariantOptionStatus = async (id, currentStatus) => {
  const { data, error } = await supabase
    .from('variant_options')
    .update({ is_active: !currentStatus })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update Option Details (Name/Color)
export const updateVariantOption = async (id, name, metadata) => {
  const { data, error } = await supabase
    .from('variant_options')
    .update({ name, metadata })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Hard Delete Option
export const deleteVariantOption = async (id) => {
  const { error } = await supabase
    .from('variant_options')
    .delete()
    .eq('id', id);

  if (error) throw error;
};