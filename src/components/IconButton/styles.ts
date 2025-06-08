import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: DIMENSIONS.BORDER_RADIUS_MD,
    padding: DIMENSIONS.SPACING_MD,
  },
  primary: {
    backgroundColor: COLORS.PRIMARY,
  },
  secondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  outline: {
    backgroundColor: COLORS.TRANSPARENT,
    borderWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderColor: COLORS.PRIMARY,
  },
  transparent: {
    backgroundColor: COLORS.TRANSPARENT,
  },
  disabled: {
    backgroundColor: COLORS.GRAY_400,
  },
  small: {
    padding: DIMENSIONS.SPACING_SM,
  },
  large: {
    padding: DIMENSIONS.SPACING_LG,
  },
  icon: {
    fontSize: DIMENSIONS.ICON_SIZE_MD,
  },
  primaryIcon: {
    color: COLORS.TEXT_WHITE,
  },
  secondaryIcon: {
    color: COLORS.TEXT_WHITE,
  },
  outlineIcon: {
    color: COLORS.TEXT_PRIMARY,
  },
  transparentIcon: {
    color: COLORS.TEXT_PRIMARY,
  },
  disabledIcon: {
    color: COLORS.TEXT_SECONDARY,
  },
});
