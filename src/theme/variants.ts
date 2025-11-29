export const themes = {
  default: {
    background: '#ffffff',
    text: '#111827',
    border: '#e5e7eb',
    accent: '#2563eb',
  },
  clinical: {
    background: '#ffffff',
    text: '#1f2937',
    border: '#d1d5db',
    accent: '#0ea5e9',
  },
} as const;

export type ThemeVariant = keyof typeof themes;

export function getTheme(variant: ThemeVariant = 'default') {
  return themes[variant];
}
