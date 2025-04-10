/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      // colors: {
      //   lightBg: "#ffffff",
      //   darkBg: "#111827", // Or any dark tone you prefer
      //   lightText: "#000000",
      //   darkText: "#f9fafb",
      // },
    },
  },
  plugins: [],
};
