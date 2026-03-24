import satori from 'satori';
import sharp from 'sharp';

// Cached per build process — fetched once per weight, not once per image
const fontCache = new Map<number, ArrayBuffer>();

async function loadFont(weight: 400 | 700): Promise<ArrayBuffer> {
  if (fontCache.has(weight)) return fontCache.get(weight)!;

  // fontsource v4 ships woff (satori-compatible); pinned for stability
  const url = `https://cdn.jsdelivr.net/npm/@fontsource/inter@4.5.15/files/inter-latin-${weight}-normal.woff`;
  const data = await fetch(url).then((r) => r.arrayBuffer());
  fontCache.set(weight, data);
  return data;
}

export interface OgOptions {
  title: string;
  description?: string;
  collection: string;
}

export async function generateOgImage({ title, description, collection }: OgOptions): Promise<Buffer> {
  const [regular, bold] = await Promise.all([loadFont(400), loadFont(700)]);

  const displayTitle = title.length > 72 ? title.slice(0, 72) + '…' : title;
  const displayDesc = description
    ? description.length > 120
      ? description.slice(0, 120) + '…'
      : description
    : null;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: '#0c0a09',
          padding: '64px',
          fontFamily: 'Inter',
        },
        children: [
          // Collection badge
          {
            type: 'div',
            props: {
              style: { display: 'flex' },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      backgroundColor: '#1c1917',
                      color: '#a8a29e',
                      border: '1px solid #292524',
                      fontSize: '15px',
                      fontWeight: 400,
                      padding: '4px 14px',
                      borderRadius: '6px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    },
                    children: collection,
                  },
                },
              ],
            },
          },
          // Title + description
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '16px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: displayTitle.length > 50 ? '52px' : '64px',
                      fontWeight: 700,
                      color: '#fafaf9',
                      lineHeight: 1.1,
                    },
                    children: displayTitle,
                  },
                },
                displayDesc && {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      fontWeight: 400,
                      color: '#78716c',
                      lineHeight: 1.5,
                    },
                    children: displayDesc,
                  },
                },
              ].filter(Boolean) as object[],
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid #1c1917',
                paddingTop: '24px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      fontWeight: 400,
                      color: '#44403c',
                    },
                    children: 'juststeveking.com',
                  },
                },
              ],
            },
          },
        ],
      },
    } as Parameters<typeof satori>[0],
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    },
  );

  return sharp(Buffer.from(svg)).webp({ quality: 90 }).toBuffer();
}
