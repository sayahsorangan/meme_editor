import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderTopWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderTopColor: COLORS.BORDER_PRIMARY,
    padding: DIMENSIONS.SPACING_LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
  },
  section: {
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
    marginBottom: DIMENSIONS.SPACING_SM,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: DIMENSIONS.SPACING_MD,
  },
  colorPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: DIMENSIONS.BORDER_WIDTH_MEDIUM,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: COLORS.PRIMARY,
  },
  slider: {
    flex: 1,
    marginHorizontal: DIMENSIONS.SPACING_MD,
  },
  sliderValue: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    minWidth: 30,
    textAlign: 'right',
  },
  fontFamilyPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
  },
  fontOption: {
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    paddingVertical: DIMENSIONS.SPACING_SM,
    borderRadius: DIMENSIONS.BORDER_RADIUS_SM,
    borderWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderColor: COLORS.BORDER_PRIMARY,
  },
  selectedFont: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  fontText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  selectedFontText: {
    color: COLORS.WHITE,
  },
  alignmentButtons: {
    flexDirection: 'row',
    gap: DIMENSIONS.SPACING_SM,
  },
});
