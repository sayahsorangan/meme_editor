import React from 'react';
import { Text, TextStyle } from 'react-native';

import { DIMENSIONS } from '../../constants/dimensions';
import { COLORS } from '../../constants/colors';

export type IconSize = 'small' | 'medium' | 'large' | 'xlarge';
export type IconColor = keyof typeof COLORS;

export interface IconProps {
  name: string;
  size?: IconSize;
  color?: IconColor | string;
  style?: TextStyle;
  testID?: string;
}

const SIZE_MAP: Record<IconSize, number> = {
  small: DIMENSIONS.ICON_SIZE_SM,
  medium: DIMENSIONS.ICON_SIZE_MD,
  large: DIMENSIONS.ICON_SIZE_LG,
  xlarge: DIMENSIONS.ICON_SIZE_XL,
};

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color = 'TEXT_PRIMARY',
  style,
  testID,
}) => {
  const getIconColor = (): string => {
    // Check if color is a key in COLORS constant
    if (typeof color === 'string' && color in COLORS) {
      return COLORS[color as IconColor];
    }
    // Otherwise, treat it as a direct color value
    return color as string;
  };

  const iconStyle: TextStyle = {
    fontSize: SIZE_MAP[size],
    color: getIconColor(),
    textAlign: 'center',
    ...style,
  };

  return (
    <Text style={iconStyle} testID={testID}>
      {name}
    </Text>
  );
};
