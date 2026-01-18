export const severityColors = {
  low: {
    bg: '#e5e7eb',
    text: '#374151',
    border: '#d1d5db',
  },
  moderate: {
    bg: '#fde68a',
    text: '#92400e',
    border: '#fcd34d',
  },
  high: {
    bg: '#fdba74',
    text: '#7c2d12',
    border: '#fb923c',
  },
  severe: {
    bg: '#fca5a5',
    text: '#7f1d1d',
    border: '#f87171',
  },
} as const;

export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
} as const;

export const typography = {
  body: {
    fontSize: '1rem',
    lineHeight: '1.5',
  },
  bodyLarge: {
    fontSize: '1.125rem',
    lineHeight: '1.5',
  },
  heading: {
    fontSize: '1.5rem',
    lineHeight: '1.2',
  },
  headingLarge: {
    fontSize: '2rem',
    lineHeight: '1.2',
  },
  label: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
  },
} as const;

export const colors = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  secondary: '#64748b',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  neutral: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

export const maxWidths = {
  text: '70ch',
  container: '1200px',
  narrow: '640px',
} as const;
