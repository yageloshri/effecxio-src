import { sharpSet } from './sets/sharp';
import { warmSet } from './sets/warm';
import { authenticSet } from './sets/authentic';
import { minimalSet } from './sets/minimal';
import { boldSet } from './sets/bold';
import { luxurySet } from './sets/luxury';
import { playfulSet } from './sets/playful';
import { techSet } from './sets/tech';
import type { IconSet } from './types';

export const allSets: IconSet[] = [
  sharpSet,
  warmSet,
  authenticSet,
  minimalSet,
  boldSet,
  luxurySet,
  playfulSet,
  techSet,
];

export type { Icon, IconSet, IconVariant } from './types';
