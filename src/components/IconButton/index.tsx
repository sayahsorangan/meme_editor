import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { styles } from './styles';

export interface IconButtonProps {
  icon: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'transparent',
  size = 'medium',
  disabled = false,
  style,
  testID,
}) => {
  const getButtonStyle = () => {
    const baseStyles: any[] = [styles.button];

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
      case 'transparent':
        baseStyles.push(styles.transparent);
        break;
    }

    // Add size styles
    if (size === 'small') {
      baseStyles.push(styles.small);
    } else if (size === 'large') {
      baseStyles.push(styles.large);
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

  const getIconStyle = () => {
    const baseStyles: any[] = [styles.icon];

    // Add variant icon styles
    switch (variant) {
      case 'primary':
        baseStyles.push(styles.primaryIcon);
        break;
      case 'secondary':
        baseStyles.push(styles.secondaryIcon);
        break;
      case 'outline':
        baseStyles.push(styles.outlineIcon);
        break;
      case 'transparent':
        baseStyles.push(styles.transparentIcon);
        break;
    }

    // Add disabled icon styles
    if (disabled) {
      baseStyles.push(styles.disabledIcon);
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
      <Text style={getIconStyle()}>{icon}</Text>
    </TouchableOpacity>
  );
};

export default IconButton;
