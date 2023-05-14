/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d1d7db',
        disabled: '#B4B9BD',
        secondary: '#111b21',
        'dialog-bg': '#222e35',
        'secondary-light': '#2a3942',
        error: '#bd3131',
      },
      backgroundImage: {
        'bg-image': 'url(src/assets/bg-main.png)',
      },
    },
  },
  plugins: [],
}
