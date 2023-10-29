/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        glass: "#1e1e2d80",
      },
    },
  },
  plugins: [require("daisyui")],
};
