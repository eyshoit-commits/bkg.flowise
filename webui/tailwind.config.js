/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00ffe5',
          magenta: '#ff00ff'
        }
      },
      boxShadow: {
        cyber: '0 0 20px rgba(0,255,229,0.5), 0 0 30px rgba(255,0,255,0.3)'
      }
    }
  },
  plugins: []
}
