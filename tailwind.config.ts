import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary - French institutional navy
        'navy': {
          DEFAULT: '#00255D',
          light: '#023D87',
          dark: '#001A3A',
        },
        // Secondary - warm French white
        'cream': {
          DEFAULT: '#FAFAF7',
          dark: '#E5E4DF',
          light: '#F5F5F0',
        },
        // Accent - French red
        'rouge': {
          DEFAULT: '#D92A1C',
          hover: '#B02015',
          light: '#E84A3D',
        },
        // Legacy support (map to new system)
        'slate-dark': '#191919',
        'slate-medium': '#262625',
        'slate-light': '#40403E',
        'cloud-dark': '#666663',
        'cloud-medium': '#91918D',
        'cloud-light': '#BFBFBA',
        'ivory-dark': '#E5E4DF',
        'ivory-medium': '#F0F0EB',
        'ivory-light': '#FAFAF7',
        // Old accent colors - map to new
        'book-cloth': '#D92A1C',
        'kraft': '#D92A1C',
        'manilla': '#D92A1C',
        'focus': '#023D87',
        'error': '#D92A1C',
        // System colors
        'bg': '#FFFFFF',
        'bg-card': '#FFFFFF',
        'text': '#191919',
        'text-muted': '#666666',
        'border': '#E5E5E5',
        // Semantic aliases
        'accent': '#00255D',
        'accent-hover': '#001A3A',
        'accent-blue': '#023D87',
        // Utility colors (keep for specific uses)
        'accent-purple': '#7c4dff',
        'accent-teal': '#008b8b',
        'accent-green': '#2a9e62',
        'success': '#3a7f5c',
        'gray-200': '#E5E4DF',
        'gray-300': '#D4D4D4',
        'gray-400': '#91918D',
        // MentivisOS design tokens (accessed via CSS utility classes)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3rem', { lineHeight: '1.1' }],
        'h2': ['2rem', { lineHeight: '1.2' }],
        'h3': ['1.3rem', { lineHeight: '1.3' }],
        'body': ['1.125rem', { lineHeight: '1.6' }],
        'small': ['0.95rem', { lineHeight: '1.5' }],
        // MentivisOS scale
        'display': ['clamp(2.25rem, 4.5vw, 3.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'hero': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'title': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['clamp(1.125rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'lead': ['1.125rem', { lineHeight: '1.6' }],
        'nav': ['0.9375rem', { lineHeight: '1.4' }],
        'btn': ['0.9375rem', { lineHeight: '1.4' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'micro': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'tiny': ['0.625rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '96': '6rem',
        '64': '4rem',
        // Section gaps
        'section': 'clamp(6rem, 12vw, 10rem)',
        'section-sm': 'clamp(4rem, 8vw, 6rem)',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: 'clamp(1.5rem, 5vw, 5rem)',
          md: '2rem',
        },
        screens: {
          '2xl': '1240px',
        },
      },
      maxWidth: {
        'content': '1240px',
        'narrow': '720px',
        'wide': '1440px',
      },
      borderRadius: {
        'card': '16px',
        'warm': '30px',
        'pill': '8px',
        'module': '24px',
      },
    },
  },
  plugins: [],
}

export default config
