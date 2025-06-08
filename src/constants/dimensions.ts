// Dimension constants for consistent spacing and sizing
export const DIMENSIONS = {
  // Spacing
  SPACING_XS: 4,
  SPACING_SM: 8,
  SPACING_MD: 12,
  SPACING_LG: 16,
  SPACING_XL: 24,
  SPACING_XXL: 32,

  // Common specific spacing values
  SPACING_3: 3,
  SPACING_5: 5,
  SPACING_15: 15,
  SPACING_20: 20,
  SPACING_30: 30,
  SPACING_33: 33,
  SPACING_36: 36,
  SPACING_45: 45,
  SPACING_48: 48,
  SPACING_50: 50,
  SPACING_75: 75,
  SPACING_150: 150,

  // Border radius
  BORDER_RADIUS_SM: 4,
  BORDER_RADIUS_MD: 8,
  BORDER_RADIUS_LG: 12,
  BORDER_RADIUS_XL: 16,

  // Border width
  BORDER_WIDTH_THIN: 1,
  BORDER_WIDTH_MEDIUM: 2,
  BORDER_WIDTH_THICK: 3,

  // Icon sizes
  ICON_SIZE_SM: 16,
  ICON_SIZE_MD: 24,
  ICON_SIZE_LG: 32,
  ICON_SIZE_XL: 40,

  // Button dimensions
  BUTTON_HEIGHT_SM: 32,
  BUTTON_HEIGHT_MD: 40,
  BUTTON_HEIGHT_LG: 48,

  // Template dimensions
  TEMPLATE_THUMBNAIL_SIZE: 80,
  TEMPLATE_PREVIEW_HEIGHT: 200,

  // Canvas dimensions
  CANVAS_MIN_SCALE: 0.5,
  CANVAS_MAX_SCALE: 3.0,
  CANVAS_DEFAULT_SCALE: 1.0,
  CANVAS_MEDIUM_SCALE: 0.8,
  CANVAS_LOW_SCALE: 0.6,
  CANVAS_HIGH_SCALE: 0.4,

  // Opacity values
  OPACITY_TRANSPARENT: 0.12,

  // Snap threshold for positioning
  SNAP_THRESHOLD: 10,

  // Minimum text size
  MIN_TEXT_SIZE: 12,
  MAX_TEXT_SIZE: 72,
  DEFAULT_TEXT_SIZE: 18,

  // Toolbar height
  TOOLBAR_HEIGHT: 60,

  // Common angle values
  ANGLE_90: 90,
  ANGLE_180: 180,
  ANGLE_270: 270,
  ANGLE_360: 360,

  // Percentage values as constants
  PERCENTAGE_100: 100,
  PERCENTAGE_75: 75,
  PERCENTAGE_50: 50,
  PERCENTAGE_25: 25,

  // Animation/timing values
  ANIMATION_DURATION_200: 200,
  ANIMATION_DURATION_300: 300,

  // Z-index values
  Z_INDEX_BASE: 1,
  Z_INDEX_ELEVATED: 2,
  Z_INDEX_MODAL: 3,
  Z_INDEX_OVERLAY: 4,
  Z_INDEX_TOOLTIP: 5,

  // Magic number alternatives
  MATH_PI_RADIANS: 3.14159,
  DEGREES_TO_RADIANS: 0.0174533,
  MAX_TOUCH_DISTANCE: 9,
  MATH_RADIX_36: 36,
  MATH_RADIX_9: 9,
  HEX_RADIX: 16,
  RGB_BLUE_INDEX: 3,
  BORDER_DIVIDER: 4,
} as const;
