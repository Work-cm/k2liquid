/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // "Obsidian Grid" theme — near-black surfaces, acid-lime accent, orange signal
        night: {
          950: '#07061c',
          900: '#0c0a2a',
          800: '#100d36',
          700: '#161244',
          600: '#1d1856',
          500: '#28226c',
          400: '#373087',
        },
        line: {
          DEFAULT: '#231e5a',
          strong: '#332c78',
        },
        volt: {
          DEFAULT: '#d8ff3c',
          dim: '#b8dc2a',
          deep: '#8fb11a',
          ink: '#1a2200',
        },
        signal: {
          DEFAULT: '#ff6a2b',
          dim: '#d9541c',
        },
        bone: {
          DEFAULT: '#f2f2ee',
          muted: '#a3a3ad',
          faint: '#6b6b78',
        },
        primary: {
          DEFAULT: '#d8ff3c',
          dark: '#b8dc2a',
          light: '#e9ff86',
        },
        accent: {
          DEFAULT: '#ff6a2b',
          dark: '#d9541c',
          light: '#ff9466',
        },
        secondary: {
          DEFAULT: '#161244',
          dark: '#0c0a2a',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '2px',
        md: '2px',
        lg: '4px',
        xl: '4px',
        '2xl': '6px',
        '3xl': '8px',
      },
      boxShadow: {
        volt: '0 0 0 1px #d8ff3c, 6px 6px 0 0 #d8ff3c',
        hard: '6px 6px 0 0 #d8ff3c',
        'hard-sm': '3px 3px 0 0 #d8ff3c',
        'hard-white': '6px 6px 0 0 #f2f2ee',
        navy: '0 20px 60px -20px rgba(7, 6, 28, 0.9)',
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        'scan': 'scan 6s linear infinite',
        'blink': 'blink 1.2s steps(2, start) infinite',
        'rise': 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          to: { visibility: 'hidden' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
