/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shakeNo: {
          "0%": { transform: "translateX(0px)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-8px)" },
          "75%": { transform: "translateX(8px)" },
          "100%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        "miss-shake": "shakeNo 0.3s ease",
      },
    },
  },
  plugins: [],
};
