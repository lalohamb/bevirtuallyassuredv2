/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — mirrors the CSS custom properties in src/styles/tokens.css.
        // navy: dark brown headings / deep surfaces
        navy: {
          DEFAULT: '#2C1A0E',
          700: '#3D2A18',
          800: '#2C1A0E',
          900: '#1E1009',
          950: '#120A05',
        },
        // teal: warm brown — secondary brand, icons, highlighted phrases
        teal: {
          50: '#F5EDE0',
          100: '#EDD9C0',
          200: '#DEC09A',
          300: '#C4A882',
          400: '#A8845A',
          500: '#8C6840',
          600: '#6B4C35',
          700: '#5A3D28',
          800: '#472F1E',
          900: '#352215',
        },
        sage: { DEFAULT: '#C4A882' },
        // coral/pink: rose-pink — primary action colour
        coral: {
          50: '#FDF0F4',
          100: '#FAD9E4',
          200: '#F5B0C8',
          300: '#EC82A8',
          400: '#D9608A',
          500: '#C0607A',
          600: '#B03D60',
          700: '#922F50',
          800: '#742440',
          900: '#581B31',
        },
        // pink: accent scale for highlights, chips, badges
        pink: {
          50: '#FDF0F4',
          100: '#FAD9E4',
          200: '#F5B0C8',
          300: '#EC82A8',
          400: '#D9608A',
          500: '#C0607A',
          600: '#B03D60',
          700: '#922F50',
          800: '#742440',
          900: '#581B31',
        },
        // cream: warm page/section backgrounds
        cream: {
          50: '#FAF8F4',
          100: '#F7F2EA',
          200: '#EFE5D5',
          300: '#E2D3BC',
          400: '#CBBCA4',
          500: '#A8977B',
          600: '#87775D',
          700: '#6A5C47',
          800: '#4D4334',
          900: '#332C22',
        },
        // ink: warm neutral text scale
        ink: {
          50: '#F6F2EC',
          100: '#EBE3D8',
          200: '#D8CDB8',
          300: '#B9AD9A',
          400: '#8C7D6A',
          500: '#6E6050',
          600: '#554A3C',
          700: '#3D3328',
          800: '#3B2A1A',
          900: '#2C1A0E',
        },
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: 'var(--container-width)',
      },
      borderRadius: {
        card: 'var(--card-radius)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15, 39, 64, 0.04), 0 8px 24px -12px rgba(15, 39, 64, 0.12)',
        lift: '0 2px 4px rgba(15, 39, 64, 0.04), 0 20px 40px -16px rgba(15, 39, 64, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
