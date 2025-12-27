/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Vibrant MuscleUp Palette
        primary: {
          DEFAULT: "#4CAF50",
          light: "#81C784",
          dark: "#388E3C",
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
        },
        accent: {
          DEFAULT: "#FF9800",
          light: "#FFB74D",
          dark: "#F57C00",
          50: "#FFF3E0",
        },
        cream: {
          DEFAULT: "#F5F1E8",
          light: "#FAF8F3",
          dark: "#EDE8DB",
        },
        dark: "#1A1A1A",
        charcoal: "#2D2D2D",
        // Extended neutrals
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#EEEEEE",
          300: "#E0E0E0",
          400: "#BDBDBD",
          500: "#9E9E9E",
          600: "#757575",
          700: "#616161",
          800: "#424242",
          900: "#212121",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", fontWeight: "700" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        display: ["2.75rem", { lineHeight: "1.15", fontWeight: "600" }],
        "display-sm": ["2rem", { lineHeight: "1.2", fontWeight: "600" }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-hero":
          "linear-gradient(135deg, #F5F1E8 0%, #E8F5E9 50%, #F5F1E8 100%)",
        "gradient-green": "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
        "gradient-orange": "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
        "blob-pattern":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%234CAF5020' d='M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90,-16.3,88.5,-0.9C87,14.5,81.4,29,72.9,41.8C64.4,54.6,53,65.7,39.6,73.2C26.2,80.7,10.8,84.6,-3.6,83.6C-18,82.6,-31.4,76.7,-44.3,68.8C-57.2,60.9,-69.6,51,-76.8,38.1C-84,25.2,-86,9.4,-84.6,-5.8C-83.2,-21,-78.4,-35.6,-69.7,-47.9C-61,-60.2,-48.4,-70.2,-34.7,-77.6C-21,-85,-6.3,-89.8,7.6,-89.1C21.5,-88.4,30.6,-83.6,44.7,-76.4Z' transform='translate(100 100)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        card: "0 8px 30px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 16px 40px rgba(0, 0, 0, 0.15)",
        green: "0 8px 25px rgba(76, 175, 80, 0.35)",
        orange: "0 8px 25px rgba(255, 152, 0, 0.35)",
        float: "0 20px 40px rgba(0, 0, 0, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "slide-left": "slideLeft 0.8s ease-out",
        "slide-right": "slideRight 0.8s ease-out",
        "scale-in": "scaleIn 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "bounce-slow": "bounceSlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        blob: "blob 7s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
