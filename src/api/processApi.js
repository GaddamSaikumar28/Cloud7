import { supabase } from '../client/supabaseClient';

export const processApi = {
  getProcessData: async () => {
    // 1. Fetch Section Info
    const { data: sectionData, error: sectionError } = await supabase
      .from('process_sections')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .maybeSingle();

    if (sectionError || !sectionData) {
      console.error("Error fetching process section:", sectionError);
      return null;
    }

    // 2. Fetch Steps for this section
    const { data: stepsData, error: stepsError } = await supabase
      .from('process_steps')
      .select('*')
      .eq('section_id', sectionData.id)
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (stepsError) console.error("Error fetching steps:", stepsError);

    return {
      ...sectionData,
      steps: stepsData || []
    };
  }
};