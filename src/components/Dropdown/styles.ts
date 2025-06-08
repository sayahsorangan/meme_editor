import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.GRAY_800,
    borderRadius: 6,
    minWidth: 40,
    height: 36,
  },
  buttonIcon: {
    fontSize: 16,
    color: COLORS.WHITE,
    marginRight: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.WHITE,
  },
  overlay: {
    flex: 1,
    backgroundColor: COLORS.OVERLAY_SUBTLE,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    paddingVertical: 8,
    minWidth: 160,
    borderWidth: 1,
    borderColor: COLORS.GRAY_200,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY_200,
  },
  lastDropdownItem: {
    borderBottomWidth: 0,
  },
  itemIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 20,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.GRAY_800,
    flex: 1,
  },
});
