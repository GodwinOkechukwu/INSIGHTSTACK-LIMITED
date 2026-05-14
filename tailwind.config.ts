import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import { heroui } from "@heroui/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // Updated to heroui path
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        plushTrial: ["Plush Trial", "sans-serif"],
        playfair: ["var(--font-playfair)"],
        syne: ["var(--font-syne)"],


      },
      colors: {
        transparent: "transparent",
        current: "currentColor",

        /* ========== insightstack Brand Foundation ========== */
        // The deep navy blue seen in the "Maintenance" banner
        brand: {
          navy: "#002D5B",
          blue: "#004B93", // Standard blue for buttons/icons
          light: "#E6F0F9", // Light blue for hover states/bg
        },

        background: "#FFFFFF", // Main site background
        surface: "#FFFFFF", // Product cards
        panel: "#FDFBFA", // The soft off-white/beige "Services" section
        dark: "#0A0A0A", // For high-contrast text and footers

        primary: {
          100: "#004B93", // Main Button Blue
          200: "#003A72",
          300: "#002D5B", // Deep Navy
          400: "#001F3F",
          DEFAULT: "#004B93",
        },

        // Tech-focused Grays
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },

        // Standard E-commerce feedback colors
        success: {
          light: "#E6F9F0",
          DEFAULT: "#10B981",
          dark: "#059669",
        },
        danger: {
          light: "#FEF2F2",
          DEFAULT: "#EF4444",
          dark: "#DC2626",
        },

        // Accents from the design
        accent: "#004B93",
        price: "#002D5B", // Deep navy for price text
        whatsapp: "#25D366",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        shimmer: "shimmer 1.8s infinite",
        shimmerSlow: "shimmer 2.5s infinite",
        orbPulse: "orbPulse 8s ease-in-out infinite",
        orbPulse2: "orbPulse2 11s ease-in-out infinite reverse",
        blink: "blink 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%,100%": { backgroundPosition: "-200% 0" },
          "50%": { backgroundPosition: "200% 0" },
        },
        orbPulse: {
          "0%,100%": { opacity: "0.8", transform: "scale(1) translateX(-50%)" },
          "50%": { opacity: "1", transform: "scale(1.15) translateX(-50%)" },
        },
        orbPulse2: {
          "0%,100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.2" } },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    screens: {
      xs: "400px",
      xmd: "800px",
      slg: "999px",
      ...defaultTheme.screens,
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#002D5B",
              foreground: "#FFFFFF",
            },
            focus: "#004B93",
          },
        },
      },
    }),
  ],
};
export default config;
