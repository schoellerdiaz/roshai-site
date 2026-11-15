import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://roshai.co',
  // Project Pages URL is schoellerdiaz.github.io/roshai-site, so assets
  // need the /roshai-site base. Remove this base when the site moves to
  // the roshai.co root domain.
  base: '/roshai-site',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'auto' },
});
