/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',   // Vibrant indigo
          dark: '#4f46e5',
          light: '#818cf8',
        },

        accent: {
          blue: '#3b82f6',      // Bright blue
          violet: '#8b5cf6',    // Vibrant violet
          teal: '#14b8a6',      // Teal
          amber: '#f59e0b',     // Amber
          rose: '#f43f5e',      // Rose
          green: '#10b981',     // Green
        },

        light: {
          DEFAULT: '#ffffff',   // Pure white
          gray: '#f9fafb',      // Very light gray background
          border: '#e5e7eb',    // Light border
          hover: '#f3f4f6',     // Hover state
        },

        dark: {
          DEFAULT: '#111827',   // Dark text
          light: '#374151',     // Medium dark
          lighter: '#6b7280',   // Light dark
        },

        text: {
          primary: '#111827',   // Dark text for light backgrounds
          secondary: '#6b7280', // Gray text
          muted: '#9ca3af',     // Muted gray
        },
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },

      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'glow-subtle': 'glowSubtle 3s ease-in-out infinite',
        'float-slow': 'floatSlow 16s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },

        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },

        glowSubtle: {
          '0%, 100%': {
            boxShadow: '0 0 0 rgba(91, 124, 250, 0)',
          },
          '50%': {
            boxShadow: '0 0 24px rgba(91, 124, 250, 0.35)',
          },
        },

        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },

      backgroundImage: {
        'gradient-primary':
          'linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)',

        'gradient-light':
          'linear-gradient(180deg, #ffffff 0%, #f9fafb 100%)',

        'gradient-soft':
          'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',

        'gradient-hero':
          'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #14b8a6 100%)',
      },

      backdropBlur: {
        xs: '2px',
        sm: '6px',
      },
    },
  },
  plugins: [],
}
