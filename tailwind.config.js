module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bistre: "#3F2315",
        orangepeel: "#F69901",
        mahogany: "#812308",
        natural_teak: "#613F2E",
        walnut: "#E2BB7B",
      },
      fontFamily: {
        fonda: "Fondamento",
      },
      backgroundImage: {
        logo: "url('../src/assets/images/Icon-Logo.svg')",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
