import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: DIMENSIONS.SPACING_LG,
    paddingVertical: DIMENSIONS.SPACING_LG,
    backgroundColor: COLORS.GRAY_800,
    borderBottomWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderBottomColor: COLORS.BORDER_SECONDARY,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.WHITE,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  templateList: {
    padding: DIMENSIONS.SPACING_LG,
    paddingBottom: DIMENSIONS.SPACING_XL,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: DIMENSIONS.SPACING_LG,
  },
  templateItem: {
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: DIMENSIONS.BORDER_RADIUS_LG,
    padding: DIMENSIONS.SPACING_MD,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  templateImage: {
    width: 120,
    height: 120,
    borderRadius: DIMENSIONS.BORDER_RADIUS_MD,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTemplate: {
    borderColor: COLORS.PRIMARY,
  },
  templateName: {
    marginTop: DIMENSIONS.SPACING_SM,
    fontSize: 14,
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedTemplateName: {
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: DIMENSIONS.SPACING_MD,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
});
