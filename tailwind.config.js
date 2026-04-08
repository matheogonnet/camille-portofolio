/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a1a',
          hover: '#4a4a4a',
        },
        'cream': '#FAFAFA',
        'text-dark': '#111827',
        'accent-red': '#E63946',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'script': ['Playfair Display', 'serif'], // Vous pouvez changer pour une vraie font script si souhaité
        'sans': ['system-ui', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-4deg)' },
          '75%': { transform: 'rotate(4deg)' }
        },
        'panel-reveal': {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'hero-float-1': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(34px, -28px) scale(1.07) rotate(3.5deg)' },
          '50%': { transform: 'translate(-22px, 18px) scale(0.94) rotate(-2deg)' },
          '75%': { transform: 'translate(26px, -20px) scale(1.05) rotate(2.5deg)' },
        },
        'hero-float-2': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(-30px, 24px) scale(0.95) rotate(-4deg)' },
          '50%': { transform: 'translate(26px, -20px) scale(1.08) rotate(2.5deg)' },
          '75%': { transform: 'translate(-18px, 22px) scale(0.96) rotate(-3deg)' },
        },
        'hero-float-3': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(22px, 20px) scale(1.06) rotate(2deg)' },
          '50%': { transform: 'translate(-32px, -14px) scale(0.97) rotate(-3.5deg)' },
          '75%': { transform: 'translate(18px, 26px) scale(1.04) rotate(2deg)' },
        },
        'hero-float-4': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(-26px, -22px) scale(0.96) rotate(-2.5deg)' },
          '50%': { transform: 'translate(20px, 28px) scale(1.07) rotate(4deg)' },
          '75%': { transform: 'translate(-30px, -16px) scale(0.95) rotate(-2deg)' },
        },
        'hero-float-5': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '25%': { transform: 'translate(18px, 16px) scale(1.05) rotate(3deg)' },
          '50%': { transform: 'translate(-28px, -22px) scale(0.96) rotate(-2deg)' },
          '75%': { transform: 'translate(24px, 18px) scale(1.06) rotate(3.5deg)' },
        },
      },
      animation: {
        wave: 'wave 0.5s ease-in-out',
        'panel-reveal': 'panel-reveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hero-float-1': 'hero-float-1 18s ease-in-out infinite',
        'hero-float-2': 'hero-float-2 21s ease-in-out infinite',
        'hero-float-3': 'hero-float-3 17s ease-in-out infinite',
        'hero-float-4': 'hero-float-4 22s ease-in-out infinite',
        'hero-float-5': 'hero-float-5 16s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}