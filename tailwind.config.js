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
        unlvDarkerRed1: "var(--color-unlvDarkerRed1)",
        unlvGray: "var(--color-unlvGray)",
        // theme-specific
        primary: "var(--color-primary)",
        bgPrimary: "var(--color-bgPrimary)",
        secondary: "var(--color-secondary)",
        tertiary: "var(--color-tertiary)",
        primaryText: "var(--color-primaryText)",
        secondaryText: "var(--color-secondaryText)",
        tertiaryText: "var(--color-tertiaryText)",
        quaternaryText: "var(--color-quaternaryText)",
      }
    },
  },
  plugins: [],
}

