import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { baseStylePanelStyles } from '../../styles/baseStylePanel';

interface Option {
  label: string;
  value: string | undefined;
}

interface OptionPickerProps {
  options: Option[];
  selectedValue?: string | undefined;
  onValueChange: (value: string | undefined) => void;
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
          key={option.value || 'default'}
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
