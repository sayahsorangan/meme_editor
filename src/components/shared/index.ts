// Re-export all shared components for easier imports
export { Button } from '../Button';
export type { ButtonProps } from '../Button';

export { IconButton } from '../IconButton';
export type { IconButtonProps } from '../IconButton';

export { Icon } from '../Icon';
export type { IconProps, IconSize, IconColor } from '../Icon';

// Legacy exports - these should be converted to named exports
export { default as ColorPicker } from '../ColorPicker';
export { default as SliderControl } from '../SliderControl';
export { default as OptionPicker } from '../OptionPicker';
