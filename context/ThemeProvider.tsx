'use client';

import { log } from 'console';
import { usePathname } from 'next/navigation';
import { Router } from 'next/router';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState('light');
  const [themeColor, setThemeColor] = useState('');
  const router = usePathname();
  console.log(router);

  const handleThemeChange = () => {
    if (mode === 'dark') {
      setMode('light');
      return document.documentElement.classList.add('light');
    } else {
      setMode('dark');
      return document.documentElement.classList.add('dark');
    }
  };
  if (router === '/theme-change') {
    useEffect(() => {
      handleThemeChange();
    }, [mode]);
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export default ThemeProvider;
