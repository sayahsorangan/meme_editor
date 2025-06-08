import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { DIMENSIONS } from '../../constants/dimensions';

export const styles = StyleSheet.create({
  container: {
    height: DIMENSIONS.TOOLBAR_HEIGHT,
    backgroundColor: COLORS.BACKGROUND_PRIMARY,
    borderBottomWidth: DIMENSIONS.BORDER_WIDTH_THIN,
    borderBottomColor: COLORS.BORDER_PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: DIMENSIONS.SPACING_LG,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    justifyContent: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginHorizontal: DIMENSIONS.SPACING_SM,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginLeft: DIMENSIONS.SPACING_MD,
  },
});
