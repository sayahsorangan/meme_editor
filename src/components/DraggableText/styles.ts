import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: 50,
    minHeight: 30,
  },
  selected: {
    borderWidth: DIMENSIONS.BORDER_WIDTH_MEDIUM,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
  },
  textInput: {
    fontSize: DIMENSIONS.DEFAULT_TEXT_SIZE,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.BLACK,
    backgroundColor: 'transparent',
    padding: DIMENSIONS.SPACING_SM,
    minWidth: 50,
    minHeight: 30,
  },
  textDisplay: {
    fontSize: DIMENSIONS.DEFAULT_TEXT_SIZE,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.BLACK,
    padding: DIMENSIONS.SPACING_SM,
    minWidth: 50,
    minHeight: 30,
  },
  resizeHandle: {
    position: 'absolute',
    bottom: -DIMENSIONS.SPACING_SM,
    right: -DIMENSIONS.SPACING_SM,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: DIMENSIONS.BORDER_RADIUS_SM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resizeIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: -DIMENSIONS.SPACING_SM,
    right: -DIMENSIONS.SPACING_SM,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.ERROR,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
