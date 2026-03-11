import type { Effect } from '@/types';
import { effectsPart1 } from './effects-part1';
import { effectsPart2 } from './effects-part2';
import { effectsBatch2Buttons } from './effects-batch2-buttons';
import { effectsBatch3Cards } from './effects-batch3-cards';
import { effectsBatch6Cursor } from './effects-batch6-cursor';
import { effectsBatch7Loaders } from './effects-batch7-loaders';
import { effectsBatch8Media } from './effects-batch8-media';
import { effectsBatch4Scroll } from './effects-batch4-scroll';
import { effectsBatch5Bg } from './effects-batch5-bg';
import { effectsBatch1Text } from './effects-batch1-text';

export const effects: Effect[] = [...effectsPart1, ...effectsPart2, ...effectsBatch2Buttons, ...effectsBatch3Cards, ...effectsBatch6Cursor, ...effectsBatch7Loaders, ...effectsBatch8Media, ...effectsBatch4Scroll, ...effectsBatch5Bg, ...effectsBatch1Text];
