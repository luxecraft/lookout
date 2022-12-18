/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    ".rotate-y-30": {
      transform: "rotateY(30deg)",
    },
    ".rotate-y-45": {
      transform: "rotateY(45deg)",
    },
    ".rotate-y-60": {
      transform: "rotateY(60deg)",
    },
    ".rotate-y-90": {
      transform: "rotateY(90deg)",
    },
    ".rotate-y-180": {
      transform: "rotateY(180deg)",
    },
  });
});

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-sky-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-pink-500",
    "bg-fuchsia-500",
    "bg-violet-500",
    "bg-indigo-500",
    "bg-blue-500",
  ],
  theme: {
    extend: {
      fontFamily: {
        silk: ["Silkscreen-Regular", ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        background: "#020015",
      },
      letterSpacing: {
        "wide-wide": "0.2em",
      },
      fontSize: {
        xxs: "0.625rem",
      },
    },
  },
  plugins: [
    rotateY,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
