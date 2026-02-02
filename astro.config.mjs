import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [tailwind(), sanity({
      projectId: 'vs74rvxu',
      dataset: 'production',
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: '/studio'
    }), react()],
  output: 'static',
});