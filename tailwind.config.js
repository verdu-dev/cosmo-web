/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'petrol': {
          '50': 'oklch(97.5% 0.005 198.5)',
          '100': 'oklch(93.1% 0.013 198.2)',
          '200': 'oklch(86.5% 0.024 198.8)',
          '300': 'oklch(77.6% 0.041 199.6)',
          '400': 'oklch(65.1% 0.059 203.1)',
          '500': 'oklch(55.8% 0.060 206.8)',
          '600': 'oklch(48.5% 0.050 209.6)',
          '700': 'oklch(42.8% 0.040 212.1)',
          '800': 'oklch(37.1% 0.031 214.3)',
          '900': 'oklch(33.1% 0.024 214.7)',
          '950': 'oklch(24.3% 0.022 216.5)',
        },
        'terracotta': {
          '50': 'oklch(97.2% 0.012 65.5)',
          '100': 'oklch(93.1% 0.029 64.1)',
          '200': 'oklch(85.3% 0.054 61.3)',
          '300': 'oklch(73.5% 0.106 58.7)',
          '400': 'oklch(66.5% 0.134 51.1)',
          '500': 'oklch(59.3% 0.155 45.3)',
          '600': 'oklch(53.9% 0.151 40.5)',
          '700': 'oklch(45.5% 0.126 36.5)',
          '800': 'oklch(38.2% 0.103 33.4)',
          '900': 'oklch(32.8% 0.086 31.8)',
          '950': 'oklch(20.4% 0.058 30.6)',
        },
        'dark': '#333333',
        'light': '#F9F9F9',
      },
      fontFamily: {
        heading: ['DM Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
      },
      lineHeight: {
        'body': '1.5',
        'heading': '1.2',
      },
    },
  },
  plugins: [],
};
