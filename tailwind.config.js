/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // UNLV
        unlvRed: "var(--color-unlvRed)",
        unlvLightRed: "var(--color-unlvLightRed)",
        unlvVeryLightRed: "var(--color-unlvVeryLightRed)",
        unlvDarkRed: "var(--color-unlvDarkRed)",
        unlvDarkerRed: "var(--color-unlvDarkerRed)",
        unlvDarkerRed1: "var(--color-unlvDarkerRed1)",
        unlvGray: "var(--color-unlvGray)",

        // theme bg
        backgroundBase: "var(--color-backgroundBase)",
        backgroundSurface: "var(--color-backgroundSurface)",
        backgroundSubtle: "var(--color-backgroundSubtle)",
        content: "var(--color-textBody)",

        // theme text
        textHeading: "var(--color-textHeading)",
        textBody: "var(--color-textBody)",
        textSubtle: "var(--color-textSubtle)",
        textPlaceholder: "var(--color-textPlaceholder)",
        borderDefault: "var(--color-borderDefault)",
      }
    },
  },
  plugins: [],
}
