// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {50:'#f5fbff',100:'#e6f4ff',200:'#cde8ff',300:'#a9d5ff',400:'#7ebdff',500:'#519fff',600:'#347fff',700:'#2b66d6',800:'#214ea8',900:'#1a3d83'}
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Source Sans 3"', 'ui-sans-serif','system-ui']
      }
    }
  },
  plugins: [],
};
