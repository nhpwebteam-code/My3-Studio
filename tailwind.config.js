/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#E59A3D',
          light: '#F3B462',
          dark: '#C87F28',
          50: '#2A1F14',
          100: '#3D2D1B',
          500: '#E59A3D',
          600: '#C87F28',
        },
        gold: {
          DEFAULT: '#E59A3D',
          light: '#F3B462',
          dark: '#C87F28',
          50: '#2A1F14',
          100: '#3D2D1B',
        },
        charcoal: {
          DEFAULT: '#1E2024',
          50: '#F7F7F8',
          100: '#EEEEF0',
          200: '#D9DBDF',
          300: '#B5B8C0',
          400: '#838793',
          500: '#5F636F',
          600: '#42454E',
          700: '#2F3239',
          800: '#23252B',
          900: '#191A1E',
          950: '#111215',
        },
        orange: {
          50: '#FFF7ED',
          500: '#F97316',
          600: '#EA580C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Montserrat"', '"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'spin-slow': 'spin 18s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
