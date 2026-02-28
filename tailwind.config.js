/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--surface-main)',
        heavy: 'var(--heavy)',
        neutral: 'var(--neutral)',
        soft: 'var(--soft)',
        pure: 'var(--pure)',
        accent: 'var(--accent-primary)',
        'accent-danger': 'var(--accent-danger)',
        'accent-warm': 'var(--accent-warm)',
      },
      fontFamily: {
        display: ['Instrument Serif', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
