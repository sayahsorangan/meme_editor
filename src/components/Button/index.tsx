import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';

import { styles } from './styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  testID,
}) => {
  const getButtonStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.button];

    // Add variant styles
    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primary);
        break;
      case 'secondary':
        baseStyles.push(styles.secondary);
        break;
      case 'outline':
        baseStyles.push(styles.outline);
        break;
      case 'text':
        baseStyles.push(styles.text);
        break;
      default:
        baseStyles.push(styles.primary);
    }

    // Add size styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.small);
        break;
      case 'large':
        baseStyles.push(styles.large);
        break;
      case 'medium':
      default:
        // Medium is the default, no additional styles needed
        break;
    }

    // Add disabled styles
    if (disabled) {
      baseStyles.push(styles.disabled);
    }

    // Add custom styles
    if (style) {
      baseStyles.push(style);
    }

    return baseStyles;
  };

  const getTextStyle = (): TextStyle[] => {
    const baseStyles: TextStyle[] = [styles.buttonText];

    // Add size-specific text styles
    switch (size) {
      case 'small':
        baseStyles.push(styles.buttonTextSmall);
        break;
      case 'large':
        baseStyles.push(styles.buttonTextLarge);
        break;
      case 'medium':
      default:
        // Default text style already applied
        break;
    }

    // Add variant text styles
    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyles.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyles.push(styles.outlineText);
        break;
      case 'text':
        baseStyles.push(styles.textText);
        break;
      default:
        baseStyles.push(styles.primaryText);
    }

    // Add disabled text styles
    if (disabled) {
      baseStyles.push(styles.disabledText);
    }

    // Add custom text styles
    if (textStyle) {
      baseStyles.push(textStyle);
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      activeOpacity={0.7}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
