/** @type {import('tailwindcss').Config} */

export default {
  corePlugins: {
    preflight: false
  },
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      centered: true,
      padding: '1rem'
    },
    extend: {}
  },
  plugins: []
};
