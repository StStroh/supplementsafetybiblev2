/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Primary: Locked at #5E3B76
        blue: {
          50: '#F5F0FA',   // Very light purple tint
          100: '#E8DFF4',  // Light purple
          200: '#D4C4E8',  // Lighter purple border
          400: '#8B5FA8',  // Medium purple
          500: '#7450A0',  // Focus ring
          600: '#5E3B76',  // PRIMARY BRAND (LOCKED)
          700: '#4A2E5E',  // Darker hover state
          800: '#3A2449',  // Dark text
          900: '#2A1A35',  // Darkest text
        },
        // Brand gradient complement (deeper purple tones)
        indigo: {
          50: '#F2EDF8',   // Very light purple-indigo
          100: '#E1D7EE',  // Light purple-indigo
          200: '#C9B8DF',  // Lighter border
          400: '#9874C4',  // Medium purple-indigo
          500: '#7B52AC',  // Mid tone
          600: '#5F3694',  // Rich purple
          700: '#4D2B79',  // Darker purple
          800: '#3C2260',  // Dark text
          900: '#2D1847',  // Darkest
        },
        // Brand Secondary: Medical Teal (for accents/highlights)
        teal: {
          50: '#E8F9FC',
          100: '#C7F0F6',
          200: '#9FE7F0',
          400: '#4ECDE0',
          500: '#1DB5C9',  // SECONDARY BRAND
          600: '#1A9FB1',
          700: '#177D8B',
          800: '#145D67',
          900: '#0F4249',
        },
        // Sky/Cyan for specific gradient uses
        sky: {
          500: '#1DB5C9',  // Matches teal brand color
        },
        // Brand Accent: Warm Gold (for CTAs where appropriate)
        amber: {
          50: '#FFF8E6',
          100: '#FFEDBD',
          200: '#FFE194',
          400: '#FFD46B',
          500: '#FFC845',  // ACCENT BRAND
          600: '#E6B33E',
          700: '#CC9E37',
          800: '#B38930',
          900: '#997429',
        },
      },
    },
  },
  plugins: [],
};
