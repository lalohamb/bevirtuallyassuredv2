/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette — mirrors the CSS custom properties in src/styles/tokens.css.
        // navy: headings / deep surfaces (--navy)
        navy: {
          DEFAULT: '#0F2740',
          700: '#1E4466',
          800: '#163452',
          900: '#0F2740',
          950: '#0A1C2E',
        },
        // teal: secondary brand, icons, highlighted phrases (--teal = 600, --sage = 300)
        teal: {
          50: '#EEF5F3',
          100: '#DCECE9',
          200: '#C3DCD7',
          300: '#A9C9C3',
          400: '#74A6A2',
          500: '#468589',
          600: '#2F6F73',
          700: '#275C60',
          800: '#1F4A4D',
          900: '#173A3C',
        },
        sage: { DEFAULT: '#A9C9C3' },
        // coral: primary action colour (--coral = 500). 600 is the AA-compliant
        // fill for white button text (4.6:1); 700 for coral text on tinted surfaces.
        coral: {
          50: '#FDF3EF',
          100: '#FBE4DA',
          200: '#F6C8B5',
          300: '#F0A688',
          400: '#EC8E6D',
          500: '#E97855',
          600: '#C4512F',
          700: '#A8432A',
          800: '#863624',
          900: '#6B2C1F',
        },
        // cream: warm page/section backgrounds (--off-white = 50, --cream = 100)
        cream: {
          50: '#FAFAF8',
          100: '#F7F4EE',
          200: '#EFE9DF',
          300: '#E2D8C8',
          400: '#CBBCA4',
          500: '#A8977B',
          600: '#87775D',
          700: '#6A5C47',
          800: '#4D4334',
          900: '#332C22',
        },
        // ink: neutral text scale, warm-light to navy-dark (--body-text = 800)
        ink: {
          50: '#F6F4EF',
          100: '#EBE7DF',
          200: '#D8D3C9',
          300: '#B9B6AE',
          400: '#6B7480',
          500: '#5D6A75',
          600: '#45535F',
          700: '#2F3F4D',
          800: '#22313F',
          900: '#0F2740',
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
