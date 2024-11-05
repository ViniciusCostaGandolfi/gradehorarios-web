/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#1351b4',   
          600: '#11469b',   
          700: '#0e397e',   
          800: '#0f3775',
          900: '#0c2e64',
          A100: '#82b1ff',
          A200: '#448aff',
          A400: '#2979ff',
          A700: '#2962ff',
        },
        accent : {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#f0c442',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
          A100: '#ffe57f',
          A200: '#ffd740',
          A400: '#ffc400',
          A700: '#ffab00',
        }
      }
    },
  },
  plugins: [],
}