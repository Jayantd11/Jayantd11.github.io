/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a0f24',        // near-black purple base
        plum: '#412653',       // deep purple
        slate2: '#3F567F',     // slate blue
        magenta: '#D174D2',    // primary accent
        ember: '#E0563F',      // secondary accent / CTA
        cream: '#F5F1F7',      // off-white text
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 20px) scale(0.95)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, 40px) scale(1.15)' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        floaty: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(14px, -22px) rotate(6deg)' },
          '50%': { transform: 'translate(-10px, -34px) rotate(-5deg)' },
          '75%': { transform: 'translate(-18px, -14px) rotate(4deg)' },
        },
      },
      animation: {
        float: 'float 18s ease-in-out infinite',
        'float-slow': 'floatSlow 24s ease-in-out infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        marquee: 'marquee 18s linear infinite',
        'marquee-slow': 'marquee 26s linear infinite',
        'gradient-shift': 'gradientShift 6s ease-in-out infinite',
        floaty: 'floaty 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
