/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Saffronish-brown canvas palette
        "saffron-brown": {
          950: "#130a05",
          900: "#1c1008",
          850: "#24150b",
          800: "#2e1b0f",
          700: "#3e2415",
          600: "#53311c",
          500: "#6e4125",
        },
        // Indian Saffron / Amber palette
        saffron: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        // Ashok Chakra Royal Blue palette
        chakra: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        // Vibrant India Green / Emerald palette
        indiaGreen: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        brand: {
          50: "#fff8f0",
          100: "#ffedd5",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#1e120c",
        },
      },
      fontFamily: {
        sans: ["'Inter'", "'Plus Jakarta Sans'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        heading: ["'Inter'", "'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
        glowSaffron: "0 0 25px -5px rgba(245, 158, 11, 0.35)",
        glowBlue: "0 0 25px -5px rgba(37, 99, 235, 0.35)",
        glowGreen: "0 0 25px -5px rgba(16, 185, 129, 0.35)",
      },
    },
  },
  plugins: [],
};

