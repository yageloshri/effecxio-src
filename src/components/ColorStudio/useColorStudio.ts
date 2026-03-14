import { useState, useCallback } from 'react';

export interface ColorPalette {
  bg: string;
  surface: string;
  accent: string;
  accent2: string;
  text: string;
  muted: string;
  border: string;
}

export type ColorMode = 'moods' | 'ai' | 'brand' | 'manual';

export interface ColorStudioState {
  isOpen: boolean;
  palette: ColorPalette;
  originalPalette: ColorPalette;
  activeMode: ColorMode;
  isLoading: boolean;
  history: ColorPalette[];
  historyIndex: number;
}

const DEFAULT_PALETTE: ColorPalette = {
  bg: '#080808',
  surface: '#111111',
  accent: '#c8f53b',
  accent2: '#ff3cac',
  text: '#f0f0f0',
  muted: '#555555',
  border: '#1e1e1e',
};

export function useColorStudio(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const [state, setState] = useState<ColorStudioState>({
    isOpen: false,
    palette: DEFAULT_PALETTE,
    originalPalette: DEFAULT_PALETTE,
    activeMode: 'moods',
    isLoading: false,
    history: [DEFAULT_PALETTE],
    historyIndex: 0,
  });

  const applyToIframe = useCallback((palette: ColorPalette) => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const root = doc.documentElement;

    Object.entries(palette).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
      if (key === 'accent') {
        root.style.setProperty('--primary', value);
        root.style.setProperty('--color-accent', value);
      }
      if (key === 'bg') {
        root.style.setProperty('--background', value);
        root.style.setProperty('--color-bg', value);
      }
    });

    if (!doc.getElementById('color-studio-transitions')) {
      const style = doc.createElement('style');
      style.id = 'color-studio-transitions';
      style.textContent = `
        *, *::before, *::after {
          transition: background-color 0.35s ease,
                      color 0.35s ease,
                      border-color 0.35s ease,
                      box-shadow 0.35s ease !important;
        }
      `;
      doc.head.appendChild(style);
    }
  }, [iframeRef]);

  const setPalette = useCallback((newPalette: ColorPalette, addToHistory = true) => {
    setState(prev => {
      const newHistory = addToHistory
        ? [...prev.history.slice(0, prev.historyIndex + 1), newPalette]
        : prev.history;
      return {
        ...prev,
        palette: newPalette,
        history: newHistory,
        historyIndex: addToHistory ? newHistory.length - 1 : prev.historyIndex,
      };
    });
    applyToIframe(newPalette);
  }, [applyToIframe]);

  const undo = useCallback(() => {
    setState(prev => {
      if (prev.historyIndex <= 0) return prev;
      const newIndex = prev.historyIndex - 1;
      const palette = prev.history[newIndex];
      applyToIframe(palette);
      return { ...prev, palette, historyIndex: newIndex };
    });
  }, [applyToIframe]);

  const reset = useCallback(() => {
    setState(prev => {
      applyToIframe(prev.originalPalette);
      return {
        ...prev,
        palette: prev.originalPalette,
        history: [prev.originalPalette],
        historyIndex: 0,
      };
    });
  }, [applyToIframe]);

  const open = useCallback((templatePalette: ColorPalette) => {
    setState(prev => ({
      ...prev,
      isOpen: true,
      palette: templatePalette,
      originalPalette: templatePalette,
      history: [templatePalette],
      historyIndex: 0,
    }));
  }, []);

  const close = useCallback(() => {
    setState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const setActiveMode = useCallback((mode: ColorMode) => {
    setState(prev => ({ ...prev, activeMode: mode }));
  }, []);

  const setLoading = useCallback((v: boolean) => {
    setState(prev => ({ ...prev, isLoading: v }));
  }, []);

  return { state, setPalette, undo, reset, open, close, setActiveMode, setLoading };
}
