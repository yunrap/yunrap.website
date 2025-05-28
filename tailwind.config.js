/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        bg1: "#000000",
        bg2: "#1a1e23",
        brand1: "#12f7d6",
        brand2: "#98faec",
        grey: "#43454d",
        white: "#ffffff",
        html: "#e54f26",
        css: "#0c73b8",
        js: "#e7a020",
        react: "#28a9e0",
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      fontSize: {
        BGtextU: [
          "4rem",
          {
            lineHeight: "4.5rem",
            fontWeight: "400",
          },
        ],
        H1U: [
          "7.3125rem",
          {
            lineHeight: "8.375rem",
            fontWeight: "400",
          },
        ],
        H2U: [
          "2rem",
          {
            lineHeight: "2.25rem",
            fontWeight: "400",
          },
        ],
        ButtonU: [
          "1.25rem",
          {
            lineHeight: "1.5rem",
            fontWeight: "400",
          },
        ],
        ArticleU: [
          "1rem",
          {
            lineHeight: "2rem",
            fontWeight: "300",
          },
        ],
        ParaU: [
          "1rem",
          {
            lineHeight: "1.125rem",
            fontWeight: "300",
          },
        ],
        LabelUM: [
          "0.875rem",
          {
            lineHeight: "1rem",
            fontWeight: "500",
          },
        ],
        LabelUL: [
          "0.875rem",
          {
            lineHeight: "1rem",
            fontWeight: "300",
          },
        ],
        NumberM: [
          "3rem",
          {
            lineHeight: "3.875rem",
            fontWeight: "400",
          },
        ],
        H2M: [
          "2rem",
          {
            lineHeight: "2.625rem",
            fontWeight: "300",
          },
        ],
        LogoM: [
          "2rem",
          {
            lineHeight: "2.625rem",
            fontWeight: "300",
          },
        ],
        MenuM: [
          "1.5rem",
          {
            lineHeight: "2rem",
            fontWeight: "300",
          },
        ],
        MediaM: [
          "1rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "300",
          },
        ],
        ParaM: [
          "1rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "300",
          },
        ],
        CodeM: [
          "0.875rem",
          {
            lineHeight: "1.125rem",
            fontWeight: "300",
          },
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-300%)" },
        },
      },
      animation: {
        scroll: "scroll 7s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
