/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      cblack: "#000501ff",
      cgray: "#73ab84ff",
      cmid: "#99d19cff",
      clightmid: "#79c7c5ff",
      clight: "#ade1e5ff",
      cdark: "#2F2F2F",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  plugins: [],
};
