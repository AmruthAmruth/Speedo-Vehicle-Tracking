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
          DEFAULT: '#667eea',
          dark: '#764ba2',
        },
        accent: {
          cyan: '#00ffff',
          purple: '#667eea',
          pink: '#f093fb',
          blue: '#4facfe',
          green: '#43e97b',
          'red-pink': '#fa709a',
        },
        dark: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
          lighter: '#2d3748',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 20s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInDown: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        gradientShift: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        glow: {
          '0%, 100%': {
            'box-shadow': '0 4px 15px rgba(102, 126, 234, 0.4)',
          },
          '50%': {
            'box-shadow': '0 6px 25px rgba(102, 126, 234, 0.7)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -30px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #00ffff 0%, #667eea 100%)',
        'gradient-hero': 'linear-gradient(135deg, #00ffff 0%, #667eea 50%, #f093fb 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
