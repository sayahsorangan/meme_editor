// Shared style options for both text and image style panels
import { COLORS } from './colors';

export const COLOR_OPTIONS = [
  COLORS.BLACK,
  COLORS.WHITE,
  COLORS.PRIMARY,
  COLORS.ERROR,
  COLORS.SUCCESS,
  COLORS.WARNING,
  COLORS.INFO,
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FECA57',
  '#FF9FF3',
  '#8B4513',
  '#DC143C',
  '#228B22',
  '#FFD700',
  '#9B59B6',
  '#E67E22',
  '#34495E',
];

export const FONT_FAMILIES = [
  { label: 'System', value: 'System' },
  { label: 'Default', value: undefined }, // Use default system font
  { label: 'Monospace', value: 'monospace' },
  { label: 'Sans-serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
];
