import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    paddingVertical: DIMENSIONS.SPACING_MD,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Prevent canvas from overflowing
  },
  canvasWrapper: {
    maxWidth: '100%',
    maxHeight: '100%',
    overflow: 'hidden', // Critical: prevents zoomed canvas from overflowing beyond bounds
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden', // Clip zoomed content within bounds
    maxWidth: '100%',
    maxHeight: '100%',
  },
  canvas: {
    position: 'relative',
    backgroundColor: COLORS.WHITE,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain',
  },
  elementsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.SPACING_XL,
  },
  placeholderText: {
    fontSize: 18,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: DIMENSIONS.SPACING_XL,
  },
  emptyCanvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: DIMENSIONS.SPACING_XL,
    backgroundColor: COLORS.WHITE,
  },
  emptyCanvasText: {
    fontSize: 16,
    color: COLORS.GRAY_600,
    textAlign: 'center',
    marginBottom: DIMENSIONS.SPACING_LG,
    fontWeight: '400',
  },
  templateImage: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  snapLine: {
    position: 'absolute',
    backgroundColor: COLORS.PRIMARY,
    opacity: 0.7,
  },
  verticalSnapLine: {
    width: 1,
    height: '100%',
  },
  horizontalSnapLine: {
    height: 1,
    width: '100%',
  },
});
