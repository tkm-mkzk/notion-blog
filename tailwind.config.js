/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'regal-blue': 'rgb(12, 74, 110)',
        skin: 'rgb(254, 215, 170)',
        default: '#f3f3f3',
      },
      fontFamily: {
        montserrat: ['Montserrat'],
        amaticsc: ['Amatic SC'],
        baloo: ['Baloo'],
      },
    },
    screens: {
      sp: { max: '640px' },
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // TailWindCSSのResetCSSとMantineの競合を防ぐために無効化
  },
}
