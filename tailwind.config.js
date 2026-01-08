/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          50: '#e9f0ff',
          100: '#d7e4ff',
          200: '#b0c8ff',
          300: '#89acff',
          400: '#628fff',
          500: '#3b73ff',
          600: '#2563eb',
          700: '#1f4fb8',
          800: '#183c85',
          900: '#102952',
        },
        surface: {
          light: '#f6f8fb',
          dark: '#0a0f1c',
          card: '#0f172a',
          border: '#1f2937',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(59, 115, 255, 0.25)',
        card: '0 14px 50px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

