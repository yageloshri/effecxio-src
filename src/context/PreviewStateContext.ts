'use client';

import { createContext, useContext } from 'react';

export type PreviewState = 'idle' | 'visible' | 'active';

export const PreviewStateContext = createContext<PreviewState>('visible');

/** Returns the current preview state: idle | visible | active */
export function usePreviewState(): PreviewState {
  return useContext(PreviewStateContext);
}
