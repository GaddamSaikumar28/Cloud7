import { supabase } from '../client/supabaseClient';

export const adminProcessApi = {

  // 1. Get Full Configuration (Section + Steps)
  getData: async () => {
    // A. Get Section
    const { data: section, error: secError } = await supabase
      .from('process_sections')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (secError) throw secError;

    // B. Get Steps (only if section exists)
    let steps = [];
    if (section) {
      const { data: stepsData, error: stepError } = await supabase
        .from('process_steps')
        .select('*')
        .eq('section_id', section.id)
        .order('sort_order', { ascending: true });
      
      if (stepError) throw stepError;
      steps = stepsData;
    }

    return {
      section: section || { heading: '', subheading: '', is_active: true },
      steps: steps
    };
  },

  // 2. Save Section (Upsert)
  saveSection: async (sectionData) => {
    const payload = { ...sectionData, updated_at: new Date() };
    if (!payload.id) delete payload.id;

    const { data, error } = await supabase
      .from('process_sections')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 3. Save Step (Upsert)
  saveStep: async (stepData) => {
    // Calculate sort order if new
    if (!stepData.id) {
        // We handle sort order logic in UI or let DB default, 
        // but explicit is better. logic handled in UI for simplicity here.
    }

    const payload = { ...stepData };
    if (!payload.id) delete payload.id;

    const { data, error } = await supabase
      .from('process_steps')
      .upsert(payload)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // 4. Delete Step
  deleteStep: async (id) => {
    const { error } = await supabase.from('process_steps').delete().eq('id', id);
    if (error) throw error;
  },

  // 5. Reorder Steps (Batch Update)
  reorderSteps: async (steps) => {
    const updates = steps.map((step, index) => ({
      id: step.id,
      section_id: step.section_id, // Required for upsert constraint usually
      icon_name: step.icon_name,   // Supabase often needs required fields in upsert
      label: step.label,
      sort_order: index + 1
    }));

    const { error } = await supabase.from('process_steps').upsert(updates);
    if (error) throw error;
  }
};