/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
     
  animation: {
    shine: 'shine 1.5s ease-in-out',
  },
      colors: {
        primary: "#FAB62D",
        secondary: "#781128",
        background: "#FBF4E4",
        textPrimary: "#363126",
        textSecondary: "#86837E",
      },
    },
  },
  plugins: [],
};
