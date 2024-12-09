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
    },
  },
  plugins: [],
}