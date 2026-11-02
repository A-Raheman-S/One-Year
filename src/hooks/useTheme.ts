import { useState, useEffect } from 'react';

export type ThemeType = 'rose-gold' | 'champagne-gold' | 'velvet-crimson' | 'moonlight';

export interface ThemeOption {
  id: ThemeType;
  name: string;
  previewColor: string;
  accentColor: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    previewColor: '#EF6389',
    accentColor: '#EF6389',
  },
  {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    previewColor: '#E9BC91',
    accentColor: '#F2C99D',
  },
  {
    id: 'velvet-crimson',
    name: 'Velvet Crimson',
    previewColor: '#E5385D',
    accentColor: '#E5385D',
  },
  {
    id: 'moonlight',
    name: 'Moonlight',
    previewColor: '#7899CE',
    accentColor: '#7899CE',
  },
];

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('sunset_promise_theme');
    return (saved as ThemeType) || 'rose-gold';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sunset_promise_theme', theme);
  }, [theme]);

  const selectTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  return { theme, selectTheme, themes: THEME_OPTIONS };
}
