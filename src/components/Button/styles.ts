import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  button: {
    borderRadius: DIMENSIONS.BORDER_RADIUS_MD,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    paddingVertical: DIMENSIONS.SPACING_MD,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: COLORS.PRIMARY,
  },
  secondary: {
    backgroundColor: COLORS.SECONDARY,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderColor: COLORS.PRIMARY,
  },
  text: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: COLORS.GRAY_400,
  },
  small: {
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    paddingVertical: DIMENSIONS.SPACING_SM,
  },
  large: {
    paddingHorizontal: DIMENSIONS.SPACING_XL,
    paddingVertical: DIMENSIONS.SPACING_LG,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.TEXT_WHITE,
  },
  secondaryText: {
    color: COLORS.TEXT_WHITE,
  },
  outlineText: {
    color: COLORS.PRIMARY,
  },
  textText: {
    color: COLORS.PRIMARY,
  },
  disabledText: {
    color: COLORS.TEXT_SECONDARY,
  },
  icon: {
    marginRight: DIMENSIONS.SPACING_SM,
  },
});
