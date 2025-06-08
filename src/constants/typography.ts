// Typography constants for consistent text styling
const FONT_SIZE_XS = 10;
const FONT_SIZE_SM = 12;
const FONT_SIZE_MD = 14;
const FONT_SIZE_LG = 16;
const FONT_SIZE_XL = 18;
const FONT_SIZE_XXL = 20;
const FONT_SIZE_XXXL = 24;
const FONT_SIZE_DISPLAY = 32;

const FONT_WEIGHT_LIGHT = '300' as const;
const FONT_WEIGHT_NORMAL = '400' as const;
const FONT_WEIGHT_MEDIUM = '500' as const;
const FONT_WEIGHT_SEMIBOLD = '600' as const;
const FONT_WEIGHT_BOLD = '700' as const;
const FONT_WEIGHT_EXTRA_BOLD = '800' as const;

const LINE_HEIGHT_TIGHT = 1.2;
const LINE_HEIGHT_NORMAL = 1.4;
const LINE_HEIGHT_RELAXED = 1.6;

export const TYPOGRAPHY = {
  // Font sizes
  FONT_SIZE_XS,
  FONT_SIZE_SM,
  FONT_SIZE_MD,
  FONT_SIZE_LG,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
  FONT_SIZE_XXXL,
  FONT_SIZE_DISPLAY,

  // Font weights
  FONT_WEIGHT_LIGHT,
  FONT_WEIGHT_NORMAL,
  FONT_WEIGHT_MEDIUM,
  FONT_WEIGHT_SEMIBOLD,
  FONT_WEIGHT_BOLD,
  FONT_WEIGHT_EXTRA_BOLD,

  // Line heights
  LINE_HEIGHT_TIGHT,
  LINE_HEIGHT_NORMAL,
  LINE_HEIGHT_RELAXED,

  // Letter spacing
  LETTER_SPACING_TIGHT: -0.5,
  LETTER_SPACING_NORMAL: 0,
  LETTER_SPACING_WIDE: 0.5,

  // Font families (platform-specific fallbacks handled by React Native)
  FONT_FAMILY_REGULAR: 'System',
  FONT_FAMILY_MEDIUM: 'System',
  FONT_FAMILY_BOLD: 'System',
  FONT_FAMILY_MONO: 'Courier New',
} as const;

// Common text style combinations
export const TEXT_STYLES = {
  // Headers
  H1: {
    fontSize: FONT_SIZE_DISPLAY,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
  },
  H2: {
    fontSize: FONT_SIZE_XXXL,
    fontWeight: FONT_WEIGHT_BOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
  },
  H3: {
    fontSize: FONT_SIZE_XXL,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    lineHeight: LINE_HEIGHT_NORMAL,
  },
  H4: {
    fontSize: FONT_SIZE_XL,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    lineHeight: LINE_HEIGHT_NORMAL,
  },

  // Body text
  BODY: {
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: LINE_HEIGHT_NORMAL,
  },
  BODY_LARGE: {
    fontSize: FONT_SIZE_LG,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: LINE_HEIGHT_NORMAL,
  },
  BODY_SMALL: {
    fontSize: FONT_SIZE_SM,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: LINE_HEIGHT_NORMAL,
  },

  // Captions and labels
  CAPTION: {
    fontSize: FONT_SIZE_XS,
    fontWeight: FONT_WEIGHT_NORMAL,
    lineHeight: LINE_HEIGHT_NORMAL,
  },
  LABEL: {
    fontSize: FONT_SIZE_SM,
    fontWeight: FONT_WEIGHT_MEDIUM,
    lineHeight: LINE_HEIGHT_NORMAL,
  },

  // Buttons
  BUTTON: {
    fontSize: FONT_SIZE_MD,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
  },
  BUTTON_SMALL: {
    fontSize: FONT_SIZE_SM,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
  },
  BUTTON_LARGE: {
    fontSize: FONT_SIZE_LG,
    fontWeight: FONT_WEIGHT_SEMIBOLD,
    lineHeight: LINE_HEIGHT_TIGHT,
  },
} as const;
