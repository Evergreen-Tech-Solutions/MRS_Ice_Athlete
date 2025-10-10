/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      letterSpacing: { tightest: "-0.02em" },
      fontFamily: {
        heading: ["'BBH Sans Bartle'", "system-ui", "sans-serif"],
        body: ["var(--font-roboto-flex)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
