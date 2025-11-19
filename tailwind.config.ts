import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Catch-all for src directory
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        body: ['var(--font-instrument)', 'Arial', 'sans-serif'],
      },
      colors: {
        jazz: {
          void: '#0F0E0E',
          bone: '#E8E6D9',
          ember: '#CC4425',
          patina: '#425C5A',
        }
      },
    },
  },
  plugins: [],
};
export default config;