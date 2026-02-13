
import { supabase } from "../client/supabaseClient";
export const marqueeApi = {
  // 1. FETCH ALL PHOTOS
  getPhotos: async () => {
    const { data, error } = await supabase
      .from('photo_marquee')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching photos:', error);
      throw error;
    }
    return data;
  },

  // 2. UPLOAD & ADD PHOTO
  addPhoto: async (file, row, altText = '') => {
    // A. Generate unique file path
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    // Store in a 'marquee' folder within the Cloud7 bucket to keep things organized
    const filePath = `marquee/${fileName}`;

    // B. Upload to Supabase Storage Bucket ('Cloud7')
    const { error: uploadError } = await supabase.storage
      .from('Cloud7')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // C. Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('Cloud7')
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData.publicUrl;

    // D. Insert into Database Table
    const { data, error: dbError } = await supabase
      .from('photo_marquee')
      .insert([
        {
          image_url: publicUrl,
          storage_path: filePath,
          marquee_row: parseInt(row),
          alt_text: altText
        }
      ])
      .select()
      .single();

    if (dbError) throw dbError;
    return data;
  },

  // 3. DELETE PHOTO
  deletePhoto: async (id, storagePath) => {
    // A. Delete from Storage Bucket first
    if (storagePath) {
      const { error: storageError } = await supabase.storage
        .from('Cloud7')
        .remove([storagePath]);
      
      if (storageError) console.error("Error cleaning up storage:", storageError);
    }

    // B. Delete from Database
    const { error } = await supabase
      .from('photo_marquee')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};