// Comprehensive theme configuration for the meme editor
import { COLORS } from './colors';
import { DIMENSIONS } from './dimensions';
import { TYPOGRAPHY, TEXT_STYLES } from './typography';

export interface Theme {
  colors: typeof COLORS;
  dimensions: typeof DIMENSIONS;
  typography: typeof TYPOGRAPHY;
  textStyles: typeof TEXT_STYLES;
  shadows: typeof SHADOWS;
  animations: typeof ANIMATIONS;
}

// Shadow configurations for consistent elevation
export const SHADOWS = {
  NONE: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  SMALL: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  MEDIUM: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.16,
    shadowRadius: 4,
    elevation: 4,
  },
  LARGE: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  XLARGE: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.24,
    shadowRadius: 12,
    elevation: 12,
  },
} as const;

// Animation duration constants
export const ANIMATIONS = {
  DURATION_FAST: 150,
  DURATION_NORMAL: 250,
  DURATION_SLOW: 350,
  DURATION_EXTRA_SLOW: 500,

  // Easing functions (these would be used with Animated API)
  EASING_EASE_IN: 'ease-in',
  EASING_EASE_OUT: 'ease-out',
  EASING_EASE_IN_OUT: 'ease-in-out',
  EASING_LINEAR: 'linear',
} as const;

// Main theme object
export const THEME: Theme = {
  colors: COLORS,
  dimensions: DIMENSIONS,
  typography: TYPOGRAPHY,
  textStyles: TEXT_STYLES,
  shadows: SHADOWS,
  animations: ANIMATIONS,
} as const;

// Helper function to get consistent shadow color
export const getShadowColor = (opacity: number = DIMENSIONS.OPACITY_TRANSPARENT): string => {
  return `rgba(0, 0, 0, ${opacity})`;
};

// Helper function to create platform-specific shadows
export const createShadow = (elevation: keyof typeof SHADOWS) => ({
  ...SHADOWS[elevation],
  shadowColor: getShadowColor(),
});
