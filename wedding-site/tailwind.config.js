/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Make sure this is present for dark mode
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/styles/**/*.{css}", // <- add this!
  ],

  theme: {
    extend: {
      colors: {
        // Define your custom colors here
        beige: {
          100: "#F5F5DC", // Example light beige
          // ... more shades
        },
        olive: {
          100: "#F0F8F0",
          700: "#556B2F",
          900: "#3D5322", // Deeper olive
        },
        "soft-black": "#2C2C2C",
        "baby-blue": "#ADD8E6",
      },
      fontFamily: {
        // Ensure these are correctly linked to your @font-face rules
        serif: ["Libre Serif", "serif"],
        script: ["Dancing Script", "cursive"],
        sans: ["Inter", "sans-serif"], // Example sans-serif
        dancing: ["var(--font-dancing)", "cursive"],
      },
      keyframes: {
        // ... your tw-animate-css keyframes if custom ones are defined
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // ... other custom animations
      },
      animation: {
        // ... your tw-animate-css animations
        fadeIn: "fadeIn 1s ease-out",
        // ... other custom animations
      },
    },
  },
  plugins: [], // Add any Tailwind plugins here
};
