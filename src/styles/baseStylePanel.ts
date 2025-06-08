// Base styles for style panels to ensure consistency
import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { DIMENSIONS } from '../constants/dimensions';

export const baseStylePanelStyles = StyleSheet.create({
  // Modal wrapper styles
  modalOverlay: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY_DARK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 16,
    overflow: 'hidden',
  },

  // Panel styles
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  scrollContainer: {
    flex: 1,
    padding: DIMENSIONS.SPACING_LG,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DIMENSIONS.SPACING_LG,
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    paddingTop: DIMENSIONS.SPACING_LG,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderBottomWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderBottomColor: COLORS.BORDER_PRIMARY,
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
  // Color picker shared styles
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
    borderColor: COLORS.TRANSPARENT,
  },
  selectedColor: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 2,
  },
  // Slider shared styles
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
  currentValue: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: DIMENSIONS.SPACING_XS,
  },
  // Button group styles
  buttonGroup: {
    flexDirection: 'row',
    gap: DIMENSIONS.SPACING_SM,
  },
  // Option picker styles (for font family, etc.)
  optionPicker: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: DIMENSIONS.SPACING_SM,
  },
  option: {
    paddingHorizontal: DIMENSIONS.SPACING_MD,
    paddingVertical: DIMENSIONS.SPACING_SM,
    borderRadius: DIMENSIONS.BORDER_RADIUS_SM,
    borderWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderColor: COLORS.BORDER_PRIMARY,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
  },
  selectedOption: {
    backgroundColor: COLORS.PRIMARY,
    borderColor: COLORS.PRIMARY,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
  },
  selectedOptionText: {
    color: COLORS.WHITE,
  },

  // Save/Cancel button styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_PRIMARY,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER_PRIMARY,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_SECONDARY,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.PRIMARY,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
});
