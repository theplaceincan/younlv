/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // global colors
        unlvRed: "var(--color-unlvRed)",
        unlvLightRed: "var(--color-unlvLightRed)",
        unlvDarkRed: "var(--color-unlvDarkRed)",
        unlvDarkerRed: "var(--color-unlvDarkerRed)",
        unlvGray: "var(--color-unlvGray)",
        // theme-specific
        primary: "var(--color-primary)",
        bgPrimary: "var(--color-bgPrimary)",
        secondary: "var(--color-secondary)",
        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        tertiaryText: "var(--color-tertiaryText)",
      }
    },
  },
  plugins: [],
}

