import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { decode } from 'base64-arraybuffer';
import sharp from 'sharp';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_API_KEY || '',
  {
    global: {
      headers: {
        Authorization: process.env.SUPABASE_SERVICE_KEY || '',
      },
    },
  },
);

export const uploadKit = async (svgString: string, name: string) => {
  const buffer = await sharp(Buffer.from(svgString))
    .jpeg({
      quality: 80,
    })
    .flatten({
      background: '#fff',
    })
    .resize({
      height: 66,
      width: 42,
    })
    .toBuffer();
  const base64 = buffer.toString('base64');
  const { data, error } = await supabase.storage
    .from('kits')
    .upload(`${name}.jpg`, decode(base64), {
      contentType: 'image/jpeg',
    });

  return `${process.env.SUPABASE_URL}/storage/v1/object/public/kits/${name}.jpg`;
};
