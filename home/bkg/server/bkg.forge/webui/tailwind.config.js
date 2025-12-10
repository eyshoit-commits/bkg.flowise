/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00f6ff',
          magenta: '#ff009f',
          purple: '#7b5cff'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};
