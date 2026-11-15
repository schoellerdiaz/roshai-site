// One-off generator: favicons and Open Graph image from the supplied PNG marks.
// Run with: node scripts/make-assets.mjs
import sharp from 'sharp';
const src = 'public/brand/roshai-mark-solid-on-violet.png';
for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-512.png', 512]]) {
  await sharp(src).resize(size, size).png({ compressionLevel: 9 }).toFile(`public/${name}`);
}
const W = 1200, H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<rect width="${W}" height="${H}" fill="#2d0196"/>
<text x="460" y="250" font-family="Saira, Arial Black, DejaVu Sans, sans-serif" font-weight="800" font-size="62" fill="#10ffe2">Machines carry the volume.</text>
<text x="460" y="330" font-family="Saira, Arial Black, DejaVu Sans, sans-serif" font-weight="800" font-size="62" fill="#10ffe2">Humans keep the judgment.</text>
<text x="460" y="420" font-family="IBM Plex Mono, DejaVu Sans Mono, monospace" font-size="24" letter-spacing="3" fill="#c9c3ef">ROSHAI  ·  HUMAN-AUGMENTED INTELLIGENCE</text>
</svg>`;
const mark = await sharp(src).resize(320, 320).toBuffer();
await sharp(Buffer.from(svg)).composite([{ input: mark, left: 96, top: 155 }]).png({ compressionLevel: 9 }).toFile('public/og.png');
console.log('assets written');
