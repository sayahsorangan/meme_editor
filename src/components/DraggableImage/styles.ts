import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: 50,
    minHeight: 50,
  },
  selected: {
    borderWidth: DIMENSIONS.BORDER_WIDTH_MEDIUM,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
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
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    elevation: 4, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
  rotateHandle: {
    position: 'absolute',
    top: -DIMENSIONS.SPACING_LG,
    left: '50%',
    marginLeft: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    elevation: 4, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  rotateIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: -DIMENSIONS.SPACING_SM,
    left: -DIMENSIONS.SPACING_SM,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.WHITE,
    elevation: 4, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  settingsIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
