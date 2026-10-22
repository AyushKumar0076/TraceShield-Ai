/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./extension/popup.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F8F6', // Primary background: warm off-white
          white: '#FFFFFF',
          elevated: '#FFFFFF',
          subtle: '#F0F2EE',
          dark: '#171C19',   // Dark mode surface: charcoal
          'dark-elevated': '#212723',
        },
        charcoal: {
          DEFAULT: '#202622', // Primary text: near-black charcoal
          50: '#F4F5F4',
          100: '#E4E6E4',
          200: '#C7CBC7',
          300: '#9DA49D',
          400: '#6C756C',
          500: '#475047',
          600: '#323933',
          700: '#272E29',
          800: '#202622',
          900: '#171C19',
        },
        forest: {
          50: '#F1F7F4',
          100: '#DEEEE5',
          200: '#BEDECF',
          300: '#93C5B1',
          400: '#549F83',
          500: '#2B8364',
          600: '#176B4D', // Brand colour: deep forest green
          700: '#12543C',
          800: '#0E4431',
          900: '#0B3828',
          950: '#062319',
        },
        slate: {
          50: '#F4F6F8',
          100: '#E7ECF0',
          200: '#D2DBE1',
          300: '#B0C0CB',
          400: '#7E96A7',
          500: '#526779', // Secondary accent: muted slate blue
          600: '#425362',
          700: '#35434F',
          800: '#2B3640',
          900: '#202830',
        },
        stealth: {
          bg: '#0A0E0C',
          sidebar: '#0D110F',
          card: '#121714',
          cardHover: '#161C19',
          border: '#1E2621',
          borderLight: '#26322B',
          cyan: '#38BDF8',
          mint: '#34D399',
          emerald: '#10B981',
          magenta: '#F43F5E',
        },
        border: {
          subtle: '#DDE2DE', // Borders and dividers: subtle neutral grey
          medium: '#C8CFC9',
          strong: '#A4ADA6',
          dark: '#2D3530',
        },
        risk: {
          high: {
            DEFAULT: '#C53030', // Restrained red for high risk
            bg: '#FDF2F2',
            border: '#F87171',
            text: '#991B1B',
            darkBg: '#2D1616',
            darkBorder: '#7F1D1D',
          },
          amber: {
            DEFAULT: '#B45309', // Restrained amber for uncertain or suspicious
            bg: '#FFFBEB',
            border: '#FCD34D',
            text: '#92400E',
            darkBg: '#2D2312',
            darkBorder: '#78350F',
          },
          low: {
            DEFAULT: '#15803D', // Restrained green for verified low risk
            bg: '#F0FDF4',
            border: '#86EFAC',
            text: '#166534',
            darkBg: '#13281C',
            darkBorder: '#14532D',
          },
          neutral: {
            DEFAULT: '#526779',
            bg: '#F7F8F6',
            border: '#DDE2DE',
            text: '#202622',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        DEFAULT: '6px',
        'md': '8px',
        'lg': '10px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(32, 38, 34, 0.04)',
        'elevated': '0 2px 4px -1px rgba(32, 38, 34, 0.06), 0 1px 2px -1px rgba(32, 38, 34, 0.03)',
        'modal': '0 8px 24px -4px rgba(23, 28, 25, 0.16)',
      }
    },
  },
  plugins: [],
}
