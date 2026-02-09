import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

import sanity from '@sanity/astro';
import react from '@astrojs/react';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? 'vs74rvxu';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  integrations: [tailwind(), sanity({
      projectId,
      dataset,
      useCdn: true, // See note on using the CDN
      apiVersion: "2025-01-28", // insert the current date to access the latest version of the API
      studioBasePath: '/studio',
      stega: {
        studioUrl: '/studio',
      }
    }), react()],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Isolate Sanity Studio to only load on /studio routes
            if (id.includes('sanity') && (id.includes('studio') || id.includes('@sanity/ui'))) {
              return 'studio-component';
            }
          }
        }
      }
    }
  }
});
