"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Whether the value came from the user (true) or system/default (false). */
  isExplicit: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  // The inline ThemeScript already resolved and applied this before paint.
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);
  const [isExplicit, setIsExplicit] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) !== null;
    } catch {
      return false;
    }
  });

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    setIsExplicit(true);
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable — keep in-memory state */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Follow OS changes only while the user hasn't picked a theme explicitly.
  useEffect(() => {
    if (isExplicit || typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e: MediaQueryListEvent) => {
      const next: Theme = e.matches ? "light" : "dark";
      setThemeState(next);
      applyTheme(next);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [isExplicit]);

  const value = useMemo(
    () => ({ theme, isExplicit, setTheme, toggleTheme }),
    [theme, isExplicit, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
