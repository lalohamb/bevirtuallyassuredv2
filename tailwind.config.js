/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Baby Pink — primary brand
        pink: {
          50: '#FDF2F4',
          100: '#FBE0E5',
          200: '#F7C2CD',
          300: '#F0A0B0',
          400: '#E67E94',
          500: '#D85F78',
          600: '#BE4A61',
          700: '#9C3A4F',
          800: '#7C2E3E',
          900: '#5E2330',
        },
        // Almond Brown — secondary / accent
        almond: {
          50: '#FAF6F2',
          100: '#F0E6DC',
          200: '#E0CDBA',
          300: '#CDAF92',
          400: '#B88D6A',
          500: '#A17A5E',
          600: '#85624A',
          700: '#6B4F3B',
          800: '#523D2E',
          900: '#3D2D22',
        },
        // Tan — neutral / supporting
        tan: {
          50: '#FBF8F3',
          100: '#F5EFE3',
          200: '#EADFC8',
          300: '#DECBA0',
          400: '#CDB077',
          500: '#B89A5E',
          600: '#9C8150',
          700: '#7E6840',
          800: '#5F4F30',
          900: '#433624',
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
