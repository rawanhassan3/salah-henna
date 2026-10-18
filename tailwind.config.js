/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greige: '#D8D3CA',
        ivory: '#F4F0E8',
        taupe: '#8C7B69',
        gold: '#B89B5E',
        'gold-light': '#D4BB84',
        'gold-dark': '#8A7040',
        paper: '#F0EBE0',
      },
      fontFamily: {
        aref: ['"Aref Ruqaa"', 'serif'],
        amiri: ['Amiri', 'serif'],
        reem: ['"Reem Kufi"', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
    },
  },
  plugins: [],
}
