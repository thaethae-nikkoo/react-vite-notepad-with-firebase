const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "node_modules/flowbite-react/lib/esm",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: colors.sky[600],
        seconday: colors.sky[950],
        dbg: colors.gray[950],
        dbodybg: colors.gray[900],
        cardbg: "#08122b",
      },
    },
  },
  plugins: [],
};
