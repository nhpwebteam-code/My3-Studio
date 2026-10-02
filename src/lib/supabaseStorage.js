import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Upload an image file or blob to Supabase Storage ('studio-photos' bucket)
 * Returns the permanent public CDN URL of the uploaded image.
 */
export async function uploadImageToSupabase(file, folder = 'gallery') {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured.');
  }

  const fileExt = file.name ? file.name.split('.').pop() : 'jpg';
  const cleanExt = (fileExt || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${cleanExt}`;

  // Upload to Supabase Storage bucket 'studio-photos'
  const { data, error: uploadError } = await supabase.storage
    .from('studio-photos')
    .upload(fileName, file, {
      cacheControl: '31536000',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (uploadError) {
    console.error('Supabase storage upload error:', uploadError);
    throw uploadError;
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('studio-photos')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}
