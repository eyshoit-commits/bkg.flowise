/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00f0ff',
        magenta: '#ff00c8',
        slate: '#0b1021'
      }
    }
  },
  plugins: []
};
