import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { styles } from './styles';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
}

export interface DropdownProps {
  items: DropdownItem[];
  onSelect: (item: DropdownItem) => void;
  buttonText?: string;
  buttonIcon?: string;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  buttonText = '+',
  buttonIcon,
  placeholder = 'Select an option',
}) => {
  const [visible, setVisible] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const handleButtonPress = () => {
    setVisible(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setVisible(false);
    });
  };

  const handleItemSelect = (item: DropdownItem) => {
    handleClose();
    onSelect(item);
  };

  const handleButtonLayout = (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setButtonLayout({ x, y, width, height });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
        onLayout={handleButtonLayout}
        activeOpacity={0.8}>
        {buttonIcon && <Text style={styles.buttonIcon}>{buttonIcon}</Text>}
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.dropdown,
                {
                  top: buttonLayout.y + buttonLayout.height + 8,
                  left: buttonLayout.x,
                  minWidth: buttonLayout.width,
                  transform: [
                    {
                      scale: scaleAnim,
                    },
                  ],
                },
              ]}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.dropdownItem,
                    index === items.length - 1 && styles.lastDropdownItem,
                  ]}
                  onPress={() => handleItemSelect(item)}
                  activeOpacity={0.7}>
                  {item.icon && <Text style={styles.itemIcon}>{item.icon}</Text>}
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Dropdown;
