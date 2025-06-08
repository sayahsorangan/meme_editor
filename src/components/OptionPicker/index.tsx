import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';

interface Option {
  label: string;
  value: string;
}

interface OptionPickerProps {
  options: Option[];
  selectedValue?: string;
  onValueChange: (value: string) => void;
  renderOptionText?: (option: Option) => React.ReactNode;
}

const OptionPicker: React.FC<OptionPickerProps> = ({
  options,
  selectedValue,
  onValueChange,
  renderOptionText,
}) => {
  return (
    <View style={baseStylePanelStyles.optionPicker}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={[
            baseStylePanelStyles.option,
            selectedValue === option.value && baseStylePanelStyles.selectedOption,
          ]}
          onPress={() => onValueChange(option.value)}>
          {renderOptionText ? (
            renderOptionText(option)
          ) : (
            <Text
              style={[
                baseStylePanelStyles.optionText,
                selectedValue === option.value && baseStylePanelStyles.selectedOptionText,
              ]}>
              {option.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionPicker;
