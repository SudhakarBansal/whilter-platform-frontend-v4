import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        white: 'rgb(var(--color-white) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',

        // Primary colors
        primary: {
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
        },

        // Secondary colors
        secondary: {
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          dark: 'rgb(var(--color-secondary-dark) / <alpha-value>)',
        },

        // Blue scale
        blue: {
          300: 'rgb(var(--color-blue-300) / <alpha-value>)',
          400: 'rgb(var(--color-blue-400) / <alpha-value>)',
          450: 'rgb(var(--color-blue-450) / <alpha-value>)',
          500: 'rgb(var(--color-blue-500) / <alpha-value>)',
          600: 'rgb(var(--color-blue-600) / <alpha-value>)',
          700: 'rgb(var(--color-blue-700) / <alpha-value>)',
          800: 'rgb(var(--color-blue-800) / <alpha-value>)',
          900: 'rgb(var(--color-blue-900) / <alpha-value>)',
        },

        cyan: {
          400: 'rgb(var(--color-cyan-400) / <alpha-value>)',
        },

        // Gray scale
        gray: {
          400: 'rgb(var(--color-gray-400) / <alpha-value>)',
          800: 'rgb(var(--color-gray-800) / <alpha-value>)',
        },

        // UI colors
        magenta: {
          500: 'rgb(var(--color-magenta-500) / <alpha-value>)',
        },
        error: {
          light: 'rgb(var(--color-error-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--color-error) / <alpha-value>)',
          dark: 'rgb(var(--color-error-dark) / <alpha-value>)',
        },

        // Background colors
        background: 'rgb(var(--color-background) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        'dark-paper': 'rgb(var(--color-dark-paper) / <alpha-value>)',

        // Navbar colors
        navbar: {
          DEFAULT: 'rgb(var(--color-navbar) / <alpha-value>)',
          light: 'rgb(var(--color-navbar-light) / <alpha-value>)',
          dark: 'rgb(var(--color-navbar-dark) / <alpha-value>)',
        },

        // Sidebar colors
        sidebar: {
          DEFAULT: 'rgb(var(--color-sidebar) / <alpha-value>)',
          light: 'rgb(var(--color-sidebar-light) / <alpha-value>)',
          dark: 'rgb(var(--color-sidebar-dark) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
