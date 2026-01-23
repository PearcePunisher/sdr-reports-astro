/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00A4B8',
          50: '#E6F7FA',
          100: '#CCF0F5',
          200: '#99E0EB',
          300: '#66D1E0',
          400: '#33C1D6',
          500: '#00A4B8',
          600: '#008394',
          700: '#00626F',
          800: '#00424A',
          900: '#002125',
        },
      },
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.slate[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': '#00A4B8',
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.slate[400]'),
            '--tw-prose-bullets': theme('colors.slate[500]'),
            '--tw-prose-quotes': theme('colors.slate[100]'),
            '--tw-prose-code': theme('colors.white'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
