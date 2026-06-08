/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4d0066",   // dark purple
        secondary: "#ff66cc", // pinkish
      },
      // tailwind.config.js

      keyframes: {
        pulsePurple: {
          '0%, 100%': { boxShadow: '0 0 40px #c084fc' },
          '50%': { boxShadow: '0 0 60px #d8b4fe' },
        },
        fillTank: {
          "0%": { transform: "scaleY(0)" },
          "50%": { transform: "scaleY(1)" },
          "100%": { transform: "scaleY(0)" },
        },
      },
      animation: {
        pulsePurple: 'pulsePurple 80s ease-in-out infinite',
        fillTank: "fillTank 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
