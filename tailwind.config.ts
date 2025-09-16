import type { Config } from 'tailwindcss';

// Basic Tailwind configuration.  If you need to extend your design
// token or add plugins, adjust this file.  The `content` array tells
// Tailwind where to look for class names.  We include index.html and
// all files under src/.
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'spice-orange': '#f97316',
        'spice-red': '#f43f5e'
      }
    }
  },
  plugins: []
} satisfies Config;