import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { COLOR_OPTIONS } from '../../constants';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';

interface ColorPickerProps {
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
  return (
    <View style={baseStylePanelStyles.colorPicker}>
      {COLOR_OPTIONS.map(color => (
        <TouchableOpacity
          key={color}
          style={[
            baseStylePanelStyles.colorOption,
            { backgroundColor: color },
            selectedColor === color && baseStylePanelStyles.selectedColor,
          ]}
          onPress={() => onColorChange(color)}
        />
      ))}
    </View>
  );
};

export default ColorPicker;
