import sharp from 'sharp';

export const convertSvg = async (svgString: string) => {
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
  return buffer.toString('base64');
};
