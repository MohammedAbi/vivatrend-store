/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Gilda Display",
      secondary: "Barlow",
      tertiary: "Barlow Condensed",
    },
    extend: {
      colors: {
        primary: "#0a0a0a",
        accent: {
          DEFAULT: "#8c682b",
          hover: "7a5c33",
        },
      },
    },
  },
  plugins: [],
};
