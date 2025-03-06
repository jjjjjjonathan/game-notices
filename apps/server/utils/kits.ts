import sharp from 'sharp';

export const convertSvgToPng = async (svgString: string) => {
  const buffer = await sharp(Buffer.from(svgString))
    .png({ quality: 80 })
    .toBuffer();

  return buffer.toString('base64');
};
