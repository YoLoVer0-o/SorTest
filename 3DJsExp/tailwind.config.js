/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "Noto-Sans": ["Noto Sans Thai Variable", "Noto Sans", "sans-serif"],
    },
    extend: {
      gridTemplateRows: {
        7: "repeat(8, minmax(0, 1fr))",
        8: "repeat(8, minmax(0, 1fr))",
      },
      gridRowStart: {
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        13: "13",
      },
    },
  },
  plugins: [],
  prefix: "tw-",
};
