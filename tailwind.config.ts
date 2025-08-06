import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        jetbrains: ["var(--font-jetbrains-mono)", "monospace"],
        iceland: ["var(--font-iceland)", "sans-serif"],
        vt323: ["VT323", "monospace"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 8s ease-in-out infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "ring-pulse": "ring-pulse 4s ease-in-out infinite",
        'spin-slow': 'spin 6s linear infinite',
        popshake: "popshake 1.2s ease-out",
        // New animations for portfolio enhancements
        "blur-fade-in": "blur-fade-in 0.3s ease-out",
        "blur-fade-out": "blur-fade-out 0.3s ease-out",
        "smooth-slide-up": "smooth-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "smooth-slide-down": "smooth-slide-down 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "spring-bounce": "spring-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "dock-slide-up": "dock-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "search-glow": "search-glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        popshake: {
          "0%": { transform: "scale(0.6) rotate(0deg)", opacity: "0" },
          "30%": { transform: "scale(1.1) rotate(0deg)", opacity: "1" },
          "50%": { transform: "scale(1) rotate(-3deg)" },
          "60%": { transform: "scale(1) rotate(3deg)" },
          "70%": { transform: "scale(1) rotate(-2deg)" },
          "80%": { transform: "scale(1) rotate(2deg)" },
          "90%": { transform: "scale(1) rotate(-1deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
        "ring-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.1)", opacity: "0.1" },
        },
        // New keyframes for portfolio enhancements
        "blur-fade-in": {
          "0%": { opacity: "0", backdropFilter: "blur(0px)" },
          "100%": { opacity: "1", backdropFilter: "blur(4px)" },
        },
        "blur-fade-out": {
          "0%": { opacity: "1", backdropFilter: "blur(4px)" },
          "100%": { opacity: "0", backdropFilter: "blur(0px)" },
        },
        "smooth-slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "smooth-slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "spring-bounce": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "dock-slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "search-glow": {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)" },
        },
      },
      
    },
  },
  plugins: [tailwindcssAnimate],
}

export default config
