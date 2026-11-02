/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          900: 'var(--color-wine-900, #250D17)',
          800: 'var(--color-wine-800, #35111E)',
          700: 'var(--color-wine-700, #501C29)',
        },
        rose: {
          500: 'var(--color-rose-500, #EF6389)',
          400: 'var(--color-rose-400, #F3819E)',
        },
        champagne: {
          400: 'var(--color-champagne-400, #E9BC91)',
          300: 'var(--color-champagne-300, #F0CEA8)',
        },
        peach: {
          500: 'var(--color-peach-500, #F2A16F)',
        },
        cream: {
          100: 'var(--color-cream-100, #FDF9F3)',
          200: 'var(--color-cream-200, #F5E8D8)',
          300: 'var(--color-cream-300, #EBD7C1)',
        },
        muted: {
          text: 'var(--color-muted-text, #B99A94)',
        }
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-rose': '0 0 25px -5px rgba(239, 99, 137, 0.4)',
        'glow-peach': '0 0 25px -5px rgba(242, 161, 111, 0.4)',
        'glow-champagne': '0 0 25px -5px rgba(233, 188, 145, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float-reverse 9s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(15px) rotate(-3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        }
      }
    },
  },
  plugins: [],
}
