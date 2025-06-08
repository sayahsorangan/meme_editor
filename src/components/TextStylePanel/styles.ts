import { StyleSheet } from 'react-native';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  ...baseStylePanelStyles,
  // Text-specific styles
  fontFamilyPicker: baseStylePanelStyles.optionPicker,
  fontOption: baseStylePanelStyles.option,
  selectedFont: baseStylePanelStyles.selectedOption,
  fontText: baseStylePanelStyles.optionText,
  selectedFontText: baseStylePanelStyles.selectedOptionText,
  alignmentButtons: baseStylePanelStyles.buttonGroup,
  // Save/Cancel button styles
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.GRAY_300,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.GRAY_400,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.GRAY_700,
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
