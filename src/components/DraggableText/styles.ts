import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    minWidth: 50,
    minHeight: 30,
    padding: 20, // Add padding to ensure buttons don't overlap with content
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
    backgroundColor: COLORS.TRANSPARENT,
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
  removeButton: {
    position: 'absolute',
    top: -15,
    left: -15,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.ERROR,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  rotateButton: {
    position: 'absolute',
    top: -DIMENSIONS.SPACING_SM,
    left: '50%',
    marginLeft: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rotateHandle: {
    position: 'absolute',
    top: -15,
    left: '50%',
    marginLeft: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  rotateIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  settingsButton: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SECONDARY,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  resizeHeightButton: {
    position: 'absolute',
    bottom: -15,
    left: '50%',
    marginLeft: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  resizeWidthButton: {
    position: 'absolute',
    right: -15,
    top: '50%',
    marginTop: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  buttonIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Add missing styles
  text: {
    fontSize: DIMENSIONS.DEFAULT_TEXT_SIZE,
    fontWeight: '600',
    textAlign: 'center',
    color: COLORS.BLACK,
    padding: DIMENSIONS.SPACING_SM,
    minWidth: 50,
    minHeight: 30,
  },
  selectionBorder: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderWidth: 0,
    borderColor: COLORS.PRIMARY,
    borderStyle: 'dashed',
    pointerEvents: 'none',
  },
  controlsContainer: {
    position: 'absolute',
    top: -DIMENSIONS.SPACING_MD,
    right: -DIMENSIONS.SPACING_MD,
    flexDirection: 'row',
    alignItems: 'center',
    gap: DIMENSIONS.SPACING_XS,
  },
  controlButton: {
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  controlButtonText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
  duplicateButton: {
    backgroundColor: COLORS.SUCCESS,
  },
  bottomResizeHandle: {
    position: 'absolute',
    bottom: -DIMENSIONS.SPACING_SM,
    left: '50%',
    marginLeft: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightResizeHandle: {
    position: 'absolute',
    right: -DIMENSIONS.SPACING_SM,
    top: '50%',
    marginTop: -DIMENSIONS.ICON_SIZE_MD / 2,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeResizeHandle: {
    backgroundColor: COLORS.WARNING,
  },
  rotationIndicator: {
    position: 'absolute',
    top: -40,
    left: '50%',
    marginLeft: -30,
    width: 60,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: `${COLORS.BLACK  }80`,
    borderRadius: 4,
    alignItems: 'center',
  },
  rotationText: {
    color: COLORS.WHITE,
    fontSize: 10,
    fontWeight: 'bold',
  },
  cloneButton: {
    position: 'absolute',
    bottom: -15,
    right: -15,
    width: DIMENSIONS.ICON_SIZE_MD,
    height: DIMENSIONS.ICON_SIZE_MD,
    backgroundColor: COLORS.SUCCESS,
    borderRadius: DIMENSIONS.ICON_SIZE_MD / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: COLORS.WHITE,
    elevation: 6, // Android shadow
    shadowColor: COLORS.BLACK, // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    zIndex: 1000,
  },
  cloneIcon: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
