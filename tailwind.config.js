/** @type {import('tailwindcss').Config} */
import tailwindcssThemer from "tailwindcss-themer";
import colors from "tailwindcss/colors";
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./index.html",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   100: "#e9ccff",
        //   200: "#d299ff",
        //   300: "#bc66ff",
        //   400: "#a533ff",
        //   500: "#8f00ff",
        //   600: "#7200cc",
        //   700: "#560099",
        //   800: "#390066",
        //   900: "#1d0033",
        // },
        secondary: {
          100: "#ccffe9",
          200: "#99ffd2",
          300: "#66ffbc",
          400: "#33ffa5",
          500: "#00ff8f",
          600: "#00cc72",
          700: "#009956",
          800: "#006639",
          900: "#00331d",
        },
        tertiary: {
          100: "#ffe9cc",
          200: "#ffd299",
          300: "#ffbc66",
          400: "#ffa533",
          500: "#ff8f00",
          600: "#cc7200",
          700: "#995600",
          800: "#663900",
          900: "#331d00",
        },

        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        // destructive: {
        //   DEFAULT: "hsl(var(--destructive))",
        //   foreground: "hsl(var(--destructive-foreground))",
        // },
        // muted: {
        //   DEFAULT: "hsl(var(--muted))",
        //   foreground: "hsl(var(--muted-foreground))",
        // },
        // accent: {
        //   DEFAULT: "hsl(var(--accent))",
        //   foreground: "hsl(var(--accent-foreground))",
        // },
        // popover: {
        //   DEFAULT: "hsl(var(--popover))",
        //   foreground: "hsl(var(--popover-foreground))",
        // },
        // card: {
        //   DEFAULT: "hsl(var(--card))",
        //   foreground: "hsl(var(--card-foreground))",
        // },
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    tailwindcssThemer({
      themes: [
        {
          name: "theme-red",
          extend: {
            colors: {
              primary: colors.emerald,
            },
          },
        },
      ],
    }),
  ],
};
